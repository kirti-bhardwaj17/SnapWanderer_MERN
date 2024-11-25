import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Blog from './Blog';

const UserBlogs = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const id = localStorage.getItem("userId");

  // Stabilize the API request function
  const sendRequest = useCallback(async () => {
    if (!id) {
      setError("No user ID found. Please log in again.");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(`https://snapwanderer-mern.onrender.com/api/blog/user/${id}`);
      return res.data;
    } catch (err) {
      setError('Error fetching blogs. Please try again later.');
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    sendRequest().then((data) => {
      if (data) {
        setUser(data.user);
      }
      setLoading(false);
    });
  }, [sendRequest]); // Include sendRequest as a dependency

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {user && user.blogs && user.blogs.length > 0 ? (
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))
      ) : (
        <div>No blogs available</div>
      )}
    </div>
  );
};

export default UserBlogs;
