import { Box, Button, TextField, Typography, CircularProgress, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/index'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    try {
      const res = await axios.post(`https://snapwanderer-mern.onrender.com/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });

      return res.data;
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup && (!inputs.name || !inputs.email || !inputs.password)) {
      setError("Please fill in all fields.");
      return;
    }
    
    setLoading(true);
    setError(""); // Reset any previous errors

    sendRequest(isSignup ? "signup" : "login")
      .then((data) => {
        if (data) {
          localStorage.setItem("userId", data.user._id);
          dispatch(authActions.login());
          setInputs({ name: "", email: "", password: "" }); // Reset form
          navigate("/blogs");
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Stop loading if there was an error
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ position: 'relative', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url('https://i.pinimg.com/474x/70/ae/15/70ae151b9bd3966ebe9a8644f4d51bcb.jpg')`,
          backgroundSize: 'cover',
          filter: 'blur(8px)', // Apply blur effect
          zIndex: -1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Box
            maxWidth={400}
            maxHeight={450}
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            justifyContent={"center"}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin="auto"
            marginTop={1}
            borderRadius={5}
            bgcolor="#CAE9FF"
          >
            <Typography variant="h2" padding={3} textAlign="center">
              {isSignup ? "Signup" : "Login"}
            </Typography>

            {isSignup && (
              <TextField
                value={inputs.name}
                name="name"
                onChange={handleChange}
                placeholder="Name"
                margin="normal"
                fullWidth
              />
            )}

            <TextField
              name="email"
              onChange={handleChange}
              value={inputs.email}
              type="email"
              placeholder="Email"
              margin="normal"
              fullWidth
            />

            <TextField
              name="password"
              onChange={handleChange}
              value={inputs.password}
              type="password"
              placeholder="Password"
              margin="normal"
              fullWidth
            />

            {error && (
              <Typography color="error" variant="body2" style={{ marginTop: 10 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              sx={{ borderRadius: 3, marginTop: 3, bgcolor: "#62B6CB" }}
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} style={{ color: "#fff" }} /> : "Submit"}
            </Button>

            <Button
              onClick={() => setIsSignup(!isSignup)}
              sx={{ borderRadius: 3, marginTop: 3 }}
              fullWidth
            >
              Change to {isSignup ? "Login" : "Signup"}
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Auth;
