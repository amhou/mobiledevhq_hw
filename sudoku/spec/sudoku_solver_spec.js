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
    var expectedBoard = [[0,0,4,0,5,3,0,0,6],
                         [0,0,1,4,0,2,0,0,0],
                         [3,0,6,8,0,0,0,0,0],
                         [0,9,3,0,0,0,8,0,0],
                         [0,2,5,3,0,1,6,7,0],
                         [0,0,8,0,0,0,4,2,0],
                         [0,0,0,0,0,5,3,0,7],
                         [0,0,0,7,0,9,1,0,0],
                         [5,0,0,1,4,0,9,0,0]];

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

describe("#checkRow()", function() {
  it("should check that the given value does not exist within the given row", function() {
    expect(sudoku_solver.checkRow(parsedBoard, 0, 1)).toBe(true);
    expect(sudoku_solver.checkRow(parsedBoard, 0, 4)).toBe(false);
  });
});

describe("#checkColumn()", function() {
  it("should check that the given value does not exist within the given column", function() {
    expect(sudoku_solver.checkColumn(parsedBoard, 0, 1)).toBe(true);
    expect(sudoku_solver.checkColumn(parsedBoard, 0, 5)).toBe(false);
  });
});

describe("#checkZone()", function() {
  it("should check that the given value does not exist within the given cell's 3x3 zone", function() {
    expect(sudoku_solver.checkZone(parsedBoard, [0,0], 2)).toBe(true);
    expect(sudoku_solver.checkZone(parsedBoard, [0,0], 1)).toBe(false);
  });
});

describe("#checkValue()", function() {
  it("should check that the given value is a valid placement in the given cell", function() {
    expect(sudoku_solver.checkValue(parsedBoard, [0,0], 2)).toBe(true);
    expect(sudoku_solver.checkValue(parsedBoard, [1,0], 2)).toBe(false);
  });
});

describe("#solveSudoku()", function() {
  it("should solve a sudoku puzzle provided as a CSV", function() {
    var expectedSolution = [[2,8,4,9,5,3,7,1,6],
                            [9,7,1,4,6,2,5,3,8],
                            [3,5,6,8,1,7,2,9,4],
                            [6,9,3,2,7,4,8,5,1],
                            [4,2,5,3,8,1,6,7,9],
                            [7,1,8,5,9,6,4,2,3],
                            [1,4,9,6,2,5,3,8,7],
                            [8,6,2,7,3,9,1,4,5],
                            [5,3,7,1,4,8,9,6,2]]
    expect(sudoku_solver.solveSudoku(testBoard)).toEqual(expectedSolution);
  });
});
