import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-brand">
        Grimoire
      </Link>
      <div className="navbar-right">
        <span className="navbar-user">{user?.username}</span>
        <button onClick={handleLogout} className="navbar-logout">
          Sign out
        </button>
      </div>
    </nav>
  );
}
