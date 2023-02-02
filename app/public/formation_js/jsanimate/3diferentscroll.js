/////// scrolling control SOLUTION 1

//const subject2_exp = document.querySelector('.subject1-explore');

// window.addEventListener('scroll', scrollreveal);

// function scrollreveal(){
//   const subject3_pos = subject2_exp.getBoundingClientRect().top;

//   // obtenir la hauteur de l'écran
//   const windowHeight = window.innerHeight;
//   const halfScreen = windowHeight / 1.8;

//   if (subject3_pos < halfScreen){
//     subject2_exp.style.color= "red";
//   }
// }


/////// scrolling control SOLUTION 2
// const slide2 = document.querySelector(".subject2");

// let options = {
//   threshold: 0.9
// };

// let observer = new IntersectionObserver(slideAnnimation, options);

// function slideAnnimation(entries) {
//   entries.forEach( entry => {
//     if(entry.isIntersecting){
//       slide2.style.background = "white";
//     }
//   });
// }
// observer.observe(slide2);


const controller = new ScrollMagic.Controller();

const exploreScene = new ScrollMagic.Scene({
  triggerElement: ".subject2-explore",
  triggerHook: 0.5
})
.addIndicators({ colorStart: "white", colorTrigger: "yellow" })
.setClassToggle('.subject2-explore', 'active')
.addTo(controller);
