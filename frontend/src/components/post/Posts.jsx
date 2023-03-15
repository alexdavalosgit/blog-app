import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import Post from "./Post";
import Loading from "../ui/Loading";
import { baseAPI } from "../../utils";

function Posts({ posts, loading, user }) {
  const handleDelete = async (postId) => {
    try {
      const url = `${baseAPI}/blogposts/${postId}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ username: user }),
      });
      if (res.ok) {
        console.log(`Deleted posts ${postId}`);
      } else {
        console.log(`Failed with res ${res.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="px-5">
      {loading && <Loading />}
      {posts && posts.length > 0 ? (
        <Row>
          {posts.map((post) => {
            const isUserPost = post.username === user;
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
                  isUserPost={isUserPost}
                  handleDelete={handleDelete}
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
