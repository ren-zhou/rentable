const black = ["0", 0, null, "|", "-", ".", " ", "+"];
function charCodeOrNull(c) {
    if (c != null) {
        return c.charCodeAt(0) * 17;
    }
    return null;
}

function generateNY(answers, borderX, borderY) {
    function odd(x) {
        return x % 2 == 1;
    }
    function convert(i) {
        return Math.floor(i / 2);
    }
    height = answers.length * 2 - 1;
    width = answers[0].length * 2 - 1;
    let mega = [];
    for (let i = 0; i < height; i++) {
        mega.push([]);
    }


    for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
            if (odd(y) && odd(x)) { // corner
                mega[x][y] = "+"
            } else if (odd(x)) { // horizontal, border-y
                mega[x][y] = borderY[convert(x)][convert(y)] ? "-" : "*";
            } else if (odd(y)) { // vertical, border-x
                mega[x][y] = borderX[convert(x)][convert(y)] ? "|" : "*"
            } else {
                mega[x][y] = answers[convert(x)][convert(y)]
            }
        }
    }
    return mega;
}


function makefmt(wordarr, gridWidth, gridHeight, style = "standard", extra = {}) {
    if (style == "new-yorker") {
        wordarr = generateNY(wordarr, extra['border-x'], extra['border-y']);
    }

    function isBlocked(x, y, grid) {
        if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) {
            return true;
        }
        if (grid[x][y] == "+") {
            return cornerCheck(x, y, grid);
        }
        return black.includes(grid[x][y]);
    }

    function cornerCheck(x, y, grid) {
        if (isBlocked(x - 1, y, grid) + isBlocked(x + 1, y, grid) + isBlocked(x, y - 1, grid) + isBlocked(x, y + 1, grid)) {
            return true;
        }
        return false;
    }


    function isHorizontal(x, y, grid) {
        return isBlocked(x - 1, y, grid) && !isBlocked(x + 1, y, grid);
    }

    function isVertical(x, y, grid) {
        return isBlocked(x, y - 1, grid) && !isBlocked(x, y + 1, grid);
    }

    let fmtstring = "";
    let grid = [];
    for (let i = 0; i < gridWidth; i++) {
        grid.push([]);
    }
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            grid[x][y] = wordarr[y][x];
        }
    }

    for (let j = 0; j < gridHeight; j++) {

        for (let i = 0; i < gridWidth; i++) {
            if (isBlocked(i, j, grid)) {
                fmtstring += grid[i][j] == null ? 0 : grid[i][j];
            } else if (grid[i][j] == "*" || grid[i][j] == "+") {
                fmtstring += "*";
            }
            else if (isHorizontal(i, j, grid) && isVertical(i, j, grid)) {
                fmtstring += "b";
            }
            else if (isHorizontal(i, j, grid)) {
                fmtstring += "a";
            }
            else if (isVertical(i, j, grid)) {
                fmtstring += "d";
            }
            else {
                fmtstring += "_";
            }
        }
    }
    return fmtstring;
}

var lastTarget = null;


function setUpInput() {
    window.addEventListener("dragenter", function (e) {
        lastTarget = e.target;
        document.querySelector(".dropzone").style.visibility = "";
        document.querySelector(".dropzone").style.opacity = 1;
    });

    window.addEventListener("dragleave", function (e) {
        if (e.target === lastTarget || e.target === document) {
            hideShadow();
        }
    });

    window.ondrop = function (e) {
        e.preventDefault();
        hideShadow();
        e.dataTransfer.files[0].text().then(text => readFile(text));
    }

    window.ondragover = function (e) {
        e.preventDefault();
        e.stopPropagation();
    }
}

function hideShadow() {
    document.querySelector(".dropzone").style.visibility = "hidden";
    document.querySelector(".dropzone").style.opacity = 0;
}

function readFile(text) {
    if (text.startsWith("^")) {
        newUser(text);
    } else {
        Puzzle.loadNewPuzzle(text);
    }
}


function newUser(text=null) {
    User.blockSave = false;
    user = User.loadUser(text);
    puzzle = Puzzle.importTable(user.puzzles[user.currentPuzzle]);
    puzzle.render();
}

function debug() {

    console.log(user.puzzles);
    console.log(user)
    user.save();
}
