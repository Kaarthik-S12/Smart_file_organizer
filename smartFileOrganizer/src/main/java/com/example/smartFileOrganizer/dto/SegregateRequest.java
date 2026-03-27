package com.example.smartFileOrganizer.dto;

import java.util.Map;

public class SegregateRequest {

    private String scanPath;

    private Map<String,String> destinations;

    public String getScanPath(){
        return scanPath;
    }

    public void setScanPath(String scanPath){
        this.scanPath=scanPath;
    }

    public Map<String,String> getDestinations(){
        return destinations;
    }

    public void setDestinations(Map<String,String> destinations){
        this.destinations=destinations;
    }
}