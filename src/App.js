import Board from "./components/board/board";
import Header from "./components/header";
import Game from "./model/Game"
import Keyboard from "./components/keyboard/keyboard"
import { useState } from "react";

function App() {
  
  const [game, setGame] = useState(new Game("ΚΙΤΙ"))
  
  return (
    <div className="App">
      <div id="game">
        <Header/>

        {<Board game={game}/>}

        <Keyboard 
          keyboardPressLetterEvent={keyboardPressLetterEvent}
          keyboardEnterPressEvent={keyboardEnterPressEvent}/>
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
}

export default App;
