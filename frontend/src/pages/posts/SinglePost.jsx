import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { baseAPI } from "../../utils";
import Loading from "../../components/ui/Loading";
import { Container, Card, Button } from "react-bootstrap";

function SinglePost() {
  // state
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // const
  const PF = "http://localhost:9000/images/";

  // Find post ID
  const location = useLocation();
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

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <Container className="p-5">
      <Link to={"/"}>
        <Button className="mb-3">Back</Button>
      </Link>
      {isLoading ? (
        <Loading />
      ) : post ? (
        <Card>
          {post.photo ? (
            <Card.Img src={PF + post.photo} alt="blog img" />
          ) : (
            <Card.Img
              src="https://images.unsplash.com/photo-1675410200389-903e50c46cbf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="default img"
            />
          )}
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <p>{new Date(post.updatedAt).toDateString()}</p>
            <Link to={`/profile?=${post.username}`}>
              <p>By {post.username}</p>
            </Link>
            {post.description ? (
              <Card.Text>{post.description}</Card.Text>
            ) : (
              <Card.Text>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. A
                lacus vestibulum sed arcu non odio euismod lacinia. Tincidunt
                dui ut ornare lectus sit amet est. Etiam non quam lacus
                suspendisse faucibus interdum posuere lorem ipsum. Faucibus
                pulvinar elementum integer enim neque volutpat. A diam
                sollicitudin tempor id eu nisl nunc mi. Duis convallis convallis
                tellus id interdum velit. Amet aliquam id diam maecenas
                ultricies. Sapien pellentesque habitant morbi tristique senectus
                et netus et malesuada. Blandit libero volutpat sed cras ornare
                arcu. Ac feugiat sed lectus vestibulum. Ornare quam viverra orci
                sagittis eu volutpat odio facilisis mauris. Euismod nisi porta
                lorem mollis aliquam ut porttitor leo. Scelerisque fermentum dui
                faucibus in ornare quam viverra orci sagittis. Aliquam sem
                fringilla ut morbi tincidunt augue interdum velit. Donec pretium
                vulputate sapien nec sagittis aliquam malesuada. Orci porta non
                pulvinar neque laoreet. Fermentum leo vel orci porta non. Turpis
                massa tincidunt dui ut. At imperdiet dui accumsan sit amet. Nunc
                scelerisque viverra mauris in aliquam sem fringilla ut. Porta
                lorem mollis aliquam ut porttitor leo. Nulla facilisi nullam
                vehicula ipsum a. Ultrices neque ornare aenean euismod elementum
                nisi quis eleifend quam. Enim lobortis scelerisque fermentum dui
                faucibus. Mauris in aliquam sem fringilla ut. In fermentum
                posuere urna nec tincidunt. In mollis nunc sed id semper risus
                in hendrerit. Id donec ultrices tincidunt arcu non sodales neque
                sodales. Pellentesque elit eget gravida cum sociis natoque
                penatibus. Platea dictumst quisque sagittis purus sit amet.
                Proin gravida hendrerit lectus a. Sed tempus urna et pharetra
                pharetra massa. Hac habitasse platea dictumst vestibulum rhoncus
                est pellentesque. Ut eu sem integer vitae justo eget magna
                fermentum iaculis. Ornare quam viverra orci sagittis eu.
                Habitasse platea dictumst quisque sagittis purus sit amet
                volutpat. Vestibulum mattis ullamcorper velit sed. Integer quis
                auctor elit sed. Libero justo laoreet sit amet cursus. Potenti
                nullam ac tortor vitae purus. Sagittis vitae et leo duis ut
                diam. Ornare arcu odio ut sem nulla pharetra diam sit. Magna sit
                amet purus gravida quis blandit turpis. Quisque egestas diam in
                arcu cursus euismod quis viverra nibh. Quam adipiscing vitae
                proin sagittis nisl rhoncus mattis. Turpis massa sed elementum
                tempus egestas sed sed risus pretium. Massa vitae tortor
                condimentum lacinia quis vel eros donec.
              </Card.Text>
            )}
          </Card.Body>
        </Card>
      ) : (
        <p>Failed to fetch post data. Please try again.</p>
      )}
    </Container>
  );
}

export default SinglePost;
