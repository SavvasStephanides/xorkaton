function WordList(){
    this.getTodaysWord = () => {
        let today = new Date(new Date(Date.now()).toLocaleString("en-US", {timeZone: "EET"}))

        return this.getAllWords().find((word) => {
            let dateForWord = new Date(word.date)

            return dateForWord.getDate() === today.getDate()
                && dateForWord.getMonth() === today.getMonth()
                && dateForWord.getFullYear() === today.getFullYear()
        })
    }

    this.wordIsInList = (word) => {
        return this.getAllWords().map(word => word.word).includes(word)
    }

    this.getAllWords = () => {
        return require("./wordlist.json")
    }
}

export default WordList