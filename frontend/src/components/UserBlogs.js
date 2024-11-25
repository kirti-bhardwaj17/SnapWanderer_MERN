import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Blog from './Blog';

const UserBlogs = () => {
  const [user, setUser] = useState(null);  // Initialize as null
  const [loading, setLoading] = useState(true);  // Loading state to show loading indicator
  const [error, setError] = useState(null);    // Error state

  const id = localStorage.getItem("userId");

  // Memoizing sendRequest function to prevent re-creation on each render
  const sendRequest = useCallback(async () => {
    try {
      const res = await axios.get(`https://snapwanderer-mern.onrender.com/api/blog/user/${id}`);
      return res.data;
    } catch (err) {
      setError('Error fetching blogs. Please try again later.');
      console.log(err);
    }
  }, [id]);  // Add `id` to dependencies

  useEffect(() => {
    sendRequest().then((data) => {
      if (data) {
        setUser(data.user);
      }
      setLoading(false);
    });
  }, [sendRequest]);  // Dependency array ensures this runs only once or when `sendRequest` changes

  if (loading) return <div>Loading...</div>;  // Display loading indicator while data is fetched
  if (error) return <div>{error}</div>;  // Display error message if there's an issue

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
        <div>No blogs available</div>  // Message when the user has no blogs
      )}
    </div>
  );
};

export default UserBlogs;
