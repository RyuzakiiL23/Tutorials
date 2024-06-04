"use client";
import React, { useState, useRef, useCallback } from "react";
import { TbCloudUpload } from "react-icons/tb";
import Image from "next/image";
import Modal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";
import { FaTrash } from "react-icons/fa6";

const ImageUploadGpt: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDrag = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files) {
      handleFiles(event.dataTransfer.files);
    }
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        handleFiles(event.target.files);
      }
    },
    []
  );

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prevImages) => [...prevImages, ...fileArray]);
  };

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleRemoveImage = (image: string) => {
    setImages(images.filter((img) => img !== image));
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col items-center">
      <form className="flex items-center justify-center w-fit h-fit mb-4">
        <div
          className={`cursor-pointer bg-gray-300 p-8 rounded-2xl border-2 border-dashed border-gray-600 shadow-[0_0_200px_-50px_rgba(0,0,0,0.719)] ${
            dragActive ? "bg-gray-200" : ""
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <TbCloudUpload className="h-12 text-6xl text-gray-600 mb-5" />
            <p>Drag and Drop</p>
            <p>or</p>
            <span className="bg-gray-600 text-white py-1 px-4 rounded-lg transition-all duration-300 hover:bg-gray-800">
              Browse file
            </span>
          </div>
          <input
            ref={inputRef}
            id="file"
            type="file"
            className="hidden"
            multiple
            onChange={handleChange}
          />
        </div>
      </form>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative border-2 border-gray-600 rounded-lg p-2">
            <Image
              src={image}
              alt={`Uploaded Image ${index + 1}`}
              width={150}
              height={150}
              className="cursor-pointer "
              onClick={() => handleImageClick(image)}
            />
            <button
              onClick={() => handleRemoveImage(image)}
              className="absolute bottom-2 left-2 opacity-60 hover:opacity-100 duration-150 ease-in-out text-red-500"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      {selectedImage && (
        <Modal
          isOpen={!!selectedImage}
          onRequestClose={closeModal}
          contentLabel="Selected Image"
          className="flex items-center justify-center h-full"
        >
          <div className="relative w-full h-full">
            <Image
              src={selectedImage}
              alt="Selected"
              layout="fill"
              objectFit="contain"
            />
            <button
              onClick={closeModal}
              className="absolute text-2xl top-4 right-4 hover:opacity-60 duration-150 ease-in-out text-red-500 "
            >
              <IoIosCloseCircle />
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImageUploadGpt;
