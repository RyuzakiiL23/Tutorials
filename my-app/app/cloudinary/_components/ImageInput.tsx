'use client';
import React, { useState, useRef, useCallback } from 'react';
import { TbCloudUpload } from "react-icons/tb";

const ImageInput: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDrag = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragActive(true);
    } else if (event.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      // Handle file drop
      console.log(event.dataTransfer.files);
    }
  }, []);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      // Handle file selection
      console.log(event.target.files);
    }
  }, []);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <div>
      <form className="flex items-center justify-center w-fit h-fit">
        <div
          className={`cursor-pointer bg-gray-300 p-8 rounded-2xl border-2 border-dashed border-gray-600 shadow-[0_0_200px_-50px_rgba(0,0,0,0.719)] ${dragActive ? 'bg-gray-200' : ''}`}
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
            <span className="bg-gray-600 text-white py-1 px-4 rounded-lg transition-all duration-300 hover:bg-gray-800">Browse file</span>
          </div>
          <input
            ref={inputRef}
            id="file"
            type="file"
            className="hidden"
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default ImageInput;