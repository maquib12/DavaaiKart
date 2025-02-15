import React, { useState } from "react";
import { Box, Button, TextField, Typography,AppBar,Toolbar } from "@mui/material";
import { useSignupMutation } from "state/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signup] = useSignupMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    state: "",
    country: "",
    occupation: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 const navigate = useNavigate();
 const handleLogin = () => {
    navigate("/login"); // Navigate to login page
  };
  const handleSignUp = () => {
      navigate("/signup"); // Navigate to signup page
    };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData).unwrap();
      alert("Signup successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Signup failed.");
    }
  };

  return (
    <Box>
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                DavaaiKart
            </Typography>
            <Button color="inherit" onClick={handleLogin}>
            Login
            </Button>
            </Toolbar>
        </AppBar>
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
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
            <Typography variant="h4" gutterBottom>Signup</Typography>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <TextField label="Name" name="name" onChange={handleChange} fullWidth required margin="normal"  variant="outlined" />
                <TextField label="Email" name="email" type="email" onChange={handleChange} fullWidth required margin="normal"  variant="outlined" />
                <TextField label="Password" name="password" type="password" onChange={handleChange} fullWidth required margin="normal"  variant="outlined" />
                <TextField label="City" name="city" onChange={handleChange} fullWidth margin="normal"  variant="outlined" />
                <TextField label="State" name="state" onChange={handleChange} fullWidth margin="normal"  variant="outlined" />
                <TextField label="Country" name="country" onChange={handleChange} fullWidth margin="normal"  variant="outlined" />
                <TextField label="Occupation" name="occupation" onChange={handleChange} fullWidth margin="normal"  variant="outlined" />
                <TextField label="Phone Number" name="phoneNumber" onChange={handleChange} fullWidth required margin="normal"  variant="outlined" />
                <Button type="submit" variant="contained">Signup</Button>
            </form>
            </Box>
        </Box>
    </Box>
  );
};

export default Signup;
