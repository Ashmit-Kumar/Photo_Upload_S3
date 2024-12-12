import React, { useState } from "react";
import { getPresignedUrl, uploadImage } from "../services/api";

const UploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first.");
    try {
      const { url, 
        // key 
    } = await getPresignedUrl(file.name);
      await uploadImage(url, file);
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
