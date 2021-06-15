const bar = document.getElementById("nav-bar");
let titleText;
let collapseWidth = '65px';
let fullWidth = '250px';
let drublink = 'https://djghosh13.github.io/druboard/creator/';
let lastUID = 0;
const light_theme = {
    '--main-background-color': 'white',
    '--bar-color': '#ffd260',
    '--cell-border-color': 'black',
    '--cell-background-color': 'white',
    '--cell-highlighted-color': '#c9ebff',
    '--cell-selected-color': '#ffde8c',
    '--correct-guess-color': '#295bff',
    '--text-color': 'black',
    '--clue-background': 'none',
    '--cell-black-color': 'black',
    '--clue-background-image': 'none',
    '--main-background-image': 'none',
    '--dummy-color': '#f0f0f0'
};

const disco_theme = {
    '--main-background-color': '#261c50',
    '--bar-color': '#da4694',
    '--cell-border-color': '#ed31a0',
    '--cell-background-color': '#1f126e',
    '--cell-highlighted-color': '#636caf',
    '--cell-selected-color': '#6c53a0',
    '--correct-guess-color': '#e16b81',
    '--text-color': '#f5cd2e',
    '--clue-background': 'rgba(0,0,0,0.5)',
    '--cell-black-color': 'none',
    '--clue-background-image': 'linear-gradient(#14115e, #3c2a5c,#3c2a5c)',
    '--main-background-image': 'linear-gradient( #0f0f51, #672ed9, #fa5bde)',
    '--dummy-color': '#242d5f'
};

function updateTitleAuthor(title, author) {
    if (titleText == undefined) {
        titleText = document.createElement("div");
        titleText.className = "title";
        bar.appendChild(titleText);
    }
    titleText.onclick = toggleDarkMode;
    titleText.innerText = title + " by " + author;
}


function toggleDarkMode() {
    let theme = user.lightOn ? disco_theme : light_theme;
    user.lightOn = !user.lightOn;
    for (let k in theme) {
        document.documentElement.style.setProperty(k, theme[k]);
    }

}

function addButton(className, f, elem, graphic) {
    let b = document.createElement("div");
    b.onclick = f;
    b.className = className;
    b.style.backgroundImage = graphic;
    elem.appendChild(b);
    return b;
}

function res(filename) {
    return `url(./res/${filename})`;
}

function makeSideBar() {
    let sb = document.getElementById("side-bar");
    document.documentElement.style.setProperty("--bar-width", collapseWidth);
    sb.onmouseenter = updatePuzzleList;
    sb.onmouseleave = restorePuzzle;
}

function restorePuzzle() {
    Puzzle.loadNewPuzzle(user.puzzles[lastUID]);
    document.getElementById("puzzle-list").innerHTML = "";
}

function updatePuzzleList() {
    let lst = document.getElementById("puzzle-list");
    user.save();
    lastUID = user.currentPuzzle;
    for (let uid in user.puzzles) {
        let item = document.createElement("div");
        item.className = "puzzle-item";
        let p = user.puzzles[uid];
        item.onmouseenter = () => Puzzle.loadNewPuzzle(user.puzzles[uid]);
        item.onclick = () => {lastUID = uid};
        lst.appendChild(item);
        item.innerText = p['boardData']['metadata'].title + "progress is: " + p['tableData'].progPercent;
    }
}
