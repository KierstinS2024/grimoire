const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema(
  {
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["tracker", "list", "journal", "reference"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [{ type: String }],
    notes: { type: String },
    links: [{ type: String }],
    fields: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Entry", EntrySchema);
