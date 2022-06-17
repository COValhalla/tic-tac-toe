// Gameboard object will store the details of the actual game
// Gameboard grid will be stored as an array inside of a gameboard object
const gameboard = (() => {
    // let gameArray = Array(8);
    let _gameArray = ['', '','','','','','','',''];
    let turnControl = 'X';

    const drawBoard = () => {
        _gameArray.forEach((element, index) => {
            let block = document.getElementById(`block${index + 1}`)
            block.textContent = element;
        });
    };

    const updateGameArray = (block) => {
        blockID = block.id.slice(-1) -1 ;
        if (turnControl == 'X'){
            _gameArray[blockID] = "X"
            turnControl = 'O';
        } else {
            _gameArray[blockID] = "O";
            turnControl = 'X';
        }
    }

    return {drawBoard, updateGameArray};
})();

const displayController = (() => {

    const addListener = () => {
        const blocks = document.querySelectorAll('.blocks');  
        blocks.forEach((block) => {
            if(block.textContent == "") {
                block.addEventListener('click', function() {
                    gameboard.updateGameArray(block)
                    gameboard.drawBoard();
                }, {once:true});
            }
        })
    };

    return{addListener};
})();


displayController.addListener();

// Initialization. 
// Add eventListeners, on click gameArray and draw board.
// No more Player 1 clicks, Player 2 (computer) must select a square






// Create CSS Grid with 3x3 layout, each grid position corresponds to gameboard grid.
// Use event listener on the grid to select target square, if square already filled remove event listener




//gameBoard/displayController will be modules, since only one is needed
//Players will be created using factories (multiples needed)