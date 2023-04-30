const startBtn = document.querySelector(".start-btn");
const statusBtn = document.querySelector(".status-btn");
const healthValue = document.querySelector(".health");

window.addEventListener(
  "animationend",
  function () {
    const ic = new InviewClass();
    ic.inview(".main-container");
    const hc = new HideClass();
    hc.hide(".container");
  },
  false
);

class InviewClass {
  inview(el) {
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

//ステータス割り振り
const statuses = {
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

const texts = {
  encounter: {
    text: "モンスターがあらわれた！",
  },
  battle: {
    text: "こうげきしますか？ Y or N (キーを押してください)",
  },
  magic: {
    text: "まほうをつかいますか？ Y or N (キーを押してください)",
  },
};

let flag = false;
let health = "";
statusBtn.addEventListener("click", function () {
  flag = true;
  const rn = new RandomNumber();
  const cg = new ChangeHtml();
  cg.change(".mental", statuses.pow.valueOfStatus);
});

class RandomNumber {
  constructor() {
    const keys = Object.keys(statuses);
    keys.forEach((status) => {
      let type = status;
      let minNum = statuses[type].min;
      let maxNum = statuses[type].max;

      let num = this._Number(minNum, maxNum);
      document.querySelector(`.${type}`).innerHTML = num;
      document.querySelector(`.${type}`).style.padding = "8.5px";
      statuses[type].valueOfStatus = num;
    });
    healthValue.innerHTML = this._Health(
      statuses.con.valueOfStatus,
      statuses.siz.valueOfStatus
    );
  }

  _Number(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }
  _Health(con, siz) {
    return Math.floor((con + siz) / 2);
  }
}

//ゲームスタート
startBtn.addEventListener("click", function () {
  statuses.valueOfHeroName = document.querySelector(".out").innerHTML;

  const hero_name = statuses.valueOfHeroName;

  if (hero_name === "") {
    alert("名前を入力してください");
  } else if (flag === false) {
    alert("ステータスを振ってください");
  } else {
    const hc = new HideClass();
    hc.hide(".btn");
    hc.hide(".out");

    const tf = new Transform();
    tf.transform(".text-box");
    tf.transform(".text");
    tf.transform(".status-container");
    tf.transform(".character-img");

    const cg = new ChangeHtml();
    cg.change(".character-name", hero_name);
    cg.change(".text", texts.encounter.text);

    const ta = new TextAnimation(".text");

    tf.transform(".back-img");
    tf.transform(".back-img2");

    const ic = new InviewClass();
    ic.inview(".character-img2");
    ic.inview(".action-choice");
  }
});

class ChangeHtml {
  change(el, contain) {
    document.querySelector(el).innerHTML = contain;
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

//アクション選択
document.addEventListener(
  "click",
  (elem) => {
    const ch = new Choice();
    ch.action("action", elem);
  },
  false
);

class Choice {
  action(el, elem) {
    const actionChoice = document.querySelectorAll(`.${el}`);
    let target = elem.target.className;
    let targetId = elem.target.id;
    if (target === el) {
      actionChoice.forEach(function (e) {
        let temp = e.querySelector(".choice");
        if (temp !== null) {
          e.removeChild(temp);
        }
      });

      const choice = document.createElement("span");
      choice.className = "choice";
      elem.target.appendChild(choice);

      const cg = new ChangeHtml();
      if (targetId === "battle") {
        cg.change(".text", texts.battle.text);
      } else if (targetId === "magic") {
        cg.change(".text", texts.magic.text);
      }
    }
  }
}
