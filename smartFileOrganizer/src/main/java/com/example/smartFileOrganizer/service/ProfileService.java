package com.example.smartFileOrganizer.service;

import com.example.smartFileOrganizer.entity.User;
import com.example.smartFileOrganizer.repository.ProfileRepository;
import com.example.smartFileOrganizer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.example.smartFileOrganizer.entity.Profile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    public Profile createProfile(Long userId, Profile profile){

        User user = userRepository.findById(userId)
                .orElseThrow();

        profile.setUser(user);
        profile.setEmail(user.getEmail());

        return profileRepository.save(profile);
    }

    public Profile getProfile(Long userId){
        Profile profile = profileRepository.findByUserId(userId);
        if (profile == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No profile found");
        return profile;
    }

    public Profile updateProfile(Long userId, Profile updated){

        Profile profile = profileRepository.findByUserId(userId);
        profile.setName(updated.getName());
        profile.setGender(updated.getGender());
        profile.setOccupation(updated.getOccupation());
        profile.setPhoto(updated.getPhoto());   
        return profileRepository.save(profile);
    }
}
