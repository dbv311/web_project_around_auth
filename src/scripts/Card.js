export default class Card {
  constructor(
    name,
    link,
    templateSelector,
    { handleClick, handleDeleteCard, handleDeleteLike, handleAddLike },
    likes,
    _id,
    owner,
    user
  ) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleClick = handleClick;
    this._likes = likes;
    this._handleDeleteCard = handleDeleteCard;
    this._handleDeleteLike = handleDeleteLike;
    this._handleAddLike = handleAddLike;
    this._id = _id;
    this._owner = owner;
    this._user = user;
  }

  _hasLikeUser() {
    return this._likes.some((like) => like._id === this._user._id);
  }

  _isCardOwner() {
    return this._owner._id === this._user._id;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    const templateNode = template.content.querySelector(".element");
    const cardNode = templateNode.cloneNode(true);

    cardNode.querySelector(".element__image").src = this._link;
    cardNode.querySelector(".element__image").alt = "Imagen de " + this._name;
    cardNode.querySelector(".element__text").textContent = this._name;
    cardNode
      .querySelector(".element__button-trash")
      .addEventListener("click", () => {
        this._handleDeleteCard(this._id, () => {
          cardNode.remove();
        });
      });
    if (this._likes) {
      cardNode.querySelector(".element__counter").textContent =
        this._likes.length;
    }
    if (!this._isCardOwner()) {
      cardNode.querySelector(".element__button-trash").remove();
    }
    const likeButton = cardNode.querySelector(".element__button-like");
    if (this._hasLikeUser()) {
      likeButton.classList.add("element__button-like_active");
    }
    return cardNode;
  }

  _setEventListeners(cardNode) {
    const likeButton = cardNode.querySelector(".element__button-like");

    likeButton.addEventListener("click", () => {
      if (this._hasLikeUser()) {
        this._handleDeleteLike(this._id).then((card) => {
          this._likes = card.likes;
          cardNode.querySelector(".element__counter").textContent =
            this._likes.length;
          likeButton.classList.remove("element__button-like_active");
        });
      } else {
        this._handleAddLike(this._id).then((card) => {
          this._likes = card.likes;
          cardNode.querySelector(".element__counter").textContent =
            this._likes.length;
          likeButton.classList.add("element__button-like_active");
        });
      }
    });

    cardNode.querySelector(".element__image").addEventListener("click", () => {
      this._handleClick(this._name, this._link);
    });
  }

  render() {
    const node = this._getTemplate();
    this._setEventListeners(node);
    return node;
  }
}
