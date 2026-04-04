const express = require("express");
const router = express.Router({ mergeParams: true });
const verifyToken = require("../middleware/verifyToken");
const {
  getEntries,
  createEntry,
  updateEntry,
  deleteEntry,
  searchByTag,
} = require("../controllers/entryController");

router.use(verifyToken);

router.get("/search", searchByTag);
router.get("/", getEntries);
router.post("/", createEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

module.exports = router;
