import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Posts from "../../components/post/Posts";
import { baseAPI } from "../../utils";

export default function Home() {
  // State
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

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <Container>
        <h3 className="py-2 text-center">Home</h3>
        <Posts posts={posts} loading={isLoading} />
      </Container>
    </div>
  );
}
