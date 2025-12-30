import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const user = (() => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
})();


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="veyora-topbar">
      {/* LEFT */}
      <div className="veyora-brand">
        VEYORA
      </div>

      {/* RIGHT */}
      <div className="veyora-nav-actions">
        <Link to="/" className="veyora-link">Home</Link>

        {user ? (
          <>
            <span className="veyora-hello">
              Hello, <strong>{user.username}</strong>
            </span>
            <button className="veyora-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="veyora-login-btn">Login</button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
