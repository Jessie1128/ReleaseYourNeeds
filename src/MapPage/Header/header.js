import './header.css'

const Header = () =>{
    return (
        <div className="header-outside-frame">
            <div className="header">
                <div className="title">Release Your Needs</div>
                <div className="menu">
                    <input className="menu-search-bar" placeholder='搜尋想找的地區'></input>
                    <div className="menu-inner">登陸</div>
                </div>
            </div>
        </div>
    )
}

export default Header