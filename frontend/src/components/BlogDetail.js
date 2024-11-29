import { Typography, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const id = useParams().id;

  const fetchDetails = async () => {
    try {
      const res = await axios.get(
        `https://snapwanderer-mern.onrender.com/api/blog/${id}`
      );
      return res.data;
    } catch (error) {
      console.error("Failed to fetch blog details:", error);
    }
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      if (data) {
        setBlog(data.blog);
      }
    });
  }, [id]);

  return (
    <div>
      {blog ? (
        <Box
          sx={{
            position: "relative",
            height: "100vh",
            width: "100vw",
            backgroundImage: `url('https://via.placeholder.com/1920x1080')`, // Replace with dynamic blog image
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay for better text contrast
              zIndex: 1,
            }}
          />

          {/* Blog Content */}
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              color: "white",
              p: 3,
              borderRadius: 2,
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(0, 0, 0, 0.7)", // Slightly transparent background for the content
              maxWidth: "80%",
              margin: "0 auto",
            }}
          >
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {blog.title}
            </Typography>
            <Typography variant="h5" sx={{ mt: 2 }}>
              {blog.description}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default BlogDetail;
