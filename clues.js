var acrossClues;
var acrossNumbering;
var acrossIndices;

var downNumbering;
var downIndices;

var downClues;

var currClue;

const acrossElem = document.getElementById("across-clues");
const downElem = document.getElementById("down-clues");

function clearClues() {
    removeChildren(acrossElem);
    removeChildren(downElem);
    acrossNumbering = [];
    acrossIndices = [];
    downNumbering = [];
    downIndices = [];
}

function classifyClueLists() {
    acrossElem.className = "clue-list";
    downElem.className = "clue-list";
}

function updateNumbering(ch, clueNum, index) {
    if (ch == 'b' || ch == 'a') {
        acrossNumbering.push(clueNum);
        acrossIndices.push(index);
    }
    if (ch == 'b' || ch == 'd') {
        downNumbering.push(clueNum);
        downIndices.push(index);
    }
}



function generateClues() {
    concatLengths();
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

function concatLengths() {
    return;
    let re = /\(\d+(,( ){0,1}\d+)*\)$/;
    for (let i in acrossClues) {
        if(!re.test(acrossClues[i])) {
            acrossClues[i] = acrossClues[i].concat(" ()");
        }
    }
}