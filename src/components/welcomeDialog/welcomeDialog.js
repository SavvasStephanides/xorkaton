import "./welcomeDialog.scss"

function WelcomeDialog({visibility}){
    return(
        <div id="welcome-dialog" visibility={visibility}>
            <button className="close-button" onClick={() => {
                document.querySelector("#welcome-dialog").setAttribute("visibility", 0)
                localStorage.setItem("xwrkle-welcome-visibility", 0)
            }}>X</button>
            <p>Guess the <b>Cypriot village</b> or city in six tries.</p>
            <p>Each guess must be an existing village or city in Cyprus</p>
            <p>After each guess, the colour of the tiles will change to show how close your guess was to the word</p>
            
            <hr/>

            <h2>Examples</h2>

            <div className="tiles">
                <div className="tile">Π</div>
                <div className="tile">Υ</div>
                <div className="tile">Ρ</div>
                <div className="tile" style={{backgroundColor: "darkgreen", color: "white"}}>Ο</div>
                <div className="tile">Ι</div>
            </div>

            <p>The letter O is in the word and in the correct spot</p>

            <div className="tiles">
                <div className="tile">Π</div>
                <div className="tile">Υ</div>
                <div className="tile">Ρ</div>
                <div className="tile" style={{backgroundColor: "#daa520", color: "white"}}>Ο</div>
                <div className="tile">Ι</div>
            </div>

            <p>The letter Υ is in the word but in the wrong spot</p>

            <div className="tiles">
                <div className="tile" style={{backgroundColor: "#333", color: "white"}}>Π</div>
                <div className="tile">Υ</div>
                <div className="tile">Ρ</div>
                <div className="tile">Ο</div>
                <div className="tile">Ι</div>
            </div>

            <p>The letter Π doesn't exist in the word.</p>

            <hr/>

            <p><b>A new village will be available each day!</b></p>


        </div>
    )
}

export default WelcomeDialog