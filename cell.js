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
        case 27: escPress(); return;
        case 37: arrowKeyLateral(-1); //left
        case 38: arrowKeyVertical(-1)//up
        case 39: arrowKeyLateral(1);//right
        case 40: arrowKeyVertical(1); return; //down
        //please don't make fun of my switch/case code :(
    }

    if (validInput(code)) {
        inputKey(String.fromCharCode(code));
    }
}

// will put letter into the currently selected cell
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

//triggered when esc is pressed: unselects a cell if there is a selected cell
function escPress() {
    if (currCell == null) {
        return;
    }
    currCell.classList.remove("cell-selected");
    currCell = null;
}

//triggered on backspace: will delete letter of selected cell (if there is a guess on it)
function backspace() {
    if (currCell != null) {
        let guess =  getGuess(currCell);
        if (guess != null) {
            guess.innerHTML = "";
        }
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
    if (currCell == null) {
        return;
    }
    
}

//dir is -1 for up, 1 for down
function arrowKeyVertical() {

}

// returns true if code is a letter of the alphabet
function validInput(code) {
    if (code < 65 || (code >= 91 && code < 96) || code > 122) {
        return false;
    }
    return true;
}