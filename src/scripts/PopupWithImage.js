import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }
  open(name, link) {
    super.open();
    const popupOpen = document.querySelector(this._popupSelector);

    popupOpen.querySelector(".popup__image").setAttribute("alt", name);
    popupOpen.querySelector(".popup__image").setAttribute("src", link);
    popupOpen.querySelector(".popup__title").textContent = name;
  }
  setEventListeners() {
    super.setEventListeners();
  }
}
