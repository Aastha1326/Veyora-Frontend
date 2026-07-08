//this file is used to create a navigation bar component for the Veyora application. It includes links to the home page and login/logout functionality based on the user's authentication status. The component uses React Router for navigation and manages user state by checking local storage for a stored user object. It also provides a logout function that clears the user's token and information from local storage, navigates back to the home page, and reloads the window to reflect the logout state.

import { Link, useNavigate } from "react-router-dom";  //react-router-dom is 
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
