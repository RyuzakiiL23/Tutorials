"use server";
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "@/lib/db";
import { Category } from "@/models/categoryModels";
import { auth } from "@/auth";
import { getErrorMessage } from "@/lib/utils.error";

export const createCategory = async (formData: FormData) => {
  const session = await auth();
  console.log(session);
  await connectToMongoDB();
  // Extracting todo content and time from formData
  const name = formData.get("name");
  try {
    // Creating a new todo using Todo model
    const newCategory = await Category.create({
      name,
      store: session?.user._id,
    });
    // Saving the new todo
    newCategory.save();
    // Triggering revalidation of the specified path ("/")
    revalidatePath("/");
    // Returning the string representation of the new todo
    // return newCategory.toString();
    return { message: "category created successfully" };
  } catch (error) {
    console.log(error);
    const message = getErrorMessage(error);
    // return {message: 'error creating Category'};
    if (message.includes("name: Path `name` is required")) {
      return { message: "category name is required" };
    }
    if (message.includes("duplicate key error")) {
      return { message: "category already exists" };
    }
    return {message: 'error creating Category'};
  }
};

export const getCategories = async () => {
  await connectToMongoDB();
  try {
    // Fetching all todos from the database
    const categories = await Category.find().lean();
    // Returning the fetched todos
    console.log(categories);
    categories.map((category) => {
      category._id = category._id.toString();
      category.store = category.store.toString();
    });
    return categories;
  } catch (error) {
    // Returning an error message if fetching todos fails
    return { message: "error fetching categories" };
  }
};

export const deleteCategory = async (id: FormData) => {
  // Extracting todo ID from formData
  const categoryId = id.get("id");
  try {
    // Deleting the todo with the specified ID
    await Category.deleteOne({ _id: categoryId });
    // Triggering revalidation of the specified path ("/")
    revalidatePath("/");
    // Returning a success message after deleting the todo
    return "category deleted";
  } catch (error) {
    // Returning an error message if todo deletion fails
    return { message: "error deleting category" };
  }
};
