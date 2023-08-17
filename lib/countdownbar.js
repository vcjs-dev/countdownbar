var p = Object.defineProperty;
var l = (i, t, n) => t in i ? p(i, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : i[t] = n;
var s = (i, t, n) => (l(i, typeof t != "symbol" ? t + "" : t, n), n);
import { css as d } from "fourdom";
const u = typeof window != "undefined";
function m(i) {
  return u ? requestAnimationFrame(i) : -1;
}
function g(i) {
  u && cancelAnimationFrame(i);
}
const a = 1e3, c = 60 * a, h = 60 * c, f = 24 * h;
function T(i) {
  const t = Math.floor(i / f), n = Math.floor(i % f / h), o = Math.floor(i % h / c), e = Math.floor(i % c / a), r = Math.floor(i % a);
  return {
    total: i,
    days: t,
    hours: n,
    minutes: o,
    seconds: e,
    milliseconds: r
  };
}
function M(i, t) {
  return Math.floor(i / 1e3) === Math.floor(t / 1e3);
}
class C {
  constructor(t) {
    s(this, "rafId", 0);
    s(this, "endTime", 0);
    s(this, "counting", !1);
    s(this, "remain", 0);
    s(this, "options", {
      time: 0,
      autoStart: !0,
      color: "#323233",
      fontSize: "14px"
    });
    this.options = Object.assign(this.options, t), this.remain = this.options.time, this.options.autoStart && this.start();
  }
  current() {
    return T(this.remain);
  }
  getCurrentRemain() {
    return Math.max(this.endTime - Date.now(), 0);
  }
  setRemain(t) {
    var n, o, e, r;
    this.remain = t, (o = (n = this.options).onChange) == null || o.call(n, this.current()), t === 0 && (this.pause(), (r = (e = this.options).onFinish) == null || r.call(e)), this.render();
  }
  microTick() {
    this.rafId = m(() => {
      this.counting && (this.setRemain(this.getCurrentRemain()), this.remain > 0 && this.microTick());
    });
  }
  macroTick() {
    this.rafId = m(() => {
      if (this.counting) {
        const t = this.getCurrentRemain();
        (!M(t, this.remain) || t === 0) && this.setRemain(t), this.remain > 0 && this.macroTick();
      }
    });
  }
  tick() {
    u && (this.options.millisecond ? this.microTick() : this.macroTick());
  }
  start() {
    this.counting || (this.endTime = Date.now() + this.remain, this.counting = !0, this.tick());
  }
  reset(t) {
    this.pause(), this.remain = t || this.options.time, this.options.autoStart && this.start();
  }
  pause() {
    this.counting = !1, g(this.rafId);
  }
  generateHTML() {
    if (this.options.template)
      return this.options.template(this.current());
    let t = `${this.current().days}:${this.current().hours}:${this.current().minutes}:${this.current().seconds}`;
    return this.options.millisecond && (t += `:${this.current().milliseconds}`), `<span>${t}</span>`;
  }
  getContainer() {
    return typeof this.options.container == "string" ? document.querySelector(this.options.container) : this.options.container;
  }
  render() {
    const t = this.getContainer();
    t && (d(t, {
      "font-size": this.options.fontSize,
      color: this.options.color
    }), t.innerHTML = `${this.generateHTML()}`);
  }
}
const k = (i) => new C(i);
export {
  C as CountdownBar,
  k as createCountdownBar
};
