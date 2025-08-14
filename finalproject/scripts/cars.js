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
// Featured Cars
// ======================
const featured = document.querySelector(".featured-cars");

// Displaying Cars Data
const displayCard = (cars) => {
  cars.innerHTML = "";

  cars.forEach((car) => {
    let cardContent = document.createElement("div");
    let image = document.createElement("img");
    let brand = document.createElement("p");
    let desc = document.createElement("p");
    let price = document.createElement("p");

    // Attributes
    price.classList.add("price");
    cardContent.classList.add("card-items");

    brand.textContent = `- ${car.brand} ${car.name} ${car.year}`;
    desc.textContent = `- ${car.description}`;
    price.textContent = `$ ${car.price}`;

    // Creating Image
    image.setAttribute("src", car.image);
    image.setAttribute("alt", `${car.name} logo`);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", "100%");
    image.setAttribute("height", "200");

    // Appending
    cardContent.appendChild(image);
    cardContent.appendChild(brand);
    cardContent.appendChild(desc);
    cardContent.appendChild(price);

    featured.appendChild(cardContent);
  });
};

// Fetching the cars data
const getCarsData = async () => {
  try {
    const cars = await fetch("./data/vehicles.json");
    const carsData = await cars.json();
    // console.log(carsData);
    displayCard(carsData);
  } catch (error) {
    console.error("An error occured!", error);
  }
};

getCarsData();
