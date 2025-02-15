import React,{ useState,useEffect } from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login"); // Navigate to login page
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    alert("You have logged out!");
    navigate("/"); // Redirect to Coming Soon page
  };

  const isAuthenticated = !!localStorage.getItem("token");
  const handleContactClick = () => {
    alert("Thank you for your interest! Contact us at support@example.com.");
  };
  const [timeLeft, setTimeLeft] = React.useState(60);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  
    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  return (
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              DavaaiKart
            </Typography>
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" onClick={handleLogin}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor="#f5f5f5"
        textAlign="center"
        sx={{
          backgroundImage: 'url("/path-to-image.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Typography variant="h2" color="primary" gutterBottom>
          Coming Soon
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          We're working hard to bring you an amazing experience. Stay tuned!
        </Typography>
        <Typography variant="h6" color="primary">Launching in {timeLeft} seconds!</Typography>;
        <Button
          variant="contained"
          color="primary"
          onClick={handleContactClick}
          sx={{ mt: 3 }}
        >
          Contact Us
        </Button>
        <Box mt={3}>
          <Button href="https://facebook.com" target="_blank">Facebook</Button>
          <Button href="https://twitter.com" target="_blank">Twitter</Button>
        </Box>
        </Box>
      </Box>
      
  );
};

export default ComingSoon;
