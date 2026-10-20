//your JS code here. If required.
let gamePanel = document.getElementById('game-panel');
let nameTag = document.getElementById('player-name-tag');
let e1 = document.getElementById('1');
let e2 = document.getElementById('2');
let e3 = document.getElementById('3');
let e4 = document.getElementById('4');
let e5 = document.getElementById('5');
let e6 = document.getElementById('6');
let e7 = document.getElementById('7');
let e8 = document.getElementById('8');
let form = document.getElementById('MyForm');
gamePanel.classList.add('d-none');

//winnning logic
const winningCombinations = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7],
  [4, 5, 6],
  [7, 8, 9],
];
let playerOneCombinations = [];
let playerTwoCombinations = [];
// let playerOneCount = 0;
// let playerTwoCount = 0;

function winCheck(playersCombinations) {
  for (let i = 0; i < winningCombinations.length; i++) {
    let winCount = 0;
    for (let j = 0; j < 3; j++) {
      if (winningCombinations[i][j] == playersCombinations[j]) {
        winCount++;
        if (winCount == 3) {
          return true;
        }
      }
    }
  }
  return false;
}

//draw functionality
let drawCountDown = 0;
function checkDraw() {
  if (drawCountDown == 9) {
    return true;
  }
  return false;
}

// reset function
function reset() {
  setTimeout(() => {
    window.location.reload();
  }, 3000);
}

let gameOver = false;
form.addEventListener('submit', function (event) {
  gamePanel.classList.toggle('d-none');
  form.classList.add('d-none');
  let nameOne = document.getElementById('player-1').value;
  let nameTwo = document.getElementById('player-2').value;
  event.preventDefault();
  document.querySelector('#player-name-tag').textContent =
    `${nameOne}, you are up`;
  let cells = document.querySelectorAll('.grid-element');
  let currentPlayer = 'X';
  
  // game status functionality
  cells.forEach(cell => {
    cell.addEventListener('click', e => {
      // console.log(Number(e.target.attributes[1].value));
      //player info tag functionality
      if (gameOver) {
        return;
      }
      if (cell.textContent === '' && currentPlayer === 'X') {
        cell.innerHTML = '<h1>X</h1>';
        drawCountDown++;
        playerOneCombinations.push(e.target.attributes[1].value);
        playerOneCombinations.sort();
        
        //maintainning the valid value combination in the queue
        if (playerOneCombinations.length > 3) {
          playerOneCombinations.shift();
        }
        
        // playerOneCount++;
        // console.log('player 1 arr = ' + playerOneCombinations);
        if (playerOneCombinations.length > 2) {
          if (winCheck(playerOneCombinations)) {
            nameTag.textContent = `${nameOne}, congratualations you won!`;
            gameOver = true;
            reset();
            return;
          }
        }
        nameTag.innerHTML = `${nameTwo}, you are up`;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      } else if (cell.textContent === '' && currentPlayer === 'O') {
        cell.innerHTML = '<h1>O</h1>';
        drawCountDown++;
        playerTwoCombinations.push(e.target.attributes[1].value);
        playerTwoCombinations.sort();
        
        //maintainning the valid value combination in the queue
        if (playerTwoCombinations.length > 3) {
          playerTwoCombinations.shift();
        }
        
        // playerTwoCount++;
        // console.log('player 2 arr = ' + playerTwoCombinations);
        if (playerTwoCombinations.length > 2) {
          if (winCheck(playerTwoCombinations)) {
            nameTag.textContent = `${nameTwo}, congratualations you won!`;
            gameOver = true;
            reset();
            return;
          }
        }
        cell.style.backgroundColor = '#800080';
        nameTag.innerHTML = `${nameOne}, you are up`;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
      
      //draw check
      if (checkDraw()) {
        document.querySelector('#player-name-tag').textContent =
          "It's a Draw, Try Again";
        document.querySelector('#player-name-tag').classList.add('text-danger');
        reset();
      }
    });
  });
});
