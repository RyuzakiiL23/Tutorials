"use client";
import { getCategories } from "@/actions/categoryAction";
import { ICategoryDocument } from "@/models/categoryModels";
import { Model } from "mongoose";
import { useEffect, useState } from "react";

export default function CategorySelect() {
  const [categories, setCategories] = useState<any>();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  console.log(typeof categories);
  return (
    <div>
      {categories &&
        categories.map((category: ICategoryDocument) => (
          <div key={category._id as string}>
            <h1>{category.name}</h1>
          </div>
        ))}
    </div>
  );
}
