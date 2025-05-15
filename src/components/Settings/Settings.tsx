import { IconChevronLeft, IconCode } from "@tabler/icons-react";
import { Link } from "react-router";
import * as Types from "./Settings.types";

export const Settings = ({}: Types.SettingsTypes) => {
  return (
    <div className="p-4 bg-gray-200  dark:bg-stone-800 text-2xl text-stone-700 dark:text-stone-50">
      <div className="buttons flex gap-4 h-16">
        <div className="p-2 flex items-center justify-center aspect-square w-fit bg-stone-700 text-white rounded-lg hover:bg-stone-600">
          <Link
            to="/files"
            className="w-full h-full flex items-center justify-center"
          >
            <IconChevronLeft />
          </Link>
        </div>
        <div className="bg-gray-100 text-center hover:bg-gray-50 hover:dark:bg-stone-600 truncate w-full dark:bg-stone-700 shadow-sm rounded-lg p-4">
          Settings
        </div>
      </div>
      <div className="bg-gray-100 mt-4 mb-4 dark:bg-stone-700 p-4 shadow-sm rounded-lg aspect-square flex flex-col items-center justify-center gap-2">
        <IconCode size={36} />
        <p className="text-3xl">Themes</p>
        <p className="opacity-50">Work in progress</p>
      </div>
    </div>
  );
};
