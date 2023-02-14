import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Post({ id, title, description, date, username, category }) {
  return (
    <Card className="mb-3">
      <Card.Img
        src="https://images.unsplash.com/photo-1675410200389-903e50c46cbf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        alt="nature img"
      />
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
