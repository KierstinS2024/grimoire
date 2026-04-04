import { useState, useEffect } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import ChapterCard from '../components/ChapterCard';
import CreateChapterModal from '../components/CreateChapterModal';
import TagSearch from "../components/TagSearch";

export default function Dashboard() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await api.get('/chapters');
        setChapters(res.data);
      } catch (err) {
        console.error('Failed to fetch chapters', err);
      } finally {
        setLoading(false);
      }
    };
    fetchChapters();
  }, []);

  const handleChapterCreated = (newChapter) => {
    setChapters(prev => [newChapter, ...prev]);
  };

  const handleChapterDeleted = (deletedId) => {
    setChapters(prev => prev.filter(c => c._id !== deletedId));
  };

  const handleChapterUpdated = (updatedChapter) => {
    setChapters((prev) =>
      prev.map((c) => (c._id === updatedChapter._id ? updatedChapter : c)),
    );
  };

  return (
    <div className="page">
      <Navbar />
      <main className="dashboard">
        <div className="dashboard-header">
          <h2 className="dashboard-title">Your Grimoire</h2>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            + New Chapter
          </button>
        </div>
        <TagSearch />
        {loading ? (
          <p className="loading-text">Opening your grimoire...</p>
        ) : chapters.length === 0 ? (
          <div className="empty-state">
            <p>Your grimoire is empty.</p>
            <p>Create your first chapter to begin.</p>
          </div>
        ) : (
          <div className="chapter-grid">
            {chapters.map((chapter) => (
              <ChapterCard
                key={chapter._id}
                chapter={chapter}
                onDeleted={handleChapterDeleted}
                onUpdated={handleChapterUpdated}
              />
            ))}
          </div>
        )}
      </main>
      {showModal && (
        <CreateChapterModal
          onClose={() => setShowModal(false)}
          onCreated={handleChapterCreated}
        />
      )}
    </div>
  );
}