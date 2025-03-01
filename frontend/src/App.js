import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Terms from "./pages/Terms"; 
import Privacy from "./pages/Privacy"
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in on page refresh
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  // ✅ Protected Route Component
  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
      <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/terms" element={<Terms />} />
        <Route path ='/privacy' element={<Privacy />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protect these routes (only accessible when logged in) */}
        <Route path="/add-recipe" element={<ProtectedRoute element={<AddRecipe />} />} />
        <Route path="/edit-recipe/:id" element={<ProtectedRoute element={<EditRecipe />} />} />
        
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
