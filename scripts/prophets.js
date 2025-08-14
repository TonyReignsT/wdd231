// JSON 
const url =
    "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";
  
const cards = document.querySelector('#cards');

const getProphetData = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json(); //Converting to javascript object strings
        // console.table(data); 
        // console.log(data)
        displayProphets(data.prophets); 
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

const displayProphets = (prophets) => {
    //Building the card here
    prophets.forEach(prophet => {
        let card = document.createElement("section");
        let fullName = document.createElement("h2");
        let dob = document.createElement("p");  // date of birth
        let pob = document.createElement("p") // place of birth
        let portrait = document.createElement("img");

        //Building h2 and p elements
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        dob.innerHTML = `<b>Date of Birth: </b>${prophet.birthdate}`;
        pob.innerHTML = `<b>Place of Birth: </b>${prophet.birthplace}`;

        //Building the Image
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Appending the section (card) with the created elements
        card.appendChild(fullName);
        card.appendChild(dob);
        card.appendChild(pob)
        card.appendChild(portrait);

        cards.appendChild(card);
    });
}

getProphetData()