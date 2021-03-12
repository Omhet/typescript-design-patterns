namespace Patterns {
  interface Menu {
    getIterator(): IterableIterator<MenuItem>;
  }

  interface MenuItem {
    name: string;
    price: number;
  }

  class BreakfastMenu implements Menu {
    items: MenuItem[] = [];

    getIterator(): IterableIterator<MenuItem> {
      return this.items.values();
    }

    addItem(item: MenuItem) {
      this.items.push(item);
    }
  }
  class LunchMenu implements Menu {
    items: Map<string, MenuItem> = new Map();

    getIterator(): IterableIterator<MenuItem> {
      return this.items.values();
    }

    addItem(item: MenuItem) {
      this.items.set(item.name, item);
    }
  }

  const printMenu = (menu: Menu) => {
    const iterator = menu.getIterator();
    for (const { price, name } of iterator) {
      console.log(`${name} - ${price}`);
    }
  };

  (() => {
    const breakfastMenu = new BreakfastMenu();
    breakfastMenu.addItem({ price: 100, name: "Eggs" });
    breakfastMenu.addItem({ price: 50, name: "Milk" });
    breakfastMenu.addItem({ price: 30, name: "Tea" });

    const lunchMenu = new LunchMenu();
    lunchMenu.addItem({ price: 80, name: "Steak" });
    lunchMenu.addItem({ price: 50, name: "Pasta" });
    lunchMenu.addItem({ price: 40, name: "Fish" });

    console.log("Breakfast menu");
    printMenu(breakfastMenu);
    console.log("\nLunch menu");
    printMenu(lunchMenu);
  })();
}
