import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios.get("http://localhost:5000/api/profile", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => setUser(response.data))
      .catch(() => setUser(null));
  }, [token]);

  return (
    <div>
      <h2>Profile</h2>
      {user ? <p>Email: {user.email}</p> : <p>Please login to view your profile.</p>}
    </div>
  );
};

export default Profile;
