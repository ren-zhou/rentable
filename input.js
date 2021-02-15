function loadEXF(exf) {
    data = JSON.parse(atob(exf.slice(1)));

    if (!data[0].valid) {
        alert("invalid exf! may be some issues.");
    }
    [gridWidth, gridHeight] = data[1]
    
    format = data[2].toLowerCase();

    acrossClues = data[3];
    downClues = data[4];

    checkList = [];
    for (let i = 0; i < format.length; i++) {
        checkList.push(format.charCodeAt(i) * 17);
    }
    format = makefmt(format);
    localStorage.setItem("source", exf);
    updateTitleAuthor(data[0].title,data[0].author);
    
}

function loadNewEXF(exf) {
    loadEXF(exf);
    localStorage.removeItem("answers");
    clearClues();
    removeChildren(grid);
    generate();

}


function isBlocked(x, y, grid) {
    return (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight || grid[x][y] == "0");
}


function isHorizontal(x, y, grid) {
    return isBlocked(x-1, y, grid) && !isBlocked(x+1, y, grid);
}

function isVertical(x, y, grid) {
    return isBlocked(x, y-1, grid) && !isBlocked(x, y+1, grid);
}

function makefmt(wordstring) {
    
    let fmtstring = "";
    let grid = [];
    for (let i = 0; i < gridWidth; i++) {
        grid.push([]);
    }
    let i = 0
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            grid[x][y] = wordstring[i];
            i++
        }
    }

    for (let j = 0; j < gridHeight; j++) {

        for (let i = 0; i < gridWidth; i++) {
            if (grid[i][j] == "0") {
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
        e.dataTransfer.files[0].text().then(text => loadNewEXF(text));
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