// Download Module
const downloadBtn = document.querySelector("#download-btn");
const formTitle = document.querySelector("#form-title");
const submitDownloadBtn = document.querySelector(".submit-download");
const closePopupdBtn = document.querySelector(".close-popup");
const downloadContainer = document.querySelector(".download-container");
const downloadInput = document.querySelector(".download-container input");

downloadBtn.addEventListener("click", openModal);
closePopupdBtn.addEventListener("click", closeModal);
submitDownloadBtn.addEventListener("click", downloadFile);

// Download Modal
function openModal(e) {
  const structureId = downloadBtn.getAttribute("data-structureid");
  formRow = `<input type="hidden" id="csv_structureId" class="form-control" name="csv[structureId]" value="${structureId}">`;
  // formRow = '{{ form_row(form.structureId, { \'value\': structure.id }) }}';
  formTitle.insertAdjacentHTML('afterend', formRow);
  const popup = downloadContainer.children[0];
  downloadContainer.classList.add("active");
  popup.classList.add("active");
}

function closeModal(e) {
  const popup = downloadContainer.children[0];
  downloadContainer.classList.remove("active");
  popup.classList.remove("active");
}

function downloadFile(e) {
  downloadContainer.classList.remove("active");
  popup.classList.remove("active");
}
