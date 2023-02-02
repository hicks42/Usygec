// Creation des éléments
let controller;   //va recevoir cardScene et pageScene
let cardScene;    // animation horizontale
let pageScene;    // animation verticale
let detailScene;  // animation ds pages

const logo = document.getElementById("#logo");
const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");

function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}

function activeCursor(e) {
  const item = e.target;
  if (item.id === "logo" || item.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.id === "logo") {
    mouse.classList.add("z-active");
  } else {
    mouse.classList.remove("z-active");
  }
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, { y: "0%" });
    mouseTxt.innerText = "Cliquez";
  } else {
    mouse.classList.remove("explore-active");
    gsap.to(".title-swipe", 1, { y: "100%" });
    mouseTxt.innerText = "";
  }
}

function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
    gsap.to("#logo", 1, { color: "black" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to("#logo", 1, { color: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    document.body.classList.remove("hide");
  }
}

function creneau(index, card) {
  if (index == 2) {
    card.style.margin = "15em 0 2em 0";
  } else {
    card.style.margin = "0 0 2em 0";
  }
}

function animateCards() {
  controller = new ScrollMagic.Controller();
  const cards = document.querySelectorAll(".card");
  const nav = document.querySelector(".nav-header");

  //loop through cards
  cards.forEach((card, index, cards) => {

    //GSAP Animation sur les slide (horizontale)
    const cardTimeLine = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" }
    });

    cardTimeLine.fromTo(card, { opacity: 0, scale: 1 }, { opacity: 1, scale: 1 });
    //create card scene SCROLLLMAGIC
    cardScene = new ScrollMagic.Scene({
      triggerElement: card,
      triggerHook: 0.6,
      reverse: true,
    })
      .setTween(cardTimeLine)
      // .addIndicators({ colorStart: "black", colorTrigger: "orange", name: "card" })
      .addTo(controller);
    creneau(index, card);
  });
}

function animateLogo() {
  gsap.registerPlugin(MotionPathPlugin);

  gsap.to("#logo", { duration: 5, motionPath: "#path" });
}

animateLogo();
animateCards();
//Envent lanimateCardsistener
burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);
