import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditPost() {
    const params = useParams();
    const navigate = useNavigate();
    const [tempPost, setTempPost] = useState({} as any);
    const [changed, setChanged] = useState(false);

    console.log(tempPost)
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
          setTempPost(response);
        })
        .catch((error) => console.error(error));
    }, [params.id]);
    
    function onSubmit(event) {
        event.preventDefault();
        
        const url = `/api/v1/update/${params.id}`;
        const csrfTokenElement = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
        const csrfToken = csrfTokenElement.content;
        const options = {
          method: "PUT",
          headers: {
            "X-CSRF-Token": csrfToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tempPost),
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
                <h1 className="h2 pb-4">Edit your post</h1>
                <Link to={`/post/${params.id}`} className="btn-close" aria-label="Close"></Link>
              </div>

              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label h5">Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={tempPost.title}
                    required
                    readOnly
                    className="form-control-plaintext"
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="description" className="form-label h5">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    rows = {5}
                    value={tempPost.description}
                    required
                    className="form-control"
                    onChange={(event) => {
                      setChanged(true);
                      setTempPost({description: event.target.value});
                    }}
                  />
                </div>
                {changed ? <>
                             <button type="submit" className="btn btn-primary me-2">&nbsp; Save &nbsp;</button>
                             <Link to={`/post/${params.id}`} className="btn btn-light">Cancel</Link>
                           </>
                         : <Link to={`/post/${params.id}`} className="btn btn-light">Cancel</Link>
                }
                
              </form>
            </div>
          </div>
        </div>
      </>
    );
}

export default EditPost;