import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function FilteredPosts() {
    const params = useParams();
    const [posts, setPosts] = useState([] as any[]);

    useEffect(() => {
        const url = `/api/v1/posts/filter/${params.category}`;
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
    
    const filteredPosts = posts.map((post, index) => (
      <div key={index} className="d-flex justify-content-between align-items-center shadow p-3 mb-3 bg-body rounded">
        <div className="d-flex" style={{gap: 175}}>
          <h2 className="h6 me-5 align-items-center">{post.title}</h2>
          <span className="badge text-bg-secondary mt-1" style={{height: 23}}>{post.category}</span>
        </div>
        <Link to={`/post/${post.id}`} className="btn btn-info text-nowrap">View Post</Link>
      </div>
    ));

  return (
    <div className="container pt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-9">
          <div>{filteredPosts}</div>
        </div>
      </div>
    </div>
  )
}

export default FilteredPosts