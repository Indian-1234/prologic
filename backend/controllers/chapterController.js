const Chapter = require('../models/Chapter');

exports.createChapter = async (req, res) => {
  try {
    const chapter = new Chapter(req.body);
    await chapter.save();
    res.status(201).json(chapter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getChaptersByCourse = async (req, res) => {
  try {
    const chapters = await Chapter.find({ courseId: req.params.courseId });
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }
    res.json(chapter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndDelete(req.params.id);
    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }
    res.json({ message: 'Chapter deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};