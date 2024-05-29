import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="inline-flex items-center gap-2 py-2.5 md:gap-4">
      {theme === "dark" ? (
        <Sun className="h-4 w-4 md:h-6 md:w-6" onClick={toggleTheme} />
      ) : (
        <Moon className="h-4 w-4 md:h-6 md:w-6" onClick={toggleTheme} />
      )}
    </div>
  );
};
