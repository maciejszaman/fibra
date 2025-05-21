import { IconChevronLeft, IconMoodEmpty } from "@tabler/icons-react";
import { Link } from "react-router";

export const NotFound = () => {
  return (
    <div className="bg-gray-200 dark:bg-stone-800 justify-center h-screen text-2xl p-6 text-stone-700 dark:text-stone-50 inset-0">
      <div className="p-2 w-fit bg-stone-700 text-white rounded-lg hover:bg-stone-600">
        <Link to="/files">
          <IconChevronLeft />
        </Link>
      </div>
      <div className="text ring-2 md:max-w-96 justify-center dark:ring-white p-6 rounded-lg relative top-1/6">
        <IconMoodEmpty />
      </div>
    </div>
  );
};
