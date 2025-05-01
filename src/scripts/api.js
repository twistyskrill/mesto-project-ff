const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-32',
    headers: {
      authorization: '22e04659-805d-44c0-ad1a-8811974e7812',
      'Content-Type': 'application/json'
    }
  }

export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
      })
      .then((res) => res.json())
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    }) 
      .then((res) => res.json())
}
export const formEditAPI = (profileTitle, profileDescription) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
        name: profileTitle.textContent,
        about: profileDescription.textContent
        })
    })
}

export const avatarEditAPI = (avatarInput) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          avatar: avatarInput.value
        })
      })    
}


export const addCardAPI = (cardNameInput, cardLinkInput) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
          name: cardNameInput.value,
          link: cardLinkInput.value
        })
      })
    .then(res => res.json())
}
      