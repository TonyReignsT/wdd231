// ======================
// Navigation
// ======================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close navigation when any nav link is clicked
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// ======================
// Footer Dates
// ======================
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById(
  "lastModified"
).textContent = `Last Modified: ${document.lastModified}`;

// ======================
// Form Timestamp
// ======================
document.getElementById("timestamp").value = new Date().toISOString();

// ======================

// NP Modal
const npModal = document.getElementById("npModal");
document.getElementById("openNP").addEventListener("click", () => {
  npModal.showModal();
});
document.getElementById("closeNP").addEventListener("click", () => {
  npModal.close();
});

// Bronze Modal
const bronzeModal = document.getElementById("bronzeModal");
document.getElementById("openBronze").addEventListener("click", () => {
  bronzeModal.showModal();
});
document.getElementById("closeBronze").addEventListener("click", () => {
  bronzeModal.close();
});

// Silver Modal
const silverModal = document.getElementById("silverModal");
document.getElementById("openSilver").addEventListener("click", () => {
  silverModal.showModal();
});
document.getElementById("closeSilver").addEventListener("click", () => {
  silverModal.close();
});

// Gold Modal
const goldModal = document.getElementById("goldModal");
document.getElementById("openGold").addEventListener("click", () => {
  goldModal.showModal();
});
document.getElementById("closeGold").addEventListener("click", () => {
  goldModal.close();
});


// ======================
// Organizational Title Validation
// ======================
document
  .getElementById("membershipForm")
  .addEventListener("submit", function (e) {
    const orgTitle = document.getElementById("orgTitle").value.trim();
    if (orgTitle.length > 0) {
      const pattern = /^[A-Za-z\s\-]{7,}$/;
      if (!pattern.test(orgTitle)) {
        alert(
          "Organizational title must contain only letters, spaces, and hyphens, with a minimum of 7 characters."
        );
        e.preventDefault();
        return false;
      }
    }
  });
