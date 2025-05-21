import * as Shared from "../../shared/Shared.types";

export interface ThemeContextTypes {
  theme: Shared.Theme;
  setTheme: (theme: Shared.Theme) => void;
  availableThemes: Shared.Theme[];
}
