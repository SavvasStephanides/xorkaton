function Header(){
    const headerStyle = {
        backgroundColor: "green",
        height: "60px",
        display: "flex"
    }
    const siteNameStyle = {
        margin: "auto",
        color: "white",
        fontFamily: "sans-serif",
        fontSize: "30px"
    }
    return (
        <header style={headerStyle}>
          <div className="site-name" style={siteNameStyle}>Χωρκle</div>
        </header>
    )
}

export default Header