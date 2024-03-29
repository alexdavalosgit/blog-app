import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Posts from "../../components/post/Posts";
import { baseAPI } from "../../utils";
import { useLocation } from "react-router-dom";

export default function Home() {
  // State
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // Const
  const { search } = useLocation();

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const url = `${baseAPI}/blogposts/` + search;
      console.log(url);
      const res = await fetch(url);
      const json = await res.json();
      if (res.ok) {
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
  }, [search]);

  return (
    <div>
      <Container>
        <h3 className="py-4 text-center">Latest Blogs</h3>
        <Posts posts={posts} loading={isLoading} />
      </Container>
    </div>
  );
}
