// Navigation
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Weather
const currentWeather = document.querySelector(".current-weather");
const forecastContainer = document.querySelector(".forecast");

// Member Spotlights
const members = document.querySelector("#members");
const cardContent = document.querySelector(".card-content");
// const memberCard = document.querySelector('.member-card');

// Hamburger Menu

// Activating X and the menu

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Closing the navigation bar

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// API setup
const apiKey = config.apiKey; //Get from config.js
const lat = 16.77;
const lon = -3.01;

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

// Helper: choose the forecast per date closest to 12:00
function getThreeDayMiddayForecasts(list) {
  const byDate = {};

  list.forEach((entry) => {
    const [date, time] = entry.dt_txt.split(" ");
    if (!byDate[date]) byDate[date] = [];
    byDate[date].push(entry);
  });

  const dates = Object.keys(byDate).sort().slice(0, 3); // first 3 distinct dates

  return dates.map((date) => {
    const dayEntries = byDate[date];
    const targetHour = 12;
    let best = dayEntries[0];
    let bestDiff = Math.abs(new Date(best.dt_txt).getHours() - targetHour);

    dayEntries.forEach((e) => {
      const hour = new Date(e.dt_txt).getHours();
      const diff = Math.abs(hour - targetHour);
      if (diff < bestDiff) {
        best = e;
        bestDiff = diff;
      }
    });

    return best;
  });
}

// Display current weather
const displayResults = (data) => {
  currentWeather.innerHTML = ""; // clear previous if any

  const icon = document.createElement("img");
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  icon.alt = data.weather[0].description;

  const currentTemp = document.createElement("p");
  currentTemp.textContent = `Current Temperature: ${data.main.temp.toFixed(
    1
  )}°C`;

  const description = document.createElement("p");
  description.textContent = `Description: ${data.weather[0].description}`;

  currentWeather.append(icon, currentTemp, description);
};

// Display 3-day forecast
const displayResults2 = (forecastList) => {
  forecastContainer.innerHTML = ""; // clear previous

  const threeDay = getThreeDayMiddayForecasts(forecastList);

  threeDay.forEach((forecast, idx) => {
    const dateStr = forecast.dt_txt.split(" ")[0];
    const temp = forecast.main.temp.toFixed(1);
    const desc = forecast.weather[0].description;
    const icon = forecast.weather[0].icon;

    const card = document.createElement("div");
    card.className = "forecast-day"; // for future styling

    card.innerHTML = `
      <h3>Day ${idx + 1} <small>(${dateStr})</small></h3>
      <p>${desc}, ${temp}°C</p>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" />
    `;

    forecastContainer.appendChild(card);
  });
};

// Fetch current
const apiFetch = async () => {
  try {
    const res = await fetch(currentUrl);
    if (!res.ok) throw new Error(`Current weather fetch failed: ${res.status}`);
    const data = await res.json();
    displayResults(data);
  } catch (err) {
    console.error("Error fetching current weather:", err);
  }
};

// Fetch forecast
const apiFetch2 = async () => {
  try {
    const res = await fetch(forecastUrl);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Forecast fetch failed: ${res.status} - ${text}`);
    }
    const data = await res.json();
    displayResults2(data.list);
  } catch (err) {
    console.error("Error fetching forecast data:", err);
  }
};

// Kick off both
apiFetch();
apiFetch2();

// Member Spotlight

// Getting the members data
const getMembersData = async () => {
  try {
    const members = await fetch("./data/members.json");
    const membersData = await members.json();
    console.log(membersData);

    // Filter for gold (3) and silver (2) members only
    const goldAndSilverMembers = membersData.companies.filter(
      (company) => company.membership === 1 || company.membership === 2
    );

    // Get 2-3 random members from gold and silver
    const randomMembers = getRandomMembers(goldAndSilverMembers, 3);

    displayMembers(randomMembers);
  } catch (error) {
    console.error("An error occured: ", error);
  }
};

// Function to get random members
const getRandomMembers = (membersArray, count) => {
  // Shuffle the array
  const shuffled = membersArray.sort(() => Math.random() - 0.5);
  // Return first 'count' items
  return shuffled.slice(0, count);
};

// Function to get membership level name
const getMembershipLevel = (level) => {
  if (level === 1) return "Gold";
  if (level === 2) return "Silver";
  return "Bronze";
};

// Displaying the members

const displayMembers = (membersList) => {
  cardContent.innerHTML = "";

    membersList.forEach(member => {
        // Create the member Card 
        let name = document.createElement('h3');
        let logo = document.createElement('img');
        let phone = document.createElement('p');
        let address = document.createElement('p');
        let website = document.createElement('p');
        let level = document.createElement('p');


        // create image 
         logo.setAttribute("src", member.image);
         logo.setAttribute("alt", `${member.name} logo`);
         logo.setAttribute("loading", "lazy");
         logo.setAttribute("width", "100");
         logo.setAttribute("height", "100");

        name.textContent = `${member.name}`;
        phone.innerHTML = `<b>Phone: </b> ${member.phone}`;
        address.innerHTML = `<b>Address: </b> ${member.address}`;
        website.innerHTML = `<b>Website: </b> ${member.website}`;
        level.innerHTML = `<span class='membership-badge'<b>Membership Level: </b> ${getMembershipLevel(
          member.membership
        )} member </span>`;

        cardContent.appendChild(name);
        cardContent.appendChild(logo);
        cardContent.appendChild(phone);
        cardContent.appendChild(address);
        cardContent.appendChild(website);
        cardContent.appendChild(level);

        // cardContent.appendChild(memberCard);
        members.appendChild(cardContent);

    })
};

getMembersData();
