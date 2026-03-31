import { useNavigate } from "react-router-dom";

const TYPE_LABELS = {
  tracker: "Tracker",
  list: "List",
  journal: "Journal",
  reference: "Reference",
};

export default function ChapterCard({ chapter }) {
  const navigate = useNavigate();

  return (
    <div
      className="chapter-card"
      style={{ borderLeftColor: chapter.color }}
      onClick={() => navigate(`/chapters/${chapter._id}`)}
    >
      <div className="chapter-card-header">
        <span className="chapter-icon">{chapter.icon}</span>
        <span className="chapter-type-badge">{TYPE_LABELS[chapter.type]}</span>
      </div>
      <h3 className="chapter-name">{chapter.name}</h3>
    </div>
  );
}
