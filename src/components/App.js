import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then((profileInfo) => {
        setCurrentUser(profileInfo)
      })
      .catch((rej) => console.log(rej))
  }, [])

  const [cards, setCards] = useState([])

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((rej) => console.log(rej));
  }, [])

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  function handlePopupClose(evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closeAllPopups();
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((cards) => cards.filter((c) => c._id !== card._id))
        closeAllPopups()
      })
      .catch((rej) => console.log(rej))
  }

  function handleUpdateUser(profile) {
    api
      .editUserInfo(profile)
      .then((newProfile) => {
        setCurrentUser(newProfile)
        closeAllPopups()
      })
      .catch((rej) => console.log(rej))
  }

  function handleUpdateAvatar(avatar) {
    api
      .editUserAvatar(avatar)      
      .then((newProfile) => {
        setCurrentUser(newProfile)
        closeAllPopups()
      })
      .catch((rej) => console.log(rej))
  }

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardDelete={handleCardDelete} />
        <Footer />

        <ImagePopup card={selectedCard} onClose={handlePopupClose} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={handlePopupClose} onUpdateUser={handleUpdateUser} />

        <PopupWithForm title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={handlePopupClose}>
          <input id="place-input" className="form__input form__input_type_place" type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required />
          <span className="place-input-error form__input-error"></span>
          <input id="url-input" className="form__input form__input_type_url" type="url" name="link" placeholder="Ссылка на картинку" required />
          <span className="url-input-error form__input-error"></span>
        </PopupWithForm>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={handlePopupClose} onUpdateAvatar={handleUpdateAvatar}/>        
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
