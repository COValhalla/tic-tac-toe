// Gameboard object will store the details of the actual game
// Gameboard grid will be stored as an array inside of a gameboard object
const gameboard = (() => {
    // let gameArray = Array(8);
    let _gameArray = ['X', 'O','X','4','O','X','7','O','X'];

    const drawBoard = () => {
        _gameArray.forEach((element, index) => {
            console.log(`The number is ${index + 1}`)
            let block = document.getElementById(`block${index + 1}`)
            block.textContent = element;
        });
    };

    return {drawBoard};
})();

const displayController = (() => {
    const blocks = document.querySelectorAll('.block');  
    
    //Find nodelist of all blocks, iterate over nodelist and add event listener
    //X goes first.
})();

gameboard.drawBoard();








// Create CSS Grid with 3x3 layout, each grid position corresponds to gameboard grid.
// Use event listener on the grid to select target square, if square already filled remove event listener




//gameBoard/displayController will be modules, since only one is needed
//Players will be created using factories (multiples needed)