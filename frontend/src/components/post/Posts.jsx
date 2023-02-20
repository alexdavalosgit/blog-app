import React from "react";
import { Container } from "react-bootstrap";
import Post from "./Post";
import Loading from "../ui/Loading";

function Posts({ posts, loading }) {
  /*   const handleSortByLatest = () => {
    // Sort by latest
    const sortByLatest = (arr) => {
      console.log("calling sort");
      if (!arr) return;
      arr.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    };

    const sortedItems = sortByLatest([...posts]);
    setPosts(sortedItems);
  }; */

  return (
    <Container className="px-5">
      {loading ? (
        <Loading />
      ) : !posts ? (
        <p>Failed to load data. Please try again later.</p>
      ) : (
        <>
          <h4 className="text-center py-3">Blog posts by </h4>
          {posts.map((post) => {
            return (
              <Post
                id={post._id}
                title={post.title}
                description={post.description}
                date={post.createdAt}
                username={post.username}
                category={post.category}
              />
            );
          })}
        </>
      )}
    </Container>
  );
}

export default Posts;
