package com.example.smartFileOrganizer.service;

import com.example.smartFileOrganizer.dto.FileData;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileScanService {

    public List<FileData> scan(String path){

        List<FileData> list=new ArrayList<>();

        File folder=new File(path);

        File[] files=folder.listFiles();

        if(files==null) return list;

        for(File file:files){

            if(file.isFile()){

                String name=file.getName();

                int dot=name.lastIndexOf(".");

                String ext="";

                if(dot>0){
                    ext=name.substring(dot+1);
                }

                list.add(new FileData(name,ext));
            }
        }

        return list;
    }
}