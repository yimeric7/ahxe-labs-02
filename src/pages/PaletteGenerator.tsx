import { framer } from "framer-plugin";
import * as React from "react";
import { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/init";
import { useAuth } from "../firebase/AuthContext"
import { collection, addDoc } from "@firebase/firestore";

interface HSL {
  h: number;
  s: number;
  l: number;
}

export default function PaletteGenerator() {
  const { currentUser } = useAuth();
  const [name, setName] = useState<string>("white");
  const [hexCode, setHexCode] = useState<string>("#FAFAFA");
  const [palette, setPalette] = useState<{ shade: number; color: string }[]>(
    []
  );

  useEffect(() => {
    if (isValidHex(hexCode)) {
      const generatedPalette = generatePalette(hexCode);
      setPalette(generatedPalette);
    } else {
      setPalette([]);
    }
  }, [hexCode]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setHexCode(value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setName(value);
  };

  const handleAddColorStyles = async () => {
    // Loop through the palette and create a color style for each shade
    for (const { shade, color } of palette) {
      await framer.createColorStyle({
        name: `${name}-${shade}`, // e.g., #3366FF-50
        light: color,
      });
    }
  };

  const handleSaveFavorites = async () => {
    try {
      if (!currentUser) {
        console.error("User not authenticated.");
        return;
      }
      
      await addDoc(collection(db, "users", currentUser.uid, "palettes"), {
        name: name,
        palette: palette,
      });
    } catch (error) {
      console.error("Error saving palette:", error);
    }
  }

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
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <label style={{ fontSize: "12px", color: "#777" }}>Color</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <label style={{ fontSize: "12px", color: "#777" }}>Hex Code</label>
          <input type="text" value={hexCode} onChange={handleInputChange} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "auto",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          paddingBottom: "16px",
          overflow: "hidden",
        }}
      >
        {palette.map(({ shade, color }, index) => (
          <div
            key={index}
            style={{
              backgroundColor: color,
              width: "100%",
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px",
            }}
          >
            <span
              style={{
                padding: "0px 4px",
                backgroundColor: "#121315",
                color: "#FAFAFA",
                borderRadius: "4px",
              }}
            >
              {shade}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddColorStyles}
        style={{ height: "32px", backgroundColor: "#FAFAFA", color: "#121315" }}
      >
        Add To Framer
      </button>
      <button
        onClick={handleSaveFavorites}
        style={{ height: "32px", backgroundColor: "#121315", color: "#FAFAFA" }}
      >
        Save in Favorites
      </button>
    </div>
  );
}

// Helper functions

const isValidHex = (hex: string): boolean => {
  return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
};
const TAILWIND_SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const TAILWIND_LIGHTNESS = [95, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5];

const generatePalette = (
  baseHex: string
): { shade: number; color: string }[] => {
  const shades: { shade: number; color: string }[] = [];
  const baseHSL = hexToHsl(baseHex);

  TAILWIND_SHADES.forEach((shade, index) => {
    const lightness = TAILWIND_LIGHTNESS[index];
    const newHex = hslToHex(baseHSL.h, baseHSL.s, lightness);
    shades.push({ shade, color: newHex });
  });

  return shades;
};

const hexToHsl = (H: string): HSL => {
  let r: number, g: number, b: number;
  H = H.replace("#", "");

  if (H.length === 3) {
    H = H.split("")
      .map((h) => h + h)
      .join("");
  }

  r = parseInt(H.substring(0, 2), 16) / 255;
  g = parseInt(H.substring(2, 4), 16) / 255;
  b = parseInt(H.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h: number = 0,
    s: number = 0,
    l: number = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h *= 60;
  }

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hPrime = h / 60;
  const x = c * (1 - Math.abs((hPrime % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= hPrime && hPrime < 1) {
    r = c;
    g = x;
  } else if (1 <= hPrime && hPrime < 2) {
    r = x;
    g = c;
  } else if (2 <= hPrime && hPrime < 3) {
    g = c;
    b = x;
  } else if (3 <= hPrime && hPrime < 4) {
    g = x;
    b = c;
  } else if (4 <= hPrime && hPrime < 5) {
    r = x;
    b = c;
  } else if (5 <= hPrime && hPrime < 6) {
    r = c;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return rgbToHex(r, g, b);
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};
