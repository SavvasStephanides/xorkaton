import Game from "../../model/Game"

test("Game object contains word", () => {
    let game = new Game("MYWORD")
    expect(game.word).toBe("MYWORD")
})

test("Game board contains 5 rows", () => {
    let game = new Game("ATHIENOU")
    expect(game.board.length).toBe(5)
})

test("Each row contains empty squares the length of the word", () => {
    let game = new Game("ΑΘΗΕΝΟΥ")
    let wordLength = game.word.length

    game.board.forEach((row) => {
        expect(row.length).toBe(7)

        row.forEach((square) => {
            expect(square.letter).toBe("")
            expect(square.result).toBe("")
        })
    })
})

test("Cursor starts at 0,0", () => {
    let game = new Game("ABC")
    
    expect(game.cursor.row).toBe(0)
    expect(game.cursor.square).toBe(0)
})

test("Letter is added at cursor when addLetter is called", () => {
    let game = new Game("ΑΘΗΕΝΟΥ")

    game.addLetter("Α")
    expect(game.board[0][0].letter).toBe("Α")
    expect(game.cursor.square).toBe(1)

    expect(game.board[1][0].letter).toBe("")

    game.addLetter("Α")
    expect(game.board[0][1].letter).toBe("Α")
    expect(game.cursor.square).toBe(2)
})

test("addLetter throws Exception when cursor at end of row", () => {
    let game = new Game("ABC")
    game.addLetter("A")
    game.addLetter("B")
    game.addLetter("C")

    expect(() => game.addLetter("A")).toThrow("Cursor at end of row")
})

test("removeLetterBeforeCursor removes the letter before the cursor", () => {
    let game = new Game("ABC")
    game.addLetter("A")
    game.addLetter("B")

    game.removeLetterBeforeCursor()

    expect(game.board[0][0].letter).toBe("A")
    expect(game.board[0][1].letter).toBe("")
})

test("removeLetterBeforeCursor moves cursor back one square", () => {
    let game = new Game("ABC")
    game.addLetter("A")
    game.addLetter("B")
    game.addLetter("C")


    game.removeLetterBeforeCursor()

    expect(game.cursor.square).toBe(2)
})

test("removeLetterBeforeCursor throws error if square cursor is at 0", () => {
    let game = new Game("ABC")
    game.addLetter("A")
    game.addLetter("B")
    
    game.removeLetterBeforeCursor()
    game.removeLetterBeforeCursor()

    expect(() => game.removeLetterBeforeCursor()).toThrow("No more letters to erase")
})

test("checkWord throws exception if cursor not at end", () => {
    let game = new Game("ABC")
    game.addLetter("A")

    expect(() => game.checkWord()).toThrow("Cursor not at end of row")
})

test("checkWord does not throw exception if cursor at end", () => {
    let game = new Game("ABC")
    game.addLetter("A")
    game.addLetter("A")
    game.addLetter("A")

    expect(() => game.checkWord()).not.toThrow("Cursor not at end of row")
})

test("checkWord throws exception if word not in word list", () => {
    let game = new Game("ΑΧΝΑ")

    game.addLetter("Α")
    game.addLetter("Χ")
    game.addLetter("Ν")
    game.addLetter("Η")

    expect(() => game.checkWord()).toThrow("Word not in word list")
})

test("checkWord does not throw exception if word in word list", () => {
    let game = new Game("ΑΧΝΑ")

    game.addLetter("Α")
    game.addLetter("Χ")
    game.addLetter("Ν")
    game.addLetter("Α")

    expect(() => game.checkWord()).not.toThrow("Word not in word list")
})

test("getResultForCurrentRow highlights wrong position once", () => {
    let game = new Game("ΠΥΡΟΙ")
    
    game.addLetter("Φ")
    game.addLetter("Ι")
    game.addLetter("Λ")
    game.addLetter("Ι")
    game.addLetter("Α")

    let results = game.getResultForCurrentRow()

    expect(results[0]).toBe("WRONG")
    expect(results[1]).toBe("WRONGPOSITION")
    expect(results[2]).toBe("WRONG")
    expect(results[3]).toBe("WRONG")
    expect(results[4]).toBe("WRONG")

})

test("getResultForCurrentRow works for multiple instances of a letter", () => {
    let game = new Game("TACIT")
    game.wordList.push("TAINT")
    game.wordList.push("GAMBO")

    game.addLetter("T")
    game.addLetter("A")
    game.addLetter("I")
    game.addLetter("N")
    game.addLetter("T")

    let results = game.getResultForCurrentRow()

    expect(results[0]).toBe("CORRECT")
    expect(results[1]).toBe("CORRECT")
    expect(results[2]).toBe("WRONGPOSITION")
    expect(results[3]).toBe("WRONG")
    expect(results[4]).toBe("CORRECT")


})

test("getResultForCurrentRow gets correct results", () => {
    let game = new Game("ΛΥΣΗ")

    game.wordList.push("ΛΥΣΣ")

    game.addLetter("Λ")
    game.addLetter("Υ")
    game.addLetter("Σ")
    game.addLetter("Σ")

    let results = game.getResultForCurrentRow()

    expect(results[0]).toBe("CORRECT")
    expect(results[1]).toBe("CORRECT")
    expect(results[2]).toBe("CORRECT")
    expect(results[3]).toBe("WRONG")
})

test("checkWord populates the board with correct results", () => {
    let game = new Game("ΛΥΣΗ")

    game.wordList.push("ΛΥΣΣ")

    game.addLetter("Λ")
    game.addLetter("Υ")
    game.addLetter("Σ")
    game.addLetter("Σ")

    game.checkWord()

    game.board[0][0].letter = "Λ"  
    game.board[0][0].result = "CORRECT"

    game.board[0][0].letter = "Υ"  
    game.board[0][0].result = "CORRECT"

    game.board[0][0].letter = "Σ" 
    game.board[0][0].result = "CORRECT"

    game.board[0][0].letter = "Σ"  
    game.board[0][0].result = "WRONG"
})

test("checkWord moves cursor to next row if guess is incorrect", () => {
    let game = new Game("ΛΥΣΗ")

    game.wordList.push("ΛΥΣΣ")


    game.addLetter("Λ")
    game.addLetter("Υ")
    game.addLetter("Σ")
    game.addLetter("Σ")

    game.checkWord()

    expect(game.cursor.row).toBe(1)
    expect(game.cursor.square).toBe(0)
})

test("gameIsOver returns true if all letters of current row are correct", () => {
    let game = new Game("ABCD")
    game.wordList.push("ABCD")

    game.addLetter("A")
    game.addLetter("B")
    game.addLetter("C")
    game.addLetter("D")

    game.checkWord()

    expect(game.gameIsOver()).toBe(true)
})

test("gameIsOver returns false for wrong guess", () => {
    let game = new Game("ABCD")
    game.wordList.push("ABCD")
    game.wordList.push("ABCE")

    game.addLetter("A")
    game.addLetter("B")
    game.addLetter("C")
    game.addLetter("E")

    game.checkWord()

    expect(game.gameIsOver()).toBe(false)
})

test("gameIsOver returns true when row cursor is at the end of the board", () => {
    let game = new Game("AB")
    game.wordList.push("AC")
    game.wordList.push("AC")
    
    for(let i = 0 ; i < game.board.length; i++){
        game.addLetter("A")
        game.addLetter("C")
        game.checkWord()
    }
    

    expect(game.gameIsOver()).toBe(true)
})