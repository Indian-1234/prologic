import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
  Paper,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const CourseCreate = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    category: '',
    level: 'Basic',
    description: '',
    faqs: [],
    coverImage: null,
    salesVideo: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(courseData).forEach(key => {
        formData.append(key, courseData[key]);
      });
  
      // Debugging: Check the content of FormData before sending
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
  
      const response = await axios.post(
        'http://localhost:5000/api/courses',
        formData,
        {
          withCredentials: true, // Include cookies and credentials
        }
      );
  
      // Handle success
      if (response.status === 200) {
        console.log('Course created successfully:', response.data);
      }
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };
  
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Course
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Title"
                value={courseData.title}
                onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Category"
                value={courseData.category}
                onChange={(e) => setCourseData({...courseData, category: e.target.value})}
                required
              >
                <MenuItem value="Data Management">Data Management</MenuItem>
                <MenuItem value="Programming">Programming</MenuItem>
                <MenuItem value="Design">Design</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={courseData.description}
                onChange={(e) => setCourseData({...courseData, description: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label htmlFor="cover-image">
                <Input
                  accept="image/*"
                  id="cover-image"
                  type="file"
                  onChange={(e) => setCourseData({...courseData, coverImage: e.target.files[0]})}
                />
                <Button variant="outlined" component="span" fullWidth>
                  Upload Cover Image
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} md={6}>
              <label htmlFor="sales-video">
                <Input
                  accept="video/*"
                  id="sales-video"
                  type="file"
                  onChange={(e) => setCourseData({...courseData, salesVideo: e.target.files[0]})}
                />
                <Button variant="outlined" component="span" fullWidth>
                  Upload Sales Video
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Create Course
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
export default CourseCreate