package com.example.smartFileOrganizer.controller;

import com.example.smartFileOrganizer.entity.Profile;
import com.example.smartFileOrganizer.repository.UserRepository;
import com.example.smartFileOrganizer.service.ProfileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

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

    // Create profile
    @PostMapping
    public Profile create(@RequestBody Profile profile){

        Long userId = getLoggedUserId();

        return profileService.createProfile(userId, profile);
    }

    // Get profile
    @GetMapping
    public Profile get(){

        Long userId = getLoggedUserId();

        return profileService.getProfile(userId);
    }

    // Update profile
    @PutMapping
    public Profile update(@RequestBody Profile profile){

        Long userId = getLoggedUserId();

        return profileService.updateProfile(userId, profile);
    }
}