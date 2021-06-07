const imageZoom = document.querySelector('#imageZoom'),
      image = imageZoom.querySelector('.popup__image'),
      popupSubtitle = imageZoom.querySelector('.popup__subtitle');

import { openPopup } from './index.js'

export class Card {
  constructor (title, link, cardSelector) {
    this._title = title;
    this._link = link;
    this._cardSelector = cardSelector
  }

  _openImageZoom () {
    image.src = this._link;
    image.alt = this._title;
    popupSubtitle.textContent = this._title;
    image.onload = openPopup(imageZoom);
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
  }

  _doLike() {
    this._element.querySelector('.element__hearth-icon').addEventListener('click', e => e.target.classList.toggle('element__hearth-icon_active'));
  }

  _deleteElement() {
    this._element.querySelector('.element__trash-icon').addEventListener('click', e => {
      this._element.remove();
      this._element = null
    });
  }

  _openImageZoomPopup() {
    this._elementImage.addEventListener('click', () => this._openImageZoom(this._title, this._link));
  }

  createCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;

    this._openImageZoomPopup()
    this._deleteElement()
    this._doLike()

    return this._element;
  }
}
