// SELECTIONS & VARIABLES ############################################

const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelector(".generate");
const rangeSliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll('.color h2');
const popup = document.querySelector(".copy-container");

// Sliders
const adjustBtns = document.querySelectorAll('.adjust');
const lockBtns = document.querySelectorAll('.lock');
const closeAdjust = document.querySelectorAll('.close-adjustment');
const sliderContainer = document.querySelectorAll('.sliders');

// Save Module
const saveBtn = document.querySelector(".save");
const submitSave = document.querySelector(".submit-save");
const closeSave = document.querySelector(".close-save");
const saveContainer = document.querySelector(".save-container");
const saveInput = document.querySelector(".save-container input");

//Library
const libraryContainer = document.querySelector(".library-container");
const libraryBtn = document.querySelector(".library");
const closeLibraryBtn = document.querySelector(".close-library");

// raz
const razBtn = document.querySelector(".raz");

let initialColors;

// Make object for local storage
let savedPalettes = [];

// ##################################################################
// EVENT LISTENERS ##################################################
// ##################################################################

generateBtn.addEventListener("click", randomColors);

rangeSliders.forEach(slider => {
  slider.addEventListener("input", hslControls);
});

colorDivs.forEach((slider, index) => {
  slider.addEventListener("change", () => {
    updateTextUI(index);
  });
});

currentHexes.forEach(hex => {
  // Ici on fait un callback pour pouvoir utiliser hex ds copyToClipboard(hex)
  hex.addEventListener("click", () => {
    copyToClipboard(hex);
  })
});

popup.addEventListener("transitionend", () => {
  const popupBox = popup.children[0];
  popup.classList.remove("active");
  popupBox.classList.remove("active");
});

// ici adjustBtns est un tableau de tous les boutons donc on recup l'index
adjustBtns.forEach((adjuster, index) => {
  adjuster.addEventListener("click", () => {
    openAdjusmentPanel(index);
  });
})

closeAdjust.forEach((button, index) => {
  button.addEventListener("click", () => {
    closeAdjusmentPanel(index);
  });
});

lockBtns.forEach((button, index) => {
  // e stock l'event
  button.addEventListener("click", e => {
    lockColor(e, index);
  });
});

saveBtn.addEventListener("click", openPalette);
closeSave.addEventListener("click", closePalette);
submitSave.addEventListener("click", savePalette);
libraryBtn.addEventListener("click", openLibrary);
closeLibraryBtn.addEventListener("click", closeLibrary);
razBtn.addEventListener("click", raz);

// ##################################################################
// FUNCTIONS ########################################################
// ##################################################################

function generateHex() {
  return chroma.random();
}

function randomColors() {

  initialColors = [];

  colorDivs.forEach((div, index) => {
    const hexText = div.children[0];
    const randomColor = generateHex();

    // si le div est locked on garde hexText et quitte la boucle
    if (div.classList.contains("locked")) {
      initialColors.push(hexText.innerText);
      return;
    } else {
      // on met le code hex de randomColor dans initialColors
      initialColors.push(chroma(randomColor).hex());
    }

    // change background
    div.style.backgroundColor = randomColor;
    hexText.innerText = randomColor;

    //check for Contrast
    checkTextContrast(randomColor, hexText);

    // Initial colorize rangeSliders
    const color = chroma(randomColor);
    const rangeSliders = div.querySelectorAll(".sliders input");
    const hue = rangeSliders[0];
    const brightness = rangeSliders[1];
    const saturation = rangeSliders[2];

    colorizeRangeSliders(color, hue, brightness, saturation);
  });

  //reset inputs
  resetInputs();

  adjustBtns.forEach((button, index) => {
    // on passe la couleur initiale et button. index est N° Div color
    checkTextContrast(initialColors[index], button);
    // on passe en même temps le lockBtns
    checkTextContrast(initialColors[index], lockBtns[index]);
  });
}

function checkTextContrast(color, text) {
  const luminance = chroma(color).luminance();
  if (luminance > 0.5) {
    text.style.color = "black";
  } else {
    text.style.color = "white";
  }
}

