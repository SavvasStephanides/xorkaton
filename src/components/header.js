function Header(){
    const style = {
        header: {
            height: "60px",
            display: "flex"
        },
        logo: {
            display: "block",
            height: "60px",
            margin: "auto",
            transform: "rotate(-6deg)",
            marginTop: "12px"
        }
    }

    return (
        <header style={style.header}>
            <img src="/logo.png" alt="" style={style.logo}/>
          {/* <div className="site-name" style={style.siteName}>Χωρκle</div> */}
        </header>
    )
}

export default Header