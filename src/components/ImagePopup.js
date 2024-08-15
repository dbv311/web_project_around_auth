export default function ImagePopup({
  classId,
  open,
  handleClose,
  selectedCard,
}) {
  return (
    <div className={`popup ${classId} ${open ? "popup_open" : ""}`}>
      <div className="popup__overlay"></div>
      <div className="popup__content">
        <button
          type="button"
          onClick={handleClose}
          className="popup__close-icon"
        ></button>
        <img
          className="popup__image"
          src={selectedCard.link}
          alt={selectedCard.name}
        />
        <p className="popup__title">{selectedCard.name}</p>
      </div>
    </div>
  );
}
