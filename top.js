const startBtn = document.querySelector(".start-btn");
const statusBtn = document.querySelector(".status-btn");
const valueOut = document.querySelector(".out");

let keyString = "";
let firstName;
let firstHP;
let firstElm;
let firstType;
let secondName;
let secondHP;
let secondElm;
let secondType;
let damage;
let db;

//ステータス
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

//テキスト文
const texts = {
  encounter: {
    text: "モンスターがあらわれた！ (行動を選択してください)",
  },
  attack: {
    text: "こうげきしますか？ (enterキーを押すとこうげきします)",
  },
  magic: {
    text: "まほうをつかいますか？ (enterキーを押すとこうげきします)",
  },
  deathblow: {
    text: "必殺技をつかいますか？(enterキーを押すとこうげきします)",
  },
  win: {
    text: "モンスターを倒した！",
  },
  lose: {
    text: "ダメージを受けてHPが0になってしまった! Game Over",
  },
  guide: {
    text: "(enterを押してください)",
  },
  guide2: {
    text: "行動を選択してください",
  },
  next: {
    text: "最初から始めますか？ (Yキーを押すとスタート画面に戻ります)",
  },
  clear: {
    text: "Game Clear! (Yキーを押すとスタート画面に戻ります)",
  },
};

const settings = {
  statusFlag: {
    Boolean: false,
  },
  action: {
    choice: null,
  },
  round: {
    count: 0,
  },
  actionFlag: {
    Boolean: false,
  },
};

const scenes = {
  init: "Init",
  battle: "Battle",
  event: "Event",
  gameOver: "GameOver",
  gameClear: "GameClear",
};
let scene = scenes.init;

//モンスター
const monsters = {
  slime: {
    name: "スライム",
    type: "slime",
    hp: 20,
    min: 1,
    max: 5,
    dex: 3,
  },
};
let battleEnemy = monsters.slime.type;

const job = {
  hero: {
    name: null,
    hp: null,
    mp: null,
  },
};

window.addEventListener(
  "animationend",
  function () {
    inview(".main-container");
    hide(".container");
  },
  false
);

function inview(el) {
  this.el = document.querySelectorAll(el);
  this.el.forEach(function (e) {
    e.classList.add("inview");
  });
}

function hide(el) {
  this.el = document.querySelectorAll(el);
  this.el.forEach(function (e) {
    e.classList.add("hide");
  });
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

// キー入力チェック
window.onkeydown = function (el) {
  keyCheck(el);
};

function keyCheck(el) {
  if (el.keyCode === 13 && scene === "Battle") {
    const bs = new BattleScene(battleEnemy);
  } else if (el.keyCode === 13 && scene === "GameOver") {
    changeHTML(".text", texts.next.text);
  } else if (el.keyCode === 89 && scene === "GameOver") {
    location.reload();
  } else if (el.keyCode === 13 && scene === "GameClear") {
    changeHTML(".text", texts.clear.text);
  } else if (el.keyCode === 89 && scene === "GameClear") {
    location.reload();
  }
}

// ステータス割り振り
statusBtn.addEventListener("click", function () {
  settings.statusFlag.Boolean = true;

  const rn = new RandomNumber();

  const keys = Object.keys(statuses);
  keys.forEach((status) => {
    let type = status;
    let minNum = statuses[type].min;
    let maxNum = statuses[type].max;

    let num = rn.number(minNum, maxNum);
    document.querySelector(`.${type}`).innerHTML = num;
    document.querySelector(`.${type}`).style.padding = "8.5px";
    statuses[type].valueOfStatus = num;
  });

  job.hero.hp = rn.health(
    statuses.con.valueOfStatus,
    statuses.siz.valueOfStatus
  );

  job.hero.mp = statuses.pow.valueOfStatus;

  changeHTML(".health", job.hero.hp);
  changeHTML(".mental", statuses.pow.valueOfStatus);
  changeHTML(".db", job.hero.hp);
  changeHTML(".m-db", Math.floor(statuses.con.valueOfStatus / 2));
  changeHTML(
    ".rate",
    Math.floor(
      ((statuses.edu.valueOfStatus - 5) / statuses.edu.valueOfStatus) * 100
    ) + "%"
  );
});

//ダイスロール
class RandomNumber {
  number(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }
  health(con, siz) {
    return Math.floor((con + siz) / 2);
  }
}

//ゲームスタート
startBtn.addEventListener("click", function () {
  scene = scenes.event;

  job.hero.name = valueOut.value;

  if (job.hero.name === "") {
    alert("名前を入力してください");
  } else if (settings.statusFlag.Boolean === false) {
    alert("ステータスを振ってください");
  } else {
    hide(".btn");
    hide(".out");

    transform(".text-box");
    transform(".text");
    transform(".status-container");
    transform(".character-img");
    transform(".back-img");
    transform(".back-img2");
    transform(".status");

    changeHTML(".character-name", job.hero.name);
    changeHTML(".text", texts.encounter.text);
    changeHTML(".enemy-name", monsters.slime.name);
    changeHTML(".enemy-health", monsters.slime.hp);
    changeHTML(".enemy-dex", monsters.slime.dex);

    const ta = new TextAnimation(".text");

    inview(".character-img2");
    inview(".action-choice");
    inview(".enemy");
    inview(".ability");
  }
});

function changeHTML(el, contain) {
  document.querySelector(el).innerHTML = contain;
}

function transform(el) {
  this.el = document.querySelectorAll(el);
  this.el.forEach(function (e) {
    e.classList.add("transform");
  });
}

//アクション選択
document.addEventListener(
  "click",
  (elem) => {
    if (settings.actionFlag.Boolean === false) {
      action("action", elem);
    }
  },
  false
);

function action(el, elem) {
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

    // 選択マークの三角表示
    const choice = document.createElement("span");
    choice.className = "choice";
    elem.target.appendChild(choice);

    scene = scenes.battle;

    if (targetId === "attack") {
      changeHTML(".text", texts.attack.text);
      settings.action.choice = "attack";
    } else if (targetId === "magic") {
      changeHTML(".text", texts.magic.text);
      settings.action.choice = "magic";
    } else if (targetId === "deathblow") {
      changeHTML(".text", texts.deathblow.text);
      settings.action.choice = "deathblow";
    }
  }
}

