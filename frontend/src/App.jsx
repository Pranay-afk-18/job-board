import React, { useState, useEffect } from 'react';
import JobBoard from './components/JobBoard';
import JobForm from './components/JobForm';

const API_BASE = "http://localhost:8081/api/jobs";

// Mock Fallback Data in case the backend is loading or unavailable
const MOCK_JOBS = [
  {
    id: 1,
    title: "Senior Full-Stack Engineer",
    companyName: "TechNova Solutions",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop",
    location: "San Francisco, CA (Hybrid)",
    jobType: "Full-time",
    experienceLevel: "Senior",
    salaryRange: "$140,000 - $180,000",
    description: "We are looking for a Senior Full-Stack Engineer to lead the design and execution of our core software solutions. You will work closely with product managers and visual designers to build scalable features and mentor junior developers.",
    requirements: "Minimum 5 years experience with React and Java Spring Boot; Proficient in SQL database tuning; Experience with cloud deployments (AWS/GCP); Strong systems communication and mentoring background.",
    contactEmail: "careers@technova.io",
    postedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(), // 2 days ago
    active: true
  },
  {
    id: 2,
    title: "Backend Engineer (Spring Boot)",
    companyName: "ByteStream Systems",
    companyLogo: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=100&h=100&fit=crop",
    location: "Austin, TX (On-site)",
    jobType: "Full-time",
    experienceLevel: "Mid-level",
    salaryRange: "$110,000 - $140,000",
    description: "Join our backend engineering crew responsible for processing microservice interactions and optimizing transaction speeds. You will design, build, and deploy critical payment systems.",
    requirements: "3+ years experience in Java and Spring Boot; Solid database foundation in MySQL or Postgres; Familiarity with Docker and Kubernetes; Experience writing secure REST APIs.",
    contactEmail: "jobs@bytestream.com",
    postedAt: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
    active: true
  },
  {
    id: 3,
    title: "Frontend Developer (React)",
    companyName: "PixelCraft Agency",
    companyLogo: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=100&h=100&fit=crop",
    location: "Remote",
    jobType: "Full-time",
    experienceLevel: "Mid-level",
    salaryRange: "$95,000 - $125,000",
    description: "PixelCraft is a visual-first creative agency building next-gen web applications. We need a frontend wizard who loves crafting beautiful React interfaces with smooth animations, high accessibility standards, and clean state management.",
    requirements: "Proficient with modern React, Hooks, Context API; Strong Vanilla CSS, CSS Grid/Flexbox, and keyframe animations; Experience with responsive design; Solid JavaScript and TypeScript skills.",
    contactEmail: "talent@pixelcraft.agency",
    postedAt: new Date().toISOString(),
    active: true
  }
];

const MOCK_STATS = {
  totalJobs: 3,
  activeCount: 3,
  remoteCount: 1,
  avgSalary: "$128,000"
};

