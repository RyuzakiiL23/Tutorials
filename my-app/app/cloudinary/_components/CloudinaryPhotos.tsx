"use client";
import { CldUploadButton, getCldImageUrl } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
export default function CloudinaryPhotos(props: any) {
  const [imagePublicId, setImagePublicId] = useState<string | null>(null);
  const url = getCldImageUrl({
    width: 960,
    height: 600,
    src: imagePublicId ? imagePublicId : "",
  });

  const handleUpload = (result: any) => {
    console.log(result);
    setImagePublicId(result.info.public_id);
  };
  return (
    <div>
      <CldUploadButton
        options={{ multiple: true }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
        onUpload={handleUpload} // Replace 'onUpload' with 'onSuccess'
      >
        <span>Upload</span>
      </CldUploadButton>
      <Image
        src={url}
        width={960}
        height={600}
        alt="image"
        style={{ width: "auto" }}
      />
    </div>
  );
}
