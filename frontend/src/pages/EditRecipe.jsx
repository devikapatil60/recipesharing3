import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({ title: "", description: "", ingredients: [], instructions: "" });
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch(() => {
        alert("Recipe not found!");
        navigate("/");
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", recipe.title);
      formData.append("description", recipe.description);
      formData.append("ingredients", JSON.stringify(recipe.ingredients));
      formData.append("instructions", recipe.instructions);
      if (image) formData.append("image", image);

      const response = await axios.put(`http://localhost:5000/api/recipes/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("🔥 Error updating recipe:", error);
      setError("Failed to update recipe. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Recipe</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Title:</label>
        <input type="text" value={recipe.title} onChange={(e) => setRecipe({ ...recipe, title: e.target.value })} required style={styles.input} />

        <label style={styles.label}>Description:</label>
        <textarea value={recipe.description} onChange={(e) => setRecipe({ ...recipe, description: e.target.value })} required style={styles.textarea} />

        <label style={styles.label}>Upload New Image (Optional):</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} style={styles.fileInput} />

        <button type="submit" style={styles.button}>Update Recipe</button>
      </form>
    </div>
  );
};

// ✅ **CSS Styling (Inline for Easy Customization)**
const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    background: "#fefefe", // Dark background to match the website
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    color: "#f1f1f1",
    fontFamily: "'Arial', sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#1f1c16",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#0e0c0c", // Warm highlight color
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solidrgb(59, 50, 32)",
    backgroundColor: "#fefefe",
    color: "#0e0c0c",
  },
  textarea: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #1f1c16",
    backgroundColor: "#fefefe",
    color: "#0e0c0c",
    height: "100px",
    resize: "none",
  },
  fileInput: {
    padding: "5px",
    marginBottom: "15px",
    backgroundColor: "#fefefe",
    color: "#0e0c0c",
  },
  button: {
    backgroundColor: "#033609",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  error: {
    color: "#ff4d4d",
    textAlign: "center",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

export default EditRecipe;
