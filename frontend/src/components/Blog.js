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
    <>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh", // Full viewport height
          backgroundImage: "url('https://i.pinimg.com/736x/47/57/a8/4757a8969c6b038cda876ed64e986c00.jpg')", // Update this with the actual image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1, // Send the background behind the content
        }}
      />
      <Box
        sx={{
          position: "relative", // Content positioned relative to the background
          width: "100%", // Full width
          minHeight: "100vh", // Match the height of the viewport
          display: "flex", // Flexbox for alignment
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          padding: 0,
          margin: 0,
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
