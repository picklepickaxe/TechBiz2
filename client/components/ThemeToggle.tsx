import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if user has a preference stored
    const stored = localStorage.getItem("techbiz-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (stored === "dark" || (!stored && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("techbiz-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("techbiz-theme", "light");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="border-techbiz-purple/30 hover:border-techbiz-purple hover:bg-techbiz-purple/10 transition-colors relative overflow-hidden"
    >
      <div className="flex items-center gap-2">
        <div className="relative w-4 h-4">
          <Sun
            className={`h-4 w-4 text-techbiz-purple absolute inset-0 transition-all duration-500 ${
              isDark
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 rotate-180 scale-0"
            }`}
          />
          <Moon
            className={`h-4 w-4 text-techbiz-purple absolute inset-0 transition-all duration-500 ${
              isDark
                ? "opacity-0 -rotate-180 scale-0"
                : "opacity-100 rotate-0 scale-100"
            }`}
          />
        </div>
        <span className="text-sm font-medium">{isDark ? "Light" : "Dark"}</span>
      </div>
    </Button>
  );
}
