const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
  formFieldset: ".popup__fieldset",
};

const showInputError = (form, input, config) => {
  input.classList.add(config.inputErrorClass);
  const span = form.querySelector(`#${input.id}-error`);
  span.textContent = input.validationMessage;
  span.classList.add(config.errorClass);
};

const hideInputError = (form, input, config) => {
  input.classList.remove(config.inputErrorClass);
  const span = form.querySelector(`#${input.id}-error`);
  span.textContent = "";
  span.classList.remove(config.errorClass);
};

const isValid = (form, input, config) => {
  if (!input.validity.valid) {
    showInputError(form, input, config);
  } else {
    hideInputError(form, input, config);
  }
};

const hasInvalidValue = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputs, button, config) => {
  if (hasInvalidValue(inputs)) {
    button.setAttribute("disabled", true);
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.removeAttribute("disabled");
    button.classList.remove(config.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, config) => {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  const button = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputs, button, config);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(formElement, input, config);
      toggleButtonState(inputs, button, config);
    });
  });
};

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const fields = Array.from(form.querySelectorAll(config.formFieldset));
    fields.forEach((field) => {
      setEventListeners(field, config);
    });
  });
};

enableValidation(config);
