import { framer } from "framer-plugin";
import * as React from "react";
import PaletteGenerator from "./pages/PaletteGenerator";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./firebase/AuthContext";

framer.showUI({
  position: "top right",
  width: 240,
  height: 95,
  resizable: true,
});

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="lobby" element={<Lobby />} />
          <Route path="profile" element={<Profile />}/>
          <Route path="/pallete" element={<PaletteGenerator />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
