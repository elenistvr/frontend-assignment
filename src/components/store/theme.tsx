import { ReactNode, createContext, useState } from "react";

type Theme = "light" | "dark";
type ThemeContext = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({children}:ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const color = theme === "light" ? "#222222" : "#FFFFFF";
  const backgroundColor = theme === "light" ? "#FFF" : "#333";

  document.body.style.color = color;
  document.body.style.backgroundColor = backgroundColor;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
