interface HomeTheater {
  playMovie(): void;
}

interface Tv {
  turnOn(): void;
}
interface Dvd {
  play(): void;
}

class TvImpl implements Tv {
  turnOn(): void {
    console.log("TV is on");
  }
}
class DvdImpl implements Dvd {
  play(): void {
    console.log("DVD is playing");
  }
}

class HomeTheaterImpl implements HomeTheater {
  constructor(private tv: Tv, private dvd: Dvd) {}
  playMovie(): void {
    this.tv.turnOn();
    this.dvd.play();
  }
}

(() => {
  const tv = new TvImpl()
  const dvd = new DvdImpl()
  const theater = new HomeTheaterImpl(tv, dvd)
  theater.playMovie();
})();
