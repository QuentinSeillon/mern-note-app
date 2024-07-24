import { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../../context/userContext';
function Navbar() {
  const {user} = useContext(UserContext);
  return (
    <nav>
      <Link to="/">Home</Link>
      {!user ? (
        <Link to="/login">Login</Link>
      ) : (
        <Link to="/logout">Logout</Link>
      )}
      <Link to="/register">Register</Link>
    </nav>
  )
}

export default Navbar
