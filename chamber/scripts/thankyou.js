// Get all form data from the URL
const details = new URLSearchParams(window.location.search);

// Build the results HTML
let resultsHTML = `
    <h4>${details.get("firstName") || ""} ${details.get("lastName") || ""}</h4>
    <p><b>Email: </b> ${details.get("email") || ""}</p>
    <p><b>Phone: </b> ${details.get("phone") || ""}</p>
    <p><b>Organization Title: </b> ${details.get("orgTitle") || ""}</p>
    <p><b>Business Name: </b> ${details.get("businessName") || ""}</p>
    <p><b>Membership Level: </b> ${details.get("membershipLevel") || ""}</p>
    <p><b>Description: </b> ${details.get("description") || ""}</p>
    <p><b>Submitted At: </b> ${details.get("timestamp") || ""}</p>
  `;

// Display inside the results div
document.querySelector("#results").innerHTML = resultsHTML;
