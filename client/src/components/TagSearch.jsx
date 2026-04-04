import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function TagSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get(`/entries/search?tag=${query.trim()}`);
        setResults(res.data);
        setOpen(true);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleResultClick = (chapterId) => {
    setQuery("");
    setOpen(false);
    navigate(`/chapters/${chapterId}`);
  };

  return (
    <div className="tag-search" ref={containerRef}>
      <div className="tag-search-input-wrapper">
        <span className="tag-search-icon">#</span>
        <input
          className="tag-search-input"
          placeholder="Search by tag..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
        />
        {loading && <span className="tag-search-spinner" />}
      </div>

      {open && (
        <div className="tag-search-results">
          {results.length === 0 ? (
            <p className="tag-search-empty">No entries found for "{query}"</p>
          ) : (
            results.map((entry) => (
              <div
                key={entry._id}
                className="tag-search-result"
                onClick={() => handleResultClick(entry.chapterId._id)}
              >
                <div className="tag-search-result-header">
                  <span className="tag-search-chapter-icon">
                    {entry.chapterId.icon}
                  </span>
                  <span
                    className="tag-search-chapter-name"
                    style={{ color: entry.chapterId.color }}
                  >
                    {entry.chapterId.name}
                  </span>
                </div>
                <p className="tag-search-entry-title">{entry.title}</p>
                <div className="tag-search-tags">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`tag ${tag.toLowerCase() === query.toLowerCase() ? "tag-highlight" : ""}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
