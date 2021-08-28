import React from 'react';
import { api } from '../utils/Api';



function Main({ onEditProfile, onAddPlace, onEditAvatar, userName, userDescription, userAvatar }) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img style={{ backgroundImage: `url(${userAvatar})` }} alt="Аватарка в профиле" className="profile__avatar" />
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
      <section className="cards"></section>
    </main>
  )
}

export default Main;