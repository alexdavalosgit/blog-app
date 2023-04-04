import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { baseAPI } from "../../utils";
import Loading from "../../components/ui/Loading";
import { Container, Card, Button, InputGroup, Form } from "react-bootstrap";
import { AuthContext } from "../../context/authcontext/AuthContext";
import "./SinglePost.css";
import PostImage from "../../components/post/PostImage";
import PostTitle from "../../components/post/PostTitle";
import PostDescription from "../../components/post/PostDescription";

function SinglePost() {
  // state
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

  // const
  const PF = "http://localhost:9000/images/";
  const { user } = useContext(AuthContext);

  // Find post ID
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/")[2];

  // Fetch single post data
  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const url = `${baseAPI}/blogposts/${path}`;
      const res = await fetch(url);
      const json = await res.json();

      if (res.ok) {
        setPost(json);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw new Error(`Failed to fetch data with status ${res.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const url = `${baseAPI}/blogposts/${postId}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ username: user.username }),
      });
      if (res.ok) {
        console.log(`Deleted posts ${postId}`);
        // Redirect to homepage
        navigate("/");
      } else {
        console.log(`Failed with res ${res.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const url = `${baseAPI}/blogposts/${post._id}`;
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          username: user.username,
          title: post.title,
          description: post.description,
        }),
      });
      if (res.ok) {
        console.log("Updated post");
      } else {
        console.log("failed to update");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <Container className="py-5 d-sm-flex flex-column align-items-center ">
      <Link to={"/"}>
        <Button className="mb-3">Back</Button>
      </Link>
      {isLoading ? (
        <Loading />
      ) : (
        post && (
          <Card style={{ maxWidth: "50rem" }}>
            <PostImage photo={post.photo} />
            <Card.Body className="p-3">
              <PostTitle
                title={post.title}
                username={user.username}
                onDelete={handleDelete}
                handleChange={handleChange}
                updateMode={updateMode}
                setUpdateMode={setUpdateMode}
              />
              <p>{new Date(post.updatedAt).toDateString()}</p>
              <Link to={`/profile?=${post.username}`}>
                <p>By {post.username}</p>
              </Link>
              <PostDescription
                description={post.description}
                handleChange={handleChange}
                updateMode={updateMode}
              />
            </Card.Body>
            {updateMode && (
              <Button
                className=""
                variant="primary"
                size="sm"
                onClick={() => handleSave()}
              >
                Update
              </Button>
            )}
          </Card>
        )
      )}
    </Container>
  );
}

export default SinglePost;
