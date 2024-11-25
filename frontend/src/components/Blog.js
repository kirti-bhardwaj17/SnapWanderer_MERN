import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogBackground = () => (
  <Box
    sx={{
      backgroundImage: "url('https://i.pinimg.com/474x/2b/8c/11/2b8c11ce7a01bf57b95ffcfd60b16553.jpg')",
      backgroundSize: "cover",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  />
);

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

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

  return (
    <>
      <BlogBackground />
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
          bgcolor: "#FEE9E1",
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
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName ? userName.charAt(0) : ""}
            </Avatar>
          }
          title={title}
        />
        <CardMedia component="img" height="194" image={imageURL} alt="Blog Image" />
        <CardContent>
          <hr />
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b> {": "} {description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Blog;
