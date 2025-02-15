import React, { useState } from "react";
import { Box, Button, TextField, Typography,AppBar,Toolbar } from "@mui/material";
import { useLoginMutation } from "state/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login] = useLoginMutation();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(credentials).unwrap();
      localStorage.setItem("token", data.token); // Save token locally
      alert("Login successful!");
    } catch (error) {
      alert(error.data.message || "Login failed. ");
    }
  };

  const navigate = useNavigate();
    const handleLogin = () => {
      navigate("/login"); // Navigate to login page
    };
    const handleSignUp = () => {
        navigate("/signup"); // Navigate to signup page
      };
    const handleLogout = () => {
      localStorage.removeItem("token"); // Remove token from localStorage
      alert("You have logged out!");
      navigate("/"); // Redirect to Coming Soon page
    };
  
    const isAuthenticated = !!localStorage.getItem("token");

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
            textAlign="center"
            padding={2}
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                padding={4}
                borderRadius={2}
                boxShadow={3}
                width="100%"
                maxWidth="400px"
            >
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        variant="outlined"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: "16px" }}
                    >
                        Login
                    </Button>
                </form>
                <Box display="flex" justifyContent="space-between" width="100%" marginTop={2}>
                    <Button
                        variant="text"
                        color="primary"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </Button>
                    <Button
                        variant="text"
                        color="primary"
                        onClick={() => alert("Forgot Password clicked!")}
                    >
                        Forgot Password?
                    </Button>
                </Box>
            </Box>
        </Box>
    </Box>
    
  );
};

export default Login;
