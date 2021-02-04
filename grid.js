var cellWidth = 3;
var cellHeight = 3;

var cell_px = 40;

var format = "";

var starters = [];

const grid = document.getElementById("main-grid");

function generateCells() {

    for (var i = 0; i < cellWidth * cellHeight; i++) {
        var cell = document.createElement("div");
        cell.className = "cell";
        if (format.charAt(i) == "w") {
            starters.push(i);
        } else if (format.charAt(i) == ".") {
            cell.className = "cell-black";
        }

        cell.id = "cell" + i;
        // cell.appendChild(document.createTextNode("a"));
        grid.appendChild(cell);
    }
    labelClues();
}

function labelClues() {
    for (var i = 0; i < starters.length; i++) {
        var cell = document.getElementById("cell" + starters[i]);
        var num = document.createElement("div");
        num.appendChild(document.createTextNode(i+1));
        num.className = "cell-label";
        cell.appendChild(num);
    }

}

function loadFromString(str) {
    var template = JSON.parse(str);
    cellWidth = template.x;
    cellHeight = template.y;
    format = template.format;
}


loadFromString(`{
	"x": 3,
	"y": 3,
	"format": "wb...bwbb"
}`);

generateCells();