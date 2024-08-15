import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function InfoToolTips({ handleClose, open }) {
  return (
    <>
      <PopupWithForm
        handleClose={handleClose}
        open={open}
        classId={"form__register_success"}
      >
        ¡Correcto! Ya estás registrado.
      </PopupWithForm>
      <PopupWithForm
        handleClose={handleClose}
        open={open}
        classId={"form__register_wrong"}
      >
        Uy, algo salió mal. Por favor, inténtalo de nuevo.
      </PopupWithForm>
    </>
  );
}
