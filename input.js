function charCodeOrNull(c) {
    if (c != null) {
        return c.charCodeAt(0) * 17;
    }
    return null;
}

function makefmt(wordarr, gridWidth, gridHeight) {

    function isBlocked(x, y, grid) {
        return (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight || grid[x][y] == "0" || grid[x][y] == null);
    }
    
    
    function isHorizontal(x, y, grid) {
        return isBlocked(x-1, y, grid) && !isBlocked(x+1, y, grid);
    }
    
    function isVertical(x, y, grid) {
        return isBlocked(x, y-1, grid) && !isBlocked(x, y+1, grid);
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
            if (grid[i][j] == "0" || grid[i][j] == null) {
                fmtstring += ".";
            }
            else if (isHorizontal(i, j, grid) && isVertical(i, j, grid)) {
                fmtstring += "b";
            }
            else if (isHorizontal(i, j, grid)) {
                fmtstring += "a";
            }
            else if (isVertical(i, j, grid)){
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
    window.addEventListener("dragenter", function(e) {
        lastTarget = e.target;
        document.querySelector(".dropzone").style.visibility = "";
        document.querySelector(".dropzone").style.opacity= 1;
    });
    
    window.addEventListener("dragleave", function(e) {
        if (e.target === lastTarget || e.target === document) {
            hideShadow();
        }
    });

    window.ondrop = function(e) {
        e.preventDefault();
        hideShadow();
        e.dataTransfer.files[0].text().then(text => Puzzle.loadNewPuzzle(text));
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