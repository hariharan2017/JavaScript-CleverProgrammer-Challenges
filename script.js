//Challenge 1
function calAge() {
    var birthyear = prompt("Enter your year of birth");
    var ageDays = (2021 - birthyear) * 365;

    var h4 = document.createElement("h4");
    var div = document.createElement("div");
    var ans = document.createTextNode("Your are " + ageDays + " days old!!");

    h4.setAttribute("id", "ageText");
    h4.appendChild(ans);
    div.appendChild(h4);
    document.getElementById("container-1").appendChild(div);
}

function reset1() {
    document.getElementById("ageText").remove();
}



//Challenge 2
function makeCat() {
    if (document.getElementById("flex-box-cat") == null) {
        var div = document.createElement("div");
        div.setAttribute("class", "flex-box-cat");
        div.setAttribute("id", "flex-box-cat");
        document.getElementById("container-2").appendChild(div);
    }

    var img = document.createElement("img");
    img.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";

    document.getElementById("flex-box-cat").appendChild(img);
}

function reset2() {
    document.getElementById("flex-box-cat").remove();
}



//Challenge 4
var btns = document.getElementsByTagName("button");

var btnCopy = []
for (let i = 0; i < btns.length; i++) {
    btnCopy.push(btns[i].classList[1]);
}

console.log(btnCopy);

function colorChange(colorOption) {
    switch (colorOption.value) {
        case "red":
            for (let i = 0; i < btns.length; i++) {
                btns[i].classList.remove(btns[i].classList[1]);
                btns[i].classList.add("btn-danger");
            }
            break;
        case "yellow":
            for (let i = 0; i < btns.length; i++) {
                btns[i].classList.remove(btns[i].classList[1]);
                btns[i].classList.add("btn-warning");
            }
            break;
        case "green":
            for (let i = 0; i < btns.length; i++) {
                btns[i].classList.remove(btns[i].classList[1]);
                btns[i].classList.add("btn-success");
            }
            break;
        case "reset":
            for (let i = 0; i < btns.length; i++) {
                btns[i].classList.remove(btns[i].classList[1]);
                btns[i].classList.add(btnCopy[i]);
            }   
            break;
        case "random":
            var colorList = ["btn-primary", "btn-success", "btn-warning", "btn-danger"];
            for (let i = 0; i < btns.length; i++) {
                btns[i].classList.remove(btns[i].classList[1]);
                var randNum = Math.floor(Math.random() * 4)
                btns[i].classList.add(colorList[randNum]);
            }
            break;
        default: console.log("Unknown option");
    }
}



//Challenge 5
var blackjack = {
    "player": {"div": "player-box", "score-box": "#playerScore", "score": 0},
    "dealer": {"div": "dealer-box", "score-box": "#dealerScore", "score": 0},
    "cards": ["2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k", "a"],
    "cardMap": {"2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "j": 10, "q": 10, "k": 10, "a": [1,11]},
    "wins": 0,
    "losses": 0,
    "draws": 0,
}

document.querySelector("#hit-btn").addEventListener("click", hitCard);
document.querySelector("#stand-btn").addEventListener("click", standCard);
document.querySelector("#deal-btn").addEventListener("click", dealCard);

const cardSound = new Audio("./sounds/swish.m4a");
const winSound = new Audio("./sounds/cash.mp3");
const lossSound = new Audio("./sounds/aww.mp3");

function hitCard() {
    addCard(blackjack["player"]);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function standCard() {
    while(blackjack["dealer"]["score"] <= 15) {
        addCard(blackjack["dealer"]);
        await sleep(1000);
    }
}

function addCard(activePlayer) {
    var img = document.createElement("img");
    randomCard = blackjack["cards"][Math.floor(Math.random() * 13)];
    
    if(randomCard === "a"){
        if(activePlayer["score"] + blackjack["cardMap"]["a"][1] <= 21){
            activePlayer["score"] += blackjack["cardMap"]["a"][1];
        } else{
            activePlayer["score"] += blackjack["cardMap"]["a"][0];
        }
    } else {
        activePlayer["score"] += blackjack["cardMap"][randomCard];
    }

    if(activePlayer["score"] <=21) {
        document.querySelector(activePlayer["score-box"]).textContent = activePlayer["score"];
    } else {
        document.querySelector(activePlayer["score-box"]).textContent = "Bust!!";
    }

    img.src = `C:/Users/HP/Documents/VS Code/JavaScript Crash Course/Practice/images/${randomCard}.png`;
    img.setAttribute("height", "150px");
    img.setAttribute("widht", "120px")
    document.getElementById(activePlayer["div"]).appendChild(img);
    cardSound.play();
}

function dealCard() {
    showWinner();

    var playerImages = document.querySelector("#player-box").querySelectorAll("img");
    var dealerImages = document.querySelector("#dealer-box").querySelectorAll("img");

    for(let i=0; i<playerImages.length; i++){
        playerImages[i].remove();
    }

    for(let i=0; i<dealerImages.length; i++){
        dealerImages[i].remove();
    }

    blackjack["player"]["score"] = 0;
    blackjack["dealer"]["score"] = 0;

    document.querySelector("#playerScore").textContent = 0;
    document.querySelector("#dealerScore").textContent = 0;
}

function computeWinner() {
    var playerScore = blackjack["player"]["score"];
    var dealerScore = blackjack["dealer"]["score"];
    var winner;

    if(playerScore <= 21) {
        if((playerScore>dealerScore) || (dealerScore>21)) {
            winner = "player";
        } else if(playerScore<dealerScore) {
            winner = "dealer";  
        } else if(playerScore === dealerScore) {
            winner = "draw";
        } 
    } else if(playerScore>21 && dealerScore<=21) {
        winner = "dealer";
    } else if(playerScore>21 && dealerScore>21) {
        winner = "draw";
    }
    return winner;
}

async function showWinner() {
    var winner = computeWinner();
    if(winner === "player"){
        winSound.play();
        blackjack["wins"]++;
        document.querySelector("#playerWins").textContent = blackjack["wins"];
        document.querySelector("#resultText").textContent = "You win!";
        document.querySelector("#resultText").style.color = "green";
    } else if (winner === "dealer") {
        lossSound.play();
        blackjack["losses"]++;
        document.querySelector("#playerLosses").textContent = blackjack["losses"];
        document.querySelector("#resultText").textContent = "You lose!";
        document.querySelector("#resultText").style.color = "red";
    } else {
        blackjack["draws"]++;
        document.querySelector("#playerDraws").textContent = blackjack["draws"];
        document.querySelector("#resultText").textContent = "It's a draw";
        document.querySelector("#resultText").style.color = "grey";
    }

    await sleep(1500);
    document.querySelector("#resultText").textContent = "Let's Play!";
    document.querySelector("#resultText").style.color = "black";
}