let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0;
winner = null;

let turnO = true;//player X and player O

resetBtn.classList.remove("hide");
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
];

const resetGame = ()=> {
    count = 0;
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    resetBtn.classList.remove("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", ()=>{
        if(turnO){ //player O
            box.innerText = "O";
            turnO = false;
        }
        else{ //player X
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        
        if(count == 9 && !isWinner){
            msg.innerText = `Oops!! Game Draw`;
            msgContainer.classList.remove("hide");
            resetBtn.classList.add("hide");
            disableBoxes();
        }
    });
    
});

const disableBoxes = ()=> {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = ()=> {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.style.cssText = "background-color: black; color:#da4167;";
    }
};

const showWinner = (winner)=>{
    resetBtn.classList.add("hide");
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;

        if(posVal1 != "" && posVal2 != "" && posVal3 != ""){
            if(posVal1 === posVal2 && posVal2 === posVal3){
                boxes[pattern[0]].style.cssText = "color: black; background-color: rgb(42, 241, 241);";
                boxes[pattern[1]].style.cssText = "color: black; background-color: rgb(42, 241, 241);";
                boxes[pattern[2]].style.cssText = "color: black; background-color: rgb(42, 241, 241);";
                showWinner(posVal1);
                return true;
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

