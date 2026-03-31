const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  getChapters,
  createChapter,
  updateChapter,
  deleteChapter,
} = require("../controllers/chapterController");

router.use(verifyToken); // protects all routes in this file

router.get("/", getChapters);
router.post("/", createChapter);
router.put("/:id", updateChapter);
router.delete("/:id", deleteChapter);

module.exports = router;
