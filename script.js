document.addEventListener("DOMContentLoaded", () => {
  // Registration Form Handling
  const form = document.getElementById("registrationForm");
  const successMessage = document.getElementById("successMessage");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
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
      { title: "ICT Center Assistant", company: "Nembe ICT Hub", location: "Bassambiri" },
      { title: "Web Developer Intern", company: "Ibrahim Nigerian Ltd", location: "Bayelsa" },
      { title: "Community Reporter", company: "Nembe Media", location: "Remote" }
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
});