const { Seq, Set, Range, Map, merge } = require("immutable");

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

const hardest = Seq([
    ...
    "800" + "000" + "000" +
    "003" + "600" + "000" +
    "070" + "090" + "200" +

    "050" + "007" + "000" +
    "000" + "045" + "700" +
    "000" + "100" + "030" +

    "001" + "000" + "068" +
    "008" + "500" + "010" +
    "090" + "000" + "400"
]);

const harder = Seq([
    ...
    "000" + "700" + "000" +
    "100" + "000" + "000" +
    "000" + "430" + "200" +

    "000" + "000" + "006" + 
    "000" + "509" + "000" +
    "000" + "000" + "418" +

    "000" + "081" + "000" +
    "002" + "000" + "050" +
    "040" + "000" + "300"
]);

const allowedValues = Range(1, 10).toSet();

const initial = harder
    .map(value => parseInt(value))
    .map(value => value ? Set.of(value) : allowedValues)
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

const subset = (board, indices) => (
    // This feels more idiomatic than a reduce approach
    Map(indices.map(index => [index, board.get(index)]))
);

const groupByValue = (subGrid) => (
    // This is likely not optimal at all
    Map(allowedValues.map(value => (
        [value, subGrid.filter(values => values.contains(value)).keySeq()]
    )))
);

const findKnownValues = board => cells => (
    groupByValue(subset(board, cells))
            // Find cells that can only have one value
            // Unwrap it from the array
            // Swap the map to be indexed by cell
            .filter(indices => indices.size === 1)
            .map(([value]) => value)
            .mapEntries(([key, value]) => {
                //console.log(`${key} to ${value}`);
                return [value, key];
            })
)

function markNew(board) {
    return [subGridValues, columnValues, rowValues].reduce((res, values) => (
        res.merge(values.flatMap(findKnownValues(board)))
    ), Map())
    .reduce((result, knownValue, key) => result.set(key, Set.of(knownValue)), board);
}

function eliminateImpossible(board) {
    return board.reduce((result, values, pos) => {
        if (values.count() > 1) return result;
        return invalidCoords(pos).reduce((res, coord) => (
            res.update(coord, cell => cell.delete(values.first()))
        ), result);
    }, board);
}

function solve(board = initial) {
    const updated = markNew(eliminateImpossible(board));
    if (updated.equals(board)) {
        const [index, values] = updated
            .sortBy(candidates => candidates.size)
            .filter(candidates => candidates.size > 1)
            .entrySeq()
            .first();
        values.forEach(value => {
            console.log(`Going in to solve with assumption ${index} is ${value}`);
            solve(board.set(index, Set.of(value)))
        });
    }
    //console.log(updated.toJS())
    return updated;
}

// solve(solve(solve(solve(solve()))));

module.exports = { initial };
