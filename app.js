const form = document.querySelector("form");
const cardName = document.querySelector("#card__name");
const cardNumber = document.querySelector("#card__number");
const cardCvc = document.querySelector("#card__cvc");
const expiryMonth = document.querySelector("#card__exp");
const expiryYear = document.querySelector("#card__year");
const completedState = document.querySelector(".completed__state");
const continueBtn = document.querySelector("#continue");

// Card Text
const cardNumberText = document.querySelector(".card__number");
const cardNameText = document.querySelector(".card__name");
const cardExpiryMonthText = document.querySelector(".card__month");
const cardExpiryYearText = document.querySelector(".card__year");
const cardCvcText = document.querySelector(".cvc__number");

const nameError = document.querySelector(".name__error");
const numberError = document.querySelector(".num__error");
const cvcError = document.querySelector(".cvc__error");
const expiryError = document.querySelector(".exp__error");

// Display card details on the  Dummy Card

cardName.addEventListener("input", function () {
  if (cardName.value.length > 25) {
    cardName.value = cardName.value.slice(0, 25);
  }
  cardNameText.textContent = cardName.value;

  if (!cardName.value) {
    cardNameText.textContent = "Jane Appleseed";
  }
});

cardNumber.addEventListener("input", function () {
  if (cardNumber.value.length > 16) {
    cardNumber.value = cardNumber.value.slice(0, 16);
  }
  cardNumberText.textContent = cardNumber.value;

  if (!cardNumber.value) {
    cardNumberText.textContent = "0000 0000 0000 0000";
  }
});

cardCvc.addEventListener("input", function () {
  if (cardCvc.value.length > 3) {
    cardCvc.value = cardCvc.value.slice(0, 3);
  }

  cardCvcText.textContent = cardCvc.value;

  if (!cardCvc.value) {
    cardCvcText.textContent = "000";
  }
});

expiryMonth.addEventListener("input", function () {
  if (expiryMonth.value.length > 2) {
    expiryMonth.value = expiryMonth.value.slice(0, 2);
  }

  cardExpiryMonthText.textContent = expiryMonth.value;

  if (!expiryMonth.value) {
    cardExpiryMonthText.textContent = "00";
  }
});

expiryYear.addEventListener("input", function () {
  if (expiryYear.value.length > 2) {
    expiryYear.value = expiryYear.value.slice(0, 2);
  }
  cardExpiryYearText.textContent = expiryYear.value;

  if (!expiryYear.value) {
    cardExpiryYearText.textContent = "00";
  }
});

// Validate form fields
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const card = {
    name: cardName.value,
    number: cardNumber.value,
    cvc: cardCvc.value,
    expiryMonth: expiryMonth.value,
    expiryYear: expiryYear.value,
  };

  validateForm(card);
});

function validateForm(card) {
  // Validate card name
  if (card.name === "") {
    nameError.textContent = "Can't be blank";
    cardName.style.borderColor = "var(--primary-red)";
  } else {
    nameError.textContent = "";
    cardName.style.borderColor = "var(--light-grayish-violet)";
  }

  //   Validate card number
  if (card.number === "") {
    numberError.textContent = "Can't be blank";
    cardNumber.style.borderColor = "var(--primary-red)";
  } else if (!/^([0-9 ])*$/.test(card.number)) {
    numberError.textContent = "Wrong format, numbers only.";
    cardNumber.style.borderColor = "var(--primary-red)";
  } else if (card.number.length < 16 || card.number.length > 16) {
    numberError.textContent = "Invalid card number";
    cardNumber.style.borderColor = "var(--primary-red)";
  } else {
    numberError.textContent = "";
    cardNumber.style.borderColor = "var(--light-grayish-violet)";
  }

  // Validate card cvc
  if (card.cvc === "") {
    cvcError.textContent = "Can't be blank";
    cardCvc.style.borderColor = "var(--primary-red)";
  } else {
    cvcError.textContent = "";
    cardCvc.style.borderColor = "var(--light-grayish-violet)";
  }

  const currentYear = new Date().getFullYear().toString().slice(2, 4);

  //  Validate card expiry date
  if (card.expiryMonth === "") {
    expiryError.textContent = "Can't be blank";
    expiryMonth.style.borderColor = "var(--primary-red)";
  } else if (
    !/^([0-9 ])*$/.test(card.expiryMonth) ||
    card.expiryMonth < 1 ||
    card.expiryMonth > 12
  ) {
    expiryError.textContent = "Invalid date";
    expiryMonth.style.borderColor = "var(--primary-red)";
    return;
  } else {
    expiryError.textContent = "";
    expiryMonth.style.borderColor = "var(--light-grayish-violet)";
  }

  if (card.expiryYear === "") {
    expiryError.textContent = "Can't be blank";
    expiryYear.style.borderColor = "var(--primary-red)";
  } else if (
    card.expiryYear < currentYear ||
    !/^([0-9 ])*$/.test(card.expiryYear)
  ) {
    expiryError.textContent = "Invalid date";
    expiryYear.style.borderColor = "var(--primary-red)";
  } else {
    expiryError.textContent = "";
    expiryYear.style.borderColor = "var(--light-grayish-violet)";
  }

  // Show completed state
  if (
    card.name !== "" &&
    card.number !== "" &&
    card.cvc !== "" &&
    card.expiryMonth !== "" &&
    card.expiryYear !== "" &&
    card.number.length === 16 &&
    card.expiryMonth >= 1 &&
    card.expiryMonth <= 12 &&
    card.expiryYear >= currentYear
  ) {
    form.style.display = "none";
    completedState.style.display = "block";
  }
}

// Continue Button
continueBtn.addEventListener("click", function () {
  completedState.style.display = "none";
  form.style.display = "block";
  window.location.reload();
});
