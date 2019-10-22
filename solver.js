const { Set, Range, Repeat } = require("immutable"); 
const { invert, updateAll } = require("./utils");

 // TODO: Delete me
const { initial } = require("./index");

const SIZE = 9 * 9;
const INDICES = Range(0, SIZE);
const INITIAL_CELL = Range(1, 10).toSet();
const INITIAL_BOARD = Repeat(INITIAL_CELL, SIZE).toMap();
const ROW_INDICES = INDICES.map(idx => Math.floor(idx / 9));
const COLUMN_INDICES = INDICES.map(idx => idx % 9);
const SUBGRID_INDICES = INDICES.map(idx => 3 * Math.floor(idx / 27) + Math.floor((idx % 9) / 3));

const ROW_CELLS = invert(ROW_INDICES);
const COLUMN_CELLS = invert(COLUMN_INDICES);
const SUBGRID_CELLS = invert(SUBGRID_INDICES);

function eraseImpossible(board) {
    return board.reduce((board, values, index) => {
        // Ignore cells with candidates
        if (values.count() > 1) {
            return board;
        }

        // Find all cells in the groups the cell belongs in 
        const subset = Set.union([
            ROW_CELLS.get(ROW_INDICES.get(index)),
            COLUMN_CELLS.get(COLUMN_INDICES.get(index)),
            SUBGRID_CELLS.get(SUBGRID_INDICES.get(index))
        ]).delete(index);

        // Exclude the original cell
        const cells = subset.delete(index);

        // Remove the reserved value
        return updateAll(board, cells, (candidates) => candidates.delete(values.first()));
    }, board);
}

function findSingletons(board) {
    return board;
}

function isInvalid(board) {
    return board.some(cell => cell.isEmpty());
}

function isComplete(board) {
    return board.every(cell => cell.size === 1);
}

function makeGuesses(board) {
    // Branch boards from the cell with least candidates
    const [index, candidates] = board
        .filter(candidates => candidates.size > 1)
        .sortBy(candidates => candidates.size)
        .entrySeq()
        .first();
    return candidates.map(value => board.set(index, Set.of(value)));
}

function solve(board) {
    const reduced = eraseImpossible(board);
    const updated = findSingletons(reduced);

    // Invalid backtracking branch
    if (isInvalid(updated)) {
        return;
    }
    
    if (isComplete(updated)) {
        return updated;
    }

    // Proceed with any scan results
    if (!updated.equals(board)) {
        return solve(updated);
    }

    // Fall back on backtracking
    for (const guess of makeGuesses(updated)) {
        const solution = solve(guess);
        if (solution) {
            return solution;
        }
    }

    // Exhausted all options
    return;
}

console.log(solve(initial).toJS());