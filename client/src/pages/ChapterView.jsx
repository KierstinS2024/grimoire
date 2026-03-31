import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import EntryForm from '../components/EntryForm';
import EntryCard from '../components/EntryCard';

export default function ChapterView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chaptersRes, entriesRes] = await Promise.all([
          api.get('/chapters'),
          api.get(`/chapters/${id}/entries`)
        ]);
        const found = chaptersRes.data.find(c => c._id === id);
        if (!found) return navigate('/dashboard');
        setChapter(found);
        setEntries(entriesRes.data);
      } catch (err) {
        console.error('Failed to fetch chapter', err);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleCreateEntry = async (formData) => {
    setError('');
    try {
      const res = await api.post(`/chapters/${id}/entries`, formData);
      setEntries(prev => [res.data, ...prev]);
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleEntryDeleted = (deletedId) => {
    setEntries((prev) => prev.filter((e) => e._id !== deletedId));
  };

  if (loading) return (
    <div className="page">
      <Navbar />
      <p className="loading-text">Opening chapter...</p>
    </div>
  );

  return (
    <div className="page">
      <Navbar />
      <main className="chapter-view">
        <div className="chapter-view-header">
          <button className="btn-back" onClick={() => navigate("/dashboard")}>
            ← Back
          </button>
          <div className="chapter-view-title">
            <span>{chapter.icon}</span>
            <h2 style={{ color: chapter.color }}>{chapter.name}</h2>
            <span className="chapter-type-badge">{chapter.type}</span>
          </div>
        </div>

        {showForm ? (
          <div className="entry-form-container">
            <h3 className="entry-form-title">New Entry</h3>
            {error && <p className="auth-error">{error}</p>}
            <EntryForm
              chapter={chapter}
              onSubmit={handleCreateEntry}
              onCancel={() => setShowForm(false)}
            />
          </div>
        ) : (
          <button
            className="btn-primary"
            onClick={() => setShowForm(true)}
            style={{ marginBottom: "1.5rem" }}
          >
            + New Entry
          </button>
        )}

        {entries.length === 0 && !showForm ? (
          <div className="empty-state">
            <p>No entries yet.</p>
            <p>Add your first entry to this chapter.</p>
          </div>
        ) : (
          <div className="entry-list">
            {entries.map((entry) => (
              <EntryCard
                key={entry._id}
                entry={entry}
                onDeleted={handleEntryDeleted}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}