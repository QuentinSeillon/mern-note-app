import { useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext"; // Assurez-vous d'importer le contexte utilisateur correctement

function Logout() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const logoutUser = async () => {
    try {
      const { data } = await axios.post("/logout"); // Assurez-vous que votre backend gère cette route
      if (data.success) {
        setUser(null);
        toast.success("Déconnexion réussie !");
        navigate('/login'); // Redirige vers la page de connexion
      } else {
        toast.error("Erreur lors de la déconnexion.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la déconnexion.");
    }
  };

  return (
    <button onClick={logoutUser}>Se déconnecter</button>
  );
}

export default Logout;
