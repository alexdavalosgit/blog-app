import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { baseAPI } from "../../utils";
import Post from "./Post";
import Loading from "../ui/Loading";

function Posts() {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const url = `${baseAPI}/blogposts`;
      const res = await fetch(url);
      const json = await res.json();
      if (res.ok) {
        console.log("200 status");
        console.log("json", json);
        setPosts(json);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw new Error(`Failed to fetch data with status ${res.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log("posts", posts);
  return (
    <Container className="border">
      <h2>Blog posts.</h2>
      {isLoading ? (
        <Loading />
      ) : !posts ? (
        <p>Failed to load data. Please try again later.</p>
      ) : (
        posts.map((post) => {
          return (
            <Post
              key={post.id}
              title={post.title}
              description={post.description}
              date={post.createdAt}
              username={post.username}
              category={post.category}
            />
          );
        })
      )}
    </Container>
  );
}

export default Posts;
