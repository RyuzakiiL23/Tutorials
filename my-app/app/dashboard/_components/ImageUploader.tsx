"use client";

import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateCategory from "./category/CreateCategory";
import { ICategoryDocument } from "@/models/categoryModels";
import { getCategories } from "@/actions/categoryAction";
import { set } from "mongoose";
import { ColumnSpacingIcon } from "@radix-ui/react-icons";

interface ProductDetails {
  name: string;
  price: string;
  reduction: string;
  brand: string;
  etat: string;
  description: string;
}

function ImageUploader() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFilePrincipal, setSelectedFilePrincipal] =
    useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<any>();
  const [categoryLength, setCategoryLength] = useState<number>(0);

  const handleCategorySelect = (value: React.SetStateAction<string>) => {
    setSelectedCategory(value);
  };

  //Fetching categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        console.log(data);
        if (Array.isArray(data)) {
          setCategories(data);
          setCategoryLength(data.length);
          console.log(data.length);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [categoryLength]);

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const newFiles = Array.from(fileList);
      setSelectedFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles[index] = newFiles[0];
        return updatedFiles;
      });
    }
  };

  const handlePrincipalFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      // Extract the file extension
      const fileExtension = file.name.split(".").pop();

      // Change the name of the file to 'principal.<extension>'
      const renamedFile = new File([file], `principal.${fileExtension}`, {
        type: file.type,
      });

      setSelectedFilePrincipal(renamedFile);
    }
  };

  const [productDetails, setProductDetails] = useState<ProductDetails>({
    name: "",
    price: "",
    reduction: "",
    brand: "",
    etat: "",
    description: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };
  console.log(productDetails);
  console.log(selectedCategory);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("price", productDetails.price);
    formData.append("titre", productDetails.name);
    formData.append("reduction", productDetails.reduction);
    formData.append("brand", productDetails.brand);
    formData.append("etat", productDetails.etat);
    formData.append("description", productDetails.description);
    formData.append("category", selectedCategory);

    // Append the principal image
    if (selectedFilePrincipal) {
      formData.append("imageFiles", selectedFilePrincipal);
    }

    // Append additional images
    selectedFiles.forEach((file, index) => {
      if (file) {
        formData.append(`imageFiles`, file);
      }
    });

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Product details and images uploaded successfully!");
        // Clear form fields or perform any other necessary actions upon successful upload
      } else {
        console.error("Failed to upload product details and images.");
      }
    } catch (error) {
      console.error("Error occurred while uploading:", error);
    }

    // window.location.href = '/admin';
  };

  const handleCancelPrincipal = () => {
    setSelectedFilePrincipal(null);
  };

  const handleCancel = (indexToDelete: number) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter(
        (_, index) => index !== indexToDelete
      );
      return updatedFiles;
    });
  };

  return (
    <>
      <main className="flex w-full relative pr-8">
        <section className="flex relative w-[50%] mt-4">
          <div className="flex flex-col gap-2 relative items-center w-full">
            <div className=" overflow-hidden hover:text-primary transition duration-300 ease-in-out p-1 text-muted-foreground border-muted-foreground hover:border-primary border border-dashed rounded w-[100%] h-96 flex relative items-center justify-center">
              {!selectedFilePrincipal ? (
                <>
                  <label htmlFor="principalFile" className="">
                    <p className="hover:cursor-pointer text-[120px]">
                      <MdCloudUpload />
                    </p>
                  </label>
                  <input
                    type="file"
                    id="principalFile"
                    accept="image/*"
                    hidden
                    onChange={handlePrincipalFileChange}
                  />
                </>
              ) : (
                <div className="relative h-full w-full">
                  <p
                    onClick={handleCancelPrincipal}
                    className="absolute bottom-0 text-red-600 ml-5 hover:cursor-pointer"
                  >
                    <FaRegTrashCan style={{ fontSize: "28px" }} />
                  </p>
                  <img
                    className="h-full w-full rounded object-cover"
                    src={URL.createObjectURL(selectedFilePrincipal)}
                    alt="Principal"
                  />
                </div>
              )}
            </div>

            {/* Primary Image Display */}
            {/* {selectedFilePrincipal && (
            <div>
              <img className='h-40 rounded' src={URL.createObjectURL(selectedFilePrincipal)} alt="Principal" />
            </div>
          )} */}

            {/* Secondary Image Uploads */}
            <div className="flex relative gap-2 w-full h-24">
              {[0, 1, 2, 3].map((index) => (
                <div
                  className=" overflow-hidden hover:text-primary transition duration-300 ease-in-out p-1 text-muted-foreground border-muted-foreground hover:border-primary border border-dashed rounded w-[24%] h-24 flex relative items-center justify-center"
                  key={index}
                >
                  {!selectedFiles[index] ? (
                    <>
                      <label
                        htmlFor={`file-${index}`}
                        className="hover:cursor-pointer "
                      >
                        <p className="text-[40px]">
                          <MdCloudUpload />
                        </p>
                      </label>
                      <input
                        type="file"
                        id={`file-${index}`}
                        accept="image/*"
                        hidden
                        onChange={(event) => handleFileChange(event, index)}
                      />
                    </>
                  ) : (
                    <div className="h-full w-full relative">
                      {/* <button onClick={() => handleCancel(index)} className='absolute top-2 right-2'>delete</button> */}
                      <div
                        onClick={() => handleCancel(index)}
                        className="absolute text-red-600 hover:cursor-pointer"
                      >
                        <FaRegTrashCan style={{ fontSize: "18px" }} />
                      </div>
                      <img
                        className="h-full w-full rounded object-cover"
                        src={URL.createObjectURL(selectedFiles[index])}
                        alt={`Selected ${index + 1}`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="p-4 flex w-[50%] relative">
          <div className="w-full ">
            <Select
              onValueChange={handleCategorySelect}
              defaultValue={selectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories
                    ? categories.map((category: ICategoryDocument) => (
                        <div key={category._id as string}>
                          <SelectItem
                            className="cursor-pointer"
                            onClick={() => handleCategorySelect(category.name)}
                            value={category.name}
                          >
                            {category.name}
                          </SelectItem>
                        </div>
                      ))
                    : null}
                  <CreateCategory setCategoryLength={setCategoryLength} />
                </SelectGroup>
              </SelectContent>
            </Select>
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col relative mt-4"
            >
              <div className="flex relative w-full justify-around">
                <div className="flex flex-col gap-2 w-full">
                  <input
                    hidden
                    type="text"
                    onChange={handleInputChange}
                    value={selectedCategory}
                    name="category"
                  />
                  <div>
                    <Input
                      placeholder="Brand"
                      type="text"
                      id="brand"
                      name="brand"
                      value={productDetails.brand}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Name"
                      type="text"
                      id="name"
                      name="name"
                      value={productDetails.name}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Price"
                      type="text"
                      id="price"
                      name="price"
                      value={productDetails.price}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Reduction"
                      type="text"
                      id="reduction"
                      name="reduction"
                      value={productDetails.reduction}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div></div>
                  <div>
                    <Input
                      placeholder="Etat"
                      type="text"
                      id="etat"
                      name="etat"
                      value={productDetails.etat}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Description..."
                      id="description"
                      name="description"
                      value={productDetails.description}
                      onChange={handleTextareaChange}
                      className="border p-2 w-full h-60"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <div>
        <div className="flex gap-4 w-full items-start">
          <Button type="button" variant="secondary">
            Cancel
          </Button>
          <Button type="button">Submit</Button>
        </div>
        {/* <Button onClick={handleSubmit} type="submit" className='w-full' >
          Submit
        </Button> */}
      </div>
    </>
  );
}

export default ImageUploader;
