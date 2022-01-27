require("./final_data.json");
const toggleCollapse = document.querySelector("nav .ham-burger");
const nav = document.querySelector("nav");
const bodymovin = require("lottie-web");
toggleCollapse.onclick = () => {
  nav.classList.toggle("collapse");
  if ($(".ham").hasClass("fa-bars")) {
    $(".ham").addClass("fa-times").removeClass("fa-bars");
  } else {
    $(".ham").addClass("fa-bars").removeClass("fa-times");
  }
};
const speed = 500;

$('a[href*="#"]')
  .filter(
    (i, a) =>
      a.getAttribute("href").startsWith("#") ||
      a.href.startsWith(`${location.href}#`)
  )
  .unbind("click.smoothScroll")
  .bind("click.smoothScroll", (event) => {
    const targetId = event.currentTarget.getAttribute("href").split("#")[1];
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      event.preventDefault();
      $("html, body").animate(
        { scrollTop: $(targetElement).offset().top },
        speed
      );
    }
  });
/*********************PAGE LOADER******************/
var animation = bodymovin.loadAnimation({
  container: document.getElementById("page-load"),
  loop: true,
  autoplay: true,
  path: "./assets/final_data.json",
});
animation.setSpeed(5);
window.onload = function () {
  $("#body").addClass("body");
};
$(window).on("load", function () {
  $("#page-load").delay(0).fadeOut("slow");
});
/********************************************************************/
let barrer = document.getElementById("progress");
window.addEventListener("scroll", () => {
  let max = document.body.scrollHeight - innerHeight;
  barrer.style.width = `${(pageYOffset / max) * 100}%`;
});
