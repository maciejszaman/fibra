import { IconBrush } from "@tabler/icons-react";
import * as Types from "./ThemePreview.types";
import { themes } from "../../../shared/themes";
import { motion } from "motion/react";

export const ThemePreview = ({ themeName, index }: Types.ThemePreviewTypes) => {
  const theme = themes[themeName];

  return (
    <motion.div
      key={themeName}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-4 text-wrap shadow-sm rounded-lg aspect-square hover:brightness-105 ease-in-out cursor-pointer
      "
      style={{
        backgroundColor: theme["--color-element"],
        color: theme["--color-text"],
        fontFamily: theme["--font-family"],
      }}
    >
      <div className="flex flex-col justify-center h-full items-center text-sm gap-2 text-wrap rounded-lg text-center">
        <IconBrush size={48} />
        <span className="text-wrap">{themeName}</span>
      </div>
    </motion.div>
  );
};
