import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import SideMenu from "./components/Sidemenu/SideMenu";
import Create from "./pages/note/Create";


axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <div className="container">
        <SideMenu />
        <div className="content">
          <Navbar />
          <div className="pages">
            <Toaster
              position="bottom-right"
              toastOptions={{ duration: 2000 }}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/note" element={<Create />} />
            </Routes>
          </div>
        </div>
      </div>
    </UserContextProvider>
  );
}

export default App;
