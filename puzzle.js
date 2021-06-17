const styles = ["standard", "new-yorker"];
var Puzzle = class {
    constructor(boardData, time = 0, progress = "") {
        if (!boardData['metadata'].valid) {
            // alert("Invalid puzzle imported.");
        }
        this.gridWidth = boardData['dimensions'][0];
        this.gridHeight = boardData['dimensions'][1];
        this.style = boardData['metadata'].style == null ? 'standard' : boardData['metadata'].style;
        this.uid = boardData['metadata'].uid;

        if (this.style == "new-yorker") {
            this.gridWidth = 2 * this.gridWidth - 1;
            this.gridHeight = 2 * this.gridHeight - 1;
        }
        let format = boardData['answers'].map((x) => x.map((x) => x ? x.toLowerCase() : x));

        this.acrossClues = boardData['clues']['across'];
        this.downClues = boardData['clues']['down'];

        this.checkList = this.makeCheckList(format, this.style);

        this.startTime = new Date().getTime();

        this.structure = makefmt(format, this.gridWidth, this.gridHeight, this.style, { 'border-x': boardData['border-x'], 'border-y': boardData['border-y'] });
        this.time = time;
        this.inputAcross = true;
        this.currCell = null;
        this.cells = [];
        this.acrossNumbering = [];
        this.downNumbering = [];
        this.acrossIndices = [];
        this.downIndices = [];
        this.cell_px = 40 / (this.visualWidth() / 15);
        this.cell_px = this.cell_px > 80 ? 80 : this.cell_px < 30 ? 30 : this.cell_px;
        if (this.style == "new-yorker") {
            this.cell_px *= .9;
        }

        this.exf = '*' + btoa(JSON.stringify(boardData));

        this.title = boardData['metadata'].title;
        this.author = boardData['metadata'].author;
        this.progress = progress;

        updateTitleAuthor(this.title, this.author);
    }

    makeCheckList(format, style = "standard") {
        let checkList = [];
        let convert = (x) => x;
        if (style == "new-yorker") {
            convert = (x) => Math.floor(x / 2);
        }
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                checkList.push(Puzzle.charCodeOrNull(format[convert(y)][convert(x)]));
            }
        }
        return checkList;
    }

    static charCodeOrNull(c) {
        if (c != null) {
            return c.charCodeAt(0) * 17;
        }
        return null;
    }

    render() {
        Puzzle.unloadPuzzle();
        this.generateCells();
        this.updateCSS();
    }


    generateCells() {
        let clueNum = 1;
        let acrossNums = [];
        let downNums = [];
        let grid = document.getElementById("main-grid");
        grid.classList.add(this.style);
        for (let i = 0; i < this.gridWidth * this.gridHeight; i++) {
            let cell = document.createElement("div");
            let type = this.structure.charAt(i);

            if (black.includes(type)) {
                cell.className = "cell-black";
                if (type == "-") {
                } else if (type == "|") {
                }
                switch (type) {
                    case '-':
                        cell.classList.add("horizontal-block");
                        break;
                    case '|':
                        cell.classList.add("vertical-block");
                        break;
                    case '+':
                        cell.classList.add("horizontal-block");
                        cell.classList.add("vertical-block");
                        break;
                }
            } else {
                cell.className = "cell";
                if (type === "*") {
                    cell.classList.add("cell-dummy");
                }
                switch (type) {
                    case 'b':
                        turnToStarter(cell, true, true, clueNum);
                        acrossNums.push(clueNum); downNums.push(clueNum);
                        break;
                    case 'a':
                        turnToStarter(cell, true, false, clueNum);
                        acrossNums.push(clueNum);
                        break;
                    case 'd':
                        turnToStarter(cell, false, true, clueNum);
                        downNums.push(clueNum);
                        break;
                    default:
                        cell.setAttribute("data-across", -1);
                        cell.setAttribute("data-down", -1);
                        clueNum--;
                }
                clueNum++;

                cell.onclick = function () { selectCell(this) };
                Puzzle.addGuess(cell);

            }

            cell.setAttribute("data-id", i);
            grid.appendChild(cell);
            this.cells.push(cell);
        }
        this.labelClues(acrossNums, downNums);
        this.associateCells(acrossNums, downNums);
        this.loadProgress(this.progress);
    }

    // makes it so that each cell is labeled with the clues that it corresponds to
    associateCells(acrossNums, downNums) {
        for (let num of acrossNums) {
            applyToWord((c) => c.setAttribute("data-across", num),
                this.findAcrossCell(num));
        }
        this.inputAcross = false;
        for (let num of downNums) {
            applyToWord((c) => c.setAttribute("data-down", num),
                this.findDownCell(num));
        }
        this.inputAcross = true;
    }

    findAcrossCell(acrossNum) {
        for (let cell of this.cells) {
            if (cell != null && cell.getAttribute("data-across") == acrossNum) {
                return cell;
            }
        }
        return null;
    }

    findDownCell(downNum) {
        for (let cell of this.cells) {
            if (cell != null && cell.getAttribute("data-down") == downNum) {
                return cell;
            }
        }
        return null;
    }

    labelClues(acrossNums, downNums) {
        for (let i in acrossNums) {
            addClue(true, acrossNums[i], this.acrossClues[i]);
        }
        for (let i in downNums) {
            addClue(false, downNums[i], this.downClues[i]);
        }
    }

    // clears guesses from grid
    clearGrid() {
        for (let i = 0; i < puzzle.gridWidth * puzzle.gridHeight; i++) {
            if (puzzle.cells[i].classList.contains("cell")) {
                getGuess(puzzle.cells[i]).innerText = "";
            }
        }
    }

    static addGuess(cell) {
        let text = document.createElement("text");
        text.innerHTML = "";
        text.classList.add("guess");
        cell.appendChild(text);
    }

    hardClear() {
        localStorage.clear();
        User.blockSave = true;;
    }

    // Progress is a string
    loadProgress(progress) {
        for (let i = 0; i < progress.length; i++) {
            if ((/[a-z]|[A-Z]/).test(progress.charAt(i))) {
                getGuess(this.cells[i]).innerText = progress.charAt(i).toUpperCase();
            }
            if ((/[A-Z]/).test(progress.charAt(i))) {
                this.cells[i].classList.add("cell-correct");
            }
        }
    }

    static download(event) {
        let rxf = puzzle.toRXF();
        rxf = "~" + btoa(JSON.stringify(rxf));
        let filename = puzzle.title + ".rxf";
        this.setAttribute("href", "data:;base64," + btoa(rxf));
        this.setAttribute("download", filename);
    }

    static unloadPuzzle() {
        let grid = document.getElementById("main-grid");
        removeChildren(grid);
        clearClues();
        for (let style of styles) {
            grid.classList.remove(style);
        }

    }

    toRXF() {
        let ps = this.progstring();
        return {
            boardData: JSON.parse(atob(this.exf.slice(1))), tableData: {
                progstring: ps,
                time: this.getTime(),
                complete: this.complete,
                progPercent: this.progPercent(ps)
            }
        };
    }

    // total cells filled out of total possible cells to fill
    progPercent(progstring) {
        let proportion = progstring.replaceAll(/[_|\*]/g, "").length / this.structure.replaceAll(/[*\-|\.0\+]/g, "").length;
        return (proportion * 100).toFixed(1) + "%"
    }

    visualWidth() {
        return (this.style == "standard") ? this.gridWidth : (this.gridWidth + 1) / 2
    }

    visualHeight() {
        return (this.style == "standard") ? this.gridHeight : (this.gridHeight + 1) / 2
    }

    // Generate a progress string from this Puzzle
    progstring() {
        let ps = "";
        for (let cell of this.cells) {
            ps += Puzzle.progCharFromCell(cell);
        }
        return ps;
    }

    getTime() {
        return this.time + new Date().getTime - this.startTime;
    }

    // returns whether every cell is correct
    complete() {
        for (let c of this.cells) {
            if (!cellCorrect(c)) {
                return false;
            }
        }
        console.log("complete");
        return true;
    }

    // Gives the character stored by the progress string
    static progCharFromCell(cell) {
        if (cell.classList.contains("cell-black")) {
            return "_";
        } else if (isDummy(cell)) {
            return "*"
        } else if (cell.classList.contains("cell-correct")) {
            return getGuess(cell).innerText.toUpperCase();
        } else {
            if (getGuess(cell).innerText == "") return "_";
            return getGuess(cell).innerText.toLowerCase();
        }

    }

    // Load puzzle from drag and drop
    static loadNewPuzzle(input) {
        user.save();
        if (input == null || input == undefined) {
            console.log("null puzzle")
            return false;
        }
        if (typeof input == "string") {
            puzzle = Puzzle.importPuzzle(input);
        } else {
            puzzle = Puzzle.importTable(input);
        }
        puzzle.render();
        return true
    }

    // Handles any valid import passed in as text
    static importPuzzle(text) {
        if (text.startsWith('*')) { // exf
            text = atob(text.slice(1));
        } else if (text.startsWith('~')) { // rxf
            return Puzzle.importTable(JSON.parse(atob(text.slice(1))));
        } else if (!text.startsWith("{")) { // only other valid option is JSON
            alert("Invalid file format. Accepted formats are exf, rxf, and JSON.");
        }
        return new Puzzle(JSON.parse(text));
    }

    // boardData and tableData passed in as objects
    static importTable(RXFObj) {
        // user.addPuzzle(RXFObj, true)
        return new Puzzle(RXFObj['boardData'], RXFObj['tableData']['time'], RXFObj['tableData']['progstring']);
    }

    updateCSS() {
        document.documentElement.style.setProperty('--cell-size', this.cell_px + "px");
        document.documentElement.style.setProperty('--x-dim', this.visualWidth());
        document.documentElement.style.setProperty('--y-dim', this.visualHeight());
    }
}