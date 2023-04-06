import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { baseAPI } from "../../utils";

function ImageUpload({ handleImageChange, setFilePreview }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState();

  const handleFileChange = async (event) => {
    const newFile = event.target.files[0];
    const formData = new FormData();
    const fileName = Date.now() + newFile.name;
    setFileName(fileName);
    formData.append("name", fileName);
    formData.append("file", newFile);
    console.log("formData", formData);
    try {
      const url = `${baseAPI}/upload`;
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        console.log("uploaded to multer..");
        setFile(newFile);
        handleImageChange(fileName);
        setFilePreview(newFile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form.Group controlId="formFile" className="mb-3">
      <Form.Control type="file" name="photo" onChange={handleFileChange} />
      <Form.Label>Upload an image (optional)</Form.Label>
    </Form.Group>
  );
}

export default ImageUpload;
