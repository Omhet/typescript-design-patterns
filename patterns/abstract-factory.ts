interface MonsterFactory {
  createWeapon(): Weapon;
  createOutfit(): Outfit;
}

interface Weapon {
  desc: string;
}
interface Outfit {
  desc: string;
}

class MonsterArmy {
  characterFactory: MonsterFactory;

  constructor(characterFactory: MonsterFactory) {
    this.characterFactory = characterFactory;
  }

  createMonster(type: string): Monster {
    switch (type) {
      case "goblin":
        return new Goblin(this.characterFactory);
      case "troll":
        return new Troll(this.characterFactory);
      default:
        throw new Error("Not implemented");
    }
  }
}

abstract class Monster {
  weapon!: Weapon;
  outfit!: Outfit;
  abstract type: string;

  constructor(characterFactory: MonsterFactory) {
    this.weapon = characterFactory.createWeapon();
    this.outfit = characterFactory.createOutfit();
  }

  getDescription() {
    return `I'm ${this.type}. Fighting with ${this.weapon.desc}. Wearing ${this.outfit.desc}`;
  }
}

class Goblin extends Monster {
  type = "Goblin";
}
class Troll extends Monster {
  type = "Troll";
}

class DesertMonsterFactory implements MonsterFactory {
  createWeapon(): Weapon {
    return { desc: "Desert blades" };
  }
  createOutfit(): Outfit {
    return { desc: "Desert cape" };
  }
}
class SwampMonsterFactory implements MonsterFactory {
  createWeapon(): Weapon {
    return { desc: "Swamp blades" };
  }
  createOutfit(): Outfit {
    return { desc: "Swamp cape" };
  }
}

(function () {
  const desertFactory = new DesertMonsterFactory();
  const desertArmy = new MonsterArmy(desertFactory);
  const desertGoblin = desertArmy.createMonster("goblin");
  const desertTroll = desertArmy.createMonster("troll");
  console.log(desertGoblin.getDescription());
  console.log(desertTroll.getDescription());

  const swampFactory = new SwampMonsterFactory();
  const swampArmy = new MonsterArmy(swampFactory);
  const swampGoblin = swampArmy.createMonster("goblin");
  const swampTroll = swampArmy.createMonster("troll");
  console.log(swampGoblin.getDescription());
  console.log(swampTroll.getDescription());
})();
