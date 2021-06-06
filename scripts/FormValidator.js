const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  spanSelector: '.popup__form-span',
  submitButtonSelector: '.popup__form-submit-button',
  submitButtonDisabledClass: 'popup__form-submit-button_type_disabled',
  inputErrorClass: 'popup__form-input_type_error'
}

import { hideInputError, clearErrorMessage } from './index.js'

class FormValidator {
  constructor(formSelector) {
    this._form = formSelector;
    this._inputSelector = config.inputSelector;
    this._spanSelector = config.spanSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._buttonDisabledClass = config.submitButtonDisabledClass
    this._ErrorClass = config.inputErrorClass;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.disabled = true;
      this._button.classList.add(config.submitButtonDisabledClass)
    } else {
      this._button.disabled = false;
      this._button.classList.remove(config.submitButtonDisabledClass)
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector)),
          buttonElement = this._form.querySelector(this._submitButtonSelector);

    this._inputList = inputList;
    this._button = buttonElement;

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._inputElement = inputElement;
        this._checkInputValidity();
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity() {
    if (this._inputElement.validity.valid) {
      this._hideError();
    } else {
      this._showError();
    }
  }

  _showError() {
    const errorElement = this._form.querySelector(`#${this._inputElement.id}-error`);

    this._inputElement.classList.add(this._ErrorClass);
    errorElement.textContent = this._inputElement.validationMessage;
  }

  _hideError() {
    const errorElement = this._form.querySelector(`#${this._inputElement.id}-error`);

    hideInputError(this._inputElement);
    clearErrorMessage(errorElement);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {return !inputElement.validity.valid});
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export {FormValidator, config}

/*



function hasInvalidInput (inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

function checkInputValidity (inputElement, form) {
  if (inputElement.validity.valid) {
    hideError(inputElement, form);
  } else {
    showError(inputElement, form);
  }
}

function toggleButtonState (button, inputList) {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(config.submitButtonDisabledClass)
  } else {
    button.disabled = false;
    button.classList.remove(config.submitButtonDisabledClass)
  }
}

const setEventListeners = (formElement, config) => {
  const {inputSelector, submitButtonSelector, ...restConfig} = config,
        inputList = Array.from(formElement.querySelectorAll(inputSelector)),
        buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, formElement);
      toggleButtonState(buttonElement, inputList);
    });
  })
}

function unsetEventListeners (form, button, inputList) {
  inputList.forEach((inputElement) => {
    inputElement.removeEventListener('input', () => {
      checkInputValidity(inputElement, form);
      toggleButtonState(button, inputList);
    });
  })
}

const enableValidation = (config) => {
  const {formSelector, ...restConfig} = config,
         formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElement => {setEventListeners(formElement, restConfig)})
}
*/
