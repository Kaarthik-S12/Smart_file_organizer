package com.example.smartFileOrganizer.service;
import com.example.smartFileOrganizer.dto.LoginRequest;
import com.example.smartFileOrganizer.entity.User;

import com.example.smartFileOrganizer.config.JwtUtil;
import com.example.smartFileOrganizer.dto.RegisterRequest;
import com.example.smartFileOrganizer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public String register(RegisterRequest req){

        if(userRepository.findByEmail(req.getEmail()).isPresent()){
            throw new RuntimeException("User already exists");
        }

        User user = new User();

        user.setEmail(req.getEmail());

        user.setPassword(passwordEncoder.encode(req.getPassword()));

        userRepository.save(user);

        return "User registered successfully";
    }

    public String login(LoginRequest req){

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!passwordEncoder.matches(req.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(user.getEmail());
    }
}
