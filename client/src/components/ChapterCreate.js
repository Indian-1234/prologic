import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Save } from 'lucide-react';
import { useParams } from 'react-router-dom';

const ChapterManager = () => {
  const { courseId } = useParams(); // Get courseId from URL

  const [course, setCourse] = useState(null); // Use a single course object
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedCourse, setEditedCourse] = useState({});

  // API base URL
  const API_URL = 'http://localhost:5000/api';

  // Create axios instance with default config
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Set this to include credentials with every request
  });

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/courses/${courseId}`);
      setCourse(response.data); // Set the whole course object
      setEditedCourse(response.data); // Initialize editedCourse with fetched course data
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching course');
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axiosInstance.put(`/courses/${courseId}`, editedCourse);
      setCourse(editedCourse); // Update course state with edited data
      setEditMode(false); // Exit edit mode
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating course');
      console.error('Error updating course:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="w-full text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="w-full text-center py-4 text-red-500">{error}</div>;
  }

  if (!course) {
    return <div className="w-full text-center py-4">No course data found.</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-lg font-semibold">Course Details</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        {editMode ? (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={editedCourse.title}
                onChange={handleEditChange}
                className="border rounded-lg w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={editedCourse.description}
                onChange={handleEditChange}
                className="border rounded-lg w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={editedCourse.category}
                onChange={handleEditChange}
                className="border rounded-lg w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Level</label>
              <input
                type="text"
                name="level"
                value={editedCourse.level}
                onChange={handleEditChange}
                className="border rounded-lg w-full p-2"
              />
            </div>
            <button 
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save
            </button>
          </div>
        ) : (
          <div>
            <p><strong>Title:</strong> {course.title}</p>
            <p><strong>Description:</strong> {course.description}</p>
            <p><strong>Category:</strong> {course.category}</p>
            <p><strong>Level:</strong> {course.level}</p>
            <button 
              onClick={() => {
                setEditMode(true);
                setEditedCourse(course); // Initialize editedCourse with current course data
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Pencil className="w-4 h-4" /> Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterManager;
