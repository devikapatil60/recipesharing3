import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Favorites = ({ isLoggedIn }) => {
  const [favorites, setFavorites] = useState([]);

  //  Fetch favorites when user is logged in
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("❌ No auth token found. Please login.");
          return;
        }
  
        const res = await axios.get("http://localhost:5000/api/favorites", {
          headers: { Authorization: `Bearer ${token}` } // ✅ Fix: Ensure token is sent
        });
  
        console.log("✅ Fetched Favorites:", res.data); // Debugging
        setFavorites(res.data);
      } catch (error) {
        console.error("❌ Error fetching favorites:", error.response?.data || error);
      }
    };
  
    if (isLoggedIn) fetchFavorites();
  }, [isLoggedIn]);
  
  
  

  //  Remove from favorites
  const removeFavorite = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:5000/api/favorites/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(prev => prev.filter(recipe => recipe._id !== id));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div className="favorites-container">
      <h1>My Favorite Recipes </h1>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet. Start adding some!</p>
      ) : (
        <div className="recipe-list">
          {favorites.map(recipe => (
            <div key={recipe._id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <Link to={`/recipe/${recipe._id}`} className="view-btn">View Recipe</Link>
              <button onClick={() => removeFavorite(recipe._id)} className="remove-btn">Remove ❌</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
