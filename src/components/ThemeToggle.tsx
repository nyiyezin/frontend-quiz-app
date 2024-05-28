import motion from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const spring = {
    type: "spring",
    stiffness: "700",
    damping: 30,
  };

  return (
    <div className="inline-flex items-center gap-2 py-2.5 md:gap-4">
      {theme === "dark" ? (
        <Sun className="h-4 w-4 md:h-6 md:w-6" />
      ) : (
        <Moon className="h-4 w-4 md:h-6 md:w-6" />
      )}

      <div
        className="flex h-5 w-8 cursor-pointer items-center justify-start rounded-full bg-purple px-1 py-2 data-[theme=dark]:justify-end md:h-7 md:w-12"
        data-theme={theme}
        onClick={toggleTheme}
      >
        <motion.div
          className="h-3 w-3 rounded-full bg-pure-white  md:h-5 md:w-5"
          layout
          transition={spring}
        />
      </div>

      {theme === "light" ? (
        <Moon className="h-4 w-4 md:h-6 md:w-6" />
      ) : (
        <Sun className="h-4 w-4 md:h-6 md:w-6" />
      )}
    </div>
  );
};
