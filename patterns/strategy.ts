interface WeaponBehavior {
    useWeapon(): void;
}

class KnifeBehavior implements WeaponBehavior {
    useWeapon(): void {
        console.log('Fight with knife')
    }
}

class AxeBehavior implements WeaponBehavior {
    useWeapon(): void {
        console.log('Fight with axe')
    }
}

abstract class Character {
    wb: WeaponBehavior;
    abstract fight(): void;
}

class Thief extends Character {
    constructor() {
        super();
        this.wb = new KnifeBehavior();
    }

    fight(): void {
        this.wb.useWeapon();
    }
}

class Ork extends Character {
    constructor() {
        super();
        this.wb = new AxeBehavior();
    }

    fight(): void {
        this.wb.useWeapon();
    }
}

(() => {
    const thief = new Thief();
    const ork = new Ork();

    const chars: Character[] = [];
    chars.push(ork);
    chars.push(thief);

    for (const char of chars) {
        char.fight();
    }
})()