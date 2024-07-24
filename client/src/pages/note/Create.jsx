import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
function Create() {
  const navigate = useNavigate();
  const {user} = useContext(UserContext);

  const [data, setData] = useState({
    title: "",
    content: "",
    userId: user._id
  });

  const createNote = async (e) => {
    e.preventDefault();
    const { title, content, userId } = data;
    try {
      const { data } = await axios.post("/notes/create", { title, content, userId });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Note created successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Titre ..."
          name="title"
          id="title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <label htmlFor="content">Content</label>
        <input
          type="text"
          placeholder="Contenu ..."
          name="content"
          id="content"
          value={data.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}
        />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}

export default Create;
