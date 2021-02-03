
class Cell {
    constructor(n) {
        this.letter = n;
        this.correct = False;
        this.guess = '';
    }

    guess(n) {
        this.guess = n
        if (n == this.letter) {
            this.correct = True;
        }
    }
}