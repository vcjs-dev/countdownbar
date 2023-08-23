(function(n,e){typeof exports=="object"&&typeof module!="undefined"?e(exports,require("fourdom")):typeof define=="function"&&define.amd?define(["exports","fourdom"],e):(n=typeof globalThis!="undefined"?globalThis:n||self,e(n.Countdownbar={},n.fourdom))})(this,function(n,e){"use strict";var w=Object.defineProperty;var S=(n,e,o)=>e in n?w(n,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[e]=o;var s=(n,e,o)=>(S(n,typeof e!="symbol"?e+"":e,o),o);const o=typeof window!="undefined";function d(i){return o?requestAnimationFrame(i):-1}function g(i){o&&cancelAnimationFrame(i)}const u=1e3,f=60*u,m=60*f,p=24*m;function T(i){const t=Math.floor(i/p),r=Math.floor(i%p/m),a=Math.floor(i%m/f),c=Math.floor(i%f/u),h=Math.floor(i%u);return{total:i,days:t,hours:r,minutes:a,seconds:c,milliseconds:h}}function M(i,t){return Math.floor(i/1e3)===Math.floor(t/1e3)}class l{constructor(t){s(this,"rafId",0);s(this,"endTime",0);s(this,"counting",!1);s(this,"remain",0);s(this,"options",{time:0,autoStart:!0,color:"#323233",fontSize:"14px"});this.options=Object.assign(this.options,t),this.remain=this.options.time,this.options.autoStart&&this.start()}get current(){return T(this.remain)}getCurrentRemain(){return Math.max(this.endTime-Date.now(),0)}setRemain(t){var r,a,c,h;this.remain=t,(a=(r=this.options).onChange)==null||a.call(r,this.current),t===0&&(this.pause(),(h=(c=this.options).onFinish)==null||h.call(c)),this.render()}microTick(){this.rafId=d(()=>{this.counting&&(this.setRemain(this.getCurrentRemain()),this.remain>0&&this.microTick())})}macroTick(){this.rafId=d(()=>{if(this.counting){const t=this.getCurrentRemain();(!M(t,this.remain)||t===0)&&this.setRemain(t),this.remain>0&&this.macroTick()}})}tick(){o&&(this.options.millisecond?this.microTick():this.macroTick())}start(){this.counting||(this.endTime=Date.now()+this.remain,this.counting=!0,this.tick())}reset(t){this.pause(),this.remain=t||this.options.time,this.options.autoStart&&this.start()}pause(){this.counting=!1,g(this.rafId)}generateHTML(){if(this.options.template)return this.options.template(this.current);let t=`${this.current.days}:${this.current.hours}:${this.current.minutes}:${this.current.seconds}`;return this.options.millisecond&&(t+=`:${this.current.milliseconds}`),`<span>${t}</span>`}getContainer(){return typeof this.options.container=="string"?document.querySelector(this.options.container):this.options.container}render(){const t=this.getContainer();t&&(e.css(t,{"font-size":this.options.fontSize,color:this.options.color}),t.innerHTML=`${this.generateHTML()}`)}}const C=i=>new l(i);n.CountdownBar=l,n.createCountdownBar=C,Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})});
