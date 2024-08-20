import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import React from "react";
import api from "../utils/api";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/Login";
import Register from "../components/Register";
import * as auth from "../auth.js";

function App() {
  const [isPopupProfileOpen, setPopupProfileOpen] = React.useState(false);
  const [isPopupAddPlace, setPopupAddPlace] = React.useState(false);
  const [isPopupEditAvatar, setPopupEditAvatar] = React.useState(false);
  const [isPopupDeleteCard, setPopupDeleteCard] = React.useState(false);
  const [isPopupImageOpen, setPopupImageOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const history = useHistory();

  const closeAllPopups = () => {
    setPopupProfileOpen(false);
    setPopupAddPlace(false);
    setPopupEditAvatar(false);
    setPopupImageOpen(false);
    setPopupDeleteCard(false);
    document.removeEventListener("keypress", handleEscPress);
  };

  const handleEditProfile = () => {
    setPopupProfileOpen(true);
    addHandleEscPress();
  };

  const handleAddPlace = () => {
    addHandleEscPress();
    setPopupAddPlace(true);
  };

  const handleEditAvatar = () => {
    setPopupEditAvatar(true);
    addHandleEscPress();
  };

  const handleDeleteCard = (card) => {
    setSelectedCard(card);
    setPopupDeleteCard(true);
    addHandleEscPress();
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setPopupImageOpen(true);
    addHandleEscPress();
  };

  const handleCardLike = (card, removeLike) => {
    if (removeLike) {
      return api.deleteLike(card._id).then(() => {
        api.getCards().then((cardsData) => {
          setCards(cardsData);
        });
      });
    } else {
      return api.putLike(card._id).then(() => {
        api.getCards().then((cardsData) => {
          setCards(cardsData);
        });
      });
    }
  };

  const onSubmitDeleteCard = () => {
    return api.deleteCard(selectedCard._id).then(() => {
      closeAllPopups();
      setCards(cards.filter((card) => card._id !== selectedCard._id));
    });
  };

  const onSubmitEditProfile = ({ name, about }) => {
    return api.updateUser(name, about).then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    });
  };

  const onSubmitAddPlace = ({ name, link }) => {
    return api.postCards(name, link).then((card) => {
      setCards([card, ...cards]);
      closeAllPopups();
    });
  };

  const onSubmitEditAvatar = ({ avatar }) => {
    return api.updateAvatar(avatar).then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    });
  };

  const addHandleEscPress = () => {
    document.addEventListener("keydown", handleEscPress);
  };

  const handleEscPress = (evt) => {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  };
  React.useEffect(() => {
    api.getUserInfo().then((user) => {
      setCurrentUser(user);
      api.getCards().then((cardsData) => {
        setCards(cardsData);
      });
    });
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            history.push("/home");
          }
        })
        .catch((err) => console.log(err));
    }

    return;
  };

  const handleLogin = (evt) => {
    evt.preventDefault();
    tokenCheck();
  };

  return (
    <div className="page">
      <Header />
      <Switch>
        <CurrentUserContext.Provider value={currentUser}>
          <Route path="/">
            <Register />
          </Route>
          <Route path="/login" handleLogin={handleLogin}>
            <Login setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <ProtectedRoute path="/home" isLoggedIn={isLoggedIn}>
            <Main
              handleEditAvatar={handleEditAvatar}
              handleEditProfile={handleEditProfile}
              handleAddPlace={handleAddPlace}
              handleDeleteCard={handleDeleteCard}
              handleCardClick={handleCardClick}
              handleCardLike={handleCardLike}
              cards={cards}
            />
            <Footer />
            <EditAvatarPopup
              handleClose={closeAllPopups}
              open={isPopupEditAvatar}
              onUpdateAvatar={onSubmitEditAvatar}
            />
            <EditProfilePopup
              handleClose={closeAllPopups}
              open={isPopupProfileOpen}
              onUpdateUser={onSubmitEditProfile}
            />
            <AddPlacePopup
              handleClose={closeAllPopups}
              open={isPopupAddPlace}
              onSubmit={onSubmitAddPlace}
            />
            <PopupWithForm
              title="¿Estás seguro/a?"
              handleClose={closeAllPopups}
              classId={"popup_confirmation"}
              open={isPopupDeleteCard}
              onSubmit={onSubmitDeleteCard}
              buttonTitle="Si"
            ></PopupWithForm>
            <ImagePopup
              classId={"popup_card"}
              handleClose={closeAllPopups}
              selectedCard={selectedCard}
              open={isPopupImageOpen}
            />
          </ProtectedRoute>
        </CurrentUserContext.Provider>

        <Route path="/">
          {isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
