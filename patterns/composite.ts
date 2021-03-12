namespace Patterns {
  abstract class MenuNode {
    abstract name: string;
    abstract price: number | undefined;

    abstract addNode(item: MenuNode): void;
    abstract print(): void;
  }

  class Menu extends MenuNode {
    price = undefined;
    nodes: MenuNode[] = [];

    constructor(public name: string) {
      super();
    }
    addNode(node: MenuNode): void {
      this.nodes.push(node);
    }
    print(): void {
      console.log(this.name);
      for (const node of this.nodes) {
        node.print();
      }
    }
  }

  class MenuItem extends MenuNode {
    constructor(public name: string, public price: number) {
      super();
    }
    addNode(item: MenuNode): void {
      throw new Error("Method not implemented.");
    }
    print(): void {
      console.log(`${this.name} - ${this.price}`);
    }
  }

  (() => {
    const breakfastMenu = new Menu("Breakfast");
    breakfastMenu.addNode(new MenuItem("Eggs", 50));
    breakfastMenu.addNode(new MenuItem("Milk", 30));
    breakfastMenu.addNode(new MenuItem("Tea", 10));

    const dessertMenu = new Menu("Desserts");
    dessertMenu.addNode(new MenuItem("Cake", 50));
    dessertMenu.addNode(new MenuItem("Cream", 30));

    const lunchMenu = new Menu("Lunch");
    lunchMenu.addNode(new MenuItem("Steak", 50));
    lunchMenu.addNode(new MenuItem("Pasta", 30));
    lunchMenu.addNode(new MenuItem("Fish", 10));
    lunchMenu.addNode(dessertMenu);

    const menu = new Menu("Menu");
    menu.addNode(breakfastMenu);
    menu.addNode(lunchMenu);
    menu.print();
  })();
}
