package com.example.smartFileOrganizer.dto;

public class ScanRequest {

    private String scanPath;

    public String getScanPath(){
        return scanPath;
    }

    public void setScanPath(String scanPath){
        this.scanPath=scanPath;
    }
}