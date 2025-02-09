const { saveCharacter, generateEnemy, fight } = require("../src/app.js");

global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value;
  },
  clear() {
    this.store = {};
  },
};

describe("saveCharacter", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should save character to localStorage when all parameters are valid", () => {
    const result = saveCharacter("Hero", 100, 20, "profile.jpg");
    const savedCharacter = JSON.parse(localStorage.getItem("character"));

    expect(result).toBe(true);
    expect(savedCharacter).toEqual({
      name: "Hero",
      hp: 100,
      attack: 20,
      profileImage: "profile.jpg",
    });
  });

  it("should return false if name is missing", () => {
    const result = saveCharacter("", 100, 20, "profile.jpg");
    expect(result).toBe(false);
  });

  it("should return false if hp is not a number", () => {
    const result = saveCharacter("Hero", "invalid", 20, "profile.jpg");
    expect(result).toBe(false);
  });

  it("should return false if attack is not a number", () => {
    const result = saveCharacter("Hero", 100, "invalid", "profile.jpg");
    expect(result).toBe(false);
  });

  it("should return false if profileImage is missing", () => {
    const result = saveCharacter("Hero", 100, 20, "");
    expect(result).toBe(false);
  });
});

describe("generateEnemy", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should generate an enemy and save it to localStorage", () => {
    const enemy = generateEnemy();
    const savedEnemy = JSON.parse(localStorage.getItem("enemy"));

    expect(savedEnemy).toEqual(enemy);
    expect(savedEnemy.name).toBeDefined();
    expect(savedEnemy.hp).toBeGreaterThanOrEqual(50);
    expect(savedEnemy.hp).toBeLessThanOrEqual(150);
    expect(savedEnemy.attack).toBeGreaterThanOrEqual(5);
    expect(savedEnemy.attack).toBeLessThanOrEqual(25);
    expect(savedEnemy.profileImage).toBeDefined();
  });
});

describe("fight", () => {
  it("should return true if character wins", () => {
    const character = {
      name: "Hero",
      hp: 100,
      attack: 20,
      profileImage: "profile.jpg",
    };
    const enemy = {
      name: "Goblin",
      hp: 50,
      attack: 10,
      profileImage: "goblin.jpg",
    };

    const result = fight(character, enemy);
    expect(result).toBe(true);
  });

  it("should return false if enemy wins", () => {
    const character = {
      name: "Hero",
      hp: 50,
      attack: 10,
      profileImage: "profile.jpg",
    };
    const enemy = {
      name: "Goblin",
      hp: 100,
      attack: 20,
      profileImage: "goblin.jpg",
    };

    const result = fight(character, enemy);
    expect(result).toBe(false);
  });
});
