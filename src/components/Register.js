import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as auth from "../auth.js";
import "../blocks/register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((email, password)) {
      auth
        .register(email, password)
        .then((res) => console.log(res))
        .catch(console.log);
    }
  };

  return (
    <>
      <div className="register">
        <p className="register__welcome">Regístrate</p>
        <form className="register__form">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            required
            name="email"
            type="email"
            className="register__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <span className="register__divider"></span>
          <label htmlFor="password">Contraseña</label>
          <input
            required
            name="password"
            type="password"
            minLength="8"
            maxLength="15"
            className="register__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <span className="register__divider"></span>
          <div className="register__button">
            <button
              type="submit"
              className="register__link"
              onClick={handleSubmit}
            >
              Regístrate
            </button>
          </div>
        </form>
        <div className="register__signin">
          <p>¿Ya eres miembro?</p>
          <Link to="login" className="register__login-link">
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </>
  );
}
