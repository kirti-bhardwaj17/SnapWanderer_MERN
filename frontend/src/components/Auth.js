import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from "axios"
import { useDispatch} from "react-redux";
import { authActions } from '../store/index'; // Adjust the path as needed
import {useNavigate } from 'react-router-dom';


const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [inputs, setInputs] =
  useState({
    name:"",
    email:"",password:""
  })
  const [isSignup, setisSignup] = useState(false);
  const handleChange = (e) =>{
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  const sendRequest = async (type="login") =>{
    const res = await axios.post(`http://localhost:4000/api/user/${type}`,{
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    }).catch(err=>console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if(isSignup) {
      sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id))
      .then(()=>dispatch(authActions.login()))
      .then(()=>navigate("/blogs"))
      .then(data=>console.log(data))
    }else {
      sendRequest()
      .then((data)=>localStorage.setItem("userId",data.user._id))
      .then(()=>dispatch(authActions.login()))
      .then(()=>navigate("/blogs"))
      .then(data=>console.log(data))
    }
  };
  return (
    <div 
    style={{
      position: 'relative',
      height: 'calc(100vh - 64px)', // Adjust to account for header height
      overflow: 'hidden',
    }}
  >
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
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '20px', // Adjust as needed
      }}
    >
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
          bgcolor="#CAE9FF"        >
          <Typography variant="h2" padding={3} textAlign="center" > 
           {isSignup ? "Signup" : "Login"}
          </Typography>
          
            {isSignup && <TextField value={inputs.name}
              name="name"
               onChange={handleChange}
              placeholder="Name"
              margin="normal"
            /> }
          <TextField 
            name="email"
             onChange={handleChange}
             value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
             onChange={handleChange}
             value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3, bgcolor: "#62B6CB"}}
            
          >
            Submit
          </Button>
          <Button onClick={()=>setisSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            change to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
        </form>
    </div>
    </div>
  )
}

export default Auth
