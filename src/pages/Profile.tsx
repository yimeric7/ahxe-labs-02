import * as React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../firebase/AuthContext";

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = async () => {
    try {
      await logout(); // Execute the logout function
      navigate("/"); // Navigate to the home page after logout
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        padding: "0 15px 15px 15px",
        height: "100%",
        gap: "20px",
      }}
    >
      <Link to="/lobby">Home</Link>
      <div>Profile</div>
      <div>{currentUser?.email}</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}