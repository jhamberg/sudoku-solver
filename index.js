const { Seq, Set, Repeat, Range } = require("immutable");

const initial = Repeat(
    // Every cell can have values 1-9
    Range(1, 10).toSet(), 
    // Board dimensions are 9x9
    9 * 9
).toMap();

const sudoku = Seq([
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

const invalidCoords = (pos) => (
    Set.union([
        rowCoords(pos),
        colCoords(pos),
        // blockCoords(pos)
    ])
);

const isFound = (value) => (
    value !== 0
);

let result = initial;
sudoku
    .map(x => parseInt(x))
    .map((value, pos) => {
        console.log(`at ${pos}`);
        if (isFound(value)) {
            console.log(`removing value ${value} from coords ${invalidCoords(pos)}`);
            console.log(initial.keySeq().toJS())
            result = invalidCoords(pos).reduce((res, curr) => (
                res.update(curr, candidates => candidates.delete(value))
            ), result);
            
            result.map((cell, index) => {
                console.log(`${index}: ${cell.toJS()}`);
            }).toJS();
        }
    }).toJS(); // Collect