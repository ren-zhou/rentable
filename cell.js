var currCell = null;

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
        inputAcross = !inputAcross;
        selectCell(cell);
        return;
    }
    cell.classList.add("cell-selected");
    highlightWord(cell);
    if (currCell != null) {
        currCell.classList.remove("cell-selected");
    }

    currCell = cell;
}

function deselectCurrent() {
    if (currCell == null) {
        return;
    }
    currCell.classList.remove("cell-selected");
    unhighlightAll();
    currCell = null;
}

function keyInput(event) {

    let code = event.keyCode;
    // console.log(code);
    if (currCell == null) {
        return;
    }
    if ([37, 38, 39, 40].includes(code)) {
        event.preventDefault();
    }
    switch(code) {
        case 8: return backspace();
        case 13: return enterPress();
        case 9:
        case 11: return tabPress();
        case 27: return escPress();
        case 37: return arrowKeyLateral(-1); //left
        case 38: return arrowKeyVertical(-1)//up
        case 39: return arrowKeyLateral(1);//right
        case 40: return arrowKeyVertical(1);//down
    }
    if (event.ctrlKey) {
        return;
    }

    if (validInput(code)) {
        inputLetter(String.fromCharCode(code));
    }
}


function inputLetter(letter) {

    for (let i = 0; i < currCell.children.length; i++) {
        if (currCell.children[i].classList.contains("guess")) {
            if (currCell.classList.contains("cell-correct")) {
                console.log('why');
                devalidateCell(currCell);
            }
            currCell.children[i].innerHTML = letter;
            answers[getIndex(currCell)] = letter;
            saveProgress();
            advanceCell();
            return;
        }
    }
    console.log('should never get here');
    // let text = document.createElement("text");
    // text.innerHTML = letter;
    // text.classList.add("guess");
    // currCell.appendChild(text);
    // advanceCell();
}



function advanceCell() {
    inputAcross ? arrowKeyLateral(1) : arrowKeyVertical(1);
}

function retreatCell() {
    inputAcross ? arrowKeyLateral(-1) : arrowKeyVertical(-1);
}

//triggered when esc is pressed: unselects a cell if there is a selected cell
function escPress() {
    deselectCurrent();
}

//triggered on backspace: will delete letter of selected cell (if there is a guess on it)
function backspace() {
    if (currCell == null) {
        return;
    }
    if (getGuess(currCell).innerText == "") {
        retreatCell();
        clearGuess(currCell);
    } else {
        clearGuess(currCell);
        retreatCell();
    }
}

function clearGuess(cell) {
    if (cell == null) {
        return;
    }
    let guess =  getGuess(currCell);
    if (guess != null) {
        guess.innerHTML = "";
        answers[getIndex(cell)] = "";
        saveProgress();
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
}

function tabPress() {
    console.log("tab");
}


//dir is -1 for left, 1 for right
function arrowKeyLateral(dir) {
    inputAcross = true;
    moveSelection(dir, 1);

}

function validIndex(index) {
    return index >= 0 && index < gridWidth * gridHeight;
}

//dir is -1 for up, 1 for down
function arrowKeyVertical(dir) {
    inputAcross = false;
    moveSelection(dir, gridWidth);

}

function moveSelection(dir, stride) {
    if (currCell == null) {
        return;
    }
    let index = getIndex(currCell);
    index += dir * stride;
    while ( validIndex(index) && !cells[index].classList.contains("cell") ) {
        index += dir * stride;
    }
    if (validIndex(index)) {
        selectCell(cells[index]);
    }
}

// returns true if code is a letter of the alphabet
function validInput(code) {
    if (code < 65 || (code >= 91 && code < 96) || code > 122) {
        return false;
    }
    return true;
}

function getCell(x, y) {
    if (x >= gridWidth || y >= gridHeight || x < 0 || y < 0) {
        return null;
    }

    let cell = cells[y*gridWidth + x];
    if (cell.classList.contains("cell-black")) {
        return null;
    }
    return cell;
}

function getIndex(cell) {
    return parseInt(cell.getAttribute("data-id"));
}

function getXY(index) {
    return [index % gridWidth, Math.floor(index/gridWidth)];
}
