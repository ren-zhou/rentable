DEFAULT_PUZZLE = JSON.parse(`{"boardData":{"metadata":{"style":"standard","valid":true,"title":"Just a Word","author":"Lauren Zhou","uid": "0"},"dimensions":[7,7],"answers":[["C","O","L","O","N","L",null],["O",null,"A","L","O","E",null],["N",null,"C","E","N","T","S"],["E","D","O",null,"Z","S","I"],["S","I","N","C","E",null,"G"],[null,"P","I","E","R",null,"H"],[null,"S","C","O","O","P","S"]],"clues":{"across":["Poorly-spoken General makes a face","Plant drink full of nothing","12-across argues for change","Messily-sung poem makes time for Japan","RGB pieces start zero-sum investments","Seeing that erroneous English error signifier","Landing that is swamped by public relations","Breaking News: Roy\'s Berkeley status mingles with fictional security foundation"],"down":["Turned 2-down describes these turned pastry","Incoherent Berkeley logo doesn\'t speak a lot.","Silly gamer hell gets old","No French love possible with chance","Authorizes Eastern entry into stable release.","Expresses disappointment from sightseeing without readying in golf.","And IP security yields sinks","Leader calls everyone over first"]}},"tableData":{"progstring":"_________________________________________________","time":null,"progPercent":"0.0%"}}`)

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
