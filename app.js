let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector(".new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // player O starts

const winsPattern = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// Reset Game
const resetGame = () => {
    turnO = true;

    enableBoxes();

    msgContainer.classList.add("hide");
};

// Box click
boxes.forEach((box) => {

    box.addEventListener("click", () => {

        if(turnO){
            box.innerText = "O";
            turnO = false;
        }else{
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;

        checkWinner();
    });
});

// Disable all boxes
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

// Enable all boxes
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

// Show Winner
const showWinner = (winner) => {

    msg.innerText = `Congratulations, Winner is ${winner}`;

    msgContainer.classList.remove("hide");

    disableBoxes();
};

// Check Winner
const checkWinner = () => {

    let winnerFound = false;

    for(let pattern of winsPattern){

        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){

            if(pos1val === pos2val && pos2val === pos3val){

                showWinner(pos1val);

                winnerFound = true;

                return;
            }
        }
    }

    // Draw match check
    let allFilled = true;

    boxes.forEach((box) => {
        if(box.innerText === ""){
            allFilled = false;
        }
    });

    if(allFilled && !winnerFound){

        msg.innerText = "Match Draw";

        msgContainer.classList.remove("hide");
    }
};

// Button events
newGameBtn.addEventListener("click", resetGame);

resetBtn.addEventListener("click", resetGame);