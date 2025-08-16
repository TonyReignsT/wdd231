// ======================
// Contact Form Module
// ======================

export function initContactForm() {
  const form = document.getElementById("messageForm");
  if (!form) return; // Stop if we're not on contact.html

  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  // Load saved data
  window.addEventListener("DOMContentLoaded", () => {
    fullName.value = localStorage.getItem("fullName") || "";
    email.value = localStorage.getItem("email") || "";
    subject.value = localStorage.getItem("subject") || "";
    message.value = localStorage.getItem("message") || "";
  });

  // Save data while typing
  [fullName, email, subject, message].forEach((field) => {
    field.addEventListener("input", () => {
      localStorage.setItem(field.id, field.value);
    });
  });

  // Clear after submit
  form.addEventListener("submit", () => {
    ["fullName", "email", "subject", "message"].forEach((key) =>
      localStorage.removeItem(key)
    );
  });
}
