import Board from "./components/board/board";
import Header from "./components/header";
import Game from "./model/Game"
import WordList from "./model/WordList"
import Keyboard from "./components/keyboard/keyboard"
import Dialog from "./components/dialog/dialog"

import { useEffect, useState } from "react";

function App() {
  const wordList = new WordList()
  let wordOfTheDay = wordList.getTodaysWord()

  const [game, setGame] = useState(new Game(wordOfTheDay))
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
          showMessageOnDialog(e.message)
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
      <div id="game">
        <Header />
      
        <Board game={game} />

        {game.gameIsOver() && <button onClick={() => {
        
        navigator.clipboard.writeText(game.getBoardAsSquares())
        }}>Share</button>}

        <Keyboard
          visibility={game.gameIsOver() ? "HIDDEN" : "VISIBLE"}
          keyboardPressLetterEvent={keyboardPressLetterEvent}
          keyboardEnterPressEvent={keyboardEnterPressEvent}
          keyboardBackspacePressEvent={keyboardBackspacePressEvent} />
          
      </div>
      <Dialog visibility={dialogVisibility} message={dialogMessage} />

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
      showMessageOnDialog(e.message)
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
