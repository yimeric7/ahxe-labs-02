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
import PrivateRoute from "./components/PrivateRoute"
import FavoritePalettes from "./pages/FavoritePalettes";

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
          <Route path="/lobby" element={<PrivateRoute><Lobby /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}/>
          <Route path="/pallete" element={<PrivateRoute><PaletteGenerator /></PrivateRoute>} />
          <Route path="/favorites" element={<PrivateRoute><FavoritePalettes /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
