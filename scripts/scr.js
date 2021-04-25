
/* ПЕРЕМЕННЫЕ */
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('#nameInput');
let jobInput = formElement.querySelector('#jobInput');

/* ФУНКЦИИ */
function popupOpen () {
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
  popup.classList.add('popup_opened');
}

function popupClose () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  popupClose();
}

/* ОБРАБОТЧИКИ СОБЫТИЙ */
editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose)
formElement.addEventListener('submit', formSubmitHandler);
