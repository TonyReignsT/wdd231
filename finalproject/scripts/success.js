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
