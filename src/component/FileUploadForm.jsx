import React, { useState, useRef } from "react";
import "../styles/FileUploadForm.css";
import Sidebar from "./Sidebar";
import {toast} from 'react-toastify'

const FileUploadForm = ({ onFileUpload }) => {
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [previewKey, setPreviewKey] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;

    setSelectedFiles(files);

    const previews = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push({ file: files[i], preview: event.target.result, selected: false });
        setFilePreviews([...previews]);
      };
      reader.readAsDataURL(files[i]);
    }
    setPreviewKey((prevKey) => prevKey + 1);
  };
  const handleCheckboxChange = (index) => {
    const updatedPreviews = [...filePreviews];
    updatedPreviews[index].selected = !updatedPreviews[index].selected;
    setFilePreviews(updatedPreviews);
  };
  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      toast.error('Select images.');
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < filePreviews.length; i++) {
      if (filePreviews[i].selected) {
        formData.append('files', filePreviews[i].file);
      }
    }
    const formDataArray = [...formData.entries()];
    const formDataLength = formDataArray.length;
    if (formDataLength > 0) {
      onFileUpload(formData);
    } else {
      toast.error('Select images.');
      return;
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFilePreviews([]);
  };
  return (
    <>
      <div className='dashboard'>
        <Sidebar />
        <div className="modal-body">
          <div className='dashboard--content'>
            <h2 className="modal-title">Upload a file</h2>
            <p className="modal-description">Attach the file below</p>
            <input type="file" multiple onChange={handleFileChange} ref={fileInputRef} />
            <div className='flex-file-previews' key={previewKey}>
              {filePreviews.map((file, index) => (
                <div key={index} className='file-preview'>
                  <img src={file.preview} alt={`Preview of ${file.file.name}`} />
                  <div className='checkbox-wrapper-56'>
                    <label className='container'>
                      <input type='checkbox' checked={file.selected} onChange={() => handleCheckboxChange(index)} />
                      <div className='checkmark'></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-primary" onClick={handleUpload}>
              Upload File
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUploadForm;
