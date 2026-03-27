package com.example.smartFileOrganizer.controller;

import com.example.smartFileOrganizer.entity.AllowedPath;
import com.example.smartFileOrganizer.repository.UserRepository;
import com.example.smartFileOrganizer.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/settings")
@CrossOrigin(origins = "http://localhost:5173")
public class SettingsController {

    @Autowired
    private SettingsService service;
    @Autowired
    private UserRepository userRepository;

    // helper method to get logged-in userId
    private Long getLoggedUserId(){

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository
                .findByEmail(email)
                .orElseThrow()
                .getId();
    }
    @PostMapping("/add")
    public List<AllowedPath> addPaths(
                                      @RequestParam List<String> paths){
        long userId=getLoggedUserId();

        return service.addPaths(userId, paths);
    }

    @GetMapping("/list")
    public List<AllowedPath> getPaths(){
        long userId=getLoggedUserId();
        return service.getPaths(userId);
    }

    @DeleteMapping("/delete")
    public String delete(){
        long id=getLoggedUserId();
        service.deletePath(id);

        return "Path removed";
    }
}