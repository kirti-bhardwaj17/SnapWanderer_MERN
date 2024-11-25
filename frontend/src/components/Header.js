import React, { useState } from "react";
import { AppBar, Box, Button, Tab, Tabs, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import logo from "./SnapWanderer-logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn); // Redux state for authentication
  const [value, setValue] = useState(); // State for tabs

  // Handle Logout
  const handleLogout = () => {
    dispatch(authActions.logout()); // Dispatch logout action
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "radial-gradient(circle, rgba(94,194,183,1) 0%, rgba(44,166,164,1) 100%)",
      }}
    >
      <Toolbar>
        {/* Logo */}
        <img
          src={logo}
          alt="SnapWanderer Logo"
          style={{ marginRight: "10px", height: "40px", width: "auto" }}
        />

        {/* Tabs for logged-in users */}
        {isLoggedIn && (
          <Box
            display="flex"
            marginLeft={"auto"}
            marginRight="auto"
            flexDirection="row"
          >
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myblogs" label="My Blogs" />
              <Tab LinkComponent={Link} to="/blog/add" label="Add Blog" />
            </Tabs>
          </Box>
        )}

        {/* Action Buttons */}
        <Box display="flex" marginLeft="auto">
          {/* Home Button */}
          <Button
            LinkComponent={Link}
            to="/"
            variant="contained"
            sx={{
              margin: 1,
              borderRadius: 10,
              bgcolor: "#62B6CB",
            }}
          >
            Home
          </Button>

          {/* Login/Signup Buttons */}
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{
                  margin: 1,
                  borderRadius: 10,
                  bgcolor: "#62B6CB",
                }}
              >
                Login / Signup
              </Button>
            </>
          )}

          {/* Logout Button */}
          {isLoggedIn && (
            <Button
              onClick={handleLogout}
              LinkComponent={Link}
              to="/auth"
              variant="contained"
              sx={{
                margin: 1,
                borderRadius: 10,
                bgcolor: "#62B6CB",
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
