// Creation des éléments
let controller;   // va recevoir cardScene et pageScene
let cardScene;    // animation horizontale
let slideScene;   // animation horizontale
let pageScene;    // animation verticale
let detailScene;  // animation ds pages

function animateSlides() {
  controller = new ScrollMagic.Controller();

  const slides = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  //loop through slides
  slides.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");

    //GSAP Animation sur les slide (horizontale)
    const slideTimeLine = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" }
    });
    slideTimeLine.fromTo(revealImg, { x: "0%" }, { x: "100%" }, { scale: 1.5 });
    slideTimeLine.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTimeLine.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    slideTimeLine.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5"); // change

    //create slide scene SCROLLLMAGIC
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTimeLine)
      // .addIndicators({ colorStart: "white", colorTrigger: "yellow", name: "diapo" })
      .addTo(controller);

    // New GSAP animation sur les pages (sections)
    const pageTimeline = gsap.timeline();

    // selection de la prochaine slide
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageTimeline.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTimeline.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0 });
    pageTimeline.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");

    // Create page scene SCROLLLMAGIC
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      // .addIndicators({ colorStart: "white", colorTrigger: "yellow", name: "page", indent: 200 })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTimeline)
      .addTo(controller);
  });
}

// const logo = document.getElementById("#logo");
const logo = document.querySelector("#logo");
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
  if (item.classList.contains("subject-img")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, { y: "0%" });
    mouseTxt.innerText = "";
  } else {
    mouse.classList.remove("explore-active");
    gsap.to(".title-swipe", 1, { y: "100%" });
    mouseTxt.innerText = "";
  }
}

function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "rgb(126, 126, 126)" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "rgb(126, 126, 126)" });
    gsap.to("#logo", 1, { color: "rgb(126, 126, 126)" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "rgb(126, 126, 126)" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "rgb(126, 126, 126)" });
    gsap.to("#logo", 1, { color: "rgb(126, 126, 126)" });
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
  // const nav = document.querySelector(".nav-header"); sert a rien

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

function detailAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail-slide");

  slides.forEach((slide, index, slides) => {
    const slideTimeLine = gsap.timeline({ defaults: { duration: 1 } });

    //              |   is it the last slide  |         if not next slide
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];

    const nextImage = nextSlide.querySelector("img");
    slideTimeLine.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTimeLine.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTimeLine.fromTo(nextImage, { x: '50%', opacity: 0 }, { x: '0', opacity: 1 });

    // scene
    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTimeLine)
      // .addIndicators({ colorStart: "black", colorTrigger: "red", name: "detailScene", indent: 250 })
      .addTo(controller);
  });
}

// BARBA Page transition
// const logo = document.querySelector("#logo")
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateCards();
        logo.href = "./index.html";
      },
      beforeLeave() {
        cardScene.destroy();
        pageScene.destroy();
        controller.destroy();
      }
    },
    {
      namespace: "subject2",
      beforeEnter() {
        animateSlides();
        logo.href = "../index.html";
      },
      beforeLeave() {
        slideScene.destroy();
        controller.destroy();
      }
    },
    {
      namespace: "subject3",
      beforeEnter() {
        detailAnimation();
        logo.href = "../index.html";
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      }
    }
  ],
  transitions: [
    {
      leave({ current, next }) {
        // using barba async() to launch the animation
        let done = this.async();

        // animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".swipe",                       // element
          0.75,                           // durée de l'animation
          { x: "-100%" },                 // position de départ
          { x: "0%", onComplete: done },  // position d'arrivée + async
          "-=0.5"                         // delay entre actions
        );
      },
      enter({ current, next }) {
        //using barba async() to launch the animation
        let done = this.async();

        //scroll to top
        window.scrollTo(0, 0);

        //  animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(".swipe", 1, { x: "0%" }, { x: "100%", stagger: 0.25, onComplete: done });
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        tl.fromTo(".nav-header", 1, { y: "-100%" }, { y: "0%", ease: "power2.inOut" }, "-=1.5");
      }
    }
  ]
});

function animateLogo() {
  gsap.registerPlugin(MotionPathPlugin);

  gsap.to("#logo", { duration: 5, motionPath: "#path" });
}

// animateLogo();
// animateCards();

// Envent listener
burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);
