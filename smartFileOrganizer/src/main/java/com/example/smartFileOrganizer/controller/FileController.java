package com.example.smartFileOrganizer.controller;

import com.example.smartFileOrganizer.dto.*;
import com.example.smartFileOrganizer.entity.AllowedPath;
import com.example.smartFileOrganizer.repository.AllowedPathRepository;
import com.example.smartFileOrganizer.service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/files")
@CrossOrigin(origins = "http://localhost:5173")
public class FileController {

    @Autowired
    FileScanService scanService;

    @Autowired
    MLService mlService;

    @Autowired
    SegregationService segregationService;

    @Autowired
    AllowedPathRepository pathRepo;

    @PostMapping("/scan")
    public Map scan(@RequestBody ScanRequest req){

        List<FileData> files=
                scanService.scan(req.getScanPath());

        return mlService.analyze(files);
    }

    @PostMapping("/segregate")
    public String segregate(
            @RequestBody SegregateRequest req){

        List<AllowedPath> allowed=pathRepo.findAll();

        List<String> allowedPaths=
                allowed.stream()
                        .map(a->a.getPath())
                        .toList();

        segregationService.segregate(
                req.getScanPath(),
                req.getDestinations(),
                allowedPaths
        );

        return "Files organized successfully";
    }
}