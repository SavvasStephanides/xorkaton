import Board from "./components/board/board";
import Header from "./components/header";
import Game from "./model/Game"
import WordList from "./model/WordList"
import Keyboard from "./components/keyboard/keyboard"
import Dialog from "./components/dialog/dialog"
import WelcomeDialog from "./components/welcomeDialog/welcomeDialog";
import errorStrings from "./errorStrings.json"

import { useEffect, useState } from "react";
import PostGame from "./components/postgame/postGame";

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

  return (
    <div className="App">
      {
        localStorage.setItem("xwrkle-game", JSON.stringify(game))
      }
      <div id="game">
        <Header />
      
        {game && <Board game={game} />}

        {game.gameIsOver() && <PostGame game={game} showMessageOnDialog={showMessageOnDialog}/>}

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
