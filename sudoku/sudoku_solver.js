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
  if (checkRow(board, cell[0], value) &&
      checkColumn(board, cell[1], value) &&
      checkZone(board, cell, value)) {
    return true;
  } else {
    return false;
  }
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
  var zoneWidth = 3;

  // Find zone's left edge
  while (cell[1] >= zoneLeftEdge + zoneWidth) {
    zoneLeftEdge += zoneWidth;
  }

  // Find zone's top edge
  while (cell[0] >= zoneTopEdge + zoneWidth) {
    zoneTopEdge += zoneWidth;
  }

  // Check the found zone
  for (row = zoneTopEdge; row < zoneTopEdge + zoneWidth; row++) {
    for (column = zoneLeftEdge; column < zoneLeftEdge + zoneWidth; column++) {
      if (board[row][column] === value) {
        return false;
      }
    }
  }
  return true;
}

// Function exports
exports.solveSudoku = solveSudoku;
exports.parseBoard = parseBoard;
exports.findEmptyCells = findEmptyCells;
exports.checkValue = checkValue;
exports.checkRow = checkRow;
exports.checkColumn = checkColumn;
exports.checkZone = checkZone;
