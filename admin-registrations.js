// Admin Registration Management
const REG_KEY = "Bassambiri_registrations";

function loadRegistrations() {
  return JSON.parse(localStorage.getItem(REG_KEY)) || [];
}

function saveRegistration(reg) {
  const regs = loadRegistrations();
  regs.push(reg);
  localStorage.setItem(REG_KEY, JSON.stringify(regs));
}

// For admin.html: render registrations in dashboard
function renderRegistrations() {
  const regList = document.getElementById("registrationList");
  if (!regList) return;
  const regs = loadRegistrations();
  regList.innerHTML = "";
  if (regs.length === 0) {
    regList.innerHTML = "<li>No registrations yet.</li>";
    return;
  }
  regs.forEach(reg => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${reg.firstName} ${reg.lastName}</strong> (${reg.classSection})<br>
      <span>Email:</span> ${reg.email} <span>Phone:</span> ${reg.phone}<br>
      <span>Address:</span> ${reg.address}<br>
      <span>Occupation:</span> ${reg.occupation} <span>Education:</span> ${reg.education}
    `;
    regList.appendChild(li);
  });
}

// Expose for admin.js
window.renderRegistrations = renderRegistrations;
