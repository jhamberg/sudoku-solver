const { Seq, Set, Repeat, Range } = require("immutable");

const input = Seq([
    ...
    "000" + "000" + "200" +
    "080" + "007" + "090" +
    "602" + "000" + "500" +

    "070" + "060" + "000" +
    "000" + "901" + "000" +
    "000" + "020" + "040" +

    "005" + "000" + "603" +
    "090" + "400" + "070" +
    "006" + "000" + "000"
]);

const initial = input
    .map(value => parseInt(value))
    .map(value => value || Range(1, 10).toSet())
    .toMap();

const colCoords = (pos) => (
    // Column coordinates belong to the residue class mod 9
    Range(0, 9)
        .map(n => 9 * n + (pos % 9))
        .toSet()
)

const rowCoords = (pos) => (
    // Row coordinates are a range multiplied by 9
    Range(0, 9)
        .map(n => n + Math.floor(pos / 9) * 9)
        .toSet()
);

const subGridCoords = (pos) => {
    const subGridRow = Math.floor(pos / 27)
    const subGridColumn = Math.floor((pos % 9) / 3);
    return Seq([0, 1, 2, 9, 10, 11, 18, 19, 20])
        .map(x => x + (subGridRow * 27) + (subGridColumn * 3))
        .toSet();
}

const invalidCoords = (pos) => (
    Set.union([
        rowCoords(pos),
        colCoords(pos),
        subGridCoords(pos)
    ])
);

/* const isFound = (value) => (
    value !== 0
); */

function solve(board = initial) {
    board.map((value, pos) => {
        if (!isNaN(value)) {
            console.log(`${value} at ${pos}`);
        }
    }).toJS()
}

solve(initial);

//const initial = sudoku

/*let result = initial;
sudoku
    .map(x => parseInt(x))
    .map((value, pos) => {
        // console.log(`at ${pos}`);
        if (isFound(value)) {
            // console.log(`removing value ${value} from coords ${invalidCoords(pos)}`);
            result = invalidCoords(pos).reduce((res, curr) => (
                res.update(curr, candidates => candidates.delete(value))
            ), result);
            
            // Cycle 1-9 through every row, column and subgrid, find if can place any
            result.map((cell, index) => {
               //console.log(`${index}: ${cell.toJS()}`);
            }).toJS();
        }
    }).toJS(); // Collect*/