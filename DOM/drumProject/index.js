const drumButtons = document.querySelectorAll(".drum");

function playSound(key) {
    let sound;
    switch (key) {
        case "d":
            sound = "/sounds/crash.mp3";
            break;
        case "f":
            sound = "/sounds/kick-bass.mp3";
            break;
        case "g":
            sound = "/sounds/snare.mp3";
            break;
        case "h":
            sound = "/sounds/tom-1.mp3";
            break;
        case "j":
            sound = "/sounds/tom-2.mp3";
            break;
        case "k":
            sound = "/sounds/tom-3.mp3";
            break;
        case "l":
            sound = "/sounds/tom-4.mp3";
            break;
        default:
            sound = undefined;
            break;
    }
    audio = sound && new Audio(sound);
    audio.play();
}

const buttonAnimation = (currentKey) => {
    const activeButton = document.querySelector(`.${currentKey}`);

    // 2 crééer l'animation si c'est une touche correspondante
    activeButton.classList.add("pressed");
    setTimeout(() => activeButton.classList.remove("pressed"), 300);
};

drumButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const letter = e.target.textContent;
        playSound(letter);
        buttonAnimation(letter);
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === button.textContent) {
            playSound(e.key);
            buttonAnimation(e.key);
        }
    });
});
