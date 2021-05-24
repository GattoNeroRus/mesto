function clearErrorMessage (el) {
  el.textContent = ''
}

function hideInputError (el) {
  el.classList.remove('.popup__form-input_type_error') /* C config тут не работает */
}

function clearAllErrorMessages (form) {
  const spans = Array.from(form.querySelectorAll(config.spanSelector));
  spans.forEach((span) => clearErrorMessage(span));
}

function openEditablePopup (popupName) {
  clearAllErrorMessages(popupName);
  hideAllInputErrors(popupName);

  const inputList = Array.from(popupName.querySelectorAll(config.inputSelector)),
        button = popupName.querySelector(config.submitButtonSelector);

  toggleButtonState(button, inputList);
  openPopup(popupName)
}

function hideAllInputErrors (form) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  inputs.forEach((input) => hideInputError(input));
}

function showError (inputElement, form) {
  const {inputErrorClass, errorActiveClass} = config,
         errorElement = form.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideError (inputElement, form) {
  const {inputErrorClass, errorActiveClass} = config,
        errorElement = form.querySelector(`#${inputElement.id}-error`);

  hideInputError(inputElement);
  clearErrorMessage(errorElement);
}

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
    button.classList.add('popup__form-submit-button_type_disabled')
  } else {
    button.disabled = false;
    button.classList.remove('popup__form-submit-button_type_disabled')
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
