const { Seq, Set, Range } = require("immutable");

const input = Seq([
    ...
    "000" + "000" + "200" +
    "080" + "007" + "090" +
    "602" + "000" + "500" +

    "070"+  "060" + "000" +
    "000" + "901" + "000" +
    "000" + "020" + "040" +

    "005" + "000" + "603" +
    "090" + "400" + "070" +
    "006" + "000" + "000"
]);

const initial = input
    .map(value => parseInt(value))
    .map(value => value ? Set.of(value) : Range(1, 10).toSet())
    .toMap();

// 1) Find the row by diving with 9 and then the subgrid row by divding with 3. 
// 2) Find the column by modulo 9 and then the subgrid column by dividing with 3.
// 3) Assign indices 0 to 8 to subgrids with the formula 3r + c.
const subGridIndices = initial
    .map((_, index) => 3 * Math.floor(index / 27) + Math.floor((index % 9) / 3))

const subGridValues = subGridIndices
    .groupBy(val => val)
    .map(val => val.keySeq());

const columnIndices =
    initial.map((_, index) => index % 9);
const rowIndices =
    initial.map((_, index) => Math.floor(index / 9));

const columnValues = columnIndices
    .groupBy(val => val)
    .map(val => val.keySeq());

const rowValues = rowIndices
    .groupBy(val => val)
    .map(val => val.keySeq());

const invalidCoords = (pos) => (
    Set.union([
        rowValues.get(rowIndices.get(pos)),
        columnValues.get(columnIndices.get(pos)),
        subGridValues.get(subGridIndices.get(pos))
    ]).delete(pos)
);

function solve(board = initial) {
    // console.log(board);
    const temp = board.reduce((nextState, values, pos) => {
        if (values.count() > 1) return nextState;
        return invalidCoords(pos).reduce((res, coord) => (
            res.update(coord, cell => cell.delete(values.first()))
        ), nextState);
    }, board);
    console.log(temp.toJS());
}

solve(initial);