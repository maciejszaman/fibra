import axios from "axios";
import React, { useEffect } from "react";
import * as Types from "./Browser.types";
import * as Shared from "../../shared/Shared.types";
import { FileCard } from "./File/FileCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";

export const Browser = ({}: Types.BrowserTypes) => {
  const [files, setFiles] = React.useState<Shared.File[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const subPath = decodeURIComponent(
    location.pathname.replace(/^\/files\/?/, "")
  );

  const handleClick = (file: Shared.File) => {
    if (file.folder) {
      navigate(`/files/${subPath ? `${subPath}/` : ""}${file.name}`);
    } else {
      console.log(`http://127.0.0.1:8080${file.path}`);
      window.location.href = `http://127.0.0.1:8080${file.path}`;
    }
  };

  useEffect(() => {
    const baseUrl = "http://127.0.0.1:8080/files";
    const params = subPath ? { path: subPath } : {};
    axios
      .get(baseUrl, { params })
      .then((response) => {
        console.log(response.data);
        console.log(params);
        setFiles(response.data);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [subPath]);

  return (
    <>
      <div className="bg-gray-200 h-screen dark:bg-stone-800 text-2xl p-2 text-stone-700 dark:text-stone-50 inset-0">
        <div className="buttons flex gap-4 h-16">
          <div className="p-2 flex items-center justify-center aspect-square w-fit bg-stone-700 text-white rounded-lg hover:bg-stone-600">
            <Link to="/files">
              <IconChevronLeft />
            </Link>
          </div>
          <div className="bg-gray-100 w-full dark:bg-stone-700 shadow-sm rounded-lg p-4">
            File path
          </div>
        </div>
        <div className="folders grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4">
          {files.map((file, index) => (
            <div
              key={index}
              onClick={() => handleClick(file)}
              className="bg-gray-100 dark:bg-stone-700 p-4 shadow-sm rounded-lg aspect-square hover:bg-gray-50 hover:dark:bg-stone-600 ease-in-out cursor-pointer"
            >
              <FileCard file={file} index={index} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
