// PostTitle.js
import React, { useState } from "react";
import { Card, Button, InputGroup, Form } from "react-bootstrap";

function PostTitle({
  title,
  username,
  updateMode,
  onDelete,
  handleChange,
  setUpdateMode,
}) {
  return (
    <Card.Title className="d-sm-flex justify-content-between">
      {updateMode ? (
        <InputGroup className="me-2">
          <Form.Control
            type="text"
            value={title}
            name="title"
            onChange={handleChange}
          />
        </InputGroup>
      ) : (
        <div>
          <h3>{title}</h3>
          {username && (
            <>
              <Button
                variant="success"
                className="me-1"
                size="sm"
                onClick={() => setUpdateMode(true)}
              >
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={onDelete}>
                Delete
              </Button>
            </>
          )}
        </div>
      )}
    </Card.Title>
  );
}

export default PostTitle;
