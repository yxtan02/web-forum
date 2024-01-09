import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import EditPost from "../components/EditPost";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/post" element={<NewPost/>} />
      <Route path="/post/:id" element={<Post/>} />
      <Route path="/post/:id/edit" element={<EditPost/>} />
    </Routes>
  </Router>
);