import Board from "./components/board/board";
import Header from "./components/header";
import Game from "./model/Game"
import WordList from "./model/WordList"
import Keyboard from "./components/keyboard/keyboard"
import Dialog from "./components/dialog/dialog"
import WelcomeDialog from "./components/welcomeDialog/welcomeDialog";
import errorStrings from "./errorStrings.json"

import { useEffect, useState } from "react";

function App() {
  const wordList = new WordList()
  let wordOfTheDay = wordList.getTodaysWord()

  let currentGame;

  let savedGame = localStorage.getItem("xwrkle-game")
  if(savedGame){
    let gameFromLocalStorage = JSON.parse(savedGame)
    currentGame = new Game(wordOfTheDay.word, wordOfTheDay.id)
    if(gameFromLocalStorage.word === wordOfTheDay.word){
      currentGame.board = gameFromLocalStorage.board
      currentGame.cursor = gameFromLocalStorage.cursor
    }
    else{
      currentGame = new Game(wordOfTheDay.word, wordOfTheDay.id)
    }
    
  }
  else{
    currentGame = new Game(wordOfTheDay.word, wordOfTheDay.id)
  }

  const [game, setGame] = useState(currentGame)
  const [dialogVisibility, setDialogVisibility] = useState("HIDDEN")
  const [dialogMessage, setDialogMessage] = useState("")
  const [nextWordTimer, setNextWordTimer] = useState("")

  useEffect(() => {
    document.body.addEventListener("keyup", (e) => {

      if(game.gameIsOver()){
        return
      }
      if(e.code === "Enter"){
        try{
          game.checkWord()
        }
        catch(e){
          showMessageOnDialog(errorStrings[e.message])
        }
        
      }
      else if(e.code === "Backspace"){
        game.removeLetterBeforeCursor()
      }
      else if(e.code.startsWith("Key")){
        let letters = {"E":"Ε","R":"Ρ","T":"Τ","Y":"Υ","U":"Θ","I":"Ι","O":"Ο","P":"Π","A":"Α","S":"Σ","D":"Δ","F":"Φ","G":"Γ","H":"Η","J":"Ξ","K":"Κ","L":"Λ","Z":"Ζ","X":"Χ","C":"Ψ","V":"Ω","B":"Β","N":"Ν","M":"Μ"}
        let keyPressed = e.code.replace("Key", "")

        game.addLetter(letters[keyPressed])
      }

      let updatedGame = {...game}
      setGame(g => updatedGame)
    })
  }, [])

  setTimeout(() => {
    let today = new Date(new Date(Date.now()).toLocaleString("en-US", {timeZone: "EET"}))
    
    let hours = 23 - today.getHours()
    let minutes = 59 - today.getMinutes()
    let seconds = 59-today.getSeconds()

    let hoursDisplay = hours >= 10 ? hours : `0${hours}`
    let minutesDisplay = minutes >= 10 ? minutes : `0${minutes}`
    let secondsDisplay = seconds >= 10 ? seconds : `0${seconds}`

    setNextWordTimer(`${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`)
    
  }, 1000)

  return (
    <div className="App">
      {
        localStorage.setItem("xwrkle-game", JSON.stringify(game))
      }
      <div id="game">
        <Header />
      
        {game && <Board game={game} />}

        {game.gameIsOver() && <div className="postgame" style={{textAlign: "center", padding: "30px"}}>

        {game && game.getGameStatus() === "FAIL" && <div style={
          {
            "textAlign": "center"
          }
        }>
          Το σωστό χωρκόν: <span style={{fontWeight: "bold"}}>{game.word}</span>
        </div>}

        
        <div style={{"marginTop": "15px"}}>
          <div>Επόμενο χωρκό σε:</div>
          <div style={{fontSize: "30px", fontWeight: "bold"}}>{nextWordTimer}</div>
        </div>

        <button onClick={() => {
        if(navigator.share){
          navigator.share({
            text: game.getGameAsString()
          })
        }
        else{
          navigator.clipboard.writeText(game.getGameAsString())
          showMessageOnDialog("Εμπίκεν στο clipboard")
        }
        
        }} style={{"backgroundColor": "darkgreen", "color": "white", "padding": "15px", "fontSize": "15px", "marginTop": "15px"}}>Κοινοποίησε το σκόρ σου!</button>
        
        
        </div>}

        

        

        <Keyboard
          flags={game.getFlagsForLetters()}
          visibility={game.gameIsOver() ? "HIDDEN" : "VISIBLE"}
          keyboardPressLetterEvent={keyboardPressLetterEvent}
          keyboardEnterPressEvent={keyboardEnterPressEvent}
          keyboardBackspacePressEvent={keyboardBackspacePressEvent} />
          
      </div>
      <Dialog visibility={dialogVisibility} message={dialogMessage} />

      <WelcomeDialog visibility={localStorage.getItem("xwrkle-welcome-visibility")}/>

    </div>
  )

  function keyboardPressLetterEvent(character) {
    game.addLetter(character)
    setGame({ ...game })
  }

  function keyboardEnterPressEvent() {
    try{
      game.checkWord()
      setGame({ ...game })
    }
    catch(e){
      showMessageOnDialog(errorStrings[e.message])
    }
  }

  function keyboardBackspacePressEvent() {
    game.removeLetterBeforeCursor()
    setGame({ ...game })
  }

  function showMessageOnDialog(message){
    setDialogMessage(message)
    setDialogVisibility("VISIBLE")

    setTimeout(() => {
      setDialogVisibility("HIDDEN")
    }, 3000);

  }
}

export default App;
