const DEFAULT_PUZZLE = Puzzle.importPuzzle('*eyJtZXRhZGF0YSI6eyJ2YWxpZCI6dHJ1ZSwidGl0bGUiOiJSb3kgU3Vja3MiLCJhdXRob3IiOiJSb3kifSwiZGltZW5zaW9ucyI6WzMsNF0sImFuc3dlcnMiOltbIlIiLCJPIiwiWSJdLFtudWxsLCJJIiwiUyJdLFsiUyIsIk8iLG51bGxdLFsiQiIsIkEiLCJEIl1dLCJjbHVlcyI6eyJhY3Jvc3MiOlsiUm95IiwiSXMiLCJTbyIsIkJhZCJdLCJkb3duIjpbIk9pb2EiLCJZcyIsIlNiIl19fQ');
class User {
    constructor(puzzles=[], lightOn=true, currPuzz=DEFAULT_PUZZLE) {
        this.puzzles = puzzles;
        this.lightOn = lightOn;
        this.currentPuzzle = currPuzz;
    }

    save() {
        this.currentPuzzle = puzzle.toRXF();
        localStorage.setItem("user", JSON.stringify(this));
        console.log(JSON.parse(localStorage.getItem('user')))
    }

    static loadUser() {
        user = window.localStorage.getItem("user")
        // user = null;
        if (user == null) {
            return new User();
        }
        user = JSON.parse(user);
        user = new User(user.puzzles, user.lightOn, user.currentPuzzle);
        if (!user.lightOn) {
            user.lightOn = true;
            toggleDarkMode();
        }
        return user;
    }
}
