import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../../context/authcontext/AuthContext";

function Settings() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(user);

  // function to update userData state based on form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  console.log("user", userData);
  return (
    <Form className="container">
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder={userData.email}
          onChange={handleChange}
          name="email"
        />
        <Form.Text className="text-muted">
          Enter your new email address.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Current Password</Form.Label>
        <Form.Control type="password" placeholder="Current Password" />
        <Form.Text className="text-muted">
          Changing Password? Please enter your current password.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          className="mb-2"
          type="password"
          placeholder="Enter new password"
        />
        <Form.Control type="password" placeholder="Re-enter new password." />
        <Form.Text className="text-muted">
          Please enter your new password.
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default Settings;
