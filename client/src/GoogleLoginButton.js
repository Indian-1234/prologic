import React from "react";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google"; // Import Google icon from MUI

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    // Redirect user to the backend Google OAuth route
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      variant="contained"
      startIcon={<GoogleIcon />}
      sx={{
        backgroundColor: "#4285F4", // Google blue
        color: "#fff",
        "&:hover": {
          backgroundColor: "#357ae8", // Slightly darker blue on hover
        },
        padding: "8px 16px",
        fontSize: "16px",
        textTransform: "none",
      }}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleLoginButton;
