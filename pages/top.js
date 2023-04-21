const startBtn = document.querySelector(".start-btn");
const statusBtn = document.querySelector(".status-btn");
const img = document.querySelector("back-img2");

window.addEventListener(
  "animationend",
  function () {
    const ic = new InviewClass(".main-container");
    const hc = new HideClass(".container");
  },
  false
);

class InviewClass {
  constructor(el) {
    this.el = document.querySelectorAll(el);
    this.el.forEach(function (e) {
      e.classList.add("inview");
    });
  }
}

class HideClass {
  hide(el) {
    this.el = document.querySelectorAll(el);
    this.el.forEach(function (e) {
      e.classList.add("hide");
    });
  }
}

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

statusBtn.addEventListener("click", function () {
  const rn = new RandomNumber();
});

class RandomNumber {
  constructor() {
    const todos = {
      str: {
        min: 3,
        max: 18,
      },
      con: {
        min: 3,
        max: 18,
      },
      dex: {
        min: 3,
        max: 18,
      },
      app: {
        min: 3,
        max: 18,
      },
      pow: {
        min: 3,
        max: 18,
      },
      siz: {
        min: 8,
        max: 18,
      },
      int: {
        min: 8,
        max: 18,
      },
      edu: {
        min: 6,
        max: 21,
      },
    };

    const keys = Object.keys(todos);
    keys.forEach((todo) => {
      let type = todo;
      let minNum = todos[type].min;
      let maxNum = todos[type].max;

      let num = this._Number(minNum, maxNum);
      document.querySelector(`.${todo}`).innerHTML = num;
      document.querySelector(`.${todo}`).style.padding = "8.5px";
    });
  }

  _Number(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }
}

//ゲームスタート
startBtn.addEventListener("click", function () {
  const hn = new HeroName();
  const hero_name = hn.name();

  if (hero_name === "") {
    alert("名前を入力してください");
  } else {
    const hc = new HideClass();
    hc.hide(".btn");
    hc.hide(".out");

    const tf = new Transform();
    tf.transform(".text-box");
    tf.transform(".status-container");
    tf.transform(".character-img");

    document.querySelector(".text").innerHTML = "モンスターがあらわれた！";
    const ta = new TextAnimation(".text");

    tf.transform(".back-img");
    tf.transform(".back-img2");

    const ic = new InviewClass(".character-img2");
  }
});

class HeroName {
  name() {
    return document.querySelector(".out").innerHTML;
  }
}

class Transform {
  transform(el) {
    this.el = document.querySelectorAll(el);
    this.el.forEach(function (e) {
      e.classList.add("transform");
    });
  }
}
