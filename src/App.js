import Board from "./components/board/board";
import Header from "./components/header";
import Game from "./model/Game"
import Keyboard from "./components/keyboard/keyboard"
import { useState } from "react";

function App() {
  
  const [game, setGame] = useState(new Game("ΠΥΡΟΙ"))
  
  return (
    <div className="App">
      {console.log(game.gameIsOver())}
      
      <div id="game">
        <Header/>

        <Board game={game}/>

        <Keyboard 
          visibility={game.gameIsOver() ? "0" : "1"}
          keyboardPressLetterEvent={keyboardPressLetterEvent}
          keyboardEnterPressEvent={keyboardEnterPressEvent}
          keyboardBackspacePressEvent={keyboardBackspacePressEvent}/>
      </div>
    
    </div>
  )

  function keyboardPressLetterEvent(character){
    game.addLetter(character)
    setGame({...game})
  }

  function keyboardEnterPressEvent(){
    game.checkWord()
    setGame({...game})
  }

  function keyboardBackspacePressEvent(){
    game.removeLetterBeforeCursor()
    setGame({...game})
  }
}

export default App;
