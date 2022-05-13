import "./board.scss"
function Board({game}){
  {console.log(game.cursor)}
    return (
        <div id="board">
          {
            game.board.map((row, index) => (
              <div className="board-row" highlight={game.cursor.row === index ? "1" : "0"}>
                {
                  row.map((square, index) => (
                    <div className="board-row-square" flag={square.result} highlight={game.cursor.square === index+1 ? "1" : "0"}>{square.letter}</div>
                  ))
                }
              </div>
            ))
          }
          
         
        </div>
    )
}

export default Board