import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SinglePosts from "./pages/posts/SinglePost";
import NavbarComp from "./components/ui/NavbarComp";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Write from "./pages/write/Write";
import { AuthContext } from "./context/authcontext/AuthContext";

export default function App() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Router>
        <NavbarComp />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={user ? <Home /> : <Login />}></Route>
          <Route
            path="/register"
            element={user ? <Home /> : <Register />}
          ></Route>
          <Route
            path="/write"
            element={user ? <Write /> : <Register />}
          ></Route>
          <Route
            path="/settings"
            element={user ? <Settings /> : <Register />}
          ></Route>
          <Route
            path="/blogposts/:blogPostId"
            element={<SinglePosts />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}
