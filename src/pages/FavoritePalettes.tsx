import * as React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/init";
import { useAuth } from "../firebase/AuthContext";
import { useNavigate } from "react-router-dom";
import { framer } from "framer-plugin";

interface PaletteColor {
  color: string;
  shade: number;
}

interface Palette {
  id: string;
  name: string;
  palette: PaletteColor[];
}

export default function FavoritePalettes() {
  const { currentUser } = useAuth();
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPalettes = async () => {
      if (currentUser) {
        try {
          const palettesCollectionRef = collection(
            db,
            "users",
            currentUser.uid,
            "palettes"
          );
          const palettesSnapshot = await getDocs(palettesCollectionRef);
          const palettesList = palettesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Palette[];
          setPalettes(palettesList);
        } catch (error) {
          console.error("Error fetching palettes:", error);
        }
      }
    };

    fetchPalettes();
  }, [currentUser, db]);

  const handleAddColorStyles = async (
    name: string,
    palette: PaletteColor[]
  ): Promise<void> => {
    // Loop through the palette and create a color style for each shade
    for (const { shade, color } of palette) {
      await framer.createColorStyle({
        name: `${name}-${shade}`, // e.g., #3366FF-50
        light: color,
      });
    }
  };

  return (
    <div
      style={{
        padding: "0 15px 15px 15px",
      }}
    >
      <button onClick={() => navigate("/lobby")}>Home</button>
      <h2>Favorite Palettes</h2>
      {palettes.length > 0 ? (
        <div>
          {palettes.map((palette) => (
            <div key={palette.id}>
              <h4>{palette.name}</h4>
              {palette.palette && palette.palette.length > 0 ? (
                <div>
                  {palette.palette.map((colorItem) => (
                    <div>
                      <div
                        style={{
                          backgroundColor: colorItem.color,
                          width: "100%",
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "8px",
                        }}
                      >
                        <div
                          style={{
                            padding: "0px 4px",
                            backgroundColor: "#121315",
                            color: "#FAFAFA",
                            borderRadius: "4px",
                          }}
                        >
                          {colorItem.shade}
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      handleAddColorStyles(palette.name, palette.palette)
                    }
                    style={{
                      height: "32px",
                      backgroundColor: "#FAFAFA",
                      color: "#121315",
                    }}
                  >
                    Add to Framer
                  </button>
                </div>
              ) : (
                <p>No colors found for this palette.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No palettes found.</p>
      )}
    </div>
  );
}
