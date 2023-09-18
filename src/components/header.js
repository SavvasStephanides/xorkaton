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
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfQejpGGov9zA0wWYfVy7HGMeOA9lv0eQYYBupOdmymqtmPsw/viewform?usp=sf_link" style={{
                "display": "block",
                "position": "absolute",
                top: "30px",
                right: "6px",
                textAlign: "center"
            }}>Contact</a>
        </header>
    )
}

export default Header
