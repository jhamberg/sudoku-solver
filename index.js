const { Set, List, Range, Map } = require("immutable");

const initial = List()
    // Sudoku board size is 9x9
    .setSize(9 * 9)
    // Each cell can contain numbers 1-9
    .map(() => Set(Range(1, 10)));

const sudoku = List([
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
    .map((value, pos) => {
        console.log(`at ${pos}`);
        
    });