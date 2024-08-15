import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function EditAvatarPopup({ handleClose, open, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = "";
  }

  return (
    <PopupWithForm
      title="Cambiar foto de perfil"
      handleClose={handleClose}
      classId={"popup_avatar"}
      open={open}
      onSubmit={handleSubmit}
      buttonTitle="Guardar"
    >
      <input
        type="url"
        className="popup__input popup__input-avatar"
        placeholder="Enlace a la imagen"
        name="avatar"
        ref={avatarRef}
        required
      />
      <span className="popup__error popup__error_type_link"></span>
    </PopupWithForm>
  );
}
