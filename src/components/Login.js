import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as auth from "../auth.js";
import "../blocks/login.css";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    auth
      .login(email, password)
      .then((res) => {
        console.log(res);
        setIsLoggedIn(true);
      })
      .catch(console.log);
  };

  return (
    <>
      <div className="login">
        <p className="login__welcome">Inicia sesión</p>
        <form className="login_info">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            required
            name="email"
            type="email"
            className="login__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <span className="login__divider"></span>
          <label htmlFor="password">Contraseña</label>
          <input
            required
            name="password"
            type="password"
            className="login__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <span className="login__divider"></span>
          <div className="login__button">
            <button
              type="submit"
              className="login__link"
              handleSubmit={handleSubmit}
            >
              Inicia sesión
            </button>
          </div>
        </form>
        <div className="login__signup">
          <p>¿Aún no eres miembro? </p>
          <Link to="register" className="login__signup-link">
            Registrate aquí
          </Link>
        </div>
      </div>
    </>
  );
}
