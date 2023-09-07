document.querySelectorAll('.datetime-picker').forEach(input => {
  flatpickr(input, {
      enableTime: true,
      dateFormat: "Y-m-d H:i",
  });
});
