import logo from "../images/logo.png";
import "../blocks/header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="logo around the us" className="header__logo" />
      <p className="header__register">
        <Link to="login" className="header__login">
          Inicia sesión
        </Link>
        <Link to="register" className="header__register">
          Regístrate
        </Link>
      </p>
      <span className="header__divider"></span>
    </header>
  );
}

export default Header;
