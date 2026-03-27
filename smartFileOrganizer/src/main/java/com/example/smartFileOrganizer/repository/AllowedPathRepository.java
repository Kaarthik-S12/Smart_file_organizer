package com.example.smartFileOrganizer.repository;

import com.example.smartFileOrganizer.entity.AllowedPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AllowedPathRepository extends JpaRepository<AllowedPath,Long> {

    List<AllowedPath> findByUserId(Long userId);
    void deleteByUserId(Long userId);
}
