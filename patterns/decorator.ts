abstract class Beverage {
  abstract price: number;
  desc: string | undefined;

  getDesc() {
    return this.desc;
  }

  getCost(): number {
    return this.price;
  }
}

class Coffee extends Beverage {
  price = 50;
  desc = "Coffee";
}
class Tea extends Beverage {
  price = 40;
  desc = "Tea";
}
class OrangeJuice extends Beverage {
  price = 60;
  desc = "Orange Juice";
}

class BeverageDecorator extends Beverage {
  price = 0; // This is wrong
  beverage: Beverage;

  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  getDesc() {
    return `${this.beverage.getDesc()}, ${this.desc}`;
  }

  getCost(): number {
    return this.beverage.getCost() + this.price;
  }
}

class WithMilk extends BeverageDecorator {
  price = 20;
  desc = "Milk";
}
class WithLemon extends BeverageDecorator {
  price = 10;
  desc = "Lemon";
}
class WithIce extends BeverageDecorator {
  price = 5;
  desc = "Ice";
}

function main() {
  const coffee = new Coffee();
  console.log(coffee.getDesc(), coffee.getCost());

  const coffee2 = new WithMilk(new Coffee());
  console.log(coffee2.getDesc(), coffee2.getCost());

  const tea = new WithIce(new WithLemon(new WithMilk(new Tea())));
  console.log(tea.getDesc(), tea.getCost());
}

main();
