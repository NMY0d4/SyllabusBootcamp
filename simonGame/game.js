const buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
let level = 0;
let gameStart = false;

// read songs
const playAudio = (song) => {
    const audio = new Audio(`/sounds/${song}.mp3`);
    audio.play();
};

// Animation click
const animatePress = (currentColour) => {
    $(`.${currentColour}`).addClass("pressed");
    setTimeout(() => {
        $(`.${currentColour}`).removeClass("pressed");
    }, 100);
};

//  play runtime
const nextSequence = () => {
    const colorNbr = Math.floor(Math.random() * 4);
    $("h1").text(`level ${level}`);

    let randomChosenColour = buttonColours[colorNbr];

    gamePattern.push(randomChosenColour);

    gamePattern.forEach((color, i) => {
        setTimeout(() => {
            $(`#${color}`).fadeIn(100).fadeOut(100).fadeIn(100);
            playAudio(color);
        }, i * 400);
    });

    $(".btn").on("click", function (e) {
        const userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);
        playAudio(userChosenColour);
        if (gamePattern.length === userClickedPattern.length) {
            $(".btn").off("click");
            if (gamePattern.every((el, i) => userClickedPattern[i] === el)) {
                level++;
                setTimeout(nextSequence, 1000);
                userClickedPattern = [];
            } else {
                // gameOver
                playAudio("wrong");
                $("h1").text(`Perdu au level ${level}, dommage 😭`);
                $("body").addClass("game-over");

                setTimeout(() => {
                    $("body").removeClass("game-over");
                    gameStart = false;
                    userClickedPattern = [];
                    level = 0;
                    gamePattern = [];
                    $("h1").text(`Press A Key to Start`);
                }, 3000);
            }
        }
    });
};

const playGame = () => {
    $("h1").text(`level ${level}`);
    setTimeout(nextSequence, 1000);
};

$(this).keypress((e) => {
    if (e.key === "a" && gameStart === false) {
        playGame();
        gameStart = true;
    }
});
