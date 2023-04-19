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
    this.el.innerHTML = this._splitText();
  }

  _splitText() {
    return this.chars.reduce((acc, curr) => {
      return `${acc}<span class="char">${curr}</span>`;
    }, "");
  }
}

let keyString = "";
window.onkeydown = function (el) {
  const na = new NameAnimation(el);
};

class NameAnimation {
  constructor(el) {
    let key = el.key;

    if (el.keyCode === 8) {
      keyString = keyString.slice(0, -1);
      document.querySelector(".out").innerHTML = keyString;
    } else if (el.keyCode === 0) {
      event.preventDefault();
    } else {
      keyString += key;
      document.querySelector(".out").innerHTML = keyString;
    }
  }
}

// document.addEventListener("click", function () {
//   start - btn.classList.add("hide");
// });
