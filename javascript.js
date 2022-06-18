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

const gameboard = (() => {
  const playerOne = Player('Player One');
  const playerTwo = Player('Player Two');

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

  const init = () => {
    addListener();
    // Will initialize players in the future
  };

  const addListener = () => {
    const blocks = document.querySelectorAll('.blocks');
    blocks.forEach((block) => {
      if (block.textContent == '') {
        block.addEventListener(
          'click',
          () => {
            roundLogic(block);
          },
          { once: true }
        );
      }
    });
  };

  const roundLogic = (block) => {
    const player = gameLogic.getPlayer();
    updatePlayerObject(block);
    checkWin(player);
    updateGameArray(block);
    drawGameBoard();
  };

  const updateGameArray = (block) => {
    arrayID = block.id.slice(-1) - 1;

    if (gameLogic.getTurn() == true) {
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

  const updatePlayerObject = (block) => {
    const blockID = block.id.slice(-1);
    if (gameLogic.getTurn() == true) {
      playerOne.updatePositions(blockID);
    } else {
      playerTwo.updatePositions(blockID);
    }
  };

  const checkWin = (player) => {
    if (player == 1) {
      currentResults = playerOne.getPositions();
    } else {
      currentResults = playerTwo.getPositions();
    }

    winConditions.forEach((condition) => {
      console.log(`Condition: ${condition}  Result: ${currentResults}`);
    });
  };

  return {
    init,
    drawGameBoard,
    updateGameArray,
    updatePlayerObject,
  };
})();

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

gameboard.init();
