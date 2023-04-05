import React, { useState, useEffect, useContext } from "react";
import { Image, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authcontext/AuthContext";
import "./avatar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import defaultAvatarImg from "../../images/defaultImg.jpeg";

function AvatarDropdown({ logout }) {
  const { user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="avatar-dropdown">
      <button className="avatar-btn">
        <Image
          src={user.image == "" ? user.image : defaultAvatarImg}
          alt="Avatar"
          className="avatar-img"
        />
        <FontAwesomeIcon
          icon={faChevronDown}
          className="dropdown-icon"
          onClick={() => setShowDropdown(!showDropdown)}
        />
      </button>
      {showDropdown && (
        <div className="dropdown-content">
          <Nav.Link as={Link} to={`/profile/${user.username}`}>
            My Posts
          </Nav.Link>
          <Nav.Link as={Link} to={`/settings`}>
            Settings
          </Nav.Link>
          <Nav.Link as={Link} onClick={logout}>
            Logout
          </Nav.Link>
        </div>
      )}
    </div>
  );
}

export default AvatarDropdown;
