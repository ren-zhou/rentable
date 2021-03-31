const acrossElem = document.getElementById("across-clues");
const downElem = document.getElementById("down-clues");
var prevClue = null;

function clearClues() {
    removeChildren(acrossElem);
    removeChildren(downElem);
}

function addClue(across, num, text) {

    let clue = document.createElement("li");
    let clueNum = document.createElement("span");
    let clueDef = document.createElement("span");

    clue.className = "clue-item"
    clue.setAttribute("data-clue-num", num);

    clue.onclick = function() {selectClue(this, across)};

    clueDef.innerHTML = text;
    clueDef.className = "clue-content"

    clueNum.innerHTML = num;
    clueNum.className = "clue-num"

    clue.appendChild(clueNum);
    clue.appendChild(clueDef);
    
    elem = across ? acrossElem : downElem;
    elem.appendChild(clue);
}

function concatLengths() {
    return;
    let re = /\(\d+(,( ){0,1}\d+)*\)$/;
    for (let i in acrossClues) {
        if(!re.test(acrossClues[i])) {
            acrossClues[i] = acrossClues[i].concat(" ()");
        }
    }
}

function highlightClueFromCell(cell) {
    let across = smartDirection(cell);
    let lst = across? acrossElem : downElem;
    let number = across? acrossNum(cell) : downNum(cell);
    if (number < 0) {
        console.log ('invalid thing happened with cell');
    }


    for (let clue of lst.childNodes) {
        if (numOfClue(clue) == number) {
            highlightClue(clue);
            return;
        }
    }
}

function highlightClue(clue) {
    if (prevClue != null) {
        prevClue.classList.remove("clue-selected");
    }
    clue.classList.add("clue-selected");
    prevClue = clue;
}

function numOfClue(clue) {
    return Number.parseInt(clue.getAttribute("data-clue-num"));
}

function selectClue(clue, across) {
    let num = across? acrossNum : downNum;
    puzzle.inputAcross = across;
    let clueNum = numOfClue(clue);
    for (let cell of puzzle.cells) {
        if (num(cell) == clueNum) {
            selectCell(cell);
            highlightClue(clue);
            return;
        }
    }
}