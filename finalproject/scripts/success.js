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

// Get all form data from the URL
const details = new URLSearchParams(window.location.search);

// Build the results HTML
let resultsHTML = `
    <h4>${details.get("fullName") || ""}</h4>
    <p><b>Email: </b> ${details.get("email") || ""}</p>
    <p><b>Subject: </b> ${details.get("subject") || ""}</p>
    <p><b>Message: </b> ${details.get("message") || ""}</p>
  `;

// Display inside the results div
document.querySelector("#results").innerHTML = resultsHTML;
