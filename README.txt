A Node.js Sudoku solver!

This sudoku solver uses a backtracking algorithm that iterates through all possible solutions for a given sudoku.

First, we ingest the given sudoku, and create a list of all the empty cells. Then, we iterate through the cells, assigning numbers. Before assigning a number, we first check that the number doesn't exist within the current row, column, or 3x3 zone. After checking for safety, we assign the number, and check the next cell. If there is no valid assignment, we return to the previously assigned cell, and try again with an incremented value.

If there is no solution, we print "No solution found".

While a backtracking algorithm is both easy to understand and implement, it has some drawbacks. The big O for this solution is O(n^m), where n is the range of values (9 in a standard sudoku) and m is the number of spaces that are blank. Since it is possible that every empty cell is iterated until its value is the maximum of 9, a backtracking algorithm gives an exponential worst-case for computational complexity. In its best case, the correct value is chosen on each try, leading to a computational time that is directly proportionate to the number of empty cells. In practice, the runtime isn't expected to be significant, given that sudoku is a bounded problem with a limited number of cells. Also, it is exceedingly rare that the algorithm will have to iterate through every possible value, further increasing the likeliness that the computation time will be within a reasonable timeframe.

There are a few options to optimize this algorithm to help improve performance. Currently, we iterate through every value (1-9) for a given empty cell, and test for its validity. It is possible to parse the sudoku puzzle beforehand and eliminate certain values for cells that we know would not be valid. In addition to this constraint propagation, there are alternative algorithms that could be tried as well, such as stochastic searches, exact cover solutions, and a brute force application of a known set of possible grids.

An example execution is shown below:

$ cd sudoku/
$ node sudoku_solver.js
-,-,4,-,5,3,-,-,6
-,-,1,4,-,2,-,-,-
3,-,6,8,-,-,-,-,-
-,9,3,-,-,-,8,-,-
-,2,5,3,-,1,6,7,-
-,-,8,-,-,-,4,2,-
-,-,-,-,-,5,3,-,7
-,-,-,7,-,9,1,-,-
5,-,-,1,4,-,9,-,-

Solving Sudoku...
2,8,4,9,5,3,7,1,6
9,7,1,4,6,2,5,3,8
3,5,6,8,1,7,2,9,4
6,9,3,2,7,4,8,5,1
4,2,5,3,8,1,6,7,9
7,1,8,5,9,6,4,2,3
1,4,9,6,2,5,3,8,7
8,6,2,7,3,9,1,4,5
5,3,7,1,4,8,9,6,2

A test suite for this sudoku solver is also included, using the Jasmine testing framework. These tests can be run with the following command:

$ jasmine-node spec/
