let startBtn = document.querySelector(".start");
let introduction = document.querySelector(".introduction");
let teachPage = document.querySelector("#knowledge_box");
let infoBox = document.querySelector("#leftInfo_box");
startBtn.addEventListener("click", enterTeachPage);
function enterTeachPage() {
  introduction.style.display = "none";
  document.querySelector(".dot-spinner").style.display = "block";
  setTimeout(() => {
    document.querySelector(".dot-spinner").style.display = "none";
    teachPage.style.display = "block";
    infoBox.style.display = "block";
  }, 3000);
}
