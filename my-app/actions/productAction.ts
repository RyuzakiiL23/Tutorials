import { auth } from "@/auth";
import { connectToMongoDB } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils.error";
import { Product } from "@/models/productModels";
import { revalidatePath } from "next/cache";

export const createProduct = async (formData: FormData) => {
  const session = await auth();
  console.log(session);
  await connectToMongoDB();
  // Extracting todo content and time from formData
  const name = formData.get("name");
  try {
    // Creating a new todo using Todo model
    const newProduct = await Product.create({
      name,
      store: session?.user._id,
    });
    // Saving the new todo
    newProduct.save();
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