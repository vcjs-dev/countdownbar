(function(e,t){typeof exports=="object"&&typeof module!="undefined"?t(exports):typeof define=="function"&&define.amd?define(["exports"],t):(e=typeof globalThis!="undefined"?globalThis:e||self,t(e.Countdownbar={}))})(this,function(e){"use strict";var C=Object.defineProperty;var M=(e,t,o)=>t in e?C(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var s=(e,t,o)=>(M(e,typeof t!="symbol"?t+"":t,o),o);const t=typeof window!="undefined";function o(i){return t?requestAnimationFrame(i):-1}function p(i){t&&cancelAnimationFrame(i)}const f=1e3,u=60*f,m=60*u,d=24*m;function g(i){const n=Math.floor(i/d),r=Math.floor(i%d/m),a=Math.floor(i%m/u),c=Math.floor(i%u/f),h=Math.floor(i%f);return{total:i,days:n,hours:r,minutes:a,seconds:c,milliseconds:h}}function T(i,n){return Math.floor(i/1e3)===Math.floor(n/1e3)}class l{constructor(n){s(this,"rafId",0);s(this,"endTime",0);s(this,"counting",!1);s(this,"deactivated",!1);s(this,"remain",0);s(this,"options",{time:0});this.options=Object.assign(this.options,n),this.remain=this.options.time}get current(){return g(this.remain)}getCurrentRemain(){return Math.max(this.endTime-Date.now(),0)}setRemain(n){var r,a,c,h;this.remain=n,(a=(r=this.options).onChange)==null||a.call(r,this.current),n===0&&(this.pause(),(h=(c=this.options).onFinish)==null||h.call(c))}microTick(){this.rafId=o(()=>{this.counting&&(this.setRemain(this.getCurrentRemain()),this.remain>0&&this.microTick())})}macroTick(){this.rafId=o(()=>{if(this.counting){const n=this.getCurrentRemain();(!T(n,this.remain)||n===0)&&this.setRemain(n),this.remain>0&&this.macroTick()}})}tick(){t&&(this.options.millisecond?this.microTick():this.macroTick())}start(){this.counting||(this.endTime=Date.now()+this.remain,this.counting=!0,this.tick())}reset(n=this.options.time){this.pause(),this.remain=n}pause(){this.counting=!1,p(this.rafId)}}const w=i=>new l(i);e.CountdownBar=l,e.createCountdownBar=w,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});
