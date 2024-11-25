import React, { useState } from 'react'
import {AppBar, Box, Button, Tab, Tabs, Toolbar, Typography, makeStyles} from '@mui/material'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
// import { useStyles } from './utils';
import logo from "./SnapWanderer-logo.png"

const Header = () => {
    const classes = makeStyles
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state=> state.isLoggedIn);

    const [value, setValue] = useState();
    return (
    <AppBar 
    position='sticky'
     sx={{background: "radial-gradient(circle, rgba(94,194,183,1) 0%, rgba(44,166,164,1) 100%)"}}
        // sx={{background: "#19647E"}}
    >
    
        <Toolbar>
        <img src={logo} alt="SnapWanderer Logo" style={{ marginRight: '10px', height: '40px', width: 'auto' }} />

            {/* <Typography className={classes.font} variant="h4">
                SnapWanderer
            </Typography> */}
          { isLoggedIn && <Box display="flex" marginLeft={"auto"} marginRight="auto" >
                <Tabs textColor='inherit' value={value} onChange={(e,val)=>setValue(val)}>
                <Tab className={classes.font} LinkComponent={Link} to="/blogs" label="All Blogs"/>    
                <Tab className={classes.font} LinkComponent={Link} to="/myblogs" label="My Blogs"/> 
                <Tab className={classes.font} LinkComponent={Link} to="/blog/add" label="Add Blog"/>   
                </Tabs>
            </Box>}
            <Box display="flex" marginLeft='auto'>
            <Button LinkComponent={Link} to="/" variant='contained' sx={{margin:1,borderRadius:10,bgcolor: "#62B6CB"}} >Home</Button>
{    !isLoggedIn   &&    <>     <Button LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1,borderRadius:10,bgcolor: "#62B6CB"}} >Login / signup</Button>
</>
}
{              isLoggedIn &&  <Button onClick={()=>dispatch(authActions.logout())}
                    LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1,borderRadius:10,bgcolor: "#62B6CB"}}>Logout</Button>
}            </Box> 
        </Toolbar>
    </AppBar>
    );
}

export default Header
