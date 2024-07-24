import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import "./navbar.css";
function Navbar() {
  const { user } = useContext(UserContext);
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      {!user && <Link to="/register">Register</Link>}
      {!user ? (
        <Link to="/login">Login</Link>
      ) : (
        <Link to="/logout">Logout</Link>
      )}
    </nav>
  );
}

export default Navbar;
