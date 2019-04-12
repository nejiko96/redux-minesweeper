class TimerModel {
  static get powers() {
    return {
      ms: 1,
      s: 1000
    };
  }

  constructor() {
    this.interval = null;
    this.intervalId = null;
  }

  timeParse(value) {
    const result = /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/.exec(value.trim());
    const num = result[1] && parseFloat(result[1]) || 1000;
    const mult = result[2] && TimerModel.powers[result[2]] || 1;
    return num * mult;
  }

  start(func, interval) {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
    this.interval = interval;
    this.intervalId = setInterval(func, this.timeParse(this.interval));
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export default TimerModel;
