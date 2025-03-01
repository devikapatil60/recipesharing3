import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", user);
      navigate("/login");
    } catch (error) {
      setError("User already exists!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleRegister} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Register</button>
      </form>

      <p style={styles.registerText}>
        Already have an account? <Link to="/login" style={styles.registerLink}>Login here</Link>
      </p>
    </div>
  );
};


const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: { marginBottom: "15px" },
  error: { color: "red", marginBottom: "10px" },
  form: { display: "flex", flexDirection: "column" },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#1f1c16",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "0.3s",
  },
  registerText: {
    marginTop: "15px",
  },
  registerLink: {
    color: "#28a745",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Register;
