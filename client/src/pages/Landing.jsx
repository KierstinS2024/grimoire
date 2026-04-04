import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="landing-glow" />
      <main className="landing-content">
        <div className="landing-ornament">✦ ✦ ✦</div>
        <h1 className="landing-title">Grimoire</h1>
        <p className="landing-tagline">One book. Your whole life.</p>
        <div className="landing-divider">
          <span className="landing-divider-line" />
          <span className="landing-divider-icon">◆</span>
          <span className="landing-divider-line" />
        </div>
        <p className="landing-description">
          A personal sanctuary for the organized mind. Create chapters for every
          corner of your life — track goals, curate lists, keep a journal, store
          what matters. All in one place. All yours.
        </p>
        <div className="landing-actions">
          <button
            className="landing-btn-primary"
            onClick={() => navigate("/register")}
          >
            Begin your grimoire
          </button>
          <button
            className="landing-btn-secondary"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </div>
        <div className="landing-types">
          <span>Tracker</span>
          <span>·</span>
          <span>List</span>
          <span>·</span>
          <span>Journal</span>
          <span>·</span>
          <span>Reference</span>
        </div>
      </main>
      <footer className="landing-footer">
        crafted for the intentional life
      </footer>
    </div>
  );
}
