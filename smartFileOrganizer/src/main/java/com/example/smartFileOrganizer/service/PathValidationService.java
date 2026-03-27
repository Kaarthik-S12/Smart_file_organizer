package com.example.smartFileOrganizer.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PathValidationService {

    public boolean isAllowed(String path,List<String> allowedPaths){

        for(String allowed:allowedPaths){

            if(path.startsWith(allowed)){
                return true;
            }
        }

        return false;
    }
}