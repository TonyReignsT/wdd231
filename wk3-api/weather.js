const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

const apiKey = config.apiKey; //Get from config.js

const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&appid=${apiKey}&units=metric`;

const displayResults = (data) => {
  currentTemp.textContent = `${data.main.temp} °C`;
  weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherIcon.alt = data.weather[0].description;
  captionDesc.textContent = data.weather[0].description;
};

const apiFetch = async () => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
    //   console.log(data);
      displayResults(data);
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error("Error occured while fetching the data: ", error);
  }
};

apiFetch();
