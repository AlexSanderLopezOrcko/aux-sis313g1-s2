const main = document.getElementById("main");
/*
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");

btnLeft.addEventListener("click", () => {
  main.scrollBy({ left: -main.clientWidth, behavior: "smooth" });
});

btnRight.addEventListener("click", () => {
  main.scrollBy({ left: main.clientWidth, behavior: "smooth" });
});
*/

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    main.scrollBy({ left: main.clientWidth, behavior: "smooth" });
  }
  if (event.key === "ArrowLeft") {
    main.scrollBy({ left: -main.clientWidth, behavior: "smooth" });
  }
});
