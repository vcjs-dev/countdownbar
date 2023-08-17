"use strict";var p=Object.defineProperty;var d=(i,t,n)=>t in i?p(i,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[t]=n;var o=(i,t,n)=>(d(i,typeof t!="symbol"?t+"":t,n),n);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const g=require("fourdom"),u=typeof window!="undefined";function f(i){return u?requestAnimationFrame(i):-1}function T(i){u&&cancelAnimationFrame(i)}const a=1e3,c=60*a,h=60*c,m=24*h;function M(i){const t=Math.floor(i/m),n=Math.floor(i%m/h),s=Math.floor(i%h/c),e=Math.floor(i%c/a),r=Math.floor(i%a);return{total:i,days:t,hours:n,minutes:s,seconds:e,milliseconds:r}}function C(i,t){return Math.floor(i/1e3)===Math.floor(t/1e3)}class l{constructor(t){o(this,"rafId",0);o(this,"endTime",0);o(this,"counting",!1);o(this,"remain",0);o(this,"options",{time:0,autoStart:!0,color:"#323233",fontSize:"14px"});this.options=Object.assign(this.options,t),this.remain=this.options.time,this.options.autoStart&&this.start()}get current(){return M(this.remain)}getCurrentRemain(){return Math.max(this.endTime-Date.now(),0)}setRemain(t){var n,s,e,r;this.remain=t,(s=(n=this.options).onChange)==null||s.call(n,this.current),t===0&&(this.pause(),(r=(e=this.options).onFinish)==null||r.call(e)),this.render()}microTick(){this.rafId=f(()=>{this.counting&&(this.setRemain(this.getCurrentRemain()),this.remain>0&&this.microTick())})}macroTick(){this.rafId=f(()=>{if(this.counting){const t=this.getCurrentRemain();(!C(t,this.remain)||t===0)&&this.setRemain(t),this.remain>0&&this.macroTick()}})}tick(){u&&(this.options.millisecond?this.microTick():this.macroTick())}start(){this.counting||(this.endTime=Date.now()+this.remain,this.counting=!0,this.tick())}reset(t){this.pause(),this.remain=t||this.options.time,this.options.autoStart&&this.start()}pause(){this.counting=!1,T(this.rafId)}generateHTML(){if(this.options.template)return this.options.template(this.current);let t=`${this.current.days}:${this.current.hours}:${this.current.minutes}:${this.current.seconds}`;return this.options.millisecond&&(t+=`:${this.current.milliseconds}`),`<span>${t}</span>`}getContainer(){return typeof this.options.container=="string"?document.querySelector(this.options.container):this.options.container}render(){const t=this.getContainer();t&&(g.css(t,{"font-size":this.options.fontSize,color:this.options.color}),t.innerHTML=`${this.generateHTML()}`)}}const S=i=>new l(i);exports.CountdownBar=l;exports.createCountdownBar=S;
