import React from "react";
import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const GitHubLoginButton = () => {
  const handleGitHubLogin = () => {
    // Redirect user to GitHub for authentication
    window.location.href = "http://localhost:5000/auth/github";
  };

  return (
    <Button
      onClick={handleGitHubLogin}
      variant="contained"
      startIcon={<GitHubIcon />}
      sx={{
        backgroundColor: "#333",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#555",
        },
        padding: "8px 16px",
        fontSize: "16px",
        textTransform: "none",
      }}
    >
      Sign in with GitHub
    </Button>
  );
};

export default GitHubLoginButton;
