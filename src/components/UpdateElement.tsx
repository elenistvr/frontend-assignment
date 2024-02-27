import { FC } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormComponent from "./FormComponent";
import { submitJoke, deleteJoke } from "../utils/http";

const BASE_URL = "https://retoolapi.dev/vcv4zy/jokes";

const UpdateElement: FC = () => {
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    author: "",
    createdAt: "",
    body: "",
    views: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch joke");
        }
        const joke = await response.json();
        setFormData(joke);
      } catch (error) {
        console.error("Error fetching joke:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJoke();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    await deleteJoke(formData, () => navigate("/"));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitJoke(formData, () => navigate("/"));
  };
  return (
    <div>
      <div className="form-container">
        <Link to="/" className="back">
          Close
        </Link>
        <form className="form" onSubmit={handleSubmit}>
          <h2>Update Record</h2>
          <FormComponent
            label="Title"
            placeholder="enter title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            id="title"
          />
          <FormComponent
            label="Author"
            placeholder="author's email"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
            id="author"
          />
          <FormComponent
            label="Description"
            placeholder="description"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            id="body"
          />
          <FormComponent
            label="Date"
            placeholder="creation date"
            value={formData.createdAt}
            onChange={(e) =>
              setFormData({ ...formData, createdAt: e.target.value })
            }
            id="createdAt"
          />
          <FormComponent
            label="Views"
            placeholder="enter views"
            value={formData.views}
            onChange={(e) =>
              setFormData({ ...formData, views: e.target.value })
            }
            id="views"
          />
          <button type="submit" className="submit-button">
            Update
          </button>
          <button type="button" onClick={handleDelete} className="delete-button">
            Delete
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateElement;
