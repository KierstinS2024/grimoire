import { useState } from "react";
import api from "../api/axios";

const CHAPTER_TYPES = ["tracker", "list", "journal", "reference"];
const CHAPTER_COLORS = [
  "#a78bfa",
  "#f59e0b",
  "#34d399",
  "#f87171",
  "#60a5fa",
  "#f472b6",
];

export default function CreateChapterModal({ onClose, onCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "tracker",
    color: "#a78bfa",
    icon: "📖",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/chapters", formData);
      onCreated(res.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">New Chapter</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            placeholder="Chapter name"
            value={formData.name}
            onChange={(e) =>
              setFormData((p) => ({ ...p, name: e.target.value }))
            }
            required
          />
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData((p) => ({ ...p, type: e.target.value }))
            }
          >
            {CHAPTER_TYPES.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
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
          <input
            placeholder="Icon (emoji)"
            value={formData.icon}
            onChange={(e) =>
              setFormData((p) => ({ ...p, icon: e.target.value }))
            }
          />
          {error && <p className="auth-error">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
