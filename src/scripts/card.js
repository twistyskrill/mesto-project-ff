export const templateCard = document.querySelector('#card-template').content; 

export function createCard(cardData, deleteCard, likeCard, openImage, userData) { 
    const card = templateCard.cloneNode(true); 
    const cardImage = card.querySelector('.card__image'); 
    const cardTitle = card.querySelector('.card__title'); 
    const cardDeleteButton = card.querySelector('.card__delete-button'); 
    const cardLikeButton = card.querySelector('.card__like-button');
    const likeCounter =  card.querySelector('.like-counter');
    
    cardData.likes.forEach(like => {
        if (like._id === userData._id) {
            cardLikeButton.classList.add('card__like-button_is-active')
        }
    });
    const isLiked = cardLikeButton.classList.contains('card__like-button_is-active');

    if (cardData.owner._id !== userData._id) {
        cardDeleteButton.style.display = 'none';
     }
   
    cardImage.src = cardData.link; 
    cardImage.alt = cardData.name; 
    cardTitle.textContent = cardData.name; 
    likeCounter.textContent = cardData.likes.length;


  
    cardImage.addEventListener('click', openImage);
    cardLikeButton.addEventListener('click', (evt) => likeCard(evt, cardData, likeCounter, isLiked))
    cardDeleteButton.addEventListener('click', () => deleteCard(cardDeleteButton, cardData._id)); 
    
    return card; 
}; 


export function likeCard (evt, cardId, likeCounter, isLiked) {
    const method = isLiked ? 'DELETE' : 'PUT';
    fetch(`https://nomoreparties.co/v1/wff-cohort-32/cards/likes/${cardId._id}`, {
        method: method,
        headers: {
            authorization: '22e04659-805d-44c0-ad1a-8811974e7812'
        }
    })
        .then((res) => res.json())
        .then((res) => {
            evt.target.classList.toggle('card__like-button_is-active');
            likeCounter.textContent = res.likes.length
        })
}


export function removeCard(item, cardId) { 
    const listItem = item.closest('.places__item');
    fetch(`https://nomoreparties.co/v1/wff-cohort-32/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '22e04659-805d-44c0-ad1a-8811974e7812'
        }
    })
    .then((res) => res.json())
    .then(() => {
        listItem.remove()
    })
}; 