import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GitHubLoginButton from "./GitHubLoginButton";
import GoogleLoginButton from "./GoogleLoginButton";
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Tabs, 
  Tab, 
  Paper 
} from "@mui/material";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // Track which tab is active
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const authStatus = localStorage.getItem("auth") === "true";
    setIsAuthenticated(authStatus);

    if (authStatus) {
      navigate("/");
    }
  }, [navigate]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      if (response.data.refreshToken) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("accesstoken", "accessToken");

        navigate("/");
      } else {
        alert(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("auth", "true");
        navigate("/");
      } else {
        alert(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            {isAuthenticated ? "Welcome back!" : "Login or Sign Up"}
          </Typography>

          {!isAuthenticated && (
            <>
              <Tabs value={activeTab} onChange={handleTabChange} centered>
                <Tab label="Sign In" />
                <Tab label="Sign Up" />
              </Tabs>

              {activeTab === 0 && (
                <Box mt={3}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleLogin}
                  >
                    Sign In
                  </Button>
                </Box>
              )}

              {activeTab === 1 && (
                <Box mt={3}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <TextField
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleSignup}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}

              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                OR
              </Typography>

              <Box display="flex" justifyContent="space-around">
                <GoogleLoginButton/>
                <GitHubLoginButton />
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
