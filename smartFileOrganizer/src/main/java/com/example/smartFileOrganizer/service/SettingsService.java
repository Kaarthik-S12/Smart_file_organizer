package com.example.smartFileOrganizer.service;

import com.example.smartFileOrganizer.entity.User;
import com.example.smartFileOrganizer.entity.AllowedPath;
import com.example.smartFileOrganizer.repository.AllowedPathRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SettingsService {

    @Autowired
    private AllowedPathRepository repository;

    public List<AllowedPath> addPaths(Long userId, List<String> paths){

        List<AllowedPath> savedPaths = new ArrayList<>();

        for(String path : paths){

            AllowedPath allowed = new AllowedPath();
            allowed.setPath(path);

            User user = new User();
            user.setId(userId);

            allowed.setUser(user);

            savedPaths.add(repository.save(allowed));
        }

        return savedPaths;
    }

    public List<AllowedPath> getPaths(Long userId){

        return repository.findByUserId(userId);
    }
    @Transactional
    public void deletePath(Long id){

        repository.deleteByUserId(id);
    }
}