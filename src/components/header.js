function Header(){
    const style = {
        header: {
            height: "60px",
            display: "flex"
        },
        logo: {
            display: "block",
            height: "72px",
            margin: "auto",
            marginTop: "12px"
        }
    }

    return (
        <header style={style.header}>
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="" style={style.logo}/>
            <a href="mailto:savvascyp@hotmail.com" style={{
                "display": "block",
                "position": "absolute",
                top: "30px",
                right: "6px",
                textAlign: "center"
            }}>Contact<br/> developer</a>
        </header>
    )
}

export default Header