function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' | 'post-job'
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState(MOCK_STATS);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Search & Filter State
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [level, setLevel] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Build query params
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (location) params.append("location", location);
      if (jobType) params.append("jobType", jobType);
      if (level) params.append("level", level);

      const url = `${API_BASE}?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Backend response error");
      const data = await response.json();
      setJobs(data);
      setUsingMock(false);
    } catch (err) {
      console.warn("Could not fetch jobs from Spring Boot API. Falling back to local mock data.", err);
      // Filter mock jobs locally
      let filtered = MOCK_JOBS.filter(job => {
        const matchesSearch = !search || 
          job.title.toLowerCase().includes(search.toLowerCase()) || 
          job.companyName.toLowerCase().includes(search.toLowerCase()) ||
          job.description.toLowerCase().includes(search.toLowerCase());
        const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
        const matchesType = !jobType || job.jobType === jobType;
        const matchesLevel = !level || job.experienceLevel === level;
        return matchesSearch && matchesLocation && matchesType && matchesLevel;
      });
      setJobs(filtered);
      setUsingMock(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/stats`);
      if (!response.ok) throw new Error("Backend stats error");
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.warn("Could not fetch stats. Using fallback stats calculation.");
      // Compute stats locally from mock data
      const remoteCount = MOCK_JOBS.filter(j => j.location.toLowerCase().includes("remote")).length;
      setStats({
        totalJobs: MOCK_JOBS.length,
        activeCount: MOCK_JOBS.filter(j => j.active).length,
        remoteCount: remoteCount,
        avgSalary: "$128,000"
      });
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, [search, location, jobType, level]);

  const handlePostJob = async (jobData) => {
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });
      if (!response.ok) throw new Error("Failed to post job");
      
      // Refresh listings
      fetchJobs();
      fetchStats();
      setCurrentView('dashboard');
      alert("Job posted successfully!");
    } catch (err) {
      console.error("Failed to post job to backend. Emulating posting locally in mock data.", err);
      const newJob = {
        id: Date.now(),
        ...jobData,
        postedAt: new Date().toISOString(),
        active: true
      };
      MOCK_JOBS.unshift(newJob);
      fetchJobs();
      fetchStats();
      setCurrentView('dashboard');
      alert("Job simulated successfully (using local storage mock)!");
    }
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setJobType("");
    setLevel("");
  };

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <header className="navbar">
        <a className="logo-container" onClick={() => { setCurrentView('dashboard'); clearFilters(); }}>
          <div className="logo-icon">💼</div>
          <span className="logo-text">TalentStream</span>
        </a>
        <nav className="nav-links">
          <button 
            id="nav-find-jobs"
            className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`} 
            onClick={() => setCurrentView('dashboard')}
          >
            Find Jobs
          </button>
          <button 
            id="nav-post-job"
            className="nav-btn-primary" 
            onClick={() => setCurrentView('post-job')}
          >
            Post a Job
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {usingMock && (
          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '2rem',
            textAlign: 'center',
            color: '#f59e0b',
            fontSize: '0.9rem',
            fontWeight: 500
          }}>
            ⚠️ Backend server not reachable. Running application in demo mode with preview mock data.
          </div>
        )}

        {currentView === 'dashboard' ? (
          <JobBoard
            jobs={jobs}
            stats={stats}
            loading={loading}
            search={search}
            setSearch={setSearch}
            location={location}
            setLocation={setLocation}
            jobType={jobType}
            setJobType={setJobType}
            level={level}
            setLevel={setLevel}
            onSelectJob={setSelectedJob}
            clearFilters={clearFilters}
          />
        ) : (
          <JobForm 
            onSubmit={handlePostJob} 
            onCancel={() => setCurrentView('dashboard')} 
          />
        )}
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} TalentStream Inc. Designed for elite developers and visual designers.</p>
      </footer>

      {/* Job Detail Modal Overlay */}
      {selectedJob && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content-panel" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseModal} aria-label="Close details">✕</button>
            
            <div className="detail-header">
              <div className="company-logo-wrapper" style={{ width: '80px', height: '80px' }}>
                {selectedJob.companyLogo ? (
                  <img src={selectedJob.companyLogo} alt={selectedJob.companyName} className="company-logo-img" />
                ) : (
                  <span className="company-logo-fallback">{selectedJob.companyName[0]}</span>
                )}
              </div>
              <div className="detail-title-block">
                <h2 className="detail-title">{selectedJob.title}</h2>
                <div className="company-info">
                  <span className="company-name">{selectedJob.companyName}</span>
                  <span className="location-badge">📍 {selectedJob.location}</span>
                </div>
                <div className="detail-meta-row">
                  <span className={`badge badge-type-${selectedJob.jobType.toLowerCase().replace('-', '')}`}>
                    {selectedJob.jobType}
                  </span>
                  {selectedJob.experienceLevel && (
                    <span className="badge badge-level">{selectedJob.experienceLevel}</span>
                  )}
                  {selectedJob.salaryRange && (
                    <span className="salary-tag">{selectedJob.salaryRange}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="detail-body-section">
              <div>
                <h3 className="detail-section-title">About the Role</h3>
                <p className="detail-text">{selectedJob.description}</p>
              </div>

              {selectedJob.requirements && (
                <div>
                  <h3 className="detail-section-title">Requirements & Qualifications</h3>
                  <div className="detail-list">
                    {selectedJob.requirements.split(';').map((req, i) => {
                      if (!req.trim()) return null;
                      return <div key={i} className="detail-list-item">{req.trim()}</div>;
                    })}
                  </div>
                </div>
              )}

              <div className="apply-card">
                <div className="apply-card-text">
                  <h4 className="apply-card-title">Interested in this role?</h4>
                  <p className="apply-card-desc">Apply directly by sending your resume to the hiring coordinators.</p>
                </div>
                <a href={`mailto:${selectedJob.contactEmail}?subject=Application for ${selectedJob.title}`} className="apply-action-btn">
                  Apply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
