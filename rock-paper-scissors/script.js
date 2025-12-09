let userscore = 0;
let compscore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const usersc = document.querySelector("#user-score");
const compsc = document.querySelector("#comp-score");

const generateCompChoice = (max) => {
    const options = ["rock", "paper", "scissor"];
    let idx = Math.floor(Math.random() * max);
    return options[idx];
};

const showWinner = (userwin, userChoice, compchoice) => {
    if (userwin) {
        msg.innerText = `You Won the Match! Your ${userChoice} beats ${compchoice}`;
        msg.style.backgroundColor = "green";
        userscore++;
        usersc.innerText = userscore;
    }
    else {
        msg.innerText = `You Lost the Match. ${compchoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
        compscore++;
        compsc.innerText = compscore;
    }
};

const Game = (userChoice) => {
    const compchoice = generateCompChoice(3);

    if (userChoice === compchoice) {        // Draw
        msg.style.backgroundColor = "#061A30";
        msg.innerText = "Game was Draw.";
    }
    else {
        let userwin = true;
        if (userChoice === "paper") { // computer possible choices: scissors, rock.
            userwin = compchoice === "scissor" ? false : true;
        }
        else if (userChoice === "rock") { // computer possible choices: paper, scissors.
            userwin = compchoice === "paper" ? false : true;
        }
        else { // user has remaining scissors choice 
            userwin = compchoice === "rock" ? false : true;
        }
        showWinner(userwin, userChoice, compchoice);
    }
};

choices.forEach((val) => {
    val.addEventListener("click", () => {
        const userChoice = val.getAttribute("id");
        Game(userChoice);
    });
});