### Puzzle class
#####Initialization
- `boardData` (DruBoard output object)
- `time`: time spent on puzzle in tenths of seconds
- `progress`: string with user answers in lowercase by default, with validated guesses uppercase.
#####Traits
Keeps track of the entire state of a puzzle:
- `gridWdith`, `gridHeight`: width/height of grid
- `structure` is a string that should be of length `gridWidth*gridHeight` and formatted like `".bad_.."` with each character representing one cell
    - `b`: both an across and a down clue
    - `a`: only an across clue
    - `d`: only a down clue
    - `_`: empty cell
    - `.`: black cell
- `exf`: exf string like used for import
- `checkList`: list of integers where the integer at index `i` can check the answer of cell `i` with the `charCode * 17`. If the crossword was inputted with missing answers, TODO
- `progress`: contains the user's answers in an array (lowercase guess, uppercase validated) OUDATED: puzzle now saves on reload/close, not on every update. stored as STRING and not a trait of puzzle
- `time`: Time spent on puzzle (in tenths of seconds) (integer)
- Across clues, down clues: ideally I don't actually store these additionally in js, just in the clue elements.
- `inputAcross`: boolean for whether grid is currently going across or down
- `currCell`: currently selected cell (DOM element)
- `cells`: list of cell DOM elements
- `title` : title of puzzle
- `author`: author of puzzle

##### Export
- Puzzles can be exported as a JSON as described in the rxf section or as an rxf.

#### cell DOM element
- `data-id` : cell index: this contains a number which corresponds to the index of this element in `cells`, and can give the row and column information
- `data-across`: across clue that this cell corresponds to. `-1` if it's only part of an across
- `data-down`: down clue that this cell corresponds to. `-1` if it's only part of a down.


### JSON
- `metadata` object with
    - `valid`: whether all cells were filled on creation and there is the correct number of clues
    - `title`: title of the puzzle
    - `author`: author of the puzzle

- `dimensions`: list with width then height of grid
- `answers`: 2D-array with string of answer of a cell stored as the letter, black cells stored as `null`, and empty cells being stored as `""`
- `clues`: object with
    - `across`: list of across clues
    - `down`: list of down clues

### .exf - encoded crossword format
Base-64 encoded text similar to the JSON downloadable from DruBoard, with `*` appended to the beginning (after encoding). 
List with `metadata`,`dimensions`, `answers`, `clues` in that order.


### .rxf - RenTable crossword format
Base-64 encoded file with `~` appended to beginning. Contains:
- `boardData`: JSON generated by DruBoard as described above
- `tableData`: object with RenTable-specific info
    - `progString`: string of progress where `charAt(i)` contains the user-inputted answer to cell `i`. Blank cells are stored as `_` with no distinction between blank cells and black squares. Completed puzzles have an empty progstring. Validated cells are uppercase and unvalidated ones are lowercase.
    - `time` : time in tenths of a second for how long a user has spent on a puzzle
    - `complete`: boolean that is `true` if the puzzle has been completed with all valid cells.
    - `progPercent`: integer from 0 to 100 for what percentage of cells have been filled


### localstorage
- `User`: contains the JSON string of a User


### User class
- `puzzles`: list of puzzless
- `theme`: last theme used
- `lastPuzzle`: last puzzle used

