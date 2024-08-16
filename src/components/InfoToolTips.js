import React from "react";
import PopupWithForm from "./PopupWithForm";
import "../blocks/popup.css";

export default function InfoToolTips({ handleClose, open, isSuccess }) {
  return (
    <>
      <PopupWithForm handleClose={handleClose} open={open} classId={isSuccess}>
        <div
          className={
            isSuccess ? "popup__register_alert" : "popup__register_alert-wrong"
          }
        >
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </div>
      </PopupWithForm>
    </>
  );
}
