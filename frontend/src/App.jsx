import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SinglePosts from "./pages/posts/SinglePost";
import NavbarComp from "./components/ui/NavbarComp";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Write from "./pages/write/Write";

export default function App() {
  return (
    <div>
      <Router>
        <NavbarComp />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/write" element={<Write />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route
            path="/blogposts/:blogPostId"
            element={<SinglePosts />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}
