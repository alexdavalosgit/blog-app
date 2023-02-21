import React, { useState, useContext } from "react";
import { Container, Form, InputGroup, Button, Image } from "react-bootstrap";
import { baseAPI } from "../../utils";
import { AuthContext } from "../../context/authcontext/AuthContext";
import "./write.css";

function Write() {
  // Const
  const { user } = useContext(AuthContext);
  // State
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    photo: null,
    username: user.username,
    category: "",
  });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "photo") {
      setFile(event.target.files[0]);
    }
    setNewPost((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
        photo: fileName,
      };
    });
  };

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const url = `${baseAPI}/blogposts/`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    if (res.ok) {
      console.log(`Successfully created a blog post`);
    } else {
      console.log("error creating post");
    }
  };
  console.log("url", `${baseAPI}/upload`);
  return (
    <Container className="py-5 text-center write-container">
      {file ? (
        <Image
          fluid
          src={URL.createObjectURL(file)}
          alt="blog img"
          className="header-img py-2"
        />
      ) : (
        <Image
          fluid
          src="https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
          alt="caption img"
          className="header-img py-2"
        />
      )}
      <Form onSubmit={handleSubmit} className="py-3">
        <h2 className="mb-3">Create a new blog posts.</h2>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" name="photo" onChange={handleFileChange} />
          <Form.Label>Upload an image (optional)</Form.Label>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            onChange={handleChange}
            name="title"
            value={newPost.title}
            placeholder="Title"
          />
        </Form.Group>

        <InputGroup className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Write your posts here..."
            name="description"
            onChange={handleChange}
            value={newPost.description}
          />
        </InputGroup>

        <Button variant="primary" type="submit">
          Post
        </Button>
      </Form>
    </Container>
  );
}

export default Write;
