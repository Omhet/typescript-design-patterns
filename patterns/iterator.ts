interface CollectionIterator<T> {
  next(): T;
  hasNext(): boolean;
}

interface Menu {
  getIterator(): CollectionIterator<MenuItem>;
}

interface MenuItem {
  name: string;
  price: number;
}

class BreakfastMenu implements Menu {
  items: MenuItem[] = [];

  getIterator(): CollectionIterator<MenuItem> {
    return new BreakfastMenuIterator(this.items);
  }

  addItem(item: MenuItem) {
    this.items.push(item);
  }
}
class BreakfastMenuIterator implements CollectionIterator<MenuItem> {
  position = 0;

  constructor(private items: MenuItem[]) {}

  next(): MenuItem {
    return this.items[this.position++];
  }
  hasNext(): boolean {
    return this.position < this.items.length;
  }
}

class LunchMenu implements Menu {
  items: Map<string, MenuItem> = new Map();

  getIterator(): CollectionIterator<MenuItem> {
    return new LunchMenuIterator(this.items);
  }

  addItem(item: MenuItem) {
    this.items.set(item.name, item);
  }
}
class LunchMenuIterator implements CollectionIterator<MenuItem> {
  items: MenuItem[] = [];
  position = 0;

  constructor(itemsMap: Map<string, MenuItem>) {
    this.items = Array.from(itemsMap.values());
  }

  next(): MenuItem {
    return this.items[this.position++];
  }
  hasNext(): boolean {
    return this.position < this.items.length;
  }
}

const printMenu = (menu: Menu) => {
  const iterator = menu.getIterator();
  while (iterator.hasNext()) {
    const { price, name } = iterator.next();
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

  console.log('Breakfast menu');
  printMenu(breakfastMenu);
  console.log('\nLunch menu');
  printMenu(lunchMenu);
})();
