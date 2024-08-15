import React from "react";

export default function PopupWithForm({
  open,
  handleClose,
  classId,
  title,
  children,
  onSubmit,
  buttonTitle,
}) {
  return (
    <div className={`popup ${classId} ${open ? "popup_open" : ""}`}>
      <div className="popup__overlay"></div>
      <div className="popup__content">
        <form className="popup__form" onSubmit={onSubmit}>
          <button
            type="button"
            onClick={handleClose}
            className="popup__close-icon"
          ></button>
          <h2 className="popup__edit">{title}</h2>
          {children}
          <button type="submit" className="popup__button">
            {buttonTitle}
          </button>
        </form>
      </div>
    </div>
  );
}
