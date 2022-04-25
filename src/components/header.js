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
            <img src="/logo.png" alt="" style={style.logo}/>
        </header>
    )
}

export default Header