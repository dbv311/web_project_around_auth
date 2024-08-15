import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import React from "react";

export default function EditProfilePopup({ handleClose, open, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Editar Perfil"
      handleClose={handleClose}
      classId={"popup_profile"}
      open={open}
      onSubmit={handleSubmit}
      buttonTitle="Guardar"
    >
      <>
        <input
          type="text"
          minLength="2"
          maxLength="40"
          className="popup__input popup__input-name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          name="name"
          value={name}
          required
        />
        <span className="popup__error popup__error_type_name"></span>
        <input
          type="text"
          minLength="2"
          maxLength="200"
          className="popup__input popup__input-about"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Acerca de mi"
          name="about"
          value={description}
          required
        />
        <span className="popup__error popup__error_type_about"></span>
      </>
    </PopupWithForm>
  );
}
