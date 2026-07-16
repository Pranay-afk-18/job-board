-- Create Database if not exists
CREATE DATABASE IF NOT EXISTS job_board_db;
USE job_board_db;

-- Create Jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    company_logo VARCHAR(255),
    location VARCHAR(255) NOT NULL,
    job_type VARCHAR(50) NOT NULL, -- e.g., 'Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'
    experience_level VARCHAR(50),  -- e.g., 'Entry-level', 'Mid-level', 'Senior', 'Lead'
    salary_range VARCHAR(100),
    description TEXT NOT NULL,
    requirements TEXT,
    contact_email VARCHAR(255) NOT NULL,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
