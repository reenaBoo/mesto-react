import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import Footer from './Footer';
import Card from './Card'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

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
  }

  function handlePopupClose(evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closeAllPopups();
    }
  }

  return (
    <body className="page">
      <div className="page__container">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
        <Footer />

        <ImagePopup card={selectedCard} onClose={handlePopupClose} />

        <PopupWithForm name="edit" title="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={handlePopupClose}>
          <input id="name-input" className="form__input form__input_type_name" type="text" name="user" placeholder="Как вас зовут?" minLength="2" maxLength="40" required />
          <span className="name-input-error form__input-error"></span>
          <input id="job-input" className="form__input form__input_type_job" type="text" name="about" placeholder="Место работы" minLength="2" maxLength="200" required />
          <span className="job-input-error form__input-error"></span>
        </PopupWithForm>

        <PopupWithForm name="new-card" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={handlePopupClose}>
          <input id="place-input" className="form__input form__input_type_place" type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required />
          <span className="place-input-error form__input-error"></span>
          <input id="url-input" className="form__input form__input_type_url" type="url" name="link" placeholder="Ссылка на картинку" required />
          <span className="url-input-error form__input-error"></span>
        </PopupWithForm>

        <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={handlePopupClose}>
          <input id="link-input" className="form__input form__input_type_url" type="url" name="avatar" placeholder="Ссылка на новую аватарку" required />
          <span className="link-input-error form__input-error"></span>
        </PopupWithForm>

        <div className="popup popup_type_delete">
          <div className="popup__container">
            <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
            <form className="form">
              <h2 className="form__title">Вы уверены?</h2>
              <button className="form__save-button" type="submit">Да</button>
            </form>
          </div>
        </div>


        <div className="popup popup_type_image">
          <div className="popup__container-image">
            <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
            <figure className="figure">
              <img src="#" alt="#" className="figure__image" />
              <figcaption className="figure__title"></figcaption>
            </figure>
          </div>
        </div>
      </div>
      <script type="module" src="./scripts/index.js"></script>
    </body>
  );
}

export default App;
