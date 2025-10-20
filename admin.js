
// Simple admin credentials (for demo only)
const ADMIN_USERNAME = "nimbe";
const ADMIN_PASSWORD = "youth";

// Tab switching for jobs/registrations

const showJobsBtn = document.getElementById("showJobsBtn");
const showAppsBtn = document.getElementById("showAppsBtn");
const showRegsBtn = document.getElementById("showRegsBtn");
const jobsPanel = document.getElementById("jobsPanel");
const applicationsPanel = document.getElementById("applicationsPanel");
const registrationsPanel = document.getElementById("registrationsPanel");
if (showJobsBtn && showAppsBtn && showRegsBtn && jobsPanel && applicationsPanel && registrationsPanel) {
  showJobsBtn.onclick = () => {
    jobsPanel.style.display = "block";
    applicationsPanel.style.display = "none";
    registrationsPanel.style.display = "none";
    renderAllJobs();
  };
  showAppsBtn.onclick = () => {
    jobsPanel.style.display = "none";
    applicationsPanel.style.display = "block";
    registrationsPanel.style.display = "none";
    if (window.renderApplications) window.renderApplications();
  };
  showRegsBtn.onclick = () => {
    jobsPanel.style.display = "none";
    applicationsPanel.style.display = "none";
    registrationsPanel.style.display = "block";
    if (window.renderRegistrations) window.renderRegistrations();
  };
}

// Render all jobs (approved and unapproved) with remove and approve buttons
function renderAllJobs() {
  const JOBS_KEY = "Bassambiri_jobs";
  const allJobList = document.getElementById("allJobList");
  let jobs = JSON.parse(localStorage.getItem(JOBS_KEY)) || [];
  allJobList.innerHTML = "";
  if (jobs.length === 0) {
    allJobList.innerHTML = "<li>No jobs available.</li>";
    return;
  }
  jobs.forEach(job => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${job.title}</strong> <span style='color:${job.verified ? "green" : "orange"}; font-weight:bold;'>[${job.verified ? "Verified" : "Unverified"}]</span><br>
      <span style='color:#38b2ac;'>${job.company}</span> • <em>${job.location}</em> • <span>${job.type}</span><br>
      <p><strong>Description:</strong> ${job.description}</p>
      ${!job.verified ? `<button class="approve-job-btn" data-id="${job.id}" style="background:#38a169;color:#fff;border:none;padding:4px 10px;border-radius:4px;">Approve</button>` : ''}
      <button class="remove-job-btn" data-id="${job.id}" style="background:#e53e3e;color:#fff;border:none;padding:4px 10px;border-radius:4px;">Remove</button>
    `;
    allJobList.appendChild(li);
  });
  // Add event listeners
  document.querySelectorAll(".approve-job-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const jobId = this.getAttribute("data-id");
      let jobs = JSON.parse(localStorage.getItem(JOBS_KEY)) || [];
      jobs = jobs.map(j => j.id == jobId ? { ...j, verified: true } : j);
      localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
      renderAllJobs();
    });
  });
  document.querySelectorAll(".remove-job-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const jobId = this.getAttribute("data-id");
      let jobs = JSON.parse(localStorage.getItem(JOBS_KEY)) || [];
      jobs = jobs.filter(j => j.id != jobId);
      localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
      renderAllJobs();
    });
  });
}

// Load registration rendering logic
const regScript = document.createElement('script');
regScript.src = 'admin-registrations.js';
document.body.appendChild(regScript);
// Load applications rendering logic
const appScript = document.createElement('script');
appScript.src = 'admin-applications.js';
document.body.appendChild(appScript);

// Render jobs on load
if (jobsPanel) renderAllJobs();

const adminLoginForm = document.getElementById("adminLoginForm");
const adminLoginSection = document.getElementById("adminLoginSection");
const adminDashboard = document.getElementById("adminDashboard");
const adminLoginError = document.getElementById("adminLoginError");
const pendingJobList = document.getElementById("pendingJobList");

// Key for jobs in localStorage
const JOBS_KEY = "Bassambiri_jobs";

adminLoginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("adminUsername").value;
  const password = document.getElementById("adminPassword").value;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    adminLoginSection.style.display = "none";
    adminDashboard.style.display = "block";
    loadPendingJobs();
  } else {
    adminLoginError.style.display = "block";
  }
});

function loadPendingJobs() {
  let jobs = JSON.parse(localStorage.getItem(JOBS_KEY)) || [];
  // Only show jobs that are not verified
  jobs = jobs.filter(job => !job.verified);
  pendingJobList.innerHTML = "";
  if (jobs.length === 0) {
    pendingJobList.innerHTML = "<li>No pending jobs for approval.</li>";
    return;
  }
  jobs.forEach(job => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${job.title}</strong> at <span style='color:#38b2ac;'>${job.company}</span><br>
      <em>${job.location}</em> • <span>${job.type}</span><br>
      <p><strong>Description:</strong> ${job.description}</p>
      <button class="approve-job-btn" data-id="${job.id}" style="background:#38a169;color:#fff;border:none;padding:4px 10px;border-radius:4px;">Approve</button>
      <button class="remove-job-btn" data-id="${job.id}" style="background:#e53e3e;color:#fff;border:none;padding:4px 10px;border-radius:4px;">Remove</button>
    `;
    pendingJobList.appendChild(li);
  });
  // Add event listeners
  document.querySelectorAll(".approve-job-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const jobId = this.getAttribute("data-id");
      let jobs = JSON.parse(localStorage.getItem(JOBS_KEY)) || [];
      jobs = jobs.map(j => j.id == jobId ? { ...j, verified: true } : j);
      localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
      loadPendingJobs();
    });
  });
  document.querySelectorAll(".remove-job-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const jobId = this.getAttribute("data-id");
      let jobs = JSON.parse(localStorage.getItem(JOBS_KEY)) || [];
      jobs = jobs.filter(j => j.id != jobId);
      localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
      loadPendingJobs();
    });
  });
}
