import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FormComponent from "./FormComponent";
import { addJoke } from "../utils/http";

const AddElement: FC = () => {
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    author: "",
    createdAt: "",
    body: "",
    views: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addJoke(formData);
      setFormData({
        id: 0,
        title: "",
        author: "",
        body: "",
        createdAt: "",
        views: "",
      });
      alert("Joke added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding joke:", error);
    }
  };

  return (
    <div>
      <div className="form-container">
        <Link to="/" className="back">
          Close
        </Link>
        <form className="form" onSubmit={handleSubmit}>
          <h2>Add Record</h2>
          <FormComponent
            label="Title"
            placeholder="enter title"
            value={formData.title}
            id="title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <FormComponent
            label="Author"
            placeholder="author's email"
            value={formData.author}
            id="author"
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
          />
          <FormComponent
            label="Description"
            placeholder="description"
            value={formData.body}
            id="body"
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          />
          <FormComponent
            label="Date"
            placeholder="creation date"
            value={formData.createdAt}
            id="createdAt"
            onChange={(e) =>
              setFormData({ ...formData, createdAt: e.target.value })
            }
          />
          <FormComponent
            label="Views"
            placeholder="enter views"
            value={formData.views}
            id="views"
            onChange={(e) =>
              setFormData({ ...formData, views: e.target.value })
            }
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddElement;
