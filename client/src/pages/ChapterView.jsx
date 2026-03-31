import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function ChapterView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chaptersRes, entriesRes] = await Promise.all([
          api.get("/chapters"),
          api.get(`/chapters/${id}/entries`),
        ]);
        const found = chaptersRes.data.find((c) => c._id === id);
        if (!found) return navigate("/dashboard");
        setChapter(found);
        setEntries(entriesRes.data);
      } catch (err) {
        console.error("Failed to fetch chapter", err);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="page">
        <Navbar />
        <p className="loading-text">Loading...</p>
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
        {entries.length === 0 ? (
          <div className="empty-state">
            <p>No entries yet.</p>
            <p>Add your first entry to this chapter.</p>
          </div>
        ) : (
          <div className="entry-list">
            {entries.map((entry) => (
              <div key={entry._id} className="entry-card">
                <h3 className="entry-title">{entry.title}</h3>
                {entry.tags.length > 0 && (
                  <div className="entry-tags">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
