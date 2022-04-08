import "./welcomeDialog.scss"

function WelcomeDialog({visibility}){
    return(
        <div id="welcome-dialog" visibility={visibility}>
            <button className="close-button" onClick={() => {
                document.querySelector("#welcome-dialog").setAttribute("visibility", 0)
                localStorage.setItem("xwrkle-welcome-visibility", 0)
            }}>X</button>
            <p>Μάντεψε το <b>Κυπριακό χωρκό ή πόλη</b> σε έξι προσπάθειες.</p>
            <p>Κάθε προσπάθεια πρέπει ναν χωρκό ή πόλη που υπάρχει στην Κύπρο.</p>
            <p>Μετά που κάθε προσπάθεια, τα χρώματα στα κουτούθκια αλλάσσουν για να δείκσουν πόσο εκόντεψες στη λέξη.</p>
            <hr/>

            <h2>Παραδείγματα</h2>

            <div className="tiles">
                <div className="tile">Π</div>
                <div className="tile">Υ</div>
                <div className="tile">Ρ</div>
                <div className="tile" style={{backgroundColor: "darkgreen", color: "white"}}>Ο</div>
                <div className="tile">Ι</div>
            </div>

            <p>Το γράμμα Ο εν μέσ' τη λέξη, στη σωστή θέση</p>

            <div className="tiles">
                <div className="tile">Π</div>
                <div className="tile" style={{backgroundColor: "#daa520", color: "white"}}>Υ</div>
                <div className="tile">Ρ</div>
                <div className="tile">Ο</div>
                <div className="tile">Ι</div>
            </div>

            <p>Το γράμμα Υ εν μέσ' τη λέξη, αλλά στη λάθος θέση</p>

            <div className="tiles">
                <div className="tile" style={{backgroundColor: "#333", color: "white"}}>Π</div>
                <div className="tile">Υ</div>
                <div className="tile">Ρ</div>
                <div className="tile">Ο</div>
                <div className="tile">Ι</div>
            </div>

            <p>Το γράμμα Π έννεν μες τη λέξη</p>


            <hr/>

            <p><b>Τζενούρκο χωρκό κάθε μέρα!</b></p>


        </div>
    )
}

export default WelcomeDialog