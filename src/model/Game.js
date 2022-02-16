function Game(word){
    this.word = word

    this.wordList = [
        "ΑΘΗΕΝΟΥ",
        "ΑΧΝΑ",
        "ΛΕΥΚΩΣΙΑ"
    ]

    this.board = Array(5).fill(Array(word.length).fill(""))

    this.cursor = {
        row: 0,
        square: 0
    }

    this.addLetter = (letter) => {

        if(this.cursor.square >= this.word.length){
            throw "Cursor at end of row"
        }

        this.board[this.cursor.row][this.cursor.square] = letter
        this.cursor.square++
    }
}

export default Game