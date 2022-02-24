import "./keyboard.scss"
function Keyboard({
    visibility,
    keyboardPressLetterEvent, 
    keyboardEnterPressEvent, 
    keyboardBackspacePressEvent}){
    let keys = [
        "Ε Ρ Τ Υ Θ Ι Ο Π",
        "Α Σ Δ Φ Γ Η Ξ Κ Λ",
        "Ζ Χ Ψ Ω Β Ν Μ"
      ]

    return (
    <div id="keyboard" visibility={visibility}>
        {
            keys.map((keyRow) => (
                <div className="keyboard-row">
                    {
                    keyRow.split(" ").map((keyButton) => (
                    <button className="keyboard-key" onClick={() => keyboardPressLetterEvent(keyButton)}>
                        {keyButton}
                    </button>)
                    )}
                </div>
            ))
        }
        <div className="keyboard-row">
            <button className="keyboard-key" onClick={keyboardEnterPressEvent}>!</button>
            <button className="keyboard-key" onClick={keyboardBackspacePressEvent}>/</button>
        </div>
    </div>
    
    )
}

export default Keyboard