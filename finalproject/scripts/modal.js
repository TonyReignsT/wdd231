// scripts/modal.js
export function initModal() {
  const modal = document.querySelector("#about");
  const openModal = document.querySelector(".open-button");
  const closeModal = document.querySelector(".close-button");

  openModal.addEventListener("click", () => modal.showModal());
  closeModal.addEventListener("click", () => modal.close());
}
