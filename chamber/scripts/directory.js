const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const cards = document.querySelector("#cards");
const gridViewBtn = document.querySelector("#grid-view");
const listViewBtn = document.querySelector("#list-view");
// Weather Section 
const currentWeather = document.querySelector('.current-weather');
const forecast = document.querySelector('.forecast');

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


// View toggle functionality
gridViewBtn.addEventListener("click", () => {
  cards.classList.remove("list-view");
  gridViewBtn.classList.add("active");
  listViewBtn.classList.remove("active");

  // Update all cards
  document.querySelectorAll(".company-card").forEach((card) => {
    card.classList.remove("list-view");
    card.querySelector(".card-content").classList.remove("list-view");
  });
});

listViewBtn.addEventListener("click", () => {
  cards.classList.add("list-view");
  listViewBtn.classList.add("active");
  gridViewBtn.classList.remove("active");

  // Update all cards
  document.querySelectorAll(".company-card").forEach((card) => {
    card.classList.add("list-view");
    card.querySelector(".card-content").classList.add("list-view");
  });
});

//Company Section
const getCompanyData = async () => {
  try {
    const companies = await fetch("./data/members.json");
    const companiesData = await companies.json();
    // console.log(companiesData)
    displayCard(companiesData.companies);
  } catch (error) {
    console.error("An error occured: ", error);
  }
};

// Building the Card
const displayCard = (companies) => {
  cards.innerHTML = ""; // Clear existing cards

  companies.forEach((company) => {
    let card = document.createElement("div");
    let cardContent = document.createElement("div");
    let contactInfo = document.createElement("div");
    let name = document.createElement("h3");
    let tagLine = document.createElement("p");
    let image = document.createElement("img");
    let email = document.createElement("p");
    let phone = document.createElement("p");
    let url = document.createElement("p");

    // Card attributes
    card.classList.add("company-card");
    cardContent.classList.add("card-content");
    contactInfo.classList.add("contact-info");
    tagLine.classList.add("tagline");

    name.textContent = company.name;
    tagLine.textContent = company.tagline;
    email.innerHTML = `<b>Email: </b> ${company.email}`;
    phone.innerHTML = `<b>Phone: </b> ${company.phone}`;
    url.innerHTML = `<b>URL: </b> ${company.website}`;

    //Creating image
    image.setAttribute("src", company.image);
    image.setAttribute("alt", `${company.name} logo`);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", "340");
    image.setAttribute("height", "440");

    card.appendChild(name);
    card.appendChild(tagLine);
    cardContent.appendChild(image);
    contactInfo.appendChild(email);
    contactInfo.appendChild(phone);
    contactInfo.appendChild(url);

    cardContent.appendChild(contactInfo);
    card.appendChild(cardContent);

    cards.appendChild(card);
  });
};

// Initializing the page 
getCompanyData();

// Home Page weather section
//const apiKey = config.apiKey; //Get from config.js
const apiKey = "92fabe08cde5b767105539f92f7b6eb8";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=16.77&lon=-3.01&appid=${apiKey}&units=metric`;

const displayResults = (data) => {
  let icon = document.createElement("img");
  let currentTemp = document.createElement("p");
  let description = document.createElement("p");

  //Creating the image
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
  );
  icon.setAttribute("alt", `${data.weather[0].description}`);

  currentTemp.textContent = `Current Temperature: ${data.main.temp}°C`;
  description.textContent = `Description: ${data.weather[0].description}`;

  currentWeather.appendChild(icon);
  currentWeather.appendChild(currentTemp);
  currentWeather.appendChild(description);
};

const apiFetch = async () => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      displayResults(data);
    } else {
      throw new Error(await response.text())
    }
  } catch (error) {
    console.error("Error fetching data: ", error)
  }
};

apiFetch();



// Set current year and last modified date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById(
  "lastModified"
).textContent = `Last modified: ${document.lastModified}`;
