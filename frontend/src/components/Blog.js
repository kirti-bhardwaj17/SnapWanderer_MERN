import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blog = ({ id, userName, title, description, imageURL, isUser }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const deleteRequest = async () => {
    try {
      const res = await axios.delete(`https://snapwanderer-mern.onrender.com/api/blog/${id}`);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
      alert("Error deleting the blog. Please try again.");
    }
  };

  const handleDelete = () => {
    setLoading(true);
    deleteRequest().then(() => {
      setLoading(false);
      navigate("/blogs"); // Navigate to blogs page after successful deletion
    });
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    // Wrap the entire content in a React Fragment or a single parent element to fix the syntax error
    <>
      {/* Set background color to cover the entire body of the page */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          minHeight: "100%", // Ensures it takes the full height of the body, even when scrolled
          backgroundColor: "#A7D8D8", // Pastel teal blue color
          zIndex: -1, // Keeps the background behind content
          overflow: "hidden", // Prevents scrolling the background
        }}
      />
      <Box
        sx={{
          position: "relative", // Content positioned relative to the background
          width: "100%", // Full width
          minHeight: "100vh", // Full height of the viewport
          display: "flex", // Flexbox for alignment
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          padding: 0,
          margin: 0,
          zIndex: 1, // Ensure content appears above the background
        }}
      >
        <Card
          sx={{
            width: { xs: "90%", sm: "70%", md: "40%" },
            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
            bgcolor: "#FEE9E1",
            borderRadius: 2,
          }}
        >
          {isUser && (
            <Box display="flex">
              <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                <ModeEditOutlineIcon color="warning" />
              </IconButton>
              <IconButton onClick={handleDelete}>
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  <DeleteForeverIcon color="error" />
                )}
              </IconButton>
            </Box>
          )}
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: "red" }} // Dynamic color based on user preferences
                aria-label="recipe"
              >
                {userName ? userName.charAt(0) : ""}
              </Avatar>
            }
            title={title}
          />
          <CardMedia
            component="img"
            height="194"
            image={imageURL}
            alt="Blog Image"
            sx={{ objectFit: "cover", borderRadius: "4px" }}
          />
          <CardContent>
            <hr />
            <Typography variant="body2" color="text.secondary">
              <b>{userName}</b> {": "} {description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Blog;
