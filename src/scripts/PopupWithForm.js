import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    const popupOpen = document.querySelector(this._popupSelector);
    const form = popupOpen.querySelector("form");
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      popupOpen.querySelector("form");
      popupOpen.querySelector(".popup__button").textContent = "Guardando...";
      this._handleSubmit(this.getInputValues()).then(() => {
        popupOpen.querySelector(".popup__button").textContent = "Guardar";
        this.close();
      });
    });
  }

  getInputValues() {
    const popupOpen = document.querySelector(this._popupSelector);
    const form = popupOpen.querySelector("form");
    const inputValues = {};
    const inputForms = Array.from(form.elements);
    inputForms.forEach((element) => {
      if (element.name) {
        inputValues[element.name] = element.value;
      }
    });
    return inputValues;
  }
  close() {
    super.close();
    const popupOpen = document.querySelector(this._popupSelector);
    const form = popupOpen.querySelector("form");
    form.reset();
  }
}
