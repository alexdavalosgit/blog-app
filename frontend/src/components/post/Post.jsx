import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Post({ id, title, description, date, username, category }) {
  return (
    <Card>
      <Card.Img></Card.Img>
      <Card.Body>
        <Link to={`/blogposts/${id}`}>
          <Card.Title>{title}</Card.Title>
        </Link>
        <p>{new Date(date).toDateString()}</p>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Post;
