// upload Module
const uploadBtns = document.querySelectorAll(".upload-btn");
// const uploadBtn = document.querySelector("#upload-btn");
const formTitle = document.querySelector("#form-title");
const submituploadBtn = document.querySelector(".submit-upload");
const closePopupdBtn = document.querySelector(".close-popup");
const uploadContainer = document.querySelector(".upload-container");
const uploadInput = document.querySelector(".upload-container input");

uploadBtns.forEach(uploadBtn => {
  uploadBtn.addEventListener("click", openModal);
});
closePopupdBtn.addEventListener("click", closeModal);
submituploadBtn.addEventListener("click", uploadFile);

// upload Modal
function openModal(e) {
  const structureId = e.target.getAttribute("data-structureid");
  console.log(structureId);
  // const structureId = uploadBtn.getAttribute("data-structureid");
  formRow = `<input type="hidden" id="csv_structureId" class="form-control" name="csv[structureId]" value="${structureId}">`;
  formTitle.insertAdjacentHTML('afterend', formRow);
  const popup = uploadContainer.children[0];
  uploadContainer.classList.add("active");
  popup.classList.add("active");
}

function closeModal(e) {
  const popup = uploadContainer.children[0];
  uploadContainer.classList.remove("active");
  popup.classList.remove("active");
}

function uploadFile(e) {
  uploadContainer.classList.remove("active");
  popup.classList.remove("active");
}
