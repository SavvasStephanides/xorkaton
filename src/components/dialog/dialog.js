import "./dialog.scss"

function Dialog({visibility, message}){
    return(
        <div id="dialog" visibility={visibility}>
            {message}
        </div>
    )
}

export default Dialog
