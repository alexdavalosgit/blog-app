import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Post({
  id,
  title,
  description,
  date,
  image,
  username,
  category,
  onError,
}) {
  // const
  const PF = "http://localhost:9000/images/";
  // state
  const [imageUrl, setImageUrl] = useState(
    image
      ? PF + image
      : "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
  );

  const handleError = (event) => {
    const { target } = event;
    if (
      target.src &&
      target.src.includes(PF) &&
      target.naturalWidth === 0 &&
      target.naturalHeight === 0
    ) {
      onError && onError("Failed to load image: resource not found");
      setImageUrl(
        "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
      );
    }
  };
  return (
    <Card className="mb-3">
      <Card.Img src={imageUrl} alt="blog img" onError={handleError} />
      <Card.Body>
        <Link to={`/blogposts/${id}`}>
          <Card.Title>{title}</Card.Title>
        </Link>
        <p className="fw-bold">{new Date(date).toDateString()}</p>
        <Card.Text className="fw-bold">by {username}</Card.Text>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Post;
