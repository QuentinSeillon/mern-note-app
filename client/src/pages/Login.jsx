import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", { email, password });
      if (data.error) {
        toast.error(data.error);
      } else {
        setUser(data);
        setData({});
        // toast.success("Login Successful. Welcome!");
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <form onSubmit={loginUser}>
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
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
