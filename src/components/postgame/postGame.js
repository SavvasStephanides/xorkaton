import { useState } from "react";
import "./postGame.scss"

function PostGame({game, showMessageOnDialog}){

    return (<div className="postgame" style={{textAlign: "center", padding: "30px"}}>

        {game && game.getGameStatus() === "FAIL" && <CorrectWordPane word={game.word} />}
        <NextWordTimer />
        <ShareButton shareText={game.getGameAsString()} showMessageOnDialog={showMessageOnDialog}/>
        <div className="coffee">
            ❤️ Αρέσκει σου το Χώρκατον; <a href="https://buymeacoffee.com/SavvasStephnds" target="_blank">Τζιέρασε καφέ! ☕️</a>
        </div>
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


    return(<div className="next-word-timer">
    <div>Επόμενο χωρκό σε:</div>
    <div className="timer">{nextWordTimer}</div>
  </div>)
}

function ShareButton({shareText, showMessageOnDialog}){
    return(<button className="share-button" onClick={() => share(shareText, showMessageOnDialog)}>
        Μοιράσου το σκόρ σου!
    </button>
    )
}

function share(text, showMessageOnDialog){
    if(navigator.share){
        navigator.share({
            text: text
        })
    }
    else{
        navigator.clipboard.writeText(text)
        showMessageOnDialog("Εμπίκεν στο clipboard")
    }
}

export default PostGame
