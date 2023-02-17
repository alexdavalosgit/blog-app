import React, { useRef, useContext } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { AuthContext } from "../../context/authcontext/AuthContext";
import { baseAPI } from "../../utils";

function Login() {
  // const
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const url = `${baseAPI}/auth/login`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userRef.current.value,
          password: passwordRef.current.value,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        dispatch({ type: "LOGIN_SUCCESS", payload: json });
      } else {
        throw new Error(`Login failure with status ${res.status}`);
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control ref={userRef} type="username" placeholder="Username" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isFetching}>
          Sign In
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
