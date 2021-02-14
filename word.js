var currWord = null;

let validationFlag = false;


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
    // console.log(x + " " + y);
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
    let guess = getGuess(cell).innerText.toLowerCase();

    if (checkList[getIndex(cell)] == 17 * guess.charCodeAt(0)) {
        
        if (validationFlag ) {
            cell.classList.add("cell-correct");
        }
        return true;
    }
    return false;
}


function unhighlightAll() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.contains("cell") ? unhighlightCell(cells[i]) : 0;
    }
}

function validateWord(){
    if (currCell == null) {
        return;
    }
    validationFlag = true;
    applyToWord(validateCell, currCell);
}

function devalidateCell(cell) {
    if (cell == null || !cell.classList.contains("cell-correct")) {
        return;
    }
    cell.classList.remove("cell-correct");
}

function validateWordStrict(){
    if (currCell == null) {
        return;
    }
    let tracker = [true];
    validationFlag = false;
    applyToWord((cell) => {tracker[0] = validateCell(cell) && tracker[0];}, currCell);
    
    if (tracker[0]) {
        validateWord();
    }

}

function nextWord() {

}