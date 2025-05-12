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

  return <div className="bg-gray-700">Browser</div>;
};