// バトル
class BattleScene {
  constructor() {
    settings.actionFlag.Boolean = true;
    this._Slime();
  }

  _Slime() {
    // すばやさ判定
    if (monsters.slime.dex > statuses.dex.valueOfStatus) {
      firstName = job.hero.name;
      firstHP = job.hero.hp;
      firstElm = ".health";
      firstType = "hero";

      secondName = monsters.slime.name;
      secondHP = monsters.slime.hp;
      secondElm = ".enemy-health";
      secondType = "enemy";
    } else {
      firstName = monsters.slime.name;
      firstHP = monsters.slime.hp;
      firstElm = ".enemy-health";
      firstType = "enemy";

      secondName = job.hero.name;
      secondHP = job.hero.hp;
      secondElm = ".health";
      secondType = "hero";
    }

    if (settings.round.count == 0) {
      // 先行の攻撃
      attack(".text", firstName, firstHP, firstElm, firstType);
    } else if (settings.round.count == 1) {
      // 後攻の攻撃
      attack(".text", secondName, secondHP, secondElm, secondType);
    } else if (settings.round.count == 2) {
      // ターン終了
      settings.round.count = -1;
      settings.actionFlag.Boolean = false;
      changeHTML(".text", texts.guide2.text);
    }

    settings.round.count++;
  }
}

function attack(el, name, hp, elm, type) {
  const rn = new RandomNumber();
  scene = scenes.battle;

  let hit = rn.number(1, statuses.edu.valueOfStatus);

  if (type != "hero") {
    //ダメージボーナス
    db = rn.health(statuses.con.valueOfStatus, statuses.siz.valueOfStatus);

    if (settings.action.choice === "attack") {
      //ダメージ 1d6
      damage = rn.number(1, 6);
    } else if (settings.action.choice === "magic") {
      //ダメージ 1d(pow/2)
      damage = rn.number(1, Math.floor(statuses.con.valueOfStatus / 2));
    } else if (settings.action.choice === "deathblow" && hit >= 6) {
      //必殺技 成功判定
      damage = rn.number(1, 6) + db;
    } else if (settings.action.choice === "deathblow" && hit <= 6) {
      //必殺技 失敗
      damage = 0;
    }
  } else {
    damage = rn.number(1, monsters.slime.max);
  }

  if (damage === 0) {
    document.querySelector(el).innerHTML =
      name + " はこうげきをかわした！" + texts.guide.text;
  } else {
    document.querySelector(el).innerHTML =
      name + ` は ${damage} のダメージをうけた！` + texts.guide.text;
  }

  hp -= damage;
  if (type === "hero") {
    job.hero.hp = hp;
  } else {
    monsters.slime.hp = hp;
  }

  // hp判定
  // if (enemy === "slime") {
  if (monsters.slime.hp <= 0) {
    changeHTML(".text", texts.win.text);
    settings.actionFlag.Boolean = false;
    scene = scenes.gameClear;
    hide(".character-img2");
  } else if (job.hero.hp <= 0) {
    changeHTML(".text", texts.lose.text);
    settings.actionFlag.Boolean === false;
    scene = scenes.gameOver;
    hide(".character-img");
  }
  // }

  changeHTML(elm, hp);
}
