import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({
  name,
  link,
  handleCardClick,
  handleDeleteCard,
  handleCardLike,
  likes,
  _id,
  owner,
}) {
  const user = React.useContext(CurrentUserContext);

  const hasLikeUser = () => {
    return likes.some((like) => like._id === user._id);
  };

  const isCardOwner = () => {
    return owner._id === user._id;
  };

  const handleClick = () => {
    handleCardClick({ name, link, _id });
  };

  const onDeleteCard = () => {
    handleDeleteCard({ _id });
  };

  function handleLike() {
    handleCardLike({ _id }, hasLikeUser());
  }

  return (
    <div className="element">
      <div className="element__overlay"></div>
      <div className="element__picture">
        <img
          alt={name}
          className="element__image"
          src={link}
          onClick={handleClick}
        />
        {isCardOwner() && (
          <button
            type="button"
            className="element__button-trash"
            onClick={onDeleteCard}
          ></button>
        )}
      </div>
      <div className="element__info">
        <p className="element__text">{name}</p>
        <div className="element__pic">
          <button
            type="button"
            onClick={handleLike}
            className={`element__button-like ${
              hasLikeUser() ? "element__button-like_active" : " "
            }`}
          ></button>
          <p className="element__counter">{likes.length}</p>
        </div>
      </div>
    </div>
  );
}
