import React from 'react';

function JobBoard({
  jobs,
  stats,
  loading,
  search,
  setSearch,
  location,
  setLocation,
  jobType,
  setJobType,
  level,
  setLevel,
  onSelectJob,
  clearFilters
}) {
  
  // Format dates nicely
  const getRelativeTime = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 60) return `${diffMins || 1}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return `Yesterday`;
      return `${diffDays} days ago`;
    } catch (e) {
      return "Recently";
    }
  };

  const isFiltered = search || location || jobType || level;

  return (
    <div>
      {/* Hero Header Section */}
      <section className="hero-section">
        <h1 className="hero-title">Discover Your Next <span className="gradient-text">Dream Career</span></h1>
        <p className="hero-subtitle">TalentStream is the premier destination to find elite engineering, design, and product postings. Filter instantly and connect directly with top-tier companies.</p>
      </section>

      {/* Stats Counter Section */}
      <section className="stats-grid">
        <div className="stat-card" id="stat-total-jobs">
          <span className="stat-value">{stats.totalJobs || 0}</span>
          <span className="stat-label">Total Postings</span>
        </div>
        <div className="stat-card" id="stat-active-postings">
          <span className="stat-value">{stats.activeCount || 0}</span>
          <span className="stat-label">Active Roles</span>
        </div>
        <div className="stat-card" id="stat-remote-jobs">
          <span className="stat-value">{stats.remoteCount || 0}</span>
          <span className="stat-label">Remote Options</span>
        </div>
        <div className="stat-card" id="stat-avg-salary">
          <span className="stat-value">{stats.avgSalary || "$120K+"}</span>
          <span className="stat-label">Avg Est. Salary</span>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="search-filter-container">
        <div className="search-bar-row">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input 
              id="search-input"
              type="text" 
              className="search-input" 
              placeholder="Search by role title, company keywords, or descriptions..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="filters-row">
          {/* Location Search Input */}
          <input 
            id="location-filter"
            type="text"
            className="filter-select"
            placeholder="📍 Enter city, state, or Remote..."
            style={{ backgroundImage: 'none', paddingRight: '1rem' }}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          {/* Job Type dropdown */}
          <select 
            id="job-type-filter"
            className="filter-select"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="">💼 All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
            <option value="Internship">Internship</option>
          </select>

          {/* Experience level dropdown */}
          <select 
            id="experience-level-filter"
            className="filter-select"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">🎓 All Experience Levels</option>
            <option value="Entry-level">Entry-level</option>
            <option value="Mid-level">Mid-level</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead</option>
          </select>
        </div>
      </section>

      {/* Job Listings Area */}
      <section>
        <div className="listings-header">
          <span className="listings-count">
            {loading ? "Searching roles..." : `${jobs.length} jobs found`}
          </span>
          {isFiltered && (
            <button 
              id="clear-filters-btn"
              className="clear-filters-btn" 
              onClick={clearFilters}
            >
              Clear all filters
            </button>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ 
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '3px solid rgba(255,255,255,0.1)',
              borderTopColor: 'var(--accent-primary)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Searching database listings...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="empty-state" id="empty-state-card">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔎</div>
            <h3 className="empty-title">No jobs found matching filters</h3>
            <p className="empty-desc">Try clearing filters or search queries to explore all available postings on our network.</p>
          </div>
        ) : (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <div 
                key={job.id} 
                className="job-card"
                onClick={() => onSelectJob(job)}
                id={`job-card-${job.id}`}
              >
                <div className="job-card-main">
                  <div className="company-logo-wrapper">
                    {job.companyLogo ? (
                      <img src={job.companyLogo} alt={job.companyName} className="company-logo-img" />
                    ) : (
                      <span className="company-logo-fallback">{job.companyName[0]}</span>
                    )}
                  </div>
                  <div className="job-details-brief">
                    <h3 className="job-title">{job.title}</h3>
                    <div className="company-info">
                      <span className="company-name">{job.companyName}</span>
                      <span className="location-badge">📍 {job.location}</span>
                    </div>
                    <div className="tag-row">
                      <span className={`badge badge-type-${job.jobType.toLowerCase().replace('-', '')}`}>
                        {job.jobType}
                      </span>
                      {job.experienceLevel && (
                        <span className="badge badge-level">{job.experienceLevel}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="job-card-meta">
                  <span className="salary-tag">{job.salaryRange || "DOE"}</span>
                  <span className="posted-date">{getRelativeTime(job.postedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default JobBoard;
