import React, { useState } from "react";
import axios from "axios";

const CloudinaryUpload = () => {
  const [fileInput, setFileInput] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
      previewFile(file);
      setFileInput(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    try {
      await axios.post("http://localhost:8000/api/cloudinary/upload", {
        data: base64EncodedImage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Upload to cloudinary</h1>
      <form onSubmit={handleSubmitFile} className="form">
        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInput}
          className="form-input"
        />
        <button className="btn" typr="submit">
          Submit
        </button>
      </form>
      {previewSource && (
        <>
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
          <embed src={previewSource} style={{ height: "300px" }} type="application/pdf" />
          </>
      )}
    </div>
  );
};

export default CloudinaryUpload;
