package com.fileserver;

public class FileInfo {
    private String name;
    private String path;
    private String extension;
    private String type;
    private boolean isFolder;

    public FileInfo(String name, String path, String extension, String type, boolean isFolder) {
        this.name = name;
        this.path = path;
        this.extension = extension;
        this.type = type;
        this.isFolder = isFolder;
    }

    public String getName() { return name; }
    public String getPath() { return path; }
    public String getExtension() { return extension; }
    public String getType() { return type; }
    public boolean isFolder() { return isFolder; }
}
