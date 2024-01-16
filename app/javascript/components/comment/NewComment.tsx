import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

function NewComment() {
  const [buttonDisplay, setButtonDisplay] = useState({display: "block"});
  const [formDisplay, setFormDisplay] = useState({display: "none"});
  const [content, setContent] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  
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
      .then((response) => navigate(`/`))
      .catch((error) => console.error(error));
  }

  return (
    <>
      <button className="btn btn-primary" onClick={openForm} style={buttonDisplay}>Add Comment</button>
      <form style={formDisplay} onSubmit={onSubmit}>
        <div className="d-flex justify-content-between">
          <label htmlFor="comment" className="form-label h5">Comment:</label>
          <button className="btn-close" onClick={closeForm}></button>
        </div>
        <textarea
          name="comment"
          id="comment"
          rows = {4}
          required
          className="form-control mb-3" 
          onChange={(event) => setContent(event.target.value)}/>
        <button type="submit" className="btn btn-primary me-2 mb-5">Add Comment</button>
        <Link to="/" className="btn btn-light mb-5">Cancel</Link>
      </form>
    </>
  )
}

export default NewComment