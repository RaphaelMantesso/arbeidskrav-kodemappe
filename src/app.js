function saveCharacter(name, hp, attack, profileImage) {
  if (!name || isNaN(hp) || isNaN(attack) || !profileImage) {
    return false;
  }
  const character = { name, hp, attack, profileImage };
  localStorage.setItem("character", JSON.stringify(character));
  return true;
}

function generateEnemy() {
  const enemyNames = ["Goblin", "Ork", "Drage"];
  const enemyImages = [
    "assets/swamp-monster.jpg",
    "assets/monster.jpg",
    "assets/dragon.jpg",
  ];

  const randomIndex = Math.floor(Math.random() * enemyNames.length);
  const enemy = {
    name: enemyNames[randomIndex],
    hp: Math.floor(Math.random() * 100) + 50,
    attack: Math.floor(Math.random() * 20) + 5,
    profileImage: enemyImages[randomIndex],
  };

  localStorage.setItem("enemy", JSON.stringify(enemy));
  return enemy;
}

function fight(character, enemy) {
  while (character.hp > 0 && enemy.hp > 0) {
    enemy.hp -= character.attack;
    if (enemy.hp <= 0) {
      return true;
    }

    character.hp -= enemy.attack;
    if (character.hp <= 0) {
      return false;
    }
  }
}

function startFight() {
  const character = JSON.parse(localStorage.getItem("character"));
  const enemy = JSON.parse(localStorage.getItem("enemy"));

  if (!character || !enemy) {
    return {
      message:
        "Du må lage en karakter og generere en fiende før du kan starte kampen!",
    };
  }

  const playerWon = fight(character, enemy);
  return { character, enemy, playerWon };
}

if (typeof document == "undefined") {
  module.exports = { saveCharacter, generateEnemy, fight, startFight };
} else {
  document
    .getElementById("create-character")
    .addEventListener("click", function () {
      const name = document.getElementById("character-name").value;
      const hp = parseInt(document.getElementById("character-hp").value);
      const attack = parseInt(document.getElementById("attack-damage").value);
      const profileImage = document.querySelector(".profile-img.selected")?.src;

      if (saveCharacter(name, hp, attack, profileImage)) {
        alert("Karakteren din er lagret!");
      } else {
        alert("Vennligst fyll ut alle feltene og velg et profilbilde!");
      }
    });

  document.querySelectorAll(".profile-img").forEach((img) => {
    img.addEventListener("click", function () {
      document
        .querySelectorAll(".profile-img")
        .forEach((img) => img.classList.remove("selected"));
      this.classList.add("selected");
    });
  });

  document
    .getElementById("generate-enemy")
    .addEventListener("click", function () {
      const enemy = generateEnemy();

      document.getElementById("enemy-img").src = enemy.profileImage;
      document.getElementById("enemy-name").textContent = `Navn: ${enemy.name}`;
      document.getElementById("enemy-hp").textContent = `HP: ${enemy.hp}`;
      document.getElementById(
        "enemy-attack"
      ).textContent = `Angrepsstyrke: ${enemy.attack}`;
    });

  document.getElementById("start-fight").addEventListener("click", function () {
    const result = startFight();

    if (result.message) {
      alert(result.message);
      return;
    }

    const { character, enemy, playerWon } = result;

    let charDisplay = document.getElementById("character-display");
    if (!charDisplay) {
      charDisplay = document.createElement("div");
      charDisplay.id = "character-display";
      charDisplay.className = "profile-card";
      document.getElementById("battle-area").appendChild(charDisplay);
    }
    charDisplay.innerHTML = `
          <h2>Helten</h2>
          <img id="char-img" src="${character.profileImage}" alt="Profilbilde" />
          <p id="char-name">Navn: ${character.name}</p>
          <p id="char-hp">HP: ${character.hp}</p>
          <p id="char-attack">Angrepsstyrke: ${character.attack}</p>
      `;

    let enemyDisplay = document.getElementById("enemy-fight-display");
    if (!enemyDisplay) {
      enemyDisplay = document.createElement("div");
      enemyDisplay.id = "enemy-fight-display";
      enemyDisplay.className = "profile-card";
      document.getElementById("battle-area").appendChild(enemyDisplay);
    }
    enemyDisplay.innerHTML = `
          <h2>Fiende</h2>
          <img src="${enemy.profileImage}" alt="Fiendens profilbilde" />
          <p>Navn: ${enemy.name}</p>
          <p>HP: ${enemy.hp}</p>
          <p>Angrepsstyrke: ${enemy.attack}</p>
      `;

    const battleResult = document.getElementById("battle-result");
    battleResult.textContent = playerWon
      ? `${character.name} vant kampen!`
      : `${enemy.name} vant kampen!`;
  });
}
