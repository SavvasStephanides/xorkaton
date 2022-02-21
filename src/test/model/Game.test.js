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

test("checkWord returns true for correct word guess", () => {
    let game = new Game("ΛΥΣΗ")

    game.addLetter("Λ")
    game.addLetter("Υ")
    game.addLetter("Σ")
    game.addLetter("Η")

    let check = game.checkWord()

    expect(check.correctWord).toBe(true)
})

test("checkWord returns false for incorrect word guess", () => {
    let game = new Game("ΛΥΣΗ")

    game.wordList.push("ΛΥΣΣ")


    game.addLetter("Λ")
    game.addLetter("Υ")
    game.addLetter("Σ")
    game.addLetter("Σ")

    let check = game.checkWord()

    expect(check.correctWord).toBe(false)
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