import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import axios from "axios";
import Note from "../components/Note/Note";
import "../assets/styles/dashboard.css";

function Dashboard() {
  const { user } = useContext(UserContext);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get("/notes").then(({ data }) => {
        setNotes(data);
      });
    }
  });
  return (
    <div className="dashboard">
      <div className="btn-container">
        <Link to="/note" className="btn">
          Create Note
        </Link>
      </div>
      <h1>Dashboard</h1>
      {!!user && <h2>Hi {user.name}!</h2>}
      <Note data={notes} />
    </div>
  );
}

export default Dashboard;
