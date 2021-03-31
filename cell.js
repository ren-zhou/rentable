function hoverCell(cell) {
    if(cell.classList.contains("cell")) {
        cell.classList.add("cell-hovered");
    }
}

function unhoverCell(cell) {
    if(cell.classList.contains("cell-hovered")) {
        cell.classList.remove("cell-hovered");
    }
}

function selectCell(cell) {
    if (!cell.classList.contains("cell")) {
        console.log("why was not-cell selected");
        return;
    }
    if (cell.classList.contains("cell-selected")) {
        deselectCurrent();
        smartSwitch(cell);
        selectCell(cell);
        return;
    }
    cell.classList.add("cell-selected");
    puzzle.inputAcross = smartDirection(cell);
    highlightClueFromCell(cell);
    highlightWord(cell);
    if (puzzle.currCell != null) {
        puzzle.currCell.classList.remove("cell-selected");
    }
    puzzle.currCell = cell;
}

function smartDirection(cell) {
    if (cell.getAttribute('data-down') > 0 && cell.getAttribute('data-across') > 0) return puzzle.inputAcross;
    return cell.getAttribute('data-down') < 0;
}

function downNum(cell) {
    return Number.parseInt(cell.getAttribute('data-down'));
}

function acrossNum(cell) {
    return Number.parseInt(cell.getAttribute('data-across'));
}

function smartSwitch(cell) {
    if (downNum(cell)> 0 && acrossNum(cell)> 0) {
        puzzle.inputAcross = !puzzle.inputAcross;
        return;
    }
    puzzle.inputAcross = (downNum(cell) < 0);
//     if (puzzle.inputAcross) {
//         puzzle.inputAcross = cell.getAttribute('data-down') < 0 ? true : false;
//     } else {
//         puzzle.inputAcross = cell.getAttribute('data-across') < 0 ? false: true;
//     }
}

function deselectCurrent() {
    if (puzzle.currCell == null) {
        return;
    }
    puzzle.currCell.classList.remove("cell-selected");
    unhighlightAll();
    puzzle.currCell = null;
}

function keyInput(event) {
    if (puzzle.currCell == null) {
        return;
    }
    if (event.ctrlKey) {
        return;
    }
    if (event.code.startsWith("Arrow")) {
        event.preventDefault();
    }
    switch (event.code) {
        case "Backspace": return backspace();
        case "Delete": return clearGuess(puzzle.currCell);
        case "Enter": return enterPress();
        case "Tab": return tabPress();
        case "Escape": return escPress();
        case "ArrowLeft": return arrowKeyLateral(-1); // Left
        case "ArrowUp": return arrowKeyVertical(-1); // Up
        case "ArrowRight": return arrowKeyLateral(1); // Right
        case "ArrowDown": return arrowKeyVertical(1); // Down
    }
    if (validInput(event.key)) {
        inputLetter(event.key.toUpperCase());
    }
}

function cellCorrect(cell) {
    let guess = getGuess(cell);
    if (guess == null) {
        return true;
    }
    return (puzzle.checkList[getIndex(cell)] == 17 * guess.innerText.toLowerCase().charCodeAt(0));
}

function inputLetter(letter) {
    for (let i = 0; i < puzzle.currCell.children.length; i++) {
        if (puzzle.currCell.children[i].classList.contains("guess")) {
            if (puzzle.currCell.classList.contains("cell-correct")) {
                devalidateCell(puzzle.currCell);
            }
            puzzle.currCell.children[i].innerHTML = letter;
            advanceCell();
            return;
        }
    }
    console.log('should never get here');
}


// Makes the passed in cell a starter cell: has across/down data attributes with clue num
function turnToStarter(cell, across, down, clueNum) {
    let num = document.createElement("text");
    num.innerHTML= clueNum;
    num.className = "cell-label";
    cell.prepend(num);
    across ?  cell.setAttribute("data-across", clueNum) : cell.setAttribute("data-across", -1);
    down ? cell.setAttribute("data-down", clueNum) : cell.setAttribute("data-down", -1) ;
}



function advanceCell() {
    puzzle.inputAcross ? arrowKeyLateral(1) : arrowKeyVertical(1);
}

function retreatCell() {
    puzzle.inputAcross ? arrowKeyLateral(-1) : arrowKeyVertical(-1);
}

//triggered when esc is pressed: unselects a cell if there is a selected cell
function escPress() {
    deselectCurrent();
}

//triggered on backspace: will delete letter of selected cell (if there is a guess on it)
function backspace() {
    if (puzzle.currCell == null) {
        return;
    }
    if (getGuess(puzzle.currCell).innerText == "") {
        retreatCell();
        clearGuess(puzzle.currCell);
    } else {
        clearGuess(puzzle.currCell);
        retreatCell();
    }
}

function clearGuess(cell) {
    if (cell == null || cell.classList.contains("cell-correct")) {
        return;
    }
    let guess =  getGuess(puzzle.currCell);
    if (guess != null) {
        guess.innerHTML = "";
    }
}

// returns the guess element of a cell or null if there is no guess on this cell
function getGuess(cell) {
    for (let i = 0; i < cell.children.length; i++) {
        if (cell.children[i].classList.contains("guess")) {
            return cell.children[i];
        }
    }
    return null;
}

function enterPress() {
    console.log("enter");
    console.log(user.save());
}

function tabPress() {
    console.log("tab");
}


//dir is -1 for left, 1 for right
function arrowKeyLateral(dir) {
    if (puzzle.inputAcross) {
        moveSelection(dir, 1);
    } else {
        moveSelection(dir, 0);
    }
}

//dir is -1 for up, 1 for down
function arrowKeyVertical(dir) {
    if (!puzzle.inputAcross) {
        moveSelection(dir, puzzle.gridWidth);
    } else {
        moveSelection(dir, 0);
    }
}
function validIndex(index) {
    return index >= 0 && index < puzzle.gridWidth * puzzle.gridHeight;
}

function moveSelection(dir, stride) {
    if (puzzle.currCell == null) {
        return;
    }
    let index = getIndex(puzzle.currCell);
    index += dir * stride;
    while (validIndex(index) && !puzzle.cells[index].classList.contains("cell")) {
        index += dir * stride;
    }
    if (validIndex(index)) {
        selectCell(puzzle.cells[index]);
    }
}

// returns true if key is a letter of the alphabet
function validInput(key) {
    const pattern = /^[A-Za-z]$/;
    return pattern.test(key);
}

function getCell(x, y) {
    if (x >= puzzle.gridWidth || y >= puzzle.gridHeight || x < 0 || y < 0) {
        return null;
    }

    let cell = puzzle.cells[y*puzzle.gridWidth + x];
    if (cell.classList.contains("cell-black")) {
        return null;
    }
    return cell;
}

function getIndex(cell) {
    return parseInt(cell.getAttribute("data-id"));
}

function getXY(index) {
    return [index % puzzle.gridWidth, Math.floor(index/puzzle.gridWidth)];
}
