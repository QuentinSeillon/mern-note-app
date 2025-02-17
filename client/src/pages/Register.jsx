import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post("/register", { name, email, password });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Login Successful. Welcome!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <label htmlFor="nom">Nom</label>
        <input
          type="text"
          id="nom"
          placeholder="Votre nom"
          name="nom"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Votre email"
          id="email"
          name="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label htmlFor="motDePasse">Mot de passe</label>
        <input
          type="password"
          placeholder="Votre mot de passe"
          id="motDePasse"
          name="motDePasse"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Enregister</button>
      </form>
    </div>
  );
}

export default Register;
