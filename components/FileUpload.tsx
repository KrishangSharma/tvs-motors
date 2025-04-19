"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileUploadProps {
  onFileChange?: (file: File | null) => void;
  accept?: string;
  label?: string;
  value?: File | null;
  reset?: boolean;
}

export default function FileUpload({
  onFileChange,
  accept = "",
  label = "Drag & drop your file here or click to select",
  value = null,
  reset = false,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(value);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset the file when the reset prop changes
  useEffect(() => {
    if (reset) {
      setFile(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [reset]);

  // Update internal state when value prop changes
  useEffect(() => {
    setFile(value);
  }, [value]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      onFileChange?.(selectedFile);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onFileChange?.(selectedFile);
    } else {
      setFile(null);
      onFileChange?.(null);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-md p-6 text-center transition-colors ${
        dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      style={{ cursor: "pointer" }}
    >
      <Label htmlFor="file-upload" className="block mb-2 cursor-pointer">
        {file ? file.name : label}
      </Label>
      <Input
        ref={inputRef}
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleChange}
        accept={accept}
      />
    </div>
  );
}
