import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Post({ title, description, date, username, category }) {
  return (
    <Card>
      <Card.Img></Card.Img>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <p>{new Date(date).toDateString()}</p>
        <Card.Text>{description}</Card.Text>
        <Button>Read More</Button>
      </Card.Body>
    </Card>
  );
}

export default Post;
