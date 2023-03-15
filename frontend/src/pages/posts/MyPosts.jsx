import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../context/authcontext/AuthContext";
import Posts from "../../components/post/Posts";
import { baseAPI } from "../../utils";

function MyPosts() {
  // State
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // Const
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch all posts
  const fetchPostsByUser = async () => {
    try {
      setIsLoading(true);
      const url = `${baseAPI}/blogposts?user=${user.username}`;
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
    if (!user) {
      navigate("/");
    } else fetchPostsByUser();
  }, [user]);

  return (
    <div>
      <Container>
        <h3 className="py-2 text-center">My Posts</h3>
        {!posts ? (
          <h2>You havent made any blog posts yet... Get to posting!</h2>
        ) : (
          <Posts
            posts={posts}
            loading={isLoading}
            user={user ? user.username : ""}
          />
        )}
      </Container>
    </div>
  );
}

export default MyPosts;
