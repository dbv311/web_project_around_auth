import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../utils/auth.js";
import "../blocks/login.css";

export default function Login({ setIsLoggedIn, email, setEmail }) {
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          history.push("/home");
        }
      })
      .catch(console.log);
  };

  return (
    <>
      <div className="login">
        <p className="login__welcome">Inicia sesión</p>
        <form className="login_info" onSubmit={handleSubmit}>
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
            <button type="submit" className="login__link">
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
