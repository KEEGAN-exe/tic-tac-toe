const board = document.querySelectorAll(".board div");
const boton = document.querySelector("button");
const count = document.querySelectorAll(".count");
const tic = '<ion-icon name="ellipse-outline" class="circle"></ion-icon>';
const tac = document.createElement("div");
let turn = false;
let ticArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

count.forEach((n) => {
  n.textContent = 0;
});

board.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (ticArray[index] === 0) {
      if (turn) {
        ticArray[index] = 2;
        createCircle(item);
      } else {
        ticArray[index] = 1;
        createCross(item);
      }
      turn = !turn;
    }
    checkWinner();
  });
});

function resaltLoser() {
  board.forEach((item) => {
    if (!item.classList.contains("win")) {
      item.classList.add('lose')
    }
  });
}

function createCircle(parentDiv) {
  const container = document.createElement("span");
  const rounded = document.createElement("span");
  container.classList.add("container");
  rounded.classList.add("rounded");
  container.appendChild(rounded);
  parentDiv.appendChild(container);
}

function createCross(parentDiv) {
  const container = document.createElement("span");
  container.classList.add("x-container");
  parentDiv.appendChild(container);
}

/*boton.addEventListener("click", () => {
  clearBoard();
  container.forEach((item) => {
    item.style.pointerEvents = "auto";
    item.classList.remove("win");
  });
});*/

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (
      ticArray[a] &&
      ticArray[a] === ticArray[b] &&
      ticArray[a] === ticArray[c]
    ) {
      if (ticArray[a] === 1) {
        const contador = parseInt(count[0]);
        count[0] = contador + 1;
        setTimeout(() => {
          console.log("Tic wins");
        }, 100);
      } else {
        const contador = parseInt(count[1]);
        count[1] = contador + 1;
        setTimeout(() => {
          console.log("Tac wins");
        }, 100);
      }
      resaltWinner(a, b, c);
      board.forEach((item) => {
        item.style.pointerEvents = "none";
      });
    }
  }
}

function resaltWinner(a, b, c) {
  board[a].classList.add('win')
  board[b].classList.add('win')
  board[c].classList.add('win')
  resaltLoser();
}

function clearBoard() {
  ticArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  board.forEach((item) => {
    item.innerHTML = "";
    item.style.pointerEvents = "auto";
    item.classList.remove('win')
    item.classList.remove('lose')
  });
}
