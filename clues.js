var acrossClues;
var acrossNumbering = [];
var downNumbering = [];
var downClues;

const acrossElem = document.getElementById("across-clues");
const downElem = document.getElementById("down-clues");


function classifyClueLists() {
    acrossElem.className = "clue-list";
    downElem.className = "clue-list";
}

function updateNumbering(ch, i) {
    switch(ch) {
        case "b":
            acrossNumbering.push(i);
            downNumbering.push(i);
            break;
        case "a":
            acrossNumbering.push(i);
            break;
        case "d":
            downNumbering.push(i);
            break;
    }
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