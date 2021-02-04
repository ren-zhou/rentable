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
        console.log("why was not cell selected");
        return;
    }
    cell.classList.add("cell-selected");
    if (currCell != null) {
        currCell.classList.remove("cell-selected");
    }
    currCell = cell;
}

function keyInput(event) {

    let code = event.keyCode;
    console.log(code);
    if (currCell == null) {
        return;
    }
    switch(code) {
        case 8: backspace(); return;
        case 13: enterPress(); return;
        case 9:
        case 11: tabPress(); return;
        case 37:
        case 38:
        case 39:
        case 40: arrowKey(); return;
        //please don't make fun of my switch/case code :(
    }

    if (validInput(code)) {
        inputKey(String.fromCharCode(code));
    }
}

function inputKey(letter) {

    for (let i = 0; i < currCell.children.length; i++) {
        if (currCell.children[i].classList.contains("guess")) {
            currCell.children[i].innerHTML = letter;
            return;
        }
    }
    let text = document.createElement("text");
    text.innerHTML = letter;
    text.classList.add("guess");
    currCell.appendChild(text);
}


function backspace() {
    console.log("backspace");
}

function enterPress() {
    console.log("enter");
}

function tabPress() {
    console.log("tab");
}

function arrowKey() {
    console.log("arrow");
}


function validInput(code) {
    if (code < 65 || (code >= 91 && code < 61) || code > 122) {
        return false;
    }
    return true;
}