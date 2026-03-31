const Entry = require("../models/Entry");
const Chapter = require("../models/Chapter");

const getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({
      chapterId: req.params.chapterId,
      userId: req.user.id,
    }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createEntry = async (req, res) => {
  try {
    const chapter = await Chapter.findOne({
      _id: req.params.chapterId,
      userId: req.user.id,
    });
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    const { title, tags, notes, links, fields } = req.body;
    const entry = new Entry({
      chapterId: req.params.chapterId,
      userId: req.user.id,
      type: chapter.type,
      title,
      tags,
      notes,
      links,
      fields,
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateEntry = async (req, res) => {
  try {
    const entry = await Entry.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true },
    );
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.json(entry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getEntries, createEntry, updateEntry, deleteEntry };
