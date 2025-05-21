import axios from "axios";
import React, { useEffect } from "react";
import * as Types from "./Browser.types";
import * as Shared from "../../shared/Shared.types";
import { FileCard } from "./File/FileCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IconChevronLeft, IconSettings } from "@tabler/icons-react";
import { motion } from "motion/react";

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
      window.location.href = `http://192.168.50.163:8080${file.path}`;
    }
  };

  useEffect(() => {
    const baseUrl = "http://192.168.50.163:8080/files";
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
        <div className="bg-background h-screen w-full max-w-[1000px] text-2xl p-4 text-text">
          <div className="buttons flex gap-4 h-16">
            <div className="p-2 flex items-center justify-center aspect-square w-fit bg-element text-text rounded-lg shadow-sm hover:brightness-105">
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
            <div className="bg-element hover:brightness-105 text-center justify-center flex truncate w-full shadow-sm rounded-lg p-4">
              {currentFolder || "Home"}
            </div>
          </div>
          <motion.div
            key={`folders-${subPath}`}
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.335, ease: "easeOut" }}
            className="folders grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4 mb-4"
          >
            {sortedFiles.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleClick(file)}
                className="bg-element p-4 text-wrap shadow-sm rounded-lg aspect-square hover:brightness-105 ease-in-out cursor-pointer"
              >
                <FileCard file={file} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};
