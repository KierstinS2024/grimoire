import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const TYPE_LABELS = {
  tracker:   'Tracker',
  list:      'List',
  journal:   'Journal',
  reference: 'Reference'
};

export default function ChapterCard({ chapter, onDeleted }) {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm(`Delete "${chapter.name}" and all its entries?`)) return;
    try {
      await api.delete(`/chapters/${chapter._id}`);
      onDeleted(chapter._id);
    } catch (err) {
      console.error('Failed to delete chapter', err);
    }
  };

  return (
    <div
      className="chapter-card"
      style={{ borderLeftColor: chapter.color }}
      onClick={() => navigate(`/chapters/${chapter._id}`)}
    >
      <div className="chapter-card-header">
        <span className="chapter-icon">{chapter.icon}</span>
        <div className="chapter-card-actions">
          <span className="chapter-type-badge">{TYPE_LABELS[chapter.type]}</span>
          <button className="btn-delete" onClick={handleDelete}>✕</button>
        </div>
      </div>
      <h3 className="chapter-name">{chapter.name}</h3>
    </div>
  );
}