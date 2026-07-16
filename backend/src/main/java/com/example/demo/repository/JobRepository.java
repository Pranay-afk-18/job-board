package com.example.demo.repository;

import com.example.demo.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    @Query("SELECT j FROM Job j WHERE j.isActive = true " +
           "AND (:search IS NULL OR :search = '' OR LOWER(j.title) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(j.companyName) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(j.description) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "AND (:location IS NULL OR :location = '' OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) " +
           "AND (:jobType IS NULL OR :jobType = '' OR j.jobType = :jobType) " +
           "AND (:experienceLevel IS NULL OR :experienceLevel = '' OR j.experienceLevel = :experienceLevel) " +
           "ORDER BY j.postedAt DESC")
    List<Job> filterJobs(
        @Param("search") String search,
        @Param("location") String location,
        @Param("jobType") String jobType,
        @Param("experienceLevel") String experienceLevel
    );

    List<Job> findByIsActiveTrueOrderByPostedAtDesc();
}
