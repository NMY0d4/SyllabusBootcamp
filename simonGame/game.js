const NBRCOLOURS = 4;
const buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
const level = 0;

const playAudio = (color) => {
    const audio = new Audio(`/sounds/${color}.mp3`);
    audio.play();
};

const animatePress = (currentColour) => {
    $(`.${currentColour}`).addClass("pressed");
    setTimeout(() => {
        $(`.${currentColour}`).removeClass("pressed");
    }, 100);
};

const nextSequence = (nbr) => {
    const colorNbr = Math.floor(Math.random() * nbr);

    let randomChosenColour = buttonColours[colorNbr];

    gamePattern.push(randomChosenColour);

    gamePattern.forEach((color, i) => {
        setTimeout(() => {
            $(`#${color}`).fadeIn(100).fadeOut(100).fadeIn(100);
            playAudio(color);
        }, i * 400);
    });
};

$(".btn").on("click", function (e) {
    const userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playAudio(userChosenColour);
});

$(this).keypress((e) => {
    e.key === "a" && nextSequence(NBRCOLOURS);
});
