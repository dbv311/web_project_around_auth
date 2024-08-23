import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ open, handleClose, onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(getInputValues(event.target));
  };

  const getInputValues = (form) => {
    const inputValues = {};
    const inputForms = Array.from(form.elements);
    inputForms.forEach((element) => {
      if (element.name) {
        inputValues[element.name] = element.value;
      }
    });
    return inputValues;
  };

  return (
    <PopupWithForm
      title="Nuevo Lugar"
      handleClose={handleClose}
      classId={"popup_place"}
      open={open}
      onSubmit={handleSubmit}
      buttonTitle="Guardar"
    >
      <input
        type="text"
        minLength="2"
        maxLength="30"
        className="popup__input popup__input-place"
        placeholder="Titulo"
        name="name"
        required
      />
      <span className="popup__error popup__error_type_place"></span>
      <input
        type="url"
        className="popup__input popup__input-link"
        placeholder="Enlace a la imagen"
        name="link"
        required
      />
      <span className="popup__error popup__error_type_link"></span>
    </PopupWithForm>
  );
}
