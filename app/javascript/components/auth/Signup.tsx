import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';

function Signup({ handleLogin }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const[user, setUser] = useState({username: "", password: ""});

  const onSubmit = (event) => {
    event.preventDefault();

    const url = "/registrations";
    const options : Object = {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user})
    };

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Server Error");
      })
      .then((response) => {
        handleLogin(response);
        navigate("/");
      })
      .catch((error) => setError(error));
  };

  if (error) return (<Alert severity="error">Sign up failed</Alert>);

  return (
    <>
      <div className="container pt-5">
        <div className="row justify-content-center">
           <div className="col-9">
              <div className="d-flex justify-content-between">
                <h1 className="h2 pb-4">Sign up</h1>
                <Link to="/" className="btn-close" aria-label="Close"></Link>
              </div>

              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label h5">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    required
                    className="form-control"
                    onChange={(event) => setUser({...user, username: event.target.value})}
                  />
                </div>
                  
                <div className="mb-3">
                  <label htmlFor="password" className="form-label h5">Password</label>
                  <input
                    type='password'
                    name="password"
                    id="password"
                    required
                    className="form-control"
                    onChange={(event) => setUser({...user, password: event.target.value})}
                  />
                </div>

                <button type="submit" className="btn btn-primary me-2 mt-3">Sign Up</button>
                <Link to="/" className="btn btn-light mt-3">Cancel</Link>
              </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup