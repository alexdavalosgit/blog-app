import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Posts from "../../components/post/Posts";
import { baseAPI } from "../../utils";
import { useLocation, useParams } from "react-router-dom";

export default function Profile() {
  // State
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // Const
  const { username } = useParams();

  // Fetch all posts
  const fetchPostsByUser = async () => {
    try {
      setIsLoading(true);
      const url = `${baseAPI}/blogposts?=${username}`;
      const res = await fetch(url);
      const json = await res.json();
      console.log(json);
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
    fetchPostsByUser();
  }, []);

  return (
    <div>
      <Container>
        <h3 className="py-2 text-center">{username}'s Profile</h3>
        <Posts posts={posts} loading={isLoading} />
      </Container>
    </div>
  );
}