function colorizeRangeSliders(color, hue, brightness, saturation) {

  // Scale Brightness
  const midBright = color.set("hsl.l", 0.5);
  const scaleBright = chroma.scale(["black", midBright, "white"]);

  // Scale saturation
  const noSat = color.set('hsl.s', 0);
  const fullSat = color.set('hsl.s', 1);
  const scaleSat = chroma.scale([noSat, color, fullSat]);

  // Update input color
  hue.style.backgroundImage = `linear-gradient(to right, rgb(204, 75, 75), rgb(204, 204, 75), rgb(75, 204, 75), rgb(75, 204, 204), rgb(75, 75, 204), rgb(204, 75, 204), rgb(204, 75, 75))`;
  brightness.style.backgroundImage = `linear-gradient(to right,${scaleBright(0)}, ${scaleBright(0.5)}, ${scaleBright(1)})`;
  saturation.style.backgroundImage = `linear-gradient(to right,${scaleSat(0)},${scaleSat(1)})`;
}

function hslControls(e) {
  const index =
    e.target.getAttribute("data-hue") ||
    e.target.getAttribute("data-bright") ||
    e.target.getAttribute("data-sat");

  let rangeSliders = e.target.parentElement.querySelectorAll('input[type="range"]');
  const hue = rangeSliders[0];
  const brightness = rangeSliders[1];
  const saturation = rangeSliders[2];

  const bgColor = initialColors[index];

  let color = chroma(bgColor)
    .set("hsl.h", hue.value)
    .set("hsl.l", brightness.value)
    .set("hsl.s", saturation.value);

  colorDivs[index].style.backgroundColor = color;

  // Colorize rangeSliders inpput
  colorizeRangeSliders(color, hue, brightness, saturation);
}

function updateTextUI(index) {
  const activeDiv = colorDivs[index];
  const color = chroma(activeDiv.style.backgroundColor);
  const textHex = activeDiv.querySelector("h2");
  const icons = activeDiv.querySelectorAll(".controls button");
  textHex.innerText = color.hex();

  //check for Icons Contrast
  checkTextContrast(color, textHex);
  for (icon of icons) {
    checkTextContrast(color, icon);
  }
}

function resetInputs() {
  const rangeSliders = document.querySelectorAll(".rangeSliders input");
  // hsl()[0] is hue // hsl()[1] is sat // hsl()[2] is light/bright
  rangeSliders.forEach(slider => {
    if (slider.name === "hue") {
      const hueColor = initialColors[slider.getAttribute('data-hue')];
      const hueValue = chroma(hueColor).hsl()[0];
      slider.value = Math.floor(hueValue);
    }

    if (slider.name === "saturation") {
      const satColor = initialColors[slider.getAttribute('data-sat')];
      const satValue = chroma(satColor).hsl()[1];
      slider.value = Math.floor(satValue);
    }

    if (slider.name === "brightness") {
      const brightColor = initialColors[slider.getAttribute('data-bright')];
      const brightValue = chroma(brightColor).hsl()[2];
      slider.value = Math.floor(brightValue * 100) / 100;
    }
  });
}

function copyToClipboard(hex) {
  navigator.clipboard.writeText(hex.innerText);
  // animation
  const popupBox = popup.children[0];
  popup.classList.add("active");
  popupBox.classList.add("active");
}

function openAdjusmentPanel(index) {
  // On prend le div sliders par l'index
  sliderContainer[index].classList.toggle("active");
}

function closeAdjusmentPanel(index) {
  // On prend le div sliders par l'index
  sliderContainer[index].classList.remove("active");
}

function lockColor(e, index) {
  // On prend la cible : le cadenas
  const lockSVG = e.target.children[0];
  // On selectione le div color par l'index
  const activeBg = colorDivs[index];
  // On ajoute/enleve la classe "locked" au css du div
  activeBg.classList.toggle("locked");

  // Animation du cadenas
  if (lockSVG.classList.contains("fa-lock-open")) {
    e.target.innerHTML = '<em class="fas fa-lock"></em>';
  } else {
    e.target.innerHTML = '<em class="fas fa-lock-open"></em>';
  }
}

