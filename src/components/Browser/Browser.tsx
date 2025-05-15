import axios from "axios";
import React, { useEffect } from "react";
import * as Types from "./Browser.types";
import * as Shared from "../../shared/Shared.types";
import { FileCard } from "./File/FileCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IconChevronLeft, IconHome, IconSettings } from "@tabler/icons-react";

export const Browser = ({}: Types.BrowserTypes) => {
  const [files, setFiles] = React.useState<Shared.File[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const subPath = decodeURIComponent(
    location.pathname.replace(/^\/files\/?/, "")
  );

  // Folders first.
  const sortedFiles = files.sort((a, b) => {
    if (a.folder && !b.folder) return -1;
    if (!a.folder && b.folder) return 1;
    return 0;
  });

  const pathSegments = subPath.split("/").filter(Boolean);
  const currentFolder = pathSegments[pathSegments.length - 1];
  const parentPath = pathSegments.slice(0, -1).join("/");
  const showBackButton = pathSegments.length > 0;

  const handleClick = (file: Shared.File) => {
    if (file.folder) {
      navigate(`/files/${subPath ? `${subPath}/` : ""}${file.name}`);
    } else {
      window.location.href = `http://127.0.0.1:8080${file.path}`;
    }
  };

  useEffect(() => {
    const baseUrl = "http://127.0.0.1:8080/files";
    const params = subPath ? { path: subPath } : {};
    axios
      .get(baseUrl, { params })
      .then((response) => {
        setFiles(response.data);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [subPath]);

  return (
    <>
      <div className="wrapper flex justify-center">
        <div className="bg-gray-200 h-screen w-full max-w-[1000px] dark:bg-stone-800 text-2xl p-4 text-stone-700 dark:text-stone-50">
          <div className="buttons flex gap-4 h-16">
            <div className="p-2 flex items-center justify-center aspect-square w-fit bg-stone-700 text-white rounded-lg hover:bg-stone-600">
              {!showBackButton ? (
                <Link
                  to="/settings"
                  className="w-full h-full flex items-center justify-center"
                >
                  <IconSettings />
                </Link>
              ) : (
                <Link
                  to={`/files/${parentPath}`}
                  className="w-full h-full flex items-center justify-center"
                >
                  <IconChevronLeft />
                </Link>
              )}
            </div>
            <div className="bg-gray-100 hover:bg-gray-50 hover:dark:bg-stone-600 text-center justify-center flex truncate w-full dark:bg-stone-700 shadow-sm rounded-lg p-4">
              {currentFolder || "Home"}
            </div>
          </div>
          <div className="folders grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4 mb-4">
            {sortedFiles.map((file, index) => (
              <div
                key={index}
                onClick={() => handleClick(file)}
                className="bg-gray-100 dark:bg-stone-700 p-4 text-wrap shadow-sm rounded-lg aspect-square hover:bg-gray-50 hover:dark:bg-stone-600 ease-in-out cursor-pointer"
              >
                <FileCard file={file} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
