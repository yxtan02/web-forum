import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditComment() {
  const params = useParams();
  const navigate = useNavigate();
  const [tempComment, setTempComment] = useState({} as any);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const url = `/api/v1/comments/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network Error");
      })
      .then((response) => {
        setTempComment(response);
      })
      .catch((error) => console.error(error));
  }, [params.id]);

  function onSubmit(event) {
    event.preventDefault();
        
    const url = `/api/v1/comments/${params.id}`;
    const csrfTokenElement = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
    const csrfToken = csrfTokenElement.content;
    const options = {
      method: "PUT",
      headers: {
        "X-CSRF-Token": csrfToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({content: tempComment}),
    };
    
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network Error");
        })
       .then((response) => navigate(-1))
       .catch((error) => console.error(error));
    };

  return (
    <>
      <div className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-9">
            <div className="d-flex justify-content-between" style={{gap: 510}}>
              <h1 className="h2 pb-4">Edit your comment</h1>
              <button onClick={() => navigate(-1)} className="btn-close col"></button>
            </div>

            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <textarea
                  name="description"
                  id="description"
                  rows = {5}
                  value={tempComment.content}
                  required
                  className="form-control"
                  onChange={(event) => {
                    setChanged(true);
                    setTempComment(event.target.value);
                  }}
                />
              </div>
              {changed ? <>
                           <button type="submit" className="btn btn-primary me-2">&nbsp; Save &nbsp;</button>
                           <Link to="/" className="btn btn-light">Cancel</Link>
                         </>
                       : <Link to="/" className="btn btn-light">Cancel</Link>
              }               
              </form>
            </div>
          </div>
        </div>
      </>
  )
}

export default EditComment