// Saving Module

function openPalette(e) {
  const popup = saveContainer.children[0];
  saveContainer.classList.add("active");
  popup.classList.add("active");
}

function closePalette(e) {
  const popup = saveContainer.children[0];
  saveContainer.classList.remove("active");
  popup.classList.remove("active");
}

function savePalette(e) {
  saveContainer.classList.remove("active");
  popup.classList.remove("active");
// L utilisateur donne le nom
  const name = saveInput.value;
  const colors = [];
  // on enregistre chacun des hex dans colors
  currentHexes.forEach(hex => {
    colors.push(hex.innerText);
  });

  // Generate Object
  // l'ID est la longueur du array MALIN
  let paletteId;
  const paletteObjects = JSON.parse(localStorage.getItem("palettes"));
  if (paletteObjects) {
    paletteId =paletteObjects.length;
    }else{
    paletteId = savedPalettes.length;
  }
  const paletteObj = { name, colors, id: paletteId }
  // Ajout des paletteObj à savedPalette
  savedPalettes.push(paletteObj);

  // Save to LocalStorage
  savetoLocal(paletteObj);
  saveInput.value = "";

  // Make a library
  makelibrary(paletteObj, savedPalettes);
}

function makelibrary(paletteObj, savedPalettes){
  const palette = document.createElement("div")
  palette.classList.add("custom-palette");
  const title = document.createElement("h4");
  title.innerText = paletteObj.name;
  const preview = document.createElement("div");
  preview.classList.add("small-preview");
  paletteObj.colors.forEach(smallColor => {
    const smallDiv = document.createElement("div");
    smallDiv.style.background = smallColor;
    preview.appendChild(smallDiv);
  });

  // construction du bouton select
  const paletteBtn = document.createElement("button");
  paletteBtn.classList.add("pick-palette-btn");
  paletteBtn.classList.add(paletteObj.id);
  paletteBtn.innerText = "Select";

  // Bouton select: actions
  paletteBtn.addEventListener("click", e => {
    closeLibrary();
    // le classList[1] correspond a l'ID de l'objet paletteObj
    // car 2eme entrée de la class CSS apres pick-palette-btn
    // ajouté plus haut: paletteBtn.classList.add(paletteObj.id);
    const paletteIndex = e.target.classList[1];
    initialColors = [];
    savedPalettes[paletteIndex].colors.forEach((color, index) => {
      // color est ajouté a initialColors
      initialColors.push(color);
      // et on colorie le fond du div indexé
      colorDivs[index].style.backgroundColor = color;
      const text = colorDivs[index].children[0];
      // On envois text (hex) a checkcolorconstrast
      checkTextContrast(color, text);
      updateTextUI(index);
    });
    // MAJ des sliders
    resetInputs();
  });
  // Add to library
  palette.appendChild(title);
  palette.appendChild(preview);
  palette.appendChild(paletteBtn);
  libraryContainer.children[0].appendChild(palette);
}

function savetoLocal(paletteObj) {
  let localPalettes;
  if (localStorage.getItem("palettes") === null) {
    localPalettes = [];
  } else {
    localPalettes = JSON.parse(localStorage.getItem("palettes"));
  }
  localPalettes.push(paletteObj);
  localStorage.setItem("palettes", JSON.stringify(localPalettes));
}

function openLibrary() {
  const popup = libraryContainer.children[0];
  libraryContainer.classList.add("active");
  popup.classList.add("active");
}

function closeLibrary() {
  const popup = libraryContainer.children[0];
  libraryContainer.classList.remove("active");
  popup.classList.remove("active");
}

function getLocal() {
  if(localStorage.getItem("palettes") === null){
    localPalettes =[];
  }else{
    const paletteObjects = JSON.parse(localStorage.getItem("palettes"));
    savedPalettes = [...paletteObjects];
    paletteObjects.forEach(paletteObj => {
    makelibrary(paletteObj, paletteObjects);
  });
}
}
function raz(){
  localStorage.clear();
  location.reload();
}
getLocal();
randomColors();
