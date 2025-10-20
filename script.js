document.addEventListener("DOMContentLoaded", () => {
  // Registration Form Handling
  const form = document.getElementById("registrationForm");
  const successMessage = document.getElementById("successMessage");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Collect form data
      const reg = {
        classSection: form.classSection.value,
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        phone: form.phone.value,
        address: form.address.value,
        fromBassambiri: form.fromBassambiri.value,
        dob: form.dob.value,
        occupation: form.occupation.value,
        houseName: form.houseName.value,
        hasTitle: form.hasTitle.value,
        titleDetails: form.titleDetails.value,
        education: form.education.value,
        computerExp: form.computerExp.value,
        maritalStatus: form.maritalStatus.value
      };
      // Save to localStorage for admin
      let regs = JSON.parse(localStorage.getItem("Bassambiri_registrations")) || [];
      regs.push(reg);
      localStorage.setItem("Bassambiri_registrations", JSON.stringify(regs));
      if (successMessage) {
        successMessage.classList.remove("hidden");
      }
      form.reset();
    });
  }

  // Job Portal Sample Data
  const jobList = document.getElementById("jobList");
  if (jobList) {
    const jobs = [
      { title: "ICT Center Assistant", company: "Bassambiri ICT Hub", location: "Bassambiri" },
      { title: "Web Developer Intern", company: "Ibrahim Nigerian Ltd", location: "Bayelsa" },
      { title: "Community Reporter", company: "Bassambiri Media", location: "Remote" }
    ];
    jobs.forEach(job => {
      const li = document.createElement("li");
      li.textContent = `${job.title} - ${job.company} (${job.location})`;
      jobList.appendChild(li);
    });
  }

  // Random Video for Hero Background
  const videos = [
    'videos/video1.mp4',
    'videos/video2.mp4',
    'videos/video3.mp4',
    'videos/video4.mp4',
    'videos/video5.mp4',
    'videos/video6.mp4',
    'videos/video7.mp4'
  ];

  function setRandomVideo() {
    const video = document.getElementById('randomVideo');
    if (!video) return;

    const randomIndex = Math.floor(Math.random() * videos.length);
    video.src = videos[randomIndex];
    video.load(); // Ensure the video reloads
    video.play().catch(e => console.log("Video autoplay was prevented:", e));
  }

  setRandomVideo();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      mainNav.classList.toggle('open');
    });

    // close menu on link click (mobile)
    mainNav.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a && window.innerWidth <= 768) {
        navToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('open');
      }
    });
  }
});