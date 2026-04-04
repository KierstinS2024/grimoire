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
  const [sortBy, setSortBy] = useState("createdAt");

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

  const handleEntryUpdated = (updatedEntry) => {
    setEntries((prev) =>
      prev.map((e) => (e._id === updatedEntry._id ? updatedEntry : e)),
    );
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

        {chapter.type === "tracker" && entries.length > 0 && (
          <div className="sort-controls">
            <span className="sort-label">Sort by</span>
            <button
              className={`sort-btn ${sortBy === "createdAt" ? "active" : ""}`}
              onClick={() => setSortBy("createdAt")}
            >
              Date added
            </button>
            <button
              className={`sort-btn ${sortBy === "priority" ? "active" : ""}`}
              onClick={() => setSortBy("priority")}
            >
              Priority
            </button>
            <button
              className={`sort-btn ${sortBy === "status" ? "active" : ""}`}
              onClick={() => setSortBy("status")}
            >
              Status
            </button>
            <button
              className={`sort-btn ${sortBy === "dueDate" ? "active" : ""}`}
              onClick={() => setSortBy("dueDate")}
            >
              Due date
            </button>
          </div>
        )}

        {entries.length === 0 && !showForm ? (
          <div className="empty-state">
            <p>No entries yet.</p>
            <p>Add your first entry to this chapter.</p>
          </div>
        ) : (
          <div className="entry-list">
            {[...entries]
              .sort((a, b) => {
                if (sortBy === "priority") {
                  const order = { high: 0, medium: 1, low: 2, "": 3 };
                  return (
                    (order[a.fields?.priority || ""] ?? 3) -
                    (order[b.fields?.priority || ""] ?? 3)
                  );
                }
                if (sortBy === "status") {
                  const order = {
                    active: 0,
                    paused: 1,
                    blocked: 2,
                    completed: 3,
                    "": 4,
                  };
                  return (
                    (order[a.fields?.status || ""] ?? 4) -
                    (order[b.fields?.status || ""] ?? 4)
                  );
                }
                if (sortBy === "dueDate") {
                  const aDate = a.fields?.dueDate
                    ? new Date(a.fields.dueDate)
                    : new Date("9999");
                  const bDate = b.fields?.dueDate
                    ? new Date(b.fields.dueDate)
                    : new Date("9999");
                  return aDate - bDate;
                }
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
              .map((entry) => (
                <EntryCard
                  key={entry._id}
                  entry={entry}
                  chapter={chapter}
                  onDeleted={handleEntryDeleted}
                  onUpdated={handleEntryUpdated}
                />
              ))}
          </div>
        )}
      </main>
    </div>
  );
}