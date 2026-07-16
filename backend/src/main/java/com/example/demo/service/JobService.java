package com.example.demo.service;

import com.example.demo.model.Job;
import com.example.demo.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<Job> getJobs(String search, String location, String jobType, String level) {
        return jobRepository.filterJobs(search, location, jobType, level);
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public Optional<Job> updateJob(Long id, Job jobDetails) {
        return jobRepository.findById(id).map(job -> {
            job.setTitle(jobDetails.getTitle());
            job.setCompanyName(jobDetails.getCompanyName());
            job.setCompanyLogo(jobDetails.getCompanyLogo());
            job.setLocation(jobDetails.getLocation());
            job.setJobType(jobDetails.getJobType());
            job.setExperienceLevel(jobDetails.getExperienceLevel());
            job.setSalaryRange(jobDetails.getSalaryRange());
            job.setDescription(jobDetails.getDescription());
            job.setRequirements(jobDetails.getRequirements());
            job.setContactEmail(jobDetails.getContactEmail());
            job.setIsActive(jobDetails.getIsActive() != null ? jobDetails.getIsActive() : job.getIsActive());
            return jobRepository.save(job);
        });
    }

    public boolean deleteJob(Long id) {
        return jobRepository.findById(id).map(job -> {
            jobRepository.delete(job);
            return true;
        }).orElse(false);
    }

    public Map<String, Object> getStats() {
        List<Job> activeJobs = jobRepository.findByIsActiveTrueOrderByPostedAtDesc();
        long totalJobs = activeJobs.size();
        long remoteJobs = activeJobs.stream()
                .filter(j -> j.getLocation().toLowerCase().contains("remote"))
                .count();

        double totalSalary = 0;
        int salaryCount = 0;
        
        for (Job job : activeJobs) {
            String salStr = job.getSalaryRange();
            if (salStr != null && !salStr.trim().isEmpty()) {
                // Strip commas and other symbols except digits and hyphen
                String clean = salStr.replaceAll("[^0-9\\-]", "");
                if (clean.contains("-")) {
                    String[] parts = clean.split("-");
                    if (parts.length == 2) {
                        try {
                            double low = Double.parseDouble(parts[0]);
                            double high = Double.parseDouble(parts[1]);
                            // If low salary is under $1000, treat it as hourly rate
                            if (low < 1000) {
                                low *= 2000; // convert to approx annual (40 hrs/wk * 50 wks = 2000 hrs)
                                high *= 2000;
                            }
                            totalSalary += (low + high) / 2.0;
                            salaryCount++;
                        } catch (NumberFormatException ignored) {}
                    }
                } else if (!clean.isEmpty()) {
                    try {
                        double val = Double.parseDouble(clean);
                        if (val > 0) {
                            if (val < 1000) val *= 2000;
                            totalSalary += val;
                            salaryCount++;
                        }
                    } catch (NumberFormatException ignored) {}
                }
            }
        }

        String avgSalaryStr = "$120K+";
        if (salaryCount > 0) {
            double avg = totalSalary / salaryCount;
            if (avg >= 1000) {
                // Format nicely, e.g., $135,000
                avgSalaryStr = String.format("$%,.0f", avg);
            }
        }

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalJobs", totalJobs);
        stats.put("activeCount", totalJobs);
        stats.put("remoteCount", remoteJobs);
        stats.put("avgSalary", avgSalaryStr);
        return stats;
    }
}
