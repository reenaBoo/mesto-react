import { useEffect, useState } from 'react';
import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')

  useEffect(() => {
    api
      .getUserInfo()
      .then((profileInfo) => {
        setUserName(profileInfo.name)
        setUserDescription(profileInfo.about)
        setUserAvatar(profileInfo.avatar)
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

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={userAvatar} alt="Аватарка в профиле" className="profile__avatar" />
          <div className="profile__avatar-overlay" onClick={onEditAvatar}>
            <div className="profile__avatar-edit" aria-label="Редактировать"></div>
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="add" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        {cards.map((card) => <Card key={card._id} card={card} onCardClick={onCardClick} />)}
      </section>
    </main>
  )
}

export default Main;