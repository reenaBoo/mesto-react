import React from 'react';

class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <img src="#" alt="" className="card__image" />
        <button className="card__delete-button" type="button" aria-label="Удалить"></button>
        <div className="card__info">
          <h2 className="card__title"></h2>
          <button className="card__like-button" type="button" aria-label="Нравится"></button>
        </div>
      </div>
    )
  }
}

export default Card;