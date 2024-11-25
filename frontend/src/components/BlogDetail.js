import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null); // State to store blog details
  const [inputs, setInputs] = useState({}); // State for form inputs
  const id = useParams().id; // Extract blog ID from URL

  // Handle input field changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Fetch blog details from API
  const fetchDetails = async () => {
    try {
      const res = await axios.get(
        `https://snapwanderer-mern.onrender.com/api/blog/${id}`
      );
      const data = res.data;
      return data;
    } catch (error) {
      console.error("Failed to fetch blog details:", error);
    }
  };

  // UseEffect to fetch blog details on component mount
  useEffect(() => {
    fetchDetails().then((data) => {
      if (data) {
        setBlog(data.blog);
        setInputs({
          title: data.blog.title,
          description: data.blog.description,
        });
      }
    });
  }, [id]);

  // Send updated blog data to API
  const sendRequest = async () => {
    try {
      const res = await axios.put(
        `https://snapwanderer-mern.onrender.com/api/blog/update/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
        }
      );
      return res.data;
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => {
        console.log("Blog updated successfully:", data);
        navigate("/myBlogs/"); // Redirect to "My Blogs" page
      })
      .catch((error) => console.error("Failed to update blog:", error));
  };

  return (
    <div>
      {blog ? (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="rgba(58,75,180,1)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin="auto"
            marginTop={3}
            display="flex"
            flexDirection="column"
            width={{ xs: "90%", sm: "80%", md: "60%" }}
          >
            <Typography
              fontWeight="bold"
              padding={3}
              color="grey"
              variant="h4"
              textAlign="center"
            >
              Edit Your Blog
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title || ""}
              margin="normal"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={inputs.description || ""}
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
            />
            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      ) : (
        <Typography variant="h6" color="error" align="center" marginTop={5}>
          Failed to load blog details. Please try again later.
        </Typography>
      )}
    </div>
  );
};

export default BlogDetail;
