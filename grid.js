var gridWidth = 0;
var gridHeight = 0;

var cell_px = 40;

var format = "";

var starters = [];
var cells  = [];

var inputAcross = true;
var checkList;

var answers = [];


const grid = document.getElementById("main-grid");

function updateCSS() {
    document.documentElement.style.setProperty('--cell-size', cell_px + "px");
    document.documentElement.style.setProperty('--x-dim', gridWidth);
    document.documentElement.style.setProperty('--y-dim', gridHeight);
} 

function generateCells() {
    makeAnswers();
    updateCSS();
    makeShittyValidate();
    makeShittyClear();
    document.addEventListener("keydown", keyInput);

    let word = ["a", "d", "b"]
    let clueNum = 1;
    for (let i = 0; i < gridWidth * gridHeight; i++) {
        let cell = document.createElement("div");
        cell.className = "cell";


        if (format.charAt(i) == ".") {
            cell.className = "cell-black";
        } else {
            if (word.includes(format.charAt(i))) {
                starters.push(i);
                updateNumbering(format.charAt(i), clueNum, i);
                clueNum++;
            }
            cell.onmouseover = function() {hoverCell(this)};
            cell.onmouseout= function() {unhoverCell(this)};
            cell.onclick = function() {selectCell(this)};
            addGuess(cell);

        }

        cell.id = "cell" + i;
        // cell.setAttribute("data-row", Math.floor(i/gridWidth));
        // cell.setAttribute("data-col", i % gridWidth);
        cell.setAttribute("data-id", i);
        grid.appendChild(cell);
        cells.push(cell);
    }
    labelClues();
    loadProgress();
}

function makeShittyValidate() {
    let button = document.createElement("button");
    button.onclick = function() {validateWordStrict()};
    button.innerHTML = "shitty validate";
    document.body.appendChild(button);
}

function makeShittyClear() {
    let button = document.createElement("button");
    button.onclick = function() {clearGrid()};
    button.innerHTML = "clear";
    document.body.appendChild(button);
}

function addGuess(cell) {
    let text = document.createElement("text");
    text.innerHTML = "";
    text.classList.add("guess");
    cell.appendChild(text);
}

function labelClues() {
    for (let i = 0; i < starters.length; i++) {
        let cell = document.getElementById("cell" + starters[i]);
        let num = document.createElement("text");
        num.innerHTML= i+1;
        num.className = "cell-label";
        cell.prepend(num);
    }

}

function loadFromString(str) {
    let template = JSON.parse(str);
    gridWidth = template.x;
    gridHeight = template.y;
    format = template.format;
    acrossClues = template.acrossClues;
    downClues = template.downClues;
    checkList = template.checkList;
    
}

function loadProgress() {
    let progress = localStorage.getItem("answers");
    // console.log(progress);
    progress = JSON.parse(progress);
    if (progress == null || progress.length < gridWidth*gridHeight) {
        return;
    }
    for (let i = 0; i < gridWidth*gridHeight; i++) {
        if (cells[i].classList.contains("cell")) {
            getGuess(cells[i]).innerText = progress[i];
            answers[i] = progress[i];
        }

    }
}

function makeAnswers() {
    for (let i = 0; i < gridWidth*gridHeight; i++) {
        answers.push(" ")
    }
}

function saveProgress() {
    // console.log(JSON.stringify(answers));
    localStorage.setItem("answers", JSON.stringify(answers));
}

function clearGrid() {
    for (let i = 0; i < gridWidth*gridHeight; i++) {
        if (cells[i].classList.contains("cell")) {
            getGuess(cells[i]).innerText = "";
        }
        answers[i] = "";
    }
    saveProgress();
}
