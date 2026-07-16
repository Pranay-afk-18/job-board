import React, { useState } from 'react';

function JobForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    companyLogo: "",
    location: "",
    jobType: "Full-time",
    experienceLevel: "Mid-level",
    salaryRange: "",
    contactEmail: "",
    description: "",
    requirements: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Job Title is required";
    if (!formData.companyName.trim()) newErrors.companyName = "Company Name is required";
    if (!formData.location.trim()) newErrors.location = "Job Location is required";
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Contact Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address";
    }
    if (!formData.description.trim()) newErrors.description = "Job Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formData);
  };

  return (
    <div className="form-view-container">
      <div className="form-header">
        <h1 className="form-title">Post a New <span className="gradient-text">Job Listing</span></h1>
        <p className="form-subtitle">Fill in the fields below to list your opening on our premium network.</p>
      </div>

      <form className="job-form-card" onSubmit={handleSubmit} id="post-job-form">
        <div className="form-grid-2">
          {/* Job Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="title">Job Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-input"
              placeholder="e.g. Senior Software Architect"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.title}</span>}
          </div>

          {/* Company Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="companyName">Company Name *</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              className="form-input"
              placeholder="e.g. NovaTech Inc."
              value={formData.companyName}
              onChange={handleChange}
            />
            {errors.companyName && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.companyName}</span>}
          </div>

          {/* Company Logo URL */}
          <div className="form-group">
            <label className="form-label" htmlFor="companyLogo">Company Logo URL (Optional)</label>
            <input
              type="url"
              id="companyLogo"
              name="companyLogo"
              className="form-input"
              placeholder="e.g. https://domain.com/logo.png"
              value={formData.companyLogo}
              onChange={handleChange}
            />
          </div>

          {/* Job Location */}
          <div className="form-group">
            <label className="form-label" htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              className="form-input"
              placeholder="e.g. New York, NY (Hybrid) or Remote"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.location}</span>}
          </div>

          {/* Job Type Dropdown */}
          <div className="form-group">
            <label className="form-label" htmlFor="jobType">Job Type</label>
            <select
              id="jobType"
              name="jobType"
              className="form-input"
              value={formData.jobType}
              onChange={handleChange}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Experience Level Dropdown */}
          <div className="form-group">
            <label className="form-label" htmlFor="experienceLevel">Experience Level</label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              className="form-input"
              value={formData.experienceLevel}
              onChange={handleChange}
            >
              <option value="Entry-level">Entry-level</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </select>
          </div>

          {/* Salary Range */}
          <div className="form-group">
            <label className="form-label" htmlFor="salaryRange">Salary Range (Optional)</label>
            <input
              type="text"
              id="salaryRange"
              name="salaryRange"
              className="form-input"
              placeholder="e.g. $120,000 - $150,000 or $60/hour"
              value={formData.salaryRange}
              onChange={handleChange}
            />
          </div>

          {/* Contact Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="contactEmail">Contact Email *</label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              className="form-input"
              placeholder="e.g. careers@company.com"
              value={formData.contactEmail}
              onChange={handleChange}
            />
            {errors.contactEmail && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.contactEmail}</span>}
          </div>

          {/* Job Description */}
          <div className="form-group form-group-full">
            <label className="form-label" htmlFor="description">Job Description *</label>
            <textarea
              id="description"
              name="description"
              className="form-textarea"
              placeholder="Describe the role responsibilities, core mission, and team structure..."
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.description}</span>}
          </div>

          {/* Requirements list */}
          <div className="form-group form-group-full">
            <label className="form-label" htmlFor="requirements">Requirements & Skills (Semicolon separated list)</label>
            <textarea
              id="requirements"
              name="requirements"
              className="form-textarea"
              placeholder="e.g. 3+ years of React; BS in Computer Science; Experience with SQL Databases; AWS experience"
              value={formData.requirements}
              onChange={handleChange}
              style={{ minHeight: '80px' }}
            />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              💡 Separate requirements with semicolons (;) to format them as bullet points in the job detail card.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions-row">
          <button type="button" id="btn-cancel-post" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" id="btn-submit-post" className="btn-primary">
            Publish Job Listing
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobForm;
