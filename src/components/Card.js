import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardDeleteButtonClassName = (
    `card__like-button ${isLiked ? 'card__like-button_active' : ''}`
  ); 

  function handleClick() {
    onCardClick(card)
  }

  return (
    <div className="card">
      <img src={card.link} alt={card.link} className="card__image" onClick={handleClick} />
      {isOwn && <button className="card__delete-button" type="button" aria-label="Удалить" onCardDelete={onCardDelete(card._id)}></button>}
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className={cardDeleteButtonClassName} type="button" aria-label="Нравится"></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )

}

export default Card;