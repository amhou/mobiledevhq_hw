/*
 * Handles input from stdin.
 */
var main = function() {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  var board;

  process.stdin.on('data', function(input) {
    if (input === "\n") {
      console.log("Solving Sudoku...");

      // Remove trailing newline character
      board = board.slice(0, board.length - 1);

      var solvedSudoku = solveSudoku(board);
      if (solvedSudoku) {
        printSudoku(solvedSudoku);
      } else {
        console.log("No solution found");
      }

      process.exit();
    }

    if (typeof board === 'undefined') {
      board = input;
    } else {
      board += input;
    }
  });
}

if (require.main === module) {
  main();
}


/*
 * Solves a sudoku puzzle!
 *
 * Args: rawBoard = a string representation of a sudoku board, comma delimited.
 * Returns: a 9x9 2D array solution
 */
var solveSudoku = function(rawBoard) {
  const SUDOKU_MAX = 9;

  var row, column, value, found;

  var board = parseBoard(rawBoard);
  var emptyCells = findEmptyCells(board);

  for (i = 0;  i < emptyCells.length;) {
    // Backtracking past 0, no solution found
    if (i === -1) {
      return false;
    }

    row = emptyCells[i][0];
    column = emptyCells[i][1];

    value = board[row][column] + 1;
    found = false;

    while(!found && value <= SUDOKU_MAX) {
      if (checkValue(board, emptyCells[i], value)) {
        found = true;
        board[row][column] = value;
        i++;
      } else {
        value++;
      }
    }

    // If no value is found, reset cell to 0 and go backwards
    if (!found) {
      board[row][column] = 0;
      i--;
    }
  }

  return board;
}

/*
 * Parses a CSV sudoku board into a 2D array.
 *
 * Args: rawBoard - a string representation of a sudoku board, comma delimited.
 * Returns: a 9x9 2D array
 */
var parseBoard = function (rawBoard) {
  var parsedBoard = rawBoard.split("\n").map(function(row) {
    return row.split(",").map(function(value) {
      if (value != "-") {
        return parseInt(value);
      } else {
        return 0;
      }
    });
  });

  return parsedBoard;
}

/*
 * Finds the empty cells of a given sudoku board.
 *
 * Args: board - a 9x9 2D array
 * Returns: the coordinates of empty cells
 */
var findEmptyCells = function (board) {
  var emptyCells = [];
  for (row = 0; row < board.length; row++) {
    for (column = 0; column < board[row].length; column++) {
      if (board[row][column] === 0) {
        emptyCells.push([row,column]);
      }
    }
  }

  return emptyCells;
}

/*
 * Checks that the given value is a valid placement in the given cell.
 *
 * Args: board - a 9x9 2D array
 *       cell - the coordinates for a cell (row x column)
 *       value - an integer
 * Returns: true if the value is not in the cell's zone, row, or column
 */
var checkValue = function(board, cell, value) {
  return checkRow(board, cell[0], value) &&
         checkColumn(board, cell[1], value) &&
         checkZone(board, cell, value);
}

/*
 * Checks that the given value does not exist within the given row.
 *
 * Args: board - a 9x9 2D array
 *       row - the row to be checked
 *       value - an integer
 * Returns: true if the value is not in the given row
 */
var checkRow = function(board, row, value) {
  return board[row].indexOf(value) === -1;
}

/*
 * Checks that the given value does not exist within the given column.
 *
 * Args: board - a 9x9 2D array
 *       column - the column to be checked
 *       value - an integer
 * Returns: true if the value is not in the given column
 */
var checkColumn = function(board, column, value) {
  for (row = 0; row < board.length; row++) {
    if (board[row][column] === value) {
      return false;
    }
  }
  return true;
}

/*
 * Checks that the given value does not exist within the given cell's 3x3 zone.
 *
 * Args: board - a 9x9 2D array
 *       cell - the coordinates for a cell (row x column)
 *       value - an integer
 * Returns: true if the value is not in the cell's zone
 */
var checkZone = function(board, cell, value) {
  var zoneLeftEdge = 0;
  var zoneTopEdge = 0;

  const ZONE_WIDTH = 3;

  // Find zone's left edge
  while (cell[1] >= zoneLeftEdge + ZONE_WIDTH) {
    zoneLeftEdge += ZONE_WIDTH;
  }

  // Find zone's top edge
  while (cell[0] >= zoneTopEdge + ZONE_WIDTH) {
    zoneTopEdge += ZONE_WIDTH;
  }

  // Check the found zone
  for (row = zoneTopEdge; row < zoneTopEdge + ZONE_WIDTH; row++) {
    for (column = zoneLeftEdge; column < zoneLeftEdge + ZONE_WIDTH; column++) {
      if (board[row][column] === value) {
        return false;
      }
    }
  }
  return true;
}

/*
 * Prints the given sudoku puzzle.
 *
 * Args: board - a 9x9 2D array
 */
var printSudoku = function(board) {
  board.forEach(function(row) {
    console.log(row.join());
  });
}

// Function exports
module.exports = {
  solveSudoku: solveSudoku,
  parseBoard: parseBoard,
  findEmptyCells: findEmptyCells,
  checkValue: checkValue,
  checkRow: checkRow,
  checkColumn: checkColumn,
  checkZone: checkZone,
  printSudoku: printSudoku
}
