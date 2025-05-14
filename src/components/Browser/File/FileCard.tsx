import React from "react";
import * as Shared from "../../../shared/Shared.types";
import * as Types from "./FileCard.types";
import {
  IconCode,
  IconFile,
  IconFileText,
  IconFileTypePdf,
  IconFileTypeZip,
  IconFileWord,
  IconFolder,
  IconGif,
  IconMovie,
  IconMusic,
  IconPhoto,
  IconPresentation,
  IconTable,
} from "@tabler/icons-react";

export const FileCard = ({
  file: { folder, name, path, type, extension },
  index,
}: Types.FileCardTypes) => {
  const appropriateIcon = (type: string) => {
    if (type == "jpg picture") return <IconPhoto size={48} />;
    else if (type == "png picture") return <IconPhoto size={48} />;
    else if (type == "gif picture") return <IconGif size={48} />;
    else if (type == "zip archive") return <IconFileTypeZip size={48} />;
    else if (type == "text file") return <IconFileText size={48} />;
    else if (type == "video file") return <IconMovie size={48} />;
    else if (type == "audio file") return <IconMusic size={48} />;
    else if (type == "pdf document") return <IconFileTypePdf size={48} />;
    else if (type == "HTML document") return <IconCode size={48} />;
    else if (type == "Word document") return <IconFileWord size={48} />;
    else if (type == "Excel spreadsheet") return <IconTable size={48} />;
    else if (type == "PowerPoint presentation")
      return <IconPresentation size={48} />;
    else if (type == "folder") return <IconFolder size={48} />;
    else if (type == "file") return <IconFile size={48} />;
    else return <IconFile />;
  };

  return (
    <div className="flex flex-col justify-center h-full items-center text-sm gap-2">
      {appropriateIcon(type)}
      {name}
    </div>
  );
};
