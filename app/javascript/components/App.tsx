import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Post from "./post/Post";
import NewPost from "./post/NewPost";
import EditPost from "./post/EditPost";
import NavBar from "./Navbar"
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import FilteredPosts from "./post/FilteredPosts";
import EditComment from "./comment/EditComment";

function App() {
  const [currUser, setCurrUser] = useState({loggedIn: false, user: {}});

  function handleLogin(data) {
    setCurrUser({...currUser, loggedIn: true, user: data.user});
  }

  function handleLogout() {
    const url = "/logout";
    const options : Object = {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Server Error");
      })
      .then((response) => {
        setCurrUser({...currUser, loggedIn: false, user: {}});
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    const url = "/logged_in";
    const options : Object = {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Server Error");
      })
      .then((response) => {
        if (response.logged_in && currUser.loggedIn === false) {
          setCurrUser({...currUser, loggedIn: true, user: response.user});
        } else if (!response.logged_in && currUser.loggedIn === true) {
          setCurrUser({...currUser, loggedIn: false, user: {}});
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return(
    <>
      <Router>
        <header><NavBar currUser={currUser} handleLogout={handleLogout} /></header>
        <Routes>
          <Route path="/" element={<Home currUser={currUser} />} />
          <Route path="/post" element={<NewPost />} />
          <Route path="/post/:id" element={<Post currUser={currUser} />} />
          <Route path="/post/:id/edit" element={<EditPost />} />
          <Route path="/signup" element={<Signup handleLogin={handleLogin} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/posts/:category" element={<FilteredPosts />} />
          <Route path="/comment/:id/edit" element={<EditComment />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;