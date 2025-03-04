import { useState } from "react";
import "./postGame.scss"

function PostGame({game, showMessageOnDialog}){

    return (<div className="postgame" style={{textAlign: "center", padding: "30px"}}>
        <a href="/unpezable" style={{display: "block", backgroundColor: "white", width: "300px", margin: "auto", padding: "6px 12px", marginBottom: "25px", textDecoration: "none", color: "black", fontWeight: "bold", borderRadius: "15px", boxShadow: "0 0 15px #aaa"}}>Άρεσε σου το Χώρκατον; Δε τα άλλα μας παιχνίθκια! ❤️</a>
        {game && <CorrectWordPane word={game.word} gameStatus={game.getGameStatus()} />}
        <NextWordTimer />
        <ShareButton shareText={game.getGameAsString()} showMessageOnDialog={showMessageOnDialog}/>
    </div>)
}

function CorrectWordPane({word, gameStatus}){
    return(<div className="correct-word">
        <div>
            {gameStatus === "SUCCESS" ? "🎉" : "😤"} Το σωστό χωρκόν: <span style={{fontWeight: "bold"}}>{word}</span>
        </div>
        <div style={{marginTop: "6px"}}>
            <a href={`https://www.google.com/maps/place/${word},+Cyprus`}>Μάθε περισσότερα!</a>
        </div>
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
