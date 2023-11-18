const container = document.querySelectorAll("div");
const boton = document.querySelector("button");
const count = document.querySelectorAll(".count")
const tic = '<ion-icon name="ellipse-outline" class="circle"></ion-icon>';
const tac = '<ion-icon name="close-outline" class="close"></ion-icon>';
let turn = false;
let ticArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

count.forEach((n) => {
  n.textContent = 0
})

container.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (ticArray[index] === 0) {
      if (turn) {
        ticArray[index] = 2;
        item.innerHTML = tac;
      } else {
        ticArray[index] = 1;
        item.innerHTML = tic;
      }
      turn = !turn;
      checkWinner();
    }

 
  });
});

boton.addEventListener("click", () => {
  clearBoard();
  container.forEach((item) => {
    item.style.pointerEvents = "auto";
    item.classList.remove("win");
  });
});

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
        const contador = parseInt(count[0].textContent)
        count[0].textContent = contador + 1
        setTimeout(() => {
          console.log("Tic wins");
        }, 100);
      } else {
        const contador = parseInt(count[1].textContent)
        count[1].textContent = contador + 1
        setTimeout(() => {
          console.log("Tac wins");
        }, 100);
      }
      resaltWinner(a, b, c);
      container.forEach((item) => {
        item.style.pointerEvents = "none";
      });
    }
  }
}

function resaltWinner(a, b, c) {
  container[a].classList.add("win");
  container[b].classList.add("win");
  container[c].classList.add("win");
}

function clearBoard() {
  ticArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  container.forEach((item) => {
    item.innerHTML = "";
  });
}
