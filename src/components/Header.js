import logo from "../images/logo.png";
import "../blocks/header.css";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="logo around the us" className="header__logo" />
      <span className="header__divider"></span>
    </header>
  );
}

export default Header;
