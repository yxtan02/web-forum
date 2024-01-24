import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NewComment from "../comment/NewComment";

function Post({currUser}) {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({} as any);
  const [comments, setComments] = useState([] as any);

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
          setComments(response.comments);
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

  const editDeleteButtons =
    <>
      <Link to={`/post/${params.id}/edit`} className="btn btn-outline-primary btn-sm me-2">Edit Post</Link>
      <button type="button" className="btn btn-outline-danger btn-sm me-3" onClick={deletePost}>Delete Post</button>
    </>
  
  const allComments = comments.map((comment, index) => (
    <div key={index} className="mb-3 p-1 align-items-center">
      <div className="d-flex justify-content-between">
        <h6>{comment?.user?.username}</h6>
        <div>{(comment?.user?.username == currUser?.user?.username)
               ? <>
                   <Link to={`/comment/${comment.id}/edit`} className="btn btn-outline-primary btn-sm me-2">Edit</Link>
                    <button type="button"
                      className="btn btn-outline-danger btn-sm me-3"
                       onClick={() => deleteComment(comment.id) }>
                      Delete
                    </button>
                 </>
               : <></>}
          
        </div>
      </div>
      <p className="text-justify comment-text mb-0">{comment.content}</p>
    </div>
  ));

  function deleteComment(commentId) {
    const url = `/api/v1/posts/${params.id}/comments/${commentId}`;
    console.log(url);
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
      .then(() => window.location.reload())
      .catch((error) => console.error(error));
  }

  return (
    <>
      <div className="container pt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-10 offset-md-1">
            <div className="row justify-content-start">
              <h1 className="h3 col-11">{post.title}</h1>
              <button onClick={() => navigate("/")} className="btn-close col"></button>
            </div>
          </div>
          <div className="col-9">
            <div className="d-flex justify-content-between">
              <div className="d-flex" style={{gap: 30}}>
                <p className="lead align-items-center" >Posted by: {post?.user?.username}</p>
                <span className="badge text-bg-secondary mt-1" style={{height: 23}}>{post.category}</span>
              </div>
              <div>{(post?.user?.username == currUser?.user?.username) ? editDeleteButtons : <></>}</div>
            </div>
            <p className="pt-3 pb-4">{post.description}</p>
            {currUser.loggedIn ? <NewComment /> : <h5 className="mb-3">Comments:</h5>}
            <div>{allComments}</div>
          </div>
        </div>
      </div>
    </>
  );
};
  
export default Post;