// PostImage.js
import React from "react";
import { Card } from "react-bootstrap";

function PostImage({ photo }) {
  const PF = "http://localhost:9000/images/";
  return (
    <Card.Img
      src={
        photo
          ? PF + photo
          : "https://images.unsplash.com/photo-1675410200389-903e50c46cbf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
      }
      alt="blog img"
      className="single-post-img"
    />
  );
}

export default PostImage;
