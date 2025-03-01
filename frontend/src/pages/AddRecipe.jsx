import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title || !description || ingredients.some((ing) => ing.trim() === "") || !instructions) {
      setError("Please fill all fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("ingredients", JSON.stringify(ingredients));
      formData.append("instructions", instructions);
      if (image) formData.append("image", image);

      await axios.post("http://localhost:5000/api/recipes", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
      });
      

      alert("Recipe added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding recipe:", error);
      setError("Failed to add recipe. Please try again.");
    }
  };

  return (
    <div className="add-recipe-container">
      <h2>Add New Recipe</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="add-recipe-form">
        <input type="text" placeholder="Recipe Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Recipe Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        
        {/* Ingredients Section */}
        <div className="ingredients-section">
          <h4>Ingredients</h4>
          {ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Ingredient ${index + 1}`}
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              required
            />
          ))}
          <button type="button" onClick={addIngredientField}>+ Add Ingredient</button>
        </div>

        {/* Instructions */}
        <textarea placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} required />

        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
