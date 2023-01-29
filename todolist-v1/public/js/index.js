const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btncloseModal = document.querySelector(".close-modal");
const showModal = document.querySelector(".show-modal");

// gestion du modal
showModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
});

const closeModal = (e) => {
    e.preventDefault();
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

btncloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);
