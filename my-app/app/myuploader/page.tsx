import Link from "next/link";
import React from "react";
import ImageInput from "./_components/ImageInput";
import ImageUploadGpt from "./_components/ImageUploadGpt";

export default function MyUploder() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-full">
      <div className="flex gap-4 p-4">
        <Link
          href="/"
          className=" border-2 p-2 hover:border-blue-200 rounded border-primary hover:text-primary duration-150 ease-in-out cursor-pointer text-2xl font-bold"
        >
          Home
        </Link>
        <Link
          href="/cloudinary"
          className=" border-2 p-2 hover:border-blue-200 rounded border-primary hover:text-primary duration-150 ease-in-out cursor-pointer text-2xl font-bold"
        >
          Cloudinary
        </Link>
      </div>
      <h1 className="text-6xl">Cloudinary Page</h1>
      {/* <ImageInput /> */}
      <ImageUploadGpt />
    </div>
  );
}
