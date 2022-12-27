const drumButtons = document.querySelectorAll(".drum");

function handleClick(key) {
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

drumButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        handleClick(e.target.textContent);
    });
    document.addEventListener("keydown", (e) => {
        e.key === button.textContent && handleClick(e.key);
    });
});
l;
