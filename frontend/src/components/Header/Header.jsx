import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ user }) => {
  return (
    <header className="header">
      <Link to="/activities" className="headerLogo">
        XP Quest
      </Link>

      <div className="headerUser">
        <span className="headerUsername">{user?.username || "Usuário"}</span>
        <span className="headerXp">{user?.xp ?? 0} XP</span>
      </div>
    </header>
  );
};

export default Header;