DEFAULT_PUZZLE = JSON.parse(`{ "boardData": { "metadata": { "style": "standard", "valid": true, "title": "Default Puzzle", "author": "Joel Fagliano", "uid": "0", "create_date": 1625232412540, "access_date": 1625232635084, "modify_date": 1625232608099, "copyright": "Made in DruBoard" }, "dimensions": [ 5, 5 ], "answers": [ [ "L", "O", "C", "K", null ], [ "U", "P", "S", "E", "T" ], [ "C", "A", "P", "R", "I" ], [ "A", "L", "A", "R", "M" ], [ null, null, "N", "Y", "E" ] ], "clues": { "across": [ "Guaranteed victory", "Surprise victory", "Style of calf-length pants", "Sleep spoiler", "Bill ___ the Science Guy" ], "down": [ "2021 Pixar movie set in the Italian Riviera", "Iridescent gemstone", "Channel that airs political hearings", "Actress Washington of Scandal", "It's believed to be distorted within a black hole" ] } }, "tableData": { "progstring": "_________________________", "time": null, "progPercent": "0.0%" } }`)

class User {
    static blockSave = false;
    constructor(puzzles = {0: DEFAULT_PUZZLE}, lightOn = true, currentPuzzle = 0) {
        this.puzzles = puzzles; //rxf objects
        this.lightOn = lightOn;
        this.currentPuzzle = currentPuzzle; //UID
    }


    addPuzzle(puzzle, converted=false) {
        if (!converted) {
            puzzle = puzzle.toRXF();
        }
        console.log(puzzle['boardData']['metadata'].uid)
        this.puzzles[puzzle['boardData']['metadata'].uid] = puzzle
    }

    save() {
        if (User.blockSave) return;
        this.currentPuzzle = puzzle.uid;
        this.addPuzzle(puzzle);
        localStorage.setItem("user", JSON.stringify(user));
    }

    static download(event) {
        let data = "^" + JSON.stringify(user);
        this.setAttribute("href", "data:;base64," + btoa(data));
        this.setAttribute("download", "user.ruf");
    }

    render() {
        if (!user.lightOn) {
            user.lightOn = true;
            toggleDarkMode();
        }
    }

    static loadUser(user = null) {
        user = user == null ? window.localStorage.getItem("user") : user.substring(1);
        if (user == null) {
            return new User();
        }
        user = JSON.parse(user);
        user = new User(user.puzzles, user.lightOn, user.currentPuzzle);

        return user;
    }
}
