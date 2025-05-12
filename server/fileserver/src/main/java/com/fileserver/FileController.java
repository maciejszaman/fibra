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
        String type = isFolder ? "folder" : "file";

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