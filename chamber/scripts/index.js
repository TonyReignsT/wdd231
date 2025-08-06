// Elements
const currentWeather = document.querySelector(".current-weather");
const forecastContainer = document.querySelector(".forecast");

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
