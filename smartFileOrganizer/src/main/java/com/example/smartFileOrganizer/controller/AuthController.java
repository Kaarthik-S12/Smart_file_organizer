package com.example.smartFileOrganizer.controller;

import com.example.smartFileOrganizer.dto.LoginRequest;
import com.example.smartFileOrganizer.dto.RegisterRequest;
import com.example.smartFileOrganizer.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest req){
        return authService.register(req);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest req){
        return authService.login(req);
    }
}