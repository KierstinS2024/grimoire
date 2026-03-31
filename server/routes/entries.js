const express = require("express");
const router = express.Router({ mergeParams: true });
const verifyToken = require("../middleware/verifyToken");
const {
  getEntries,
  createEntry,
  updateEntry,
  deleteEntry,
} = require("../controllers/entryController");

router.use(verifyToken);

router.get("/", getEntries);
router.post("/", createEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

module.exports = router;
