const qrcodeBtn = document.querySelector("#qrcode-btn");
const closePopupdBtn = document.querySelector(".close-popup");
const qrcodeContainer = document.querySelector(".qrcode-container");

qrcodeBtn.addEventListener("click", openModal);
closePopupdBtn.addEventListener("click", closeModal);

function openModal(e) {
  const structureId = e.target.getAttribute("data-structureid");
  console.log(structureId);
  const popup = qrcodeContainer.children[0];
  qrcodeContainer.classList.add("active");
  popup.classList.add("active");
}

function closeModal(e) {
  const popup = qrcodeContainer.children[0];
  qrcodeContainer.classList.remove("active");
  popup.classList.remove("active");
}
