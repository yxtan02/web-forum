import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function NewComment() {
  const [buttonDisplay, setButtonDisplay] = useState({display: "block"});
  const [formDisplay, setFormDisplay] = useState({display: "none"});
  const [content, setContent] = useState("");
  const params = useParams();
  
  function openForm() {
    setFormDisplay({display: "block"})
    setButtonDisplay({display: "none"});
  }

  function closeForm() {
    setFormDisplay({display: "none"})
    setButtonDisplay({display: "block"});
  }

  function onSubmit(event) {
    event.preventDefault();
        
    const url = `/api/v1/posts/${params.id}/comments`;
    const csrfTokenElement = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
    const csrfToken = csrfTokenElement.content;
    const options = {
      method: "POST",
      headers: {
        "X-CSRF-Token": csrfToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({content}),
    };

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
      <div className="d-flex justify-content-between mb-2">
        <h5>Comments:</h5>
        <button className="btn btn-outline-primary btn-sm" onClick={openForm} style={buttonDisplay}>Add Comment</button>
      </div>
      <form style={formDisplay} onSubmit={onSubmit}>
        <div className="d-flex justify-content-between mt-4">
          <label htmlFor="comment" className="form-label p lead">Add a new comment:</label>
          <button className="btn-close" onClick={closeForm}></button>
        </div>
        <textarea
          name="comment"
          id="comment"
          rows = {4}
          required
          className="form-control mb-3" 
          onChange={(event) => setContent(event.target.value)}/>
        <button type="submit" className="btn btn-primary me-2 mb-4">Comment</button>
        <Link to="/" className="btn btn-light mb-4">Cancel</Link>
        <hr />
      </form>
    </>
  )
}

export default NewComment