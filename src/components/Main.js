import { useState } from 'react';
import React from 'react';
import Card from './Card';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [setCards] = useState([]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={currentUser.avatar} alt="Аватарка в профиле" className="profile__avatar" />
          <div className="profile__avatar-overlay" onClick={onEditAvatar}>
            <div className="profile__avatar-edit" aria-label="Редактировать"></div>
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="add" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        {cards.map((card) => <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={handleCardLike} onCardDelete={onCardDelete}/>)}
      </section>
    </main>
  )
}

export default Main;