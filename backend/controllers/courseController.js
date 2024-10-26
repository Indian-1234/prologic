const Course = require('../models/Course');


exports.createCourse = async (req, res) => {
  try {
    const { title, category, level, description } = req.body; // Access form fields
    const coverImage = req.files.coverImage ? req.files.coverImage[0].path : null; // Get the uploaded cover image path
    const salesVideo = req.files.salesVideo ? req.files.salesVideo[0].path : null; // Get the uploaded sales video path

    // Create a new course instance
    const course = new Course({
      title,
      category,
      level,
      description,
      coverImage,
      salesVideo,
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(400).json({ error: error.message });
  }
};
exports.getCourses = async (req, res) => {
  console.log("kjegwkeu")
  const { page = 1, limit = 10 } = req.query;
  try {
    const courses = await Course.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Course.countDocuments();
    res.json({
      courses,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
