import WordList from "../../model/WordList"
const sinon = require("sinon")

test("getTodaysWord returns todays word", () => {
    const wordList = new WordList()

    sinon.replace(wordList, 'getAllWords', sinon.fake.returns(require("./mockwordlist.json")))
    sinon.replace(Date, 'now', sinon.fake.returns(new Date("2000/01/01")))

    expect(wordList.getTodaysWord()).toBe("ΠΥΡΟΙ")

    sinon.reset();

})

test("wordIsInList returns true if word exists", () => {
    const wordList = new WordList()

    sinon.replace(wordList, 'getAllWords', sinon.fake.returns(require("./mockwordlist.json")))

    expect(wordList.wordIsInList("ΠΥΡΟΙ")).toBe(true)

    sinon.reset();

})

test("wordIsInList returns false if word doesn't exist in word list", () => {
    const wordList = new WordList()

    sinon.replace(wordList, 'getAllWords', sinon.fake.returns(require("./mockwordlist.json")))

    expect(wordList.wordIsInList("ΜΗΛΙΑ")).toBe(false)

    sinon.reset();

})