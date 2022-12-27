const drumButtons = document.querySelectorAll(".drum");

function handleClick(key) {
    alert(`${key.toUpperCase()} got clicked!`);
}

drumButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        handleClick(e.target.textContent);
    });
});
