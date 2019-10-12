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

sudoku
    .map(x => parseInt(x))
    .map((value, pos) => {
        console.log(`at ${pos}`);
        if (value !== 0) {
            console.log(value);
        }
    }).toJS(); // Collect