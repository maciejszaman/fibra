import React, {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import * as Types from "./ThemeContext.types";
import { themes } from "../../shared/themes";
import * as Shared from "../../shared/Shared.types";

const ThemeContext = createContext<Types.ThemeContextTypes | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = React.useState<Shared.Theme>("dark");
  const availableThemes = Object.keys(themes) as Shared.Theme[];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Shared.Theme | null;
    if (savedTheme && availableThemes.includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply the theme variables to the root element
    const themeVariables = themes[theme];
    const root = document.documentElement;

    Object.entries(themeVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, availableThemes }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};
