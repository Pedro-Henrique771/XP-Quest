import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user"); 
  navigate("/");
};

  return (
    <nav className="navBar">
      <div className="navLinks">
        {location.pathname !== "/activities" && (
          <Link to="/activities" className="navLink">
            Página principal
          </Link>
        )}

        {location.pathname !== "/ranking" && (
          <Link to="/ranking" className="navLink">
            Ranking
          </Link>
        )}

        {location.pathname !== "/history" && (
          <Link to="/history" className="navLink">
            Histórico
          </Link>
        )}
      </div>

      <button className="logoutButton" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default NavBar;