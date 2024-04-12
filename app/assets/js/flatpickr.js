import flatpickr from "flatpickr";

const { French } = require("flatpickr/dist/l10n/fr");

function allflatpicker() {
  document.querySelectorAll(".flatpickr").forEach((input) => {
    flatpickr(input, {
      altInput: true,
      altFormat: "j F, Y",
      dateFormat: "d-m-Y",
      locale: French,
      firstDayOfWeek: 1,
    });
  });
}

function initializeFlatpickr(element) {
  flatpickr(element, {
    altInput: true,
    altFormat: "j F, Y",
    dateFormat: "d-m-Y",
    locale: French,
    firstDayOfWeek: 1,
  });
}

export { initializeFlatpickr, allflatpicker };
