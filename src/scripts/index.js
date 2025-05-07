import '../pages/index.css';
import { createCard, likeCard, removeCard } from './card.js';
import { openPopup, closePopup, closeOverlay} from './modal.js';
import { clearValidation, enableValidation } from './validation.js';
import { getInitialCards, getUserData, formEditAPI, avatarEditAPI, addCardAPI} from './api.js';


const cardList = document.querySelector('.places__list'); 
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const editCloseButton = editPopup.querySelector('.popup__close');
const addPopup = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');
const addCloseButton = addPopup.querySelector('.popup__close');
const imageTypePopup = document.querySelector('.popup_type_image');
const imageCloseButton = imageTypePopup.querySelector('.popup__close');
const imagePopup = document.querySelector('.popup__image');
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const formNewPlace = document.querySelector('form[name="new-place"]')
const cardNameInput = formNewPlace.querySelector('.popup__input_type_card-name');
const cardLinkInput = formNewPlace.querySelector('.popup__input_type_url');
const captionPopup = document.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const formAvatarEdit = document.querySelector('form[name="avatar-profile"]');
const avatarInput = formAvatarEdit.querySelector('.popup__input_type_avatar');
const avatarPopup = document.querySelector('.popup_profile_avatar');
const avatarCloseButton = avatarPopup.querySelector('.popup__close');

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error-text-active'
}

function renderButton (formElement, settings, isLoading) {
  const saveButton = formElement.querySelector(settings.submitButtonSelector);
  if (isLoading) {
    saveButton.textContent = 'Сохранение...'
  } else {
    saveButton.textContent = 'Сохранить'
  }
  
}

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  renderButton(formEditProfile, settings, true);
  formEditAPI(profileTitle, profileDescription)
  .finally(() => {
    renderButton(formEditProfile, settings, false)
  })
  closePopup(editPopup);
}


formEditProfile.addEventListener('submit', handleFormEditProfileSubmit); 

function handleAvatarEditSubmit(evt) {
  evt.preventDefault();
  profileImage.style.backgroundImage = `url(${avatarInput.value})`;
  renderButton(formAvatarEdit, settings, true);
  avatarEditAPI(avatarInput)
  .finally(() => {
    renderButton(formAvatarEdit, settings, false);
  })
  closePopup(avatarPopup)
}

formAvatarEdit.addEventListener('submit', handleAvatarEditSubmit)

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  renderButton(formNewPlace, settings, true);
  addCardAPI(cardNameInput, cardLinkInput)
  .then(newCard => {
     getUserData()
      .then(userData => {
        const cardElement = createCard(newCard, removeCard, likeCard, openImage, userData);
        cardList.prepend(cardElement);
        closePopup(addPopup);
        formNewPlace.reset();
    });
  })
  .catch((err) => console.log(err))
  .finally(() => {
    renderButton(formNewPlace, settings, false);
  })
}

function openImage (evt) {
  openPopup(imageTypePopup)
  imagePopup.src = evt.target.src;
  imagePopup.alt = evt.target.alt;
  captionPopup.textContent = evt.target.alt;
}

formNewPlace.addEventListener('submit', handleFormAddCardSubmit)


editButton.addEventListener('click', () => {
  clearValidation(formEditProfile, settings)
  openPopup(editPopup);
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
})

editCloseButton.addEventListener('click', () => {
  closePopup(editPopup)
})

addButton.addEventListener('click', () => {
  formNewPlace.reset();
  clearValidation(formNewPlace, settings)
  openPopup(addPopup)
})

addCloseButton.addEventListener('click', () => {
  closePopup(addPopup)
})

imageCloseButton.addEventListener('click', () => {
  closePopup(imageTypePopup)
})

editPopup.addEventListener('click', closeOverlay)

addPopup.addEventListener('click', closeOverlay)

imageTypePopup.addEventListener('click', closeOverlay)

avatarPopup.addEventListener('click', closeOverlay)

enableValidation(settings);

const request = [
  getUserData(),
  getInitialCards()
]

Promise.all(request)
  .then(([userData, cardData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    cardData.forEach(card => { 
      const newCard = createCard(card, removeCard, likeCard, openImage, userData); 
      cardList.appendChild(newCard); 
    });
})

profileImage.addEventListener('click', () => {
  formAvatarEdit.reset()
  clearValidation(formAvatarEdit, settings)
  openPopup(avatarPopup)
})

avatarCloseButton.addEventListener('click', () => {
  closePopup(avatarPopup)
})


