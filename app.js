const board = document.querySelectorAll(".board div");
const winnerLabel = document.getElementById("winner");
const points = document.querySelectorAll(".contain label");
const switch_button = document.querySelector(".switch");
const record = document.querySelector(".record-container");
const arrow = document.querySelector(".arrow");
const content = document.querySelector(".content");
const face = document.querySelector(".no-content");
const history = document.querySelector(".record-ul");

let turn = false;
let matchHistory = [];
let winnerResult = "";
let ticArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

board.forEach((item, index) => {
  if (ticArray[index] === 1) {
    item.style.opacity = 1;
    createCross(item);
  } else if (ticArray[index] === 2) {
    item.style.opacity = 1;
    createCircle(item);
  }
  item.addEventListener("click", () => {
    item.style.opacity = 1;
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

switch_button.addEventListener("click", () => {
  record.classList.toggle("open");
  arrow.classList.toggle("arrow");
});

function saveResult(array) {
  const result = {
    result: array,
    winnerResult,
    points_first_player: points[0].textContent,
    points_second_player: points[1].textContent,
  };
  matchHistory.push(result);
  history.style.display = "block";
  face.remove();
  showHistory();
}

function resaltLoser() {
  board.forEach((item) => {
    if (!item.classList.contains("win")) {
      item.style.opacity = 0.2;
    }
  });
}

function createCircle(parentDiv) {
  const container = document.createElement("section");
  const rounded = document.createElement("section");
  container.classList.add("container");
  rounded.classList.add("rounded");
  container.appendChild(rounded);
  parentDiv.appendChild(container);
}

function createCross(parentDiv) {
  const container = document.createElement("section");
  container.classList.add("x-container");
  parentDiv.appendChild(container);
}

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
        const contador = parseInt(points[1].textContent);
        points[1].innerText = contador + 1;
        setTimeout(() => {
          winnerLabel.textContent = "X wins";
          winnerLabel.style.opacity = 1;
          winnerLabel.style.animation = "flicker-pink 1s infinite alternate";
          showWinner();
        }, 100);
        winnerResult = "X";
      } else {
        const contador = parseInt(points[0].textContent);
        points[0].innerText = contador + 1;
        setTimeout(() => {
          winnerLabel.textContent = "Circle wins";
          winnerLabel.style.opacity = 1;
          winnerLabel.style.animation = "flicker-blue 1s infinite alternate";
          showWinner();
        }, 100);
        winnerResult = "O";
      }
      resaltWinner(a, b, c);
      saveResult(ticArray);
      setTimeout(() => {
        clearBoard();
      }, 2800);
      board.forEach((item) => {
        item.style.pointerEvents = "none";
      });
    }
  }
}

function resaltWinner(a, b, c) {
  board[a].classList.add("win");
  board[b].classList.add("win");
  board[c].classList.add("win");
  resaltLoser();
}

function clearBoard() {
  ticArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  board.forEach((item) => {
    item.style.opacity = 0;
    setTimeout(() => {
      item.innerHTML = "";
      item.style.cssText = "";
      item.classList.remove("win");
      item.classList.remove("lose");
      item.style.pointerEvents = "auto";
    }, 100);
  });
}

function showWinner() {
  setTimeout(() => {
    winnerLabel.style.opacity = 0;
    setTimeout(() => {
      winnerLabel.innerText = "";
    }, 500);
  }, 2500);
}

function showHistory() {
  history.innerHTML = "";
  matchHistory.forEach((item, index) => {
    const data = document.createElement("li");
    data.innerText =
      index +
      1 +
      ". " +
      item.winnerResult.toUpperCase() +
      " wins " +
      item.points_first_player +
      " - " +
      item.points_second_player;
    history.appendChild(data);
  });
}

document.addEventListener("click", (event) => {
  const listItem = event.target.closest(".record-ul li");
  if (listItem) {
    const items = [listItem];
    items.forEach((item, index) => {
      const first = parseInt(
        item.textContent.substring(0, item.textContent.indexOf(".")),
        10
      );
      reloadHistory(matchHistory[first - 1]);
    });
  }
});

function reloadHistory(data) {
  ticArray = [...data.result];
  console.log(data);
  board.forEach((item, index) => {
    item.innerHTML = "";
    if (ticArray[index] === 1) {
      createCross(item);
    } else if (ticArray[index] === 2) {
      createCircle(item);
    }
  });
  setTimeout(() => {
    board.forEach((item, index) => {
      if (ticArray[index] === 1 || ticArray[index] === 2) {
        item.style.opacity = 1;
      }
      item.classList.remove("win");
      item.classList.remove("lose");
    });
    checkWinnerHistory(data);
  }, 100);
}

function checkWinnerHistory(data) {
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

    points[0].textContent = ""
    points[1].textContent = ""
    points[0].textContent = data.points_first_player
    points[1].textContent = data.points_second_player

    if (
      ticArray[a] &&
      ticArray[a] === ticArray[b] &&
      ticArray[a] === ticArray[c]
    ) {
      if (ticArray[a] === 1) {
        setTimeout(() => {
          winnerLabel.textContent = "X wins";
          winnerLabel.style.opacity = 1;
          winnerLabel.style.animation = "flicker-pink 1s infinite alternate";
        }, 100);
        winnerResult = "X";
      } else {
        setTimeout(() => {
          winnerLabel.textContent = "Circle wins";
          winnerLabel.style.opacity = 1;
          winnerLabel.style.animation = "flicker-blue 1s infinite alternate";
        }, 100);
        winnerResult = "O";
      }
      resaltWinner(a, b, c);
      board.forEach((item) => {
        item.style.pointerEvents = "none";
      });
    }
  }
}
