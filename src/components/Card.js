import React from 'react';

function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card)
  }

  return (
    <div className="card">
      <img src={card.link} alt={card.link} className="card__image" onClick={handleClick} />
      <button className="card__delete-button" type="button" aria-label="Удалить"></button>
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className="card__like-button" type="button" aria-label="Нравится"></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )

}

export default Card;