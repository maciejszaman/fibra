package com.fileserver;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.nio.file.Files;


@CrossOrigin(origins = "*")
@RestController
public class FileController {

    // ✅ Set this to your actual Pictures directory
    private final String SHARED_DIR = "/home/maciej/Pictures";

@GetMapping("/files")
public List<FileInfo> listFiles(@RequestParam(value = "path", required = false, defaultValue = "") String subPath) {
    String fullPath = SHARED_DIR + "/" + subPath;
    File folder = new File(fullPath);
    File[] files = folder.listFiles();
    List<FileInfo> fileList = new ArrayList<>();

    if (files == null) {
        System.out.println("⚠️ Could not read: " + fullPath);
        return fileList;
    }

    for (File f : files) {
        String name = f.getName();
        String relativePath = (subPath.isEmpty() ? name : subPath + "/" + name);
        String apiPath = "/file/" + relativePath;
        boolean isFolder = f.isDirectory();
        String ext = isFolder ? "" : name.contains(".") ? name.substring(name.lastIndexOf('.') + 1) : "";
        String type;

        if (isFolder) {
            type = "folder";
        } else {
            switch (ext) {
                case "jpg":
                case "jpeg":
                    type = "jpg picture";
                    break;
                case "png":
                    type = "png picture";
                    break;
                case "gif":
                    type = "gif picture";
                    break;
                case "zip":
                case "rar":
                    type = "zip archive";
                    break;
                case "txt":
                case "md":
                case "log":
                    type = "text file";
                    break;
                case "mp4":
                case "mkv":
                case "avi":
                case "mov":
                    type = "video file";
                    break;
                case "mp3":
                case "wav":
                case "flac":
                    type = "audio file";
                    break;
                case "pdf":
                    type = "pdf document";
                    break;
                case "html":
                case "htm":
                    type = "HTML document";
                    break;
                case "doc":
                case "docx":
                    type = "Word document";
                    break;
                case "xls":
                case "xlsx":
                    type = "Excel spreadsheet";
                    break;
                case "ppt":
                case "pptx":
                    type = "PowerPoint presentation";
                    break;
                default:
                    type = "file";
                    break;
            }
        }

        fileList.add(new FileInfo(name, apiPath, ext, type, isFolder));
    }

    return fileList;
}

@GetMapping("/file/**")
public ResponseEntity<Resource> getFile(HttpServletRequest request) throws IOException {
    String fullRequestPath = request.getRequestURI().replace("/file/", "");
    File file = new File(SHARED_DIR + "/" + fullRequestPath);

    if (!file.exists() || file.isDirectory()) {
        return ResponseEntity.notFound().build();
    }

    Resource resource = new FileSystemResource(file);
    String contentType = Files.probeContentType(file.toPath());
    if (contentType == null) {
        contentType = "application/octet-stream";
    }

    // List of MIME types that should open in browser
    List<String> inlineTypes = List.of(
        "image/jpeg", "image/png", "image/gif",
        "text/plain", "text/html",
        "application/pdf", "audio/mpeg", "video/mp4"
    );

    boolean forceDownload = !inlineTypes.contains(contentType);

    ResponseEntity.BodyBuilder response = ResponseEntity.ok()
        .contentType(MediaType.parseMediaType(contentType));

    if (forceDownload) {
        response.header("Content-Disposition", "attachment; filename=\"" + file.getName() + "\"");
    }

    return response.body(resource);
}}