const { Seq, Set, Repeat, Range } = require("immutable");

const initial = Repeat(
    // Every cell can have values 1-9
    Set(Range(1, 10)), 
    // Board dimensions are 9x9
    9 * 9
);

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
        .map(n => 9*n + (9 % pos))
)

const rowCoords = (pos) => (
    // Row coordinates are a range multiplied by 9
    Range(0, 9)
        .map(n => n + Math.floor(pos / 9) * 9)
);

const isFound = (value) => (
    value !== 0
);

sudoku
    .map(x => parseInt(x))
    .map((value, pos) => {
        console.log(`at ${pos}`);
        if (isFound(value)) {
            console.log(value);
            console.log(`removing ${value} from col coords: ${colCoords(pos).toArray()}`)
            console.log(`removing ${value} from row coords: ${rowCoords(pos).toArray()}`)
        }
    }).toJS(); // Collect