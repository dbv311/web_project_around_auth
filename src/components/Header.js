import logo from "../images/logo.png";
import "../blocks/header.css";
import { Link, useLocation } from "react-router-dom";

function Header({ isLoggedIn }) {
  const location = useLocation();

  return (
    <header className="header">
      <img src={logo} alt="logo around the us" className="header__logo" />
      <p className="header__register">
        {!isLoggedIn &&
          (location.pathname === "/login" ? (
            <Link to="register" className="header__register">
              Regístrate
            </Link>
          ) : (
            <Link to="login" className="header__login">
              Inicia sesión
            </Link>
          ))}
        {isLoggedIn && (
          <Link to="login" className="header__login">
            Cerrar sesión
          </Link>
        )}
      </p>

      <span className="header__divider"></span>
    </header>
  );
}

export default Header;
