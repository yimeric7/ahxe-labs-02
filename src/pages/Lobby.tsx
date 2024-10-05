import * as React from "react";
import { Link } from "react-router-dom";

export default function Lobby() {
  return (
    <div
    style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        padding: "0 15px 15px 15px",
        height: "100%",
        gap: "20px",
      }}>
      <div>AHXE Labs Lobby</div>
      <Link to="/profile">Profile</Link>
      <Link to="/pallete">New Pallette</Link>
    </div>
  );
}
