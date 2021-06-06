const imageZoom = document.querySelector('#imageZoom'),
      image = imageZoom.querySelector('.popup__image'),
      popupSubtitle = imageZoom.querySelector('.popup__subtitle');

import { openPopup } from './index.js'

export class Card {
  constructor (title, link) {
    this._title = title;
    this._link = link;
  }

  _openImageZoom () {
    image.src = this._link;
    image.alt = this._title;
    popupSubtitle.textContent = this._title;
    image.onload = openPopup(imageZoom);
  }

  _getTemplate() {
    return document.querySelector('#element-template').content.querySelector('.element').cloneNode(true);
  }

  createCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._title;
    this._elementImage.addEventListener('click', () => this._openImageZoom(this._title, this._link));
    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__trash-icon').addEventListener('click', e => e.target.closest('.element').remove());
    this._element.querySelector('.element__hearth-icon').addEventListener('click', e => e.target.classList.toggle('element__hearth-icon_active'));

    return this._element;
  }
}
