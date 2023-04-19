const loading = document.querySelector(".container");
const loading_after = document.querySelector(".main-container");
const start_btn = document.querySelector(".start-btn");

window.addEventListener(
  "animationend",
  function () {
    loading.classList.add("hide");
    loading_after.classList.add("inview");
  },
  false
);

window.addEventListener("DOMContentLoaded", function () {
  const ta = new TextAnimation(".loading-animation");
});

class TextAnimation {
  constructor(el) {
    this.el = document.querySelector(el);
    this.chars = this.el.innerHTML.trim().split("");
    // console.log(this.chars);
    this.el.innerHTML = this._splitText();
  }

  _splitText() {
    return this.chars.reduce((acc, curr) => {
      return `${acc}<span class="char">${curr}</span>`;
    }, "");
  }
}

// document.addEventListener("click", function () {
//   start - btn.classList.add("hide");
// });
