const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["tracker", "list", "journal", "reference"],
      required: true,
    },
    color: {
      type: String,
      default: "#a78bfa",
    },
    icon: {
      type: String,
      default: "📖",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Chapter", ChapterSchema);
