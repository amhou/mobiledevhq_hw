var testBoard = "-,-,4,-,5,3,-,-,6\n" +
                "-,-,1,4,-,2,-,-,-\n" +
                "3,-,6,8,-,-,-,-,-\n" +
                "-,9,3,-,-,-,8,-,-\n" +
                "-,2,5,3,-,1,6,7,-\n" +
                "-,-,8,-,-,-,4,2,-\n" +
                "-,-,-,-,-,5,3,-,7\n" +
                "-,-,-,7,-,9,1,-,-\n" +
                "5,-,-,1,4,-,9,-,-";
/*
 * Parses a CSV sudoku board into a 2D array.
 */
var parseBoard = function (rawBoard) {
  var parsedBoard = rawBoard.split("\n").map(function(row) {
    return row.split(",").map(function(value) {
      if (value != "-") {
        return parseInt(value);
      } else {
        return value;
      }
    });
  });

  return parsedBoard;
}

/*
 * Finds the empty cells of a given sudoku board.
 */
var findEmptyCells = function (board) {
  var emptyCells = [];
  for (row = 0; row < board.length; row++) {
    for (column = 0; column < board[row].length; column++) {
      if (board[row][column] === "-") {
        emptyCells.push([row,column]);
      }
    }
  }

  return emptyCells;
}

// Function exports
exports.parseBoard = parseBoard;
exports.findEmptyCells = findEmptyCells;
