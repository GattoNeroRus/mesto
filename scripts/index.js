/* ПЕРЕМЕННЫЕ */
const elementsContainer = document.querySelector('.elements'),

      profileEditPopup = document.querySelector('#profileEdit'),
      addElementPopup = document.querySelector('#addElement'),
      addElementTitle = addElementPopup.querySelector('#elementTitle'),
      addElementImage = addElementPopup.querySelector('#elementImage'),

      addButton = document.querySelector('.profile__add-button'),

      profileEditButton = document.querySelector('.profile__edit-button'),
      profileNameInput = document.querySelector('#nameInput'),
      profileJobInput = document.querySelector('#jobInput'),
      profileTitle = document.querySelector('.profile__title'),
      profileSubtitle = document.querySelector('.profile__subtitle');

import { Card } from './Card.js';
import { config, FormValidator } from './FormValidator.js';
export { openPopup, hideInputError, clearErrorMessage }

/* МАССИВ С КАРТОЧКАМИ */
const initialCards = [
  {
    name: 'Элиста',
    link: './images/elista.jpg'
  },
  {
    name: 'Город столиц',
    link: './images/city-of-capitals.jpg'
  },
  {
    name: 'Церковь в Ростове',
    link: './images/church-in-rostow.jpg'
  },
  {
    name: 'Смоленск',
    link: './images/smolensk.jpg'
  },
  {
    name: 'Дворцовая площадь',
    link: './images/palace-square.jpg'
  },
  {
    name: 'Московский Кремль',
    link: './images/kremlin.jpg'
  }
];


/* УНИВЕРСАЛЬНЫЕ ФУНКЦИИ */
function openPopup (popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', escapeClickClose);
  popupName.querySelector('.popup__background').addEventListener('click', activePopupCloser);
}

function closePopup (popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeClickClose);
  popupName.querySelector('.popup__background').removeEventListener('click', activePopupCloser);
}

function activePopupCloser () {
  const activePopup = document.querySelector('.popup_opened');
  closePopup(activePopup);
}

function escapeClickClose (evt) {
  if (evt.key === 'Escape') {
    activePopupCloser()
  }
}

function clearErrorMessage (el) {
  el.textContent = ''
}

function hideInputError (el) {
  el.classList.remove(config.inputErrorClass)
}

function clearAllErrorMessages (form) {
  const spans = Array.from(form.querySelectorAll(config.spanSelector));
  spans.forEach((span) => clearErrorMessage(span));
}

function hideAllInputErrors (form) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  inputs.forEach((input) => hideInputError(input));
}

function addElement (name, link) {
  const newCard = new Card(name, link),
        cardElement = newCard.createCard();

  elementsContainer.prepend(cardElement);
}

/* ОБРАБОТЧИКИ СОБЫТИЙ И СМЕШАННЫЕ ФУНКЦИИ */
initialCards.forEach(e => {addElement(e.name, e.link)});

function openEditablePopup (popupName) {
  clearAllErrorMessages(popupName);
  hideAllInputErrors(popupName);

  openPopup(popupName)
}

document.querySelectorAll('.popup__close-button').forEach(e => e.addEventListener('click', e => closePopup(e.target.closest('.popup'))));

addButton.addEventListener('click', () => openEditablePopup(addElementPopup));

profileEditButton.addEventListener('click', () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileSubtitle.textContent;
  openEditablePopup(profileEditPopup);
});

profileEditPopup.addEventListener('submit', evt => {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileSubtitle.textContent = profileJobInput.value;
  closePopup(profileEditPopup);
});

addElementPopup.addEventListener('submit', evt => {
  evt.preventDefault();
  addElement(addElementTitle.value, addElementImage.value);
  closePopup(addElementPopup);
  addElementPopup.querySelector(config.formSelector).reset()
});


/* ВАЛИДАЦИЯ ЧЕРЕЗ КЛАСС */
const profileEditFormInformation = new FormValidator(profileEditPopup);
      profileEditFormInformation.enableValidation();

const addElementFormValidator = new FormValidator(addElementPopup);
      addElementFormValidator.enableValidation();
