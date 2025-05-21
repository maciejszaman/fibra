import { IconChevronLeft } from "@tabler/icons-react";
import { Link } from "react-router";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";
import * as Shared from "../../shared/Shared.types";
import { ThemePreview } from "./ThemePreview/ThemePreview";

export const Settings = () => {
  const { theme: currentTheme, availableThemes, setTheme } = useTheme();

  const handleThemeSelect = (selectedTheme: Shared.Theme) => {
    setTheme(selectedTheme);
  };

  return (
    <div className="wrapper flex justify-center">
      <div className="p-4 max-w-[1000px] bg-background w-full text-2xl text-text">
        <div className="buttons flex gap-4 h-16">
          <div className="p-2 flex items-center justify-center aspect-square w-fit bg-element text-text shadow-sm rounded-lg hover:brightness-105">
            <Link
              to="/files"
              className="w-full h-full flex items-center justify-center"
            >
              <IconChevronLeft />
            </Link>
          </div>
          <div className="bg-element text-center hover:brightness-105 truncate w-full shadow-sm rounded-lg p-4">
            Themes
          </div>
        </div>
        <div className="folders mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-4">
          {availableThemes.map((theme: Shared.Theme, index: number) => (
            <div
              onClick={() => handleThemeSelect(theme)}
              className={`rounded-lg ${
                currentTheme === theme
                  ? " ring-2 ring-text"
                  : "border-transparent "
              }`}
            >
              <ThemePreview themeName={theme} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
