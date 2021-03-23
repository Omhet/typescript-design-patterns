namespace Patterns {
  class Range implements IterableIterator<number> {
    curValue = this.from;

    constructor(private from: number, private to: number) {}

    next(): IteratorResult<number> {
      if (this.curValue < this.to) {
        return {
          done: false,
          value: this.curValue++,
        };
      }
      return {
        done: true,
        value: null,
      };
    }

    [Symbol.iterator](): IterableIterator<number> {
      return this;
    }
  }

  (() => {
    const range = new Range(0, 10);
    for (const num of range) {
      console.log(num);
    }

    const range2 = new Range(10, 20);
    console.log(Array.from(range2));
  })();
}
