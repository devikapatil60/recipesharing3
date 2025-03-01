import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>TasteHub</h2>
      <div style={styles.links}>
        <StyledLink to="/">Home</StyledLink>

        {isLoggedIn && <StyledLink to="/add-recipe">Add Recipe</StyledLink>}
        
        

        {isLoggedIn ? (
          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <StyledLink to="/login">Login</StyledLink>
            <Link to="/register" style={styles.registerButton}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1f1c16",
    padding: "15px 30px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 4px 10px rgba(193, 120, 3, 0.1)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  },
  logo: {
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "10px",
    marginRight: "10px",
    fontWeight: "500",
    transition: "background-color 0.3s ease",
  },
  registerButton: {
    padding: "8px 12px",
    backgroundColor: "#1f1c16",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none",
  },
  logoutButton: {
    padding: "8px 12px",
    backgroundColor: "#76101f",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "0.3s",
  },
  favoriteButton: {
    padding: "8px 12px",
    backgroundColor: "#1f1c16",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none",
  },
};


const StyledLink = ({ to, children }) => (
  <Link
    to={to}
    style={styles.link}
    onMouseEnter={(e) => (e.target.style.backgroundColor = "#e91e63")}
    onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
  >
    {children}
  </Link>
);

export default Navbar;
