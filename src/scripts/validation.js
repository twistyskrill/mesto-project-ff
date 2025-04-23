export function showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
}
  
export function hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
}
  
export function isValid (formElement, inputElement, settings) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings)
    } else {
      hideInputError(formElement, inputElement, settings)
    }
}
  
export function setEventListeners (formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector)
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
      })
    })
}
  
export function enableValidation (settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector))
    formList.forEach((element) => {
      setEventListeners(element, settings)
    })
}
  
export function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
}
  
export function toggleButtonState (inputList, buttonElement, settings) {
    if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', 'true');
      buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(settings.inactiveButtonClass)
    }
}
  
export function clearValidation (formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState (inputList, buttonElement, settings)
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, settings);
    })
}