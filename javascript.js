// Player factory
const Player = (name) => {
  let boardPositions = '';
  const getName = () => name;
  const getPositions = () => boardPositions;
  const updatePositions = (pos) => {
    boardPositions = boardPositions.concat(pos);
  };
  const resetPositions = () => {
    boardPositions = '';
  };
  return {
    getName,
    getPositions,
    updatePositions,
    resetPositions,
  };
};

// Returns and updates turn. Returns current player.
const gameLogic = (() => {
  let turnControl = true;

  const resetTurn = () => {
    turnControl = true;
  };
  const getTurn = () => turnControl;

  const updateTurn = () => {
    if (turnControl) {
      turnControl = false;
    } else {
      turnControl = true;
    }
  };
  const getPlayer = () => {
    if (turnControl) {
      return 1;
    }
    return 2;
  };

  return {
    getTurn,
    updateTurn,
    getPlayer,
    resetTurn,
  };
})();

const gameboard = (() => {
  const playerOne = Player('Player One');
  const playerTwo = Player('Player Two');

  // eslint-disable-next-line no-underscore-dangle
  let _gameArray = ['', '', '', '', '', '', '', '', ''];
  const winConditions = [
    '147',
    '258',
    '369',
    '123',
    '456',
    '789',
    '159',
    '753',
  ];

  const updatePlayerObject = (block) => {
    const blockID = block.id.slice(-1);
    if (gameLogic.getTurn() === true) {
      playerOne.updatePositions(blockID);
    } else {
      playerTwo.updatePositions(blockID);
    }
  };

  const checkWin = (player) => {
    let currentResults;
    if (player === 1) {
      currentResults = playerOne.getPositions();
    } else {
      currentResults = playerTwo.getPositions();
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const winCond of winConditions) {
      let winCount = 0;
      let result;
      for (let i = 0; i < currentResults.length; i += 1) {
        if (winCond.includes(currentResults[i])) {
          winCount += 1;
        }
      }
      if (winCount === 3) {
        endGame(player, result);
        break;
      } else if (currentResults.length === 5 && winCount < 3) {
        result = 'tie';
        endGame(player, result);
        break;
      }
    }
  };

  const updateGameArray = (block) => {
    const arrayID = block.id.slice(-1) - 1;
    if (gameLogic.getTurn() === true) {
      _gameArray[arrayID] = 'X';
      gameLogic.updateTurn();
    } else {
      _gameArray[arrayID] = 'O';
      gameLogic.updateTurn();
    }
  };

  const drawGameBoard = () => {
    _gameArray.forEach((element, index) => {
      const block = document.getElementById(`block${index + 1}`);
      block.textContent = element;
    });
  };

  const roundLogic = (block) => {
    const player = gameLogic.getPlayer();
    updatePlayerObject(block);
    checkWin(player);
    updateGameArray(block);
    drawGameBoard();
  };

  const addListener = () => {
    const blocks = document.querySelectorAll('.blocks');
    blocks.forEach((block) => {
      if (block.textContent === '') {
        block.addEventListener(
          'click',
          () => {
            roundLogic(block);
          },
          { once: true },
        );
      }
    });
  };

  const removeListeners = () => {
    const blocks = document.querySelectorAll('.blocks');
    blocks.forEach((block) => {
      block.replaceWith(block.cloneNode(true));
    });
  };

  const resetDisplay = () => {
    const displayResults = document.getElementById('resultsDisplay');
    displayResults.textContent = '';
  };
  const restartGame = () => {
    _gameArray = ['', '', '', '', '', '', '', '', ''];
    drawGameBoard();
    resetDisplay();
    gameLogic.resetTurn();
    removeListeners();

    addListener();

    playerOne.resetPositions();
    playerTwo.resetPositions();
  };

  const init = () => {
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', addListener);

    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', restartGame);

    // Will initialize players in the future
  };

  const endGame = (player, result) => {
    // Update display with results
    const displayResults = document.getElementById('resultsDisplay');
    if (result === 'tie') {
      displayResults.textContent = 'Game Over! Tie game!';
    } else {
      displayResults.textContent = `Game Over! Player ${player} wins!`;
    }

    // Highlight the winning columns with a slightly different style
    // Need to add draw logic in the appropriate place
  };

  return {
    init,
    drawGameBoard,
    updateGameArray,
    updatePlayerObject,
  };
})();

gameboard.init();
