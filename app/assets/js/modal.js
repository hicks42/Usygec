// modal Module
const modalBtns = document.querySelectorAll(".modal-btn");
// const modalBtn = document.querySelector("#modal-btn");
const formTitle = document.querySelector("#form-title");
const submitModalBtn = document.querySelector(".submit-modal");
const modalContainer = document.querySelector(".modal-container");
const modalInput = document.querySelector(".modal-container input");
const closeModaldBtn = document.querySelector(".close-popup");

modalBtns.forEach((modalBtn) => {
  modalBtn.addEventListener("click", openModal);
});
closeModaldBtn.addEventListener("click", closeModal);
submitModalBtn.addEventListener("click", uploadFile);

// Modal
function openModal(e) {
  const modalType = e.target.getAttribute("data-modal-type");
  switch (modalType) {
    case "email-csv":
      addStrucureIdRow(e);
      break;
    case "company-csv":
      console.log("company-csv");
      break;
    default:
      console.log(`Déso pas de modalType`);
  }

  const popup = modalContainer.children[0];
  modalContainer.classList.add("active");
  popup.classList.add("active");
}

function addStrucureIdRow(e) {
  const structureId = e.target.getAttribute("data-structureid");
  formRow = `<input type="hidden" id="csv_structureId" class="formal-control" name="csv[structureId]" value="${structureId}">`;
  formTitle.insertAdjacentHTML("afterend", formRow);
}

function closeModal(e) {
  const popup = modalContainer.children[0];
  modalContainer.classList.remove("active");
  popup.classList.remove("active");
}

function uploadFile(e) {
  modalContainer.classList.remove("active");
  popup.classList.remove("active");
}
