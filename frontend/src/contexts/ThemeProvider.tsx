import { useState } from "react";
import type { ReactNode } from "react";
import {
  FluentProvider,
  createDarkTheme,
  createLightTheme,
} from "@fluentui/react-components";
import type { BrandVariants } from "@fluentui/react-components";
import { ThemeContext } from "./ThemeContext";

const nexusBrand: BrandVariants = {
  10: "#020509",
  20: "#05101e",
  30: "#091b34",
  40: "#0d274d",
  50: "#113468",
  60: "#154284",
  70: "#1a51a3",
  80: "#4f8ef7",
  90: "#6fa3f9",
  100: "#8cb6fa",
  110: "#a8c8fb",
  120: "#c2d9fc",
  130: "#d9e8fd",
  140: "#ecf3fe",
  150: "#f5f9ff",
  160: "#fafcff",
};

const lightTheme = {
  ...createLightTheme(nexusBrand),
  colorNeutralBackground1: "#f9fafb",
  colorNeutralBackground2: "#f3f4f6",
  colorNeutralBackground3: "#e5e7eb",
};

const darkTheme = {
  ...createDarkTheme(nexusBrand),
  colorNeutralBackground1: "#111827",
  colorNeutralBackground2: "#1f2937",
  colorNeutralBackground3: "#374151",
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  return (
    <ThemeContext.Provider
      value={{ isDark, toggleTheme: () => setIsDark((d) => !d) }}
    >
      <FluentProvider theme={isDark ? darkTheme : lightTheme}>
        {children}
      </FluentProvider>
    </ThemeContext.Provider>
  );
}
