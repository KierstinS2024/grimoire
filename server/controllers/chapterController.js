const Chapter = require("../models/Chapter");
const Entry = require("../models/Entry");

const getChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(chapters);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createChapter = async (req, res) => {
  try {
    const { name, type, color, icon } = req.body;
    const chapter = new Chapter({
      userId: req.user.id,
      name,
      type,
      color,
      icon,
    });
    await chapter.save();
    res.status(201).json(chapter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true },
    );
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });
    res.json(chapter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });
    await Entry.deleteMany({ chapterId: req.params.id });
    res.json({ message: "Chapter and entries deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getChapters, createChapter, updateChapter, deleteChapter };
