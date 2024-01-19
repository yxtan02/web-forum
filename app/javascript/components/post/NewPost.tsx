import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NewPost() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    
    function onSubmit(event) {
        event.preventDefault();
        
        const url = "/api/v1/posts/create";
        const csrfTokenElement = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
        const csrfToken = csrfTokenElement.content;
        const options = {
          method: "POST",
          headers: {
            "X-CSRF-Token": csrfToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({title, description, category}),
        };

        fetch(url, options)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network Error");
          })
          .then((response) => navigate(`/post/${response.id}`))
          .catch((error) => console.error(error));
    };

    return (
      <>
        <div className="container pt-5">
          <div className="row justify-content-center">
            <div className="col-9">
              <div className="d-flex justify-content-between">
                <h1 className="h2 pb-4">New post</h1>
                <Link to="/" className="btn-close" aria-label="Close"></Link>
              </div>

              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label h5">Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    className="form-control"
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label h5">Category</label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    required
                    className="form-control"
                    onChange={(event) => setCategory(event.target.value)}
                  />
                </div>
                  
                <div className="mb-3">
                  <label htmlFor="description" className="form-label h5">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    rows = {5}
                    required
                    className="form-control"
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary me-2">Create</button>
                <Link to="/" className="btn btn-light">Cancel</Link>
              </form>
            </div>
          </div>
        </div>
      </>
    );
};
  
export default NewPost;