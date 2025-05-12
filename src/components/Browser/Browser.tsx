import axios from "axios";
import React, { useEffect } from "react";

export const Browser = () => {
  const [files, setFiles] = React.useState<any[]>([]);

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
      <div className="bg-teal-950 h-screen fixed text-3xl text-teal-50 inset-0">
        <div className="bg-teal-800 p-4">File path</div>
        Browser
      </div>
      ;
    </>
  );
};
