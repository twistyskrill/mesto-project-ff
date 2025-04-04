import '../pages/index.css';
import { initialCards } from './cards';

const templateCard = document.querySelector('#card-template').content; 
const cardList = document.querySelector('.places__list'); 

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const editCloseButton = editPopup.querySelector('.popup__close');
const addPopup = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');
const addCloseButton = addPopup.querySelector('.popup__close');
const imagePopup = document.querySelector('.popup_type_image');
const imageCloseButton = imagePopup.querySelector('.popup__close');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closePopup(editPopup)
}

formElement.addEventListener('submit', handleFormSubmit); 

function createCard(cardData, deleteCard) { 
  const card = templateCard.cloneNode(true); 
  const cardImage = card.querySelector('.card__image'); 
  const cardTitle = card.querySelector('.card__title'); 
  const cardDeleteButton = card.querySelector('.card__delete-button'); 
 
  cardImage.src = cardData.link; 
  cardImage.alt = cardData.name; 
  cardTitle.textContent = cardData.name; 
  cardImage.addEventListener('click', () => {
    openPopup(imagePopup)
    imagePopup.querySelector('.popup__image').src = cardImage.src;
    imagePopup.querySelector('.popup__caption').textContent = cardTitle.textContent
  })
  
  cardDeleteButton.addEventListener('click', () => deleteCard(cardDeleteButton)); 
  return card; 
}; 

function removeCard(item) { 
  const listItem = item.closest('.places__item'); 
  listItem.remove(); 
}; 

function openPopup(item) {
  item.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc)
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_is-opened'))
  }
}

function closePopup(item) {
  item.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc)
}

function closeOverlay(item, evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(item)
  }
}

initialCards.forEach(item => { 
  const newCard = createCard(item, removeCard); 
  cardList.appendChild(newCard); 
}); 

editButton.addEventListener('click', () => {
  openPopup(editPopup)
})

editCloseButton.addEventListener('click', () => {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  closePopup(editPopup)
})

addButton.addEventListener('click', () => {
  openPopup(addPopup)
})

addCloseButton.addEventListener('click', () => {
  closePopup(addPopup)
})

imageCloseButton.addEventListener('click', () => {
  closePopup(imagePopup)
})

editPopup.addEventListener('click', (evt) => {
  closeOverlay(editPopup, evt)
})

addPopup.addEventListener('click', (evt) => {
  closeOverlay(addPopup, evt)
})

imagePopup.addEventListener('click', (evt) => {
  closeOverlay(imagePopup, evt)
})







