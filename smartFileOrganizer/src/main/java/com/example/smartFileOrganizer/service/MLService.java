package com.example.smartFileOrganizer.service;

import com.example.smartFileOrganizer.dto.FileData;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class MLService {

    public Map analyze(List<FileData> files){

        RestTemplate restTemplate=new RestTemplate();

        String url="http://localhost:8000/analyze";

        ResponseEntity<Map> response=
                restTemplate.postForEntity(url,files,Map.class);

        return response.getBody();
    }
}