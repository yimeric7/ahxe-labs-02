import * as React from "react";
import { Link } from "react-router-dom";

export default function Home() {
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
      <div>Welcome to AHXE Labs</div>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );
}
