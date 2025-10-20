// Admin Job Applications Management
const APPS_KEY = "Bassambiri_job_applications";

function loadApplications() {
  return JSON.parse(localStorage.getItem(APPS_KEY)) || [];
}

// For admin.html: render job applications in dashboard
function renderApplications() {
  const appList = document.getElementById("applicationsList");
  if (!appList) return;
  const apps = loadApplications();
  appList.innerHTML = "";
  if (apps.length === 0) {
    appList.innerHTML = "<li>No job applications yet.</li>";
    return;
  }
  apps.forEach(app => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${app.applicantName}</strong> applied for <span>${app.jobTitle || 'Job'}</span><br>
      <span>Email:</span> ${app.applicantEmail} <span>Phone:</span> ${app.applicantPhone}<br>
      <span>Location:</span> ${app.applicantLocation}<br>
      <span>Experience:</span> ${app.applicantExperience} years<br>
      <span>Age:</span> ${app.applicantAge}<br>
      <span>CV:</span> ${app.applicantCV || 'N/A'}<br>
      <span>Cover Letter:</span> ${app.coverLetter}<br>
      <span>--- All Fields ---</span><br>
      ${Object.entries(app).map(([key, value]) => `<span style='color:#276749;'>${key}:</span> <span style='color:#38a169;'>${value}</span><br>`).join('')}
    `;
    appList.appendChild(li);
  });
}

// Expose for admin.js
window.renderApplications = renderApplications;
