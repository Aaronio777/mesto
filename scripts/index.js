"use strict";

const openPopupButtonEdit = document.querySelector(`.profile__button-edit`);
const editingPopup = document.querySelector(`.popup_edit`);
const closePopupButton = document.querySelector(`.popup__close_edit`);

const profileName = document.querySelector(`.profile__name`);
const nameInput = document.querySelector(`.popup__input_name`);

const profileOccupation = document.querySelector(`.profile__occupation`);
const occupationInput = document.querySelector(`.popup__input_occupation`);

const popupProfileForm = document.querySelector(`.popup__form_edit`);

const popupButtonAdd = document.querySelector(`.profile__button-add`);
const addingPopup = document.querySelector(`.popup_add`);
const closingPopupButtonAdd = document.querySelector(`.popup__close_add`);

const elements = document.querySelector(`.elements`);

const newCardButton = document.querySelector(`.profile__button-add`);
const cardNameInput = document.querySelector(`.popup__input_title`);
const cardLinkInput = document.querySelector(`.popup__input_photo`);
const cardTemplate = document.querySelector(`#elements__box`).content;
const cardsContainer = document.querySelector(`.elements`);
const formCard = document.querySelector(`.popup__form_add`);

const popupPhoto = document.querySelector(`.popup-photo`);
const popupPhotoPhoto = document.querySelector(`.popup-photo__photo`);
const popupPhotoDiscription = document.querySelector(
  `.popup-photo__discription`
);

const closingPopupButtonPhoto = document.querySelector(`.popup__close_photo`);

const buttonEdit = document.querySelector(`.popup__submit_edit`);
const buttonAdd = document.querySelector(`.popup__submit_add`);

openPopupButtonEdit.addEventListener(`click`, function () {
  openPopup(editingPopup);
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
  cleanInputs(popupProfileForm);
  activateButton(buttonEdit);
});

closePopupButton.addEventListener(`click`, function () {
  closePopup(editingPopup);
});

popupProfileForm.addEventListener(`submit`, function (event) {
  event.preventDefault();

  profileOccupation.textContent = occupationInput.value;
  profileName.textContent = nameInput.value;
  blockButton(buttonAdd);
  closePopup(editingPopup);
});

function openPopup(popup) {
  popup.classList.add(`popup_opened`);
  document.addEventListener("keydown", closeByEscape);
  popup.addEventListener("mousedown", function (event, closeOnOverlay) {
    closeOnOverlay(event, popup);
  });
}

function closePopup(popup) {
  popup.classList.remove(`popup_opened`);
  document.removeEventListener("keydown", closeByEscape);
  popup.removeEventListener("mousedown", closeOnOverlay);
}

popupButtonAdd.addEventListener(`click`, function () {
  openPopup(addingPopup);
  cleanInputs(formCard);
  formCard.reset();
});

closingPopupButtonAdd.addEventListener(`click`, function () {
  closePopup(addingPopup);
});

function addCard(item) {
  const card = cardTemplate.querySelector(`.elements__box`).cloneNode(true);
  const cardPhoto = card.querySelector(`.elements__photo`);
  const cardName = card.querySelector(`.elements__title`);
  const buttonLike = card.querySelector(`.elements__like`);
  const buttonDelete = card.querySelector(`.elements__delete-button`);

  formCard.reset();
  cardPhoto.src = item.link;
  cardPhoto.alt = item.name;
  cardName.textContent = item.name;

  buttonLike.addEventListener(`click`, (e) => {
    e.target.classList.toggle(`elements__like_active`);
  });

  buttonDelete.addEventListener(`click`, (e) => {
    e.target.closest(`.elements__box`).remove();
  });

  cardPhoto.addEventListener(`click`, function () {
    openPopup(popupPhoto);

    popupPhotoPhoto.src = item.link;
    popupPhotoPhoto.alt = item.name;
    popupPhotoDiscription.textContent = item.name;
  });

  return card;
}

initialCards.forEach((item) => {
  elements.prepend(addCard(item));
});

function addNewCard(e) {
  e.preventDefault();

  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  elements.prepend(addCard(newCard));
  closePopup(addingPopup);
  blockButton(buttonAdd);
}

formCard.addEventListener(`submit`, addNewCard);

closingPopupButtonPhoto.addEventListener(`click`, function () {
  closePopup(popupPhoto);
});

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(`.popup_opened`);
    closePopup(popup);
  }
}

function closeOnOverlay(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

function activateButton(button) {
  button.removeAttribute("disabled");
  button.classList.remove(`popup__submit_inactive`);
}

function blockButton(button) {
  button.setAttribute("disabled", true);
  button.classList.add(`popup__submit_inactive`);
}

function cleanInputs(form) {
  const errorElement = Array.from(form.querySelectorAll(`.popup__input-error`));
  const inputs = Array.from(form.querySelectorAll(`.popup__input`));
  errorElement.forEach((element) => {
    element.textContent = "";
    element.classList.remove(`popup__input-error`);
    element.classList.remove(`popup__input_type_error`);
  });
  inputs.forEach((input) => {
    input.classList.remove(`popup__input-error`);
    input.classList.remove(`popup__input_type_error`);
  });
}
