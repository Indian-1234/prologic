import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, AppBar, Toolbar, Typography, Container, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'; // Import Home icon
import AddCircleIcon from '@mui/icons-material/AddCircle'; // Import Add Circle icon

import LoginPage from './Loginpage';
import HomePage from './HomePage'; 
import CourseCreate from './components/CourseCreate';
import ChapterCreate from './components/ChapterCreate';
import Forum from './components/Forum';

// Create a custom MUI theme (optional customization)
const theme = createTheme();

const App = () => {
  const location = useLocation(); // Get the current location

  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem('auth') === 'true';

  // Handle URL parameters and set auth state if needed
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('auth') === 'true') {
      localStorage.setItem('auth', 'true'); // Set auth to true in localStorage
    }
  }, [location.search]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Course Management System
            </Typography>
            <IconButton color="inherit" component={Link} to="/">
              <HomeIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/courses/create">
              <AddCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container>
          <Box sx={{ mt: 4 }}>
            <Routes>
              {/* Redirect to HomePage if authenticated, otherwise go to LoginPage */}
              <Route
                path="/"
                element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
              />
              <Route path="/login" element={<LoginPage />} />
              {/* Define other routes */}
              <Route path="/courses/create" element={<CourseCreate />} />
              <Route path="/courses/:courseId" element={<ChapterCreate />} />
              <Route path="/courses/forum" element={<Forum />} />
            </Routes>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
