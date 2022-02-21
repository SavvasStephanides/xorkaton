import "./board.scss"
function Board({game}){
    return (
        <div id="board">
          {
            game.board.map((row) => (
              <div className="board-row">
                {
                  row.map((square) => (
                    <div className="board-row-square" flag={square.result}>{square.letter}</div>
                  ))
                }
              </div>
            ))
          }
          
         
        </div>
    )
}

export default Board