var sudoku_solver = require("../sudoku_solver");

var testBoard = "-,-,4,-,5,3,-,-,6\n" +
                "-,-,1,4,-,2,-,-,-\n" +
                "3,-,6,8,-,-,-,-,-\n" +
                "-,9,3,-,-,-,8,-,-\n" +
                "-,2,5,3,-,1,6,7,-\n" +
                "-,-,8,-,-,-,4,2,-\n" +
                "-,-,-,-,-,5,3,-,7\n" +
                "-,-,-,7,-,9,1,-,-\n" +
                "5,-,-,1,4,-,9,-,-";
var parsedBoard;

describe("#parseBoard()", function() {
  it("should parse a standard sudoku board into a 2D array", function() {
    parsedBoard = sudoku_solver.parseBoard(testBoard);
    var expectedBoard = [["-","-",4,"-",5,3,"-","-",6],
                         ["-","-",1,4,"-",2,"-","-","-"],
                         [3,"-",6,8,"-","-","-","-","-"],
                         ["-",9,3,"-","-","-",8,"-","-"],
                         ["-",2,5,3,"-",1,6,7,"-"],
                         ["-","-",8,"-","-","-",4,2,"-"],
                         ["-","-","-","-","-",5,3,"-",7],
                         ["-","-","-",7,"-",9,1,"-","-"],
                         [5,"-","-",1,4,"-",9,"-","-"]];

    expect(parsedBoard.length).toEqual(9);

    for (row = 0; row < parsedBoard.length; row++) {
      expect(parsedBoard[row].length).toEqual(9);
    }

    expect(parsedBoard).toEqual(expectedBoard);
  });
});

describe("#findEmptyCells()", function() {
  it("should find the empty cells of the given sudoku board", function() {
    var emptyCells = sudoku_solver.findEmptyCells(parsedBoard);
    var expectedEmptyCells = [[0,0],[0,1],[0,3],[0,6],[0,7],
                             [1,0],[1,1],[1,4],[1,6],[1,7],[1,8],
                             [2,1],[2,4],[2,5],[2,6],[2,7],[2,8],
                             [3,0],[3,3],[3,4],[3,5],[3,7],[3,8],
                             [4,0],[4,4],[4,8],
                             [5,0],[5,1],[5,3],[5,4],[5,5],[5,8],
                             [6,0],[6,1],[6,2],[6,3],[6,4],[6,7],
                             [7,0],[7,1],[7,2],[7,4],[7,7],[7,8],
                             [8,1],[8,2],[8,5],[8,7],[8,8]];

    expect(emptyCells.length).toEqual(49);
    expect(emptyCells).toEqual(expectedEmptyCells);
  });
});
