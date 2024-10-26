const multer = require('multer');

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Specify the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Store the file with a unique name
    }
  });
  
  const upload = multer({ storage }); // Initialize multer with the storage configuration
router.post('/', upload.fields([{ name: 'coverImage' }, { name: 'salesVideo' }]),courseController.createCourse);
router.get('/', courseController.getCourses);
router.get('/:courseId', courseController.getCourseById);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;