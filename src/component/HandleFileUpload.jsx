import React from "react";
import FileUploadForm from "./FileUploadForm"; // Adjust the import path accordingly
import FileUpload from "./FileUpload";
import {toast} from 'react-toastify'
import AuthMiddleware from './AuthMiddleware';
const handleFileUpload = () => {
  AuthMiddleware()
  // Define the function to handle file upload
  const handleFileUpload = async (formData) => {
    try {
      // Make a POST request to your server with the formData
      const response = await fetch("http://localhost:8081/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Handle successful upload
        toast.success("Files uploaded successfully");
      } else {
        // Handle upload failure
        toast.error("Upload failed");
      }
    } catch (error) {
      // Handle unexpected errors
      toast.error("An error occurred during file upload:", error);
    }
  };

  return (
    <div>
      {/* <h1>Multiple File Upload</h1> */}
      {/* <FileUploadForm onFileUpload={handleFileUpload} /> */}
      <FileUpload />
    </div>
  );
};

export default handleFileUpload;
