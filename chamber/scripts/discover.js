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
// Discover Page Data and Functionality
// ======================

// ======================
// Visitor Tracking with localStorage
// ======================
function trackVisitor() {
  const now = Date.now();
  const lastVisit = localStorage.getItem("lastVisit");
  const messageElement = document.getElementById("visitor-message");

  if (!lastVisit) {
    // First visit
    messageElement.textContent =
      "Welcome! Let us know if you have any questions.";
  } else {
    const lastVisitDate = new Date(parseInt(lastVisit));
    const currentDate = new Date(now);
    const timeDifference = now - parseInt(lastVisit);
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (timeDifference < 24 * 60 * 60 * 1000) {
      // Less than a day
      messageElement.textContent = "Back so soon! Awesome!";
    } else {
      // More than a day
      const dayText = daysDifference === 1 ? "day" : "days";
      messageElement.textContent = `You last visited ${daysDifference} ${dayText} ago.`;
    }
  }

  // Store current visit
  localStorage.setItem("lastVisit", now.toString());
}

// ======================
// Load Data from JSON
// ======================
async function loadDiscoverData() {
  try {
    const response = await fetch("./data/dataItems.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error loading discover data:", error);
    // Return empty array if there's an error
    return [];
  }
}

// ======================
// Populate Discover Cards
// ======================
function createDiscoverCard(place) {
  const imageElement = place.image
    ? `<img src="${place.image}" alt="${place.name}" loading="lazy">`
    : '<div style="width: 100%; height: 200px; background-color: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #666; font-style: italic; border-radius: 8px;">Image coming soon</div>';

  return `
    <div class="discover-card">
      <h2>${place.name}</h2>
      <figure>
        ${imageElement}
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button onclick="alert('Learn more about ${place.name.replace(
        /'/g,
        "\\'"
      )}')">Learn More</button>
    </div>
  `;
}

async function populateDiscoverGrid() {
  const gridElement = document.getElementById("discover-grid");

  // Show loading message
  gridElement.innerHTML =
    '<p style="text-align: center; grid-column: 1 / -1; color: #386641; font-size: 1.2rem;">Loading discover locations...</p>';

  try {
    const discoverData = await loadDiscoverData();

    if (discoverData.length === 0) {
      gridElement.innerHTML =
        '<p style="text-align: center; grid-column: 1 / -1; color: #386641; font-size: 1.2rem;">No locations available at this time.</p>';
      return;
    }

    const cardsHTML = discoverData
      .map((place) => createDiscoverCard(place))
      .join("");
    gridElement.innerHTML = cardsHTML;
  } catch (error) {
    console.error("Error populating discover grid:", error);
    gridElement.innerHTML =
      '<p style="text-align: center; grid-column: 1 / -1; color: #d32f2f; font-size: 1.2rem;">Error loading locations. Please try again later.</p>';
  }
}

// ======================
// Initialize Page
// ======================
document.addEventListener("DOMContentLoaded", function () {
  trackVisitor();
  populateDiscoverGrid();
});
