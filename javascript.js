// Player factory
const Player = (name) => {
  let boardPositions = '';
  const getName = () => name;
  const getPositions = () => boardPositions;
  const updatePositions = (pos) => {
    boardPositions = boardPositions.concat(pos);
  };
  return { getName, getPositions, updatePositions };
};

// Returns and updates turn. Returns current player.
const gameLogic = (() => {
  let turnControl = true;

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

  return { getTurn, updateTurn, getPlayer };
})();

const gameboard = (() => {
  const playerOne = Player('Player One');
  const playerTwo = Player('Player Two');

  // eslint-disable-next-line no-underscore-dangle
  const _gameArray = ['', '', '', '', '', '', '', '', ''];
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
      for (let i = 0; i < currentResults.length; i += 1) {
        if (winCond.includes(currentResults[i])) {
          winCount += 1;
        }
      }
      if (winCount === 3) {
        endGame(player);
        break;
      } else if (currentResults.length === 5 && winCount < 3) {
        alert('tie');
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

  const init = () => {
    addListener();
    // Will initialize players in the future
  };

  const endGame = (player) => {
    // Update display with results
    // Highlight the winning columns with a slightly different style
    // Need to add draw logic in the appropriate place
    alert(`Game over! Player ${player} wins!`);
  };

  return {
    init,
    drawGameBoard,
    updateGameArray,
    updatePlayerObject,
  };
})();

gameboard.init();
