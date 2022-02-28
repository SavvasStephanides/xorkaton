import Board from "./components/board/board";
import Header from "./components/header";
import Game from "./model/Game"
import Keyboard from "./components/keyboard/keyboard"
import { useEffect, useState } from "react";

function App() {

  const [game, setGame] = useState(new Game("ΠΥΡΟΙ"))

  useEffect(() => {
    document.body.addEventListener("keyup", (e) => {

      if(game.gameIsOver()){
        return
      }
      if(e.code === "Enter"){
        game.checkWord()
      }
      else if(e.code === "Backspace"){
        game.removeLetterBeforeCursor()
      }
      else if(e.code.startsWith("Key")){
        let letters = {"E":"Ε","R":"Ρ","T":"Τ","Y":"Υ","U":"Θ","I":"Ι","O":"Ο","P":"Π","A":"Α","S":"Σ","D":"Δ","F":"Φ","G":"Γ","H":"Η","J":"Ξ","K":"Κ","L":"Λ","Z":"Ζ","X":"Χ","C":"Ψ","V":"Ω","B":"Β","N":"Ν","M":"Μ"}
        let keyPressed = e.code.replace("Key", "")

        game.addLetter(letters[keyPressed])
      }

      setGame({...game})
    })
  }, [])

  return (
    <div className="App">
      <div id="game">
        <Header />

        <Board game={game} />

        <Keyboard
          visibility={game.gameIsOver() ? "HIDDEN" : "VISIBLE"}
          keyboardPressLetterEvent={keyboardPressLetterEvent}
          keyboardEnterPressEvent={keyboardEnterPressEvent}
          keyboardBackspacePressEvent={keyboardBackspacePressEvent} />
      </div>

    </div>
  )

  function keyboardPressLetterEvent(character) {
    game.addLetter(character)
    setGame({ ...game })
  }

  function keyboardEnterPressEvent() {
    game.checkWord()
    setGame({ ...game })
  }

  function keyboardBackspacePressEvent() {
    game.removeLetterBeforeCursor()
    setGame({ ...game })
  }
}

export default App;
