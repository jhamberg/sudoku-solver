function solve (board) {
    const reduced = eraseImpossible(board, discoveries);
    const updated = findSingletons(reduced);

    // Invalid backtracking branch
    if (!isValid(board)) {
        return;
    }
    
    if (isComplete(board)) {
        return board;
    }

    // Proceed with any scan results
    if (!updated.equals(board)) {
        return solve(updated);
    }

    // Fall back on backtracking
    if (updated.equals(board)) {
        for (const guess of makeGuesses(board)) {
            const solution = solve(guess);
            if (solution) {
                return solution;
            }
        }
        throw new Error("Sudoku is invalid");
    }
}

console.log(solve(input));