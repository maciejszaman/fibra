import { IconMoon, IconSun } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect } from "react";
import * as Types from "./Browser.types";
import * as Shared from "../../shared/Shared.types";
import { FileCard } from "./File/FileCard";
import { useLocation, useNavigate } from "react-router-dom";

export const Browser = ({}: Types.BrowserTypes) => {
  const [files, setFiles] = React.useState<Shared.File[]>([]);
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location.pathname);

  const subPath = decodeURIComponent(
    location.pathname.replace(/^\/files\/?/, "")
  );

  const handleClick = (file: Shared.File) => {
    if (file.folder) {
      console.log(`/files${file.path}`);
      navigate(`/files${file.path}`);
    } else {
      console.log(`http://127.0.0.1:8080${file.path}`);
      window.location.href = `http://127.0.0.1:8080${file.path}`;
    }
  };

  axios.interceptors.request.use((request) => {
    console.log("Starting Request", JSON.stringify(request, null, 2));
    return request;
  });

  useEffect(() => {
    const baseUrl = "http://127.0.0.1:8080/files";
    axios
      .get(baseUrl, {
        params: subPath ? { path: subPath } : {},
      })
      .then((response) => {
        console.log(response.data);
        setFiles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div className="bg-gray-200 dark:bg-stone-800 h-screen fixed text-2xl p-2 text-stone-700 dark:text-stone-50 inset-0">
        <div className="bg-gray-100 dark:bg-stone-700 shadow-sm rounded-lg p-4">
          File path
        </div>
        <div className="folders grid grid-cols-2 gap-4 mt-4">
          {files.map((file, index) => (
            <a>
              <div
                key={index}
                onClick={() => handleClick(file)}
                className="bg-gray-100 dark:bg-stone-700 p-4 shadow-sm rounded-lg aspect-square hover:bg-gray-50 hover:dark:bg-stone-600 ease-in-out cursor-pointer"
              >
                <FileCard file={file} index={index} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
