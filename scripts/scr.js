/* ПЕРЕМЕННЫЕ */
const elementTemplate = document.querySelector('#element-template'),
      elementsContainer = document.querySelector('.elements'),

      profileEditPopup = document.querySelector('#profileEdit'),
      addElementPopup = document.querySelector('#addElement'),
      imageZoom = document.querySelector('#imageZoom'),

      addButton = document.querySelector('.profile__add-button'),

      profileEditButton = document.querySelector('.profile__edit-button'),
      profileNameInput = document.querySelector('#nameInput'),
      profileJobInput = document.querySelector('#jobInput'),
      profileTitle = document.querySelector('.profile__title'),
      profileSubtitle = document.querySelector('.profile__subtitle'),

      image = imageZoom.querySelector('.popup__image'),
      popupSubtitle = imageZoom.querySelector('.popup__subtitle')


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
}

function closePopup (popupName) {
  popupName.classList.remove('popup_opened');
}

function openImageZoom (name, link) {
  image.src = link;
  image.alt = name;
  popupSubtitle.textContent = name;
  image.onload = openPopup(imageZoom);
}

function createNewCard(name, link) {
  const newElement = elementTemplate.content.querySelector('.element').cloneNode(true),
        elementImage = newElement.querySelector('.element__image');

  elementImage.src = link;
  elementImage.alt = name;
  elementImage.addEventListener('click', e => openImageZoom(name, link));
  newElement.querySelector('.element__title').textContent = name;
  newElement.querySelector('.element__trash-icon').addEventListener('click', e => e.target.closest('.element').remove());
  newElement.querySelector('.element__hearth-icon').addEventListener('click', e => e.target.classList.toggle('element__hearth-icon_active'));
  return newElement;
}

function addElement (name, link) {
  elementsContainer.prepend(createNewCard(name, link));
}


/* ОБРАБОТЧИКИ СОБЫТИЙ И СМЕШАННЫЕ ФУНКЦИИ */
initialCards.forEach(e => {addElement(e.name, e.link)});

document.querySelectorAll('.popup__close-button').forEach(e => e.addEventListener('click', e => closePopup(e.target.closest('.popup'))));

addButton.addEventListener('click', () => openPopup(addElementPopup)); // Не совсем понимаю, почему, но правильно работает только так

profileEditButton.addEventListener('click', () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileSubtitle.textContent;
  openPopup(profileEditPopup);
});

profileEditPopup.addEventListener('submit', evt => {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileSubtitle.textContent = profileJobInput.value;
  closePopup(profileEditPopup);
});

addElementPopup.addEventListener('submit', evt => {
  evt.preventDefault();
  addElement(addElementPopup.querySelector('#elementTitle').value, addElementPopup.querySelector('#elementImage').value);
  closePopup(addElementPopup);
});
