import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function InfoToolTips({ handleClose, open, isSuccess }) {
  return (
    <>
      <PopupWithForm
        handleClose={handleClose}
        open={open}
        classId={isSuccess ? "form__register_success" : "form__register_wrong"}
      >
        {isSuccess
          ? "¡Correcto! Ya estás registrado."
          : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
      </PopupWithForm>
    </>
  );
}
