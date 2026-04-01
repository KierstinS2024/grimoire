import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const TYPE_LABELS = {
  tracker: "Tracker",
  list: "List",
  journal: "Journal",
  reference: "Reference",
};

const CHAPTER_COLORS = [
  "#a78bfa",
  "#f59e0b",
  "#34d399",
  "#f87171",
  "#60a5fa",
  "#f472b6",
];
const EMOJI_OPTIONS = [
  "📖",
  "📝",
  "✅",
  "🎯",
  "💼",
  "📚",
  "🌿",
  "🏋️",
  "🍳",
  "✈️",
  "🎮",
  "🎵",
  "🎨",
  "💡",
  "🌙",
  "⚡",
  "🔥",
  "🌊",
  "🧠",
  "💰",
  "🏠",
  "🌱",
  "📷",
  "🎬",
  "🧘",
  "🐾",
  "❤️",
  "⭐",
  "🔮",
  "🗺️",
];

export default function ChapterCard({ chapter, onDeleted, onUpdated }) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: chapter.name,
    color: chapter.color,
    icon: chapter.icon,
  });

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm(`Delete "${chapter.name}" and all its entries?`))
      return;
    try {
      await api.delete(`/chapters/${chapter._id}`);
      onDeleted(chapter._id);
    } catch (err) {
      console.error("Failed to delete chapter", err);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditing(true);
  };

  const handleUpdate = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const res = await api.put(`/chapters/${chapter._id}`, formData);
      onUpdated(res.data);
      setEditing(false);
    } catch (err) {
      console.error("Failed to update chapter", err);
    }
  };

  if (editing) {
    return (
      <div
        className="chapter-card"
        style={{ borderLeftColor: formData.color }}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleUpdate} className="chapter-edit-form">
          <input
            className="entry-input"
            value={formData.name}
            onChange={(e) =>
              setFormData((p) => ({ ...p, name: e.target.value }))
            }
            required
          />
          <div className="color-picker">
            {CHAPTER_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                className={`color-swatch ${formData.color === color ? "selected" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => setFormData((p) => ({ ...p, color }))}
              />
            ))}
          </div>
          <div className="emoji-picker">
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                className={`emoji-option ${formData.icon === emoji ? "selected" : ""}`}
                onClick={() => setFormData((p) => ({ ...p, icon: emoji }))}
              >
                {emoji}
              </button>
            ))}
          </div>
          <input
            className="entry-input"
            placeholder="Or type your own emoji"
            value={EMOJI_OPTIONS.includes(formData.icon) ? "" : formData.icon}
            onChange={(e) =>
              setFormData((p) => ({ ...p, icon: e.target.value }))
            }
          />
          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={(e) => {
                e.stopPropagation();
                setEditing(false);
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div
      className="chapter-card"
      style={{ borderLeftColor: chapter.color }}
      onClick={() => navigate(`/chapters/${chapter._id}`)}
    >
      <div className="chapter-card-header">
        <span className="chapter-icon">{chapter.icon}</span>
        <div className="chapter-card-actions">
          <span className="chapter-type-badge">
            {TYPE_LABELS[chapter.type]}
          </span>
          <button className="btn-edit" onClick={handleEdit}>
            ✎
          </button>
          <button className="btn-delete" onClick={handleDelete}>
            ✕
          </button>
        </div>
      </div>
      <h3 className="chapter-name">{chapter.name}</h3>
    </div>
  );
}
