//////////// SHOW HINT

// Select the 'show-hint' button
const button = document.querySelector('#show-hint');
// Select the hint div
const hint = document.querySelector('.hint');
// Listen to the click button
button.addEventListener('click', (_e) => {
  // Add the 'active' class to the hint div to show it to user
  hint.classList.toggle('active');
});

//////////// PUZZLE

// Select all tiles
const tiles = document.querySelectorAll('td');

const canMove = (tile) => {
  // Get coordinates of the clicked tile in the table
  const tileColumn = tile.cellIndex;
  const tileRow = tile.parentNode.rowIndex;
  // Identify the empty tile and get its coordinates in the table
  const emptyTile = document.querySelector('.empty');
  const emptyTileColumn = emptyTile.cellIndex;
  const emptyTileRow = emptyTile.parentNode.rowIndex;
  // console.log(`Tile => column: ${tileColumn}, row: ${tileRow} / Empty Tile => column: ${emptyTileColumn}, row: ${emptyTileRow}`);
  
  // Compare the coordinates and return true when the empty tile is up, down, left, right of the clicked tile
  return (tileRow === emptyTileRow && tileColumn === emptyTileColumn - 1) ||
         (tileRow === emptyTileRow && tileColumn === emptyTileColumn + 1) ||
         (tileColumn === emptyTileColumn && tileRow == emptyTileRow - 1)  ||
         (tileColumn === emptyTileColumn && tileRow == emptyTileRow + 1)
};

const swapTile = (tile) => {
  // Select the empty tile
  const emptyTile = document.querySelector('.empty');
  // Swap content between tiles
  emptyTile.innerHTML = tile.innerHTML;
  tile.innerHTML = '';
  // Remove the 'empty' class
  emptyTile.classList.remove('empty');
  // Add the 'empty' class to the clicked tile
  tile.classList.add('empty');
}

const checkWin = () => {
  // Get the order of the current tiles
  const tilesOrder = [];
  document.querySelectorAll('td').forEach((tile) => {
  tilesOrder.push(Number.parseInt(tile.innerText, 10));
  });
  // Alternative => const tilesOrder = Array.from(document.querySelectorAll('td')).map(tile => Number.parseInt(tile.innerText, 10));
  
  // Compare it to the solution and inform the user
  if (tilesOrder.join() === "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,NaN") {
    alert("You win!");
    document.location.reload();
  }
};

// We need to iterate to listen the click for each tile
tiles.forEach((tile) => {
  // Listen to each click
  tile.addEventListener('click', (event) => {
    // Check if the tile can move
    if (canMove(event.currentTarget)) {
      // Swap the clicked tile and the empty tile (design/content)
      swapTile(event.currentTarget);
      // Check if user wins
      checkWin();
    }
  });
});
