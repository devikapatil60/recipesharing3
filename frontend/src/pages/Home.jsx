import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = ({ isLoggedIn }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  


  const navigate = useNavigate();

  //  Fetch recipes from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/recipes")
      .then((res) => {
        console.log("Fetched Recipes:", res.data);
        setRecipes(res.data);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

   
  

  //  Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  //  Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:5000/api/recipes/${id.trim()}`, { 
        headers: { Authorization: `Bearer ${token}` },
      });

      //  Remove deleted recipe from UI
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== id));
      alert("Recipe deleted successfully!");
    } catch (error) {
      console.error(" Error deleting recipe:", error);
      alert("Failed to delete recipe!");
    }
  };

  // Filter recipes based on search
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      

      {/*  Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/*  Recipe List */}
      <div className="recipe-grid">
        {filteredRecipes.length === 0 ? (
          <p className="no-recipes">No recipes found.</p>
        ) : (
          filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <div className="image-container">
                <img
                  src={`http://localhost:5000${recipe.image}`}
                  alt={recipe.title}
                  className="recipe-img"
                  onError={(e) => e.target.src = "/default-image.jpg"}
                />
              </div>
              <div className="recipe-content">
                <h3 className="recipe-title">{recipe.title}</h3>
                <p className="recipe-desc">{recipe.description}</p>
                <p className="recipe-owner">Posted by: {recipe.user?.email || "Unknown"}</p>
                
                
                

                <div className="recipe-actions">
                  <Link to={`/recipe/${recipe._id}`} className="view-btn">View</Link>

                  {/* Show Edit/Delete only for logged-in users */}
                  {isLoggedIn && recipe.user?.email === JSON.parse(localStorage.getItem("user"))?.email && (
  <>
    <Link to={`/edit-recipe/${recipe._id}`} className="edit-btn">Edit</Link>
    <button className="delete-btn" onClick={() => handleDelete(recipe._id)}>Delete</button>
  </>
)}

                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Recipe Button */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={() => isLoggedIn ? navigate("/add-recipe") : alert("Please login to add a recipe!")}
          style={{
            background: "#1f1c16",
            color: "white",
            padding: "10px 20px",
            fontSize: "18px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + Add Recipe
        </button>
      </div>
    </div>
  );
};

export default Home;
