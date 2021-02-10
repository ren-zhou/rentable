var currWord = null;


function applyToWord(func, cell) {

    if (cell == null) {
        console.log("why was there a null cell passed to applyToWord");
    }
    let index = getIndex(cell);
    let [cellx, celly] = getXY(index);
    if (inputAcross) {
        applyUtility(func, cellx, celly, -1, 0);
        applyUtility(func, cellx + 1, celly, 1, 0);
    } else {
        applyUtility(func, cellx, celly, 0, -1);
        applyUtility(func, cellx, celly + 1, 0, 1);
    }
}

function highlightWord(cell) {
    unhighlightAll();
    applyToWord(highlightCell, cell);
}

function applyUtility(func, x, y, xincr, yincr) {
    let cell = getCell(x, y);
    if (cell == null) {
        return;
    }
    func(cell);
    applyUtility(func, x + xincr, y+yincr, xincr, yincr);
}


function highlightCell(cell) {
    if (cell == null) {
        console.log("oh no");
    }
    cell.classList.add('cell-highlighted');
}

function unhighlightCell(cell) {
    if (cell == null) {
        console.log("oh no while unhighlighting");
        return;
    }
    if (cell.classList.contains("cell-highlighted")) {
        cell.classList.remove("cell-highlighted");
    }

}

function validateCell(cell) {
    let guess = getGuess(cell).toLowerCase();
    if (checkList[getIndex(cell)] == 17 * guess.charCodeAt(0)) {
        cell.classList.add("cell-correct");
    }
}


function getGuess(cell) {
    for (let i = 0; i < cell.children.length; i++) {
        if (cell.children[i].classList.contains("guess")) {
            return cell.children[i].innerText;
        }
    }
}

function unhighlightAll() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.contains("cell") ? unhighlightCell(cells[i]) : 0;
    }
}

function validateWord(e){
    if (currCell == null) {
        return;
    }
    applyToWord(validateCell, currCell);
}

function nextWord() {

}