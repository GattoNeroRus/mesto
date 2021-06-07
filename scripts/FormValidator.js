class FormValidator {
  constructor(formSelector, config) {
    this._form = formSelector;
    this._inputSelector = config.inputSelector;
    this._spanSelector = config.spanSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._buttonDisabledClass = config.submitButtonDisabledClass
    this._ErrorClass = config.inputErrorClass;
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.disabled = true;
      this._button.classList.add(this._buttonDisabledClass)
    } else {
      this._button.disabled = false;
      this._button.classList.remove(this._buttonDisabledClass)
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector)),
          buttonElement = this._form.querySelector(this._submitButtonSelector);

    this._inputList = inputList;
    this._button = buttonElement;

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._inputElement = inputElement;
        this._checkInputValidity();
        this.toggleButtonState();
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

  _hideInputError(errorElement) {
    this._inputElement.classList.remove(this._ErrorClass)
  }

  _clearErrorMessage(errorElement) {
    errorElement.textContent = ''
  }

  _hideError() {
    const errorElement = this._form.querySelector(`#${this._inputElement.id}-error`);

    this._hideInputError();
    this._clearErrorMessage(errorElement);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {return !inputElement.validity.valid});
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export { FormValidator }
