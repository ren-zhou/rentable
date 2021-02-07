var gridWidth = 0;
var gridHeight = 0;

var cell_px = 40;

var format = "";

var starters = [];
var cells  = [];


const grid = document.getElementById("main-grid");

function updateCSS() {
    document.documentElement.style.setProperty('--cell-size', cell_px + "px");
    document.documentElement.style.setProperty('--x-dim', gridWidth);
    document.documentElement.style.setProperty('--y-dim', gridHeight);
}

function generateCells() {
    updateCSS();
    document.addEventListener("keydown", keyInput);

    let word = ["a", "d", "b"]
    let clueNum = 1;
    for (var i = 0; i < gridWidth * gridHeight; i++) {
        var cell = document.createElement("div");
        cell.className = "cell";


        if (format.charAt(i) == ".") {
            cell.className = "cell-black";
        } else {
            if (word.includes(format.charAt(i))) {
                starters.push(i);
                updateNumbering(format.charAt(i), clueNum);
                clueNum++;
            }
            cell.onmouseover = function() {hoverCell(this)};
            cell.onmouseout= function() {unhoverCell(this)};
            cell.onclick = function() {selectCell(this)};

        }

        cell.id = "cell" + i;
        // cell.setAttribute("data-row", Math.floor(i/gridWidth));
        // cell.setAttribute("data-col", i % gridWidth);
        cell.setAttribute("data-id", i);
        grid.appendChild(cell);
        cells.push(cell);
    }
    labelClues();
}

function labelClues() {
    for (var i = 0; i < starters.length; i++) {
        var cell = document.getElementById("cell" + starters[i]);
        var num = document.createElement("text");
        num.innerHTML= i+1;
        num.className = "cell-label";
        cell.prepend(num);
    }

}

function loadFromString(str) {
    var template = JSON.parse(str);
    gridWidth = template.x;
    gridHeight = template.y;
    format = template.format;
    acrossClues = template.acrossClues;
    downClues = template.downClues;
}





