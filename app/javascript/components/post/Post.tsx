import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Post() {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({} as any);
  const [author, setAuthor] = useState({} as any);

  useEffect(() => {
      const url = `/api/v1/show/${params.id}`;
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network Error");
        })
        .then((response) => {
          setPost(response);
          setAuthor(response.user);
        })
        .catch((error) => console.error(error));
  }, [params.id]);

  function deletePost() {
    const url = `/api/v1/destroy/${params.id}`;
    const csrfTokenElement = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
    const csrfToken = csrfTokenElement.content;
    const options = {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": csrfToken,
        "Content-Type": "application/json",
      },
    }
  
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network Error");
      })
      .then(() => navigate("/"))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="container pt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-10 offset-md-1">
            <div className="row justify-content-start">
              <h1 className="h3 col-11">{post.title}</h1>
              <Link to="/" className="btn-close col" aria-label="Close"></Link>
            </div>
          </div>
          <div className="col-9">
            <p className="lead">Posted by: {author.username}</p>
            <p className="pt-4 pb-4">{post.description}</p>
            <Link to={`/post/${params.id}/edit`} className="btn btn-warning me-2">Edit Post</Link>
            <button type="button" className="btn btn-danger" onClick={deletePost}>Delete Post</button>
          </div>
        </div>
      </div>
    </>
  );
};
  
export default Post;