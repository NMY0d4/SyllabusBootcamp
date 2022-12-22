const dice1 = document.querySelector(".img1");
const dice2 = document.querySelector(".img2");
const title = document.querySelector("h1");

const rndNumber = (face) => Math.floor(Math.random() * face + 1);
// const rnd2 = Math.floor(Math.random() * 6 + 1);

const res1 = rndNumber(6);
const res2 = rndNumber(6);

dice1.setAttribute("src", `/images/dice${res1}.png`);
dice2.setAttribute("src", `/images/dice${res2}.png`);

if (res1 > res2) title.innerHTML = `🚩 Player 1 Wins!`;
else if (res1 < res2) title.innerHTML = `🚩 Player 2 Wins!`;
else title.innerHTML = `Draw!`;
