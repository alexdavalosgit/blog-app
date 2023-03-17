import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import Post from "./Post";
import Loading from "../ui/Loading";

function Posts({ posts, loading, user }) {
  return (
    <Container className="px-5">
      {loading && <Loading />}
      {posts && posts.length > 0 ? (
        <Row>
          {posts.map((post) => {
            return (
              <Col md={4} key={post._id}>
                <Post
                  id={post._id}
                  title={post.title}
                  description={post.description}
                  date={post.createdAt}
                  username={post.username}
                  category={post.category}
                  image={post.photo}
                />
              </Col>
            );
          })}
        </Row>
      ) : posts && posts.length === 0 ? (
        <h2>You have not made any blog posts. Start posting now!</h2>
      ) : (
        <h2>Trouble fetching posts. Try again...</h2>
      )}
    </Container>
  );
}

export default Posts;
