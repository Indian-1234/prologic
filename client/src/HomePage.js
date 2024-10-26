import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses", { withCredentials: true });
        console.log(response.data,"agduigef")
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };

    fetchCourses();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", { withCredentials: true });
      localStorage.removeItem("auth");
      localStorage.removeItem("userId");
      navigate("/login");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>This is a protected area of the application.</p>
      <button onClick={handleLogout}>Logout</button>
      <h2>Available Courses:</h2>
      <ul>
        {courses.map((course) => (
          <li key={course._id} onClick={() => handleCourseClick(course._id)}>
            {course.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
