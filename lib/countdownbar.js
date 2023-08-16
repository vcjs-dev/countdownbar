var d = Object.defineProperty;
var l = (i, t, n) => t in i ? d(i, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : i[t] = n;
var s = (i, t, n) => (l(i, typeof t != "symbol" ? t + "" : t, n), n);
const m = typeof window != "undefined";
function f(i) {
  return m ? requestAnimationFrame(i) : -1;
}
function p(i) {
  m && cancelAnimationFrame(i);
}
const a = 1e3, c = 60 * a, h = 60 * c, u = 24 * h;
function g(i) {
  const t = Math.floor(i / u), n = Math.floor(i % u / h), e = Math.floor(i % h / c), o = Math.floor(i % c / a), r = Math.floor(i % a);
  return {
    total: i,
    days: t,
    hours: n,
    minutes: e,
    seconds: o,
    milliseconds: r
  };
}
function T(i, t) {
  return Math.floor(i / 1e3) === Math.floor(t / 1e3);
}
class M {
  constructor(t) {
    s(this, "rafId", 0);
    s(this, "endTime", 0);
    s(this, "counting", !1);
    s(this, "deactivated", !1);
    s(this, "remain", 0);
    s(this, "options", {
      time: 0
    });
    this.options = Object.assign(this.options, t), this.remain = this.options.time;
  }
  get current() {
    return g(this.remain);
  }
  getCurrentRemain() {
    return Math.max(this.endTime - Date.now(), 0);
  }
  setRemain(t) {
    var n, e, o, r;
    this.remain = t, (e = (n = this.options).onChange) == null || e.call(n, this.current), t === 0 && (this.pause(), (r = (o = this.options).onFinish) == null || r.call(o));
  }
  microTick() {
    this.rafId = f(() => {
      this.counting && (this.setRemain(this.getCurrentRemain()), this.remain > 0 && this.microTick());
    });
  }
  macroTick() {
    this.rafId = f(() => {
      if (this.counting) {
        const t = this.getCurrentRemain();
        (!T(t, this.remain) || t === 0) && this.setRemain(t), this.remain > 0 && this.macroTick();
      }
    });
  }
  tick() {
    m && (this.options.millisecond ? this.microTick() : this.macroTick());
  }
  start() {
    this.counting || (this.endTime = Date.now() + this.remain, this.counting = !0, this.tick());
  }
  reset(t = this.options.time) {
    this.pause(), this.remain = t;
  }
  pause() {
    this.counting = !1, p(this.rafId);
  }
}
const k = (i) => new M(i);
export {
  M as CountdownBar,
  k as createCountdownBar
};
