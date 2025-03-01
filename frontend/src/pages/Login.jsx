import React, { useState } from "react"; 
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 

const Login = ({ setIsLoggedIn }) => {  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setIsLoggedIn(true); 
      navigate("/"); 
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", background: "white", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", textAlign: "center" }}>
      <h2 style={{ marginBottom: "15px" }}>Login</h2>
      {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: "10px", margin: "10px 0", border: "1px solid #ddd", borderRadius: "5px" }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "10px", margin: "10px 0", border: "1px solid #ddd", borderRadius: "5px" }} />
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#1f1c16", color: "white", border: "none", cursor: "pointer", borderRadius: "5px", transition: "0.3s" }}>Login</button>
        

      </form>
    </div>
  );
};

export default Login;
