### Puzzle class
Keeps track of the entire state of a puzzle:
- `shape` is a tutple of `(gridWidth, gridHeight)`
- `structure` is a string that should be of length `gridWidth*gridHeight` and formatted like `".bad_.."` with each character representing one cell
    - `b`: both an across and a down clue
    - `a`: only an across clue
    - `d`: only a down clue
    - `_`: empty cell
    - `.`: black cell
- `exf`: exf string like used for import
- `checkstring`

- Grid answers (numerical values in list)
- Progress string (user-filled answers)
- Time spent on puzzle (in seconds)
- Across clues, down clues
- whether the user is going across or down
- currently selected cell