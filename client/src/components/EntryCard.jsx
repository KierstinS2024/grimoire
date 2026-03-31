import api from '../api/axios';

const STATUS_COLORS = {
  active:        '#a78bfa',
  completed:     '#34d399',
  paused:        '#f59e0b',
  blocked:       '#f87171',
  'in-progress': '#60a5fa',
  want:          '#a89f8f',
  dropped:       '#6b6358',
};

const MOOD_ICONS = {
  reflective: '🌙',
  energized:  '⚡',
  anxious:    '🌊',
  peaceful:   '🍃',
  focused:    '🔥',
  heavy:      '🪨',
};

export default function EntryCard({ entry, onDeleted }) {
  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm(`Delete "${entry.title}"?`)) return;
    try {
      await api.delete(`/chapters/${entry.chapterId}/entries/${entry._id}`);
      onDeleted(entry._id);
    } catch (err) {
      console.error('Failed to delete entry', err);
    }
  };

  return (
    <div className="entry-card">
      <div className="entry-card-header">
        <h3 className="entry-title">{entry.title}</h3>
        <div className="entry-meta">
          {entry.fields?.status && (
            <span className="entry-status-badge"
              style={{ color: STATUS_COLORS[entry.fields.status] || '#a89f8f' }}>
              {entry.fields.status}
            </span>
          )}
          {entry.fields?.priority && (
            <span className="entry-priority-badge">
              {entry.fields.priority}
            </span>
          )}
          {entry.fields?.mood && (
            <span className="entry-mood">
              {MOOD_ICONS[entry.fields.mood]} {entry.fields.mood}
            </span>
          )}
          {entry.fields?.rating && (
            <span className="entry-rating">
              {'★'.repeat(entry.fields.rating)}{'☆'.repeat(5 - entry.fields.rating)}
            </span>
          )}
          <button className="btn-delete" onClick={handleDelete}>✕</button>
        </div>
      </div>

      {entry.fields?.body && (
        <p className="entry-body">{entry.fields.body}</p>
      )}

      {entry.notes && (
        <p className="entry-notes">{entry.notes}</p>
      )}

      {entry.tags?.length > 0 && (
        <div className="entry-tags">
          {entry.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}

      {entry.fields?.dueDate && (
        <p className="entry-due">
          Due: {new Date(entry.fields.dueDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}