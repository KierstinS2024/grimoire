import { useState } from 'react';

const STATUS_OPTIONS = {
  tracker: ['active', 'completed', 'paused', 'blocked'],
  list:    ['want', 'in-progress', 'completed', 'dropped'],
};

const MOOD_OPTIONS = ['reflective', 'energized', 'anxious', 'peaceful', 'focused', 'heavy'];

export default function EntryForm({ chapter, onSubmit, onCancel, initialData = {} }) {
  const [formData, setFormData] = useState({
    title:  initialData.title  || '',
    tags:   initialData.tags?.join(', ') || '',
    notes:  initialData.notes  || '',
    links:  initialData.links?.join(', ') || '',
    fields: initialData.fields || {}
  });

  const setField = (key, value) => {
    setFormData(prev => ({
      ...prev,
      fields: { ...prev.fields, [key]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags:  formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      links: formData.links.split(',').map(l => l.trim()).filter(Boolean),
      type:  chapter.type
    });
  };

  return (
    <form onSubmit={handleSubmit} className="entry-form">
      <input
        className="entry-input"
        placeholder="Title"
        value={formData.title}
        onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
        required
      />

      {/* Tracker fields */}
      {chapter.type === 'tracker' && (
        <>
          <select className="entry-select"
            value={formData.fields.status || ''}
            onChange={e => setField('status', e.target.value)}>
            <option value="">Status</option>
            {STATUS_OPTIONS.tracker.map(s => <option key={s}>{s}</option>)}
          </select>
          <select className="entry-select"
            value={formData.fields.priority || ''}
            onChange={e => setField('priority', e.target.value)}>
            <option value="">Priority</option>
            {['low', 'medium', 'high'].map(p => <option key={p}>{p}</option>)}
          </select>
          <input type="date" className="entry-input"
            value={formData.fields.dueDate || ''}
            onChange={e => setField('dueDate', e.target.value)} />
        </>
      )}

      {/* List fields */}
      {chapter.type === 'list' && (
        <>
          <select className="entry-select"
            value={formData.fields.status || ''}
            onChange={e => setField('status', e.target.value)}>
            <option value="">Status</option>
            {STATUS_OPTIONS.list.map(s => <option key={s}>{s}</option>)}
          </select>
          <input type="number" className="entry-input"
            placeholder="Rating (1–5)" min="1" max="5"
            value={formData.fields.rating || ''}
            onChange={e => setField('rating', parseInt(e.target.value))} />
        </>
      )}

      {/* Journal fields */}
      {chapter.type === 'journal' && (
        <>
          <textarea className="entry-textarea"
            placeholder="Write freely..."
            value={formData.fields.body || ''}
            onChange={e => setField('body', e.target.value)}
            rows={8} />
          <select className="entry-select"
            value={formData.fields.mood || ''}
            onChange={e => setField('mood', e.target.value)}>
            <option value="">Mood</option>
            {MOOD_OPTIONS.map(m => <option key={m}>{m}</option>)}
          </select>
        </>
      )}

      {/* Reference fields */}
      {chapter.type === 'reference' && (
        <textarea className="entry-textarea"
          placeholder="Notes, details, important info..."
          value={formData.fields.body || ''}
          onChange={e => setField('body', e.target.value)}
          rows={6} />
      )}

      {/* Shared fields */}
      <input className="entry-input"
        placeholder="Notes"
        value={formData.notes}
        onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))} />
      <input className="entry-input"
        placeholder="Tags (comma separated)"
        value={formData.tags}
        onChange={e => setFormData(p => ({ ...p, tags: e.target.value }))} />
      <input className="entry-input"
        placeholder="Links (comma separated)"
        value={formData.links}
        onChange={e => setFormData(p => ({ ...p, links: e.target.value }))} />

      <div className="entry-form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary">Save Entry</button>
      </div>
    </form>
  );
}