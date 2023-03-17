import React from "react";
import { Card, InputGroup, Form } from "react-bootstrap";

function PostDescription({ updateMode, description, handleChange }) {
  return (
    <div>
      {!updateMode ? (
        <Card.Text>{description}</Card.Text>
      ) : (
        <InputGroup>
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            type="text"
            placeholder={description}
            name="description"
            value={description}
            onChange={handleChange}
          />
        </InputGroup>
      )}
    </div>
  );
}

export default PostDescription;
