const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterController');

router.post('/', chapterController.createChapter);
router.get('/course/:courseId', chapterController.getChaptersByCourse);
router.put('/:id', chapterController.updateChapter);
router.delete('/:id', chapterController.deleteChapter);

module.exports = router;