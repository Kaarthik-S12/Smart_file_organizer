package com.example.smartFileOrganizer.service;

import org.springframework.stereotype.Service;

import java.io.File;
import java.util.*;

@Service
public class SegregationService {

    private static final Set<String> IMAGE_EXT =
            Set.of("jpg","jpeg","png","gif","bmp","webp");

    private static final Set<String> DOC_EXT =
            Set.of("pdf","doc","docx","txt","xls","xlsx","ppt","pptx");

    private static final Set<String> VIDEO_EXT =
            Set.of("mp4","mkv","avi","mov");

    private static final Set<String> ARCHIVE_EXT =
            Set.of("zip","rar","7z","tar","gz");

    public void segregate(String scanPath,
                          Map<String,String> destMap,
                          List<String> allowedPaths){
      System.out.println("enter");
        File folder = new File(scanPath);
        File[] files = folder.listFiles();

        if(files == null) return;

        for(File file : files){

            if(file.isFile()){

                String name = file.getName();

                int dot = name.lastIndexOf(".");
                String ext = "";

                if(dot > 0){
                    ext = name.substring(dot + 1).toLowerCase();
                }

                String category = getCategory(ext);

                if(destMap.containsKey(category)){

                    String destPath = destMap.get(category);

                    if(destPath == null || destPath.isEmpty())
                        continue;

                    boolean allowed = false;

                    for(String path : allowedPaths){
                        if(destPath.startsWith(path)){
                            allowed = true;
                            break;
                        }
                    }

                    if(!allowed){
                        throw new RuntimeException(
                                "Destination path not allowed");
                    }

                    File destFolder = new File(destPath);
                    destFolder.mkdirs();

                    file.renameTo(new File(destFolder,name));
                }
            }
        }
    }

    private String getCategory(String ext){

        if(IMAGE_EXT.contains(ext))
            return "images";

        if(DOC_EXT.contains(ext))
            return "documents";

        if(VIDEO_EXT.contains(ext))
            return "videos";

        if(ARCHIVE_EXT.contains(ext))
            return "archives";

        return "others";
    }
}