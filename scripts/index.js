// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки


// @todo: Вывести карточки на страницу
function createCard(cardData, cardRemove) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    
    cardImage.src = cardData.link;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', () => {
        cardRemove(card);
    });

    return card; 
};

function cardRemove(card) {
    const deleteButton = card.querySelector('.card__delete-button');
    const cardItem = deleteButton.closest('.places__item');
    cardItem.remove();
}

const cardsContainer = document.querySelector('.places__list');
for (let i = 0; i < initialCards.length; i++) {
    const cardElement = createCard(initialCards[i], cardRemove);
    cardsContainer.append(cardElement); 
};




