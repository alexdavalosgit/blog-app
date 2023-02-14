import React from "react";
import { Container } from "react-bootstrap";
import Posts from "../../components/post/Posts";

export default function Home() {
  return (
    <div>
      <Container>
        <h1>Home</h1>
        <Posts />
      </Container>
    </div>
  );
}
