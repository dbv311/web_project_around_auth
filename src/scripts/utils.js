import { api } from "./Api.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

export const openEditButton = document.querySelector(".profile__edit-button");
export const openAddButton = document.querySelector(".profile__add-button");
export const openAvatarEdit = document.querySelector(".profile__edit-avatar");
export const popupProfile = document.querySelector(".popup_profile");
export const popupPlace = document.querySelector(".popup_place");
export const popupAvatar = document.querySelector(".popup_avatar");
export const popupCloseIcon = document.querySelectorAll(".popup__close-icon");
export const formElement = document.querySelector(".popup__content");

export const profileText = document.querySelector(".profile__text");
export const profileTitle = document.querySelector(".profile__title");

export const nameInput = formElement.querySelector(".popup__input-name");
export const aboutMeInput = formElement.querySelector(".popup__input-about");

export const placeInput = popupPlace.querySelector(".popup__input-place");
export const linkInput = popupPlace.querySelector(".popup__input-link");
export const avatarInput = popupAvatar.querySelector(".popup__input-avatar");

export const elementsArea = document.querySelector(".elements");

export const deleteCard = document.querySelector(".element__button-trash");

export const imagePopup = document.querySelector(".popup_card");

export const popupOverlays = document.querySelectorAll(".popup__overlay");

export const popupWithConfirmation = new PopupWithConfirmation(
  ".popup_confirmation"
);

export const initialCards = [
  {
    name: "Torres del Paine",
    link: "https://images.unsplash.com/photo-1596423668247-f94229f7c679?q=80&w=2781&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Glaciar Grey",
    link: "https://images.unsplash.com/photo-1539671790472-55c39141b1a7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Laguna Azul",
    link: "https://images.unsplash.com/photo-1478827121442-6450491fc0d2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Guanacos",
    link: "https://images.unsplash.com/photo-1588426657789-142b72fc41ec?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Glaciar Serrano",
    link: "https://images.unsplash.com/photo-1630890688101-535ae66a1314?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Puerto Natales",
    link: "https://images.unsplash.com/photo-1698710747402-bf1bcd890afb?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const formConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_has_error",
  errorClass: "popup__error",
};

export function closeAllModal() {
  popupProfile.classList.remove("popup_open");
  popupPlace.classList.remove("popup_open");
  imagePopup.classList.remove("popup_open");
  popupAvatar.classList.remove("popup_open");
  document.removeEventListener("keydown", handleEscPress);
}

export function handleEscPress(evt) {
  if (evt.key === "Escape") {
    closeAllModal();
  }
}

export function createCard(name, link, popupImage, likes, _id, owner, user) {
  return new Card(
    name,
    link,
    "#element-card",
    {
      handleClick: (name, link) => {
        popupImage.open(name, link);
      },
      handleDeleteCard: (cardId, callback) => {
        popupWithConfirmation.open(() => {
          return api.deleteCard(cardId).then(() => {
            callback();
          });
        });
      },
      handleAddLike: (cardId) => {
        return api.putLike(cardId);
      },
      handleDeleteLike: (cardId) => {
        return api.deleteLike(cardId);
      },
    },
    likes,
    _id,
    owner,
    user
  ).render();
}

export function handleAddCard(evt) {
  evt.preventDefault();
  const cardNode = createCard(placeInput.value, linkInput.value);
  elementsArea.prepend(cardNode);
  closeAllModal();

  placeInput.value = "";
  linkInput.value = "";
}

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileText.textContent = aboutMeInput.value;
  profileTitle.textContent = nameInput.value;
  closeAllModal();
}
