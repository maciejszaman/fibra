import type { themes } from "./themes";

export interface File {
  folder: boolean;
  name: string;
  path: string;
  type: string;
  extension: string;
}

export type Theme = keyof typeof themes;

export type ThemeVariables = {
  "--color-element": string;
  "--color-background": string;
  "--color-text": string;
  "--font-family": string;
};
