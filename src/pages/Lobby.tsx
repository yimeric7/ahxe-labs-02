import { ColorStyle, framer } from "framer-plugin";
import * as React from "react";
import { Link } from "react-router-dom";

export default function Lobby() {
  const [colorStyles, setColorStyles] = React.useState<ColorStyle[]>([]);

  // Fetch all color styles on component mount
  React.useEffect(() => {
    const getColorStyles = async () => {
      try {
        const colorStyles = await framer.getColorStyles();
        setColorStyles(colorStyles);
      } catch (error) {
        console.error("Error fetching color styles:", error);
      }
    };

    getColorStyles();
  }, []);

  // Function to clear all color styles
  const handleClearColorStyles = async () => {
    try {
      // Iterate through each color style and remove it
      for (const colorStyle of colorStyles) {
        await colorStyle.remove();
      }
      console.log("All color styles removed successfully.");

      // Clear the local state to reflect changes
      setColorStyles([]);
    } catch (error) {
      console.error("Error removing color styles:", error);
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
      <div>AHXE Labs Lobby</div>
      <Link to="/profile">Profile</Link>
      <Link to="/pallete">New Palette</Link>
      <Link to="/favorites">Favorite Palettes</Link>
      <button onClick={handleClearColorStyles}>Clear Color Styles</button>
    </div>
  );
}
