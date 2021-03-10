interface Observable {
  observers: Set<Observer>;
  addObserver(observer: Observer): void;
  deleteObserver(observer: Observer): void;
  notifyObservers(): void;
}

interface Observer {
  update(data?: any): void;
}

class DayTimeWatcher implements Observable {
  observers: Set<Observer>;
  currentDayTime: string;
  static DayTimes = ["morning", "noon", "evening", "night"];

  constructor() {
    this.observers = new Set();
    this.currentDayTime = DayTimeWatcher.DayTimes[0];
    this.startUpdateDayTime();
  }

  addObserver(observer: Observer) {
    this.observers.add(observer);
  }

  deleteObserver(observer: Observer) {
    this.observers.delete(observer);
  }

  notifyObservers() {
    for (const observer of this.observers) {
      observer.update({ time: this.currentDayTime });
    }
  }

  startUpdateDayTime() {
    let i = 0;
    setInterval(() => {
      this.currentDayTime = DayTimeWatcher.DayTimes[i];
      this.notifyObservers();
      i++;
      i = i >= DayTimeWatcher.DayTimes.length ? 0 : i;
    }, 1000);
  }
}

class Office implements Observer {
  observable: Observable;

  constructor(observable: Observable) {
    this.observable = observable;
    observable.addObserver(this);
  }

  update(data?: any): void {
    console.log(`Update from office. It's ${data?.time}`);
  }
}

class Home implements Observer {
  observable: Observable;

  constructor(observable: Observable) {
    this.observable = observable;
    observable.addObserver(this);
  }

  update(data?: any): void {
    console.log(`Hello from home. It's ${data?.time}`);
  }
}

(() => {
  const timeWatcher = new DayTimeWatcher();
  const office = new Office(timeWatcher);
  const home = new Home(timeWatcher);
})()
