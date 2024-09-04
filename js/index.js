//Yedam Lee
/*JS file to handle dynamic actions that is going to occur in the index.html file*/

const answer = "APPLE";

/*variable that can be modified*/
let index = 0;
let attempts = 0;
let timer;

function appStart() {
  //method that shows the users that the game have ended
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "Game Over";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:43vw; background-color:purple; width:200px; height:100px; font-weight:bold; border-radius:15px; color:white; font-size:30px;";

    //adding "div" to the <body> in index.html
    document.body.appendChild(div);
  };
  //method to end the game by deleting the event listener
  const gameOver = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameOver();

    //resetting the timer
    clearInterval(timer);
  };

  //changing to the next line
  const nextLine = () => {
    //returning if we reach the end
    if (attempts === 5) return gameOver();
    attempts++;
    index = 0;
  };

  const handleBackSpace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );

      preBlock.innerText = "";
    }

    if (index !== 0) {
      index -= 1;
    }
  };

  const handleEnterKey = () => {
    let correctAnswer = 0;

    /*checking the answer*/
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      const enteredLetter = block.innerText;
      const answerLetter = answer[i];

      //if the letter is the same (same letter and same location), then we change the colour to green
      if (enteredLetter === answerLetter) {
        correctAnswer++;
        block.style.background = "#6AAA64";
      }

      //if the letter is not in the same position but still part of the answer, we change the colour to yellow
      else if (answer.includes(enteredLetter)) {
        block.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
      }

      block.style.color = "white";
    }

    //if the user got the answer, we end the game
    if (correctAnswer === 5) {
      gameOver();
    } else {
      //moving to the next line after checking the answer
      nextLine();
    }
  };
  /*when the key is pressed on the keyboard*/
  const handleKeydown = (event) => {
    /*getting the key and keyCode from the "event"*/
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;

    /*getting the area where the alphabet needs to be placed.*/
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    //when backspace is clicked
    if (event.key === "Backspace") {
      handleBackSpace();
    } else if (index === 5) {
      /*if we reach the end of the block*/
      if (event.key === "Enter") {
        handleEnterKey();
      } else {
        return;
      }
    } else if (65 <= keyCode && keyCode <= 90) {
      /*only allowing the letters to be placed within the box*/
      thisBlock.innerText = key;
      index++;
    }
  };

  //running the timer when the game starts
  const startTimer = () => {
    const startTime = new Date();

    function setTime() {
      const currentTime = new Date();
      const pastTime = new Date(currentTime - startTime);
      const min = pastTime.getMinutes().toString().padStart(2, "0");
      const second = pastTime.getSeconds().toString().padStart(2, "0");

      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${min}:${second}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
