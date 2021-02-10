var acrossClues;
var acrossNumbering = [];
var acrossIndices = [];

var downNumbering = [];
var downIndices = [];

var downClues;

var currClue;

const acrossElem = document.getElementById("across-clues");
const downElem = document.getElementById("down-clues");


function classifyClueLists() {
    acrossElem.className = "clue-list";
    downElem.className = "clue-list";
}

function updateNumbering(ch, clueNum, index) {
    switch(ch) {
        case "b":
            updateClueList(acrossClues, clueNum, index);
            updateClueList(downClues, clueNum, index);
            break;
        case "a":
            updateClueList(acrossClues, clueNum, index);
            break;
        case "d":
            updateClueList(downClues, clueNum, index);
            break;
    }
}

function updateClueList(lst, clueNum, index) {
    lst.push(clueNum);
    lst.push(index);
}


function generateClues() {
    classifyClueLists();
    for (let i = 0; i < acrossNumbering.length; i++) {
        addClue(i, acrossElem, true);
    }

    for (let i = 0; i < downNumbering.length; i++) {
        addClue(i, downElem, false);
    }
}

function addClue(i, elem, across) {
    let clues = downClues;
    let numbering = downNumbering;
    if (across) {
        clues = acrossClues;
        numbering = acrossNumbering;
    }

    let clue = document.createElement("li");
    let clueNum = document.createElement("span");
    let clueDef = document.createElement("span");

    clue.className = "clue-line"

    clueDef.innerHTML = clues[i];
    clueDef.className = "clue"

    clueNum.innerHTML = numbering[i];
    clueNum.className = "clue-label"

    clue.appendChild(clueNum);
    clue.appendChild(clueDef);
    elem.appendChild(clue);
}

