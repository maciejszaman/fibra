import { IconMoon, IconSun } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect } from "react";
import * as Types from "./Browser.types";
import * as Shared from "../../shared/Shared.types";

export const Browser = ({}: Types.BrowserTypes) => {
  const [files, setFiles] = React.useState<Shared.File[]>([]);

  useEffect(() => {
    axios
      .get("/api/files")
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
      <div className="bg-gray-200 h-screen fixed text-2xl p-2 text-gray-900 inset-0">
        <div className="bg-gray-100 shadow-sm rounded-lg p-4">File path</div>
        <div className="folders grid grid-cols-2 gap-4 mt-4">
          {files.map((file, index) => (
            <div className="bg-gray-100 p-4 shadow-sm rounded-lg">
              {file.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
