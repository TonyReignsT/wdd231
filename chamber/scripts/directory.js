const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const cards = document.querySelector("#cards");

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
  companies.forEach((company) => {
    let card = document.createElement("div");
    let name = document.createElement("h3");
    let tagLine = document.createElement("p");
    let image = document.createElement("img");
    let email = document.createElement("p");
    let phone = document.createElement("p");
    let url = document.createElement("p");

    // Card attribute
    card.classList.add("company-card");

    name.textContent = `${company.name}`;
    tagLine.textContent = `${company.tagline}`;
    email.innerHTML = `<b>Email: </b> ${company.email}`;
    phone.innerHTML = `<b>Phone: </b> ${company.phone}`;
    url.innerHTML = `<b>URL: </b> ${company.website}`;

    //Creating image
    image.setAttribute("src", company.image);
    image.setAttribute("alt", company.name);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", "340");
    image.setAttribute("height", "440");

    card.appendChild(name);
    card.appendChild(tagLine);
    card.appendChild(image);
    card.appendChild(email);
    card.appendChild(phone);
    card.appendChild(url);

    cards.appendChild(card);
  });
};

getCompanyData();
