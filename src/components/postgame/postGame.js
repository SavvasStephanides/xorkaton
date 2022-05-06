import { useState } from "react";
import "./postGame.scss"

function PostGame({game, showMessageOnDialog}){

    return (<div className="postgame" style={{textAlign: "center", padding: "30px"}}>

        {game && game.getGameStatus() === "FAIL" && <CorrectWordPane word={game.word} />}
        <NextWordTimer />
        <ShareButton shareText={game.getGameAsString()} showMessageOnDialog={showMessageOnDialog}/>
    </div>)
}

function CorrectWordPane({word}){
    return(<div className="correct-word">
        Το σωστό χωρκόν: <span style={{fontWeight: "bold"}}>{word}</span>
      </div>)
}

function NextWordTimer(){
    const [nextWordTimer, setNextWordTimer] = useState("")

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


    return(<div style={{"marginTop": "15px"}}>
    <div>Επόμενο χωρκό σε:</div>
    <div style={{fontSize: "30px", fontWeight: "bold"}}>{nextWordTimer}</div>
  </div>)
}

function ShareButton({shareText, showMessageOnDialog}){
    return(<button onClick={() => {
        if(navigator.share){
          navigator.share({
            text: shareText
          })
        }
        else{
          navigator.clipboard.writeText(shareText)
          showMessageOnDialog("Εμπίκεν στο clipboard")
        }
        
        }} style={{"backgroundColor": "darkgreen", "color": "white", "padding": "15px", "fontSize": "15px", "marginTop": "15px"}}>Κοινοποίησε το σκόρ σου!
        </button>
    )
}

export default PostGame
