import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home({currUser}) {
  const [posts, setPosts] = useState([] as any[]);

  useEffect(() => {
    const url = "/api/v1/posts/index";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network Error");
      })
      .then((response) => setPosts(response))
      .catch((error) => console.error(error));
  }, []);

  const allPosts = posts.map((post, index) => (
    <div key={index} className="d-flex justify-content-between align-items-center shadow p-3 mb-3 bg-body rounded">
      <h2 className="h6 me-5">{post.title}</h2>
      <Link to={`/post/${post.id}`} className="btn btn-info text-nowrap">View Post</Link>
    </div>
  ));

  return (
    <>
      <div className="container pt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h4 text-dark text-opacity-50">Latest Posts</h1>
            </div>
            <div>{allPosts}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;