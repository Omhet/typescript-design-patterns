namespace Patterns {
  interface HotBeverage {
    boilWater(): void;
    makeMain(): void;
    pour(): void;
    addCondiments(): void;
    prepare(): void;
  }

  abstract class HotBeverageBase implements HotBeverage {
    prepare(): void {
      this.boilWater();
      this.makeMain();
      this.pour();
      this.addCondiments();
    }
    boilWater(): void {
      console.log("Water is boiled");
    }
    abstract makeMain(): void;
    pour(): void {
      console.log("Poured in a cup");
    }
    abstract addCondiments(): void;
  }

  class CoffeeBeverage extends HotBeverageBase {
    makeMain(): void {
      console.log("Burned coffee");
    }
    addCondiments(): void {
      console.log("Added milk");
    }
  }

  class TeaBeverage extends HotBeverageBase {
    makeMain(): void {
      console.log("Steeped tea");
    }
    addCondiments(): void {
      console.log("Added lemon");
    }
  }

  (() => {
    const coffee = new CoffeeBeverage();
    coffee.prepare();

    const tea = new TeaBeverage();
    tea.prepare();
  })();
}
