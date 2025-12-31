(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ju(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const qe={},Ls=[],Tn=()=>{},Xg=()=>!1,lc=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),$u=t=>t.startsWith("onUpdate:"),_t=Object.assign,qu=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},tI=Object.prototype.hasOwnProperty,Ue=(t,e)=>tI.call(t,e),ye=Array.isArray,Fs=t=>uc(t)==="[object Map]",Zg=t=>uc(t)==="[object Set]",we=t=>typeof t=="function",ot=t=>typeof t=="string",Hr=t=>typeof t=="symbol",Ke=t=>t!==null&&typeof t=="object",em=t=>(Ke(t)||we(t))&&we(t.then)&&we(t.catch),tm=Object.prototype.toString,uc=t=>tm.call(t),nI=t=>uc(t).slice(8,-1),nm=t=>uc(t)==="[object Object]",Wu=t=>ot(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Hi=ju(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),hc=t=>{const e=Object.create(null);return(n=>e[n]||(e[n]=t(n)))},rI=/-\w/g,kr=hc(t=>t.replace(rI,e=>e.slice(1).toUpperCase())),sI=/\B([A-Z])/g,fs=hc(t=>t.replace(sI,"-$1").toLowerCase()),rm=hc(t=>t.charAt(0).toUpperCase()+t.slice(1)),ll=hc(t=>t?`on${rm(t)}`:""),Tr=(t,e)=>!Object.is(t,e),aa=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},sm=(t,e,n,r=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:r,value:n})},Ql=t=>{const e=parseFloat(t);return isNaN(e)?t:e},iI=t=>{const e=ot(t)?Number(t):NaN;return isNaN(e)?t:e};let Qd;const dc=()=>Qd||(Qd=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Qn(t){if(ye(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=ot(r)?lI(r):Qn(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(ot(t)||Ke(t))return t}const oI=/;(?![^(]*\))/g,aI=/:([^]+)/,cI=/\/\*[^]*?\*\//g;function lI(t){const e={};return t.replace(cI,"").split(oI).forEach(n=>{if(n){const r=n.split(aI);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Bn(t){let e="";if(ot(t))e=t;else if(ye(t))for(let n=0;n<t.length;n++){const r=Bn(t[n]);r&&(e+=r+" ")}else if(Ke(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const uI="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",hI=ju(uI);function im(t){return!!t||t===""}const om=t=>!!(t&&t.__v_isRef===!0),Bt=t=>ot(t)?t:t==null?"":ye(t)||Ke(t)&&(t.toString===tm||!we(t.toString))?om(t)?Bt(t.value):JSON.stringify(t,am,2):String(t),am=(t,e)=>om(e)?am(t,e.value):Fs(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s],i)=>(n[ul(r,i)+" =>"]=s,n),{})}:Zg(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>ul(n))}:Hr(e)?ul(e):Ke(e)&&!ye(e)&&!nm(e)?String(e):e,ul=(t,e="")=>{var n;return Hr(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Pt;class cm{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Pt,!e&&Pt&&(this.index=(Pt.scopes||(Pt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=Pt;try{return Pt=this,e()}finally{Pt=n}}}on(){++this._on===1&&(this.prevScope=Pt,Pt=this)}off(){this._on>0&&--this._on===0&&(Pt=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function lm(t){return new cm(t)}function um(){return Pt}function So(t,e=!1){Pt&&Pt.cleanups.push(t)}let We;const hl=new WeakSet;class hm{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Pt&&Pt.active&&Pt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,hl.has(this)&&(hl.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||fm(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Jd(this),pm(this);const e=We,n=ln;We=this,ln=!0;try{return this.fn()}finally{gm(this),We=e,ln=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Ku(e);this.deps=this.depsTail=void 0,Jd(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?hl.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Jl(this)&&this.run()}get dirty(){return Jl(this)}}let dm=0,Bi,ji;function fm(t,e=!1){if(t.flags|=8,e){t.next=ji,ji=t;return}t.next=Bi,Bi=t}function Gu(){dm++}function zu(){if(--dm>0)return;if(ji){let e=ji;for(ji=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Bi;){let e=Bi;for(Bi=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){t||(t=r)}e=n}}if(t)throw t}function pm(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function gm(t){let e,n=t.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),Ku(r),dI(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}t.deps=e,t.depsTail=n}function Jl(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(mm(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function mm(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===ro)||(t.globalVersion=ro,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!Jl(t))))return;t.flags|=2;const e=t.dep,n=We,r=ln;We=t,ln=!0;try{pm(t);const s=t.fn(t._value);(e.version===0||Tr(s,t._value))&&(t.flags|=128,t._value=s,e.version++)}catch(s){throw e.version++,s}finally{We=n,ln=r,gm(t),t.flags&=-3}}function Ku(t,e=!1){const{dep:n,prevSub:r,nextSub:s}=t;if(r&&(r.nextSub=s,t.prevSub=void 0),s&&(s.prevSub=r,t.nextSub=void 0),n.subs===t&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)Ku(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function dI(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let ln=!0;const _m=[];function Jn(){_m.push(ln),ln=!1}function Yn(){const t=_m.pop();ln=t===void 0?!0:t}function Jd(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=We;We=void 0;try{e()}finally{We=n}}}let ro=0;class fI{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Qu{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!We||!ln||We===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==We)n=this.activeLink=new fI(We,this),We.deps?(n.prevDep=We.depsTail,We.depsTail.nextDep=n,We.depsTail=n):We.deps=We.depsTail=n,ym(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=We.depsTail,n.nextDep=void 0,We.depsTail.nextDep=n,We.depsTail=n,We.deps===n&&(We.deps=r)}return n}trigger(e){this.version++,ro++,this.notify(e)}notify(e){Gu();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{zu()}}}function ym(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)ym(r)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Aa=new WeakMap,rs=Symbol(""),Yl=Symbol(""),so=Symbol("");function Dt(t,e,n){if(ln&&We){let r=Aa.get(t);r||Aa.set(t,r=new Map);let s=r.get(n);s||(r.set(n,s=new Qu),s.map=r,s.key=n),s.track()}}function Un(t,e,n,r,s,i){const o=Aa.get(t);if(!o){ro++;return}const c=l=>{l&&l.trigger()};if(Gu(),e==="clear")o.forEach(c);else{const l=ye(t),u=l&&Wu(n);if(l&&n==="length"){const d=Number(r);o.forEach((f,g)=>{(g==="length"||g===so||!Hr(g)&&g>=d)&&c(f)})}else switch((n!==void 0||o.has(void 0))&&c(o.get(n)),u&&c(o.get(so)),e){case"add":l?u&&c(o.get("length")):(c(o.get(rs)),Fs(t)&&c(o.get(Yl)));break;case"delete":l||(c(o.get(rs)),Fs(t)&&c(o.get(Yl)));break;case"set":Fs(t)&&c(o.get(rs));break}}zu()}function pI(t,e){const n=Aa.get(t);return n&&n.get(e)}function As(t){const e=Le(t);return e===t?e:(Dt(e,"iterate",so),tn(t)?e:e.map(It))}function fc(t){return Dt(t=Le(t),"iterate",so),t}const gI={__proto__:null,[Symbol.iterator](){return dl(this,Symbol.iterator,It)},concat(...t){return As(this).concat(...t.map(e=>ye(e)?As(e):e))},entries(){return dl(this,"entries",t=>(t[1]=It(t[1]),t))},every(t,e){return Vn(this,"every",t,e,void 0,arguments)},filter(t,e){return Vn(this,"filter",t,e,n=>n.map(It),arguments)},find(t,e){return Vn(this,"find",t,e,It,arguments)},findIndex(t,e){return Vn(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return Vn(this,"findLast",t,e,It,arguments)},findLastIndex(t,e){return Vn(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return Vn(this,"forEach",t,e,void 0,arguments)},includes(...t){return fl(this,"includes",t)},indexOf(...t){return fl(this,"indexOf",t)},join(t){return As(this).join(t)},lastIndexOf(...t){return fl(this,"lastIndexOf",t)},map(t,e){return Vn(this,"map",t,e,void 0,arguments)},pop(){return Ci(this,"pop")},push(...t){return Ci(this,"push",t)},reduce(t,...e){return Yd(this,"reduce",t,e)},reduceRight(t,...e){return Yd(this,"reduceRight",t,e)},shift(){return Ci(this,"shift")},some(t,e){return Vn(this,"some",t,e,void 0,arguments)},splice(...t){return Ci(this,"splice",t)},toReversed(){return As(this).toReversed()},toSorted(t){return As(this).toSorted(t)},toSpliced(...t){return As(this).toSpliced(...t)},unshift(...t){return Ci(this,"unshift",t)},values(){return dl(this,"values",It)}};function dl(t,e,n){const r=fc(t),s=r[e]();return r!==t&&!tn(t)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.value&&(i.value=n(i.value)),i}),s}const mI=Array.prototype;function Vn(t,e,n,r,s,i){const o=fc(t),c=o!==t&&!tn(t),l=o[e];if(l!==mI[e]){const f=l.apply(t,i);return c?It(f):f}let u=n;o!==t&&(c?u=function(f,g){return n.call(this,It(f),g,t)}:n.length>2&&(u=function(f,g){return n.call(this,f,g,t)}));const d=l.call(o,u,r);return c&&s?s(d):d}function Yd(t,e,n,r){const s=fc(t);let i=n;return s!==t&&(tn(t)?n.length>3&&(i=function(o,c,l){return n.call(this,o,c,l,t)}):i=function(o,c,l){return n.call(this,o,It(c),l,t)}),s[e](i,...r)}function fl(t,e,n){const r=Le(t);Dt(r,"iterate",so);const s=r[e](...n);return(s===-1||s===!1)&&Xu(n[0])?(n[0]=Le(n[0]),r[e](...n)):s}function Ci(t,e,n=[]){Jn(),Gu();const r=Le(t)[e].apply(t,n);return zu(),Yn(),r}const _I=ju("__proto__,__v_isRef,__isVue"),vm=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Hr));function yI(t){Hr(t)||(t=String(t));const e=Le(this);return Dt(e,"has",t),e.hasOwnProperty(t)}class Em{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,r){if(n==="__v_skip")return e.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?RI:bm:i?wm:Tm).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=ye(e);if(!s){let l;if(o&&(l=gI[n]))return l;if(n==="hasOwnProperty")return yI}const c=Reflect.get(e,n,it(e)?e:r);return(Hr(n)?vm.has(n):_I(n))||(s||Dt(e,"get",n),i)?c:it(c)?o&&Wu(n)?c:c.value:Ke(c)?s?Sm(c):ps(c):c}}class Im extends Em{constructor(e=!1){super(!1,e)}set(e,n,r,s){let i=e[n];if(!this._isShallow){const l=Dr(i);if(!tn(r)&&!Dr(r)&&(i=Le(i),r=Le(r)),!ye(e)&&it(i)&&!it(r))return l||(i.value=r),!0}const o=ye(e)&&Wu(n)?Number(n)<e.length:Ue(e,n),c=Reflect.set(e,n,r,it(e)?e:s);return e===Le(s)&&(o?Tr(r,i)&&Un(e,"set",n,r):Un(e,"add",n,r)),c}deleteProperty(e,n){const r=Ue(e,n);e[n];const s=Reflect.deleteProperty(e,n);return s&&r&&Un(e,"delete",n,void 0),s}has(e,n){const r=Reflect.has(e,n);return(!Hr(n)||!vm.has(n))&&Dt(e,"has",n),r}ownKeys(e){return Dt(e,"iterate",ye(e)?"length":rs),Reflect.ownKeys(e)}}class vI extends Em{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const EI=new Im,II=new vI,TI=new Im(!0);const Xl=t=>t,Jo=t=>Reflect.getPrototypeOf(t);function wI(t,e,n){return function(...r){const s=this.__v_raw,i=Le(s),o=Fs(i),c=t==="entries"||t===Symbol.iterator&&o,l=t==="keys"&&o,u=s[t](...r),d=n?Xl:e?Sa:It;return!e&&Dt(i,"iterate",l?Yl:rs),{next(){const{value:f,done:g}=u.next();return g?{value:f,done:g}:{value:c?[d(f[0]),d(f[1])]:d(f),done:g}},[Symbol.iterator](){return this}}}}function Yo(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function bI(t,e){const n={get(s){const i=this.__v_raw,o=Le(i),c=Le(s);t||(Tr(s,c)&&Dt(o,"get",s),Dt(o,"get",c));const{has:l}=Jo(o),u=e?Xl:t?Sa:It;if(l.call(o,s))return u(i.get(s));if(l.call(o,c))return u(i.get(c));i!==o&&i.get(s)},get size(){const s=this.__v_raw;return!t&&Dt(Le(s),"iterate",rs),s.size},has(s){const i=this.__v_raw,o=Le(i),c=Le(s);return t||(Tr(s,c)&&Dt(o,"has",s),Dt(o,"has",c)),s===c?i.has(s):i.has(s)||i.has(c)},forEach(s,i){const o=this,c=o.__v_raw,l=Le(c),u=e?Xl:t?Sa:It;return!t&&Dt(l,"iterate",rs),c.forEach((d,f)=>s.call(i,u(d),u(f),o))}};return _t(n,t?{add:Yo("add"),set:Yo("set"),delete:Yo("delete"),clear:Yo("clear")}:{add(s){!e&&!tn(s)&&!Dr(s)&&(s=Le(s));const i=Le(this);return Jo(i).has.call(i,s)||(i.add(s),Un(i,"add",s,s)),this},set(s,i){!e&&!tn(i)&&!Dr(i)&&(i=Le(i));const o=Le(this),{has:c,get:l}=Jo(o);let u=c.call(o,s);u||(s=Le(s),u=c.call(o,s));const d=l.call(o,s);return o.set(s,i),u?Tr(i,d)&&Un(o,"set",s,i):Un(o,"add",s,i),this},delete(s){const i=Le(this),{has:o,get:c}=Jo(i);let l=o.call(i,s);l||(s=Le(s),l=o.call(i,s)),c&&c.call(i,s);const u=i.delete(s);return l&&Un(i,"delete",s,void 0),u},clear(){const s=Le(this),i=s.size!==0,o=s.clear();return i&&Un(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=wI(s,t,e)}),n}function Ju(t,e){const n=bI(t,e);return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(Ue(n,s)&&s in r?n:r,s,i)}const AI={get:Ju(!1,!1)},SI={get:Ju(!1,!0)},CI={get:Ju(!0,!1)};const Tm=new WeakMap,wm=new WeakMap,bm=new WeakMap,RI=new WeakMap;function PI(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function kI(t){return t.__v_skip||!Object.isExtensible(t)?0:PI(nI(t))}function ps(t){return Dr(t)?t:Yu(t,!1,EI,AI,Tm)}function Am(t){return Yu(t,!1,TI,SI,wm)}function Sm(t){return Yu(t,!0,II,CI,bm)}function Yu(t,e,n,r,s){if(!Ke(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=kI(t);if(i===0)return t;const o=s.get(t);if(o)return o;const c=new Proxy(t,i===2?r:n);return s.set(t,c),c}function wr(t){return Dr(t)?wr(t.__v_raw):!!(t&&t.__v_isReactive)}function Dr(t){return!!(t&&t.__v_isReadonly)}function tn(t){return!!(t&&t.__v_isShallow)}function Xu(t){return t?!!t.__v_raw:!1}function Le(t){const e=t&&t.__v_raw;return e?Le(e):t}function pc(t){return!Ue(t,"__v_skip")&&Object.isExtensible(t)&&sm(t,"__v_skip",!0),t}const It=t=>Ke(t)?ps(t):t,Sa=t=>Ke(t)?Sm(t):t;function it(t){return t?t.__v_isRef===!0:!1}function He(t){return Cm(t,!1)}function DI(t){return Cm(t,!0)}function Cm(t,e){return it(t)?t:new NI(t,e)}class NI{constructor(e,n){this.dep=new Qu,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:Le(e),this._value=n?e:It(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,r=this.__v_isShallow||tn(e)||Dr(e);e=r?e:Le(e),Tr(e,n)&&(this._rawValue=e,this._value=r?e:It(e),this.dep.trigger())}}function nt(t){return it(t)?t.value:t}const OI={get:(t,e,n)=>e==="__v_raw"?t:nt(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return it(s)&&!it(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function Rm(t){return wr(t)?t:new Proxy(t,OI)}function VI(t){const e=ye(t)?new Array(t.length):{};for(const n in t)e[n]=MI(t,n);return e}class xI{constructor(e,n,r){this._object=e,this._key=n,this._defaultValue=r,this.__v_isRef=!0,this._value=void 0}get value(){const e=this._object[this._key];return this._value=e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return pI(Le(this._object),this._key)}}function MI(t,e,n){const r=t[e];return it(r)?r:new xI(t,e,n)}class LI{constructor(e,n,r){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Qu(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=ro-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&We!==this)return fm(this,!0),!0}get value(){const e=this.dep.track();return mm(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function FI(t,e,n=!1){let r,s;return we(t)?r=t:(r=t.get,s=t.set),new LI(r,s,n)}const Xo={},Ca=new WeakMap;let Yr;function UI(t,e=!1,n=Yr){if(n){let r=Ca.get(n);r||Ca.set(n,r=[]),r.push(t)}}function HI(t,e,n=qe){const{immediate:r,deep:s,once:i,scheduler:o,augmentJob:c,call:l}=n,u=M=>s?M:tn(M)||s===!1||s===0?Hn(M,1):Hn(M);let d,f,g,_,R=!1,P=!1;if(it(t)?(f=()=>t.value,R=tn(t)):wr(t)?(f=()=>u(t),R=!0):ye(t)?(P=!0,R=t.some(M=>wr(M)||tn(M)),f=()=>t.map(M=>{if(it(M))return M.value;if(wr(M))return u(M);if(we(M))return l?l(M,2):M()})):we(t)?e?f=l?()=>l(t,2):t:f=()=>{if(g){Jn();try{g()}finally{Yn()}}const M=Yr;Yr=d;try{return l?l(t,3,[_]):t(_)}finally{Yr=M}}:f=Tn,e&&s){const M=f,X=s===!0?1/0:s;f=()=>Hn(M(),X)}const k=um(),O=()=>{d.stop(),k&&k.active&&qu(k.effects,d)};if(i&&e){const M=e;e=(...X)=>{M(...X),O()}}let V=P?new Array(t.length).fill(Xo):Xo;const F=M=>{if(!(!(d.flags&1)||!d.dirty&&!M))if(e){const X=d.run();if(s||R||(P?X.some((se,S)=>Tr(se,V[S])):Tr(X,V))){g&&g();const se=Yr;Yr=d;try{const S=[X,V===Xo?void 0:P&&V[0]===Xo?[]:V,_];V=X,l?l(e,3,S):e(...S)}finally{Yr=se}}}else d.run()};return c&&c(F),d=new hm(f),d.scheduler=o?()=>o(F,!1):F,_=M=>UI(M,!1,d),g=d.onStop=()=>{const M=Ca.get(d);if(M){if(l)l(M,4);else for(const X of M)X();Ca.delete(d)}},e?r?F(!0):V=d.run():o?o(F.bind(null,!0),!0):d.run(),O.pause=d.pause.bind(d),O.resume=d.resume.bind(d),O.stop=O,O}function Hn(t,e=1/0,n){if(e<=0||!Ke(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,it(t))Hn(t.value,e,n);else if(ye(t))for(let r=0;r<t.length;r++)Hn(t[r],e,n);else if(Zg(t)||Fs(t))t.forEach(r=>{Hn(r,e,n)});else if(nm(t)){for(const r in t)Hn(t[r],e,n);for(const r of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,r)&&Hn(t[r],e,n)}return t}/**
* @vue/runtime-core v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Co(t,e,n,r){try{return r?t(...r):t()}catch(s){gc(s,e,n)}}function un(t,e,n,r){if(we(t)){const s=Co(t,e,n,r);return s&&em(s)&&s.catch(i=>{gc(i,e,n)}),s}if(ye(t)){const s=[];for(let i=0;i<t.length;i++)s.push(un(t[i],e,n,r));return s}}function gc(t,e,n,r=!0){const s=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||qe;if(e){let c=e.parent;const l=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;c;){const d=c.ec;if(d){for(let f=0;f<d.length;f++)if(d[f](t,l,u)===!1)return}c=c.parent}if(i){Jn(),Co(i,null,10,[t,l,u]),Yn();return}}BI(t,n,s,r,o)}function BI(t,e,n,r=!0,s=!1){if(s)throw t;console.error(t)}const Ft=[];let yn=-1;const Us=[];let pr=null,Rs=0;const Pm=Promise.resolve();let Ra=null;function Zu(t){const e=Ra||Pm;return t?e.then(this?t.bind(this):t):e}function jI(t){let e=yn+1,n=Ft.length;for(;e<n;){const r=e+n>>>1,s=Ft[r],i=io(s);i<t||i===t&&s.flags&2?e=r+1:n=r}return e}function eh(t){if(!(t.flags&1)){const e=io(t),n=Ft[Ft.length-1];!n||!(t.flags&2)&&e>=io(n)?Ft.push(t):Ft.splice(jI(e),0,t),t.flags|=1,km()}}function km(){Ra||(Ra=Pm.then(Nm))}function $I(t){ye(t)?Us.push(...t):pr&&t.id===-1?pr.splice(Rs+1,0,t):t.flags&1||(Us.push(t),t.flags|=1),km()}function Xd(t,e,n=yn+1){for(;n<Ft.length;n++){const r=Ft[n];if(r&&r.flags&2){if(t&&r.id!==t.uid)continue;Ft.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function Dm(t){if(Us.length){const e=[...new Set(Us)].sort((n,r)=>io(n)-io(r));if(Us.length=0,pr){pr.push(...e);return}for(pr=e,Rs=0;Rs<pr.length;Rs++){const n=pr[Rs];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}pr=null,Rs=0}}const io=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Nm(t){try{for(yn=0;yn<Ft.length;yn++){const e=Ft[yn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Co(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;yn<Ft.length;yn++){const e=Ft[yn];e&&(e.flags&=-2)}yn=-1,Ft.length=0,Dm(),Ra=null,(Ft.length||Us.length)&&Nm()}}let en=null,Om=null;function Pa(t){const e=en;return en=t,Om=t&&t.type.__scopeId||null,e}function Vm(t,e=en,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&Na(-1);const i=Pa(e);let o;try{o=t(...s)}finally{Pa(i),r._d&&Na(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function xm(t,e){if(en===null)return t;const n=Tc(en),r=t.dirs||(t.dirs=[]);for(let s=0;s<e.length;s++){let[i,o,c,l=qe]=e[s];i&&(we(i)&&(i={mounted:i,updated:i}),i.deep&&Hn(o),r.push({dir:i,instance:n,value:o,oldValue:void 0,arg:c,modifiers:l}))}return t}function zr(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const c=s[o];i&&(c.oldValue=i[o].value);let l=c.dir[r];l&&(Jn(),un(l,n,8,[t.el,c,t,e]),Yn())}}const qI=Symbol("_vte"),Mm=t=>t.__isTeleport,Fn=Symbol("_leaveCb"),Zo=Symbol("_enterCb");function WI(){const t={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return yc(()=>{t.isMounted=!0}),th(()=>{t.isUnmounting=!0}),t}const Yt=[Function,Array],Lm={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Yt,onEnter:Yt,onAfterEnter:Yt,onEnterCancelled:Yt,onBeforeLeave:Yt,onLeave:Yt,onAfterLeave:Yt,onLeaveCancelled:Yt,onBeforeAppear:Yt,onAppear:Yt,onAfterAppear:Yt,onAppearCancelled:Yt},Fm=t=>{const e=t.subTree;return e.component?Fm(e.component):e},GI={name:"BaseTransition",props:Lm,setup(t,{slots:e}){const n=ih(),r=WI();return()=>{const s=e.default&&Bm(e.default(),!0);if(!s||!s.length)return;const i=Um(s),o=Le(t),{mode:c}=o;if(r.isLeaving)return pl(i);const l=Zd(i);if(!l)return pl(i);let u=Zl(l,o,r,n,f=>u=f);l.type!==Ut&&oo(l,u);let d=n.subTree&&Zd(n.subTree);if(d&&d.type!==Ut&&!Zr(d,l)&&Fm(n).type!==Ut){let f=Zl(d,o,r,n);if(oo(d,f),c==="out-in"&&l.type!==Ut)return r.isLeaving=!0,f.afterLeave=()=>{r.isLeaving=!1,n.job.flags&8||n.update(),delete f.afterLeave,d=void 0},pl(i);c==="in-out"&&l.type!==Ut?f.delayLeave=(g,_,R)=>{const P=Hm(r,d);P[String(d.key)]=d,g[Fn]=()=>{_(),g[Fn]=void 0,delete u.delayedLeave,d=void 0},u.delayedLeave=()=>{R(),delete u.delayedLeave,d=void 0}}:d=void 0}else d&&(d=void 0);return i}}};function Um(t){let e=t[0];if(t.length>1){for(const n of t)if(n.type!==Ut){e=n;break}}return e}const zI=GI;function Hm(t,e){const{leavingVNodes:n}=t;let r=n.get(e.type);return r||(r=Object.create(null),n.set(e.type,r)),r}function Zl(t,e,n,r,s){const{appear:i,mode:o,persisted:c=!1,onBeforeEnter:l,onEnter:u,onAfterEnter:d,onEnterCancelled:f,onBeforeLeave:g,onLeave:_,onAfterLeave:R,onLeaveCancelled:P,onBeforeAppear:k,onAppear:O,onAfterAppear:V,onAppearCancelled:F}=e,M=String(t.key),X=Hm(n,t),se=(y,I)=>{y&&un(y,r,9,I)},S=(y,I)=>{const T=I[1];se(y,I),ye(y)?y.every(b=>b.length<=1)&&T():y.length<=1&&T()},E={mode:o,persisted:c,beforeEnter(y){let I=l;if(!n.isMounted)if(i)I=k||l;else return;y[Fn]&&y[Fn](!0);const T=X[M];T&&Zr(t,T)&&T.el[Fn]&&T.el[Fn](),se(I,[y])},enter(y){let I=u,T=d,b=f;if(!n.isMounted)if(i)I=O||u,T=V||d,b=F||f;else return;let v=!1;const me=y[Zo]=Ve=>{v||(v=!0,Ve?se(b,[y]):se(T,[y]),E.delayedLeave&&E.delayedLeave(),y[Zo]=void 0)};I?S(I,[y,me]):me()},leave(y,I){const T=String(t.key);if(y[Zo]&&y[Zo](!0),n.isUnmounting)return I();se(g,[y]);let b=!1;const v=y[Fn]=me=>{b||(b=!0,I(),me?se(P,[y]):se(R,[y]),y[Fn]=void 0,X[T]===t&&delete X[T])};X[T]=t,_?S(_,[y,v]):v()},clone(y){const I=Zl(y,e,n,r,s);return s&&s(I),I}};return E}function pl(t){if(mc(t))return t=Nr(t),t.children=null,t}function Zd(t){if(!mc(t))return Mm(t.type)&&t.children?Um(t.children):t;if(t.component)return t.component.subTree;const{shapeFlag:e,children:n}=t;if(n){if(e&16)return n[0];if(e&32&&we(n.default))return n.default()}}function oo(t,e){t.shapeFlag&6&&t.component?(t.transition=e,oo(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Bm(t,e=!1,n){let r=[],s=0;for(let i=0;i<t.length;i++){let o=t[i];const c=n==null?o.key:String(n)+String(o.key!=null?o.key:i);o.type===Tt?(o.patchFlag&128&&s++,r=r.concat(Bm(o.children,e,c))):(e||o.type!==Ut)&&r.push(c!=null?Nr(o,{key:c}):o)}if(s>1)for(let i=0;i<r.length;i++)r[i].patchFlag=-2;return r}function At(t,e){return we(t)?_t({name:t.name},e,{setup:t}):t}function jm(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}const ka=new WeakMap;function $i(t,e,n,r,s=!1){if(ye(t)){t.forEach((R,P)=>$i(R,e&&(ye(e)?e[P]:e),n,r,s));return}if(qi(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&$i(t,e,n,r.component.subTree);return}const i=r.shapeFlag&4?Tc(r.component):r.el,o=s?null:i,{i:c,r:l}=t,u=e&&e.r,d=c.refs===qe?c.refs={}:c.refs,f=c.setupState,g=Le(f),_=f===qe?Xg:R=>Ue(g,R);if(u!=null&&u!==l){if(ef(e),ot(u))d[u]=null,_(u)&&(f[u]=null);else if(it(u)){u.value=null;const R=e;R.k&&(d[R.k]=null)}}if(we(l))Co(l,c,12,[o,d]);else{const R=ot(l),P=it(l);if(R||P){const k=()=>{if(t.f){const O=R?_(l)?f[l]:d[l]:l.value;if(s)ye(O)&&qu(O,i);else if(ye(O))O.includes(i)||O.push(i);else if(R)d[l]=[i],_(l)&&(f[l]=d[l]);else{const V=[i];l.value=V,t.k&&(d[t.k]=V)}}else R?(d[l]=o,_(l)&&(f[l]=o)):P&&(l.value=o,t.k&&(d[t.k]=o))};if(o){const O=()=>{k(),ka.delete(t)};O.id=-1,ka.set(t,O),Kt(O,n)}else ef(t),k()}}}function ef(t){const e=ka.get(t);e&&(e.flags|=8,ka.delete(t))}dc().requestIdleCallback;dc().cancelIdleCallback;const qi=t=>!!t.type.__asyncLoader,mc=t=>t.type.__isKeepAlive;function KI(t,e){$m(t,"a",e)}function QI(t,e){$m(t,"da",e)}function $m(t,e,n=Ht){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(_c(e,r,n),n){let s=n.parent;for(;s&&s.parent;)mc(s.parent.vnode)&&JI(r,e,n,s),s=s.parent}}function JI(t,e,n,r){const s=_c(e,t,r,!0);qm(()=>{qu(r[e],s)},n)}function _c(t,e,n=Ht,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{Jn();const c=Ro(n),l=un(e,n,t,o);return c(),Yn(),l});return r?s.unshift(i):s.push(i),i}}const nr=t=>(e,n=Ht)=>{(!lo||t==="sp")&&_c(t,(...r)=>e(...r),n)},YI=nr("bm"),yc=nr("m"),XI=nr("bu"),ZI=nr("u"),th=nr("bum"),qm=nr("um"),eT=nr("sp"),tT=nr("rtg"),nT=nr("rtc");function rT(t,e=Ht){_c("ec",t,e)}const sT=Symbol.for("v-ndc");function ao(t,e,n,r){let s;const i=n,o=ye(t);if(o||ot(t)){const c=o&&wr(t);let l=!1,u=!1;c&&(l=!tn(t),u=Dr(t),t=fc(t)),s=new Array(t.length);for(let d=0,f=t.length;d<f;d++)s[d]=e(l?u?Sa(It(t[d])):It(t[d]):t[d],d,void 0,i)}else if(typeof t=="number"){s=new Array(t);for(let c=0;c<t;c++)s[c]=e(c+1,c,void 0,i)}else if(Ke(t))if(t[Symbol.iterator])s=Array.from(t,(c,l)=>e(c,l,void 0,i));else{const c=Object.keys(t);s=new Array(c.length);for(let l=0,u=c.length;l<u;l++){const d=c[l];s[l]=e(t[d],d,l,i)}}else s=[];return s}const eu=t=>t?u_(t)?Tc(t):eu(t.parent):null,Wi=_t(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>eu(t.parent),$root:t=>eu(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Gm(t),$forceUpdate:t=>t.f||(t.f=()=>{eh(t.update)}),$nextTick:t=>t.n||(t.n=Zu.bind(t.proxy)),$watch:t=>ST.bind(t)}),gl=(t,e)=>t!==qe&&!t.__isScriptSetup&&Ue(t,e),iT={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:c,appContext:l}=t;let u;if(e[0]!=="$"){const _=o[e];if(_!==void 0)switch(_){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(gl(r,e))return o[e]=1,r[e];if(s!==qe&&Ue(s,e))return o[e]=2,s[e];if((u=t.propsOptions[0])&&Ue(u,e))return o[e]=3,i[e];if(n!==qe&&Ue(n,e))return o[e]=4,n[e];tu&&(o[e]=0)}}const d=Wi[e];let f,g;if(d)return e==="$attrs"&&Dt(t.attrs,"get",""),d(t);if((f=c.__cssModules)&&(f=f[e]))return f;if(n!==qe&&Ue(n,e))return o[e]=4,n[e];if(g=l.config.globalProperties,Ue(g,e))return g[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return gl(s,e)?(s[e]=n,!0):r!==qe&&Ue(r,e)?(r[e]=n,!0):Ue(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,propsOptions:i,type:o}},c){let l,u;return!!(n[c]||t!==qe&&c[0]!=="$"&&Ue(t,c)||gl(e,c)||(l=i[0])&&Ue(l,c)||Ue(r,c)||Ue(Wi,c)||Ue(s.config.globalProperties,c)||(u=o.__cssModules)&&u[c])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Ue(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function tf(t){return ye(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let tu=!0;function oT(t){const e=Gm(t),n=t.proxy,r=t.ctx;tu=!1,e.beforeCreate&&nf(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:c,provide:l,inject:u,created:d,beforeMount:f,mounted:g,beforeUpdate:_,updated:R,activated:P,deactivated:k,beforeDestroy:O,beforeUnmount:V,destroyed:F,unmounted:M,render:X,renderTracked:se,renderTriggered:S,errorCaptured:E,serverPrefetch:y,expose:I,inheritAttrs:T,components:b,directives:v,filters:me}=e;if(u&&aT(u,r,null),o)for(const Q in o){const ne=o[Q];we(ne)&&(r[Q]=ne.bind(n))}if(s){const Q=s.call(n,n);Ke(Q)&&(t.data=ps(Q))}if(tu=!0,i)for(const Q in i){const ne=i[Q],ie=we(ne)?ne.bind(n,n):we(ne.get)?ne.get.bind(n,n):Tn,j=!we(ne)&&we(ne.set)?ne.set.bind(n):Tn,K=oe({get:ie,set:j});Object.defineProperty(r,Q,{enumerable:!0,configurable:!0,get:()=>K.value,set:Z=>K.value=Z})}if(c)for(const Q in c)Wm(c[Q],r,n,Q);if(l){const Q=we(l)?l.call(n):l;Reflect.ownKeys(Q).forEach(ne=>{ca(ne,Q[ne])})}d&&nf(d,t,"c");function Se(Q,ne){ye(ne)?ne.forEach(ie=>Q(ie.bind(n))):ne&&Q(ne.bind(n))}if(Se(YI,f),Se(yc,g),Se(XI,_),Se(ZI,R),Se(KI,P),Se(QI,k),Se(rT,E),Se(nT,se),Se(tT,S),Se(th,V),Se(qm,M),Se(eT,y),ye(I))if(I.length){const Q=t.exposed||(t.exposed={});I.forEach(ne=>{Object.defineProperty(Q,ne,{get:()=>n[ne],set:ie=>n[ne]=ie,enumerable:!0})})}else t.exposed||(t.exposed={});X&&t.render===Tn&&(t.render=X),T!=null&&(t.inheritAttrs=T),b&&(t.components=b),v&&(t.directives=v),y&&jm(t)}function aT(t,e,n=Tn){ye(t)&&(t=nu(t));for(const r in t){const s=t[r];let i;Ke(s)?"default"in s?i=wn(s.from||r,s.default,!0):i=wn(s.from||r):i=wn(s),it(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function nf(t,e,n){un(ye(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function Wm(t,e,n,r){let s=r.includes(".")?i_(n,r):()=>n[r];if(ot(t)){const i=e[t];we(i)&&bn(s,i)}else if(we(t))bn(s,t.bind(n));else if(Ke(t))if(ye(t))t.forEach(i=>Wm(i,e,n,r));else{const i=we(t.handler)?t.handler.bind(n):e[t.handler];we(i)&&bn(s,i,t)}}function Gm(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,c=i.get(e);let l;return c?l=c:!s.length&&!n&&!r?l=e:(l={},s.length&&s.forEach(u=>Da(l,u,o,!0)),Da(l,e,o)),Ke(e)&&i.set(e,l),l}function Da(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&Da(t,i,n,!0),s&&s.forEach(o=>Da(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const c=cT[o]||n&&n[o];t[o]=c?c(t[o],e[o]):e[o]}return t}const cT={data:rf,props:sf,emits:sf,methods:Ni,computed:Ni,beforeCreate:Mt,created:Mt,beforeMount:Mt,mounted:Mt,beforeUpdate:Mt,updated:Mt,beforeDestroy:Mt,beforeUnmount:Mt,destroyed:Mt,unmounted:Mt,activated:Mt,deactivated:Mt,errorCaptured:Mt,serverPrefetch:Mt,components:Ni,directives:Ni,watch:uT,provide:rf,inject:lT};function rf(t,e){return e?t?function(){return _t(we(t)?t.call(this,this):t,we(e)?e.call(this,this):e)}:e:t}function lT(t,e){return Ni(nu(t),nu(e))}function nu(t){if(ye(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Mt(t,e){return t?[...new Set([].concat(t,e))]:e}function Ni(t,e){return t?_t(Object.create(null),t,e):e}function sf(t,e){return t?ye(t)&&ye(e)?[...new Set([...t,...e])]:_t(Object.create(null),tf(t),tf(e??{})):e}function uT(t,e){if(!t)return e;if(!e)return t;const n=_t(Object.create(null),t);for(const r in e)n[r]=Mt(t[r],e[r]);return n}function zm(){return{app:null,config:{isNativeTag:Xg,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let hT=0;function dT(t,e){return function(r,s=null){we(r)||(r=_t({},r)),s!=null&&!Ke(s)&&(s=null);const i=zm(),o=new WeakSet,c=[];let l=!1;const u=i.app={_uid:hT++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:zT,get config(){return i.config},set config(d){},use(d,...f){return o.has(d)||(d&&we(d.install)?(o.add(d),d.install(u,...f)):we(d)&&(o.add(d),d(u,...f))),u},mixin(d){return i.mixins.includes(d)||i.mixins.push(d),u},component(d,f){return f?(i.components[d]=f,u):i.components[d]},directive(d,f){return f?(i.directives[d]=f,u):i.directives[d]},mount(d,f,g){if(!l){const _=u._ceVNode||st(r,s);return _.appContext=i,g===!0?g="svg":g===!1&&(g=void 0),t(_,d,g),l=!0,u._container=d,d.__vue_app__=u,Tc(_.component)}},onUnmount(d){c.push(d)},unmount(){l&&(un(c,u._instance,16),t(null,u._container),delete u._container.__vue_app__)},provide(d,f){return i.provides[d]=f,u},runWithContext(d){const f=ss;ss=u;try{return d()}finally{ss=f}}};return u}}let ss=null;function ca(t,e){if(Ht){let n=Ht.provides;const r=Ht.parent&&Ht.parent.provides;r===n&&(n=Ht.provides=Object.create(r)),n[t]=e}}function wn(t,e,n=!1){const r=ih();if(r||ss){let s=ss?ss._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&t in s)return s[t];if(arguments.length>1)return n&&we(e)?e.call(r&&r.proxy):e}}function fT(){return!!(ih()||ss)}const Km={},Qm=()=>Object.create(Km),Jm=t=>Object.getPrototypeOf(t)===Km;function pT(t,e,n,r=!1){const s={},i=Qm();t.propsDefaults=Object.create(null),Ym(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:Am(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function gT(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,c=Le(s),[l]=t.propsOptions;let u=!1;if((r||o>0)&&!(o&16)){if(o&8){const d=t.vnode.dynamicProps;for(let f=0;f<d.length;f++){let g=d[f];if(vc(t.emitsOptions,g))continue;const _=e[g];if(l)if(Ue(i,g))_!==i[g]&&(i[g]=_,u=!0);else{const R=kr(g);s[R]=ru(l,c,R,_,t,!1)}else _!==i[g]&&(i[g]=_,u=!0)}}}else{Ym(t,e,s,i)&&(u=!0);let d;for(const f in c)(!e||!Ue(e,f)&&((d=fs(f))===f||!Ue(e,d)))&&(l?n&&(n[f]!==void 0||n[d]!==void 0)&&(s[f]=ru(l,c,f,void 0,t,!0)):delete s[f]);if(i!==c)for(const f in i)(!e||!Ue(e,f))&&(delete i[f],u=!0)}u&&Un(t.attrs,"set","")}function Ym(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,c;if(e)for(let l in e){if(Hi(l))continue;const u=e[l];let d;s&&Ue(s,d=kr(l))?!i||!i.includes(d)?n[d]=u:(c||(c={}))[d]=u:vc(t.emitsOptions,l)||(!(l in r)||u!==r[l])&&(r[l]=u,o=!0)}if(i){const l=Le(n),u=c||qe;for(let d=0;d<i.length;d++){const f=i[d];n[f]=ru(s,l,f,u[f],t,!Ue(u,f))}}return o}function ru(t,e,n,r,s,i){const o=t[n];if(o!=null){const c=Ue(o,"default");if(c&&r===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&we(l)){const{propsDefaults:u}=s;if(n in u)r=u[n];else{const d=Ro(s);r=u[n]=l.call(null,e),d()}}else r=l;s.ce&&s.ce._setProp(n,r)}o[0]&&(i&&!c?r=!1:o[1]&&(r===""||r===fs(n))&&(r=!0))}return r}const mT=new WeakMap;function Xm(t,e,n=!1){const r=n?mT:e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},c=[];let l=!1;if(!we(t)){const d=f=>{l=!0;const[g,_]=Xm(f,e,!0);_t(o,g),_&&c.push(..._)};!n&&e.mixins.length&&e.mixins.forEach(d),t.extends&&d(t.extends),t.mixins&&t.mixins.forEach(d)}if(!i&&!l)return Ke(t)&&r.set(t,Ls),Ls;if(ye(i))for(let d=0;d<i.length;d++){const f=kr(i[d]);of(f)&&(o[f]=qe)}else if(i)for(const d in i){const f=kr(d);if(of(f)){const g=i[d],_=o[f]=ye(g)||we(g)?{type:g}:_t({},g),R=_.type;let P=!1,k=!0;if(ye(R))for(let O=0;O<R.length;++O){const V=R[O],F=we(V)&&V.name;if(F==="Boolean"){P=!0;break}else F==="String"&&(k=!1)}else P=we(R)&&R.name==="Boolean";_[0]=P,_[1]=k,(P||Ue(_,"default"))&&c.push(f)}}const u=[o,c];return Ke(t)&&r.set(t,u),u}function of(t){return t[0]!=="$"&&!Hi(t)}const nh=t=>t==="_"||t==="_ctx"||t==="$stable",rh=t=>ye(t)?t.map(In):[In(t)],_T=(t,e,n)=>{if(e._n)return e;const r=Vm((...s)=>rh(e(...s)),n);return r._c=!1,r},Zm=(t,e,n)=>{const r=t._ctx;for(const s in t){if(nh(s))continue;const i=t[s];if(we(i))e[s]=_T(s,i,r);else if(i!=null){const o=rh(i);e[s]=()=>o}}},e_=(t,e)=>{const n=rh(e);t.slots.default=()=>n},t_=(t,e,n)=>{for(const r in e)(n||!nh(r))&&(t[r]=e[r])},yT=(t,e,n)=>{const r=t.slots=Qm();if(t.vnode.shapeFlag&32){const s=e._;s?(t_(r,e,n),n&&sm(r,"_",s,!0)):Zm(e,r)}else e&&e_(t,e)},vT=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=qe;if(r.shapeFlag&32){const c=e._;c?n&&c===1?i=!1:t_(s,e,n):(i=!e.$stable,Zm(e,s)),o=e}else e&&(e_(t,e),o={default:1});if(i)for(const c in s)!nh(c)&&o[c]==null&&delete s[c]},Kt=VT;function ET(t){return IT(t)}function IT(t,e){const n=dc();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:c,createComment:l,setText:u,setElementText:d,parentNode:f,nextSibling:g,setScopeId:_=Tn,insertStaticContent:R}=t,P=(w,A,C,U=null,B=null,L=null,Y=void 0,G=null,q=!!A.dynamicChildren)=>{if(w===A)return;w&&!Zr(w,A)&&(U=x(w),Z(w,B,L,!0),w=null),A.patchFlag===-2&&(q=!1,A.dynamicChildren=null);const{type:W,ref:de,shapeFlag:te}=A;switch(W){case Ec:k(w,A,C,U);break;case Ut:O(w,A,C,U);break;case _l:w==null&&V(A,C,U,Y);break;case Tt:b(w,A,C,U,B,L,Y,G,q);break;default:te&1?X(w,A,C,U,B,L,Y,G,q):te&6?v(w,A,C,U,B,L,Y,G,q):(te&64||te&128)&&W.process(w,A,C,U,B,L,Y,G,q,ce)}de!=null&&B?$i(de,w&&w.ref,L,A||w,!A):de==null&&w&&w.ref!=null&&$i(w.ref,null,L,w,!0)},k=(w,A,C,U)=>{if(w==null)r(A.el=c(A.children),C,U);else{const B=A.el=w.el;A.children!==w.children&&u(B,A.children)}},O=(w,A,C,U)=>{w==null?r(A.el=l(A.children||""),C,U):A.el=w.el},V=(w,A,C,U)=>{[w.el,w.anchor]=R(w.children,A,C,U,w.el,w.anchor)},F=({el:w,anchor:A},C,U)=>{let B;for(;w&&w!==A;)B=g(w),r(w,C,U),w=B;r(A,C,U)},M=({el:w,anchor:A})=>{let C;for(;w&&w!==A;)C=g(w),s(w),w=C;s(A)},X=(w,A,C,U,B,L,Y,G,q)=>{A.type==="svg"?Y="svg":A.type==="math"&&(Y="mathml"),w==null?se(A,C,U,B,L,Y,G,q):y(w,A,B,L,Y,G,q)},se=(w,A,C,U,B,L,Y,G)=>{let q,W;const{props:de,shapeFlag:te,transition:he,dirs:pe}=w;if(q=w.el=o(w.type,L,de&&de.is,de),te&8?d(q,w.children):te&16&&E(w.children,q,null,U,B,ml(w,L),Y,G),pe&&zr(w,null,U,"created"),S(q,w,w.scopeId,Y,U),de){for(const je in de)je!=="value"&&!Hi(je)&&i(q,je,null,de[je],L,U);"value"in de&&i(q,"value",null,de.value,L),(W=de.onVnodeBeforeMount)&&_n(W,U,w)}pe&&zr(w,null,U,"beforeMount");const Pe=TT(B,he);Pe&&he.beforeEnter(q),r(q,A,C),((W=de&&de.onVnodeMounted)||Pe||pe)&&Kt(()=>{W&&_n(W,U,w),Pe&&he.enter(q),pe&&zr(w,null,U,"mounted")},B)},S=(w,A,C,U,B)=>{if(C&&_(w,C),U)for(let L=0;L<U.length;L++)_(w,U[L]);if(B){let L=B.subTree;if(A===L||a_(L.type)&&(L.ssContent===A||L.ssFallback===A)){const Y=B.vnode;S(w,Y,Y.scopeId,Y.slotScopeIds,B.parent)}}},E=(w,A,C,U,B,L,Y,G,q=0)=>{for(let W=q;W<w.length;W++){const de=w[W]=G?gr(w[W]):In(w[W]);P(null,de,A,C,U,B,L,Y,G)}},y=(w,A,C,U,B,L,Y)=>{const G=A.el=w.el;let{patchFlag:q,dynamicChildren:W,dirs:de}=A;q|=w.patchFlag&16;const te=w.props||qe,he=A.props||qe;let pe;if(C&&Kr(C,!1),(pe=he.onVnodeBeforeUpdate)&&_n(pe,C,A,w),de&&zr(A,w,C,"beforeUpdate"),C&&Kr(C,!0),(te.innerHTML&&he.innerHTML==null||te.textContent&&he.textContent==null)&&d(G,""),W?I(w.dynamicChildren,W,G,C,U,ml(A,B),L):Y||ne(w,A,G,null,C,U,ml(A,B),L,!1),q>0){if(q&16)T(G,te,he,C,B);else if(q&2&&te.class!==he.class&&i(G,"class",null,he.class,B),q&4&&i(G,"style",te.style,he.style,B),q&8){const Pe=A.dynamicProps;for(let je=0;je<Pe.length;je++){const Me=Pe[je],St=te[Me],Ct=he[Me];(Ct!==St||Me==="value")&&i(G,Me,St,Ct,B,C)}}q&1&&w.children!==A.children&&d(G,A.children)}else!Y&&W==null&&T(G,te,he,C,B);((pe=he.onVnodeUpdated)||de)&&Kt(()=>{pe&&_n(pe,C,A,w),de&&zr(A,w,C,"updated")},U)},I=(w,A,C,U,B,L,Y)=>{for(let G=0;G<A.length;G++){const q=w[G],W=A[G],de=q.el&&(q.type===Tt||!Zr(q,W)||q.shapeFlag&198)?f(q.el):C;P(q,W,de,null,U,B,L,Y,!0)}},T=(w,A,C,U,B)=>{if(A!==C){if(A!==qe)for(const L in A)!Hi(L)&&!(L in C)&&i(w,L,A[L],null,B,U);for(const L in C){if(Hi(L))continue;const Y=C[L],G=A[L];Y!==G&&L!=="value"&&i(w,L,G,Y,B,U)}"value"in C&&i(w,"value",A.value,C.value,B)}},b=(w,A,C,U,B,L,Y,G,q)=>{const W=A.el=w?w.el:c(""),de=A.anchor=w?w.anchor:c("");let{patchFlag:te,dynamicChildren:he,slotScopeIds:pe}=A;pe&&(G=G?G.concat(pe):pe),w==null?(r(W,C,U),r(de,C,U),E(A.children||[],C,de,B,L,Y,G,q)):te>0&&te&64&&he&&w.dynamicChildren?(I(w.dynamicChildren,he,C,B,L,Y,G),(A.key!=null||B&&A===B.subTree)&&n_(w,A,!0)):ne(w,A,C,de,B,L,Y,G,q)},v=(w,A,C,U,B,L,Y,G,q)=>{A.slotScopeIds=G,w==null?A.shapeFlag&512?B.ctx.activate(A,C,U,Y,q):me(A,C,U,B,L,Y,q):Ve(w,A,q)},me=(w,A,C,U,B,L,Y)=>{const G=w.component=BT(w,U,B);if(mc(w)&&(G.ctx.renderer=ce),jT(G,!1,Y),G.asyncDep){if(B&&B.registerDep(G,Se,Y),!w.el){const q=G.subTree=st(Ut);O(null,q,A,C),w.placeholder=q.el}}else Se(G,w,A,C,B,L,Y)},Ve=(w,A,C)=>{const U=A.component=w.component;if(NT(w,A,C))if(U.asyncDep&&!U.asyncResolved){Q(U,A,C);return}else U.next=A,U.update();else A.el=w.el,U.vnode=A},Se=(w,A,C,U,B,L,Y)=>{const G=()=>{if(w.isMounted){let{next:te,bu:he,u:pe,parent:Pe,vnode:je}=w;{const Gt=r_(w);if(Gt){te&&(te.el=je.el,Q(w,te,Y)),Gt.asyncDep.then(()=>{w.isUnmounted||G()});return}}let Me=te,St;Kr(w,!1),te?(te.el=je.el,Q(w,te,Y)):te=je,he&&aa(he),(St=te.props&&te.props.onVnodeBeforeUpdate)&&_n(St,Pe,te,je),Kr(w,!0);const Ct=cf(w),Wt=w.subTree;w.subTree=Ct,P(Wt,Ct,f(Wt.el),x(Wt),w,B,L),te.el=Ct.el,Me===null&&OT(w,Ct.el),pe&&Kt(pe,B),(St=te.props&&te.props.onVnodeUpdated)&&Kt(()=>_n(St,Pe,te,je),B)}else{let te;const{el:he,props:pe}=A,{bm:Pe,m:je,parent:Me,root:St,type:Ct}=w,Wt=qi(A);Kr(w,!1),Pe&&aa(Pe),!Wt&&(te=pe&&pe.onVnodeBeforeMount)&&_n(te,Me,A),Kr(w,!0);{St.ce&&St.ce._def.shadowRoot!==!1&&St.ce._injectChildStyle(Ct);const Gt=w.subTree=cf(w);P(null,Gt,C,U,w,B,L),A.el=Gt.el}if(je&&Kt(je,B),!Wt&&(te=pe&&pe.onVnodeMounted)){const Gt=A;Kt(()=>_n(te,Me,Gt),B)}(A.shapeFlag&256||Me&&qi(Me.vnode)&&Me.vnode.shapeFlag&256)&&w.a&&Kt(w.a,B),w.isMounted=!0,A=C=U=null}};w.scope.on();const q=w.effect=new hm(G);w.scope.off();const W=w.update=q.run.bind(q),de=w.job=q.runIfDirty.bind(q);de.i=w,de.id=w.uid,q.scheduler=()=>eh(de),Kr(w,!0),W()},Q=(w,A,C)=>{A.component=w;const U=w.vnode.props;w.vnode=A,w.next=null,gT(w,A.props,U,C),vT(w,A.children,C),Jn(),Xd(w),Yn()},ne=(w,A,C,U,B,L,Y,G,q=!1)=>{const W=w&&w.children,de=w?w.shapeFlag:0,te=A.children,{patchFlag:he,shapeFlag:pe}=A;if(he>0){if(he&128){j(W,te,C,U,B,L,Y,G,q);return}else if(he&256){ie(W,te,C,U,B,L,Y,G,q);return}}pe&8?(de&16&&Je(W,B,L),te!==W&&d(C,te)):de&16?pe&16?j(W,te,C,U,B,L,Y,G,q):Je(W,B,L,!0):(de&8&&d(C,""),pe&16&&E(te,C,U,B,L,Y,G,q))},ie=(w,A,C,U,B,L,Y,G,q)=>{w=w||Ls,A=A||Ls;const W=w.length,de=A.length,te=Math.min(W,de);let he;for(he=0;he<te;he++){const pe=A[he]=q?gr(A[he]):In(A[he]);P(w[he],pe,C,null,B,L,Y,G,q)}W>de?Je(w,B,L,!0,!1,te):E(A,C,U,B,L,Y,G,q,te)},j=(w,A,C,U,B,L,Y,G,q)=>{let W=0;const de=A.length;let te=w.length-1,he=de-1;for(;W<=te&&W<=he;){const pe=w[W],Pe=A[W]=q?gr(A[W]):In(A[W]);if(Zr(pe,Pe))P(pe,Pe,C,null,B,L,Y,G,q);else break;W++}for(;W<=te&&W<=he;){const pe=w[te],Pe=A[he]=q?gr(A[he]):In(A[he]);if(Zr(pe,Pe))P(pe,Pe,C,null,B,L,Y,G,q);else break;te--,he--}if(W>te){if(W<=he){const pe=he+1,Pe=pe<de?A[pe].el:U;for(;W<=he;)P(null,A[W]=q?gr(A[W]):In(A[W]),C,Pe,B,L,Y,G,q),W++}}else if(W>he)for(;W<=te;)Z(w[W],B,L,!0),W++;else{const pe=W,Pe=W,je=new Map;for(W=Pe;W<=he;W++){const yt=A[W]=q?gr(A[W]):In(A[W]);yt.key!=null&&je.set(yt.key,W)}let Me,St=0;const Ct=he-Pe+1;let Wt=!1,Gt=0;const rn=new Array(Ct);for(W=0;W<Ct;W++)rn[W]=0;for(W=pe;W<=te;W++){const yt=w[W];if(St>=Ct){Z(yt,B,L,!0);continue}let ft;if(yt.key!=null)ft=je.get(yt.key);else for(Me=Pe;Me<=he;Me++)if(rn[Me-Pe]===0&&Zr(yt,A[Me])){ft=Me;break}ft===void 0?Z(yt,B,L,!0):(rn[ft-Pe]=W+1,ft>=Gt?Gt=ft:Wt=!0,P(yt,A[ft],C,null,B,L,Y,G,q),St++)}const Is=Wt?wT(rn):Ls;for(Me=Is.length-1,W=Ct-1;W>=0;W--){const yt=Pe+W,ft=A[yt],di=A[yt+1],jr=yt+1<de?di.el||di.placeholder:U;rn[W]===0?P(null,ft,C,jr,B,L,Y,G,q):Wt&&(Me<0||W!==Is[Me]?K(ft,C,jr,2):Me--)}}},K=(w,A,C,U,B=null)=>{const{el:L,type:Y,transition:G,children:q,shapeFlag:W}=w;if(W&6){K(w.component.subTree,A,C,U);return}if(W&128){w.suspense.move(A,C,U);return}if(W&64){Y.move(w,A,C,ce);return}if(Y===Tt){r(L,A,C);for(let te=0;te<q.length;te++)K(q[te],A,C,U);r(w.anchor,A,C);return}if(Y===_l){F(w,A,C);return}if(U!==2&&W&1&&G)if(U===0)G.beforeEnter(L),r(L,A,C),Kt(()=>G.enter(L),B);else{const{leave:te,delayLeave:he,afterLeave:pe}=G,Pe=()=>{w.ctx.isUnmounted?s(L):r(L,A,C)},je=()=>{L._isLeaving&&L[Fn](!0),te(L,()=>{Pe(),pe&&pe()})};he?he(L,Pe,je):je()}else r(L,A,C)},Z=(w,A,C,U=!1,B=!1)=>{const{type:L,props:Y,ref:G,children:q,dynamicChildren:W,shapeFlag:de,patchFlag:te,dirs:he,cacheIndex:pe}=w;if(te===-2&&(B=!1),G!=null&&(Jn(),$i(G,null,C,w,!0),Yn()),pe!=null&&(A.renderCache[pe]=void 0),de&256){A.ctx.deactivate(w);return}const Pe=de&1&&he,je=!qi(w);let Me;if(je&&(Me=Y&&Y.onVnodeBeforeUnmount)&&_n(Me,A,w),de&6)Qe(w.component,C,U);else{if(de&128){w.suspense.unmount(C,U);return}Pe&&zr(w,null,A,"beforeUnmount"),de&64?w.type.remove(w,A,C,ce,U):W&&!W.hasOnce&&(L!==Tt||te>0&&te&64)?Je(W,A,C,!1,!0):(L===Tt&&te&384||!B&&de&16)&&Je(q,A,C),U&&ve(w)}(je&&(Me=Y&&Y.onVnodeUnmounted)||Pe)&&Kt(()=>{Me&&_n(Me,A,w),Pe&&zr(w,null,A,"unmounted")},C)},ve=w=>{const{type:A,el:C,anchor:U,transition:B}=w;if(A===Tt){Ae(C,U);return}if(A===_l){M(w);return}const L=()=>{s(C),B&&!B.persisted&&B.afterLeave&&B.afterLeave()};if(w.shapeFlag&1&&B&&!B.persisted){const{leave:Y,delayLeave:G}=B,q=()=>Y(C,L);G?G(w.el,L,q):q()}else L()},Ae=(w,A)=>{let C;for(;w!==A;)C=g(w),s(w),w=C;s(A)},Qe=(w,A,C)=>{const{bum:U,scope:B,job:L,subTree:Y,um:G,m:q,a:W}=w;af(q),af(W),U&&aa(U),B.stop(),L&&(L.flags|=8,Z(Y,w,A,C)),G&&Kt(G,A),Kt(()=>{w.isUnmounted=!0},A)},Je=(w,A,C,U=!1,B=!1,L=0)=>{for(let Y=L;Y<w.length;Y++)Z(w[Y],A,C,U,B)},x=w=>{if(w.shapeFlag&6)return x(w.component.subTree);if(w.shapeFlag&128)return w.suspense.next();const A=g(w.anchor||w.el),C=A&&A[qI];return C?g(C):A};let ee=!1;const J=(w,A,C)=>{w==null?A._vnode&&Z(A._vnode,null,null,!0):P(A._vnode||null,w,A,null,null,null,C),A._vnode=w,ee||(ee=!0,Xd(),Dm(),ee=!1)},ce={p:P,um:Z,m:K,r:ve,mt:me,mc:E,pc:ne,pbc:I,n:x,o:t};return{render:J,hydrate:void 0,createApp:dT(J)}}function ml({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Kr({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function TT(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function n_(t,e,n=!1){const r=t.children,s=e.children;if(ye(r)&&ye(s))for(let i=0;i<r.length;i++){const o=r[i];let c=s[i];c.shapeFlag&1&&!c.dynamicChildren&&((c.patchFlag<=0||c.patchFlag===32)&&(c=s[i]=gr(s[i]),c.el=o.el),!n&&c.patchFlag!==-2&&n_(o,c)),c.type===Ec&&c.patchFlag!==-1&&(c.el=o.el),c.type===Ut&&!c.el&&(c.el=o.el)}}function wT(t){const e=t.slice(),n=[0];let r,s,i,o,c;const l=t.length;for(r=0;r<l;r++){const u=t[r];if(u!==0){if(s=n[n.length-1],t[s]<u){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)c=i+o>>1,t[n[c]]<u?i=c+1:o=c;u<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function r_(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:r_(e)}function af(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const bT=Symbol.for("v-scx"),AT=()=>wn(bT);function bn(t,e,n){return s_(t,e,n)}function s_(t,e,n=qe){const{immediate:r,deep:s,flush:i,once:o}=n,c=_t({},n),l=e&&r||!e&&i!=="post";let u;if(lo){if(i==="sync"){const _=AT();u=_.__watcherHandles||(_.__watcherHandles=[])}else if(!l){const _=()=>{};return _.stop=Tn,_.resume=Tn,_.pause=Tn,_}}const d=Ht;c.call=(_,R,P)=>un(_,d,R,P);let f=!1;i==="post"?c.scheduler=_=>{Kt(_,d&&d.suspense)}:i!=="sync"&&(f=!0,c.scheduler=(_,R)=>{R?_():eh(_)}),c.augmentJob=_=>{e&&(_.flags|=4),f&&(_.flags|=2,d&&(_.id=d.uid,_.i=d))};const g=HI(t,e,c);return lo&&(u?u.push(g):l&&g()),g}function ST(t,e,n){const r=this.proxy,s=ot(t)?t.includes(".")?i_(r,t):()=>r[t]:t.bind(r,r);let i;we(e)?i=e:(i=e.handler,n=e);const o=Ro(this),c=s_(s,i.bind(r),n);return o(),c}function i_(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const CT=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${kr(e)}Modifiers`]||t[`${fs(e)}Modifiers`];function RT(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||qe;let s=n;const i=e.startsWith("update:"),o=i&&CT(r,e.slice(7));o&&(o.trim&&(s=n.map(d=>ot(d)?d.trim():d)),o.number&&(s=n.map(Ql)));let c,l=r[c=ll(e)]||r[c=ll(kr(e))];!l&&i&&(l=r[c=ll(fs(e))]),l&&un(l,t,6,s);const u=r[c+"Once"];if(u){if(!t.emitted)t.emitted={};else if(t.emitted[c])return;t.emitted[c]=!0,un(u,t,6,s)}}const PT=new WeakMap;function o_(t,e,n=!1){const r=n?PT:e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},c=!1;if(!we(t)){const l=u=>{const d=o_(u,e,!0);d&&(c=!0,_t(o,d))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!i&&!c?(Ke(t)&&r.set(t,null),null):(ye(i)?i.forEach(l=>o[l]=null):_t(o,i),Ke(t)&&r.set(t,o),o)}function vc(t,e){return!t||!lc(e)?!1:(e=e.slice(2).replace(/Once$/,""),Ue(t,e[0].toLowerCase()+e.slice(1))||Ue(t,fs(e))||Ue(t,e))}function cf(t){const{type:e,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:o,attrs:c,emit:l,render:u,renderCache:d,props:f,data:g,setupState:_,ctx:R,inheritAttrs:P}=t,k=Pa(t);let O,V;try{if(n.shapeFlag&4){const M=s||r,X=M;O=In(u.call(X,M,d,f,_,g,R)),V=c}else{const M=e;O=In(M.length>1?M(f,{attrs:c,slots:o,emit:l}):M(f,null)),V=e.props?c:kT(c)}}catch(M){Gi.length=0,gc(M,t,1),O=st(Ut)}let F=O;if(V&&P!==!1){const M=Object.keys(V),{shapeFlag:X}=F;M.length&&X&7&&(i&&M.some($u)&&(V=DT(V,i)),F=Nr(F,V,!1,!0))}return n.dirs&&(F=Nr(F,null,!1,!0),F.dirs=F.dirs?F.dirs.concat(n.dirs):n.dirs),n.transition&&oo(F,n.transition),O=F,Pa(k),O}const kT=t=>{let e;for(const n in t)(n==="class"||n==="style"||lc(n))&&((e||(e={}))[n]=t[n]);return e},DT=(t,e)=>{const n={};for(const r in t)(!$u(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function NT(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:c,patchFlag:l}=e,u=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return r?lf(r,o,u):!!o;if(l&8){const d=e.dynamicProps;for(let f=0;f<d.length;f++){const g=d[f];if(o[g]!==r[g]&&!vc(u,g))return!0}}}else return(s||c)&&(!c||!c.$stable)?!0:r===o?!1:r?o?lf(r,o,u):!0:!!o;return!1}function lf(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!vc(n,i))return!0}return!1}function OT({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const a_=t=>t.__isSuspense;function VT(t,e){e&&e.pendingBranch?ye(t)?e.effects.push(...t):e.effects.push(t):$I(t)}const Tt=Symbol.for("v-fgt"),Ec=Symbol.for("v-txt"),Ut=Symbol.for("v-cmt"),_l=Symbol.for("v-stc"),Gi=[];let Qt=null;function ge(t=!1){Gi.push(Qt=t?null:[])}function xT(){Gi.pop(),Qt=Gi[Gi.length-1]||null}let co=1;function Na(t,e=!1){co+=t,t<0&&Qt&&e&&(Qt.hasOnce=!0)}function c_(t){return t.dynamicChildren=co>0?Qt||Ls:null,xT(),co>0&&Qt&&Qt.push(t),t}function be(t,e,n,r,s,i){return c_(Ee(t,e,n,r,s,i,!0))}function Wn(t,e,n,r,s){return c_(st(t,e,n,r,s,!0))}function Oa(t){return t?t.__v_isVNode===!0:!1}function Zr(t,e){return t.type===e.type&&t.key===e.key}const l_=({key:t})=>t??null,la=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?ot(t)||it(t)||we(t)?{i:en,r:t,k:e,f:!!n}:t:null);function Ee(t,e=null,n=null,r=0,s=null,i=t===Tt?0:1,o=!1,c=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&l_(e),ref:e&&la(e),scopeId:Om,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:en};return c?(sh(l,n),i&128&&t.normalize(l)):n&&(l.shapeFlag|=ot(n)?8:16),co>0&&!o&&Qt&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&Qt.push(l),l}const st=MT;function MT(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===sT)&&(t=Ut),Oa(t)){const c=Nr(t,e,!0);return n&&sh(c,n),co>0&&!i&&Qt&&(c.shapeFlag&6?Qt[Qt.indexOf(t)]=c:Qt.push(c)),c.patchFlag=-2,c}if(GT(t)&&(t=t.__vccOpts),e){e=LT(e);let{class:c,style:l}=e;c&&!ot(c)&&(e.class=Bn(c)),Ke(l)&&(Xu(l)&&!ye(l)&&(l=_t({},l)),e.style=Qn(l))}const o=ot(t)?1:a_(t)?128:Mm(t)?64:Ke(t)?4:we(t)?2:0;return Ee(t,e,n,r,s,o,i,!0)}function LT(t){return t?Xu(t)||Jm(t)?_t({},t):t:null}function Nr(t,e,n=!1,r=!1){const{props:s,ref:i,patchFlag:o,children:c,transition:l}=t,u=e?FT(s||{},e):s,d={__v_isVNode:!0,__v_skip:!0,type:t.type,props:u,key:u&&l_(u),ref:e&&e.ref?n&&i?ye(i)?i.concat(la(e)):[i,la(e)]:la(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:c,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Tt?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:l,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&Nr(t.ssContent),ssFallback:t.ssFallback&&Nr(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return l&&r&&oo(d,l.clone(d)),d}function Ic(t=" ",e=0){return st(Ec,null,t,e)}function vt(t="",e=!1){return e?(ge(),Wn(Ut,null,t)):st(Ut,null,t)}function In(t){return t==null||typeof t=="boolean"?st(Ut):ye(t)?st(Tt,null,t.slice()):Oa(t)?gr(t):st(Ec,null,String(t))}function gr(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:Nr(t)}function sh(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(ye(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),sh(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!Jm(e)?e._ctx=en:s===3&&en&&(en.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else we(e)?(e={default:e,_ctx:en},n=32):(e=String(e),r&64?(n=16,e=[Ic(e)]):n=8);t.children=e,t.shapeFlag|=n}function FT(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=Bn([e.class,r.class]));else if(s==="style")e.style=Qn([e.style,r.style]);else if(lc(s)){const i=e[s],o=r[s];o&&i!==o&&!(ye(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function _n(t,e,n,r=null){un(t,e,7,[n,r])}const UT=zm();let HT=0;function BT(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||UT,i={uid:HT++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new cm(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Xm(r,s),emitsOptions:o_(r,s),emit:null,emitted:null,propsDefaults:qe,inheritAttrs:r.inheritAttrs,ctx:qe,data:qe,props:qe,attrs:qe,slots:qe,refs:qe,setupState:qe,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=RT.bind(null,i),t.ce&&t.ce(i),i}let Ht=null;const ih=()=>Ht||en;let Va,su;{const t=dc(),e=(n,r)=>{let s;return(s=t[n])||(s=t[n]=[]),s.push(r),i=>{s.length>1?s.forEach(o=>o(i)):s[0](i)}};Va=e("__VUE_INSTANCE_SETTERS__",n=>Ht=n),su=e("__VUE_SSR_SETTERS__",n=>lo=n)}const Ro=t=>{const e=Ht;return Va(t),t.scope.on(),()=>{t.scope.off(),Va(e)}},uf=()=>{Ht&&Ht.scope.off(),Va(null)};function u_(t){return t.vnode.shapeFlag&4}let lo=!1;function jT(t,e=!1,n=!1){e&&su(e);const{props:r,children:s}=t.vnode,i=u_(t);pT(t,r,i,e),yT(t,s,n||e);const o=i?$T(t,e):void 0;return e&&su(!1),o}function $T(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,iT);const{setup:r}=n;if(r){Jn();const s=t.setupContext=r.length>1?WT(t):null,i=Ro(t),o=Co(r,t,0,[t.props,s]),c=em(o);if(Yn(),i(),(c||t.sp)&&!qi(t)&&jm(t),c){if(o.then(uf,uf),e)return o.then(l=>{hf(t,l)}).catch(l=>{gc(l,t,0)});t.asyncDep=o}else hf(t,o)}else h_(t)}function hf(t,e,n){we(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Ke(e)&&(t.setupState=Rm(e)),h_(t)}function h_(t,e,n){const r=t.type;t.render||(t.render=r.render||Tn);{const s=Ro(t);Jn();try{oT(t)}finally{Yn(),s()}}}const qT={get(t,e){return Dt(t,"get",""),t[e]}};function WT(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,qT),slots:t.slots,emit:t.emit,expose:e}}function Tc(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Rm(pc(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Wi)return Wi[n](t)},has(e,n){return n in e||n in Wi}})):t.proxy}function GT(t){return we(t)&&"__vccOpts"in t}const oe=(t,e)=>FI(t,e,lo);function oh(t,e,n){const r=(i,o,c)=>{Na(-1);try{return st(i,o,c)}finally{Na(1)}},s=arguments.length;return s===2?Ke(e)&&!ye(e)?Oa(e)?r(t,null,[e]):r(t,e):r(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&Oa(n)&&(n=[n]),r(t,e,n))}const zT="3.5.21";/**
* @vue/runtime-dom v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let iu;const df=typeof window<"u"&&window.trustedTypes;if(df)try{iu=df.createPolicy("vue",{createHTML:t=>t})}catch{}const d_=iu?t=>iu.createHTML(t):t=>t,KT="http://www.w3.org/2000/svg",QT="http://www.w3.org/1998/Math/MathML",Ln=typeof document<"u"?document:null,ff=Ln&&Ln.createElement("template"),JT={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e==="svg"?Ln.createElementNS(KT,t):e==="mathml"?Ln.createElementNS(QT,t):n?Ln.createElement(t,{is:n}):Ln.createElement(t);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>Ln.createTextNode(t),createComment:t=>Ln.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Ln.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{ff.innerHTML=d_(r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t);const c=ff.content;if(r==="svg"||r==="mathml"){const l=c.firstChild;for(;l.firstChild;)c.appendChild(l.firstChild);c.removeChild(l)}e.insertBefore(c,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},ur="transition",Ri="animation",uo=Symbol("_vtc"),f_={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},YT=_t({},Lm,f_),XT=t=>(t.displayName="Transition",t.props=YT,t),ZT=XT((t,{slots:e})=>oh(zI,ew(t),e)),Qr=(t,e=[])=>{ye(t)?t.forEach(n=>n(...e)):t&&t(...e)},pf=t=>t?ye(t)?t.some(e=>e.length>1):t.length>1:!1;function ew(t){const e={};for(const b in t)b in f_||(e[b]=t[b]);if(t.css===!1)return e;const{name:n="v",type:r,duration:s,enterFromClass:i=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:c=`${n}-enter-to`,appearFromClass:l=i,appearActiveClass:u=o,appearToClass:d=c,leaveFromClass:f=`${n}-leave-from`,leaveActiveClass:g=`${n}-leave-active`,leaveToClass:_=`${n}-leave-to`}=t,R=tw(s),P=R&&R[0],k=R&&R[1],{onBeforeEnter:O,onEnter:V,onEnterCancelled:F,onLeave:M,onLeaveCancelled:X,onBeforeAppear:se=O,onAppear:S=V,onAppearCancelled:E=F}=e,y=(b,v,me,Ve)=>{b._enterCancelled=Ve,Jr(b,v?d:c),Jr(b,v?u:o),me&&me()},I=(b,v)=>{b._isLeaving=!1,Jr(b,f),Jr(b,_),Jr(b,g),v&&v()},T=b=>(v,me)=>{const Ve=b?S:V,Se=()=>y(v,b,me);Qr(Ve,[v,Se]),gf(()=>{Jr(v,b?l:i),xn(v,b?d:c),pf(Ve)||mf(v,r,P,Se)})};return _t(e,{onBeforeEnter(b){Qr(O,[b]),xn(b,i),xn(b,o)},onBeforeAppear(b){Qr(se,[b]),xn(b,l),xn(b,u)},onEnter:T(!1),onAppear:T(!0),onLeave(b,v){b._isLeaving=!0;const me=()=>I(b,v);xn(b,f),b._enterCancelled?(xn(b,g),vf()):(vf(),xn(b,g)),gf(()=>{b._isLeaving&&(Jr(b,f),xn(b,_),pf(M)||mf(b,r,k,me))}),Qr(M,[b,me])},onEnterCancelled(b){y(b,!1,void 0,!0),Qr(F,[b])},onAppearCancelled(b){y(b,!0,void 0,!0),Qr(E,[b])},onLeaveCancelled(b){I(b),Qr(X,[b])}})}function tw(t){if(t==null)return null;if(Ke(t))return[yl(t.enter),yl(t.leave)];{const e=yl(t);return[e,e]}}function yl(t){return iI(t)}function xn(t,e){e.split(/\s+/).forEach(n=>n&&t.classList.add(n)),(t[uo]||(t[uo]=new Set)).add(e)}function Jr(t,e){e.split(/\s+/).forEach(r=>r&&t.classList.remove(r));const n=t[uo];n&&(n.delete(e),n.size||(t[uo]=void 0))}function gf(t){requestAnimationFrame(()=>{requestAnimationFrame(t)})}let nw=0;function mf(t,e,n,r){const s=t._endId=++nw,i=()=>{s===t._endId&&r()};if(n!=null)return setTimeout(i,n);const{type:o,timeout:c,propCount:l}=rw(t,e);if(!o)return r();const u=o+"end";let d=0;const f=()=>{t.removeEventListener(u,g),i()},g=_=>{_.target===t&&++d>=l&&f()};setTimeout(()=>{d<l&&f()},c+1),t.addEventListener(u,g)}function rw(t,e){const n=window.getComputedStyle(t),r=R=>(n[R]||"").split(", "),s=r(`${ur}Delay`),i=r(`${ur}Duration`),o=_f(s,i),c=r(`${Ri}Delay`),l=r(`${Ri}Duration`),u=_f(c,l);let d=null,f=0,g=0;e===ur?o>0&&(d=ur,f=o,g=i.length):e===Ri?u>0&&(d=Ri,f=u,g=l.length):(f=Math.max(o,u),d=f>0?o>u?ur:Ri:null,g=d?d===ur?i.length:l.length:0);const _=d===ur&&/\b(?:transform|all)(?:,|$)/.test(r(`${ur}Property`).toString());return{type:d,timeout:f,propCount:g,hasTransform:_}}function _f(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max(...e.map((n,r)=>yf(n)+yf(t[r])))}function yf(t){return t==="auto"?0:Number(t.slice(0,-1).replace(",","."))*1e3}function vf(){return document.body.offsetHeight}function sw(t,e,n){const r=t[uo];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const xa=Symbol("_vod"),p_=Symbol("_vsh"),iw={name:"show",beforeMount(t,{value:e},{transition:n}){t[xa]=t.style.display==="none"?"":t.style.display,n&&e?n.beforeEnter(t):Pi(t,e)},mounted(t,{value:e},{transition:n}){n&&e&&n.enter(t)},updated(t,{value:e,oldValue:n},{transition:r}){!e!=!n&&(r?e?(r.beforeEnter(t),Pi(t,!0),r.enter(t)):r.leave(t,()=>{Pi(t,!1)}):Pi(t,e))},beforeUnmount(t,{value:e}){Pi(t,e)}};function Pi(t,e){t.style.display=e?t[xa]:"none",t[p_]=!e}const ow=Symbol(""),aw=/(?:^|;)\s*display\s*:/;function cw(t,e,n){const r=t.style,s=ot(n);let i=!1;if(n&&!s){if(e)if(ot(e))for(const o of e.split(";")){const c=o.slice(0,o.indexOf(":")).trim();n[c]==null&&ua(r,c,"")}else for(const o in e)n[o]==null&&ua(r,o,"");for(const o in n)o==="display"&&(i=!0),ua(r,o,n[o])}else if(s){if(e!==n){const o=r[ow];o&&(n+=";"+o),r.cssText=n,i=aw.test(n)}}else e&&t.removeAttribute("style");xa in t&&(t[xa]=i?r.display:"",t[p_]&&(r.display="none"))}const Ef=/\s*!important$/;function ua(t,e,n){if(ye(n))n.forEach(r=>ua(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=lw(t,e);Ef.test(n)?t.setProperty(fs(r),n.replace(Ef,""),"important"):t[r]=n}}const If=["Webkit","Moz","ms"],vl={};function lw(t,e){const n=vl[e];if(n)return n;let r=kr(e);if(r!=="filter"&&r in t)return vl[e]=r;r=rm(r);for(let s=0;s<If.length;s++){const i=If[s]+r;if(i in t)return vl[e]=i}return e}const Tf="http://www.w3.org/1999/xlink";function wf(t,e,n,r,s,i=hI(e)){r&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(Tf,e.slice(6,e.length)):t.setAttributeNS(Tf,e,n):n==null||i&&!im(n)?t.removeAttribute(e):t.setAttribute(e,i?"":Hr(n)?String(n):n)}function bf(t,e,n,r,s){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?d_(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const c=i==="OPTION"?t.getAttribute("value")||"":t.value,l=n==null?t.type==="checkbox"?"on":"":String(n);(c!==l||!("_value"in t))&&(t.value=l),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const c=typeof t[e];c==="boolean"?n=im(n):n==null&&c==="string"?(n="",o=!0):c==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(s||e)}function Ps(t,e,n,r){t.addEventListener(e,n,r)}function uw(t,e,n,r){t.removeEventListener(e,n,r)}const Af=Symbol("_vei");function hw(t,e,n,r,s=null){const i=t[Af]||(t[Af]={}),o=i[e];if(r&&o)o.value=r;else{const[c,l]=dw(e);if(r){const u=i[e]=gw(r,s);Ps(t,c,u,l)}else o&&(uw(t,c,o,l),i[e]=void 0)}}const Sf=/(?:Once|Passive|Capture)$/;function dw(t){let e;if(Sf.test(t)){e={};let r;for(;r=t.match(Sf);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):fs(t.slice(2)),e]}let El=0;const fw=Promise.resolve(),pw=()=>El||(fw.then(()=>El=0),El=Date.now());function gw(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;un(mw(r,n.value),e,5,[r])};return n.value=t,n.attached=pw(),n}function mw(t,e){if(ye(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const Cf=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,_w=(t,e,n,r,s,i)=>{const o=s==="svg";e==="class"?sw(t,r,o):e==="style"?cw(t,n,r):lc(e)?$u(e)||hw(t,e,n,r,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):yw(t,e,r,o))?(bf(t,e,r),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&wf(t,e,r,o,i,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!ot(r))?bf(t,kr(e),r,i,e):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),wf(t,e,r,o))};function yw(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&Cf(e)&&we(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=t.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Cf(e)&&ot(n)?!1:e in t}const Rf=t=>{const e=t.props["onUpdate:modelValue"]||!1;return ye(e)?n=>aa(e,n):e};function vw(t){t.target.composing=!0}function Pf(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Il=Symbol("_assign"),Ew={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t[Il]=Rf(s);const i=r||s.props&&s.props.type==="number";Ps(t,e?"change":"input",o=>{if(o.target.composing)return;let c=t.value;n&&(c=c.trim()),i&&(c=Ql(c)),t[Il](c)}),n&&Ps(t,"change",()=>{t.value=t.value.trim()}),e||(Ps(t,"compositionstart",vw),Ps(t,"compositionend",Pf),Ps(t,"change",Pf))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:r,trim:s,number:i}},o){if(t[Il]=Rf(o),t.composing)return;const c=(i||t.type==="number")&&!/^0\d/.test(t.value)?Ql(t.value):t.value,l=e??"";c!==l&&(document.activeElement===t&&t.type!=="range"&&(r&&e===n||s&&t.value.trim()===l)||(t.value=l))}},Iw=["ctrl","shift","alt","meta"],Tw={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>Iw.some(n=>t[`${n}Key`]&&!e.includes(n))},ww=(t,e)=>{const n=t._withMods||(t._withMods={}),r=e.join(".");return n[r]||(n[r]=((s,...i)=>{for(let o=0;o<e.length;o++){const c=Tw[e[o]];if(c&&c(s,e))return}return t(s,...i)}))},bw=_t({patchProp:_w},JT);let kf;function Aw(){return kf||(kf=ET(bw))}const Sw=((...t)=>{const e=Aw().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=Rw(r);if(!s)return;const i=e._component;!we(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=n(s,!1,Cw(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e});function Cw(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function Rw(t){return ot(t)?document.querySelector(t):t}/*!
 * pinia v3.0.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let g_;const wc=t=>g_=t,m_=Symbol();function ou(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var zi;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(zi||(zi={}));function Pw(){const t=lm(!0),e=t.run(()=>He({}));let n=[],r=[];const s=pc({install(i){wc(s),s._a=i,i.provide(m_,s),i.config.globalProperties.$pinia=s,r.forEach(o=>n.push(o)),r=[]},use(i){return this._a?n.push(i):r.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return s}const __=()=>{};function Df(t,e,n,r=__){t.push(e);const s=()=>{const i=t.indexOf(e);i>-1&&(t.splice(i,1),r())};return!n&&um()&&So(s),s}function Ss(t,...e){t.slice().forEach(n=>{n(...e)})}const kw=t=>t(),Nf=Symbol(),Tl=Symbol();function au(t,e){t instanceof Map&&e instanceof Map?e.forEach((n,r)=>t.set(r,n)):t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const r=e[n],s=t[n];ou(s)&&ou(r)&&t.hasOwnProperty(n)&&!it(r)&&!wr(r)?t[n]=au(s,r):t[n]=r}return t}const Dw=Symbol();function Nw(t){return!ou(t)||!Object.prototype.hasOwnProperty.call(t,Dw)}const{assign:fr}=Object;function Ow(t){return!!(it(t)&&t.effect)}function Vw(t,e,n,r){const{state:s,actions:i,getters:o}=e,c=n.state.value[t];let l;function u(){c||(n.state.value[t]=s?s():{});const d=VI(n.state.value[t]);return fr(d,i,Object.keys(o||{}).reduce((f,g)=>(f[g]=pc(oe(()=>{wc(n);const _=n._s.get(t);return o[g].call(_,_)})),f),{}))}return l=y_(t,u,e,n,r,!0),l}function y_(t,e,n={},r,s,i){let o;const c=fr({actions:{}},n),l={deep:!0};let u,d,f=[],g=[],_;const R=r.state.value[t];!i&&!R&&(r.state.value[t]={}),He({});let P;function k(E){let y;u=d=!1,typeof E=="function"?(E(r.state.value[t]),y={type:zi.patchFunction,storeId:t,events:_}):(au(r.state.value[t],E),y={type:zi.patchObject,payload:E,storeId:t,events:_});const I=P=Symbol();Zu().then(()=>{P===I&&(u=!0)}),d=!0,Ss(f,y,r.state.value[t])}const O=i?function(){const{state:y}=n,I=y?y():{};this.$patch(T=>{fr(T,I)})}:__;function V(){o.stop(),f=[],g=[],r._s.delete(t)}const F=(E,y="")=>{if(Nf in E)return E[Tl]=y,E;const I=function(){wc(r);const T=Array.from(arguments),b=[],v=[];function me(Q){b.push(Q)}function Ve(Q){v.push(Q)}Ss(g,{args:T,name:I[Tl],store:X,after:me,onError:Ve});let Se;try{Se=E.apply(this&&this.$id===t?this:X,T)}catch(Q){throw Ss(v,Q),Q}return Se instanceof Promise?Se.then(Q=>(Ss(b,Q),Q)).catch(Q=>(Ss(v,Q),Promise.reject(Q))):(Ss(b,Se),Se)};return I[Nf]=!0,I[Tl]=y,I},M={_p:r,$id:t,$onAction:Df.bind(null,g),$patch:k,$reset:O,$subscribe(E,y={}){const I=Df(f,E,y.detached,()=>T()),T=o.run(()=>bn(()=>r.state.value[t],b=>{(y.flush==="sync"?d:u)&&E({storeId:t,type:zi.direct,events:_},b)},fr({},l,y)));return I},$dispose:V},X=ps(M);r._s.set(t,X);const S=(r._a&&r._a.runWithContext||kw)(()=>r._e.run(()=>(o=lm()).run(()=>e({action:F}))));for(const E in S){const y=S[E];if(it(y)&&!Ow(y)||wr(y))i||(R&&Nw(y)&&(it(y)?y.value=R[E]:au(y,R[E])),r.state.value[t][E]=y);else if(typeof y=="function"){const I=F(y,E);S[E]=I,c.actions[E]=y}}return fr(X,S),fr(Le(X),S),Object.defineProperty(X,"$state",{get:()=>r.state.value[t],set:E=>{k(y=>{fr(y,E)})}}),r._p.forEach(E=>{fr(X,o.run(()=>E({store:X,app:r._a,pinia:r,options:c})))}),R&&i&&n.hydrate&&n.hydrate(X.$state,R),u=!0,d=!0,X}/*! #__NO_SIDE_EFFECTS__ */function bc(t,e,n){let r;const s=typeof e=="function";r=s?n:e;function i(o,c){const l=fT();return o=o||(l?wn(m_,null):null),o&&wc(o),o=g_,o._s.has(t)||(s?y_(t,e,r,o):Vw(t,r,o)),o._s.get(t)}return i.$id=t,i}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const ks=typeof document<"u";function v_(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function xw(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&v_(t.default)}const Fe=Object.assign;function wl(t,e){const n={};for(const r in e){const s=e[r];n[r]=hn(s)?s.map(t):t(s)}return n}const Ki=()=>{},hn=Array.isArray;function Of(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}const E_=/#/g,Mw=/&/g,Lw=/\//g,Fw=/=/g,Uw=/\?/g,I_=/\+/g,Hw=/%5B/g,Bw=/%5D/g,T_=/%5E/g,jw=/%60/g,w_=/%7B/g,$w=/%7C/g,b_=/%7D/g,qw=/%20/g;function ah(t){return t==null?"":encodeURI(""+t).replace($w,"|").replace(Hw,"[").replace(Bw,"]")}function Ww(t){return ah(t).replace(w_,"{").replace(b_,"}").replace(T_,"^")}function cu(t){return ah(t).replace(I_,"%2B").replace(qw,"+").replace(E_,"%23").replace(Mw,"%26").replace(jw,"`").replace(w_,"{").replace(b_,"}").replace(T_,"^")}function Gw(t){return cu(t).replace(Fw,"%3D")}function zw(t){return ah(t).replace(E_,"%23").replace(Uw,"%3F")}function Kw(t){return zw(t).replace(Lw,"%2F")}function ho(t){if(t==null)return null;try{return decodeURIComponent(""+t)}catch{}return""+t}const Qw=/\/$/,Jw=t=>t.replace(Qw,"");function bl(t,e,n="/"){let r,s={},i="",o="";const c=e.indexOf("#");let l=e.indexOf("?");return l=c>=0&&l>c?-1:l,l>=0&&(r=e.slice(0,l),i=e.slice(l,c>0?c:e.length),s=t(i.slice(1))),c>=0&&(r=r||e.slice(0,c),o=e.slice(c,e.length)),r=eb(r??e,n),{fullPath:r+i+o,path:r,query:s,hash:ho(o)}}function Yw(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function Vf(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function Xw(t,e,n){const r=e.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&zs(e.matched[r],n.matched[s])&&A_(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function zs(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function A_(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(var n in t)if(!Zw(t[n],e[n]))return!1;return!0}function Zw(t,e){return hn(t)?xf(t,e):hn(e)?xf(e,t):t?.valueOf()===e?.valueOf()}function xf(t,e){return hn(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function eb(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,o,c;for(o=0;o<r.length;o++)if(c=r[o],c!==".")if(c==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o).join("/")}const hr={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let lu=(function(t){return t.pop="pop",t.push="push",t})({}),Al=(function(t){return t.back="back",t.forward="forward",t.unknown="",t})({});function tb(t){if(!t)if(ks){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),Jw(t)}const nb=/^[^#]+#/;function rb(t,e){return t.replace(nb,"#")+e}function sb(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const Ac=()=>({left:window.scrollX,top:window.scrollY});function ib(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;e=sb(s,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Mf(t,e){return(history.state?history.state.position-e:-1)+t}const uu=new Map;function ob(t,e){uu.set(t,e)}function ab(t){const e=uu.get(t);return uu.delete(t),e}function cb(t){return typeof t=="string"||t&&typeof t=="object"}function S_(t){return typeof t=="string"||typeof t=="symbol"}let tt=(function(t){return t[t.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",t[t.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",t[t.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",t[t.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",t[t.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",t})({});const C_=Symbol("");tt.MATCHER_NOT_FOUND+"",tt.NAVIGATION_GUARD_REDIRECT+"",tt.NAVIGATION_ABORTED+"",tt.NAVIGATION_CANCELLED+"",tt.NAVIGATION_DUPLICATED+"";function Ks(t,e){return Fe(new Error,{type:t,[C_]:!0},e)}function Mn(t,e){return t instanceof Error&&C_ in t&&(e==null||!!(t.type&e))}const lb=["params","query","hash"];function ub(t){if(typeof t=="string")return t;if(t.path!=null)return t.path;const e={};for(const n of lb)n in t&&(e[n]=t[n]);return JSON.stringify(e,null,2)}function hb(t){const e={};if(t===""||t==="?")return e;const n=(t[0]==="?"?t.slice(1):t).split("&");for(let r=0;r<n.length;++r){const s=n[r].replace(I_," "),i=s.indexOf("="),o=ho(i<0?s:s.slice(0,i)),c=i<0?null:ho(s.slice(i+1));if(o in e){let l=e[o];hn(l)||(l=e[o]=[l]),l.push(c)}else e[o]=c}return e}function Lf(t){let e="";for(let n in t){const r=t[n];if(n=Gw(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(hn(r)?r.map(s=>s&&cu(s)):[r&&cu(r)]).forEach(s=>{s!==void 0&&(e+=(e.length?"&":"")+n,s!=null&&(e+="="+s))})}return e}function db(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=hn(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return e}const fb=Symbol(""),Ff=Symbol(""),ch=Symbol(""),R_=Symbol(""),hu=Symbol("");function ki(){let t=[];function e(r){return t.push(r),()=>{const s=t.indexOf(r);s>-1&&t.splice(s,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function mr(t,e,n,r,s,i=o=>o()){const o=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((c,l)=>{const u=g=>{g===!1?l(Ks(tt.NAVIGATION_ABORTED,{from:n,to:e})):g instanceof Error?l(g):cb(g)?l(Ks(tt.NAVIGATION_GUARD_REDIRECT,{from:e,to:g})):(o&&r.enterCallbacks[s]===o&&typeof g=="function"&&o.push(g),c())},d=i(()=>t.call(r&&r.instances[s],e,n,u));let f=Promise.resolve(d);t.length<3&&(f=f.then(u)),f.catch(g=>l(g))})}function Sl(t,e,n,r,s=i=>i()){const i=[];for(const o of t)for(const c in o.components){let l=o.components[c];if(!(e!=="beforeRouteEnter"&&!o.instances[c]))if(v_(l)){const u=(l.__vccOpts||l)[e];u&&i.push(mr(u,n,r,o,c,s))}else{let u=l();i.push(()=>u.then(d=>{if(!d)throw new Error(`Couldn't resolve component "${c}" at "${o.path}"`);const f=xw(d)?d.default:d;o.mods[c]=d,o.components[c]=f;const g=(f.__vccOpts||f)[e];return g&&mr(g,n,r,o,c,s)()}))}}return i}function pb(t,e){const n=[],r=[],s=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const c=e.matched[o];c&&(t.matched.find(u=>zs(u,c))?r.push(c):n.push(c));const l=t.matched[o];l&&(e.matched.find(u=>zs(u,l))||s.push(l))}return[n,r,s]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let gb=()=>location.protocol+"//"+location.host;function P_(t,e){const{pathname:n,search:r,hash:s}=e,i=t.indexOf("#");if(i>-1){let o=s.includes(t.slice(i))?t.slice(i).length:1,c=s.slice(o);return c[0]!=="/"&&(c="/"+c),Vf(c,"")}return Vf(n,t)+r+s}function mb(t,e,n,r){let s=[],i=[],o=null;const c=({state:g})=>{const _=P_(t,location),R=n.value,P=e.value;let k=0;if(g){if(n.value=_,e.value=g,o&&o===R){o=null;return}k=P?g.position-P.position:0}else r(_);s.forEach(O=>{O(n.value,R,{delta:k,type:lu.pop,direction:k?k>0?Al.forward:Al.back:Al.unknown})})};function l(){o=n.value}function u(g){s.push(g);const _=()=>{const R=s.indexOf(g);R>-1&&s.splice(R,1)};return i.push(_),_}function d(){if(document.visibilityState==="hidden"){const{history:g}=window;if(!g.state)return;g.replaceState(Fe({},g.state,{scroll:Ac()}),"")}}function f(){for(const g of i)g();i=[],window.removeEventListener("popstate",c),window.removeEventListener("pagehide",d),document.removeEventListener("visibilitychange",d)}return window.addEventListener("popstate",c),window.addEventListener("pagehide",d),document.addEventListener("visibilitychange",d),{pauseListeners:l,listen:u,destroy:f}}function Uf(t,e,n,r=!1,s=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:s?Ac():null}}function _b(t){const{history:e,location:n}=window,r={value:P_(t,n)},s={value:e.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(l,u,d){const f=t.indexOf("#"),g=f>-1?(n.host&&document.querySelector("base")?t:t.slice(f))+l:gb()+t+l;try{e[d?"replaceState":"pushState"](u,"",g),s.value=u}catch(_){console.error(_),n[d?"replace":"assign"](g)}}function o(l,u){i(l,Fe({},e.state,Uf(s.value.back,l,s.value.forward,!0),u,{position:s.value.position}),!0),r.value=l}function c(l,u){const d=Fe({},s.value,e.state,{forward:l,scroll:Ac()});i(d.current,d,!0),i(l,Fe({},Uf(r.value,l,null),{position:d.position+1},u),!1),r.value=l}return{location:r,state:s,push:c,replace:o}}function yb(t){t=tb(t);const e=_b(t),n=mb(t,e.state,e.location,e.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=Fe({location:"",base:t,go:r,createHref:rb.bind(null,t)},e,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}let es=(function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.Group=2]="Group",t})({});var ut=(function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.ParamRegExp=2]="ParamRegExp",t[t.ParamRegExpEnd=3]="ParamRegExpEnd",t[t.EscapeNext=4]="EscapeNext",t})(ut||{});const vb={type:es.Static,value:""},Eb=/[a-zA-Z0-9_]/;function Ib(t){if(!t)return[[]];if(t==="/")return[[vb]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(_){throw new Error(`ERR (${n})/"${u}": ${_}`)}let n=ut.Static,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let c=0,l,u="",d="";function f(){u&&(n===ut.Static?i.push({type:es.Static,value:u}):n===ut.Param||n===ut.ParamRegExp||n===ut.ParamRegExpEnd?(i.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),i.push({type:es.Param,value:u,regexp:d,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),u="")}function g(){u+=l}for(;c<t.length;){if(l=t[c++],l==="\\"&&n!==ut.ParamRegExp){r=n,n=ut.EscapeNext;continue}switch(n){case ut.Static:l==="/"?(u&&f(),o()):l===":"?(f(),n=ut.Param):g();break;case ut.EscapeNext:g(),n=r;break;case ut.Param:l==="("?n=ut.ParamRegExp:Eb.test(l)?g():(f(),n=ut.Static,l!=="*"&&l!=="?"&&l!=="+"&&c--);break;case ut.ParamRegExp:l===")"?d[d.length-1]=="\\"?d=d.slice(0,-1)+l:n=ut.ParamRegExpEnd:d+=l;break;case ut.ParamRegExpEnd:f(),n=ut.Static,l!=="*"&&l!=="?"&&l!=="+"&&c--,d="";break;default:e("Unknown state");break}}return n===ut.ParamRegExp&&e(`Unfinished custom RegExp for param "${u}"`),f(),o(),s}const Hf="[^/]+?",Tb={sensitive:!1,strict:!1,start:!0,end:!0};var Lt=(function(t){return t[t._multiplier=10]="_multiplier",t[t.Root=90]="Root",t[t.Segment=40]="Segment",t[t.SubSegment=30]="SubSegment",t[t.Static=40]="Static",t[t.Dynamic=20]="Dynamic",t[t.BonusCustomRegExp=10]="BonusCustomRegExp",t[t.BonusWildcard=-50]="BonusWildcard",t[t.BonusRepeatable=-20]="BonusRepeatable",t[t.BonusOptional=-8]="BonusOptional",t[t.BonusStrict=.7000000000000001]="BonusStrict",t[t.BonusCaseSensitive=.25]="BonusCaseSensitive",t})(Lt||{});const wb=/[.+*?^${}()[\]/\\]/g;function bb(t,e){const n=Fe({},Tb,e),r=[];let s=n.start?"^":"";const i=[];for(const u of t){const d=u.length?[]:[Lt.Root];n.strict&&!u.length&&(s+="/");for(let f=0;f<u.length;f++){const g=u[f];let _=Lt.Segment+(n.sensitive?Lt.BonusCaseSensitive:0);if(g.type===es.Static)f||(s+="/"),s+=g.value.replace(wb,"\\$&"),_+=Lt.Static;else if(g.type===es.Param){const{value:R,repeatable:P,optional:k,regexp:O}=g;i.push({name:R,repeatable:P,optional:k});const V=O||Hf;if(V!==Hf){_+=Lt.BonusCustomRegExp;try{`${V}`}catch(M){throw new Error(`Invalid custom RegExp for param "${R}" (${V}): `+M.message)}}let F=P?`((?:${V})(?:/(?:${V}))*)`:`(${V})`;f||(F=k&&u.length<2?`(?:/${F})`:"/"+F),k&&(F+="?"),s+=F,_+=Lt.Dynamic,k&&(_+=Lt.BonusOptional),P&&(_+=Lt.BonusRepeatable),V===".*"&&(_+=Lt.BonusWildcard)}d.push(_)}r.push(d)}if(n.strict&&n.end){const u=r.length-1;r[u][r[u].length-1]+=Lt.BonusStrict}n.strict||(s+="/?"),n.end?s+="$":n.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function c(u){const d=u.match(o),f={};if(!d)return null;for(let g=1;g<d.length;g++){const _=d[g]||"",R=i[g-1];f[R.name]=_&&R.repeatable?_.split("/"):_}return f}function l(u){let d="",f=!1;for(const g of t){(!f||!d.endsWith("/"))&&(d+="/"),f=!1;for(const _ of g)if(_.type===es.Static)d+=_.value;else if(_.type===es.Param){const{value:R,repeatable:P,optional:k}=_,O=R in u?u[R]:"";if(hn(O)&&!P)throw new Error(`Provided param "${R}" is an array but it is not repeatable (* or + modifiers)`);const V=hn(O)?O.join("/"):O;if(!V)if(k)g.length<2&&(d.endsWith("/")?d=d.slice(0,-1):f=!0);else throw new Error(`Missing required param "${R}"`);d+=V}}return d||"/"}return{re:o,score:r,keys:i,parse:c,stringify:l}}function Ab(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===Lt.Static+Lt.Segment?-1:1:t.length>e.length?e.length===1&&e[0]===Lt.Static+Lt.Segment?1:-1:0}function k_(t,e){let n=0;const r=t.score,s=e.score;for(;n<r.length&&n<s.length;){const i=Ab(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(Bf(r))return 1;if(Bf(s))return-1}return s.length-r.length}function Bf(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const Sb={strict:!1,end:!0,sensitive:!1};function Cb(t,e,n){const r=bb(Ib(t.path),n),s=Fe(r,{record:t,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function Rb(t,e){const n=[],r=new Map;e=Of(Sb,e);function s(f){return r.get(f)}function i(f,g,_){const R=!_,P=$f(f);P.aliasOf=_&&_.record;const k=Of(e,f),O=[P];if("alias"in f){const M=typeof f.alias=="string"?[f.alias]:f.alias;for(const X of M)O.push($f(Fe({},P,{components:_?_.record.components:P.components,path:X,aliasOf:_?_.record:P})))}let V,F;for(const M of O){const{path:X}=M;if(g&&X[0]!=="/"){const se=g.record.path,S=se[se.length-1]==="/"?"":"/";M.path=g.record.path+(X&&S+X)}if(V=Cb(M,g,k),_?_.alias.push(V):(F=F||V,F!==V&&F.alias.push(V),R&&f.name&&!qf(V)&&o(f.name)),D_(V)&&l(V),P.children){const se=P.children;for(let S=0;S<se.length;S++)i(se[S],V,_&&_.children[S])}_=_||V}return F?()=>{o(F)}:Ki}function o(f){if(S_(f)){const g=r.get(f);g&&(r.delete(f),n.splice(n.indexOf(g),1),g.children.forEach(o),g.alias.forEach(o))}else{const g=n.indexOf(f);g>-1&&(n.splice(g,1),f.record.name&&r.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function c(){return n}function l(f){const g=Db(f,n);n.splice(g,0,f),f.record.name&&!qf(f)&&r.set(f.record.name,f)}function u(f,g){let _,R={},P,k;if("name"in f&&f.name){if(_=r.get(f.name),!_)throw Ks(tt.MATCHER_NOT_FOUND,{location:f});k=_.record.name,R=Fe(jf(g.params,_.keys.filter(F=>!F.optional).concat(_.parent?_.parent.keys.filter(F=>F.optional):[]).map(F=>F.name)),f.params&&jf(f.params,_.keys.map(F=>F.name))),P=_.stringify(R)}else if(f.path!=null)P=f.path,_=n.find(F=>F.re.test(P)),_&&(R=_.parse(P),k=_.record.name);else{if(_=g.name?r.get(g.name):n.find(F=>F.re.test(g.path)),!_)throw Ks(tt.MATCHER_NOT_FOUND,{location:f,currentLocation:g});k=_.record.name,R=Fe({},g.params,f.params),P=_.stringify(R)}const O=[];let V=_;for(;V;)O.unshift(V.record),V=V.parent;return{name:k,path:P,params:R,matched:O,meta:kb(O)}}t.forEach(f=>i(f));function d(){n.length=0,r.clear()}return{addRoute:i,resolve:u,removeRoute:o,clearRoutes:d,getRoutes:c,getRecordMatcher:s}}function jf(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function $f(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:Pb(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function Pb(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="object"?n[r]:n;return e}function qf(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function kb(t){return t.reduce((e,n)=>Fe(e,n.meta),{})}function Db(t,e){let n=0,r=e.length;for(;n!==r;){const i=n+r>>1;k_(t,e[i])<0?r=i:n=i+1}const s=Nb(t);return s&&(r=e.lastIndexOf(s,r-1)),r}function Nb(t){let e=t;for(;e=e.parent;)if(D_(e)&&k_(t,e)===0)return e}function D_({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function Wf(t){const e=wn(ch),n=wn(R_),r=oe(()=>{const l=nt(t.to);return e.resolve(l)}),s=oe(()=>{const{matched:l}=r.value,{length:u}=l,d=l[u-1],f=n.matched;if(!d||!f.length)return-1;const g=f.findIndex(zs.bind(null,d));if(g>-1)return g;const _=Gf(l[u-2]);return u>1&&Gf(d)===_&&f[f.length-1].path!==_?f.findIndex(zs.bind(null,l[u-2])):g}),i=oe(()=>s.value>-1&&Lb(n.params,r.value.params)),o=oe(()=>s.value>-1&&s.value===n.matched.length-1&&A_(n.params,r.value.params));function c(l={}){if(Mb(l)){const u=e[nt(t.replace)?"replace":"push"](nt(t.to)).catch(Ki);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>u),u}return Promise.resolve()}return{route:r,href:oe(()=>r.value.href),isActive:i,isExactActive:o,navigate:c}}function Ob(t){return t.length===1?t[0]:t}const Vb=At({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Wf,setup(t,{slots:e}){const n=ps(Wf(t)),{options:r}=wn(ch),s=oe(()=>({[zf(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[zf(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&Ob(e.default(n));return t.custom?i:oh("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),xb=Vb;function Mb(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function Lb(t,e){for(const n in e){const r=e[n],s=t[n];if(typeof r=="string"){if(r!==s)return!1}else if(!hn(s)||s.length!==r.length||r.some((i,o)=>i.valueOf()!==s[o].valueOf()))return!1}return!0}function Gf(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const zf=(t,e,n)=>t??e??n,Fb=At({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=wn(hu),s=oe(()=>t.route||r.value),i=wn(Ff,0),o=oe(()=>{let u=nt(i);const{matched:d}=s.value;let f;for(;(f=d[u])&&!f.components;)u++;return u}),c=oe(()=>s.value.matched[o.value]);ca(Ff,oe(()=>o.value+1)),ca(fb,c),ca(hu,s);const l=He();return bn(()=>[l.value,c.value,t.name],([u,d,f],[g,_,R])=>{d&&(d.instances[f]=u,_&&_!==d&&u&&u===g&&(d.leaveGuards.size||(d.leaveGuards=_.leaveGuards),d.updateGuards.size||(d.updateGuards=_.updateGuards))),u&&d&&(!_||!zs(d,_)||!g)&&(d.enterCallbacks[f]||[]).forEach(P=>P(u))},{flush:"post"}),()=>{const u=s.value,d=t.name,f=c.value,g=f&&f.components[d];if(!g)return Kf(n.default,{Component:g,route:u});const _=f.props[d],R=_?_===!0?u.params:typeof _=="function"?_(u):_:null,k=oh(g,Fe({},R,e,{onVnodeUnmounted:O=>{O.component.isUnmounted&&(f.instances[d]=null)},ref:l}));return Kf(n.default,{Component:k,route:u})||k}}});function Kf(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const N_=Fb;function Ub(t){const e=Rb(t.routes,t),n=t.parseQuery||hb,r=t.stringifyQuery||Lf,s=t.history,i=ki(),o=ki(),c=ki(),l=DI(hr);let u=hr;ks&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const d=wl.bind(null,x=>""+x),f=wl.bind(null,Kw),g=wl.bind(null,ho);function _(x,ee){let J,ce;return S_(x)?(J=e.getRecordMatcher(x),ce=ee):ce=x,e.addRoute(ce,J)}function R(x){const ee=e.getRecordMatcher(x);ee&&e.removeRoute(ee)}function P(){return e.getRoutes().map(x=>x.record)}function k(x){return!!e.getRecordMatcher(x)}function O(x,ee){if(ee=Fe({},ee||l.value),typeof x=="string"){const C=bl(n,x,ee.path),U=e.resolve({path:C.path},ee),B=s.createHref(C.fullPath);return Fe(C,U,{params:g(U.params),hash:ho(C.hash),redirectedFrom:void 0,href:B})}let J;if(x.path!=null)J=Fe({},x,{path:bl(n,x.path,ee.path).path});else{const C=Fe({},x.params);for(const U in C)C[U]==null&&delete C[U];J=Fe({},x,{params:f(C)}),ee.params=f(ee.params)}const ce=e.resolve(J,ee),Re=x.hash||"";ce.params=d(g(ce.params));const w=Yw(r,Fe({},x,{hash:Ww(Re),path:ce.path})),A=s.createHref(w);return Fe({fullPath:w,hash:Re,query:r===Lf?db(x.query):x.query||{}},ce,{redirectedFrom:void 0,href:A})}function V(x){return typeof x=="string"?bl(n,x,l.value.path):Fe({},x)}function F(x,ee){if(u!==x)return Ks(tt.NAVIGATION_CANCELLED,{from:ee,to:x})}function M(x){return S(x)}function X(x){return M(Fe(V(x),{replace:!0}))}function se(x,ee){const J=x.matched[x.matched.length-1];if(J&&J.redirect){const{redirect:ce}=J;let Re=typeof ce=="function"?ce(x,ee):ce;return typeof Re=="string"&&(Re=Re.includes("?")||Re.includes("#")?Re=V(Re):{path:Re},Re.params={}),Fe({query:x.query,hash:x.hash,params:Re.path!=null?{}:x.params},Re)}}function S(x,ee){const J=u=O(x),ce=l.value,Re=x.state,w=x.force,A=x.replace===!0,C=se(J,ce);if(C)return S(Fe(V(C),{state:typeof C=="object"?Fe({},Re,C.state):Re,force:w,replace:A}),ee||J);const U=J;U.redirectedFrom=ee;let B;return!w&&Xw(r,ce,J)&&(B=Ks(tt.NAVIGATION_DUPLICATED,{to:U,from:ce}),K(ce,ce,!0,!1)),(B?Promise.resolve(B):I(U,ce)).catch(L=>Mn(L)?Mn(L,tt.NAVIGATION_GUARD_REDIRECT)?L:j(L):ne(L,U,ce)).then(L=>{if(L){if(Mn(L,tt.NAVIGATION_GUARD_REDIRECT))return S(Fe({replace:A},V(L.to),{state:typeof L.to=="object"?Fe({},Re,L.to.state):Re,force:w}),ee||U)}else L=b(U,ce,!0,A,Re);return T(U,ce,L),L})}function E(x,ee){const J=F(x,ee);return J?Promise.reject(J):Promise.resolve()}function y(x){const ee=Ae.values().next().value;return ee&&typeof ee.runWithContext=="function"?ee.runWithContext(x):x()}function I(x,ee){let J;const[ce,Re,w]=pb(x,ee);J=Sl(ce.reverse(),"beforeRouteLeave",x,ee);for(const C of ce)C.leaveGuards.forEach(U=>{J.push(mr(U,x,ee))});const A=E.bind(null,x,ee);return J.push(A),Je(J).then(()=>{J=[];for(const C of i.list())J.push(mr(C,x,ee));return J.push(A),Je(J)}).then(()=>{J=Sl(Re,"beforeRouteUpdate",x,ee);for(const C of Re)C.updateGuards.forEach(U=>{J.push(mr(U,x,ee))});return J.push(A),Je(J)}).then(()=>{J=[];for(const C of w)if(C.beforeEnter)if(hn(C.beforeEnter))for(const U of C.beforeEnter)J.push(mr(U,x,ee));else J.push(mr(C.beforeEnter,x,ee));return J.push(A),Je(J)}).then(()=>(x.matched.forEach(C=>C.enterCallbacks={}),J=Sl(w,"beforeRouteEnter",x,ee,y),J.push(A),Je(J))).then(()=>{J=[];for(const C of o.list())J.push(mr(C,x,ee));return J.push(A),Je(J)}).catch(C=>Mn(C,tt.NAVIGATION_CANCELLED)?C:Promise.reject(C))}function T(x,ee,J){c.list().forEach(ce=>y(()=>ce(x,ee,J)))}function b(x,ee,J,ce,Re){const w=F(x,ee);if(w)return w;const A=ee===hr,C=ks?history.state:{};J&&(ce||A?s.replace(x.fullPath,Fe({scroll:A&&C&&C.scroll},Re)):s.push(x.fullPath,Re)),l.value=x,K(x,ee,J,A),j()}let v;function me(){v||(v=s.listen((x,ee,J)=>{if(!Qe.listening)return;const ce=O(x),Re=se(ce,Qe.currentRoute.value);if(Re){S(Fe(Re,{replace:!0,force:!0}),ce).catch(Ki);return}u=ce;const w=l.value;ks&&ob(Mf(w.fullPath,J.delta),Ac()),I(ce,w).catch(A=>Mn(A,tt.NAVIGATION_ABORTED|tt.NAVIGATION_CANCELLED)?A:Mn(A,tt.NAVIGATION_GUARD_REDIRECT)?(S(Fe(V(A.to),{force:!0}),ce).then(C=>{Mn(C,tt.NAVIGATION_ABORTED|tt.NAVIGATION_DUPLICATED)&&!J.delta&&J.type===lu.pop&&s.go(-1,!1)}).catch(Ki),Promise.reject()):(J.delta&&s.go(-J.delta,!1),ne(A,ce,w))).then(A=>{A=A||b(ce,w,!1),A&&(J.delta&&!Mn(A,tt.NAVIGATION_CANCELLED)?s.go(-J.delta,!1):J.type===lu.pop&&Mn(A,tt.NAVIGATION_ABORTED|tt.NAVIGATION_DUPLICATED)&&s.go(-1,!1)),T(ce,w,A)}).catch(Ki)}))}let Ve=ki(),Se=ki(),Q;function ne(x,ee,J){j(x);const ce=Se.list();return ce.length?ce.forEach(Re=>Re(x,ee,J)):console.error(x),Promise.reject(x)}function ie(){return Q&&l.value!==hr?Promise.resolve():new Promise((x,ee)=>{Ve.add([x,ee])})}function j(x){return Q||(Q=!x,me(),Ve.list().forEach(([ee,J])=>x?J(x):ee()),Ve.reset()),x}function K(x,ee,J,ce){const{scrollBehavior:Re}=t;if(!ks||!Re)return Promise.resolve();const w=!J&&ab(Mf(x.fullPath,0))||(ce||!J)&&history.state&&history.state.scroll||null;return Zu().then(()=>Re(x,ee,w)).then(A=>A&&ib(A)).catch(A=>ne(A,x,ee))}const Z=x=>s.go(x);let ve;const Ae=new Set,Qe={currentRoute:l,listening:!0,addRoute:_,removeRoute:R,clearRoutes:e.clearRoutes,hasRoute:k,getRoutes:P,resolve:O,options:t,push:M,replace:X,go:Z,back:()=>Z(-1),forward:()=>Z(1),beforeEach:i.add,beforeResolve:o.add,afterEach:c.add,onError:Se.add,isReady:ie,install(x){x.component("RouterLink",xb),x.component("RouterView",N_),x.config.globalProperties.$router=Qe,Object.defineProperty(x.config.globalProperties,"$route",{enumerable:!0,get:()=>nt(l)}),ks&&!ve&&l.value===hr&&(ve=!0,M(s.location).catch(ce=>{}));const ee={};for(const ce in hr)Object.defineProperty(ee,ce,{get:()=>l.value[ce],enumerable:!0});x.provide(ch,Qe),x.provide(R_,Am(ee)),x.provide(hu,l);const J=x.unmount;Ae.add(x),x.unmount=function(){Ae.delete(x),Ae.size<1&&(u=hr,v&&v(),v=null,l.value=hr,ve=!1,Q=!1),J()}}};function Je(x){return x.reduce((ee,J)=>ee.then(()=>y(J)),Promise.resolve())}return Qe}const Hb=At({__name:"App",setup(t){return(e,n)=>(ge(),Wn(nt(N_)))}}),Bb=()=>{};var Qf={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O_=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},jb=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],c=t[n++],l=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},V_={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,c=o?t[s+1]:0,l=s+2<t.length,u=l?t[s+2]:0,d=i>>2,f=(i&3)<<4|c>>4;let g=(c&15)<<2|u>>6,_=u&63;l||(_=64,o||(g=64)),r.push(n[d],n[f],n[g],n[_])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(O_(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):jb(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],c=s<t.length?n[t.charAt(s)]:0;++s;const u=s<t.length?n[t.charAt(s)]:64;++s;const f=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||c==null||u==null||f==null)throw new $b;const g=i<<2|c>>4;if(r.push(g),u!==64){const _=c<<4&240|u>>2;if(r.push(_),f!==64){const R=u<<6&192|f;r.push(R)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class $b extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const qb=function(t){const e=O_(t);return V_.encodeByteArray(e,!0)},Ma=function(t){return qb(t).replace(/\./g,"")},x_=function(t){try{return V_.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wb(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gb=()=>Wb().__FIREBASE_DEFAULTS__,zb=()=>{if(typeof process>"u"||typeof Qf>"u")return;const t=Qf.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Kb=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&x_(t[1]);return e&&JSON.parse(e)},Sc=()=>{try{return Bb()||Gb()||zb()||Kb()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},M_=t=>Sc()?.emulatorHosts?.[t],Qb=t=>{const e=M_(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},L_=()=>Sc()?.config,F_=t=>Sc()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jb{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function si(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function U_(t){return(await fetch(t,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yb(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...t};return[Ma(JSON.stringify(n)),Ma(JSON.stringify(o)),""].join(".")}const Qi={};function Xb(){const t={prod:[],emulator:[]};for(const e of Object.keys(Qi))Qi[e]?t.emulator.push(e):t.prod.push(e);return t}function Zb(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Jf=!1;function H_(t,e){if(typeof window>"u"||typeof document>"u"||!si(window.location.host)||Qi[t]===e||Qi[t]||Jf)return;Qi[t]=e;function n(g){return`__firebase__banner__${g}`}const r="__firebase__banner",i=Xb().prod.length>0;function o(){const g=document.getElementById(r);g&&g.remove()}function c(g){g.style.display="flex",g.style.background="#7faaf0",g.style.position="fixed",g.style.bottom="5px",g.style.left="5px",g.style.padding=".5em",g.style.borderRadius="5px",g.style.alignItems="center"}function l(g,_){g.setAttribute("width","24"),g.setAttribute("id",_),g.setAttribute("height","24"),g.setAttribute("viewBox","0 0 24 24"),g.setAttribute("fill","none"),g.style.marginLeft="-6px"}function u(){const g=document.createElement("span");return g.style.cursor="pointer",g.style.marginLeft="16px",g.style.fontSize="24px",g.innerHTML=" &times;",g.onclick=()=>{Jf=!0,o()},g}function d(g,_){g.setAttribute("id",_),g.innerText="Learn more",g.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",g.setAttribute("target","__blank"),g.style.paddingLeft="5px",g.style.textDecoration="underline"}function f(){const g=Zb(r),_=n("text"),R=document.getElementById(_)||document.createElement("span"),P=n("learnmore"),k=document.getElementById(P)||document.createElement("a"),O=n("preprendIcon"),V=document.getElementById(O)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(g.created){const F=g.element;c(F),d(k,P);const M=u();l(V,O),F.append(V,R,k,M),document.body.appendChild(F)}i?(R.innerText="Preview backend disconnected.",V.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(V.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,R.innerText="Preview backend running in this workspace."),R.setAttribute("id",_)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",f):f()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ot(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function eA(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ot())}function tA(){const t=Sc()?.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function nA(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function B_(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function rA(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function sA(){const t=Ot();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function iA(){return!tA()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function j_(){try{return typeof indexedDB=="object"}catch{return!1}}function $_(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}function oA(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aA="FirebaseError";class pn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=aA,Object.setPrototypeOf(this,pn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,gs.prototype.create)}}class gs{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?cA(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new pn(s,c,r)}}function cA(t,e){return t.replace(lA,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const lA=/\{\$([^}]+)}/g;function uA(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Or(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(Yf(i)&&Yf(o)){if(!Or(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Yf(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Po(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Oi(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Vi(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function hA(t,e){const n=new dA(t,e);return n.subscribe.bind(n)}class dA{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");fA(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=Cl),s.error===void 0&&(s.error=Cl),s.complete===void 0&&(s.complete=Cl);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function fA(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Cl(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pA=1e3,gA=2,mA=14400*1e3,_A=.5;function Xf(t,e=pA,n=gA){const r=e*Math.pow(n,t),s=Math.round(_A*r*(Math.random()-.5)*2);return Math.min(mA,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vt(t){return t&&t._delegate?t._delegate:t}class dn{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yA{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new Jb;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(EA(e))try{this.getOrInitializeService({instanceIdentifier:Xr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Xr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Xr){return this.instances.has(e)}getOptions(e=Xr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:vA(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Xr){return this.component?this.component.multipleInstances?e:Xr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function vA(t){return t===Xr?void 0:t}function EA(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IA{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new yA(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var De;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(De||(De={}));const TA={debug:De.DEBUG,verbose:De.VERBOSE,info:De.INFO,warn:De.WARN,error:De.ERROR,silent:De.SILENT},wA=De.INFO,bA={[De.DEBUG]:"log",[De.VERBOSE]:"log",[De.INFO]:"info",[De.WARN]:"warn",[De.ERROR]:"error"},AA=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=bA[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Cc{constructor(e){this.name=e,this._logLevel=wA,this._logHandler=AA,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in De))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?TA[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,De.DEBUG,...e),this._logHandler(this,De.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,De.VERBOSE,...e),this._logHandler(this,De.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,De.INFO,...e),this._logHandler(this,De.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,De.WARN,...e),this._logHandler(this,De.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,De.ERROR,...e),this._logHandler(this,De.ERROR,...e)}}const SA=(t,e)=>e.some(n=>t instanceof n);let Zf,ep;function CA(){return Zf||(Zf=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function RA(){return ep||(ep=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const q_=new WeakMap,du=new WeakMap,W_=new WeakMap,Rl=new WeakMap,lh=new WeakMap;function PA(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(br(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&q_.set(n,t)}).catch(()=>{}),lh.set(e,t),e}function kA(t){if(du.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});du.set(t,e)}let fu={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return du.get(t);if(e==="objectStoreNames")return t.objectStoreNames||W_.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return br(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function DA(t){fu=t(fu)}function NA(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Pl(this),e,...n);return W_.set(r,e.sort?e.sort():[e]),br(r)}:RA().includes(t)?function(...e){return t.apply(Pl(this),e),br(q_.get(this))}:function(...e){return br(t.apply(Pl(this),e))}}function OA(t){return typeof t=="function"?NA(t):(t instanceof IDBTransaction&&kA(t),SA(t,CA())?new Proxy(t,fu):t)}function br(t){if(t instanceof IDBRequest)return PA(t);if(Rl.has(t))return Rl.get(t);const e=OA(t);return e!==t&&(Rl.set(t,e),lh.set(e,t)),e}const Pl=t=>lh.get(t);function G_(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),c=br(o);return r&&o.addEventListener("upgradeneeded",l=>{r(br(o.result),l.oldVersion,l.newVersion,br(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",u=>s(u.oldVersion,u.newVersion,u))}).catch(()=>{}),c}const VA=["get","getKey","getAll","getAllKeys","count"],xA=["put","add","delete","clear"],kl=new Map;function tp(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(kl.get(e))return kl.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=xA.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||VA.includes(n)))return;const i=async function(o,...c){const l=this.transaction(o,s?"readwrite":"readonly");let u=l.store;return r&&(u=u.index(c.shift())),(await Promise.all([u[n](...c),s&&l.done]))[0]};return kl.set(e,i),i}DA(t=>({...t,get:(e,n,r)=>tp(e,n)||t.get(e,n,r),has:(e,n)=>!!tp(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MA{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(LA(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function LA(t){return t.getComponent()?.type==="VERSION"}const pu="@firebase/app",np="0.14.6";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xn=new Cc("@firebase/app"),FA="@firebase/app-compat",UA="@firebase/analytics-compat",HA="@firebase/analytics",BA="@firebase/app-check-compat",jA="@firebase/app-check",$A="@firebase/auth",qA="@firebase/auth-compat",WA="@firebase/database",GA="@firebase/data-connect",zA="@firebase/database-compat",KA="@firebase/functions",QA="@firebase/functions-compat",JA="@firebase/installations",YA="@firebase/installations-compat",XA="@firebase/messaging",ZA="@firebase/messaging-compat",eS="@firebase/performance",tS="@firebase/performance-compat",nS="@firebase/remote-config",rS="@firebase/remote-config-compat",sS="@firebase/storage",iS="@firebase/storage-compat",oS="@firebase/firestore",aS="@firebase/ai",cS="@firebase/firestore-compat",lS="firebase",uS="12.6.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gu="[DEFAULT]",hS={[pu]:"fire-core",[FA]:"fire-core-compat",[HA]:"fire-analytics",[UA]:"fire-analytics-compat",[jA]:"fire-app-check",[BA]:"fire-app-check-compat",[$A]:"fire-auth",[qA]:"fire-auth-compat",[WA]:"fire-rtdb",[GA]:"fire-data-connect",[zA]:"fire-rtdb-compat",[KA]:"fire-fn",[QA]:"fire-fn-compat",[JA]:"fire-iid",[YA]:"fire-iid-compat",[XA]:"fire-fcm",[ZA]:"fire-fcm-compat",[eS]:"fire-perf",[tS]:"fire-perf-compat",[nS]:"fire-rc",[rS]:"fire-rc-compat",[sS]:"fire-gcs",[iS]:"fire-gcs-compat",[oS]:"fire-fst",[cS]:"fire-fst-compat",[aS]:"fire-vertex","fire-js":"fire-js",[lS]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const La=new Map,dS=new Map,mu=new Map;function rp(t,e){try{t.container.addComponent(e)}catch(n){Xn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Dn(t){const e=t.name;if(mu.has(e))return Xn.debug(`There were multiple attempts to register component ${e}.`),!1;mu.set(e,t);for(const n of La.values())rp(n,t);for(const n of dS.values())rp(n,t);return!0}function ms(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function sn(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fS={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ar=new gs("app","Firebase",fS);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pS{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new dn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ar.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ii=uS;function z_(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:gu,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Ar.create("bad-app-name",{appName:String(s)});if(n||(n=L_()),!n)throw Ar.create("no-options");const i=La.get(s);if(i){if(Or(n,i.options)&&Or(r,i.config))return i;throw Ar.create("duplicate-app",{appName:s})}const o=new IA(s);for(const l of mu.values())o.addComponent(l);const c=new pS(n,r,o);return La.set(s,c),c}function uh(t=gu){const e=La.get(t);if(!e&&t===gu&&L_())return z_();if(!e)throw Ar.create("no-app",{appName:t});return e}function nn(t,e,n){let r=hS[t]??t;n&&(r+=`-${n}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Xn.warn(o.join(" "));return}Dn(new dn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gS="firebase-heartbeat-database",mS=1,fo="firebase-heartbeat-store";let Dl=null;function K_(){return Dl||(Dl=G_(gS,mS,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(fo)}catch(n){console.warn(n)}}}}).catch(t=>{throw Ar.create("idb-open",{originalErrorMessage:t.message})})),Dl}async function _S(t){try{const n=(await K_()).transaction(fo),r=await n.objectStore(fo).get(Q_(t));return await n.done,r}catch(e){if(e instanceof pn)Xn.warn(e.message);else{const n=Ar.create("idb-get",{originalErrorMessage:e?.message});Xn.warn(n.message)}}}async function sp(t,e){try{const r=(await K_()).transaction(fo,"readwrite");await r.objectStore(fo).put(e,Q_(t)),await r.done}catch(n){if(n instanceof pn)Xn.warn(n.message);else{const r=Ar.create("idb-set",{originalErrorMessage:n?.message});Xn.warn(r.message)}}}function Q_(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yS=1024,vS=30;class ES{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new TS(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=ip();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>vS){const s=wS(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Xn.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=ip(),{heartbeatsToSend:n,unsentEntries:r}=IS(this._heartbeatsCache.heartbeats),s=Ma(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Xn.warn(e),""}}}function ip(){return new Date().toISOString().substring(0,10)}function IS(t,e=yS){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),op(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),op(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class TS{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return j_()?$_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await _S(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return sp(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return sp(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function op(t){return Ma(JSON.stringify({version:2,heartbeats:t})).length}function wS(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bS(t){Dn(new dn("platform-logger",e=>new MA(e),"PRIVATE")),Dn(new dn("heartbeat",e=>new ES(e),"PRIVATE")),nn(pu,np,t),nn(pu,np,"esm2020"),nn("fire-js","")}bS("");function J_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const AS=J_,Y_=new gs("auth","Firebase",J_());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fa=new Cc("@firebase/auth");function SS(t,...e){Fa.logLevel<=De.WARN&&Fa.warn(`Auth (${ii}): ${t}`,...e)}function ha(t,...e){Fa.logLevel<=De.ERROR&&Fa.error(`Auth (${ii}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fn(t,...e){throw hh(t,...e)}function An(t,...e){return hh(t,...e)}function X_(t,e,n){const r={...AS(),[e]:n};return new gs("auth","Firebase",r).create(e,{appName:t.name})}function Sr(t){return X_(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function hh(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Y_.create(t,...e)}function ue(t,e,...n){if(!t)throw hh(e,...n)}function jn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw ha(e),new Error(e)}function Zn(t,e){t||jn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ua(){return typeof self<"u"&&self.location?.href||""}function CS(){return ap()==="http:"||ap()==="https:"}function ap(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RS(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(CS()||B_()||"connection"in navigator)?navigator.onLine:!0}function PS(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(e,n){this.shortDelay=e,this.longDelay=n,Zn(n>e,"Short delay should be less than long delay!"),this.isMobile=eA()||rA()}get(){return RS()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dh(t,e){Zn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z_{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;jn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;jn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;jn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kS={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DS=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],NS=new ko(3e4,6e4);function Br(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function rr(t,e,n,r,s={}){return ey(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=Po({key:t.config.apiKey,...o}).slice(1),l=await t._getAdditionalHeaders();l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode);const u={method:e,headers:l,...i};return nA()||(u.referrerPolicy="no-referrer"),t.emulatorConfig&&si(t.emulatorConfig.host)&&(u.credentials="include"),Z_.fetch()(await ty(t,t.config.apiHost,n,c),u)})}async function ey(t,e,n){t._canInitEmulator=!1;const r={...kS,...e};try{const s=new VS(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw ea(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[l,u]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw ea(t,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw ea(t,"email-already-in-use",o);if(l==="USER_DISABLED")throw ea(t,"user-disabled",o);const d=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw X_(t,d,u);fn(t,d)}}catch(s){if(s instanceof pn)throw s;fn(t,"network-request-failed",{message:String(s)})}}async function Rc(t,e,n,r,s={}){const i=await rr(t,e,n,r,s);return"mfaPendingCredential"in i&&fn(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function ty(t,e,n,r){const s=`${e}${n}?${r}`,i=t,o=i.config.emulator?dh(t.config,s):`${t.config.apiScheme}://${s}`;return DS.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function OS(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class VS{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(An(this.auth,"network-request-failed")),NS.get())})}}function ea(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=An(t,e,r);return s.customData._tokenResponse=n,s}function cp(t){return t!==void 0&&t.enterprise!==void 0}class xS{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return OS(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function MS(t,e){return rr(t,"GET","/v2/recaptchaConfig",Br(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LS(t,e){return rr(t,"POST","/v1/accounts:delete",e)}async function Ha(t,e){return rr(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ji(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function FS(t,e=!1){const n=Vt(t),r=await n.getIdToken(e),s=Pc(r);ue(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:Ji(Nl(s.auth_time)),issuedAtTime:Ji(Nl(s.iat)),expirationTime:Ji(Nl(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Nl(t){return Number(t)*1e3}function Pc(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return ha("JWT malformed, contained fewer than 3 sections"),null;try{const s=x_(n);return s?JSON.parse(s):(ha("Failed to decode base64 JWT payload"),null)}catch(s){return ha("Caught error parsing JWT payload as JSON",s?.toString()),null}}function lp(t){const e=Pc(t);return ue(e,"internal-error"),ue(typeof e.exp<"u","internal-error"),ue(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function po(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof pn&&US(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function US({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HS{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ji(this.lastLoginAt),this.creationTime=Ji(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ba(t){const e=t.auth,n=await t.getIdToken(),r=await po(t,Ha(e,{idToken:n}));ue(r?.users.length,e,"internal-error");const s=r.users[0];t._notifyReloadListener(s);const i=s.providerUserInfo?.length?ny(s.providerUserInfo):[],o=jS(t.providerData,i),c=t.isAnonymous,l=!(t.email&&s.passwordHash)&&!o?.length,u=c?l:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new _u(s.createdAt,s.lastLoginAt),isAnonymous:u};Object.assign(t,d)}async function BS(t){const e=Vt(t);await Ba(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function jS(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function ny(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $S(t,e){const n=await ey(t,{},async()=>{const r=Po({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=await ty(t,s,"/v1/token",`key=${i}`),c=await t._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return t.emulatorConfig&&si(t.emulatorConfig.host)&&(l.credentials="include"),Z_.fetch()(o,l)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function qS(t,e){return rr(t,"POST","/v2/accounts:revokeToken",Br(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ue(e.idToken,"internal-error"),ue(typeof e.idToken<"u","internal-error"),ue(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):lp(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){ue(e.length!==0,"internal-error");const n=lp(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(ue(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await $S(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new Hs;return r&&(ue(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(ue(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(ue(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Hs,this.toJSON())}_performRefresh(){return jn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dr(t,e){ue(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class an{constructor({uid:e,auth:n,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new HS(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new _u(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await po(this,this.stsTokenManager.getToken(this.auth,e));return ue(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return FS(this,e)}reload(){return BS(this)}_assign(e){this!==e&&(ue(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new an({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){ue(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Ba(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(sn(this.auth.app))return Promise.reject(Sr(this.auth));const e=await this.getIdToken();return await po(this,LS(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,s=n.email??void 0,i=n.phoneNumber??void 0,o=n.photoURL??void 0,c=n.tenantId??void 0,l=n._redirectEventId??void 0,u=n.createdAt??void 0,d=n.lastLoginAt??void 0,{uid:f,emailVerified:g,isAnonymous:_,providerData:R,stsTokenManager:P}=n;ue(f&&P,e,"internal-error");const k=Hs.fromJSON(this.name,P);ue(typeof f=="string",e,"internal-error"),dr(r,e.name),dr(s,e.name),ue(typeof g=="boolean",e,"internal-error"),ue(typeof _=="boolean",e,"internal-error"),dr(i,e.name),dr(o,e.name),dr(c,e.name),dr(l,e.name),dr(u,e.name),dr(d,e.name);const O=new an({uid:f,auth:e,email:s,emailVerified:g,displayName:r,isAnonymous:_,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:k,createdAt:u,lastLoginAt:d});return R&&Array.isArray(R)&&(O.providerData=R.map(V=>({...V}))),l&&(O._redirectEventId=l),O}static async _fromIdTokenResponse(e,n,r=!1){const s=new Hs;s.updateFromServerResponse(n);const i=new an({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ba(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];ue(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?ny(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,c=new Hs;c.updateFromIdToken(r);const l=new an({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new _u(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(l,u),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const up=new Map;function $n(t){Zn(t instanceof Function,"Expected a class definition");let e=up.get(t);return e?(Zn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,up.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ry{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}ry.type="NONE";const hp=ry;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function da(t,e,n){return`firebase:${t}:${e}:${n}`}class Bs{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=da(this.userKey,s.apiKey,i),this.fullPersistenceKey=da("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Ha(this.auth,{idToken:e}).catch(()=>{});return n?an._fromGetAccountInfoResponse(this.auth,n,e):null}return an._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Bs($n(hp),e,r);const s=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let i=s[0]||$n(hp);const o=da(r,e.config.apiKey,e.name);let c=null;for(const u of n)try{const d=await u._get(o);if(d){let f;if(typeof d=="string"){const g=await Ha(e,{idToken:d}).catch(()=>{});if(!g)break;f=await an._fromGetAccountInfoResponse(e,g,d)}else f=an._fromJSON(e,d);u!==i&&(c=f),i=u;break}}catch{}const l=s.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new Bs(i,e,r):(i=l[0],c&&await i._set(o,c.toJSON()),await Promise.all(n.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new Bs(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dp(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ay(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(sy(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ly(e))return"Blackberry";if(uy(e))return"Webos";if(iy(e))return"Safari";if((e.includes("chrome/")||oy(e))&&!e.includes("edge/"))return"Chrome";if(cy(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if(r?.length===2)return r[1]}return"Other"}function sy(t=Ot()){return/firefox\//i.test(t)}function iy(t=Ot()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function oy(t=Ot()){return/crios\//i.test(t)}function ay(t=Ot()){return/iemobile/i.test(t)}function cy(t=Ot()){return/android/i.test(t)}function ly(t=Ot()){return/blackberry/i.test(t)}function uy(t=Ot()){return/webos/i.test(t)}function fh(t=Ot()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function WS(t=Ot()){return fh(t)&&!!window.navigator?.standalone}function GS(){return sA()&&document.documentMode===10}function hy(t=Ot()){return fh(t)||cy(t)||uy(t)||ly(t)||/windows phone/i.test(t)||ay(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dy(t,e=[]){let n;switch(t){case"Browser":n=dp(Ot());break;case"Worker":n=`${dp(Ot())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ii}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zS{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,c)=>{try{const l=e(i);o(l)}catch(l){c(l)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function KS(t,e={}){return rr(t,"GET","/v2/passwordPolicy",Br(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QS=6;class JS{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??QS,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YS{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new fp(this),this.idTokenSubscription=new fp(this),this.beforeStateQueue=new zS(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Y_,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=$n(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Bs.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Ha(this,{idToken:e}),r=await an._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(sn(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===o)&&c?.user&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return ue(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Ba(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=PS()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(sn(this.app))return Promise.reject(Sr(this));const n=e?Vt(e):null;return n&&ue(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&ue(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return sn(this.app)?Promise.reject(Sr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return sn(this.app)?Promise.reject(Sr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence($n(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await KS(this),n=new JS(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new gs("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await qS(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&$n(e)||this._popupRedirectResolver;ue(n,this,"argument-error"),this.redirectPersistenceManager=await Bs.create(this,[$n(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(ue(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const l=e.addObserver(n,r,s);return()=>{o=!0,l()}}else{const l=e.addObserver(n);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ue(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=dy(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(sn(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&SS(`Error while retrieving App Check token: ${e.error}`),e?.token}}function oi(t){return Vt(t)}class fp{constructor(e){this.auth=e,this.observer=null,this.addObserver=hA(n=>this.observer=n)}get next(){return ue(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let kc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function XS(t){kc=t}function fy(t){return kc.loadJS(t)}function ZS(){return kc.recaptchaEnterpriseScript}function eC(){return kc.gapiScript}function tC(t){return`__${t}${Math.floor(Math.random()*1e6)}`}class nC{constructor(){this.enterprise=new rC}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class rC{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const sC="recaptcha-enterprise",py="NO_RECAPTCHA";class iC{constructor(e){this.type=sC,this.auth=oi(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{MS(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const u=new xS(l);return i.tenantId==null?i._agentRecaptchaConfig=u:i._tenantRecaptchaConfigs[i.tenantId]=u,o(u.siteKey)}}).catch(l=>{c(l)})})}function s(i,o,c){const l=window.grecaptcha;cp(l)?l.enterprise.ready(()=>{l.enterprise.execute(i,{action:e}).then(u=>{o(u)}).catch(()=>{o(py)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new nC().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(c=>{if(!n&&cp(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=ZS();l.length!==0&&(l+=c),fy(l).then(()=>{s(c,i,o)}).catch(u=>{o(u)})}}).catch(c=>{o(c)})})}}async function pp(t,e,n,r=!1,s=!1){const i=new iC(t);let o;if(s)o=py;else try{o=await i.verify(n)}catch{o=await i.verify(n,!0)}const c={...e};if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const l=c.phoneEnrollmentInfo.phoneNumber,u=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function yu(t,e,n,r,s){if(t._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await pp(t,e,n,n==="getOobCode");return r(t,i)}else return r(t,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await pp(t,e,n,n==="getOobCode");return r(t,o)}else return Promise.reject(i)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oC(t,e){const n=ms(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Or(i,e??{}))return s;fn(s,"already-initialized")}return n.initialize({options:e})}function aC(t,e){const n=e?.persistence||[],r=(Array.isArray(n)?n:[n]).map($n);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e?.popupRedirectResolver)}function cC(t,e,n){const r=oi(t);ue(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=gy(e),{host:o,port:c}=lC(e),l=c===null?"":`:${c}`,u={url:`${i}//${o}${l}/`},d=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){ue(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),ue(Or(u,r.config.emulator)&&Or(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=u,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,si(o)?(U_(`${i}//${o}${l}`),H_("Auth",!0)):uC()}function gy(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function lC(t){const e=gy(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:gp(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:gp(o)}}}function gp(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function uC(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ph{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return jn("not implemented")}_getIdTokenResponse(e){return jn("not implemented")}_linkToIdToken(e,n){return jn("not implemented")}_getReauthenticationResolver(e){return jn("not implemented")}}async function hC(t,e){return rr(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dC(t,e){return Rc(t,"POST","/v1/accounts:signInWithPassword",Br(t,e))}async function fC(t,e){return rr(t,"POST","/v1/accounts:sendOobCode",Br(t,e))}async function pC(t,e){return fC(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gC(t,e){return Rc(t,"POST","/v1/accounts:signInWithEmailLink",Br(t,e))}async function mC(t,e){return Rc(t,"POST","/v1/accounts:signInWithEmailLink",Br(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go extends ph{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new go(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new go(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n?.email&&n?.password){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return yu(e,n,"signInWithPassword",dC);case"emailLink":return gC(e,{email:this._email,oobCode:this._password});default:fn(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return yu(e,r,"signUpPassword",hC);case"emailLink":return mC(e,{idToken:n,email:this._email,oobCode:this._password});default:fn(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function js(t,e){return Rc(t,"POST","/v1/accounts:signInWithIdp",Br(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _C="http://localhost";class cs extends ph{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new cs(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):fn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=n;if(!r||!s)return null;const o=new cs(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return js(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,js(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,js(e,n)}buildRequest(){const e={requestUri:_C,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Po(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yC(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function vC(t){const e=Oi(Vi(t)).link,n=e?Oi(Vi(e)).deep_link_id:null,r=Oi(Vi(t)).deep_link_id;return(r?Oi(Vi(r)).link:null)||r||n||e||t}class Dc{constructor(e){const n=Oi(Vi(e)),r=n.apiKey??null,s=n.oobCode??null,i=yC(n.mode??null);ue(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=n.continueUrl??null,this.languageCode=n.lang??null,this.tenantId=n.tenantId??null}static parseLink(e){const n=vC(e);try{return new Dc(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai{constructor(){this.providerId=ai.PROVIDER_ID}static credential(e,n){return go._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Dc.parseLink(n);return ue(r,"argument-error"),go._fromEmailAndCode(e,r.code,r.tenantId)}}ai.PROVIDER_ID="password";ai.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ai.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class my{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do extends my{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r extends Do{constructor(){super("facebook.com")}static credential(e){return cs._fromParams({providerId:_r.PROVIDER_ID,signInMethod:_r.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return _r.credentialFromTaggedObject(e)}static credentialFromError(e){return _r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return _r.credential(e.oauthAccessToken)}catch{return null}}}_r.FACEBOOK_SIGN_IN_METHOD="facebook.com";_r.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr extends Do{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return cs._fromParams({providerId:yr.PROVIDER_ID,signInMethod:yr.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return yr.credentialFromTaggedObject(e)}static credentialFromError(e){return yr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return yr.credential(n,r)}catch{return null}}}yr.GOOGLE_SIGN_IN_METHOD="google.com";yr.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr extends Do{constructor(){super("github.com")}static credential(e){return cs._fromParams({providerId:vr.PROVIDER_ID,signInMethod:vr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return vr.credentialFromTaggedObject(e)}static credentialFromError(e){return vr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return vr.credential(e.oauthAccessToken)}catch{return null}}}vr.GITHUB_SIGN_IN_METHOD="github.com";vr.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er extends Do{constructor(){super("twitter.com")}static credential(e,n){return cs._fromParams({providerId:Er.PROVIDER_ID,signInMethod:Er.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Er.credentialFromTaggedObject(e)}static credentialFromError(e){return Er.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Er.credential(n,r)}catch{return null}}}Er.TWITTER_SIGN_IN_METHOD="twitter.com";Er.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await an._fromIdTokenResponse(e,r,s),o=mp(r);return new Qs({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=mp(r);return new Qs({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function mp(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja extends pn{constructor(e,n,r,s){super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,ja.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new ja(e,n,r,s)}}function _y(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ja._fromErrorAndOperation(t,i,e,r):i})}async function EC(t,e,n=!1){const r=await po(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Qs._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function IC(t,e,n=!1){const{auth:r}=t;if(sn(r.app))return Promise.reject(Sr(r));const s="reauthenticate";try{const i=await po(t,_y(r,s,e,t),n);ue(i.idToken,r,"internal-error");const o=Pc(i.idToken);ue(o,r,"internal-error");const{sub:c}=o;return ue(t.uid===c,r,"user-mismatch"),Qs._forOperation(t,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&fn(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yy(t,e,n=!1){if(sn(t.app))return Promise.reject(Sr(t));const r="signIn",s=await _y(t,r,e),i=await Qs._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function TC(t,e){return yy(oi(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wC(t,e,n){ue(n.url?.length>0,t,"invalid-continue-uri"),ue(typeof n.dynamicLinkDomain>"u"||n.dynamicLinkDomain.length>0,t,"invalid-dynamic-link-domain"),ue(typeof n.linkDomain>"u"||n.linkDomain.length>0,t,"invalid-hosting-link-domain"),e.continueUrl=n.url,e.dynamicLinkDomain=n.dynamicLinkDomain,e.linkDomain=n.linkDomain,e.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(ue(n.iOS.bundleId.length>0,t,"missing-ios-bundle-id"),e.iOSBundleId=n.iOS.bundleId),n.android&&(ue(n.android.packageName.length>0,t,"missing-android-pkg-name"),e.androidInstallApp=n.android.installApp,e.androidMinimumVersionCode=n.android.minimumVersion,e.androidPackageName=n.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bC(t,e,n){const r=oi(t),s={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function i(o,c){ue(c.handleCodeInApp,r,"argument-error"),c&&wC(r,o,c)}i(s,n),await yu(r,s,"getOobCode",pC)}function AC(t,e){return Dc.parseLink(e)?.operation==="EMAIL_SIGNIN"}async function SC(t,e,n){if(sn(t.app))return Promise.reject(Sr(t));const r=Vt(t),s=ai.credentialWithLink(e,n||Ua());return ue(s._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),TC(r,s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CC(t){if(!t)return null;const{providerId:e}=t,n=t.rawUserInfo?JSON.parse(t.rawUserInfo):{},r=t.isNewUser||t.kind==="identitytoolkit#SignupNewUserResponse";if(!e&&t?.idToken){const s=Pc(t.idToken)?.firebase?.sign_in_provider;if(s){const i=s!=="anonymous"&&s!=="custom"?s:null;return new $s(r,i)}}if(!e)return null;switch(e){case"facebook.com":return new RC(r,n);case"github.com":return new PC(r,n);case"google.com":return new kC(r,n);case"twitter.com":return new DC(r,n,t.screenName||null);case"custom":case"anonymous":return new $s(r,null);default:return new $s(r,e,n)}}class $s{constructor(e,n,r={}){this.isNewUser=e,this.providerId=n,this.profile=r}}class vy extends $s{constructor(e,n,r,s){super(e,n,r),this.username=s}}class RC extends $s{constructor(e,n){super(e,"facebook.com",n)}}class PC extends vy{constructor(e,n){super(e,"github.com",n,typeof n?.login=="string"?n?.login:null)}}class kC extends $s{constructor(e,n){super(e,"google.com",n)}}class DC extends vy{constructor(e,n,r){super(e,"twitter.com",n,r)}}function NC(t){const{user:e,_tokenResponse:n}=t;return e.isAnonymous&&!n?{providerId:null,isNewUser:!1,profile:null}:CC(n)}function OC(t,e,n,r){return Vt(t).onIdTokenChanged(e,n,r)}function VC(t,e,n){return Vt(t).beforeAuthStateChanged(e,n)}function Ey(t,e,n,r){return Vt(t).onAuthStateChanged(e,n,r)}function xC(t){return Vt(t).signOut()}const $a="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iy{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem($a,"1"),this.storage.removeItem($a),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MC=1e3,LC=10;class Ty extends Iy{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=hy(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);GS()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,LC):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},MC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ty.type="LOCAL";const FC=Ty;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wy extends Iy{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}wy.type="SESSION";const by=wy;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function UC(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Nc(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async u=>u(n.origin,i)),l=await UC(c);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Nc.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gh(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HC{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,l)=>{const u=gh("",20);s.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(f){const g=f;if(g.data.eventId===u)switch(g.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(d),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sn(){return window}function BC(t){Sn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ay(){return typeof Sn().WorkerGlobalScope<"u"&&typeof Sn().importScripts=="function"}async function jC(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function $C(){return navigator?.serviceWorker?.controller||null}function qC(){return Ay()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sy="firebaseLocalStorageDb",WC=1,qa="firebaseLocalStorage",Cy="fbase_key";class No{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Oc(t,e){return t.transaction([qa],e?"readwrite":"readonly").objectStore(qa)}function GC(){const t=indexedDB.deleteDatabase(Sy);return new No(t).toPromise()}function vu(){const t=indexedDB.open(Sy,WC);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(qa,{keyPath:Cy})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(qa)?e(r):(r.close(),await GC(),e(await vu()))})})}async function _p(t,e,n){const r=Oc(t,!0).put({[Cy]:e,value:n});return new No(r).toPromise()}async function zC(t,e){const n=Oc(t,!1).get(e),r=await new No(n).toPromise();return r===void 0?null:r.value}function yp(t,e){const n=Oc(t,!0).delete(e);return new No(n).toPromise()}const KC=800,QC=3;class Ry{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await vu(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>QC)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Ay()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Nc._getInstance(qC()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await jC(),!this.activeServiceWorker)return;this.sender=new HC(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||$C()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await vu();return await _p(e,$a,"1"),await yp(e,$a),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>_p(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>zC(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>yp(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Oc(s,!1).getAll();return new No(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),KC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ry.type="LOCAL";const JC=Ry;new ko(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YC(t,e){return e?$n(e):(ue(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mh extends ph{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return js(e,this._buildIdpRequest())}_linkToIdToken(e,n){return js(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return js(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function XC(t){return yy(t.auth,new mh(t),t.bypassAuthState)}function ZC(t){const{auth:e,user:n}=t;return ue(n,e,"internal-error"),IC(n,new mh(t),t.bypassAuthState)}async function eR(t){const{auth:e,user:n}=t;return ue(n,e,"internal-error"),EC(n,new mh(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Py{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return XC;case"linkViaPopup":case"linkViaRedirect":return eR;case"reauthViaPopup":case"reauthViaRedirect":return ZC;default:fn(this.auth,"internal-error")}}resolve(e){Zn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Zn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tR=new ko(2e3,1e4);class xs extends Py{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,xs.currentPopupAction&&xs.currentPopupAction.cancel(),xs.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ue(e,this.auth,"internal-error"),e}async onExecution(){Zn(this.filter.length===1,"Popup operations only handle one event");const e=gh();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(An(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(An(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,xs.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(An(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,tR.get())};e()}}xs.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nR="pendingRedirect",fa=new Map;class rR extends Py{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=fa.get(this.auth._key());if(!e){try{const r=await sR(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}fa.set(this.auth._key(),e)}return this.bypassAuthState||fa.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function sR(t,e){const n=aR(e),r=oR(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function iR(t,e){fa.set(t._key(),e)}function oR(t){return $n(t._redirectPersistence)}function aR(t){return da(nR,t.config.apiKey,t.name)}async function cR(t,e,n=!1){if(sn(t.app))return Promise.reject(Sr(t));const r=oi(t),s=YC(r,e),o=await new rR(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lR=600*1e3;class uR{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!hR(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!ky(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";n.onError(An(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=lR&&this.cachedEventUids.clear(),this.cachedEventUids.has(vp(e))}saveEventToCache(e){this.cachedEventUids.add(vp(e)),this.lastProcessedEventTime=Date.now()}}function vp(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function ky({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function hR(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ky(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dR(t,e={}){return rr(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fR=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,pR=/^https?/;async function gR(t){if(t.config.emulator)return;const{authorizedDomains:e}=await dR(t);for(const n of e)try{if(mR(n))return}catch{}fn(t,"unauthorized-domain")}function mR(t){const e=Ua(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!pR.test(n))return!1;if(fR.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _R=new ko(3e4,6e4);function Ep(){const t=Sn().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function yR(t){return new Promise((e,n)=>{function r(){Ep(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ep(),n(An(t,"network-request-failed"))},timeout:_R.get()})}if(Sn().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(Sn().gapi?.load)r();else{const s=tC("iframefcb");return Sn()[s]=()=>{gapi.load?r():n(An(t,"network-request-failed"))},fy(`${eC()}?onload=${s}`).catch(i=>n(i))}}).catch(e=>{throw pa=null,e})}let pa=null;function vR(t){return pa=pa||yR(t),pa}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ER=new ko(5e3,15e3),IR="__/auth/iframe",TR="emulator/auth/iframe",wR={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},bR=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function AR(t){const e=t.config;ue(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?dh(e,TR):`https://${t.config.authDomain}/${IR}`,r={apiKey:e.apiKey,appName:t.name,v:ii},s=bR.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${Po(r).slice(1)}`}async function SR(t){const e=await vR(t),n=Sn().gapi;return ue(n,t,"internal-error"),e.open({where:document.body,url:AR(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:wR,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=An(t,"network-request-failed"),c=Sn().setTimeout(()=>{i(o)},ER.get());function l(){Sn().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CR={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},RR=500,PR=600,kR="_blank",DR="http://localhost";class Ip{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function NR(t,e,n,r=RR,s=PR){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l={...CR,width:r.toString(),height:s.toString(),top:i,left:o},u=Ot().toLowerCase();n&&(c=oy(u)?kR:n),sy(u)&&(e=e||DR,l.scrollbars="yes");const d=Object.entries(l).reduce((g,[_,R])=>`${g}${_}=${R},`,"");if(WS(u)&&c!=="_self")return OR(e||"",c),new Ip(null);const f=window.open(e||"",c,d);ue(f,t,"popup-blocked");try{f.focus()}catch{}return new Ip(f)}function OR(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VR="__/auth/handler",xR="emulator/auth/handler",MR=encodeURIComponent("fac");async function Tp(t,e,n,r,s,i){ue(t.config.authDomain,t,"auth-domain-config-required"),ue(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:ii,eventId:s};if(e instanceof my){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",uA(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,f]of Object.entries({}))o[d]=f}if(e instanceof Do){const d=e.getScopes().filter(f=>f!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const c=o;for(const d of Object.keys(c))c[d]===void 0&&delete c[d];const l=await t._getAppCheckToken(),u=l?`#${MR}=${encodeURIComponent(l)}`:"";return`${LR(t)}?${Po(c).slice(1)}${u}`}function LR({config:t}){return t.emulator?dh(t,xR):`https://${t.authDomain}/${VR}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ol="webStorageSupport";class FR{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=by,this._completeRedirectFn=cR,this._overrideRedirectResult=iR}async _openPopup(e,n,r,s){Zn(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await Tp(e,n,r,Ua(),s);return NR(e,i,gh())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await Tp(e,n,r,Ua(),s);return BC(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(Zn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await SR(e),r=new uR(e);return n.register("authEvent",s=>(ue(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Ol,{type:Ol},s=>{const i=s?.[0]?.[Ol];i!==void 0&&n(!!i),fn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=gR(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return hy()||iy()||fh()}}const UR=FR;var wp="@firebase/auth",bp="1.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HR{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){ue(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BR(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function jR(t){Dn(new dn("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;ue(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:c,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:dy(t)},u=new YS(r,s,i,l);return aC(u,n),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Dn(new dn("auth-internal",e=>{const n=oi(e.getProvider("auth").getImmediate());return(r=>new HR(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),nn(wp,bp,BR(t)),nn(wp,bp,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $R=300,qR=F_("authIdTokenMaxAge")||$R;let Ap=null;const WR=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>qR)return;const s=n?.token;Ap!==s&&(Ap=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Wa(t=uh()){const e=ms(t,"auth");if(e.isInitialized())return e.getImmediate();const n=oC(t,{popupRedirectResolver:UR,persistence:[JC,FC,by]}),r=F_("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=WR(i.toString());VC(n,o,()=>o(n.currentUser)),OC(n,c=>o(c))}}const s=M_("auth");return s&&cC(n,`http://${s}`),n}function GR(){return document.getElementsByTagName("head")?.[0]??document}XS({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=An("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",GR().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});jR("Browser");var zR="firebase",KR="12.7.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */nn(zR,KR,"app");const Dy="@firebase/installations",_h="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ny=1e4,Oy=`w:${_h}`,Vy="FIS_v2",QR="https://firebaseinstallations.googleapis.com/v1",JR=3600*1e3,YR="installations",XR="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZR={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},ls=new gs(YR,XR,ZR);function xy(t){return t instanceof pn&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function My({projectId:t}){return`${QR}/projects/${t}/installations`}function Ly(t){return{token:t.token,requestStatus:2,expiresIn:t0(t.expiresIn),creationTime:Date.now()}}async function Fy(t,e){const r=(await e.json()).error;return ls.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Uy({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function e0(t,{refreshToken:e}){const n=Uy(t);return n.append("Authorization",n0(e)),n}async function Hy(t){const e=await t();return e.status>=500&&e.status<600?t():e}function t0(t){return Number(t.replace("s","000"))}function n0(t){return`${Vy} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function r0({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=My(t),s=Uy(t),i=e.getImmediate({optional:!0});if(i){const u=await i.getHeartbeatsHeader();u&&s.append("x-firebase-client",u)}const o={fid:n,authVersion:Vy,appId:t.appId,sdkVersion:Oy},c={method:"POST",headers:s,body:JSON.stringify(o)},l=await Hy(()=>fetch(r,c));if(l.ok){const u=await l.json();return{fid:u.fid||n,registrationStatus:2,refreshToken:u.refreshToken,authToken:Ly(u.authToken)}}else throw await Fy("Create Installation",l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function By(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function s0(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const i0=/^[cdef][\w-]{21}$/,Eu="";function o0(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=a0(t);return i0.test(n)?n:Eu}catch{return Eu}}function a0(t){return s0(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vc(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jy=new Map;function $y(t,e){const n=Vc(t);qy(n,e),c0(n,e)}function qy(t,e){const n=jy.get(t);if(n)for(const r of n)r(e)}function c0(t,e){const n=l0();n&&n.postMessage({key:t,fid:e}),u0()}let ts=null;function l0(){return!ts&&"BroadcastChannel"in self&&(ts=new BroadcastChannel("[Firebase] FID Change"),ts.onmessage=t=>{qy(t.data.key,t.data.fid)}),ts}function u0(){jy.size===0&&ts&&(ts.close(),ts=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const h0="firebase-installations-database",d0=1,us="firebase-installations-store";let Vl=null;function yh(){return Vl||(Vl=G_(h0,d0,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(us)}}})),Vl}async function Ga(t,e){const n=Vc(t),s=(await yh()).transaction(us,"readwrite"),i=s.objectStore(us),o=await i.get(n);return await i.put(e,n),await s.done,(!o||o.fid!==e.fid)&&$y(t,e.fid),e}async function Wy(t){const e=Vc(t),r=(await yh()).transaction(us,"readwrite");await r.objectStore(us).delete(e),await r.done}async function xc(t,e){const n=Vc(t),s=(await yh()).transaction(us,"readwrite"),i=s.objectStore(us),o=await i.get(n),c=e(o);return c===void 0?await i.delete(n):await i.put(c,n),await s.done,c&&(!o||o.fid!==c.fid)&&$y(t,c.fid),c}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vh(t){let e;const n=await xc(t.appConfig,r=>{const s=f0(r),i=p0(t,s);return e=i.registrationPromise,i.installationEntry});return n.fid===Eu?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function f0(t){const e=t||{fid:o0(),registrationStatus:0};return Gy(e)}function p0(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(ls.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=g0(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:m0(t)}:{installationEntry:e}}async function g0(t,e){try{const n=await r0(t,e);return Ga(t.appConfig,n)}catch(n){throw xy(n)&&n.customData.serverCode===409?await Wy(t.appConfig):await Ga(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function m0(t){let e=await Sp(t.appConfig);for(;e.registrationStatus===1;)await By(100),e=await Sp(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await vh(t);return r||n}return e}function Sp(t){return xc(t,e=>{if(!e)throw ls.create("installation-not-found");return Gy(e)})}function Gy(t){return _0(t)?{fid:t.fid,registrationStatus:0}:t}function _0(t){return t.registrationStatus===1&&t.registrationTime+Ny<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function y0({appConfig:t,heartbeatServiceProvider:e},n){const r=v0(t,n),s=e0(t,n),i=e.getImmediate({optional:!0});if(i){const u=await i.getHeartbeatsHeader();u&&s.append("x-firebase-client",u)}const o={installation:{sdkVersion:Oy,appId:t.appId}},c={method:"POST",headers:s,body:JSON.stringify(o)},l=await Hy(()=>fetch(r,c));if(l.ok){const u=await l.json();return Ly(u)}else throw await Fy("Generate Auth Token",l)}function v0(t,{fid:e}){return`${My(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Eh(t,e=!1){let n;const r=await xc(t.appConfig,i=>{if(!zy(i))throw ls.create("not-registered");const o=i.authToken;if(!e&&T0(o))return i;if(o.requestStatus===1)return n=E0(t,e),i;{if(!navigator.onLine)throw ls.create("app-offline");const c=b0(i);return n=I0(t,c),c}});return n?await n:r.authToken}async function E0(t,e){let n=await Cp(t.appConfig);for(;n.authToken.requestStatus===1;)await By(100),n=await Cp(t.appConfig);const r=n.authToken;return r.requestStatus===0?Eh(t,e):r}function Cp(t){return xc(t,e=>{if(!zy(e))throw ls.create("not-registered");const n=e.authToken;return A0(n)?{...e,authToken:{requestStatus:0}}:e})}async function I0(t,e){try{const n=await y0(t,e),r={...e,authToken:n};return await Ga(t.appConfig,r),n}catch(n){if(xy(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Wy(t.appConfig);else{const r={...e,authToken:{requestStatus:0}};await Ga(t.appConfig,r)}throw n}}function zy(t){return t!==void 0&&t.registrationStatus===2}function T0(t){return t.requestStatus===2&&!w0(t)}function w0(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+JR}function b0(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function A0(t){return t.requestStatus===1&&t.requestTime+Ny<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function S0(t){const e=t,{installationEntry:n,registrationPromise:r}=await vh(e);return r?r.catch(console.error):Eh(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function C0(t,e=!1){const n=t;return await R0(n),(await Eh(n,e)).token}async function R0(t){const{registrationPromise:e}=await vh(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P0(t){if(!t||!t.options)throw xl("App Configuration");if(!t.name)throw xl("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw xl(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function xl(t){return ls.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ky="installations",k0="installations-internal",D0=t=>{const e=t.getProvider("app").getImmediate(),n=P0(e),r=ms(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},N0=t=>{const e=t.getProvider("app").getImmediate(),n=ms(e,Ky).getImmediate();return{getId:()=>S0(n),getToken:s=>C0(n,s)}};function O0(){Dn(new dn(Ky,D0,"PUBLIC")),Dn(new dn(k0,N0,"PRIVATE"))}O0();nn(Dy,_h);nn(Dy,_h,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const za="analytics",V0="firebase_id",x0="origin",M0=60*1e3,L0="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Ih="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jt=new Cc("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F0={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Jt=new gs("analytics","Analytics",F0);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U0(t){if(!t.startsWith(Ih)){const e=Jt.create("invalid-gtag-resource",{gtagURL:t});return jt.warn(e.message),""}return t}function Qy(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function H0(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function B0(t,e){const n=H0("firebase-js-sdk-policy",{createScriptURL:U0}),r=document.createElement("script"),s=`${Ih}?l=${t}&id=${e}`;r.src=n?n?.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function j0(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function $0(t,e,n,r,s,i){const o=r[s];try{if(o)await e[o];else{const l=(await Qy(n)).find(u=>u.measurementId===s);l&&await e[l.appId]}}catch(c){jt.error(c)}t("config",s,i)}async function q0(t,e,n,r,s){try{let i=[];if(s&&s.send_to){let o=s.send_to;Array.isArray(o)||(o=[o]);const c=await Qy(n);for(const l of o){const u=c.find(f=>f.measurementId===l),d=u&&e[u.appId];if(d)i.push(d);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),t("event",r,s||{})}catch(i){jt.error(i)}}function W0(t,e,n,r){async function s(i,...o){try{if(i==="event"){const[c,l]=o;await q0(t,e,n,c,l)}else if(i==="config"){const[c,l]=o;await $0(t,e,n,r,c,l)}else if(i==="consent"){const[c,l]=o;t("consent",c,l)}else if(i==="get"){const[c,l,u]=o;t("get",c,l,u)}else if(i==="set"){const[c]=o;t("set",c)}else t(i,...o)}catch(c){jt.error(c)}}return s}function G0(t,e,n,r,s){let i=function(...o){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(i=window[s]),window[s]=W0(i,t,e,n),{gtagCore:i,wrappedGtag:window[s]}}function z0(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(Ih)&&n.src.includes(t))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K0=30,Q0=1e3;class J0{constructor(e={},n=Q0){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Jy=new J0;function Y0(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function X0(t){const{appId:e,apiKey:n}=t,r={method:"GET",headers:Y0(n)},s=L0.replace("{app-id}",e),i=await fetch(s,r);if(i.status!==200&&i.status!==304){let o="";try{const c=await i.json();c.error?.message&&(o=c.error.message)}catch{}throw Jt.create("config-fetch-failed",{httpStatus:i.status,responseMessage:o})}return i.json()}async function Z0(t,e=Jy,n){const{appId:r,apiKey:s,measurementId:i}=t.options;if(!r)throw Jt.create("no-app-id");if(!s){if(i)return{measurementId:i,appId:r};throw Jt.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new nP;return setTimeout(async()=>{c.abort()},M0),Yy({appId:r,apiKey:s,measurementId:i},o,c,e)}async function Yy(t,{throttleEndTimeMillis:e,backoffCount:n},r,s=Jy){const{appId:i,measurementId:o}=t;try{await eP(r,e)}catch(c){if(o)return jt.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${c?.message}]`),{appId:i,measurementId:o};throw c}try{const c=await X0(t);return s.deleteThrottleMetadata(i),c}catch(c){const l=c;if(!tP(l)){if(s.deleteThrottleMetadata(i),o)return jt.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${l?.message}]`),{appId:i,measurementId:o};throw c}const u=Number(l?.customData?.httpStatus)===503?Xf(n,s.intervalMillis,K0):Xf(n,s.intervalMillis),d={throttleEndTimeMillis:Date.now()+u,backoffCount:n+1};return s.setThrottleMetadata(i,d),jt.debug(`Calling attemptFetch again in ${u} millis`),Yy(t,d,r,s)}}function eP(t,e){return new Promise((n,r)=>{const s=Math.max(e-Date.now(),0),i=setTimeout(n,s);t.addEventListener(()=>{clearTimeout(i),r(Jt.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function tP(t){if(!(t instanceof pn)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class nP{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function rP(t,e,n,r,s){if(s&&s.global){t("event",n,r);return}else{const i=await e,o={...r,send_to:i};t("event",n,o)}}async function sP(t,e,n,r){if(r&&r.global){const s={};for(const i of Object.keys(n))s[`user_properties.${i}`]=n[i];return t("set",s),Promise.resolve()}else{const s=await e;t("config",s,{update:!0,user_properties:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iP(){if(j_())try{await $_()}catch(t){return jt.warn(Jt.create("indexeddb-unavailable",{errorInfo:t?.toString()}).message),!1}else return jt.warn(Jt.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function oP(t,e,n,r,s,i,o){const c=Z0(t);c.then(g=>{n[g.measurementId]=g.appId,t.options.measurementId&&g.measurementId!==t.options.measurementId&&jt.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${g.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(g=>jt.error(g)),e.push(c);const l=iP().then(g=>{if(g)return r.getId()}),[u,d]=await Promise.all([c,l]);z0(i)||B0(i,u.measurementId),s("js",new Date);const f=o?.config??{};return f[x0]="firebase",f.update=!0,d!=null&&(f[V0]=d),s("config",u.measurementId,f),u.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aP{constructor(e){this.app=e}_delete(){return delete qs[this.app.options.appId],Promise.resolve()}}let qs={},Rp=[];const Pp={};let Ml="dataLayer",cP="gtag",kp,Th,Dp=!1;function lP(){const t=[];if(B_()&&t.push("This is a browser extension environment."),oA()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,s)=>`(${s+1}) ${r}`).join(" "),n=Jt.create("invalid-analytics-context",{errorInfo:e});jt.warn(n.message)}}function uP(t,e,n){lP();const r=t.options.appId;if(!r)throw Jt.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)jt.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Jt.create("no-api-key");if(qs[r]!=null)throw Jt.create("already-exists",{id:r});if(!Dp){j0(Ml);const{wrappedGtag:i,gtagCore:o}=G0(qs,Rp,Pp,Ml,cP);Th=i,kp=o,Dp=!0}return qs[r]=oP(t,Rp,Pp,e,kp,Ml,n),new aP(t)}function hP(t=uh()){t=Vt(t);const e=ms(t,za);return e.isInitialized()?e.getImmediate():dP(t)}function dP(t,e={}){const n=ms(t,za);if(n.isInitialized()){const s=n.getImmediate();if(Or(e,n.getOptions()))return s;throw Jt.create("already-initialized")}return n.initialize({options:e})}function fP(t,e,n){t=Vt(t),sP(Th,qs[t.app.options.appId],e,n).catch(r=>jt.error(r))}function pP(t,e,n,r){t=Vt(t),rP(Th,qs[t.app.options.appId],e,n,r).catch(s=>jt.error(s))}const Np="@firebase/analytics",Op="0.10.19";function gP(){Dn(new dn(za,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return uP(r,s,n)},"PUBLIC")),Dn(new dn("analytics-internal",t,"PRIVATE")),nn(Np,Op),nn(Np,Op,"esm2020");function t(e){try{const n=e.getProvider(za).getImmediate();return{logEvent:(r,s,i)=>pP(n,r,s,i),setUserProperties:(r,s)=>fP(n,r,s)}}catch(n){throw Jt.create("interop-component-reg-failed",{reason:n})}}}gP();const wh=.6,Xy=1.1,mP={apiKey:"AIzaSyA07rmFYxIPgf5ZicE6tLnT0g7otsntVAI",authDomain:"blackjack-19729.firebaseapp.com",projectId:"blackjack-19729",storageBucket:"blackjack-19729.firebasestorage.app",messagingSenderId:"695301861998",appId:"1:695301861998:web:158fd8368aaac069c52c7f",measurementId:"G-BNTT6670HE"},Yi="User_Email",Zy=z_(mP);hP(Zy);const _P={url:"https://www.github.io/bjk/finishSignUp",handleCodeInApp:!0},yP={class:"auth-shell"},vP=["disabled"],EP={key:1,class:"auth-current"},IP={class:"auth-current__text"},TP={key:2,class:"auth-form__status"},wP={key:3,class:"auth-form__error"},bP=At({__name:"Auth",setup(t){const e=He(window.localStorage.getItem(Yi)??""),n=He(!1),r=He(""),s=He(""),i=He(null),o=Wa();yc(()=>{Ey(o,u=>{i.value=u})});const c=async()=>{s.value="",r.value="";const u=e.value.trim();if(!u){s.value="Enter an email to continue.";return}n.value=!0;try{await bC(o,u,_P),window.localStorage.setItem(Yi,u),r.value=`Sign-in link sent to ${u}`}catch(d){console.error("Error sending sign-in link:",d),s.value="Unable to send link. Please try again."}finally{n.value=!1}},l=async()=>{try{await xC(o),r.value="Signed out."}catch(u){console.error("Failed to sign out",u),s.value="Unable to sign out. Please retry."}};return(u,d)=>(ge(),be("section",yP,[i.value?(ge(),be("div",EP,[Ee("p",IP,[d[2]||(d[2]=Ic("Signed in as: ",-1)),Ee("strong",null,Bt(i.value?.email),1)]),Ee("button",{class:"auth-form__submit",type:"button",onClick:l},"Log Out")])):(ge(),be("form",{key:0,class:"auth-form",onSubmit:ww(c,["prevent"])},[d[1]||(d[1]=Ee("label",{for:"email-input",class:"auth-form__label"},"Email",-1)),xm(Ee("input",{"onUpdate:modelValue":d[0]||(d[0]=f=>e.value=f),type:"email",id:"email-input",class:"auth-form__input",placeholder:"you@example.com",autocomplete:"email",required:""},null,512),[[Ew,e.value]]),Ee("button",{class:"auth-form__submit",type:"submit",disabled:n.value},Bt(n.value?"Sending...":"Send Sign-In Link"),9,vP)],32)),r.value?(ge(),be("p",TP,Bt(r.value),1)):vt("",!0),s.value?(ge(),be("p",wP,Bt(s.value),1)):vt("",!0)]))}}),qt=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},AP=qt(bP,[["__scopeId","data-v-07eb179b"]]),SP=["aria-expanded"],CP={key:0,class:"profile-menu__panel",role:"dialog","aria-label":"Profile menu"},RP=At({__name:"ProfileMenu",setup(t){const e=He(!1),n=r=>{e.value=r};return(r,s)=>(ge(),be("div",{class:"profile-menu",onMouseenter:s[0]||(s[0]=i=>n(!0)),onMouseleave:s[1]||(s[1]=i=>n(!1))},[Ee("button",{class:"profile-menu__button",type:"button","aria-haspopup":"true","aria-expanded":e.value?"true":"false"},[...s[2]||(s[2]=[Ee("svg",{class:"profile-menu__icon",viewBox:"0 0 24 24",role:"img","aria-label":"Profile"},[Ee("circle",{cx:"12",cy:"8",r:"4"}),Ee("path",{d:"M4 20c0-3.3137 3.134-6 8-6s8 2.6863 8 6"})],-1)])],8,SP),e.value?(ge(),be("div",CP,[st(AP)])):vt("",!0)],32))}}),PP=qt(RP,[["__scopeId","data-v-c1f0909d"]]),Ll="/bjk/flag-wave.gif",Fl="/bjk/bjWin.gif",kP=["aria-label"],Ul=64,Hl=64,ta=1,Vp=14,xp=4,DP=At({__name:"PlayingCard",props:{suit:{},rank:{},large:{type:Boolean}},setup(t){const e=Vp*Ul+(Vp-1)*ta,n=xp*Hl+(xp-1)*ta,r={row:1,column:13},s=["A","2","3","4","5","6","7","8","9","10","J","Q","K"],i=["hearts","diamonds","clubs","spades"],o={A:"A",ACE:"A",1:"A","01":"A","02":"2",2:"2",TWO:"2","03":"3",3:"3",THREE:"3","04":"4",4:"4",FOUR:"4","05":"5",5:"5",FIVE:"5","06":"6",6:"6",SIX:"6","07":"7",7:"7",SEVEN:"7","08":"8",8:"8",EIGHT:"8","09":"9",9:"9",NINE:"9",10:"10",T:"10",TEN:"10",J:"J",JACK:"J",Q:"Q",QUEEN:"Q",K:"K",KING:"K"},c={HEARTS:"hearts",HEART:"hearts",H:"hearts",DIAMONDS:"diamonds",DIAMOND:"diamonds",D:"diamonds",CLUBS:"clubs",CLUB:"clubs",C:"clubs",SPADES:"spades",SPADE:"spades",S:"spades"},l=t,u=oe(()=>l.large?Xy:wh),d=oe(()=>{if(l.rank===void 0||l.rank===null)return null;const k=`${l.rank}`.trim().toUpperCase();return o[k]??null}),f=oe(()=>{if(!l.suit)return null;const k=l.suit.trim().toUpperCase();return c[k]??null}),g=oe(()=>{const k=d.value,O=f.value;if(!k||!O)return r;const V=s.indexOf(k),F=i.indexOf(O);return V===-1||F===-1?r:{row:F,column:V}}),_=new URL("/bjk/kenney_playing-cards-pack/Tilesheet/cardsLarge_tilemap.png",import.meta.url).href,R=oe(()=>{const{row:k,column:O}=g.value,V=-O*(Ul+ta),F=-k*(Hl+ta),M=u.value;return{width:`${Ul*M}px`,height:`${Hl*M}px`,backgroundImage:`url(${_})`,backgroundPosition:`${V*M}px ${F*M}px`,backgroundSize:`${e*M}px ${n*M}px`}}),P=oe(()=>{const k=d.value,O=f.value;return!k||!O?"Card back":`${k} of ${O}`});return(k,O)=>(ge(),be("div",{class:"playing-card",style:Qn(R.value),role:"img","aria-label":P.value},null,12,kP))}}),NP=qt(DP,[["__scopeId","data-v-72c1efd8"]]),OP=46,VP=64,Mp=13,xP=220,Lp=320,MP=At({__name:"CardHand",props:{cards:{},maxWidth:{},large:{type:Boolean}},setup(t){const e=t,n=oe(()=>e.large?Xy:wh),r=oe(()=>OP*n.value),s=oe(()=>VP*n.value),i=oe(()=>r.value+(Mp-1)*(r.value/4)),o=oe(()=>e.maxWidth??i.value),c=oe(()=>e.large??!1),l=oe(()=>e.cards.slice(0,Mp)),u=He([]),d=oe(()=>u.value),f=oe(()=>{const I=u.value.length;if(I<=1)return 0;const b=Math.max(o.value-r.value,0)/(I-1),v=Math.min(b,r.value);return Math.max(v,r.value/4)}),g=oe(()=>{const I=u.value.length;return I===0?0:r.value+f.value*(I-1)}),_=oe(()=>({maxWidth:`${o.value}px`,width:`${Math.min(g.value,o.value)}px`,height:`${s.value}px`})),R=oe(()=>u.value.map((I,T)=>({left:`${T*f.value-8}px`,zIndex:T+1}))),P=[],k=[];let O=0,V=!1;const F=(I,T)=>({id:++O,value:I.value,suit:I.suit,rank:I.rank,isEntering:T}),M=()=>{for(;k.length;){const I=k.pop();I!==void 0&&clearTimeout(I)}},X=I=>{u.value=u.value.map(T=>T.id===I?{...T,isEntering:!1}:T)},se=(I,T)=>{const b=setTimeout(()=>{const v=k.indexOf(b);v!==-1&&k.splice(v,1),I()},T);k.push(b)},S=()=>{if(V)return;V=!0;const I=()=>{const T=P.shift();if(!T){V=!1;return}const b=F(T,!0);u.value=[...u.value,b],se(()=>X(b.id),Lp),se(I,xP)};I()},E=I=>{I.length!==0&&(P.push(...I),S())},y=I=>{M(),P.length=0,V=!1,u.value=I.map(T=>F(T,!1))};return bn(l,I=>{const T=u.value,b=I.length;if(T.length===0&&b===0)return;if(T.length>0&&b===0){y([]);return}const v=Math.min(T.length,b),me=T.slice(0,v).map((Se,Q)=>{const ne=I[Q];if(Se.value===ne.value&&Se.suit===ne.suit)return Se;const ie=F(ne,!0);return se(()=>X(ie.id),Lp),ie});if(u.value=me,b<T.length){M(),P.length=0,V=!1;return}const Ve=I.slice(me.length);E(Ve)},{immediate:!0}),So(()=>{M()}),(I,T)=>(ge(),be("div",{class:"card-hand",style:Qn(_.value),role:"group","aria-label":"Card hand"},[(ge(!0),be(Tt,null,ao(d.value,(b,v)=>(ge(),Wn(NP,{key:b.id,class:Bn(["card-hand__card",{"card-hand__card--entering":b.isEntering}]),style:Qn(R.value[v]),rank:b.rank,suit:b.suit,large:c.value},null,8,["class","style","rank","suit","large"]))),128))],4))}}),ga=qt(MP,[["__scopeId","data-v-a44007ea"]]),LP={class:"result-counter__prefix"},FP={class:"result-counter__value"},UP=At({__name:"ResultCounter",props:{amount:{},active:{type:Boolean},result:{},durationMs:{},direction:{}},setup(t){const e=t,n=He(0),r=He(!1);let s=null;const i=_=>{switch(_){case"Surrendered":case"Lose":case"Double_Lose":return"down";case"Win":case"BlackJack_Win":case"Double_Win":return"up";case"Push":case"Double_Push":return"push";default:return"push"}},o=oe(()=>e.direction??i(e.result)),c=oe(()=>e.durationMs??900),l=oe(()=>o.value==="up"?"+":o.value==="down"?"-":"±"),u=oe(()=>`result-counter--${o.value}`),d=()=>{s!==null&&(cancelAnimationFrame(s),s=null)},f=()=>{d();const _=Math.max(e.amount,0),R=o.value;if(!e.active||_<=0){r.value=!1,n.value=R==="down"?_:0;return}r.value=!0;const P=R==="down"?_:0,O=(R==="down"?0:_)-P,V=performance.now(),F=M=>{const X=M-V,se=Math.min(X/c.value,1),S=P+O*se;n.value=Math.round(S),se<1?s=requestAnimationFrame(F):(s=null,r.value=!1)};n.value=P,s=requestAnimationFrame(F)};bn(()=>({amount:e.amount,active:e.active,direction:o.value}),(_,R)=>{const{amount:P,active:k}=_,O=R?.amount,V=R?.active;if(P<=0){r.value=!1,d(),n.value=0;return}if(!k){d(),r.value=!1,n.value=o.value==="down"?Math.max(P,0):0;return}k&&(!V||P!==O)&&f()},{immediate:!0}),th(()=>{d()});const g=oe(()=>n.value.toLocaleString());return(_,R)=>(ge(),Wn(ZT,{name:"result-counter"},{default:Vm(()=>[r.value?(ge(),be("div",{key:0,class:Bn(["result-counter",u.value]),role:"status","aria-live":"polite"},[Ee("span",LP,Bt(l.value),1),Ee("span",FP,Bt(g.value),1)],2)):vt("",!0)]),_:1}))}}),Bl=qt(UP,[["__scopeId","data-v-b592d668"]]),HP={class:"betting-slider",role:"group","aria-label":"Bet amount selector"},BP={class:"betting-slider__body"},jP={class:"betting-slider__value","aria-live":"polite"},$P=["disabled"],qP=["disabled"],WP=["value","disabled"],Cs=0,jl=3e4,Di=500,GP=At({__name:"BettingSlider",props:{initialValue:{},showSlider:{type:Boolean},disabled:{type:Boolean}},emits:["change","update:value"],setup(t,{emit:e}){const n=t,r=e,s=P=>{const k=Math.min(jl,Math.max(Cs,P)),O=Math.round((k-Cs)/Di);return Cs+O*Di},i=He(s(n.initialValue??Cs)),o=oe(()=>n.disabled??!1),c=oe(()=>i.value<=Cs),l=oe(()=>i.value>=jl),u=()=>{const P=i.value;r("update:value",P),r("change",P)},d=oe(()=>`$${(i.value/100).toLocaleString("en-US")}`),f=P=>{i.value=s(P)},g=()=>{o.value||l.value||f(i.value+Di)},_=()=>{o.value||c.value||f(i.value-Di)},R=P=>{if(o.value)return;const k=P.target;if(!k)return;const O=Number.parseInt(k.value,10);Number.isNaN(O)||f(O)};return bn(()=>n.initialValue,P=>{if(P!==void 0&&!Number.isNaN(P)){const k=s(P);k!==i.value&&(i.value=k)}}),bn(i,u),(P,k)=>(ge(),be("div",HP,[Ee("div",BP,[Ee("div",jP,[Ee("button",{type:"button",class:"betting-slider__control","aria-label":"Decrease bet",onClick:_,disabled:o.value||c.value}," − ",8,$P),Ic(" "+Bt(d.value)+" ",1),Ee("button",{type:"button",class:"betting-slider__control","aria-label":"Increase bet",onClick:g,disabled:o.value||l.value}," + ",8,qP)]),xm(Ee("input",{ref:"sliderRef",class:"betting-slider__range",type:"range",min:Cs,max:jl,step:Di,value:i.value,"aria-label":"Bet amount slider",disabled:o.value,onInput:R},null,40,WP),[[iw,n.showSlider]])])]))}}),zP=qt(GP,[["__scopeId","data-v-3849889f"]]);class KP{constructor(e,n){this.suit=e,this.rank=n}isAce(){return this.rank==="A"}get value(){switch(this.rank){case"10":case"J":case"Q":case"K":return 10;case"A":return 1;default:return Number(this.rank)}}get suitSymbol(){switch(this.suit){case"Hearts":return"♥";case"Diamonds":return"♦";case"Clubs":return"♣";case"Spades":return"♠"}}}function QP(){const t=["Hearts","Diamonds","Clubs","Spades"],e=["2","3","4","5","6","7","8","9","10","J","Q","K","A"],n=[];for(const r of t)for(const s of e)n.push(new KP(r,s));return n}function JP(t){let e=[];for(let n=0;n<t;n++)e=e.concat(QP());return e}function YP(t){return{all:t=t||new Map,on:function(e,n){var r=t.get(e);r?r.push(n):t.set(e,[n])},off:function(e,n){var r=t.get(e);r&&(n?r.splice(r.indexOf(n)>>>0,1):t.set(e,[]))},emit:function(e,n){var r=t.get(e);r&&r.slice().map(function(s){s(n)}),(r=t.get("*"))&&r.slice().map(function(s){s(e,n)})}}}const is="model:change",on=(t,e)=>`mod_${t}:prop_${e}`,Gn=(t,e)=>`mod_${t}:evt_${e}`,XP=(t,e)=>`mod_${t}#id_${e}`,Ka=(t,e,n)=>`mod_${t}:prop_${e}#id_${n}`,qn=(t,e,n)=>`mod_${t}:evt_${e}#id_${n}`,os=t=>`usr_evt_${t}`,ZP=(t,e)=>`usr_evt_${t}_act_${e}`,ae=YP(),Fp=new WeakMap,Up=new WeakMap,Iu=new WeakMap,zn=t=>Iu.get(t);function bh(t,e,n){let r=Iu.get(n);if(r)return r;const s=(Up.get(t)??0)+1;return Up.set(t,s),r=`${e}_${s}`,Iu.set(n,r),r}const e1=(t,e)=>{let n=Fp.get(t);n||(n=new Map,Fp.set(t,n));let r=n.get(e);return r||(r=Symbol(`${String(e)}`),n.set(e,r)),r};function Mc(t,e){const{model:n,props:r,trackInstance:s=!1}=e,i=t.prototype;r.forEach(o=>{const c=Object.getOwnPropertyDescriptor(i,o);if(c&&!c.configurable)return;const l=e1(i,o);Object.defineProperty(i,o,{configurable:!0,enumerable:!0,get(){return this[l]},set(u){const d=this[l],f=s?bh(t,n,this):void 0;this[l]=u;const g={model:n,instanceId:f,property:o,value:u,previous:d,target:this};ae.emit(is,g),ae.emit(on(n,o),g),f&&(ae.emit(XP(n,f),g),ae.emit(Ka(n,o,f),g))}})})}function t1(t){return["Hit","Stand","Double","Split","Surrender"].includes(t)}const Ws="new_card",ma="split_cards",_a="hand_outcome";class Qa{constructor(e=[]){this.cards=e,this.isSplit=!1,this.isDoubled=!1,this.hasStood=!1,this.isSurrendered=!1,this.lastOutcome=null,bh(Qa,"hand",this)}get softValue(){let e=0;for(const n of this.cards)e+=n.value;return e}get isSoft(){return this.cards.some(e=>e.isAce())&&this.softValue+10<=21}get isDone(){return this.isBusted||this.hasStood||this.isSurrendered||this.bestValue===21}get isBusted(){return this.softValue>21}get isBlackJack(){return!this.isSplit&&this.bestValue===21&&this.cards.length===2}get bestValue(){return this.isSoft&&this.softValue+10<=21?this.softValue+10:this.softValue}addCard(e){this.cards.push(e);const n=zn(this),r={model:"hand",instanceId:n,event:Ws,value:e,previous:void 0,target:this};ae.emit(is,r),ae.emit(Gn("hand",Ws),r),n&&ae.emit(qn("hand",Ws,n),r)}splitCards(){const e=this.cards.pop(),n=zn(this),r={model:"hand",instanceId:n,event:ma,value:e,previous:void 0,target:this};return ae.emit(is,r),ae.emit(Gn("hand",ma),r),n&&ae.emit(qn("hand",ma,n),r),e}split(){this.isSplit=!0}emitOutcomeChange(e,n){const r=zn(this),s={model:"hand",instanceId:r,event:_a,value:e,previous:n,target:this};ae.emit(is,s),ae.emit(Gn("hand",_a),s),r&&ae.emit(qn("hand",_a,r),s)}setOutcome(e){if(this.lastOutcome===e)return;const n=this.lastOutcome;this.lastOutcome=e,this.emitOutcomeChange(e,n)}beatsHand(e){let n;return this.isSurrendered?n="Surrendered":this.isBlackJack&&!e.isBlackJack?n="BlackJack_Win":!this.isBlackJack&&e.isBlackJack?n="Lose":this.isBusted?n=this.isDoubled?"Double_Lose":"Lose":e.isBusted?n=this.isDoubled?"Double_Win":"Win":this.bestValue>e.bestValue?n=this.isDoubled?"Double_Win":"Win":this.bestValue<e.bestValue?n=this.isDoubled?"Double_Lose":"Lose":n=this.isDoubled?"Double_Push":"Push",this.setOutcome(n),n}}class Oo{constructor(e=[]){this.shoe=e,this.dealIndex=0,this.trueRunningCount=0,this.holeCardHidden=!0}static getCountDelta(e){switch(e.value){case 1:case 10:return-1;case 2:case 3:case 4:case 5:case 6:return 1;default:return 0}}get remainingDecks(){return(this.shoe.length-this.dealIndex-1)/52}pastPenetration(){return this.shoe.length-1-this.dealIndex<ke.getInstance().rules.penetration+1}reset(){this.shuffle()}resetDealIndex(){this.dealIndex=0}dealCard(){if(this.dealIndex>this.shoe.length-1)throw new Error("No cards left in the shoe");const e=this.shoe[this.dealIndex];return this.dealIndex++,this.applyRunningCountDelta(e),e}shuffle(){for(let e=this.shoe.length-1;e>0;e--){const n=Math.floor(Math.random()*(e+1));[this.shoe[e],this.shoe[n]]=[this.shoe[n],this.shoe[e]]}this.dealIndex=0,this.trueRunningCount=0,this.holeCardHidden=!0}completeDealerHand(e){for(;e.bestValue<17;)e.addCard(this.dealCard());e.bestValue===17&&e.isSoft&&ke.getInstance().rules.dealerHitsSoft17&&e.addCard(this.dealCard()),this.holeCardHidden&&(this.holeCardHidden=!1)}applyRunningCountDelta(e){if(!e)return;const n=Oo.getCountDelta(e);n!==0&&(this.trueRunningCount=this.trueRunningCount+n)}}Mc(Oo,{model:"dealer",props:["dealIndex","holeCardHidden"],trackInstance:!1});const $l=10,Hp=(t=0)=>e=>`\x1B[${e+t}m`,Bp=(t=0)=>e=>`\x1B[${38+t};5;${e}m`,jp=(t=0)=>(e,n,r)=>`\x1B[${38+t};2;${e};${n};${r}m`,Ye={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],gray:[90,39],grey:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgGray:[100,49],bgGrey:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};Object.keys(Ye.modifier);const n1=Object.keys(Ye.color),r1=Object.keys(Ye.bgColor);[...n1,...r1];function s1(){const t=new Map;for(const[e,n]of Object.entries(Ye)){for(const[r,s]of Object.entries(n))Ye[r]={open:`\x1B[${s[0]}m`,close:`\x1B[${s[1]}m`},n[r]=Ye[r],t.set(s[0],s[1]);Object.defineProperty(Ye,e,{value:n,enumerable:!1})}return Object.defineProperty(Ye,"codes",{value:t,enumerable:!1}),Ye.color.close="\x1B[39m",Ye.bgColor.close="\x1B[49m",Ye.color.ansi=Hp(),Ye.color.ansi256=Bp(),Ye.color.ansi16m=jp(),Ye.bgColor.ansi=Hp($l),Ye.bgColor.ansi256=Bp($l),Ye.bgColor.ansi16m=jp($l),Object.defineProperties(Ye,{rgbToAnsi256:{value(e,n,r){return e===n&&n===r?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(n/255*5)+Math.round(r/255*5)},enumerable:!1},hexToRgb:{value(e){const n=/[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));if(!n)return[0,0,0];let[r]=n;r.length===3&&(r=[...r].map(i=>i+i).join(""));const s=Number.parseInt(r,16);return[s>>16&255,s>>8&255,s&255]},enumerable:!1},hexToAnsi256:{value:e=>Ye.rgbToAnsi256(...Ye.hexToRgb(e)),enumerable:!1},ansi256ToAnsi:{value(e){if(e<8)return 30+e;if(e<16)return 90+(e-8);let n,r,s;if(e>=232)n=((e-232)*10+8)/255,r=n,s=n;else{e-=16;const c=e%36;n=Math.floor(e/36)/5,r=Math.floor(c/6)/5,s=c%6/5}const i=Math.max(n,r,s)*2;if(i===0)return 30;let o=30+(Math.round(s)<<2|Math.round(r)<<1|Math.round(n));return i===2&&(o+=60),o},enumerable:!1},rgbToAnsi:{value:(e,n,r)=>Ye.ansi256ToAnsi(Ye.rgbToAnsi256(e,n,r)),enumerable:!1},hexToAnsi:{value:e=>Ye.ansi256ToAnsi(Ye.hexToAnsi256(e)),enumerable:!1}}),Ye}const vn=s1(),$p=(()=>{if(!("navigator"in globalThis))return 0;if(globalThis.navigator.userAgentData){const t=navigator.userAgentData.brands.find(({brand:e})=>e==="Chromium");if(t&&t.version>93)return 3}return/\b(Chrome|Chromium)\//.test(globalThis.navigator.userAgent)?1:0})(),qp=$p!==0&&{level:$p},i1={stdout:qp,stderr:qp};function o1(t,e,n){let r=t.indexOf(e);if(r===-1)return t;const s=e.length;let i=0,o="";do o+=t.slice(i,r)+e+n,i=r+s,r=t.indexOf(e,i);while(r!==-1);return o+=t.slice(i),o}function a1(t,e,n,r){let s=0,i="";do{const o=t[r-1]==="\r";i+=t.slice(s,o?r-1:r)+e+(o?`\r
`:`
`)+n,s=r+1,r=t.indexOf(`
`,s)}while(r!==-1);return i+=t.slice(s),i}const{stdout:Wp,stderr:Gp}=i1,Tu=Symbol("GENERATOR"),Js=Symbol("STYLER"),mo=Symbol("IS_EMPTY"),zp=["ansi","ansi","ansi256","ansi16m"],Ys=Object.create(null),c1=(t,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");const n=Wp?Wp.level:0;t.level=e.level===void 0?n:e.level},l1=t=>{const e=(...n)=>n.join(" ");return c1(e,t),Object.setPrototypeOf(e,Vo.prototype),e};function Vo(t){return l1(t)}Object.setPrototypeOf(Vo.prototype,Function.prototype);for(const[t,e]of Object.entries(vn))Ys[t]={get(){const n=Ja(this,bu(e.open,e.close,this[Js]),this[mo]);return Object.defineProperty(this,t,{value:n}),n}};Ys.visible={get(){const t=Ja(this,this[Js],!0);return Object.defineProperty(this,"visible",{value:t}),t}};const wu=(t,e,n,...r)=>t==="rgb"?e==="ansi16m"?vn[n].ansi16m(...r):e==="ansi256"?vn[n].ansi256(vn.rgbToAnsi256(...r)):vn[n].ansi(vn.rgbToAnsi(...r)):t==="hex"?wu("rgb",e,n,...vn.hexToRgb(...r)):vn[n][t](...r),u1=["rgb","hex","ansi256"];for(const t of u1){Ys[t]={get(){const{level:n}=this;return function(...r){const s=bu(wu(t,zp[n],"color",...r),vn.color.close,this[Js]);return Ja(this,s,this[mo])}}};const e="bg"+t[0].toUpperCase()+t.slice(1);Ys[e]={get(){const{level:n}=this;return function(...r){const s=bu(wu(t,zp[n],"bgColor",...r),vn.bgColor.close,this[Js]);return Ja(this,s,this[mo])}}}}const h1=Object.defineProperties(()=>{},{...Ys,level:{enumerable:!0,get(){return this[Tu].level},set(t){this[Tu].level=t}}}),bu=(t,e,n)=>{let r,s;return n===void 0?(r=t,s=e):(r=n.openAll+t,s=e+n.closeAll),{open:t,close:e,openAll:r,closeAll:s,parent:n}},Ja=(t,e,n)=>{const r=(...s)=>d1(r,s.length===1?""+s[0]:s.join(" "));return Object.setPrototypeOf(r,h1),r[Tu]=t,r[Js]=e,r[mo]=n,r},d1=(t,e)=>{if(t.level<=0||!e)return t[mo]?"":e;let n=t[Js];if(n===void 0)return e;const{openAll:r,closeAll:s}=n;if(e.includes("\x1B"))for(;n!==void 0;)e=o1(e,n.close,n.open),n=n.parent;const i=e.indexOf(`
`);return i!==-1&&(e=a1(e,s,r,i)),r+e+s};Object.defineProperties(Vo.prototype,Ys);const Kp=Vo();Vo({level:Gp?Gp.level:0});const f1={Win:"blue",Lose:"red",Double_Lose:"red",Surrendered:"red",Push:"white",BlackJack_Win:"bgYellow",Double_Win:"blue",Double_Push:"white"},ya="new_hand";var Pr;let Ah=(Pr=class{constructor(e=[]){this.hands=e,this.bet=0,this.activeHandIndex=0,this.splitCount=0,bh(Pr,"chair",this)}get activeHand(){return this.hands[this.activeHandIndex]}get chairDone(){return!this.activeHand||this.allHandsOff}get allHandsOff(){for(let e of this.hands)if(!e.isBusted&&!e.isSurrendered&&!e.isBlackJack)return!1;return!0}start(){this.hands=[new Qa],this.activeHandIndex=0,this.splitCount=0}deal(e){if(!this.activeHand)throw new Error("no active hand");this.activeHand.addCard(e)}payout(e){let n=0;for(let r of this.hands)n+=this.handPayout(r,e);return n}handPayout(e,n){switch(e.beatsHand(n)){case"Win":case"Double_Push":return this.bet*2;case"Push":return this.bet;case"BlackJack_Win":return Math.floor(this.bet*(1+ke.getInstance().rules.blackjackPayout));case"Lose":case"Double_Lose":return 0;case"Double_Win":return this.bet*4;case"Surrendered":return this.bet/2}}moveToNextHand(e){this.activeHandIndex++,this.activeHand&&this.activeHand.cards.length<2&&this.activeHand.addCard(e.dealCard()),this.activeHand&&this.activeHand.isDone&&this.moveToNextHand(e)}listViableActions(){return Pr.ACTIONS.reduce((e,n)=>(e[n]=!this.validateAction(n),e),{})}validateAction(e){const n=this.activeHand;if(!n)return"No active hand";if(n.isDone)return"Hand not active";const r=ke.getInstance().rules;switch(e){case"Stand":return null;case"Hit":return n.softValue<21?null:"Cannot hit on 21 or more";case"Double":return ke.getInstance().player.balance<this.bet?"Not enough balance to double":n.cards.length!==2?"Can only double on first two cards":n.isSplit&&!r.doubleAllowedAfterSplit?"Can not double after split":null;case"Split":return n.cards.length!==2?"Can only split with two cards":n.cards[0].value!==n.cards[1].value?"Can only split matching values":this.splitCount>=r.maxSplits?"maximum split count reached":n.cards[0].isAce()&&n.isSplit&&!r.resplitAcesAllowed?"Can not re-split aces":null;case"Surrender":return n.cards.length!==2?"Can only surrender on first two cards":r.surrenderAllowed?null:"Surrender not allowed"}}act(e,n){if(!this.activeHand)throw new Error("No active hand");const r=this.validateAction(e);if(r)throw new Error(r);switch(e){case"Stand":this.activeHand.hasStood=!0,this.moveToNextHand(n);break;case"Double":ke.getInstance().player.removeMoney(this.bet),this.activeHand.isDoubled=!0,this.activeHand.addCard(n.dealCard()),this.moveToNextHand(n);break;case"Split":const s=this.activeHand.splitCards();if(!s)throw new Error("No card to split");const i=new Qa([s]);i.split(),this.activeHand.split(),this.splitCount++,this.addHand(i),this.activeHand.addCard(n.dealCard()),this.activeHand.isDone&&this.moveToNextHand(n);break;case"Hit":this.activeHand.addCard(n.dealCard()),this.activeHand.isDone&&this.moveToNextHand(n);break;case"Surrender":this.activeHand.isSurrendered=!0,this.moveToNextHand(n);break}}addHand(e){this.hands.push(e);const n=zn(this),r={model:"chair",instanceId:n,event:ya,value:e,previous:void 0,target:this};ae.emit(is,r),ae.emit(Gn("hand",ya),r),n&&ae.emit(qn("chair",ya,n),r)}view(e,n){console.log("Player Chair:",this.hands.map((r,s)=>{const i=n?r.beatsHand(n):null,o=this.chalkModify(r,i);return e&&s===this.activeHandIndex?`>${o}<`:o}).join(" | "),"  Bet:",this.bet)}chalkModify(e,n){let r=e.cards.map(s=>`${s.rank}${s.suitSymbol}`).join(", ");if(n){const s=f1[n];r=Kp[s](r)}return(e.isDoubled||n=="BlackJack_Win")&&(r=Kp.underline(r)),r}},Pr.ACTIONS=["Hit","Stand","Split","Double","Surrender"],Pr);Mc(Ah,{model:"chair",props:["bet","activeHandIndex"],trackInstance:!0});const p1={logAfterAction:!1},Ms="chair";let ev=class{constructor(e,n,r={},s=p1){this.dealer=e,this.dealerChair=n,this.playerChairs=r,this.configuration=s,this.chairIndex=0,this.runningCount=0,this.chairTurnIndex=0}get dealerPeekedBlackjack(){return ke.getInstance().rules.dealerPeekA10&&this.dealerChair.hands[0]?.isBlackJack}get upCard(){return this.dealerChair.hands[0].cards[0]}get roundInitialCost(){let e=0;for(const n of this.playerChairArray)e+=n.bet;return e}get playerChairArray(){return Object.values(this.playerChairs).filter(e=>e!==null)}get activeChair(){return this.playerChairArray[this.chairTurnIndex]}get aPlayerHasCards(){return this.playerChairArray.some(e=>e.hands.some(n=>n.cards.length>0))}get playerRoundsComplete(){return this.dealerPeekedBlackjack||!this.playerChairArray.find(e=>!e.chairDone)}view(){if(this.dealerChair.hands[0]?.cards.length<1||this.playerChairArray[0]?.hands[0]?.cards.length<1)throw new Error("could not find active hands");for(let e of this.playerChairArray)e.view(e===this.activeChair,this.playerRoundsComplete?this.dealerChair.hands[0]:null);if(this.playerRoundsComplete)console.log("Dealer Chair:",this.dealerChair.hands.map(e=>e.cards.map(n=>`${n.rank}${n.suitSymbol}`).join(", ")).join(" | "));else{const e=this.dealerChair.hands[0].cards[0];console.log(`Dealer Chair: ${e.rank}${e.suitSymbol}, [Hidden]`)}}addPlayerChair(e){const n=new Ah;this.playerChairs[e??this.chairIndex]=n,this.chairIndex++;const r={model:"table",event:Ms,value:n,previous:void 0,target:this};ae.emit(is,r),ae.emit(Gn("table",Ms),r)}getPlayerChair(e){return this.playerChairs[e]??null}removePlayerChair(e){const n=this.playerChairs[e];if(!n)throw new Error("No chair at this index");this.playerChairs[e]=null;const r={model:"table",event:Ms,value:null,previous:n,target:this};ae.emit(is,r),ae.emit(Gn("table",Ms),r)}deal(e,n=1){for(let r=0;r<n;r++)e.deal(this.dealer.dealCard())}startRound(){const e=this.validateRoundCanStart();if(e)throw new Error(e);ke.getInstance().player.removeMoney(this.roundInitialCost),this.dealerChair.start(),this.deal(this.dealerChair,2);for(let n of this.playerChairArray)n.start(),this.deal(n,2);this.chairTurnIndex=-1,this.dealerPeekedBlackjack&&(this.chairTurnIndex=this.playerChairArray.length),this.nextChair(),this.configuration.logAfterAction&&this.view(),this.dealer.holeCardHidden=!this.playerRoundsComplete,this.updateRunningCount(),this.activeChair||this.payout()}updateRunningCount(){if(this.dealer.holeCardHidden){const e=ke.getInstance().table.dealerChair.hands[0]?.cards[1],n=e?Oo.getCountDelta(e):0;this.runningCount=this.dealer.trueRunningCount-n}else this.runningCount=this.dealer.trueRunningCount}act(e){if(!this.dealerChair.activeHand)throw new Error("Round not started");if(!this.activeChair)throw new Error("No active chair");this.activeChair.act(e,this.dealer),this.activeChair.activeHand===void 0&&this.nextChair(),this.playerRoundsComplete&&this.dealer.completeDealerHand(this.dealerChair.activeHand),this.updateRunningCount(),this.configuration.logAfterAction&&this.view(),this.activeChair||this.payout()}nextChair(){if(this.chairTurnIndex++,this.activeChair&&this.activeChair.chairDone){this.nextChair();return}}payout(){if(this.chairTurnIndex<this.playerChairArray.length)throw new Error("Round still in progress");for(let e of this.playerChairArray){const n=e.payout(this.dealerChair.hands[0]);n>0&&ke.getInstance().player.addMoney(n)}this.resetAllChairs(),this.chairTurnIndex=0}resetAllChairs(){this.dealerChair.start();for(let e of this.playerChairArray)e.start()}validateRoundCanStart(){if(this.dealerChair.hands[0]?.cards.length>0)return"Round already in progress";if(this.playerChairArray.length===0)return"No players at the table";if(this.roundInitialCost>ke.getInstance().player.balance)return"Player does not have enough balance for the round";if(this.roundInitialCost<=0)return"No bets placed";for(const e of this.playerChairArray)if(e.bet<0)return"No negative bets allowed";for(const e of this.playerChairArray)if(e.bet<=0)return"All chairs must have a bet placed";return this.dealer.pastPenetration()?"Dealer is out of cards, needs to reshuffle":null}};Mc(ev,{model:"table",props:["chairTurnIndex","runningCount"],trackInstance:!1});class ke{static initialize(e){this.instance=e}static getInstance(){if(!ke.instance)throw new Error("Session not initialized");return ke.instance}constructor({player:e,rules:n,table:r}){this.player=e,this.rules=n,this.table=r}}const Au="play",Ya="reshuffle",xi="playerAction",Sh=bc("chairs",()=>{const t=He(null),e=ps({}),n=oe(()=>{const j=t.value;return typeof j!="number"?null:e[j]}),r=new Map,s=[],i=ke.getInstance().table,o=oe(()=>Object.values(e).some(j=>j.modelHands.some(K=>K.length>0))),c=j=>j.map(K=>[...K]),l=j=>j.hands.map(K=>[...K.cards]),u=new Set(["Win","Double_Win"]),d=new Set(["Lose","Double_Lose"]),f=new Set(["Surrendered"]),g=new Set(["Push","Double_Push"]),_={Lose:1,Double_Lose:2},R={Win:2,Double_Win:4},P=1+ke.getInstance().rules.blackjackPayout,k=(j,K)=>{if(!j)return 0;const Z=K/100;return Z<=0?0:f.has(j)?Z/2:d.has(j)?(_[j]??1)*Z:u.has(j)?(R[j]??2)*Z:g.has(j)?0:j==="BlackJack_Win"?Math.floor(Z*P):0},O=j=>j.hands.map(K=>{const Z=K.lastOutcome??null;return{result:Z,amount:k(Z,j.bet??0)}}),V=j=>j.reduce((K,Z)=>K+Z.length,0),F=j=>{if(!j)return null;for(const[K,Z]of r.entries())if(Z.chair===j)return K;for(const[K,Z]of Object.entries(i.playerChairs))if(Z===j)return Number(K);return null},M=(j,K=!1)=>{const Z=e[j],ve=r.get(j);if(!Z||!ve)return;const Ae=l(ve.chair),Qe=O(ve.chair);Z.modelHands=c(Ae);const Je=V(Ae),x=V(Z.hands),ee=ve.chair.activeHandIndex;if(!(Je===0&&x>0&&!K)){if(Ae.length===0){Z.clampedActiveHandIndex=null,Z.hands=[],Z.handResults=[];return}Z.clampedActiveHandIndex=Math.min(Math.max(ee,0),Ae.length-1),Z.hands=c(Ae),Z.handResults=[...Qe]}},X=()=>{for(const j of Object.keys(e).map(Number))M(j,!0)};ae.on(os(Ya),()=>{X()});const se=(j,K)=>{const Z=j.handListeners.get(K);if(Z)try{Z()}finally{j.handListeners.delete(K)}},S=(j,K)=>{const Z=r.get(j);if(!Z)return;const ve=zn(K);if(!ve)throw new Error("Hand instance ID not found");if(Z.handListeners.has(ve))return;const Ae=()=>{M(j)},Qe=qn("hand",Ws,ve),Je=qn("hand",ma,ve),x=qn("hand",_a,ve);ae.on(Qe,Ae),ae.on(Je,Ae),ae.on(x,Ae),Z.handListeners.set(ve,()=>{ae.off(Qe,Ae),ae.off(Je,Ae),ae.off(x,Ae)})},E=j=>{const K=r.get(j);if(!K)return;const Z=K.chair,ve=new Set;for(const Ae of Z.hands){const Qe=zn(Ae);if(!Qe)throw new Error("Hand instance ID not found");ve.add(Qe),S(j,Ae)}for(const Ae of[...K.handListeners.keys()])ve.has(Ae)||se(K,Ae);M(j)},y=j=>{const K=r.get(j);if(K){for(const Z of K.cleanupFns)try{Z()}catch(ve){console.error("Failed to cleanup chair listener",ve)}K.cleanupFns.length=0;for(const Z of[...K.handListeners.keys()])se(K,Z);r.delete(j),delete e[j]}},I=(j,K)=>{y(j);const Z=zn(K);if(!Z)throw new Error("Chair instance ID not found");const ve=l(K),Ae=O(K);e[j]={hands:ve,modelHands:c(ve),handResults:[...Ae],activeHandIndex:K.activeHandIndex,bet:K.bet??0,clampedActiveHandIndex:ve.length>0?Math.min(Math.max(K.activeHandIndex,0),ve.length-1):null};const Qe={chair:K,chairInstanceId:Z,handListeners:new Map,cleanupFns:[]},Je=Ka("chair","activeHandIndex",Z),x=w=>{const A=e[j];if(!A)return;const C=typeof w.value=="number"?w.value:Number(w.value??A.activeHandIndex);A.activeHandIndex=Number.isNaN(C)?A.activeHandIndex:C,E(j)};ae.on(Je,x),Qe.cleanupFns.push(()=>ae.off(Je,x));const ee=Ka("chair","bet",Z),J=w=>{const A=e[j];if(!A)return;const C=typeof w.value=="number"?w.value:Number(w.value??A.bet);A.bet=Number.isNaN(C)?A.bet:C};ae.on(ee,J),Qe.cleanupFns.push(()=>ae.off(ee,J));const ce=qn("chair",ya,Z),Re=w=>{const A=w.value;A&&S(j,A),M(j)};ae.on(ce,Re),Qe.cleanupFns.push(()=>ae.off(ce,Re)),r.set(j,Qe),E(j)},T=()=>{for(const[j,K]of Object.entries(i.playerChairs))K&&I(Number(j),K)},b=j=>{const K=j.value,Z=j.previous;if(Z){const ve=F(Z);ve!==null&&y(ve)}if(K){const ve=F(K);if(ve===null)throw new Error("Could not determine chair index for new chair");I(ve,K)}},v=Gn("table",Ms);ae.on(v,b),s.push(()=>ae.off(v,b));const me=on("table","chairTurnIndex"),Ve=j=>{const K=typeof j.value=="number"?j.value:Number(j.value??-1);t.value=K>=0?K:null};return ae.on(me,Ve),s.push(()=>ae.off(me,Ve)),t.value=i.chairTurnIndex>=0?i.chairTurnIndex:null,T(),So(()=>{for(const j of s)try{j()}catch(K){console.error("Failed to cleanup chair store listener",K)}s.length=0;for(const j of[...r.keys()])y(j)}),{activeChairId:t,activeChair:n,getChairView:j=>e[j]??null,roundInProgress:o,sit:j=>{o.value||ke.getInstance().table.addPlayerChair(j)},adjustBet:(j,K)=>{if(o.value)return;const Z=r.get(j)?.chair;Z&&(Z.bet=Math.max(K,0))},leave:j=>{o.value||ke.getInstance().table.removePlayerChair(j)}}}),g1=["aria-current"],m1={class:"hand__top","aria-label":"Inactive hands"},_1={class:"hand__top-stack hand__top-stack--left","aria-label":"Hands before active"},y1={key:0,class:"hand__ellipsis","aria-hidden":"true"},v1=["aria-pressed"],E1={class:"hand__entry-body"},I1={key:1,class:"hand__surrender-flag","aria-hidden":"true"},T1={key:2,class:"hand__bj-win","aria-hidden":"true"},w1={class:"hand__top-stack hand__top-stack--right","aria-label":"Hands after active"},b1={key:0,class:"hand__ellipsis","aria-hidden":"true"},A1=["aria-pressed"],S1={class:"hand__entry-body"},C1={key:1,class:"hand__surrender-flag","aria-hidden":"true"},R1={key:2,class:"hand__bj-win","aria-hidden":"true"},P1={class:"hand",role:"group","aria-label":"Card hands"},k1={key:0,class:"hand__frame"},D1={class:"hand__entry-body"},N1={key:1,class:"hand__surrender-flag","aria-hidden":"true"},O1={key:2,class:"hand__bj-win","aria-hidden":"true"},Qp=8,Jp=2,V1=At({__name:"Chair",props:{chairId:{},maxWidth:{},initialActiveHand:{}},setup(t){const n=64*wh/2,r=new Set(["Win","Double_Win"]),s=new Set(["Surrendered"]),i=new Set(["BlackJack_Win"]),o=new Set(["Lose","Double_Lose"]),c=new Set(["Push","Double_Push"]),l=t,u=He(null),d=Sh(),f=oe(()=>d.activeChairId===l.chairId),g=oe(()=>d.getChairView(l.chairId)),_=oe(()=>!d.roundInProgress),R=oe(()=>g.value?.hands.slice(0,Qp)??[]),P=oe(()=>g.value?.handResults.slice(0,Qp)??[]),k=oe(()=>l.maxWidth),O=oe(()=>g.value?.bet??0),V=oe(()=>R.value.map((Q,ne)=>{const ie=P.value[ne]??null,j=ie?.result??null,K=ie?.amount??0,Z=Q.length>0;return{hand:Q,index:ne,result:j,resultAmount:K,showResultHighlight:!!(j&&Z)}})),F=oe(()=>{const Q=g.value;if(!Q)return u.value=null,0;const{hands:ne,activeHandIndex:ie,clampedActiveHandIndex:j}=Q,K=ne.length;if(j!==null?j>=0&&j<K:ie>=0&&ie<K){const Ae=j!==null?j:ie;return u.value=Ae,Ae}if(K===0)return u.value=null,0;const ve=u.value!==null&&u.value<K?u.value:K-1;return u.value=ve,ve}),M=oe(()=>V.value.find(Q=>Q.index===F.value)??null),X=F,se=oe(()=>V.value.filter(Q=>Q.index<F.value)),S=oe(()=>V.value.filter(Q=>Q.index>F.value)),E=oe(()=>se.value.slice(Math.max(se.value.length-Jp,0),se.value.length)),y=oe(()=>S.value.slice(0,Math.min(Jp,S.value.length)).reverse()),I=oe(()=>Math.max(se.value.length-E.value.length,0)),T=oe(()=>Math.max(S.value.length-y.value.length,0)),b=Q=>Q.map((ne,ie,j)=>({...ne,style:{marginTop:ie===0?"0":`-${n}px`,zIndex:j.length-ie}})),v=oe(()=>b(E.value)),me=oe(()=>b(y.value)),Ve=Q=>{d.adjustBet(l.chairId,Q)},Se=Q=>{const ne=!!Q?.hand.length,ie=!!(Q?.result&&r.has(Q.result)&&ne),j=!!(Q?.result&&o.has(Q.result)&&ne),K=!!(Q?.result&&c.has(Q.result)&&ne),Z=!!(Q?.result&&s.has(Q.result)&&ne),ve=!!(Q?.result&&i.has(Q.result)&&ne),Ae=!!Q?.showResultHighlight;return{"hand__entry--win":ie,"hand__entry--lose":j,"hand__entry--push":K,"hand__entry--surrender":Z,"hand__entry--bj-win":ve,"hand__entry--bj-win-active":!!(ve&&Ae),"hand__entry--win-active":!!(ie&&Ae),"hand__entry--loss-active":!!(j&&Ae),"hand__entry--push-active":!!(K&&Ae),"hand__entry--surrender-active":!!(Z&&Ae)}};return bn(()=>R.value.length,Q=>{Q===0&&(u.value=null)}),(Q,ne)=>(ge(),be("div",{class:Bn(["chair",{"chair--active":f.value}]),"aria-label":"Player Spot","aria-current":f.value?"true":void 0},[nt(d).roundInProgress?vt("",!0):(ge(),be("button",{key:0,class:"chair__deactivate",type:"button","aria-label":"Make this chair inactive",onClick:ne[0]||(ne[0]=ie=>nt(d).leave(l.chairId))}," × ")),Ee("div",m1,[Ee("div",_1,[I.value>0?(ge(),be("span",y1,Bt(".".repeat(I.value)),1)):vt("",!0),(ge(!0),be(Tt,null,ao(v.value,ie=>(ge(),be("div",{key:ie.index,class:Bn(["hand__entry","hand__entry--stack",Se(ie)]),type:"button",role:"listitem",style:Qn(ie.style),"aria-pressed":ie.index===nt(X)},[Ee("div",E1,[st(ga,{cards:ie.hand,maxWidth:k.value},null,8,["cards","maxWidth"]),ie.result&&ie.resultAmount>0?(ge(),Wn(Bl,{key:0,amount:ie.resultAmount,active:ie.showResultHighlight,result:ie.result},null,8,["amount","active","result"])):vt("",!0),ie?.result&&nt(s).has(ie.result)&&ie.showResultHighlight?(ge(),be("div",I1,[...ne[1]||(ne[1]=[Ee("img",{src:Ll,alt:"Surrender flag"},null,-1)])])):vt("",!0),ie?.result&&nt(i).has(ie.result)&&ie.showResultHighlight?(ge(),be("div",T1,[...ne[2]||(ne[2]=[Ee("img",{src:Fl,alt:"Blackjack win animation"},null,-1)])])):vt("",!0)])],14,v1))),128))]),Ee("div",w1,[T.value>0?(ge(),be("span",b1,Bt(".".repeat(T.value)),1)):vt("",!0),(ge(!0),be(Tt,null,ao(me.value,ie=>(ge(),be("div",{key:ie.index,class:Bn(["hand__entry","hand__entry--stack",Se(ie)]),type:"button",role:"listitem",style:Qn(ie.style),"aria-pressed":ie.index===nt(X)},[Ee("div",S1,[st(ga,{cards:ie.hand,maxWidth:k.value},null,8,["cards","maxWidth"]),ie.result&&ie.resultAmount>0?(ge(),Wn(Bl,{key:0,amount:ie.resultAmount,active:ie.showResultHighlight,result:ie.result},null,8,["amount","active","result"])):vt("",!0),ie?.result&&nt(s).has(ie.result)&&ie.showResultHighlight?(ge(),be("div",C1,[...ne[3]||(ne[3]=[Ee("img",{src:Ll,alt:"Surrender flag"},null,-1)])])):vt("",!0),ie?.result&&nt(i).has(ie.result)&&ie.showResultHighlight?(ge(),be("div",R1,[...ne[4]||(ne[4]=[Ee("img",{src:Fl,alt:"Blackjack win animation"},null,-1)])])):vt("",!0)])],14,A1))),128))])]),Ee("div",P1,[M.value?(ge(),be("div",k1,[Ee("button",{class:Bn(["hand__entry","hand__entry--active",Se(M.value)]),type:"button","aria-pressed":!0},[Ee("div",D1,[st(ga,{cards:M.value.hand,large:!0,maxWidth:k.value},null,8,["cards","maxWidth"]),M.value.result&&M.value.resultAmount>0?(ge(),Wn(Bl,{key:0,amount:M.value.resultAmount,active:M.value.showResultHighlight,result:M.value.result},null,8,["amount","active","result"])):vt("",!0),M.value?.result&&nt(s).has(M.value.result)&&M.value.showResultHighlight?(ge(),be("div",N1,[...ne[5]||(ne[5]=[Ee("img",{src:Ll,alt:"Surrender flag"},null,-1)])])):vt("",!0),M.value?.result&&nt(i).has(M.value.result)&&M.value.showResultHighlight?(ge(),be("div",O1,[...ne[6]||(ne[6]=[Ee("img",{src:Fl,alt:"Blackjack win animation"},null,-1)])])):vt("",!0)])],2)])):vt("",!0)]),st(zP,{"initial-value":O.value,onChange:Ve,disabled:!_.value},null,8,["initial-value","disabled"])],10,g1))}}),x1=qt(V1,[["__scopeId","data-v-e7b6d617"]]),M1={class:"chair","aria-label":"Player Spot",style:{width:"272px"}},L1=["disabled"],F1={key:0,class:"chair__inactive-label"},U1={key:1,"aria-hidden":"true"},H1=At({__name:"InactiveChair",props:{chairId:{}},setup(t){const e=t,n=Sh(),r=()=>{n.roundInProgress||n.sit(e.chairId)};return(s,i)=>(ge(),be("div",M1,[Ee("button",{class:"chair__empty-button",type:"button","aria-label":"Sit at this chair",disabled:nt(n).roundInProgress,onClick:r},[nt(n).roundInProgress?(ge(),be("span",F1," Round Active ")):(ge(),be("span",U1,"+"))],8,L1)]))}}),B1=qt(H1,[["__scopeId","data-v-003a3a6f"]]);var Yp=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Cr,tv;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(S,E){function y(){}y.prototype=E.prototype,S.F=E.prototype,S.prototype=new y,S.prototype.constructor=S,S.D=function(I,T,b){for(var v=Array(arguments.length-2),me=2;me<arguments.length;me++)v[me-2]=arguments[me];return E.prototype[T].apply(I,v)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,n),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(S,E,y){y||(y=0);const I=Array(16);if(typeof E=="string")for(var T=0;T<16;++T)I[T]=E.charCodeAt(y++)|E.charCodeAt(y++)<<8|E.charCodeAt(y++)<<16|E.charCodeAt(y++)<<24;else for(T=0;T<16;++T)I[T]=E[y++]|E[y++]<<8|E[y++]<<16|E[y++]<<24;E=S.g[0],y=S.g[1],T=S.g[2];let b=S.g[3],v;v=E+(b^y&(T^b))+I[0]+3614090360&4294967295,E=y+(v<<7&4294967295|v>>>25),v=b+(T^E&(y^T))+I[1]+3905402710&4294967295,b=E+(v<<12&4294967295|v>>>20),v=T+(y^b&(E^y))+I[2]+606105819&4294967295,T=b+(v<<17&4294967295|v>>>15),v=y+(E^T&(b^E))+I[3]+3250441966&4294967295,y=T+(v<<22&4294967295|v>>>10),v=E+(b^y&(T^b))+I[4]+4118548399&4294967295,E=y+(v<<7&4294967295|v>>>25),v=b+(T^E&(y^T))+I[5]+1200080426&4294967295,b=E+(v<<12&4294967295|v>>>20),v=T+(y^b&(E^y))+I[6]+2821735955&4294967295,T=b+(v<<17&4294967295|v>>>15),v=y+(E^T&(b^E))+I[7]+4249261313&4294967295,y=T+(v<<22&4294967295|v>>>10),v=E+(b^y&(T^b))+I[8]+1770035416&4294967295,E=y+(v<<7&4294967295|v>>>25),v=b+(T^E&(y^T))+I[9]+2336552879&4294967295,b=E+(v<<12&4294967295|v>>>20),v=T+(y^b&(E^y))+I[10]+4294925233&4294967295,T=b+(v<<17&4294967295|v>>>15),v=y+(E^T&(b^E))+I[11]+2304563134&4294967295,y=T+(v<<22&4294967295|v>>>10),v=E+(b^y&(T^b))+I[12]+1804603682&4294967295,E=y+(v<<7&4294967295|v>>>25),v=b+(T^E&(y^T))+I[13]+4254626195&4294967295,b=E+(v<<12&4294967295|v>>>20),v=T+(y^b&(E^y))+I[14]+2792965006&4294967295,T=b+(v<<17&4294967295|v>>>15),v=y+(E^T&(b^E))+I[15]+1236535329&4294967295,y=T+(v<<22&4294967295|v>>>10),v=E+(T^b&(y^T))+I[1]+4129170786&4294967295,E=y+(v<<5&4294967295|v>>>27),v=b+(y^T&(E^y))+I[6]+3225465664&4294967295,b=E+(v<<9&4294967295|v>>>23),v=T+(E^y&(b^E))+I[11]+643717713&4294967295,T=b+(v<<14&4294967295|v>>>18),v=y+(b^E&(T^b))+I[0]+3921069994&4294967295,y=T+(v<<20&4294967295|v>>>12),v=E+(T^b&(y^T))+I[5]+3593408605&4294967295,E=y+(v<<5&4294967295|v>>>27),v=b+(y^T&(E^y))+I[10]+38016083&4294967295,b=E+(v<<9&4294967295|v>>>23),v=T+(E^y&(b^E))+I[15]+3634488961&4294967295,T=b+(v<<14&4294967295|v>>>18),v=y+(b^E&(T^b))+I[4]+3889429448&4294967295,y=T+(v<<20&4294967295|v>>>12),v=E+(T^b&(y^T))+I[9]+568446438&4294967295,E=y+(v<<5&4294967295|v>>>27),v=b+(y^T&(E^y))+I[14]+3275163606&4294967295,b=E+(v<<9&4294967295|v>>>23),v=T+(E^y&(b^E))+I[3]+4107603335&4294967295,T=b+(v<<14&4294967295|v>>>18),v=y+(b^E&(T^b))+I[8]+1163531501&4294967295,y=T+(v<<20&4294967295|v>>>12),v=E+(T^b&(y^T))+I[13]+2850285829&4294967295,E=y+(v<<5&4294967295|v>>>27),v=b+(y^T&(E^y))+I[2]+4243563512&4294967295,b=E+(v<<9&4294967295|v>>>23),v=T+(E^y&(b^E))+I[7]+1735328473&4294967295,T=b+(v<<14&4294967295|v>>>18),v=y+(b^E&(T^b))+I[12]+2368359562&4294967295,y=T+(v<<20&4294967295|v>>>12),v=E+(y^T^b)+I[5]+4294588738&4294967295,E=y+(v<<4&4294967295|v>>>28),v=b+(E^y^T)+I[8]+2272392833&4294967295,b=E+(v<<11&4294967295|v>>>21),v=T+(b^E^y)+I[11]+1839030562&4294967295,T=b+(v<<16&4294967295|v>>>16),v=y+(T^b^E)+I[14]+4259657740&4294967295,y=T+(v<<23&4294967295|v>>>9),v=E+(y^T^b)+I[1]+2763975236&4294967295,E=y+(v<<4&4294967295|v>>>28),v=b+(E^y^T)+I[4]+1272893353&4294967295,b=E+(v<<11&4294967295|v>>>21),v=T+(b^E^y)+I[7]+4139469664&4294967295,T=b+(v<<16&4294967295|v>>>16),v=y+(T^b^E)+I[10]+3200236656&4294967295,y=T+(v<<23&4294967295|v>>>9),v=E+(y^T^b)+I[13]+681279174&4294967295,E=y+(v<<4&4294967295|v>>>28),v=b+(E^y^T)+I[0]+3936430074&4294967295,b=E+(v<<11&4294967295|v>>>21),v=T+(b^E^y)+I[3]+3572445317&4294967295,T=b+(v<<16&4294967295|v>>>16),v=y+(T^b^E)+I[6]+76029189&4294967295,y=T+(v<<23&4294967295|v>>>9),v=E+(y^T^b)+I[9]+3654602809&4294967295,E=y+(v<<4&4294967295|v>>>28),v=b+(E^y^T)+I[12]+3873151461&4294967295,b=E+(v<<11&4294967295|v>>>21),v=T+(b^E^y)+I[15]+530742520&4294967295,T=b+(v<<16&4294967295|v>>>16),v=y+(T^b^E)+I[2]+3299628645&4294967295,y=T+(v<<23&4294967295|v>>>9),v=E+(T^(y|~b))+I[0]+4096336452&4294967295,E=y+(v<<6&4294967295|v>>>26),v=b+(y^(E|~T))+I[7]+1126891415&4294967295,b=E+(v<<10&4294967295|v>>>22),v=T+(E^(b|~y))+I[14]+2878612391&4294967295,T=b+(v<<15&4294967295|v>>>17),v=y+(b^(T|~E))+I[5]+4237533241&4294967295,y=T+(v<<21&4294967295|v>>>11),v=E+(T^(y|~b))+I[12]+1700485571&4294967295,E=y+(v<<6&4294967295|v>>>26),v=b+(y^(E|~T))+I[3]+2399980690&4294967295,b=E+(v<<10&4294967295|v>>>22),v=T+(E^(b|~y))+I[10]+4293915773&4294967295,T=b+(v<<15&4294967295|v>>>17),v=y+(b^(T|~E))+I[1]+2240044497&4294967295,y=T+(v<<21&4294967295|v>>>11),v=E+(T^(y|~b))+I[8]+1873313359&4294967295,E=y+(v<<6&4294967295|v>>>26),v=b+(y^(E|~T))+I[15]+4264355552&4294967295,b=E+(v<<10&4294967295|v>>>22),v=T+(E^(b|~y))+I[6]+2734768916&4294967295,T=b+(v<<15&4294967295|v>>>17),v=y+(b^(T|~E))+I[13]+1309151649&4294967295,y=T+(v<<21&4294967295|v>>>11),v=E+(T^(y|~b))+I[4]+4149444226&4294967295,E=y+(v<<6&4294967295|v>>>26),v=b+(y^(E|~T))+I[11]+3174756917&4294967295,b=E+(v<<10&4294967295|v>>>22),v=T+(E^(b|~y))+I[2]+718787259&4294967295,T=b+(v<<15&4294967295|v>>>17),v=y+(b^(T|~E))+I[9]+3951481745&4294967295,S.g[0]=S.g[0]+E&4294967295,S.g[1]=S.g[1]+(T+(v<<21&4294967295|v>>>11))&4294967295,S.g[2]=S.g[2]+T&4294967295,S.g[3]=S.g[3]+b&4294967295}r.prototype.v=function(S,E){E===void 0&&(E=S.length);const y=E-this.blockSize,I=this.C;let T=this.h,b=0;for(;b<E;){if(T==0)for(;b<=y;)s(this,S,b),b+=this.blockSize;if(typeof S=="string"){for(;b<E;)if(I[T++]=S.charCodeAt(b++),T==this.blockSize){s(this,I),T=0;break}}else for(;b<E;)if(I[T++]=S[b++],T==this.blockSize){s(this,I),T=0;break}}this.h=T,this.o+=E},r.prototype.A=function(){var S=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);S[0]=128;for(var E=1;E<S.length-8;++E)S[E]=0;E=this.o*8;for(var y=S.length-8;y<S.length;++y)S[y]=E&255,E/=256;for(this.v(S),S=Array(16),E=0,y=0;y<4;++y)for(let I=0;I<32;I+=8)S[E++]=this.g[y]>>>I&255;return S};function i(S,E){var y=c;return Object.prototype.hasOwnProperty.call(y,S)?y[S]:y[S]=E(S)}function o(S,E){this.h=E;const y=[];let I=!0;for(let T=S.length-1;T>=0;T--){const b=S[T]|0;I&&b==E||(y[T]=b,I=!1)}this.g=y}var c={};function l(S){return-128<=S&&S<128?i(S,function(E){return new o([E|0],E<0?-1:0)}):new o([S|0],S<0?-1:0)}function u(S){if(isNaN(S)||!isFinite(S))return f;if(S<0)return k(u(-S));const E=[];let y=1;for(let I=0;S>=y;I++)E[I]=S/y|0,y*=4294967296;return new o(E,0)}function d(S,E){if(S.length==0)throw Error("number format error: empty string");if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(S.charAt(0)=="-")return k(d(S.substring(1),E));if(S.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=u(Math.pow(E,8));let I=f;for(let b=0;b<S.length;b+=8){var T=Math.min(8,S.length-b);const v=parseInt(S.substring(b,b+T),E);T<8?(T=u(Math.pow(E,T)),I=I.j(T).add(u(v))):(I=I.j(y),I=I.add(u(v)))}return I}var f=l(0),g=l(1),_=l(16777216);t=o.prototype,t.m=function(){if(P(this))return-k(this).m();let S=0,E=1;for(let y=0;y<this.g.length;y++){const I=this.i(y);S+=(I>=0?I:4294967296+I)*E,E*=4294967296}return S},t.toString=function(S){if(S=S||10,S<2||36<S)throw Error("radix out of range: "+S);if(R(this))return"0";if(P(this))return"-"+k(this).toString(S);const E=u(Math.pow(S,6));var y=this;let I="";for(;;){const T=M(y,E).g;y=O(y,T.j(E));let b=((y.g.length>0?y.g[0]:y.h)>>>0).toString(S);if(y=T,R(y))return b+I;for(;b.length<6;)b="0"+b;I=b+I}},t.i=function(S){return S<0?0:S<this.g.length?this.g[S]:this.h};function R(S){if(S.h!=0)return!1;for(let E=0;E<S.g.length;E++)if(S.g[E]!=0)return!1;return!0}function P(S){return S.h==-1}t.l=function(S){return S=O(this,S),P(S)?-1:R(S)?0:1};function k(S){const E=S.g.length,y=[];for(let I=0;I<E;I++)y[I]=~S.g[I];return new o(y,~S.h).add(g)}t.abs=function(){return P(this)?k(this):this},t.add=function(S){const E=Math.max(this.g.length,S.g.length),y=[];let I=0;for(let T=0;T<=E;T++){let b=I+(this.i(T)&65535)+(S.i(T)&65535),v=(b>>>16)+(this.i(T)>>>16)+(S.i(T)>>>16);I=v>>>16,b&=65535,v&=65535,y[T]=v<<16|b}return new o(y,y[y.length-1]&-2147483648?-1:0)};function O(S,E){return S.add(k(E))}t.j=function(S){if(R(this)||R(S))return f;if(P(this))return P(S)?k(this).j(k(S)):k(k(this).j(S));if(P(S))return k(this.j(k(S)));if(this.l(_)<0&&S.l(_)<0)return u(this.m()*S.m());const E=this.g.length+S.g.length,y=[];for(var I=0;I<2*E;I++)y[I]=0;for(I=0;I<this.g.length;I++)for(let T=0;T<S.g.length;T++){const b=this.i(I)>>>16,v=this.i(I)&65535,me=S.i(T)>>>16,Ve=S.i(T)&65535;y[2*I+2*T]+=v*Ve,V(y,2*I+2*T),y[2*I+2*T+1]+=b*Ve,V(y,2*I+2*T+1),y[2*I+2*T+1]+=v*me,V(y,2*I+2*T+1),y[2*I+2*T+2]+=b*me,V(y,2*I+2*T+2)}for(S=0;S<E;S++)y[S]=y[2*S+1]<<16|y[2*S];for(S=E;S<2*E;S++)y[S]=0;return new o(y,0)};function V(S,E){for(;(S[E]&65535)!=S[E];)S[E+1]+=S[E]>>>16,S[E]&=65535,E++}function F(S,E){this.g=S,this.h=E}function M(S,E){if(R(E))throw Error("division by zero");if(R(S))return new F(f,f);if(P(S))return E=M(k(S),E),new F(k(E.g),k(E.h));if(P(E))return E=M(S,k(E)),new F(k(E.g),E.h);if(S.g.length>30){if(P(S)||P(E))throw Error("slowDivide_ only works with positive integers.");for(var y=g,I=E;I.l(S)<=0;)y=X(y),I=X(I);var T=se(y,1),b=se(I,1);for(I=se(I,2),y=se(y,2);!R(I);){var v=b.add(I);v.l(S)<=0&&(T=T.add(y),b=v),I=se(I,1),y=se(y,1)}return E=O(S,T.j(E)),new F(T,E)}for(T=f;S.l(E)>=0;){for(y=Math.max(1,Math.floor(S.m()/E.m())),I=Math.ceil(Math.log(y)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),b=u(y),v=b.j(E);P(v)||v.l(S)>0;)y-=I,b=u(y),v=b.j(E);R(b)&&(b=g),T=T.add(b),S=O(S,v)}return new F(T,S)}t.B=function(S){return M(this,S).h},t.and=function(S){const E=Math.max(this.g.length,S.g.length),y=[];for(let I=0;I<E;I++)y[I]=this.i(I)&S.i(I);return new o(y,this.h&S.h)},t.or=function(S){const E=Math.max(this.g.length,S.g.length),y=[];for(let I=0;I<E;I++)y[I]=this.i(I)|S.i(I);return new o(y,this.h|S.h)},t.xor=function(S){const E=Math.max(this.g.length,S.g.length),y=[];for(let I=0;I<E;I++)y[I]=this.i(I)^S.i(I);return new o(y,this.h^S.h)};function X(S){const E=S.g.length+1,y=[];for(let I=0;I<E;I++)y[I]=S.i(I)<<1|S.i(I-1)>>>31;return new o(y,S.h)}function se(S,E){const y=E>>5;E%=32;const I=S.g.length-y,T=[];for(let b=0;b<I;b++)T[b]=E>0?S.i(b+y)>>>E|S.i(b+y+1)<<32-E:S.i(b+y);return new o(T,S.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,tv=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=d,Cr=o}).apply(typeof Yp<"u"?Yp:typeof self<"u"?self:typeof window<"u"?window:{});var na=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var nv,Mi,rv,va,Su,sv,iv,ov;(function(){var t,e=Object.defineProperty;function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof na=="object"&&na];for(var h=0;h<a.length;++h){var p=a[h];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var r=n(this);function s(a,h){if(h)e:{var p=r;a=a.split(".");for(var m=0;m<a.length-1;m++){var D=a[m];if(!(D in p))break e;p=p[D]}a=a[a.length-1],m=p[a],h=h(m),h!=m&&h!=null&&e(p,a,{configurable:!0,writable:!0,value:h})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(h){var p=[],m;for(m in h)Object.prototype.hasOwnProperty.call(h,m)&&p.push([m,h[m]]);return p}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function l(a,h,p){return a.call.apply(a.bind,arguments)}function u(a,h,p){return u=l,u.apply(null,arguments)}function d(a,h){var p=Array.prototype.slice.call(arguments,1);return function(){var m=p.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function f(a,h){function p(){}p.prototype=h.prototype,a.Z=h.prototype,a.prototype=new p,a.prototype.constructor=a,a.Ob=function(m,D,N){for(var z=Array(arguments.length-2),Ce=2;Ce<arguments.length;Ce++)z[Ce-2]=arguments[Ce];return h.prototype[D].apply(m,z)}}var g=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function _(a){const h=a.length;if(h>0){const p=Array(h);for(let m=0;m<h;m++)p[m]=a[m];return p}return[]}function R(a,h){for(let m=1;m<arguments.length;m++){const D=arguments[m];var p=typeof D;if(p=p!="object"?p:D?Array.isArray(D)?"array":p:"null",p=="array"||p=="object"&&typeof D.length=="number"){p=a.length||0;const N=D.length||0;a.length=p+N;for(let z=0;z<N;z++)a[p+z]=D[z]}else a.push(D)}}class P{constructor(h,p){this.i=h,this.j=p,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function k(a){o.setTimeout(()=>{throw a},0)}function O(){var a=S;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class V{constructor(){this.h=this.g=null}add(h,p){const m=F.get();m.set(h,p),this.h?this.h.next=m:this.g=m,this.h=m}}var F=new P(()=>new M,a=>a.reset());class M{constructor(){this.next=this.g=this.h=null}set(h,p){this.h=h,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let X,se=!1,S=new V,E=()=>{const a=Promise.resolve(void 0);X=()=>{a.then(y)}};function y(){for(var a;a=O();){try{a.h.call(a.g)}catch(p){k(p)}var h=F;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}se=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var b=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const p=()=>{};o.addEventListener("test",p,h),o.removeEventListener("test",p,h)}catch{}return a})();function v(a){return/^[\s\xa0]*$/.test(a)}function me(a,h){T.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}f(me,T),me.prototype.init=function(a,h){const p=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(p=="mouseover"?h=a.fromElement:p=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&me.Z.h.call(this)},me.prototype.h=function(){me.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Ve="closure_listenable_"+(Math.random()*1e6|0),Se=0;function Q(a,h,p,m,D){this.listener=a,this.proxy=null,this.src=h,this.type=p,this.capture=!!m,this.ha=D,this.key=++Se,this.da=this.fa=!1}function ne(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function ie(a,h,p){for(const m in a)h.call(p,a[m],m,a)}function j(a,h){for(const p in a)h.call(void 0,a[p],p,a)}function K(a){const h={};for(const p in a)h[p]=a[p];return h}const Z="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function ve(a,h){let p,m;for(let D=1;D<arguments.length;D++){m=arguments[D];for(p in m)a[p]=m[p];for(let N=0;N<Z.length;N++)p=Z[N],Object.prototype.hasOwnProperty.call(m,p)&&(a[p]=m[p])}}function Ae(a){this.src=a,this.g={},this.h=0}Ae.prototype.add=function(a,h,p,m,D){const N=a.toString();a=this.g[N],a||(a=this.g[N]=[],this.h++);const z=Je(a,h,m,D);return z>-1?(h=a[z],p||(h.fa=!1)):(h=new Q(h,this.src,N,!!m,D),h.fa=p,a.push(h)),h};function Qe(a,h){const p=h.type;if(p in a.g){var m=a.g[p],D=Array.prototype.indexOf.call(m,h,void 0),N;(N=D>=0)&&Array.prototype.splice.call(m,D,1),N&&(ne(h),a.g[p].length==0&&(delete a.g[p],a.h--))}}function Je(a,h,p,m){for(let D=0;D<a.length;++D){const N=a[D];if(!N.da&&N.listener==h&&N.capture==!!p&&N.ha==m)return D}return-1}var x="closure_lm_"+(Math.random()*1e6|0),ee={};function J(a,h,p,m,D){if(Array.isArray(h)){for(let N=0;N<h.length;N++)J(a,h[N],p,m,D);return null}return p=Y(p),a&&a[Ve]?a.J(h,p,c(m)?!!m.capture:!1,D):ce(a,h,p,!1,m,D)}function ce(a,h,p,m,D,N){if(!h)throw Error("Invalid event type");const z=c(D)?!!D.capture:!!D;let Ce=B(a);if(Ce||(a[x]=Ce=new Ae(a)),p=Ce.add(h,p,m,z,N),p.proxy)return p;if(m=Re(),p.proxy=m,m.src=a,m.listener=p,a.addEventListener)b||(D=z),D===void 0&&(D=!1),a.addEventListener(h.toString(),m,D);else if(a.attachEvent)a.attachEvent(C(h.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return p}function Re(){function a(p){return h.call(a.src,a.listener,p)}const h=U;return a}function w(a,h,p,m,D){if(Array.isArray(h))for(var N=0;N<h.length;N++)w(a,h[N],p,m,D);else m=c(m)?!!m.capture:!!m,p=Y(p),a&&a[Ve]?(a=a.i,N=String(h).toString(),N in a.g&&(h=a.g[N],p=Je(h,p,m,D),p>-1&&(ne(h[p]),Array.prototype.splice.call(h,p,1),h.length==0&&(delete a.g[N],a.h--)))):a&&(a=B(a))&&(h=a.g[h.toString()],a=-1,h&&(a=Je(h,p,m,D)),(p=a>-1?h[a]:null)&&A(p))}function A(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[Ve])Qe(h.i,a);else{var p=a.type,m=a.proxy;h.removeEventListener?h.removeEventListener(p,m,a.capture):h.detachEvent?h.detachEvent(C(p),m):h.addListener&&h.removeListener&&h.removeListener(m),(p=B(h))?(Qe(p,a),p.h==0&&(p.src=null,h[x]=null)):ne(a)}}}function C(a){return a in ee?ee[a]:ee[a]="on"+a}function U(a,h){if(a.da)a=!0;else{h=new me(h,this);const p=a.listener,m=a.ha||a.src;a.fa&&A(a),a=p.call(m,h)}return a}function B(a){return a=a[x],a instanceof Ae?a:null}var L="__closure_events_fn_"+(Math.random()*1e9>>>0);function Y(a){return typeof a=="function"?a:(a[L]||(a[L]=function(h){return a.handleEvent(h)}),a[L])}function G(){I.call(this),this.i=new Ae(this),this.M=this,this.G=null}f(G,I),G.prototype[Ve]=!0,G.prototype.removeEventListener=function(a,h,p,m){w(this,a,h,p,m)};function q(a,h){var p,m=a.G;if(m)for(p=[];m;m=m.G)p.push(m);if(a=a.M,m=h.type||h,typeof h=="string")h=new T(h,a);else if(h instanceof T)h.target=h.target||a;else{var D=h;h=new T(m,a),ve(h,D)}D=!0;let N,z;if(p)for(z=p.length-1;z>=0;z--)N=h.g=p[z],D=W(N,m,!0,h)&&D;if(N=h.g=a,D=W(N,m,!0,h)&&D,D=W(N,m,!1,h)&&D,p)for(z=0;z<p.length;z++)N=h.g=p[z],D=W(N,m,!1,h)&&D}G.prototype.N=function(){if(G.Z.N.call(this),this.i){var a=this.i;for(const h in a.g){const p=a.g[h];for(let m=0;m<p.length;m++)ne(p[m]);delete a.g[h],a.h--}}this.G=null},G.prototype.J=function(a,h,p,m){return this.i.add(String(a),h,!1,p,m)},G.prototype.K=function(a,h,p,m){return this.i.add(String(a),h,!0,p,m)};function W(a,h,p,m){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let D=!0;for(let N=0;N<h.length;++N){const z=h[N];if(z&&!z.da&&z.capture==p){const Ce=z.listener,lt=z.ha||z.src;z.fa&&Qe(a.i,z),D=Ce.call(lt,m)!==!1&&D}}return D&&!m.defaultPrevented}function de(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=u(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function te(a){a.g=de(()=>{a.g=null,a.i&&(a.i=!1,te(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class he extends I{constructor(h,p){super(),this.m=h,this.l=p,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:te(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function pe(a){I.call(this),this.h=a,this.g={}}f(pe,I);var Pe=[];function je(a){ie(a.g,function(h,p){this.g.hasOwnProperty(p)&&A(h)},a),a.g={}}pe.prototype.N=function(){pe.Z.N.call(this),je(this)},pe.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Me=o.JSON.stringify,St=o.JSON.parse,Ct=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Wt(){}function Gt(){}var rn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Is(){T.call(this,"d")}f(Is,T);function yt(){T.call(this,"c")}f(yt,T);var ft={},di=null;function jr(){return di=di||new G}ft.Ia="serverreachability";function ad(a){T.call(this,ft.Ia,a)}f(ad,T);function fi(a){const h=jr();q(h,new ad(h))}ft.STAT_EVENT="statevent";function cd(a,h){T.call(this,ft.STAT_EVENT,a),this.stat=h}f(cd,T);function xt(a){const h=jr();q(h,new cd(h,a))}ft.Ja="timingevent";function ld(a,h){T.call(this,ft.Ja,a),this.size=h}f(ld,T);function pi(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function gi(){this.g=!0}gi.prototype.ua=function(){this.g=!1};function OE(a,h,p,m,D,N){a.info(function(){if(a.g)if(N){var z="",Ce=N.split("&");for(let $e=0;$e<Ce.length;$e++){var lt=Ce[$e].split("=");if(lt.length>1){const pt=lt[0];lt=lt[1];const mn=pt.split("_");z=mn.length>=2&&mn[1]=="type"?z+(pt+"="+lt+"&"):z+(pt+"=redacted&")}}}else z=null;else z=N;return"XMLHTTP REQ ("+m+") [attempt "+D+"]: "+h+`
`+p+`
`+z})}function VE(a,h,p,m,D,N,z){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+D+"]: "+h+`
`+p+`
`+N+" "+z})}function Ts(a,h,p,m){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+ME(a,p)+(m?" "+m:"")})}function xE(a,h){a.info(function(){return"TIMEOUT: "+h})}gi.prototype.info=function(){};function ME(a,h){if(!a.g)return h;if(!h)return null;try{const N=JSON.parse(h);if(N){for(a=0;a<N.length;a++)if(Array.isArray(N[a])){var p=N[a];if(!(p.length<2)){var m=p[1];if(Array.isArray(m)&&!(m.length<1)){var D=m[0];if(D!="noop"&&D!="stop"&&D!="close")for(let z=1;z<m.length;z++)m[z]=""}}}}return Me(N)}catch{return h}}var Ho={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},ud={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},hd;function Qc(){}f(Qc,Wt),Qc.prototype.g=function(){return new XMLHttpRequest},hd=new Qc;function mi(a){return encodeURIComponent(String(a))}function LE(a){var h=1;a=a.split(":");const p=[];for(;h>0&&a.length;)p.push(a.shift()),h--;return a.length&&p.push(a.join(":")),p}function sr(a,h,p,m){this.j=a,this.i=h,this.l=p,this.S=m||1,this.V=new pe(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new dd}function dd(){this.i=null,this.g="",this.h=!1}var fd={},Jc={};function Yc(a,h,p){a.M=1,a.A=jo(gn(h)),a.u=p,a.R=!0,pd(a,null)}function pd(a,h){a.F=Date.now(),Bo(a),a.B=gn(a.A);var p=a.B,m=a.S;Array.isArray(m)||(m=[String(m)]),Cd(p.i,"t",m),a.C=0,p=a.j.L,a.h=new dd,a.g=Wd(a.j,p?h:null,!a.u),a.P>0&&(a.O=new he(u(a.Y,a,a.g),a.P)),h=a.V,p=a.g,m=a.ba;var D="readystatechange";Array.isArray(D)||(D&&(Pe[0]=D.toString()),D=Pe);for(let N=0;N<D.length;N++){const z=J(p,D[N],m||h.handleEvent,!1,h.h||h);if(!z)break;h.g[z.key]=z}h=a.J?K(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),fi(),OE(a.i,a.v,a.B,a.l,a.S,a.u)}sr.prototype.ba=function(a){a=a.target;const h=this.O;h&&ar(a)==3?h.j():this.Y(a)},sr.prototype.Y=function(a){try{if(a==this.g)e:{const Ce=ar(this.g),lt=this.g.ya(),$e=this.g.ca();if(!(Ce<3)&&(Ce!=3||this.g&&(this.h.h||this.g.la()||Vd(this.g)))){this.K||Ce!=4||lt==7||(lt==8||$e<=0?fi(3):fi(2)),Xc(this);var h=this.g.ca();this.X=h;var p=FE(this);if(this.o=h==200,VE(this.i,this.v,this.B,this.l,this.S,Ce,h),this.o){if(this.U&&!this.L){t:{if(this.g){var m,D=this.g;if((m=D.g?D.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!v(m)){var N=m;break t}}N=null}if(a=N)Ts(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Zc(this,a);else{this.o=!1,this.m=3,xt(12),$r(this),_i(this);break e}}if(this.R){a=!0;let pt;for(;!this.K&&this.C<p.length;)if(pt=UE(this,p),pt==Jc){Ce==4&&(this.m=4,xt(14),a=!1),Ts(this.i,this.l,null,"[Incomplete Response]");break}else if(pt==fd){this.m=4,xt(15),Ts(this.i,this.l,p,"[Invalid Chunk]"),a=!1;break}else Ts(this.i,this.l,pt,null),Zc(this,pt);if(gd(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ce!=4||p.length!=0||this.h.h||(this.m=1,xt(16),a=!1),this.o=this.o&&a,!a)Ts(this.i,this.l,p,"[Invalid Chunked Response]"),$r(this),_i(this);else if(p.length>0&&!this.W){this.W=!0;var z=this.j;z.g==this&&z.aa&&!z.P&&(z.j.info("Great, no buffering proxy detected. Bytes received: "+p.length),al(z),z.P=!0,xt(11))}}else Ts(this.i,this.l,p,null),Zc(this,p);Ce==4&&$r(this),this.o&&!this.K&&(Ce==4?Bd(this.j,this):(this.o=!1,Bo(this)))}else ZE(this.g),h==400&&p.indexOf("Unknown SID")>0?(this.m=3,xt(12)):(this.m=0,xt(13)),$r(this),_i(this)}}}catch{}finally{}};function FE(a){if(!gd(a))return a.g.la();const h=Vd(a.g);if(h==="")return"";let p="";const m=h.length,D=ar(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return $r(a),_i(a),"";a.h.i=new o.TextDecoder}for(let N=0;N<m;N++)a.h.h=!0,p+=a.h.i.decode(h[N],{stream:!(D&&N==m-1)});return h.length=0,a.h.g+=p,a.C=0,a.h.g}function gd(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function UE(a,h){var p=a.C,m=h.indexOf(`
`,p);return m==-1?Jc:(p=Number(h.substring(p,m)),isNaN(p)?fd:(m+=1,m+p>h.length?Jc:(h=h.slice(m,m+p),a.C=m+p,h)))}sr.prototype.cancel=function(){this.K=!0,$r(this)};function Bo(a){a.T=Date.now()+a.H,md(a,a.H)}function md(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=pi(u(a.aa,a),h)}function Xc(a){a.D&&(o.clearTimeout(a.D),a.D=null)}sr.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(xE(this.i,this.B),this.M!=2&&(fi(),xt(17)),$r(this),this.m=2,_i(this)):md(this,this.T-a)};function _i(a){a.j.I==0||a.K||Bd(a.j,a)}function $r(a){Xc(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,je(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function Zc(a,h){try{var p=a.j;if(p.I!=0&&(p.g==a||el(p.h,a))){if(!a.L&&el(p.h,a)&&p.I==3){try{var m=p.Ba.g.parse(h)}catch{m=null}if(Array.isArray(m)&&m.length==3){var D=m;if(D[0]==0){e:if(!p.v){if(p.g)if(p.g.F+3e3<a.F)zo(p),Wo(p);else break e;ol(p),xt(18)}}else p.xa=D[1],0<p.xa-p.K&&D[2]<37500&&p.F&&p.A==0&&!p.C&&(p.C=pi(u(p.Va,p),6e3));vd(p.h)<=1&&p.ta&&(p.ta=void 0)}else Wr(p,11)}else if((a.L||p.g==a)&&zo(p),!v(h))for(D=p.Ba.g.parse(h),h=0;h<D.length;h++){let $e=D[h];const pt=$e[0];if(!(pt<=p.K))if(p.K=pt,$e=$e[1],p.I==2)if($e[0]=="c"){p.M=$e[1],p.ba=$e[2];const mn=$e[3];mn!=null&&(p.ka=mn,p.j.info("VER="+p.ka));const Gr=$e[4];Gr!=null&&(p.za=Gr,p.j.info("SVER="+p.za));const cr=$e[5];cr!=null&&typeof cr=="number"&&cr>0&&(m=1.5*cr,p.O=m,p.j.info("backChannelRequestTimeoutMs_="+m)),m=p;const lr=a.g;if(lr){const Qo=lr.g?lr.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Qo){var N=m.h;N.g||Qo.indexOf("spdy")==-1&&Qo.indexOf("quic")==-1&&Qo.indexOf("h2")==-1||(N.j=N.l,N.g=new Set,N.h&&(tl(N,N.h),N.h=null))}if(m.G){const cl=lr.g?lr.g.getResponseHeader("X-HTTP-Session-Id"):null;cl&&(m.wa=cl,Ge(m.J,m.G,cl))}}p.I=3,p.l&&p.l.ra(),p.aa&&(p.T=Date.now()-a.F,p.j.info("Handshake RTT: "+p.T+"ms")),m=p;var z=a;if(m.na=qd(m,m.L?m.ba:null,m.W),z.L){Ed(m.h,z);var Ce=z,lt=m.O;lt&&(Ce.H=lt),Ce.D&&(Xc(Ce),Bo(Ce)),m.g=z}else Ud(m);p.i.length>0&&Go(p)}else $e[0]!="stop"&&$e[0]!="close"||Wr(p,7);else p.I==3&&($e[0]=="stop"||$e[0]=="close"?$e[0]=="stop"?Wr(p,7):il(p):$e[0]!="noop"&&p.l&&p.l.qa($e),p.A=0)}}fi(4)}catch{}}var HE=class{constructor(a,h){this.g=a,this.map=h}};function _d(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function yd(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function vd(a){return a.h?1:a.g?a.g.size:0}function el(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function tl(a,h){a.g?a.g.add(h):a.h=h}function Ed(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}_d.prototype.cancel=function(){if(this.i=Id(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Id(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const p of a.g.values())h=h.concat(p.G);return h}return _(a.i)}var Td=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function BE(a,h){if(a){a=a.split("&");for(let p=0;p<a.length;p++){const m=a[p].indexOf("=");let D,N=null;m>=0?(D=a[p].substring(0,m),N=a[p].substring(m+1)):D=a[p],h(D,N?decodeURIComponent(N.replace(/\+/g," ")):"")}}}function ir(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof ir?(this.l=a.l,yi(this,a.j),this.o=a.o,this.g=a.g,vi(this,a.u),this.h=a.h,nl(this,Rd(a.i)),this.m=a.m):a&&(h=String(a).match(Td))?(this.l=!1,yi(this,h[1]||"",!0),this.o=Ei(h[2]||""),this.g=Ei(h[3]||"",!0),vi(this,h[4]),this.h=Ei(h[5]||"",!0),nl(this,h[6]||"",!0),this.m=Ei(h[7]||"")):(this.l=!1,this.i=new Ti(null,this.l))}ir.prototype.toString=function(){const a=[];var h=this.j;h&&a.push(Ii(h,wd,!0),":");var p=this.g;return(p||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Ii(h,wd,!0),"@"),a.push(mi(p).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.u,p!=null&&a.push(":",String(p))),(p=this.h)&&(this.g&&p.charAt(0)!="/"&&a.push("/"),a.push(Ii(p,p.charAt(0)=="/"?qE:$E,!0))),(p=this.i.toString())&&a.push("?",p),(p=this.m)&&a.push("#",Ii(p,GE)),a.join("")},ir.prototype.resolve=function(a){const h=gn(this);let p=!!a.j;p?yi(h,a.j):p=!!a.o,p?h.o=a.o:p=!!a.g,p?h.g=a.g:p=a.u!=null;var m=a.h;if(p)vi(h,a.u);else if(p=!!a.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var D=h.h.lastIndexOf("/");D!=-1&&(m=h.h.slice(0,D+1)+m)}if(D=m,D==".."||D==".")m="";else if(D.indexOf("./")!=-1||D.indexOf("/.")!=-1){m=D.lastIndexOf("/",0)==0,D=D.split("/");const N=[];for(let z=0;z<D.length;){const Ce=D[z++];Ce=="."?m&&z==D.length&&N.push(""):Ce==".."?((N.length>1||N.length==1&&N[0]!="")&&N.pop(),m&&z==D.length&&N.push("")):(N.push(Ce),m=!0)}m=N.join("/")}else m=D}return p?h.h=m:p=a.i.toString()!=="",p?nl(h,Rd(a.i)):p=!!a.m,p&&(h.m=a.m),h};function gn(a){return new ir(a)}function yi(a,h,p){a.j=p?Ei(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function vi(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function nl(a,h,p){h instanceof Ti?(a.i=h,zE(a.i,a.l)):(p||(h=Ii(h,WE)),a.i=new Ti(h,a.l))}function Ge(a,h,p){a.i.set(h,p)}function jo(a){return Ge(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function Ei(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Ii(a,h,p){return typeof a=="string"?(a=encodeURI(a).replace(h,jE),p&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function jE(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var wd=/[#\/\?@]/g,$E=/[#\?:]/g,qE=/[#\?]/g,WE=/[#\?@]/g,GE=/#/g;function Ti(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function qr(a){a.g||(a.g=new Map,a.h=0,a.i&&BE(a.i,function(h,p){a.add(decodeURIComponent(h.replace(/\+/g," ")),p)}))}t=Ti.prototype,t.add=function(a,h){qr(this),this.i=null,a=ws(this,a);let p=this.g.get(a);return p||this.g.set(a,p=[]),p.push(h),this.h+=1,this};function bd(a,h){qr(a),h=ws(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function Ad(a,h){return qr(a),h=ws(a,h),a.g.has(h)}t.forEach=function(a,h){qr(this),this.g.forEach(function(p,m){p.forEach(function(D){a.call(h,D,m,this)},this)},this)};function Sd(a,h){qr(a);let p=[];if(typeof h=="string")Ad(a,h)&&(p=p.concat(a.g.get(ws(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)p=p.concat(a[h]);return p}t.set=function(a,h){return qr(this),this.i=null,a=ws(this,a),Ad(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},t.get=function(a,h){return a?(a=Sd(this,a),a.length>0?String(a[0]):h):h};function Cd(a,h,p){bd(a,h),p.length>0&&(a.i=null,a.g.set(ws(a,h),_(p)),a.h+=p.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(let m=0;m<h.length;m++){var p=h[m];const D=mi(p);p=Sd(this,p);for(let N=0;N<p.length;N++){let z=D;p[N]!==""&&(z+="="+mi(p[N])),a.push(z)}}return this.i=a.join("&")};function Rd(a){const h=new Ti;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function ws(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function zE(a,h){h&&!a.j&&(qr(a),a.i=null,a.g.forEach(function(p,m){const D=m.toLowerCase();m!=D&&(bd(this,m),Cd(this,D,p))},a)),a.j=h}function KE(a,h){const p=new gi;if(o.Image){const m=new Image;m.onload=d(or,p,"TestLoadImage: loaded",!0,h,m),m.onerror=d(or,p,"TestLoadImage: error",!1,h,m),m.onabort=d(or,p,"TestLoadImage: abort",!1,h,m),m.ontimeout=d(or,p,"TestLoadImage: timeout",!1,h,m),o.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else h(!1)}function QE(a,h){const p=new gi,m=new AbortController,D=setTimeout(()=>{m.abort(),or(p,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:m.signal}).then(N=>{clearTimeout(D),N.ok?or(p,"TestPingServer: ok",!0,h):or(p,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(D),or(p,"TestPingServer: error",!1,h)})}function or(a,h,p,m,D){try{D&&(D.onload=null,D.onerror=null,D.onabort=null,D.ontimeout=null),m(p)}catch{}}function JE(){this.g=new Ct}function rl(a){this.i=a.Sb||null,this.h=a.ab||!1}f(rl,Wt),rl.prototype.g=function(){return new $o(this.i,this.h)};function $o(a,h){G.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}f($o,G),t=$o.prototype,t.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,bi(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,wi(this)),this.readyState=0},t.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,bi(this)),this.g&&(this.readyState=3,bi(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Pd(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function Pd(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}t.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?wi(this):bi(this),this.readyState==3&&Pd(this)}},t.Oa=function(a){this.g&&(this.response=this.responseText=a,wi(this))},t.Na=function(a){this.g&&(this.response=a,wi(this))},t.ga=function(){this.g&&wi(this)};function wi(a){a.readyState=4,a.l=null,a.j=null,a.B=null,bi(a)}t.setRequestHeader=function(a,h){this.A.append(a,h)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var p=h.next();!p.done;)p=p.value,a.push(p[0]+": "+p[1]),p=h.next();return a.join(`\r
`)};function bi(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty($o.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function kd(a){let h="";return ie(a,function(p,m){h+=m,h+=":",h+=p,h+=`\r
`}),h}function sl(a,h,p){e:{for(m in p){var m=!1;break e}m=!0}m||(p=kd(p),typeof a=="string"?p!=null&&mi(p):Ge(a,h,p))}function et(a){G.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}f(et,G);var YE=/^https?$/i,XE=["POST","PUT"];t=et.prototype,t.Fa=function(a){this.H=a},t.ea=function(a,h,p,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():hd.g(),this.g.onreadystatechange=g(u(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(N){Dd(this,N);return}if(a=p||"",p=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var D in m)p.set(D,m[D]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const N of m.keys())p.set(N,m.get(N));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(p.keys()).find(N=>N.toLowerCase()=="content-type"),D=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(XE,h,void 0)>=0)||m||D||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[N,z]of p)this.g.setRequestHeader(N,z);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(N){Dd(this,N)}};function Dd(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,Nd(a),qo(a)}function Nd(a){a.A||(a.A=!0,q(a,"complete"),q(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,q(this,"complete"),q(this,"abort"),qo(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),qo(this,!0)),et.Z.N.call(this)},t.Ca=function(){this.u||(this.B||this.v||this.j?Od(this):this.Xa())},t.Xa=function(){Od(this)};function Od(a){if(a.h&&typeof i<"u"){if(a.v&&ar(a)==4)setTimeout(a.Ca.bind(a),0);else if(q(a,"readystatechange"),ar(a)==4){a.h=!1;try{const N=a.ca();e:switch(N){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var p;if(!(p=h)){var m;if(m=N===0){let z=String(a.D).match(Td)[1]||null;!z&&o.self&&o.self.location&&(z=o.self.location.protocol.slice(0,-1)),m=!YE.test(z?z.toLowerCase():"")}p=m}if(p)q(a,"complete"),q(a,"success");else{a.o=6;try{var D=ar(a)>2?a.g.statusText:""}catch{D=""}a.l=D+" ["+a.ca()+"]",Nd(a)}}finally{qo(a)}}}}function qo(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const p=a.g;a.g=null,h||q(a,"ready");try{p.onreadystatechange=null}catch{}}}t.isActive=function(){return!!this.g};function ar(a){return a.g?a.g.readyState:0}t.ca=function(){try{return ar(this)>2?this.g.status:-1}catch{return-1}},t.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),St(h)}};function Vd(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function ZE(a){const h={};a=(a.g&&ar(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(v(a[m]))continue;var p=LE(a[m]);const D=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const N=h[D]||[];h[D]=N,N.push(p)}j(h,function(m){return m.join(", ")})}t.ya=function(){return this.o},t.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ai(a,h,p){return p&&p.internalChannelParams&&p.internalChannelParams[a]||h}function xd(a){this.za=0,this.i=[],this.j=new gi,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Ai("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Ai("baseRetryDelayMs",5e3,a),this.Za=Ai("retryDelaySeedMs",1e4,a),this.Ta=Ai("forwardChannelMaxRetries",2,a),this.va=Ai("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new _d(a&&a.concurrentRequestLimit),this.Ba=new JE,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}t=xd.prototype,t.ka=8,t.I=1,t.connect=function(a,h,p,m){xt(0),this.W=a,this.H=h||{},p&&m!==void 0&&(this.H.OSID=p,this.H.OAID=m),this.F=this.X,this.J=qd(this,null,this.W),Go(this)};function il(a){if(Md(a),a.I==3){var h=a.V++,p=gn(a.J);if(Ge(p,"SID",a.M),Ge(p,"RID",h),Ge(p,"TYPE","terminate"),Si(a,p),h=new sr(a,a.j,h),h.M=2,h.A=jo(gn(p)),p=!1,o.navigator&&o.navigator.sendBeacon)try{p=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!p&&o.Image&&(new Image().src=h.A,p=!0),p||(h.g=Wd(h.j,null),h.g.ea(h.A)),h.F=Date.now(),Bo(h)}$d(a)}function Wo(a){a.g&&(al(a),a.g.cancel(),a.g=null)}function Md(a){Wo(a),a.v&&(o.clearTimeout(a.v),a.v=null),zo(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Go(a){if(!yd(a.h)&&!a.m){a.m=!0;var h=a.Ea;X||E(),se||(X(),se=!0),S.add(h,a),a.D=0}}function eI(a,h){return vd(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=pi(u(a.Ea,a,h),jd(a,a.D)),a.D++,!0)}t.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const D=new sr(this,this.j,a);let N=this.o;if(this.U&&(N?(N=K(N),ve(N,this.U)):N=this.U),this.u!==null||this.R||(D.J=N,N=null),this.S)e:{for(var h=0,p=0;p<this.i.length;p++){t:{var m=this.i[p];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(h+=m,h>4096){h=p;break e}if(h===4096||p===this.i.length-1){h=p+1;break e}}h=1e3}else h=1e3;h=Fd(this,D,h),p=gn(this.J),Ge(p,"RID",a),Ge(p,"CVER",22),this.G&&Ge(p,"X-HTTP-Session-Id",this.G),Si(this,p),N&&(this.R?h="headers="+mi(kd(N))+"&"+h:this.u&&sl(p,this.u,N)),tl(this.h,D),this.Ra&&Ge(p,"TYPE","init"),this.S?(Ge(p,"$req",h),Ge(p,"SID","null"),D.U=!0,Yc(D,p,null)):Yc(D,p,h),this.I=2}}else this.I==3&&(a?Ld(this,a):this.i.length==0||yd(this.h)||Ld(this))};function Ld(a,h){var p;h?p=h.l:p=a.V++;const m=gn(a.J);Ge(m,"SID",a.M),Ge(m,"RID",p),Ge(m,"AID",a.K),Si(a,m),a.u&&a.o&&sl(m,a.u,a.o),p=new sr(a,a.j,p,a.D+1),a.u===null&&(p.J=a.o),h&&(a.i=h.G.concat(a.i)),h=Fd(a,p,1e3),p.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),tl(a.h,p),Yc(p,m,h)}function Si(a,h){a.H&&ie(a.H,function(p,m){Ge(h,m,p)}),a.l&&ie({},function(p,m){Ge(h,m,p)})}function Fd(a,h,p){p=Math.min(a.i.length,p);const m=a.l?u(a.l.Ka,a.l,a):null;e:{var D=a.i;let Ce=-1;for(;;){const lt=["count="+p];Ce==-1?p>0?(Ce=D[0].g,lt.push("ofs="+Ce)):Ce=0:lt.push("ofs="+Ce);let $e=!0;for(let pt=0;pt<p;pt++){var N=D[pt].g;const mn=D[pt].map;if(N-=Ce,N<0)Ce=Math.max(0,D[pt].g-100),$e=!1;else try{N="req"+N+"_"||"";try{var z=mn instanceof Map?mn:Object.entries(mn);for(const[Gr,cr]of z){let lr=cr;c(cr)&&(lr=Me(cr)),lt.push(N+Gr+"="+encodeURIComponent(lr))}}catch(Gr){throw lt.push(N+"type="+encodeURIComponent("_badmap")),Gr}}catch{m&&m(mn)}}if($e){z=lt.join("&");break e}}z=void 0}return a=a.i.splice(0,p),h.G=a,z}function Ud(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;X||E(),se||(X(),se=!0),S.add(h,a),a.A=0}}function ol(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=pi(u(a.Da,a),jd(a,a.A)),a.A++,!0)}t.Da=function(){if(this.v=null,Hd(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=pi(u(this.Wa,this),a)}},t.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,xt(10),Wo(this),Hd(this))};function al(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Hd(a){a.g=new sr(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=gn(a.na);Ge(h,"RID","rpc"),Ge(h,"SID",a.M),Ge(h,"AID",a.K),Ge(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&Ge(h,"TO",a.ia),Ge(h,"TYPE","xmlhttp"),Si(a,h),a.u&&a.o&&sl(h,a.u,a.o),a.O&&(a.g.H=a.O);var p=a.g;a=a.ba,p.M=1,p.A=jo(gn(h)),p.u=null,p.R=!0,pd(p,a)}t.Va=function(){this.C!=null&&(this.C=null,Wo(this),ol(this),xt(19))};function zo(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Bd(a,h){var p=null;if(a.g==h){zo(a),al(a),a.g=null;var m=2}else if(el(a.h,h))p=h.G,Ed(a.h,h),m=1;else return;if(a.I!=0){if(h.o)if(m==1){p=h.u?h.u.length:0,h=Date.now()-h.F;var D=a.D;m=jr(),q(m,new ld(m,p)),Go(a)}else Ud(a);else if(D=h.m,D==3||D==0&&h.X>0||!(m==1&&eI(a,h)||m==2&&ol(a)))switch(p&&p.length>0&&(h=a.h,h.i=h.i.concat(p)),D){case 1:Wr(a,5);break;case 4:Wr(a,10);break;case 3:Wr(a,6);break;default:Wr(a,2)}}}function jd(a,h){let p=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(p*=2),p*h}function Wr(a,h){if(a.j.info("Error code "+h),h==2){var p=u(a.bb,a),m=a.Ua;const D=!m;m=new ir(m||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||yi(m,"https"),jo(m),D?KE(m.toString(),p):QE(m.toString(),p)}else xt(2);a.I=0,a.l&&a.l.pa(h),$d(a),Md(a)}t.bb=function(a){a?(this.j.info("Successfully pinged google.com"),xt(2)):(this.j.info("Failed to ping google.com"),xt(1))};function $d(a){if(a.I=0,a.ja=[],a.l){const h=Id(a.h);(h.length!=0||a.i.length!=0)&&(R(a.ja,h),R(a.ja,a.i),a.h.i.length=0,_(a.i),a.i.length=0),a.l.oa()}}function qd(a,h,p){var m=p instanceof ir?gn(p):new ir(p);if(m.g!="")h&&(m.g=h+"."+m.g),vi(m,m.u);else{var D=o.location;m=D.protocol,h=h?h+"."+D.hostname:D.hostname,D=+D.port;const N=new ir(null);m&&yi(N,m),h&&(N.g=h),D&&vi(N,D),p&&(N.h=p),m=N}return p=a.G,h=a.wa,p&&h&&Ge(m,p,h),Ge(m,"VER",a.ka),Si(a,m),m}function Wd(a,h,p){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new et(new rl({ab:p})):new et(a.ma),h.Fa(a.L),h}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Gd(){}t=Gd.prototype,t.ra=function(){},t.qa=function(){},t.pa=function(){},t.oa=function(){},t.isActive=function(){return!0},t.Ka=function(){};function Ko(){}Ko.prototype.g=function(a,h){return new zt(a,h)};function zt(a,h){G.call(this),this.g=new xd(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!v(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!v(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new bs(this)}f(zt,G),zt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},zt.prototype.close=function(){il(this.g)},zt.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var p={};p.__data__=a,a=p}else this.v&&(p={},p.__data__=Me(a),a=p);h.i.push(new HE(h.Ya++,a)),h.I==3&&Go(h)},zt.prototype.N=function(){this.g.l=null,delete this.j,il(this.g),delete this.g,zt.Z.N.call(this)};function zd(a){Is.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const p in h){a=p;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}f(zd,Is);function Kd(){yt.call(this),this.status=1}f(Kd,yt);function bs(a){this.g=a}f(bs,Gd),bs.prototype.ra=function(){q(this.g,"a")},bs.prototype.qa=function(a){q(this.g,new zd(a))},bs.prototype.pa=function(a){q(this.g,new Kd)},bs.prototype.oa=function(){q(this.g,"b")},Ko.prototype.createWebChannel=Ko.prototype.g,zt.prototype.send=zt.prototype.o,zt.prototype.open=zt.prototype.m,zt.prototype.close=zt.prototype.close,ov=function(){return new Ko},iv=function(){return jr()},sv=ft,Su={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ho.NO_ERROR=0,Ho.TIMEOUT=8,Ho.HTTP_ERROR=6,va=Ho,ud.COMPLETE="complete",rv=ud,Gt.EventType=rn,rn.OPEN="a",rn.CLOSE="b",rn.ERROR="c",rn.MESSAGE="d",G.prototype.listen=G.prototype.J,Mi=Gt,et.prototype.listenOnce=et.prototype.K,et.prototype.getLastError=et.prototype.Ha,et.prototype.getLastErrorCode=et.prototype.ya,et.prototype.getStatus=et.prototype.ca,et.prototype.getResponseJson=et.prototype.La,et.prototype.getResponseText=et.prototype.la,et.prototype.send=et.prototype.ea,et.prototype.setWithCredentials=et.prototype.Fa,nv=et}).apply(typeof na<"u"?na:typeof self<"u"?self:typeof window<"u"?window:{});const Xp="@firebase/firestore",Zp="4.9.3";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}kt.UNAUTHENTICATED=new kt(null),kt.GOOGLE_CREDENTIALS=new kt("google-credentials-uid"),kt.FIRST_PARTY=new kt("first-party-uid"),kt.MOCK_USER=new kt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ci="12.7.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hs=new Cc("@firebase/firestore");function Ds(){return hs.logLevel}function re(t,...e){if(hs.logLevel<=De.DEBUG){const n=e.map(Ch);hs.debug(`Firestore (${ci}): ${t}`,...n)}}function er(t,...e){if(hs.logLevel<=De.ERROR){const n=e.map(Ch);hs.error(`Firestore (${ci}): ${t}`,...n)}}function Xs(t,...e){if(hs.logLevel<=De.WARN){const n=e.map(Ch);hs.warn(`Firestore (${ci}): ${t}`,...n)}}function Ch(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(n){return JSON.stringify(n)})(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _e(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,av(t,r,n)}function av(t,e,n){let r=`FIRESTORE (${ci}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw er(r),new Error(r)}function Be(t,e,n,r){let s="Unexpected state";typeof n=="string"?s=n:r=n,t||av(e,s,r)}function Te(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class le extends pn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(){this.promise=new Promise(((e,n)=>{this.resolve=e,this.reject=n}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cv{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class j1{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable((()=>n(kt.UNAUTHENTICATED)))}shutdown(){}}class $1{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable((()=>n(this.token.user)))}shutdown(){this.changeListener=null}}class q1{constructor(e){this.t=e,this.currentUser=kt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Be(this.o===void 0,42304);let r=this.i;const s=l=>this.i!==r?(r=this.i,n(l)):Promise.resolve();let i=new Rr;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Rr,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const l=i;e.enqueueRetryable((async()=>{await l.promise,await s(this.currentUser)}))},c=l=>{re("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((l=>c(l))),setTimeout((()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(re("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Rr)}}),0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then((r=>this.i!==e?(re("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Be(typeof r.accessToken=="string",31837,{l:r}),new cv(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Be(e===null||typeof e=="string",2055,{h:e}),new kt(e)}}class W1{constructor(e,n,r){this.P=e,this.T=n,this.I=r,this.type="FirstParty",this.user=kt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class G1{constructor(e,n,r){this.P=e,this.T=n,this.I=r}getToken(){return Promise.resolve(new W1(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable((()=>n(kt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class eg{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class z1{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,sn(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){Be(this.o===void 0,3512);const r=i=>{i.error!=null&&re("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,re("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{re("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):re("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new eg(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((n=>n?(Be(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new eg(n.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K1(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rh{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=K1(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%62))}return r}}function Ne(t,e){return t<e?-1:t>e?1:0}function Cu(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const s=t.charAt(r),i=e.charAt(r);if(s!==i)return ql(s)===ql(i)?Ne(s,i):ql(s)?1:-1}return Ne(t.length,e.length)}const Q1=55296,J1=57343;function ql(t){const e=t.charCodeAt(0);return e>=Q1&&e<=J1}function Zs(t,e,n){return t.length===e.length&&t.every(((r,s)=>n(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tg="__name__";class En{constructor(e,n,r){n===void 0?n=0:n>e.length&&_e(637,{offset:n,range:e.length}),r===void 0?r=e.length-n:r>e.length-n&&_e(1746,{length:r,range:e.length-n}),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return En.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof En?e.forEach((r=>{n.push(r)})):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=En.compareSegments(e.get(s),n.get(s));if(i!==0)return i}return Ne(e.length,n.length)}static compareSegments(e,n){const r=En.isNumericId(e),s=En.isNumericId(n);return r&&!s?-1:!r&&s?1:r&&s?En.extractNumericId(e).compare(En.extractNumericId(n)):Cu(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Cr.fromString(e.substring(4,e.length-2))}}class Xe extends En{construct(e,n,r){return new Xe(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new le($.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter((s=>s.length>0)))}return new Xe(n)}static emptyPath(){return new Xe([])}}const Y1=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class wt extends En{construct(e,n,r){return new wt(e,n,r)}static isValidIdentifier(e){return Y1.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),wt.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===tg}static keyField(){return new wt([tg])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new le($.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new le($.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new le($.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new le($.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new wt(n)}static emptyPath(){return new wt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e){this.path=e}static fromPath(e){return new fe(Xe.fromString(e))}static fromName(e){return new fe(Xe.fromString(e).popFirst(5))}static empty(){return new fe(Xe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Xe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Xe.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new fe(new Xe(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X1(t,e,n){if(!n)throw new le($.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function Z1(t,e,n,r){if(e===!0&&r===!0)throw new le($.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function ng(t){if(!fe.isDocumentKey(t))throw new le($.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function lv(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function Ph(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":_e(12329,{type:typeof t})}function _o(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new le($.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Ph(t);throw new le($.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ct(t,e){const n={typeString:t};return e&&(n.value=e),n}function xo(t,e){if(!lv(t))throw new le($.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}const o=t[r];if(s&&typeof o!==s){n=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){n=`Expected '${r}' field to equal '${i.value}'`;break}}if(n)throw new le($.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rg=-62135596800,sg=1e6;class ze{static now(){return ze.fromMillis(Date.now())}static fromDate(e){return ze.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*sg);return new ze(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new le($.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new le($.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<rg)throw new le($.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new le($.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/sg}_compareTo(e){return this.seconds===e.seconds?Ne(this.nanoseconds,e.nanoseconds):Ne(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ze._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(xo(e,ze._jsonSchema))return new ze(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-rg;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ze._jsonSchemaVersion="firestore/timestamp/1.0",ze._jsonSchema={type:ct("string",ze._jsonSchemaVersion),seconds:ct("number"),nanoseconds:ct("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{static fromTimestamp(e){return new Ie(e)}static min(){return new Ie(new ze(0,0))}static max(){return new Ie(new ze(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yo=-1;function ek(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=Ie.fromTimestamp(r===1e9?new ze(n+1,0):new ze(n,r));return new Vr(s,fe.empty(),e)}function tk(t){return new Vr(t.readTime,t.key,yo)}class Vr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Vr(Ie.min(),fe.empty(),yo)}static max(){return new Vr(Ie.max(),fe.empty(),yo)}}function nk(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=fe.comparator(t.documentKey,e.documentKey),n!==0?n:Ne(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rk="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class sk{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function li(t){if(t.code!==$.FAILED_PRECONDITION||t.message!==rk)throw t;re("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)}),(n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)}))}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&_e(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new H(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}}))}toPromise(){return new Promise(((e,n)=>{this.next(e,n)}))}wrapUserFunction(e){try{const n=e();return n instanceof H?n:H.resolve(n)}catch(n){return H.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction((()=>e(n))):H.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction((()=>e(n))):H.reject(n)}static resolve(e){return new H(((n,r)=>{n(e)}))}static reject(e){return new H(((n,r)=>{r(e)}))}static waitFor(e){return new H(((n,r)=>{let s=0,i=0,o=!1;e.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&n()}),(l=>r(l)))})),o=!0,i===s&&n()}))}static or(e){let n=H.resolve(!1);for(const r of e)n=n.next((s=>s?H.resolve(s):r()));return n}static forEach(e,n){const r=[];return e.forEach(((s,i)=>{r.push(n.call(this,s,i))})),this.waitFor(r)}static mapArray(e,n){return new H(((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let l=0;l<i;l++){const u=l;n(e[u]).next((d=>{o[u]=d,++c,c===i&&r(o)}),(d=>s(d)))}}))}static doWhile(e,n){return new H(((r,s)=>{const i=()=>{e()===!0?n().next((()=>{i()}),s):r()};i()}))}}function ik(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function ui(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lc{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>n.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Lc.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kh=-1;function Fc(t){return t==null}function Xa(t){return t===0&&1/t==-1/0}function ok(t){return typeof t=="number"&&Number.isInteger(t)&&!Xa(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uv="";function ak(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=ig(e)),e=ck(t.get(n),e);return ig(e)}function ck(t,e){let n=e;const r=t.length;for(let s=0;s<r;s++){const i=t.charAt(s);switch(i){case"\0":n+="";break;case uv:n+="";break;default:n+=i}}return n}function ig(t){return t+uv+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function og(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function _s(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function hv(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e,n){this.comparator=e,this.root=n||Et.EMPTY}insert(e,n){return new Ze(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Et.BLACK,null,null))}remove(e){return new Ze(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Et.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((n,r)=>(e(n,r),!1)))}toString(){const e=[];return this.inorderTraversal(((n,r)=>(e.push(`${n}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ra(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ra(this.root,e,this.comparator,!1)}getReverseIterator(){return new ra(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ra(this.root,e,this.comparator,!0)}}class ra{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Et{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??Et.RED,this.left=s??Et.EMPTY,this.right=i??Et.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new Et(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Et.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return Et.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Et.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Et.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw _e(43730,{key:this.key,value:this.value});if(this.right.isRed())throw _e(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw _e(27949);return e+(this.isRed()?0:1)}}Et.EMPTY=null,Et.RED=!0,Et.BLACK=!1;Et.EMPTY=new class{constructor(){this.size=0}get key(){throw _e(57766)}get value(){throw _e(16141)}get color(){throw _e(16727)}get left(){throw _e(29726)}get right(){throw _e(36894)}copy(e,n,r,s,i){return this}insert(e,n,r){return new Et(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(e){this.comparator=e,this.data=new Ze(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((n,r)=>(e(n),!1)))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new ag(this.data.getIterator())}getIteratorFrom(e){return new ag(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach((r=>{n=n.add(r)})),n}isEqual(e){if(!(e instanceof dt)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((n=>{e.push(n)})),e}toString(){const e=[];return this.forEach((n=>e.push(n))),"SortedSet("+e.toString()+")"}copy(e){const n=new dt(this.comparator);return n.data=e,n}}class ag{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(e){this.fields=e,e.sort(wt.comparator)}static empty(){return new cn([])}unionWith(e){let n=new dt(wt.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new cn(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Zs(this.fields,e.fields,((n,r)=>n.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dv extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new dv("Invalid base64 string: "+i):i}})(e);return new bt(n)}static fromUint8Array(e){const n=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new bt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(n){return btoa(n)})(this.binaryString)}toUint8Array(){return(function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Ne(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}bt.EMPTY_BYTE_STRING=new bt("");const lk=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function xr(t){if(Be(!!t,39018),typeof t=="string"){let e=0;const n=lk.exec(t);if(Be(!!n,46558,{timestamp:t}),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:rt(t.seconds),nanos:rt(t.nanos)}}function rt(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Mr(t){return typeof t=="string"?bt.fromBase64String(t):bt.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fv="server_timestamp",pv="__type__",gv="__previous_value__",mv="__local_write_time__";function Dh(t){return(t?.mapValue?.fields||{})[pv]?.stringValue===fv}function Uc(t){const e=t.mapValue.fields[gv];return Dh(e)?Uc(e):e}function vo(t){const e=xr(t.mapValue.fields[mv].timestampValue);return new ze(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uk{constructor(e,n,r,s,i,o,c,l,u,d){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=u,this.isUsingEmulator=d}}const Za="(default)";class Eo{constructor(e,n){this.projectId=e,this.database=n||Za}static empty(){return new Eo("","")}get isDefaultDatabase(){return this.database===Za}isEqual(e){return e instanceof Eo&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _v="__type__",hk="__max__",sa={mapValue:{}},yv="__vector__",ec="value";function Lr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Dh(t)?4:fk(t)?9007199254740991:dk(t)?10:11:_e(28295,{value:t})}function Nn(t,e){if(t===e)return!0;const n=Lr(t);if(n!==Lr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return vo(t).isEqual(vo(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=xr(s.timestampValue),c=xr(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos})(t,e);case 5:return t.stringValue===e.stringValue;case 6:return(function(s,i){return Mr(s.bytesValue).isEqual(Mr(i.bytesValue))})(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return(function(s,i){return rt(s.geoPointValue.latitude)===rt(i.geoPointValue.latitude)&&rt(s.geoPointValue.longitude)===rt(i.geoPointValue.longitude)})(t,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return rt(s.integerValue)===rt(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=rt(s.doubleValue),c=rt(i.doubleValue);return o===c?Xa(o)===Xa(c):isNaN(o)&&isNaN(c)}return!1})(t,e);case 9:return Zs(t.arrayValue.values||[],e.arrayValue.values||[],Nn);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(og(o)!==og(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!Nn(o[l],c[l])))return!1;return!0})(t,e);default:return _e(52216,{left:t})}}function Io(t,e){return(t.values||[]).find((n=>Nn(n,e)))!==void 0}function ei(t,e){if(t===e)return 0;const n=Lr(t),r=Lr(e);if(n!==r)return Ne(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Ne(t.booleanValue,e.booleanValue);case 2:return(function(i,o){const c=rt(i.integerValue||i.doubleValue),l=rt(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1})(t,e);case 3:return cg(t.timestampValue,e.timestampValue);case 4:return cg(vo(t),vo(e));case 5:return Cu(t.stringValue,e.stringValue);case 6:return(function(i,o){const c=Mr(i),l=Mr(o);return c.compareTo(l)})(t.bytesValue,e.bytesValue);case 7:return(function(i,o){const c=i.split("/"),l=o.split("/");for(let u=0;u<c.length&&u<l.length;u++){const d=Ne(c[u],l[u]);if(d!==0)return d}return Ne(c.length,l.length)})(t.referenceValue,e.referenceValue);case 8:return(function(i,o){const c=Ne(rt(i.latitude),rt(o.latitude));return c!==0?c:Ne(rt(i.longitude),rt(o.longitude))})(t.geoPointValue,e.geoPointValue);case 9:return lg(t.arrayValue,e.arrayValue);case 10:return(function(i,o){const c=i.fields||{},l=o.fields||{},u=c[ec]?.arrayValue,d=l[ec]?.arrayValue,f=Ne(u?.values?.length||0,d?.values?.length||0);return f!==0?f:lg(u,d)})(t.mapValue,e.mapValue);case 11:return(function(i,o){if(i===sa.mapValue&&o===sa.mapValue)return 0;if(i===sa.mapValue)return 1;if(o===sa.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),u=o.fields||{},d=Object.keys(u);l.sort(),d.sort();for(let f=0;f<l.length&&f<d.length;++f){const g=Cu(l[f],d[f]);if(g!==0)return g;const _=ei(c[l[f]],u[d[f]]);if(_!==0)return _}return Ne(l.length,d.length)})(t.mapValue,e.mapValue);default:throw _e(23264,{he:n})}}function cg(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return Ne(t,e);const n=xr(t),r=xr(e),s=Ne(n.seconds,r.seconds);return s!==0?s:Ne(n.nanos,r.nanos)}function lg(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=ei(n[s],r[s]);if(i)return i}return Ne(n.length,r.length)}function ti(t){return Ru(t)}function Ru(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?(function(n){const r=xr(n);return`time(${r.seconds},${r.nanos})`})(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?(function(n){return Mr(n).toBase64()})(t.bytesValue):"referenceValue"in t?(function(n){return fe.fromName(n).toString()})(t.referenceValue):"geoPointValue"in t?(function(n){return`geo(${n.latitude},${n.longitude})`})(t.geoPointValue):"arrayValue"in t?(function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=Ru(i);return r+"]"})(t.arrayValue):"mapValue"in t?(function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${Ru(n.fields[o])}`;return s+"}"})(t.mapValue):_e(61005,{value:t})}function Ea(t){switch(Lr(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Uc(t);return e?16+Ea(e):16;case 5:return 2*t.stringValue.length;case 6:return Mr(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+Ea(i)),0)})(t.arrayValue);case 10:case 11:return(function(r){let s=0;return _s(r.fields,((i,o)=>{s+=i.length+Ea(o)})),s})(t.mapValue);default:throw _e(13486,{value:t})}}function Pu(t){return!!t&&"integerValue"in t}function Nh(t){return!!t&&"arrayValue"in t}function ug(t){return!!t&&"nullValue"in t}function hg(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Ia(t){return!!t&&"mapValue"in t}function dk(t){return(t?.mapValue?.fields||{})[_v]?.stringValue===yv}function Xi(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return _s(t.mapValue.fields,((n,r)=>e.mapValue.fields[n]=Xi(r))),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Xi(t.arrayValue.values[n]);return e}return{...t}}function fk(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===hk}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(e){this.value=e}static empty(){return new Xt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Ia(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Xi(n)}setAll(e){let n=wt.emptyPath(),r={},s=[];e.forEach(((o,c)=>{if(!n.isImmediateParentOf(c)){const l=this.getFieldsMap(n);this.applyChanges(l,r,s),r={},s=[],n=c.popLast()}o?r[c.lastSegment()]=Xi(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());Ia(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Nn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];Ia(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){_s(n,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new Xt(Xi(this.value))}}function vv(t){const e=[];return _s(t.fields,((n,r)=>{const s=new wt([n]);if(Ia(r)){const i=vv(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new cn(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e,n,r,s,i,o,c){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new Nt(e,0,Ie.min(),Ie.min(),Ie.min(),Xt.empty(),0)}static newFoundDocument(e,n,r,s){return new Nt(e,1,n,Ie.min(),r,s,0)}static newNoDocument(e,n){return new Nt(e,2,n,Ie.min(),Ie.min(),Xt.empty(),0)}static newUnknownDocument(e,n){return new Nt(e,3,n,Ie.min(),Ie.min(),Xt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(Ie.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Xt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Xt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Ie.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Nt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Nt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e,n){this.position=e,this.inclusive=n}}function dg(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=fe.comparator(fe.fromName(o.referenceValue),n.key):r=ei(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function fg(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Nn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(e,n="asc"){this.field=e,this.dir=n}}function pk(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ev{}class ht extends Ev{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new mk(e,n,r):n==="array-contains"?new vk(e,r):n==="in"?new Ek(e,r):n==="not-in"?new Ik(e,r):n==="array-contains-any"?new Tk(e,r):new ht(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new _k(e,r):new yk(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(ei(n,this.value)):n!==null&&Lr(this.value)===Lr(n)&&this.matchesComparison(ei(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return _e(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class On extends Ev{constructor(e,n){super(),this.filters=e,this.op=n,this.Pe=null}static create(e,n){return new On(e,n)}matches(e){return Iv(this)?this.filters.find((n=>!n.matches(e)))===void 0:this.filters.find((n=>n.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,n)=>e.concat(n.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Iv(t){return t.op==="and"}function Tv(t){return gk(t)&&Iv(t)}function gk(t){for(const e of t.filters)if(e instanceof On)return!1;return!0}function ku(t){if(t instanceof ht)return t.field.canonicalString()+t.op.toString()+ti(t.value);if(Tv(t))return t.filters.map((e=>ku(e))).join(",");{const e=t.filters.map((n=>ku(n))).join(",");return`${t.op}(${e})`}}function wv(t,e){return t instanceof ht?(function(r,s){return s instanceof ht&&r.op===s.op&&r.field.isEqual(s.field)&&Nn(r.value,s.value)})(t,e):t instanceof On?(function(r,s){return s instanceof On&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,c)=>i&&wv(o,s.filters[c])),!0):!1})(t,e):void _e(19439)}function bv(t){return t instanceof ht?(function(n){return`${n.field.canonicalString()} ${n.op} ${ti(n.value)}`})(t):t instanceof On?(function(n){return n.op.toString()+" {"+n.getFilters().map(bv).join(" ,")+"}"})(t):"Filter"}class mk extends ht{constructor(e,n,r){super(e,n,r),this.key=fe.fromName(r.referenceValue)}matches(e){const n=fe.comparator(e.key,this.key);return this.matchesComparison(n)}}class _k extends ht{constructor(e,n){super(e,"in",n),this.keys=Av("in",n)}matches(e){return this.keys.some((n=>n.isEqual(e.key)))}}class yk extends ht{constructor(e,n){super(e,"not-in",n),this.keys=Av("not-in",n)}matches(e){return!this.keys.some((n=>n.isEqual(e.key)))}}function Av(t,e){return(e.arrayValue?.values||[]).map((n=>fe.fromName(n.referenceValue)))}class vk extends ht{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Nh(n)&&Io(n.arrayValue,this.value)}}class Ek extends ht{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Io(this.value.arrayValue,n)}}class Ik extends ht{constructor(e,n){super(e,"not-in",n)}matches(e){if(Io(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!Io(this.value.arrayValue,n)}}class Tk extends ht{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Nh(n)||!n.arrayValue.values)&&n.arrayValue.values.some((r=>Io(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wk{constructor(e,n=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function pg(t,e=null,n=[],r=[],s=null,i=null,o=null){return new wk(t,e,n,r,s,i,o)}function Oh(t){const e=Te(t);if(e.Te===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map((r=>ku(r))).join(","),n+="|ob:",n+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Fc(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map((r=>ti(r))).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map((r=>ti(r))).join(",")),e.Te=n}return e.Te}function Vh(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!pk(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!wv(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!fg(t.startAt,e.startAt)&&fg(t.endAt,e.endAt)}function Du(t){return fe.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(e,n=null,r=[],s=[],i=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=l,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function bk(t,e,n,r,s,i,o,c){return new Hc(t,e,n,r,s,i,o,c)}function xh(t){return new Hc(t)}function gg(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function Ak(t){return t.collectionGroup!==null}function Zi(t){const e=Te(t);if(e.Ie===null){e.Ie=[];const n=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new dt(wt.comparator);return o.filters.forEach((l=>{l.getFlattenedFilters().forEach((u=>{u.isInequality()&&(c=c.add(u.field))}))})),c})(e).forEach((i=>{n.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new nc(i,r))})),n.has(wt.keyField().canonicalString())||e.Ie.push(new nc(wt.keyField(),r))}return e.Ie}function Cn(t){const e=Te(t);return e.Ee||(e.Ee=Sk(e,Zi(t))),e.Ee}function Sk(t,e){if(t.limitType==="F")return pg(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new nc(s.field,i)}));const n=t.endAt?new tc(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new tc(t.startAt.position,t.startAt.inclusive):null;return pg(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Nu(t,e,n){return new Hc(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Bc(t,e){return Vh(Cn(t),Cn(e))&&t.limitType===e.limitType}function Sv(t){return`${Oh(Cn(t))}|lt:${t.limitType}`}function Ns(t){return`Query(target=${(function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map((s=>bv(s))).join(", ")}]`),Fc(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map((s=>ti(s))).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map((s=>ti(s))).join(",")),`Target(${r})`})(Cn(t))}; limitType=${t.limitType})`}function jc(t,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):fe.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(t,e)&&(function(r,s){for(const i of Zi(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(t,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(t,e)&&(function(r,s){return!(r.startAt&&!(function(o,c,l){const u=dg(o,c,l);return o.inclusive?u<=0:u<0})(r.startAt,Zi(r),s)||r.endAt&&!(function(o,c,l){const u=dg(o,c,l);return o.inclusive?u>=0:u>0})(r.endAt,Zi(r),s))})(t,e)}function Ck(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function Cv(t){return(e,n)=>{let r=!1;for(const s of Zi(t)){const i=Rk(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Rk(t,e,n){const r=t.field.isKeyField()?fe.comparator(e.key,n.key):(function(i,o,c){const l=o.data.field(i),u=c.data.field(i);return l!==null&&u!==null?ei(l,u):_e(42886)})(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return _e(19790,{direction:t.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){_s(this.inner,((n,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return hv(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pk=new Ze(fe.comparator);function tr(){return Pk}const Rv=new Ze(fe.comparator);function Li(...t){let e=Rv;for(const n of t)e=e.insert(n.key,n);return e}function Pv(t){let e=Rv;return t.forEach(((n,r)=>e=e.insert(n,r.overlayedDocument))),e}function ns(){return eo()}function kv(){return eo()}function eo(){return new ys((t=>t.toString()),((t,e)=>t.isEqual(e)))}const kk=new Ze(fe.comparator),Dk=new dt(fe.comparator);function Oe(...t){let e=Dk;for(const n of t)e=e.add(n);return e}const Nk=new dt(Ne);function Ok(){return Nk}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mh(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Xa(e)?"-0":e}}function Dv(t){return{integerValue:""+t}}function Vk(t,e){return ok(e)?Dv(e):Mh(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $c{constructor(){this._=void 0}}function xk(t,e,n){return t instanceof To?(function(s,i){const o={fields:{[pv]:{stringValue:fv},[mv]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Dh(i)&&(i=Uc(i)),i&&(o.fields[gv]=i),{mapValue:o}})(n,e):t instanceof wo?Ov(t,e):t instanceof bo?Vv(t,e):(function(s,i){const o=Nv(s,i),c=mg(o)+mg(s.Ae);return Pu(o)&&Pu(s.Ae)?Dv(c):Mh(s.serializer,c)})(t,e)}function Mk(t,e,n){return t instanceof wo?Ov(t,e):t instanceof bo?Vv(t,e):n}function Nv(t,e){return t instanceof rc?(function(r){return Pu(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(e)?e:{integerValue:0}:null}class To extends $c{}class wo extends $c{constructor(e){super(),this.elements=e}}function Ov(t,e){const n=xv(e);for(const r of t.elements)n.some((s=>Nn(s,r)))||n.push(r);return{arrayValue:{values:n}}}class bo extends $c{constructor(e){super(),this.elements=e}}function Vv(t,e){let n=xv(e);for(const r of t.elements)n=n.filter((s=>!Nn(s,r)));return{arrayValue:{values:n}}}class rc extends $c{constructor(e,n){super(),this.serializer=e,this.Ae=n}}function mg(t){return rt(t.integerValue||t.doubleValue)}function xv(t){return Nh(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lk{constructor(e,n){this.field=e,this.transform=n}}function Fk(t,e){return t.field.isEqual(e.field)&&(function(r,s){return r instanceof wo&&s instanceof wo||r instanceof bo&&s instanceof bo?Zs(r.elements,s.elements,Nn):r instanceof rc&&s instanceof rc?Nn(r.Ae,s.Ae):r instanceof To&&s instanceof To})(t.transform,e.transform)}class Uk{constructor(e,n){this.version=e,this.transformResults=n}}class Kn{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Kn}static exists(e){return new Kn(void 0,e)}static updateTime(e){return new Kn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ta(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class qc{}function Mv(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Fv(t.key,Kn.none()):new Mo(t.key,t.data,Kn.none());{const n=t.data,r=Xt.empty();let s=new dt(wt.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new vs(t.key,r,new cn(s.toArray()),Kn.none())}}function Hk(t,e,n){t instanceof Mo?(function(s,i,o){const c=s.value.clone(),l=yg(s.fieldTransforms,i,o.transformResults);c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(t,e,n):t instanceof vs?(function(s,i,o){if(!Ta(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=yg(s.fieldTransforms,i,o.transformResults),l=i.data;l.setAll(Lv(s)),l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()})(t,e,n):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,n)}function to(t,e,n,r){return t instanceof Mo?(function(i,o,c,l){if(!Ta(i.precondition,o))return c;const u=i.value.clone(),d=vg(i.fieldTransforms,l,o);return u.setAll(d),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null})(t,e,n,r):t instanceof vs?(function(i,o,c,l){if(!Ta(i.precondition,o))return c;const u=vg(i.fieldTransforms,l,o),d=o.data;return d.setAll(Lv(i)),d.setAll(u),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((f=>f.field)))})(t,e,n,r):(function(i,o,c){return Ta(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(t,e,n)}function Bk(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=Nv(r.transform,s||null);i!=null&&(n===null&&(n=Xt.empty()),n.set(r.field,i))}return n||null}function _g(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Zs(r,s,((i,o)=>Fk(i,o)))})(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Mo extends qc{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class vs extends qc{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Lv(t){const e=new Map;return t.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}})),e}function yg(t,e,n){const r=new Map;Be(t.length===n.length,32656,{Re:n.length,Ve:t.length});for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,Mk(o,c,n[s]))}return r}function vg(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,xk(i,o,e))}return r}class Fv extends qc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class jk extends qc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $k{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Hk(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=to(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=to(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=kv();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=n.has(s.key)?null:c;const l=Mv(o,c);l!==null&&r.set(s.key,l),o.isValidDocument()||o.convertToNoDocument(Ie.min())})),r}keys(){return this.mutations.reduce(((e,n)=>e.add(n.key)),Oe())}isEqual(e){return this.batchId===e.batchId&&Zs(this.mutations,e.mutations,((n,r)=>_g(n,r)))&&Zs(this.baseMutations,e.baseMutations,((n,r)=>_g(n,r)))}}class Lh{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){Be(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=(function(){return kk})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Lh(e,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qk{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wk{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var at,xe;function Gk(t){switch(t){case $.OK:return _e(64938);case $.CANCELLED:case $.UNKNOWN:case $.DEADLINE_EXCEEDED:case $.RESOURCE_EXHAUSTED:case $.INTERNAL:case $.UNAVAILABLE:case $.UNAUTHENTICATED:return!1;case $.INVALID_ARGUMENT:case $.NOT_FOUND:case $.ALREADY_EXISTS:case $.PERMISSION_DENIED:case $.FAILED_PRECONDITION:case $.ABORTED:case $.OUT_OF_RANGE:case $.UNIMPLEMENTED:case $.DATA_LOSS:return!0;default:return _e(15467,{code:t})}}function Uv(t){if(t===void 0)return er("GRPC error has no .code"),$.UNKNOWN;switch(t){case at.OK:return $.OK;case at.CANCELLED:return $.CANCELLED;case at.UNKNOWN:return $.UNKNOWN;case at.DEADLINE_EXCEEDED:return $.DEADLINE_EXCEEDED;case at.RESOURCE_EXHAUSTED:return $.RESOURCE_EXHAUSTED;case at.INTERNAL:return $.INTERNAL;case at.UNAVAILABLE:return $.UNAVAILABLE;case at.UNAUTHENTICATED:return $.UNAUTHENTICATED;case at.INVALID_ARGUMENT:return $.INVALID_ARGUMENT;case at.NOT_FOUND:return $.NOT_FOUND;case at.ALREADY_EXISTS:return $.ALREADY_EXISTS;case at.PERMISSION_DENIED:return $.PERMISSION_DENIED;case at.FAILED_PRECONDITION:return $.FAILED_PRECONDITION;case at.ABORTED:return $.ABORTED;case at.OUT_OF_RANGE:return $.OUT_OF_RANGE;case at.UNIMPLEMENTED:return $.UNIMPLEMENTED;case at.DATA_LOSS:return $.DATA_LOSS;default:return _e(39323,{code:t})}}(xe=at||(at={}))[xe.OK=0]="OK",xe[xe.CANCELLED=1]="CANCELLED",xe[xe.UNKNOWN=2]="UNKNOWN",xe[xe.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",xe[xe.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",xe[xe.NOT_FOUND=5]="NOT_FOUND",xe[xe.ALREADY_EXISTS=6]="ALREADY_EXISTS",xe[xe.PERMISSION_DENIED=7]="PERMISSION_DENIED",xe[xe.UNAUTHENTICATED=16]="UNAUTHENTICATED",xe[xe.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",xe[xe.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",xe[xe.ABORTED=10]="ABORTED",xe[xe.OUT_OF_RANGE=11]="OUT_OF_RANGE",xe[xe.UNIMPLEMENTED=12]="UNIMPLEMENTED",xe[xe.INTERNAL=13]="INTERNAL",xe[xe.UNAVAILABLE=14]="UNAVAILABLE",xe[xe.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zk(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kk=new Cr([4294967295,4294967295],0);function Eg(t){const e=zk().encode(t),n=new tv;return n.update(e),new Uint8Array(n.digest())}function Ig(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Cr([n,r],0),new Cr([s,i],0)]}class Fh{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Fi(`Invalid padding: ${n}`);if(r<0)throw new Fi(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Fi(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Fi(`Invalid padding when bitmap length is 0: ${n}`);this.ge=8*e.length-n,this.pe=Cr.fromNumber(this.ge)}ye(e,n,r){let s=e.add(n.multiply(Cr.fromNumber(r)));return s.compare(Kk)===1&&(s=new Cr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const n=Eg(e),[r,s]=Ig(n);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);if(!this.we(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Fh(i,s,n);return r.forEach((c=>o.insert(c))),o}insert(e){if(this.ge===0)return;const n=Eg(e),[r,s]=Ig(n);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);this.Se(o)}}Se(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Fi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wc{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,Lo.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new Wc(Ie.min(),s,new Ze(Ne),tr(),Oe())}}class Lo{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Lo(r,n,Oe(),Oe(),Oe())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa{constructor(e,n,r,s){this.be=e,this.removedTargetIds=n,this.key=r,this.De=s}}class Hv{constructor(e,n){this.targetId=e,this.Ce=n}}class Bv{constructor(e,n,r=bt.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class Tg{constructor(){this.ve=0,this.Fe=wg(),this.Me=bt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Oe(),n=Oe(),r=Oe();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:_e(38017,{changeType:i})}})),new Lo(this.Me,this.xe,e,n,r)}qe(){this.Oe=!1,this.Fe=wg()}Qe(e,n){this.Oe=!0,this.Fe=this.Fe.insert(e,n)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,Be(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class Qk{constructor(e){this.Ge=e,this.ze=new Map,this.je=tr(),this.Je=ia(),this.He=ia(),this.Ye=new Ze(Ne)}Ze(e){for(const n of e.be)e.De&&e.De.isFoundDocument()?this.Xe(n,e.De):this.et(n,e.key,e.De);for(const n of e.removedTargetIds)this.et(n,e.key,e.De)}tt(e){this.forEachTarget(e,(n=>{const r=this.nt(n);switch(e.state){case 0:this.rt(n)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(n);break;case 3:this.rt(n)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(n)&&(this.it(n),r.Le(e.resumeToken));break;default:_e(56790,{state:e.state})}}))}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.ze.forEach(((r,s)=>{this.rt(s)&&n(s)}))}st(e){const n=e.targetId,r=e.Ce.count,s=this.ot(n);if(s){const i=s.target;if(Du(i))if(r===0){const o=new fe(i.path);this.et(n,o,Nt.newNoDocument(o,Ie.min()))}else Be(r===1,20013,{expectedCount:r});else{const o=this._t(n);if(o!==r){const c=this.ut(e),l=c?this.ct(c,e,o):1;if(l!==0){this.it(n);const u=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(n,u)}}}}}ut(e){const n=e.Ce.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,c;try{o=Mr(r).toUint8Array()}catch(l){if(l instanceof dv)return Xs("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new Fh(o,s,i)}catch(l){return Xs(l instanceof Fi?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.ge===0?null:c}ct(e,n,r){return n.Ce.count===r-this.Pt(e,n.targetId)?0:2}Pt(e,n){const r=this.Ge.getRemoteKeysForTarget(n);let s=0;return r.forEach((i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(n,i,null),s++)})),s}Tt(e){const n=new Map;this.ze.forEach(((i,o)=>{const c=this.ot(o);if(c){if(i.current&&Du(c.target)){const l=new fe(c.target.path);this.It(l).has(o)||this.Et(o,l)||this.et(o,l,Nt.newNoDocument(l,e))}i.Be&&(n.set(o,i.ke()),i.qe())}}));let r=Oe();this.He.forEach(((i,o)=>{let c=!0;o.forEachWhile((l=>{const u=this.ot(l);return!u||u.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(e)));const s=new Wc(e,n,this.Ye,this.je,r);return this.je=tr(),this.Je=ia(),this.He=ia(),this.Ye=new Ze(Ne),s}Xe(e,n){if(!this.rt(e))return;const r=this.Et(e,n.key)?2:0;this.nt(e).Qe(n.key,r),this.je=this.je.insert(n.key,n),this.Je=this.Je.insert(n.key,this.It(n.key).add(e)),this.He=this.He.insert(n.key,this.dt(n.key).add(e))}et(e,n,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,n)?s.Qe(n,1):s.$e(n),this.He=this.He.insert(n,this.dt(n).delete(e)),this.He=this.He.insert(n,this.dt(n).add(e)),r&&(this.je=this.je.insert(n,r))}removeTarget(e){this.ze.delete(e)}_t(e){const n=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let n=this.ze.get(e);return n||(n=new Tg,this.ze.set(e,n)),n}dt(e){let n=this.He.get(e);return n||(n=new dt(Ne),this.He=this.He.insert(e,n)),n}It(e){let n=this.Je.get(e);return n||(n=new dt(Ne),this.Je=this.Je.insert(e,n)),n}rt(e){const n=this.ot(e)!==null;return n||re("WatchChangeAggregator","Detected inactive target",e),n}ot(e){const n=this.ze.get(e);return n&&n.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Tg),this.Ge.getRemoteKeysForTarget(e).forEach((n=>{this.et(e,n,null)}))}Et(e,n){return this.Ge.getRemoteKeysForTarget(e).has(n)}}function ia(){return new Ze(fe.comparator)}function wg(){return new Ze(fe.comparator)}const Jk={asc:"ASCENDING",desc:"DESCENDING"},Yk={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Xk={and:"AND",or:"OR"};class Zk{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Ou(t,e){return t.useProto3Json||Fc(e)?e:{value:e}}function sc(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function jv(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function eD(t,e){return sc(t,e.toTimestamp())}function Rn(t){return Be(!!t,49232),Ie.fromTimestamp((function(n){const r=xr(n);return new ze(r.seconds,r.nanos)})(t))}function Uh(t,e){return Vu(t,e).canonicalString()}function Vu(t,e){const n=(function(s){return new Xe(["projects",s.projectId,"databases",s.database])})(t).child("documents");return e===void 0?n:n.child(e)}function $v(t){const e=Xe.fromString(t);return Be(Kv(e),10190,{key:e.toString()}),e}function xu(t,e){return Uh(t.databaseId,e.path)}function Wl(t,e){const n=$v(e);if(n.get(1)!==t.databaseId.projectId)throw new le($.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new le($.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new fe(Wv(n))}function qv(t,e){return Uh(t.databaseId,e)}function tD(t){const e=$v(t);return e.length===4?Xe.emptyPath():Wv(e)}function Mu(t){return new Xe(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Wv(t){return Be(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function bg(t,e,n){return{name:xu(t,e),fields:n.value.mapValue.fields}}function nD(t,e){let n;if("targetChange"in e){e.targetChange;const r=(function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:_e(39313,{state:u})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(u,d){return u.useProto3Json?(Be(d===void 0||typeof d=="string",58123),bt.fromBase64String(d||"")):(Be(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),bt.fromUint8Array(d||new Uint8Array))})(t,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&(function(u){const d=u.code===void 0?$.UNKNOWN:Uv(u.code);return new le(d,u.message||"")})(o);n=new Bv(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Wl(t,r.document.name),i=Rn(r.document.updateTime),o=r.document.createTime?Rn(r.document.createTime):Ie.min(),c=new Xt({mapValue:{fields:r.document.fields}}),l=Nt.newFoundDocument(s,i,o,c),u=r.targetIds||[],d=r.removedTargetIds||[];n=new wa(u,d,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Wl(t,r.document),i=r.readTime?Rn(r.readTime):Ie.min(),o=Nt.newNoDocument(s,i),c=r.removedTargetIds||[];n=new wa([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Wl(t,r.document),i=r.removedTargetIds||[];n=new wa([],i,s,null)}else{if(!("filter"in e))return _e(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new Wk(s,i),c=r.targetId;n=new Hv(c,o)}}return n}function rD(t,e){let n;if(e instanceof Mo)n={update:bg(t,e.key,e.value)};else if(e instanceof Fv)n={delete:xu(t,e.key)};else if(e instanceof vs)n={update:bg(t,e.key,e.data),updateMask:dD(e.fieldMask)};else{if(!(e instanceof jk))return _e(16599,{Vt:e.type});n={verify:xu(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map((r=>(function(i,o){const c=o.transform;if(c instanceof To)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof wo)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof bo)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof rc)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw _e(20930,{transform:o.transform})})(0,r)))),e.precondition.isNone||(n.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:eD(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:_e(27497)})(t,e.precondition)),n}function sD(t,e){return t&&t.length>0?(Be(e!==void 0,14353),t.map((n=>(function(s,i){let o=s.updateTime?Rn(s.updateTime):Rn(i);return o.isEqual(Ie.min())&&(o=Rn(i)),new Uk(o,s.transformResults||[])})(n,e)))):[]}function iD(t,e){return{documents:[qv(t,e.path)]}}function oD(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=qv(t,s);const i=(function(u){if(u.length!==0)return zv(On.create(u,"and"))})(e.filters);i&&(n.structuredQuery.where=i);const o=(function(u){if(u.length!==0)return u.map((d=>(function(g){return{field:Os(g.field),direction:lD(g.dir)}})(d)))})(e.orderBy);o&&(n.structuredQuery.orderBy=o);const c=Ou(t,e.limit);return c!==null&&(n.structuredQuery.limit=c),e.startAt&&(n.structuredQuery.startAt=(function(u){return{before:u.inclusive,values:u.position}})(e.startAt)),e.endAt&&(n.structuredQuery.endAt=(function(u){return{before:!u.inclusive,values:u.position}})(e.endAt)),{ft:n,parent:s}}function aD(t){let e=tD(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){Be(r===1,65062);const d=n.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];n.where&&(i=(function(f){const g=Gv(f);return g instanceof On&&Tv(g)?g.getFilters():[g]})(n.where));let o=[];n.orderBy&&(o=(function(f){return f.map((g=>(function(R){return new nc(Vs(R.field),(function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(R.direction))})(g)))})(n.orderBy));let c=null;n.limit&&(c=(function(f){let g;return g=typeof f=="object"?f.value:f,Fc(g)?null:g})(n.limit));let l=null;n.startAt&&(l=(function(f){const g=!!f.before,_=f.values||[];return new tc(_,g)})(n.startAt));let u=null;return n.endAt&&(u=(function(f){const g=!f.before,_=f.values||[];return new tc(_,g)})(n.endAt)),bk(e,s,o,i,c,"F",l,u)}function cD(t,e){const n=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return _e(28987,{purpose:s})}})(e.purpose);return n==null?null:{"goog-listen-tags":n}}function Gv(t){return t.unaryFilter!==void 0?(function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Vs(n.unaryFilter.field);return ht.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Vs(n.unaryFilter.field);return ht.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Vs(n.unaryFilter.field);return ht.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Vs(n.unaryFilter.field);return ht.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return _e(61313);default:return _e(60726)}})(t):t.fieldFilter!==void 0?(function(n){return ht.create(Vs(n.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return _e(58110);default:return _e(50506)}})(n.fieldFilter.op),n.fieldFilter.value)})(t):t.compositeFilter!==void 0?(function(n){return On.create(n.compositeFilter.filters.map((r=>Gv(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return _e(1026)}})(n.compositeFilter.op))})(t):_e(30097,{filter:t})}function lD(t){return Jk[t]}function uD(t){return Yk[t]}function hD(t){return Xk[t]}function Os(t){return{fieldPath:t.canonicalString()}}function Vs(t){return wt.fromServerFormat(t.fieldPath)}function zv(t){return t instanceof ht?(function(n){if(n.op==="=="){if(hg(n.value))return{unaryFilter:{field:Os(n.field),op:"IS_NAN"}};if(ug(n.value))return{unaryFilter:{field:Os(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(hg(n.value))return{unaryFilter:{field:Os(n.field),op:"IS_NOT_NAN"}};if(ug(n.value))return{unaryFilter:{field:Os(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Os(n.field),op:uD(n.op),value:n.value}}})(t):t instanceof On?(function(n){const r=n.getFilters().map((s=>zv(s)));return r.length===1?r[0]:{compositeFilter:{op:hD(n.op),filters:r}}})(t):_e(54877,{filter:t})}function dD(t){const e=[];return t.fields.forEach((n=>e.push(n.canonicalString()))),{fieldPaths:e}}function Kv(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(e,n,r,s,i=Ie.min(),o=Ie.min(),c=bt.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Ir(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Ir(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Ir(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Ir(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fD{constructor(e){this.yt=e}}function pD(t){const e=aD({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Nu(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gD{constructor(){this.Cn=new mD}addToCollectionParentIndex(e,n){return this.Cn.add(n),H.resolve()}getCollectionParents(e,n){return H.resolve(this.Cn.getEntries(n))}addFieldIndex(e,n){return H.resolve()}deleteFieldIndex(e,n){return H.resolve()}deleteAllFieldIndexes(e){return H.resolve()}createTargetIndexes(e,n){return H.resolve()}getDocumentsMatchingTarget(e,n){return H.resolve(null)}getIndexType(e,n){return H.resolve(0)}getFieldIndexes(e,n){return H.resolve([])}getNextCollectionGroupToUpdate(e){return H.resolve(null)}getMinOffset(e,n){return H.resolve(Vr.min())}getMinOffsetFromCollectionGroup(e,n){return H.resolve(Vr.min())}updateCollectionGroup(e,n,r){return H.resolve()}updateIndexEntries(e,n){return H.resolve()}}class mD{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new dt(Xe.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new dt(Xe.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ag={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Qv=41943040;class $t{static withCacheSize(e){return new $t(e,$t.DEFAULT_COLLECTION_PERCENTILE,$t.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */$t.DEFAULT_COLLECTION_PERCENTILE=10,$t.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,$t.DEFAULT=new $t(Qv,$t.DEFAULT_COLLECTION_PERCENTILE,$t.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),$t.DISABLED=new $t(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new ni(0)}static cr(){return new ni(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sg="LruGarbageCollector",_D=1048576;function Cg([t,e],[n,r]){const s=Ne(t,n);return s===0?Ne(e,r):s}class yD{constructor(e){this.Ir=e,this.buffer=new dt(Cg),this.Er=0}dr(){return++this.Er}Ar(e){const n=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();Cg(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class vD{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){re(Sg,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){ui(n)?re(Sg,"Ignoring IndexedDB error during garbage collection: ",n):await li(n)}await this.Vr(3e5)}))}}class ED{constructor(e,n){this.mr=e,this.params=n}calculateTargetCount(e,n){return this.mr.gr(e).next((r=>Math.floor(n/100*r)))}nthSequenceNumber(e,n){if(n===0)return H.resolve(Lc.ce);const r=new yD(n);return this.mr.forEachTarget(e,(s=>r.Ar(s.sequenceNumber))).next((()=>this.mr.pr(e,(s=>r.Ar(s))))).next((()=>r.maxValue))}removeTargets(e,n,r){return this.mr.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.mr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(re("LruGarbageCollector","Garbage collection skipped; disabled"),H.resolve(Ag)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(re("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ag):this.yr(e,n)))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,n){let r,s,i,o,c,l,u;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((f=>(f>this.params.maximumSequenceNumbersToCollect?(re("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${f}`),s=this.params.maximumSequenceNumbersToCollect):s=f,o=Date.now(),this.nthSequenceNumber(e,s)))).next((f=>(r=f,c=Date.now(),this.removeTargets(e,r,n)))).next((f=>(i=f,l=Date.now(),this.removeOrphanedDocuments(e,r)))).next((f=>(u=Date.now(),Ds()<=De.DEBUG&&re("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${f} documents in `+(u-l)+`ms
Total Duration: ${u-d}ms`),H.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:f}))))}}function ID(t,e){return new ED(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TD{constructor(){this.changes=new ys((e=>e.toString()),((e,n)=>e.isEqual(n))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,Nt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?H.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wD{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bD{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,n)))).next((s=>(r!==null&&to(r.mutation,s,cn.empty(),ze.now()),s)))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next((r=>this.getLocalViewOfDocuments(e,r,Oe()).next((()=>r))))}getLocalViewOfDocuments(e,n,r=Oe()){const s=ns();return this.populateOverlays(e,s,n).next((()=>this.computeViews(e,n,s,r).next((i=>{let o=Li();return i.forEach(((c,l)=>{o=o.insert(c,l.overlayedDocument)})),o}))))}getOverlayedDocuments(e,n){const r=ns();return this.populateOverlays(e,r,n).next((()=>this.computeViews(e,n,r,Oe())))}populateOverlays(e,n,r){const s=[];return r.forEach((i=>{n.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,c)=>{n.set(o,c)}))}))}computeViews(e,n,r,s){let i=tr();const o=eo(),c=(function(){return eo()})();return n.forEach(((l,u)=>{const d=r.get(u.key);s.has(u.key)&&(d===void 0||d.mutation instanceof vs)?i=i.insert(u.key,u):d!==void 0?(o.set(u.key,d.mutation.getFieldMask()),to(d.mutation,u,d.mutation.getFieldMask(),ze.now())):o.set(u.key,cn.empty())})),this.recalculateAndSaveOverlays(e,i).next((l=>(l.forEach(((u,d)=>o.set(u,d))),n.forEach(((u,d)=>c.set(u,new wD(d,o.get(u)??null)))),c)))}recalculateAndSaveOverlays(e,n){const r=eo();let s=new Ze(((o,c)=>o-c)),i=Oe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next((o=>{for(const c of o)c.keys().forEach((l=>{const u=n.get(l);if(u===null)return;let d=r.get(l)||cn.empty();d=c.applyToLocalView(u,d),r.set(l,d);const f=(s.get(c.batchId)||Oe()).add(l);s=s.insert(c.batchId,f)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),u=l.key,d=l.value,f=kv();d.forEach((g=>{if(!i.has(g)){const _=Mv(n.get(g),r.get(g));_!==null&&f.set(g,_),i=i.add(g)}})),o.push(this.documentOverlayCache.saveOverlays(e,u,f))}return H.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,n,r,s){return(function(o){return fe.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0})(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):Ak(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):H.resolve(ns());let c=yo,l=i;return o.next((u=>H.forEach(u,((d,f)=>(c<f.largestBatchId&&(c=f.largestBatchId),i.get(d)?H.resolve():this.remoteDocumentCache.getEntry(e,d).next((g=>{l=l.insert(d,g)}))))).next((()=>this.populateOverlays(e,u,i))).next((()=>this.computeViews(e,l,u,Oe()))).next((d=>({batchId:c,changes:Pv(d)})))))}))}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new fe(n)).next((r=>{let s=Li();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=Li();return this.indexManager.getCollectionParents(e,i).next((c=>H.forEach(c,(l=>{const u=(function(f,g){return new Hc(g,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)})(n,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,u,r,s).next((d=>{d.forEach(((f,g)=>{o=o.insert(f,g)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s)))).next((o=>{i.forEach(((l,u)=>{const d=u.getKey();o.get(d)===null&&(o=o.insert(d,Nt.newInvalidDocument(d)))}));let c=Li();return o.forEach(((l,u)=>{const d=i.get(l);d!==void 0&&to(d.mutation,u,cn.empty(),ze.now()),jc(n,u)&&(c=c.insert(l,u))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AD{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,n){return H.resolve(this.Lr.get(n))}saveBundleMetadata(e,n){return this.Lr.set(n.id,(function(s){return{id:s.id,version:s.version,createTime:Rn(s.createTime)}})(n)),H.resolve()}getNamedQuery(e,n){return H.resolve(this.kr.get(n))}saveNamedQuery(e,n){return this.kr.set(n.name,(function(s){return{name:s.name,query:pD(s.bundledQuery),readTime:Rn(s.readTime)}})(n)),H.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SD{constructor(){this.overlays=new Ze(fe.comparator),this.qr=new Map}getOverlay(e,n){return H.resolve(this.overlays.get(n))}getOverlays(e,n){const r=ns();return H.forEach(n,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,n,r){return r.forEach(((s,i)=>{this.St(e,n,i)})),H.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.qr.delete(r)),H.resolve()}getOverlaysForCollection(e,n,r){const s=ns(),i=n.length+1,o=new fe(n.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,u=l.getKey();if(!n.isPrefixOf(u.path))break;u.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return H.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new Ze(((u,d)=>u-d));const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===n&&u.largestBatchId>r){let d=i.get(u.largestBatchId);d===null&&(d=ns(),i=i.insert(u.largestBatchId,d)),d.set(u.getKey(),u)}}const c=ns(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach(((u,d)=>c.set(u,d))),!(c.size()>=s)););return H.resolve(c)}St(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new qk(n,r));let i=this.qr.get(n);i===void 0&&(i=Oe(),this.qr.set(n,i)),this.qr.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CD{constructor(){this.sessionToken=bt.EMPTY_BYTE_STRING}getSessionToken(e){return H.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,H.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh{constructor(){this.Qr=new dt(gt.$r),this.Ur=new dt(gt.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,n){const r=new gt(e,n);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,n){e.forEach((r=>this.addReference(r,n)))}removeReference(e,n){this.Gr(new gt(e,n))}zr(e,n){e.forEach((r=>this.removeReference(r,n)))}jr(e){const n=new fe(new Xe([])),r=new gt(n,e),s=new gt(n,e+1),i=[];return this.Ur.forEachInRange([r,s],(o=>{this.Gr(o),i.push(o.key)})),i}Jr(){this.Qr.forEach((e=>this.Gr(e)))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const n=new fe(new Xe([])),r=new gt(n,e),s=new gt(n,e+1);let i=Oe();return this.Ur.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const n=new gt(e,0),r=this.Qr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class gt{constructor(e,n){this.key=e,this.Yr=n}static $r(e,n){return fe.comparator(e.key,n.key)||Ne(e.Yr,n.Yr)}static Kr(e,n){return Ne(e.Yr,n.Yr)||fe.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RD{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.tr=1,this.Zr=new dt(gt.$r)}checkEmpty(e){return H.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new $k(i,n,r,s);this.mutationQueue.push(o);for(const c of s)this.Zr=this.Zr.add(new gt(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return H.resolve(o)}lookupMutationBatch(e,n){return H.resolve(this.Xr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.ei(r),i=s<0?0:s;return H.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return H.resolve(this.mutationQueue.length===0?kh:this.tr-1)}getAllMutationBatches(e){return H.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new gt(n,0),s=new gt(n,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],(o=>{const c=this.Xr(o.Yr);i.push(c)})),H.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new dt(Ne);return n.forEach((s=>{const i=new gt(s,0),o=new gt(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,o],(c=>{r=r.add(c.Yr)}))})),H.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;fe.isDocumentKey(i)||(i=i.child(""));const o=new gt(new fe(i),0);let c=new dt(Ne);return this.Zr.forEachWhile((l=>{const u=l.key.path;return!!r.isPrefixOf(u)&&(u.length===s&&(c=c.add(l.Yr)),!0)}),o),H.resolve(this.ti(c))}ti(e){const n=[];return e.forEach((r=>{const s=this.Xr(r);s!==null&&n.push(s)})),n}removeMutationBatch(e,n){Be(this.ni(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return H.forEach(n.mutations,(s=>{const i=new gt(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Zr=r}))}ir(e){}containsKey(e,n){const r=new gt(n,0),s=this.Zr.firstAfterOrEqual(r);return H.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,H.resolve()}ni(e,n){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const n=this.ei(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PD{constructor(e){this.ri=e,this.docs=(function(){return new Ze(fe.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.ri(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return H.resolve(r?r.document.mutableCopy():Nt.newInvalidDocument(n))}getEntries(e,n){let r=tr();return n.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Nt.newInvalidDocument(s))})),H.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=tr();const o=n.path,c=new fe(o.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:u,value:{document:d}}=l.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||nk(tk(d),r)<=0||(s.has(d.key)||jc(n,d))&&(i=i.insert(d.key,d.mutableCopy()))}return H.resolve(i)}getAllFromCollectionGroup(e,n,r,s){_e(9500)}ii(e,n){return H.forEach(this.docs,(r=>n(r)))}newChangeBuffer(e){return new kD(this)}getSize(e){return H.resolve(this.size)}}class kD extends TD{constructor(e){super(),this.Nr=e}applyChanges(e){const n=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?n.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)})),H.waitFor(n)}getFromCache(e,n){return this.Nr.getEntry(e,n)}getAllFromCache(e,n){return this.Nr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DD{constructor(e){this.persistence=e,this.si=new ys((n=>Oh(n)),Vh),this.lastRemoteSnapshotVersion=Ie.min(),this.highestTargetId=0,this.oi=0,this._i=new Hh,this.targetCount=0,this.ai=ni.ur()}forEachTarget(e,n){return this.si.forEach(((r,s)=>n(s))),H.resolve()}getLastRemoteSnapshotVersion(e){return H.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return H.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),H.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.oi&&(this.oi=n),H.resolve()}Pr(e){this.si.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.ai=new ni(n),this.highestTargetId=n),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,n){return this.Pr(n),this.targetCount+=1,H.resolve()}updateTargetData(e,n){return this.Pr(n),H.resolve()}removeTargetData(e,n){return this.si.delete(n.target),this._i.jr(n.targetId),this.targetCount-=1,H.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.si.forEach(((o,c)=>{c.sequenceNumber<=n&&r.get(c.targetId)===null&&(this.si.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),H.waitFor(i).next((()=>s))}getTargetCount(e){return H.resolve(this.targetCount)}getTargetData(e,n){const r=this.si.get(n)||null;return H.resolve(r)}addMatchingKeys(e,n,r){return this._i.Wr(n,r),H.resolve()}removeMatchingKeys(e,n,r){this._i.zr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),H.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this._i.jr(n),H.resolve()}getMatchingKeysForTargetId(e,n){const r=this._i.Hr(n);return H.resolve(r)}containsKey(e,n){return H.resolve(this._i.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jv{constructor(e,n){this.ui={},this.overlays={},this.ci=new Lc(0),this.li=!1,this.li=!0,this.hi=new CD,this.referenceDelegate=e(this),this.Pi=new DD(this),this.indexManager=new gD,this.remoteDocumentCache=(function(s){return new PD(s)})((r=>this.referenceDelegate.Ti(r))),this.serializer=new fD(n),this.Ii=new AD(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new SD,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.ui[e.toKey()];return r||(r=new RD(n,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,n,r){re("MemoryPersistence","Starting transaction:",e);const s=new ND(this.ci.next());return this.referenceDelegate.Ei(),r(s).next((i=>this.referenceDelegate.di(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ai(e,n){return H.or(Object.values(this.ui).map((r=>()=>r.containsKey(e,n))))}}class ND extends sk{constructor(e){super(),this.currentSequenceNumber=e}}class Bh{constructor(e){this.persistence=e,this.Ri=new Hh,this.Vi=null}static mi(e){return new Bh(e)}get fi(){if(this.Vi)return this.Vi;throw _e(60996)}addReference(e,n,r){return this.Ri.addReference(r,n),this.fi.delete(r.toString()),H.resolve()}removeReference(e,n,r){return this.Ri.removeReference(r,n),this.fi.add(r.toString()),H.resolve()}markPotentiallyOrphaned(e,n){return this.fi.add(n.toString()),H.resolve()}removeTarget(e,n){this.Ri.jr(n.targetId).forEach((s=>this.fi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next((s=>{s.forEach((i=>this.fi.add(i.toString())))})).next((()=>r.removeTargetData(e,n)))}Ei(){this.Vi=new Set}di(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return H.forEach(this.fi,(r=>{const s=fe.fromPath(r);return this.gi(e,s).next((i=>{i||n.removeEntry(s,Ie.min())}))})).next((()=>(this.Vi=null,n.apply(e))))}updateLimboDocument(e,n){return this.gi(e,n).next((r=>{r?this.fi.delete(n.toString()):this.fi.add(n.toString())}))}Ti(e){return 0}gi(e,n){return H.or([()=>H.resolve(this.Ri.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ai(e,n)])}}class ic{constructor(e,n){this.persistence=e,this.pi=new ys((r=>ak(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=ID(this,n)}static mi(e,n){return new ic(e,n)}Ei(){}di(e){return H.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}gr(e){const n=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>n.next((s=>r+s))))}wr(e){let n=0;return this.pr(e,(r=>{n++})).next((()=>n))}pr(e,n){return H.forEach(this.pi,((r,s)=>this.br(e,r,s).next((i=>i?H.resolve():n(s)))))}removeTargets(e,n,r){return this.persistence.getTargetCache().removeTargets(e,n,r)}removeOrphanedDocuments(e,n){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,(o=>this.br(e,o,n).next((c=>{c||(r++,i.removeEntry(o,Ie.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,n){return this.pi.set(n,e.currentSequenceNumber),H.resolve()}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),H.resolve()}removeReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),H.resolve()}updateLimboDocument(e,n){return this.pi.set(n,e.currentSequenceNumber),H.resolve()}Ti(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=Ea(e.data.value)),n}br(e,n,r){return H.or([()=>this.persistence.Ai(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const s=this.pi.get(n);return H.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jh{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.Es=r,this.ds=s}static As(e,n){let r=Oe(),s=Oe();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new jh(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OD{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VD{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return iA()?8:ik(Ot())>0?6:4})()}initialize(e,n){this.ps=e,this.indexManager=n,this.Rs=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.ys(e,n).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ws(e,n,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new OD;return this.Ss(e,n,o).next((c=>{if(i.result=c,this.Vs)return this.bs(e,n,o,c.size)}))})).next((()=>i.result))}bs(e,n,r,s){return r.documentReadCount<this.fs?(Ds()<=De.DEBUG&&re("QueryEngine","SDK will not create cache indexes for query:",Ns(n),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),H.resolve()):(Ds()<=De.DEBUG&&re("QueryEngine","Query:",Ns(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(Ds()<=De.DEBUG&&re("QueryEngine","The SDK decides to create cache indexes for query:",Ns(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Cn(n))):H.resolve())}ys(e,n){if(gg(n))return H.resolve(null);let r=Cn(n);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(n.limit!==null&&s===1&&(n=Nu(n,null,"F"),r=Cn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const o=Oe(...i);return this.ps.getDocuments(e,o).next((c=>this.indexManager.getMinOffset(e,r).next((l=>{const u=this.Ds(n,c);return this.Cs(n,u,o,l.readTime)?this.ys(e,Nu(n,null,"F")):this.vs(e,u,n,l)}))))})))))}ws(e,n,r,s){return gg(n)||s.isEqual(Ie.min())?H.resolve(null):this.ps.getDocuments(e,r).next((i=>{const o=this.Ds(n,i);return this.Cs(n,o,r,s)?H.resolve(null):(Ds()<=De.DEBUG&&re("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Ns(n)),this.vs(e,o,n,ek(s,yo)).next((c=>c)))}))}Ds(e,n){let r=new dt(Cv(e));return n.forEach(((s,i)=>{jc(e,i)&&(r=r.add(i))})),r}Cs(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,n,r){return Ds()<=De.DEBUG&&re("QueryEngine","Using full collection scan to execute query:",Ns(n)),this.ps.getDocumentsMatchingQuery(e,n,Vr.min(),r)}vs(e,n,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next((i=>(n.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $h="LocalStore",xD=3e8;class MD{constructor(e,n,r,s){this.persistence=e,this.Fs=n,this.serializer=s,this.Ms=new Ze(Ne),this.xs=new ys((i=>Oh(i)),Vh),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new bD(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(n=>e.collect(n,this.Ms)))}}function LD(t,e,n,r){return new MD(t,e,n,r)}async function Yv(t,e){const n=Te(t);return await n.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,n.Bs(e),n.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],c=[];let l=Oe();for(const u of s){o.push(u.batchId);for(const d of u.mutations)l=l.add(d.key)}for(const u of i){c.push(u.batchId);for(const d of u.mutations)l=l.add(d.key)}return n.localDocuments.getDocuments(r,l).next((u=>({Ls:u,removedBatchIds:o,addedBatchIds:c})))}))}))}function FD(t,e){const n=Te(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=n.Ns.newChangeBuffer({trackRemovals:!0});return(function(c,l,u,d){const f=u.batch,g=f.keys();let _=H.resolve();return g.forEach((R=>{_=_.next((()=>d.getEntry(l,R))).next((P=>{const k=u.docVersions.get(R);Be(k!==null,48541),P.version.compareTo(k)<0&&(f.applyToRemoteDocument(P,u),P.isValidDocument()&&(P.setReadTime(u.commitVersion),d.addEntry(P)))}))})),_.next((()=>c.mutationQueue.removeMutationBatch(l,f)))})(n,r,e,i).next((()=>i.apply(r))).next((()=>n.mutationQueue.performConsistencyCheck(r))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let l=Oe();for(let u=0;u<c.mutationResults.length;++u)c.mutationResults[u].transformResults.length>0&&(l=l.add(c.batch.mutations[u].key));return l})(e)))).next((()=>n.localDocuments.getDocuments(r,s)))}))}function Xv(t){const e=Te(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(n=>e.Pi.getLastRemoteSnapshotVersion(n)))}function UD(t,e){const n=Te(t),r=e.snapshotVersion;let s=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=n.Ns.newChangeBuffer({trackRemovals:!0});s=n.Ms;const c=[];e.targetChanges.forEach(((d,f)=>{const g=s.get(f);if(!g)return;c.push(n.Pi.removeMatchingKeys(i,d.removedDocuments,f).next((()=>n.Pi.addMatchingKeys(i,d.addedDocuments,f))));let _=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(f)!==null?_=_.withResumeToken(bt.EMPTY_BYTE_STRING,Ie.min()).withLastLimboFreeSnapshotVersion(Ie.min()):d.resumeToken.approximateByteSize()>0&&(_=_.withResumeToken(d.resumeToken,r)),s=s.insert(f,_),(function(P,k,O){return P.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=xD?!0:O.addedDocuments.size+O.modifiedDocuments.size+O.removedDocuments.size>0})(g,_,d)&&c.push(n.Pi.updateTargetData(i,_))}));let l=tr(),u=Oe();if(e.documentUpdates.forEach((d=>{e.resolvedLimboDocuments.has(d)&&c.push(n.persistence.referenceDelegate.updateLimboDocument(i,d))})),c.push(HD(i,o,e.documentUpdates).next((d=>{l=d.ks,u=d.qs}))),!r.isEqual(Ie.min())){const d=n.Pi.getLastRemoteSnapshotVersion(i).next((f=>n.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(d)}return H.waitFor(c).next((()=>o.apply(i))).next((()=>n.localDocuments.getLocalViewOfDocuments(i,l,u))).next((()=>l))})).then((i=>(n.Ms=s,i)))}function HD(t,e,n){let r=Oe(),s=Oe();return n.forEach((i=>r=r.add(i))),e.getEntries(t,r).next((i=>{let o=tr();return n.forEach(((c,l)=>{const u=i.get(c);l.isFoundDocument()!==u.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(Ie.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!u.isValidDocument()||l.version.compareTo(u.version)>0||l.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):re($h,"Ignoring outdated watch update for ",c,". Current version:",u.version," Watch version:",l.version)})),{ks:o,qs:s}}))}function BD(t,e){const n=Te(t);return n.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=kh),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function jD(t,e){const n=Te(t);return n.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return n.Pi.getTargetData(r,e).next((i=>i?(s=i,H.resolve(s)):n.Pi.allocateTargetId(r).next((o=>(s=new Ir(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Pi.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=n.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(r.targetId,r),n.xs.set(e,r.targetId)),r}))}async function Lu(t,e,n){const r=Te(t),s=r.Ms.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!ui(o))throw o;re($h,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function Rg(t,e,n){const r=Te(t);let s=Ie.min(),i=Oe();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(l,u,d){const f=Te(l),g=f.xs.get(d);return g!==void 0?H.resolve(f.Ms.get(g)):f.Pi.getTargetData(u,d)})(r,o,Cn(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(o,c.targetId).next((l=>{i=l}))})).next((()=>r.Fs.getDocumentsMatchingQuery(o,e,n?s:Ie.min(),n?i:Oe()))).next((c=>($D(r,Ck(e),c),{documents:c,Qs:i})))))}function $D(t,e,n){let r=t.Os.get(e)||Ie.min();n.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),t.Os.set(e,r)}class Pg{constructor(){this.activeTargetIds=Ok()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class qD{constructor(){this.Mo=new Pg,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,n,r){this.xo[e]=n}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Pg,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WD{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kg="ConnectivityMonitor";class Dg{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){re(kg,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){re(kg,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let oa=null;function Fu(){return oa===null?oa=(function(){return 268435456+Math.round(2147483648*Math.random())})():oa++,"0x"+oa.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gl="RestConnection",GD={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class zD{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=n+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===Za?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,n,r,s,i){const o=Fu(),c=this.zo(e,n.toUriEncodedString());re(Gl,`Sending RPC '${e}' ${o}:`,c,r);const l={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(l,s,i);const{host:u}=new URL(c),d=si(u);return this.Jo(e,c,l,r,d).then((f=>(re(Gl,`Received RPC '${e}' ${o}: `,f),f)),(f=>{throw Xs(Gl,`RPC '${e}' ${o} failed with error: `,f,"url: ",c,"request:",r),f}))}Ho(e,n,r,s,i,o){return this.Go(e,n,r,s,i)}jo(e,n,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+ci})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}zo(e,n){const r=GD[e];return`${this.Uo}/v1/${n}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KD{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rt="WebChannelConnection";class QD extends zD{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,n,r,s,i){const o=Fu();return new Promise(((c,l)=>{const u=new nv;u.setWithCredentials(!0),u.listenOnce(rv.COMPLETE,(()=>{try{switch(u.getLastErrorCode()){case va.NO_ERROR:const f=u.getResponseJson();re(Rt,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(f)),c(f);break;case va.TIMEOUT:re(Rt,`RPC '${e}' ${o} timed out`),l(new le($.DEADLINE_EXCEEDED,"Request time out"));break;case va.HTTP_ERROR:const g=u.getStatus();if(re(Rt,`RPC '${e}' ${o} failed with status:`,g,"response text:",u.getResponseText()),g>0){let _=u.getResponseJson();Array.isArray(_)&&(_=_[0]);const R=_?.error;if(R&&R.status&&R.message){const P=(function(O){const V=O.toLowerCase().replace(/_/g,"-");return Object.values($).indexOf(V)>=0?V:$.UNKNOWN})(R.status);l(new le(P,R.message))}else l(new le($.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new le($.UNAVAILABLE,"Connection failed."));break;default:_e(9055,{l_:e,streamId:o,h_:u.getLastErrorCode(),P_:u.getLastError()})}}finally{re(Rt,`RPC '${e}' ${o} completed.`)}}));const d=JSON.stringify(s);re(Rt,`RPC '${e}' ${o} sending request:`,s),u.send(n,"POST",d,r,15)}))}T_(e,n,r){const s=Fu(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=ov(),c=iv(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(l.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(l.useFetchStreams=!0),this.jo(l.initMessageHeaders,n,r),l.encodeInitMessageHeaders=!0;const d=i.join("");re(Rt,`Creating RPC '${e}' stream ${s}: ${d}`,l);const f=o.createWebChannel(d,l);this.I_(f);let g=!1,_=!1;const R=new KD({Yo:k=>{_?re(Rt,`Not sending because RPC '${e}' stream ${s} is closed:`,k):(g||(re(Rt,`Opening RPC '${e}' stream ${s} transport.`),f.open(),g=!0),re(Rt,`RPC '${e}' stream ${s} sending:`,k),f.send(k))},Zo:()=>f.close()}),P=(k,O,V)=>{k.listen(O,(F=>{try{V(F)}catch(M){setTimeout((()=>{throw M}),0)}}))};return P(f,Mi.EventType.OPEN,(()=>{_||(re(Rt,`RPC '${e}' stream ${s} transport opened.`),R.o_())})),P(f,Mi.EventType.CLOSE,(()=>{_||(_=!0,re(Rt,`RPC '${e}' stream ${s} transport closed`),R.a_(),this.E_(f))})),P(f,Mi.EventType.ERROR,(k=>{_||(_=!0,Xs(Rt,`RPC '${e}' stream ${s} transport errored. Name:`,k.name,"Message:",k.message),R.a_(new le($.UNAVAILABLE,"The operation could not be completed")))})),P(f,Mi.EventType.MESSAGE,(k=>{if(!_){const O=k.data[0];Be(!!O,16349);const V=O,F=V?.error||V[0]?.error;if(F){re(Rt,`RPC '${e}' stream ${s} received error:`,F);const M=F.status;let X=(function(E){const y=at[E];if(y!==void 0)return Uv(y)})(M),se=F.message;X===void 0&&(X=$.INTERNAL,se="Unknown error status: "+M+" with message "+F.message),_=!0,R.a_(new le(X,se)),f.close()}else re(Rt,`RPC '${e}' stream ${s} received:`,O),R.u_(O)}})),P(c,sv.STAT_EVENT,(k=>{k.stat===Su.PROXY?re(Rt,`RPC '${e}' stream ${s} detected buffering proxy`):k.stat===Su.NOPROXY&&re(Rt,`RPC '${e}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{R.__()}),0),R}terminate(){this.c_.forEach((e=>e.close())),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter((n=>n===e))}}function zl(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gc(t){return new Zk(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zv{constructor(e,n,r=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=n,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const n=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,n-r);s>0&&re("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ng="PersistentStream";class eE{constructor(e,n,r,s,i,o,c,l){this.Mi=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Zv(e,n)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():n&&n.code===$.RESOURCE_EXHAUSTED?(er(n.toString()),er("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):n&&n.code===$.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(n)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),n=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===n&&this.G_(r,s)}),(r=>{e((()=>{const s=new le($.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(e,n){const r=this.W_(this.D_);this.stream=this.j_(e,n),this.stream.Xo((()=>{r((()=>this.listener.Xo()))})),this.stream.t_((()=>{r((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return re(Ng,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return n=>{this.Mi.enqueueAndForget((()=>this.D_===e?n():(re(Ng,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class JD extends eE{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}j_(e,n){return this.connection.T_("Listen",e,n)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const n=nD(this.serializer,e),r=(function(i){if(!("targetChange"in i))return Ie.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?Ie.min():o.readTime?Rn(o.readTime):Ie.min()})(e);return this.listener.H_(n,r)}Y_(e){const n={};n.database=Mu(this.serializer),n.addTarget=(function(i,o){let c;const l=o.target;if(c=Du(l)?{documents:iD(i,l)}:{query:oD(i,l).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=jv(i,o.resumeToken);const u=Ou(i,o.expectedCount);u!==null&&(c.expectedCount=u)}else if(o.snapshotVersion.compareTo(Ie.min())>0){c.readTime=sc(i,o.snapshotVersion.toTimestamp());const u=Ou(i,o.expectedCount);u!==null&&(c.expectedCount=u)}return c})(this.serializer,e);const r=cD(this.serializer,e);r&&(n.labels=r),this.q_(n)}Z_(e){const n={};n.database=Mu(this.serializer),n.removeTarget=e,this.q_(n)}}class YD extends eE{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,n){return this.connection.T_("Write",e,n)}J_(e){return Be(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Be(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){Be(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const n=sD(e.writeResults,e.commitTime),r=Rn(e.commitTime);return this.listener.na(r,n)}ra(){const e={};e.database=Mu(this.serializer),this.q_(e)}ea(e){const n={streamToken:this.lastStreamToken,writes:e.map((r=>rD(this.serializer,r)))};this.q_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XD{}class ZD extends XD{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new le($.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,n,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Go(e,Vu(n,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===$.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new le($.UNKNOWN,i.toString())}))}Ho(e,n,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.Ho(e,Vu(n,r),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===$.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new le($.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class eN{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(er(n),this.aa=!1):re("OnlineStateTracker",n)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ds="RemoteStore";class tN{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo((o=>{r.enqueueAndForget((async()=>{Es(this)&&(re(ds,"Restarting streams for network reachability change."),await(async function(l){const u=Te(l);u.Ea.add(4),await Fo(u),u.Ra.set("Unknown"),u.Ea.delete(4),await zc(u)})(this))}))})),this.Ra=new eN(r,s)}}async function zc(t){if(Es(t))for(const e of t.da)await e(!0)}async function Fo(t){for(const e of t.da)await e(!1)}function tE(t,e){const n=Te(t);n.Ia.has(e.targetId)||(n.Ia.set(e.targetId,e),zh(n)?Gh(n):hi(n).O_()&&Wh(n,e))}function qh(t,e){const n=Te(t),r=hi(n);n.Ia.delete(e),r.O_()&&nE(n,e),n.Ia.size===0&&(r.O_()?r.L_():Es(n)&&n.Ra.set("Unknown"))}function Wh(t,e){if(t.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Ie.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}hi(t).Y_(e)}function nE(t,e){t.Va.Ue(e),hi(t).Z_(e)}function Gh(t){t.Va=new Qk({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),At:e=>t.Ia.get(e)||null,ht:()=>t.datastore.serializer.databaseId}),hi(t).start(),t.Ra.ua()}function zh(t){return Es(t)&&!hi(t).x_()&&t.Ia.size>0}function Es(t){return Te(t).Ea.size===0}function rE(t){t.Va=void 0}async function nN(t){t.Ra.set("Online")}async function rN(t){t.Ia.forEach(((e,n)=>{Wh(t,e)}))}async function sN(t,e){rE(t),zh(t)?(t.Ra.ha(e),Gh(t)):t.Ra.set("Unknown")}async function iN(t,e,n){if(t.Ra.set("Online"),e instanceof Bv&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds)s.Ia.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.Ia.delete(c),s.Va.removeTarget(c))})(t,e)}catch(r){re(ds,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await oc(t,r)}else if(e instanceof wa?t.Va.Ze(e):e instanceof Hv?t.Va.st(e):t.Va.tt(e),!n.isEqual(Ie.min()))try{const r=await Xv(t.localStore);n.compareTo(r)>=0&&await(function(i,o){const c=i.Va.Tt(o);return c.targetChanges.forEach(((l,u)=>{if(l.resumeToken.approximateByteSize()>0){const d=i.Ia.get(u);d&&i.Ia.set(u,d.withResumeToken(l.resumeToken,o))}})),c.targetMismatches.forEach(((l,u)=>{const d=i.Ia.get(l);if(!d)return;i.Ia.set(l,d.withResumeToken(bt.EMPTY_BYTE_STRING,d.snapshotVersion)),nE(i,l);const f=new Ir(d.target,l,u,d.sequenceNumber);Wh(i,f)})),i.remoteSyncer.applyRemoteEvent(c)})(t,n)}catch(r){re(ds,"Failed to raise snapshot:",r),await oc(t,r)}}async function oc(t,e,n){if(!ui(e))throw e;t.Ea.add(1),await Fo(t),t.Ra.set("Offline"),n||(n=()=>Xv(t.localStore)),t.asyncQueue.enqueueRetryable((async()=>{re(ds,"Retrying IndexedDB access"),await n(),t.Ea.delete(1),await zc(t)}))}function sE(t,e){return e().catch((n=>oc(t,n,e)))}async function Kc(t){const e=Te(t),n=Fr(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:kh;for(;oN(e);)try{const s=await BD(e.localStore,r);if(s===null){e.Ta.length===0&&n.L_();break}r=s.batchId,aN(e,s)}catch(s){await oc(e,s)}iE(e)&&oE(e)}function oN(t){return Es(t)&&t.Ta.length<10}function aN(t,e){t.Ta.push(e);const n=Fr(t);n.O_()&&n.X_&&n.ea(e.mutations)}function iE(t){return Es(t)&&!Fr(t).x_()&&t.Ta.length>0}function oE(t){Fr(t).start()}async function cN(t){Fr(t).ra()}async function lN(t){const e=Fr(t);for(const n of t.Ta)e.ea(n.mutations)}async function uN(t,e,n){const r=t.Ta.shift(),s=Lh.from(r,e,n);await sE(t,(()=>t.remoteSyncer.applySuccessfulWrite(s))),await Kc(t)}async function hN(t,e){e&&Fr(t).X_&&await(async function(r,s){if((function(o){return Gk(o)&&o!==$.ABORTED})(s.code)){const i=r.Ta.shift();Fr(r).B_(),await sE(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Kc(r)}})(t,e),iE(t)&&oE(t)}async function Og(t,e){const n=Te(t);n.asyncQueue.verifyOperationInProgress(),re(ds,"RemoteStore received new credentials");const r=Es(n);n.Ea.add(3),await Fo(n),r&&n.Ra.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ea.delete(3),await zc(n)}async function dN(t,e){const n=Te(t);e?(n.Ea.delete(2),await zc(n)):e||(n.Ea.add(2),await Fo(n),n.Ra.set("Unknown"))}function hi(t){return t.ma||(t.ma=(function(n,r,s){const i=Te(n);return i.sa(),new JD(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(t.datastore,t.asyncQueue,{Xo:nN.bind(null,t),t_:rN.bind(null,t),r_:sN.bind(null,t),H_:iN.bind(null,t)}),t.da.push((async e=>{e?(t.ma.B_(),zh(t)?Gh(t):t.Ra.set("Unknown")):(await t.ma.stop(),rE(t))}))),t.ma}function Fr(t){return t.fa||(t.fa=(function(n,r,s){const i=Te(n);return i.sa(),new YD(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(t.datastore,t.asyncQueue,{Xo:()=>Promise.resolve(),t_:cN.bind(null,t),r_:hN.bind(null,t),ta:lN.bind(null,t),na:uN.bind(null,t)}),t.da.push((async e=>{e?(t.fa.B_(),await Kc(t)):(await t.fa.stop(),t.Ta.length>0&&(re(ds,`Stopping write stream with ${t.Ta.length} pending writes`),t.Ta=[]))}))),t.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kh{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Rr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,c=new Kh(e,n,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new le($.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Qh(t,e){if(er("AsyncQueue",`${e}: ${t}`),ui(t))return new le($.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gs{static emptySet(e){return new Gs(e.comparator)}constructor(e){this.comparator=e?(n,r)=>e(n,r)||fe.comparator(n.key,r.key):(n,r)=>fe.comparator(n.key,r.key),this.keyedMap=Li(),this.sortedSet=new Ze(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((n,r)=>(e(n),!1)))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Gs)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((n=>{e.push(n.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Gs;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vg{constructor(){this.ga=new Ze(fe.comparator)}track(e){const n=e.doc.key,r=this.ga.get(n);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(n,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(n):e.type===1&&r.type===2?this.ga=this.ga.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):_e(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(n,e)}ya(){const e=[];return this.ga.inorderTraversal(((n,r)=>{e.push(r)})),e}}class ri{constructor(e,n,r,s,i,o,c,l,u){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=u}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach((c=>{o.push({type:0,doc:c})})),new ri(e,n,Gs.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Bc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fN{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class pN{constructor(){this.queries=xg(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(n,r){const s=Te(n),i=s.queries;s.queries=xg(),i.forEach(((o,c)=>{for(const l of c.Sa)l.onError(r)}))})(this,new le($.ABORTED,"Firestore shutting down"))}}function xg(){return new ys((t=>Sv(t)),Bc)}async function gN(t,e){const n=Te(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new fN,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await n.onListen(s,!0);break;case 1:i.wa=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const c=Qh(o,`Initialization of query '${Ns(e.query)}' failed`);return void e.onError(c)}n.queries.set(s,i),i.Sa.push(e),e.va(n.onlineState),i.wa&&e.Fa(i.wa)&&Jh(n)}async function mN(t,e){const n=Te(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function _N(t,e){const n=Te(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const c of o.Sa)c.Fa(s)&&(r=!0);o.wa=s}}r&&Jh(n)}function yN(t,e,n){const r=Te(t),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(n);r.queries.delete(e)}function Jh(t){t.Ca.forEach((e=>{e.next()}))}var Uu,Mg;(Mg=Uu||(Uu={})).Ma="default",Mg.Cache="cache";class vN{constructor(e,n,r){this.query=e,this.xa=n,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new ri(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),n=!0):this.La(e,this.onlineState)&&(this.ka(e),n=!0),this.Na=e,n}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let n=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),n=!0),n}La(e,n){if(!e.fromCache||!this.Da())return!0;const r=n!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const n=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}ka(e){e=ri.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Uu.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aE{constructor(e){this.key=e}}class cE{constructor(e){this.key=e}}class EN{constructor(e,n){this.query=e,this.Ya=n,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=Oe(),this.mutatedKeys=Oe(),this.eu=Cv(e),this.tu=new Gs(this.eu)}get nu(){return this.Ya}ru(e,n){const r=n?n.iu:new Vg,s=n?n.tu:this.tu;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,u=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((d,f)=>{const g=s.get(d),_=jc(this.query,f)?f:null,R=!!g&&this.mutatedKeys.has(g.key),P=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let k=!1;g&&_?g.data.isEqual(_.data)?R!==P&&(r.track({type:3,doc:_}),k=!0):this.su(g,_)||(r.track({type:2,doc:_}),k=!0,(l&&this.eu(_,l)>0||u&&this.eu(_,u)<0)&&(c=!0)):!g&&_?(r.track({type:0,doc:_}),k=!0):g&&!_&&(r.track({type:1,doc:g}),k=!0,(l||u)&&(c=!0)),k&&(_?(o=o.add(_),i=P?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{tu:o,iu:r,Cs:c,mutatedKeys:i}}su(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort(((d,f)=>(function(_,R){const P=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return _e(20277,{Rt:k})}};return P(_)-P(R)})(d.type,f.type)||this.eu(d.doc,f.doc))),this.ou(r),s=s??!1;const c=n&&!s?this._u():[],l=this.Xa.size===0&&this.current&&!s?1:0,u=l!==this.Za;return this.Za=l,o.length!==0||u?{snapshot:new ri(this.query,e.tu,i,o,e.mutatedKeys,l===0,u,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Vg,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((n=>this.Ya=this.Ya.add(n))),e.modifiedDocuments.forEach((n=>{})),e.removedDocuments.forEach((n=>this.Ya=this.Ya.delete(n))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=Oe(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))}));const n=[];return e.forEach((r=>{this.Xa.has(r)||n.push(new cE(r))})),this.Xa.forEach((r=>{e.has(r)||n.push(new aE(r))})),n}cu(e){this.Ya=e.Qs,this.Xa=Oe();const n=this.ru(e.documents);return this.applyChanges(n,!0)}lu(){return ri.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Yh="SyncEngine";class IN{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class TN{constructor(e){this.key=e,this.hu=!1}}class wN{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new ys((c=>Sv(c)),Bc),this.Iu=new Map,this.Eu=new Set,this.du=new Ze(fe.comparator),this.Au=new Map,this.Ru=new Hh,this.Vu={},this.mu=new Map,this.fu=ni.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function bN(t,e,n=!0){const r=pE(t);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await lE(r,e,n,!0),s}async function AN(t,e){const n=pE(t);await lE(n,e,!0,!1)}async function lE(t,e,n,r){const s=await jD(t.localStore,Cn(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let c;return r&&(c=await SN(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&tE(t.remoteStore,s),c}async function SN(t,e,n,r,s){t.pu=(f,g,_)=>(async function(P,k,O,V){let F=k.view.ru(O);F.Cs&&(F=await Rg(P.localStore,k.query,!1).then((({documents:S})=>k.view.ru(S,F))));const M=V&&V.targetChanges.get(k.targetId),X=V&&V.targetMismatches.get(k.targetId)!=null,se=k.view.applyChanges(F,P.isPrimaryClient,M,X);return Fg(P,k.targetId,se.au),se.snapshot})(t,f,g,_);const i=await Rg(t.localStore,e,!0),o=new EN(e,i.Qs),c=o.ru(i.documents),l=Lo.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),u=o.applyChanges(c,t.isPrimaryClient,l);Fg(t,n,u.au);const d=new IN(e,n,o);return t.Tu.set(e,d),t.Iu.has(n)?t.Iu.get(n).push(e):t.Iu.set(n,[e]),u.snapshot}async function CN(t,e,n){const r=Te(t),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter((o=>!Bc(o,e)))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Lu(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),n&&qh(r.remoteStore,s.targetId),Hu(r,s.targetId)})).catch(li)):(Hu(r,s.targetId),await Lu(r.localStore,s.targetId,!0))}async function RN(t,e){const n=Te(t),r=n.Tu.get(e),s=n.Iu.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),qh(n.remoteStore,r.targetId))}async function PN(t,e,n){const r=MN(t);try{const s=await(function(o,c){const l=Te(o),u=ze.now(),d=c.reduce(((_,R)=>_.add(R.key)),Oe());let f,g;return l.persistence.runTransaction("Locally write mutations","readwrite",(_=>{let R=tr(),P=Oe();return l.Ns.getEntries(_,d).next((k=>{R=k,R.forEach(((O,V)=>{V.isValidDocument()||(P=P.add(O))}))})).next((()=>l.localDocuments.getOverlayedDocuments(_,R))).next((k=>{f=k;const O=[];for(const V of c){const F=Bk(V,f.get(V.key).overlayedDocument);F!=null&&O.push(new vs(V.key,F,vv(F.value.mapValue),Kn.exists(!0)))}return l.mutationQueue.addMutationBatch(_,u,O,c)})).next((k=>{g=k;const O=k.applyToLocalDocumentSet(f,P);return l.documentOverlayCache.saveOverlays(_,k.batchId,O)}))})).then((()=>({batchId:g.batchId,changes:Pv(f)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(o,c,l){let u=o.Vu[o.currentUser.toKey()];u||(u=new Ze(Ne)),u=u.insert(c,l),o.Vu[o.currentUser.toKey()]=u})(r,s.batchId,n),await Uo(r,s.changes),await Kc(r.remoteStore)}catch(s){const i=Qh(s,"Failed to persist write");n.reject(i)}}async function uE(t,e){const n=Te(t);try{const r=await UD(n.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=n.Au.get(i);o&&(Be(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?Be(o.hu,14607):s.removedDocuments.size>0&&(Be(o.hu,42227),o.hu=!1))})),await Uo(n,r,e)}catch(r){await li(r)}}function Lg(t,e,n){const r=Te(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Tu.forEach(((i,o)=>{const c=o.view.va(e);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const l=Te(o);l.onlineState=c;let u=!1;l.queries.forEach(((d,f)=>{for(const g of f.Sa)g.va(c)&&(u=!0)})),u&&Jh(l)})(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function kN(t,e,n){const r=Te(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Au.get(e),i=s&&s.key;if(i){let o=new Ze(fe.comparator);o=o.insert(i,Nt.newNoDocument(i,Ie.min()));const c=Oe().add(i),l=new Wc(Ie.min(),new Map,new Ze(Ne),o,c);await uE(r,l),r.du=r.du.remove(i),r.Au.delete(e),Xh(r)}else await Lu(r.localStore,e,!1).then((()=>Hu(r,e,n))).catch(li)}async function DN(t,e){const n=Te(t),r=e.batch.batchId;try{const s=await FD(n.localStore,e);dE(n,r,null),hE(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Uo(n,s)}catch(s){await li(s)}}async function NN(t,e,n){const r=Te(t);try{const s=await(function(o,c){const l=Te(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",(u=>{let d;return l.mutationQueue.lookupMutationBatch(u,c).next((f=>(Be(f!==null,37113),d=f.keys(),l.mutationQueue.removeMutationBatch(u,f)))).next((()=>l.mutationQueue.performConsistencyCheck(u))).next((()=>l.documentOverlayCache.removeOverlaysForBatchId(u,d,c))).next((()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,d))).next((()=>l.localDocuments.getDocuments(u,d)))}))})(r.localStore,e);dE(r,e,n),hE(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Uo(r,s)}catch(s){await li(s)}}function hE(t,e){(t.mu.get(e)||[]).forEach((n=>{n.resolve()})),t.mu.delete(e)}function dE(t,e,n){const r=Te(t);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function Hu(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Iu.get(e))t.Tu.delete(r),n&&t.Pu.yu(r,n);t.Iu.delete(e),t.isPrimaryClient&&t.Ru.jr(e).forEach((r=>{t.Ru.containsKey(r)||fE(t,r)}))}function fE(t,e){t.Eu.delete(e.path.canonicalString());const n=t.du.get(e);n!==null&&(qh(t.remoteStore,n),t.du=t.du.remove(e),t.Au.delete(n),Xh(t))}function Fg(t,e,n){for(const r of n)r instanceof aE?(t.Ru.addReference(r.key,e),ON(t,r)):r instanceof cE?(re(Yh,"Document no longer in limbo: "+r.key),t.Ru.removeReference(r.key,e),t.Ru.containsKey(r.key)||fE(t,r.key)):_e(19791,{wu:r})}function ON(t,e){const n=e.key,r=n.path.canonicalString();t.du.get(n)||t.Eu.has(r)||(re(Yh,"New document in limbo: "+n),t.Eu.add(r),Xh(t))}function Xh(t){for(;t.Eu.size>0&&t.du.size<t.maxConcurrentLimboResolutions;){const e=t.Eu.values().next().value;t.Eu.delete(e);const n=new fe(Xe.fromString(e)),r=t.fu.next();t.Au.set(r,new TN(n)),t.du=t.du.insert(n,r),tE(t.remoteStore,new Ir(Cn(xh(n.path)),r,"TargetPurposeLimboResolution",Lc.ce))}}async function Uo(t,e,n){const r=Te(t),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach(((c,l)=>{o.push(r.pu(l,e,n).then((u=>{if((u||n)&&r.isPrimaryClient){const d=u?!u.fromCache:n?.targetChanges.get(l.targetId)?.current;r.sharedClientState.updateQueryState(l.targetId,d?"current":"not-current")}if(u){s.push(u);const d=jh.As(l.targetId,u);i.push(d)}})))})),await Promise.all(o),r.Pu.H_(s),await(async function(l,u){const d=Te(l);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",(f=>H.forEach(u,(g=>H.forEach(g.Es,(_=>d.persistence.referenceDelegate.addReference(f,g.targetId,_))).next((()=>H.forEach(g.ds,(_=>d.persistence.referenceDelegate.removeReference(f,g.targetId,_)))))))))}catch(f){if(!ui(f))throw f;re($h,"Failed to update sequence numbers: "+f)}for(const f of u){const g=f.targetId;if(!f.fromCache){const _=d.Ms.get(g),R=_.snapshotVersion,P=_.withLastLimboFreeSnapshotVersion(R);d.Ms=d.Ms.insert(g,P)}}})(r.localStore,i))}async function VN(t,e){const n=Te(t);if(!n.currentUser.isEqual(e)){re(Yh,"User change. New user:",e.toKey());const r=await Yv(n.localStore,e);n.currentUser=e,(function(i,o){i.mu.forEach((c=>{c.forEach((l=>{l.reject(new le($.CANCELLED,o))}))})),i.mu.clear()})(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Uo(n,r.Ls)}}function xN(t,e){const n=Te(t),r=n.Au.get(e);if(r&&r.hu)return Oe().add(r.key);{let s=Oe();const i=n.Iu.get(e);if(!i)return s;for(const o of i){const c=n.Tu.get(o);s=s.unionWith(c.view.nu)}return s}}function pE(t){const e=Te(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=uE.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=xN.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=kN.bind(null,e),e.Pu.H_=_N.bind(null,e.eventManager),e.Pu.yu=yN.bind(null,e.eventManager),e}function MN(t){const e=Te(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=DN.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=NN.bind(null,e),e}class ac{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Gc(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,n){return null}Mu(e,n){return null}vu(e){return LD(this.persistence,new VD,e.initialUser,this.serializer)}Cu(e){return new Jv(Bh.mi,this.serializer)}Du(e){return new qD}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ac.provider={build:()=>new ac};class LN extends ac{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,n){Be(this.persistence.referenceDelegate instanceof ic,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new vD(r,e.asyncQueue,n)}Cu(e){const n=this.cacheSizeBytes!==void 0?$t.withCacheSize(this.cacheSizeBytes):$t.DEFAULT;return new Jv((r=>ic.mi(r,n)),this.serializer)}}class Bu{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Lg(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=VN.bind(null,this.syncEngine),await dN(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new pN})()}createDatastore(e){const n=Gc(e.databaseInfo.databaseId),r=(function(i){return new QD(i)})(e.databaseInfo);return(function(i,o,c,l){return new ZD(i,o,c,l)})(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return(function(r,s,i,o,c){return new tN(r,s,i,o,c)})(this.localStore,this.datastore,e.asyncQueue,(n=>Lg(this.syncEngine,n,0)),(function(){return Dg.v()?new Dg:new WD})())}createSyncEngine(e,n){return(function(s,i,o,c,l,u,d){const f=new wN(s,i,o,c,l,u);return d&&(f.gu=!0),f})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){await(async function(n){const r=Te(n);re(ds,"RemoteStore shutting down."),r.Ea.add(5),await Fo(r),r.Aa.shutdown(),r.Ra.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Bu.provider={build:()=>new Bu};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FN{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):er("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,n){setTimeout((()=>{this.muted||e(n)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ur="FirestoreClient";class UN{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=kt.UNAUTHENTICATED,this.clientId=Rh.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{re(Ur,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(re(Ur,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Rr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Qh(n,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Kl(t,e){t.asyncQueue.verifyOperationInProgress(),re(Ur,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener((async s=>{r.isEqual(s)||(await Yv(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>t.terminate())),t._offlineComponents=e}async function Ug(t,e){t.asyncQueue.verifyOperationInProgress();const n=await HN(t);re(Ur,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener((r=>Og(e.remoteStore,r))),t.setAppCheckTokenChangeListener(((r,s)=>Og(e.remoteStore,s))),t._onlineComponents=e}async function HN(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){re(Ur,"Using user provided OfflineComponentProvider");try{await Kl(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!(function(s){return s.name==="FirebaseError"?s.code===$.FAILED_PRECONDITION||s.code===$.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(n))throw n;Xs("Error using user provided cache. Falling back to memory cache: "+n),await Kl(t,new ac)}}else re(Ur,"Using default OfflineComponentProvider"),await Kl(t,new LN(void 0));return t._offlineComponents}async function gE(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(re(Ur,"Using user provided OnlineComponentProvider"),await Ug(t,t._uninitializedComponentsProvider._online)):(re(Ur,"Using default OnlineComponentProvider"),await Ug(t,new Bu))),t._onlineComponents}function BN(t){return gE(t).then((e=>e.syncEngine))}async function jN(t){const e=await gE(t),n=e.eventManager;return n.onListen=bN.bind(null,e.syncEngine),n.onUnlisten=CN.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=AN.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=RN.bind(null,e.syncEngine),n}function $N(t,e,n={}){const r=new Rr;return t.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,l,u){const d=new FN({next:g=>{d.Nu(),o.enqueueAndForget((()=>mN(i,f)));const _=g.docs.has(c);!_&&g.fromCache?u.reject(new le($.UNAVAILABLE,"Failed to get document because the client is offline.")):_&&g.fromCache&&l&&l.source==="server"?u.reject(new le($.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(g)},error:g=>u.reject(g)}),f=new vN(xh(c.path),d,{includeMetadataChanges:!0,qa:!0});return gN(i,f)})(await jN(t),t.asyncQueue,e,n,r))),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mE(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hg=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _E="firestore.googleapis.com",Bg=!0;class jg{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new le($.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=_E,this.ssl=Bg}else this.host=e.host,this.ssl=e.ssl??Bg;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Qv;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<_D)throw new le($.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Z1("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=mE(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new le($.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new le($.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new le($.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Zh{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new jg({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new le($.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new le($.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new jg(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new j1;switch(r.type){case"firstParty":return new G1(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new le($.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(n){const r=Hg.get(n);r&&(re("ComponentProvider","Removing Datastore"),Hg.delete(n),r.terminate())})(this),Promise.resolve()}}function qN(t,e,n,r={}){t=_o(t,Zh);const s=si(e),i=t._getSettings(),o={...i,emulatorOptions:t._getEmulatorOptions()},c=`${e}:${n}`;s&&(U_(`https://${c}`),H_("Firestore",!0)),i.host!==_E&&i.host!==c&&Xs("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...i,host:c,ssl:s,emulatorOptions:r};if(!Or(l,o)&&(t._setSettings(l),r.mockUserToken)){let u,d;if(typeof r.mockUserToken=="string")u=r.mockUserToken,d=kt.MOCK_USER;else{u=Yb(r.mockUserToken,t._app?.options.projectId);const f=r.mockUserToken.sub||r.mockUserToken.user_id;if(!f)throw new le($.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new kt(f)}t._authCredentials=new $1(new cv(u,d))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ed{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ed(this.firestore,e,this._query)}}class mt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ao(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new mt(this.firestore,e,this._key)}toJSON(){return{type:mt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,r){if(xo(n,mt._jsonSchema))return new mt(e,r||null,new fe(Xe.fromString(n.referencePath)))}}mt._jsonSchemaVersion="firestore/documentReference/1.0",mt._jsonSchema={type:ct("string",mt._jsonSchemaVersion),referencePath:ct("string")};class Ao extends ed{constructor(e,n,r){super(e,n,xh(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new mt(this.firestore,null,new fe(e))}withConverter(e){return new Ao(this.firestore,e,this._path)}}function yE(t,e,...n){if(t=Vt(t),arguments.length===1&&(e=Rh.newId()),X1("doc","path",e),t instanceof Zh){const r=Xe.fromString(e,...n);return ng(r),new mt(t,null,new fe(r))}{if(!(t instanceof mt||t instanceof Ao))throw new le($.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Xe.fromString(e,...n));return ng(r),new mt(t.firestore,t instanceof Ao?t.converter:null,new fe(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $g="AsyncQueue";class qg{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Zv(this,"async_queue_retry"),this._c=()=>{const r=zl();r&&re($g,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const n=zl();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const n=zl();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const n=new Rr;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise))).then((()=>n.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Xu.push(e),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!ui(e))throw e;re($g,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const n=this.ac.then((()=>(this.rc=!0,e().catch((r=>{throw this.nc=r,this.rc=!1,er("INTERNAL UNHANDLED ERROR: ",Wg(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=n,n}enqueueAfterDelay(e,n,r){this.uc(),this.oc.indexOf(e)>-1&&(n=0);const s=Kh.createAndSchedule(this,e,n,r,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&_e(47125,{Pc:Wg(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const n of this.tc)if(n.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((n,r)=>n.targetTimeMs-r.targetTimeMs));for(const n of this.tc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Tc()}))}dc(e){this.oc.push(e)}hc(e){const n=this.tc.indexOf(e);this.tc.splice(n,1)}}function Wg(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}class td extends Zh{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new qg,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new qg(e),this._firestoreClient=void 0,await e}}}function WN(t,e){const n=typeof t=="object"?t:uh(),r=typeof t=="string"?t:Za,s=ms(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Qb("firestore");i&&qN(s,...i)}return s}function vE(t){if(t._terminated)throw new le($.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||GN(t),t._firestoreClient}function GN(t){const e=t._freezeSettings(),n=(function(s,i,o,c){return new uk(s,i,o,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,mE(c.experimentalLongPollingOptions),c.useFetchStreams,c.isUsingEmulator)})(t._databaseId,t._app?.options.appId||"",t._persistenceKey,e);t._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(t._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),t._firestoreClient=new UN(t._authCredentials,t._appCheckCredentials,t._queue,n,t._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Zt(bt.fromBase64String(e))}catch(n){throw new le($.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Zt(bt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Zt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(xo(e,Zt._jsonSchema))return Zt.fromBase64String(e.bytes)}}Zt._jsonSchemaVersion="firestore/bytes/1.0",Zt._jsonSchema={type:ct("string",Zt._jsonSchemaVersion),bytes:ct("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new le($.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new wt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new le($.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new le($.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Ne(this._lat,e._lat)||Ne(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Pn._jsonSchemaVersion}}static fromJSON(e){if(xo(e,Pn._jsonSchema))return new Pn(e.latitude,e.longitude)}}Pn._jsonSchemaVersion="firestore/geoPoint/1.0",Pn._jsonSchema={type:ct("string",Pn._jsonSchemaVersion),latitude:ct("number"),longitude:ct("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(e){this._values=(e||[]).map((n=>n))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:kn._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(xo(e,kn._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((n=>typeof n=="number")))return new kn(e.vectorValues);throw new le($.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}kn._jsonSchemaVersion="firestore/vectorValue/1.0",kn._jsonSchema={type:ct("string",kn._jsonSchemaVersion),vectorValues:ct("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zN=/^__.*__$/;class KN{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new vs(e,this.data,this.fieldMask,n,this.fieldTransforms):new Mo(e,this.data,n,this.fieldTransforms)}}function EE(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw _e(40011,{Ac:t})}}class sd{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new sd({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const n=this.path?.child(e),r=this.Vc({path:n,fc:!1});return r.gc(e),r}yc(e){const n=this.path?.child(e),r=this.Vc({path:n,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return cc(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find((n=>e.isPrefixOf(n)))!==void 0||this.fieldTransforms.find((n=>e.isPrefixOf(n.field)))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(EE(this.Ac)&&zN.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class QN{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||Gc(e)}Cc(e,n,r,s=!1){return new sd({Ac:e,methodName:n,Dc:r,path:wt.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function JN(t){const e=t._freezeSettings(),n=Gc(t._databaseId);return new QN(t._databaseId,!!e.ignoreUndefinedProperties,n)}function YN(t,e,n,r,s,i={}){const o=t.Cc(i.merge||i.mergeFields?2:0,e,n,s);bE("Data must be an object, but it was:",o,r);const c=TE(r,o);let l,u;if(i.merge)l=new cn(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const d=[];for(const f of i.mergeFields){const g=XN(e,f,n);if(!o.contains(g))throw new le($.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);eO(d,g)||d.push(g)}l=new cn(d),u=o.fieldTransforms.filter((f=>l.covers(f.field)))}else l=null,u=o.fieldTransforms;return new KN(new Xt(c),l,u)}class id extends rd{_toFieldTransform(e){return new Lk(e.path,new To)}isEqual(e){return e instanceof id}}function IE(t,e){if(wE(t=Vt(t)))return bE("Unsupported field value:",e,t),TE(t,e);if(t instanceof rd)return(function(r,s){if(!EE(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return(function(r,s){const i=[];let o=0;for(const c of r){let l=IE(c,s.wc(o));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),o++}return{arrayValue:{values:i}}})(t,e)}return(function(r,s){if((r=Vt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Vk(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=ze.fromDate(r);return{timestampValue:sc(s.serializer,i)}}if(r instanceof ze){const i=new ze(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:sc(s.serializer,i)}}if(r instanceof Pn)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Zt)return{bytesValue:jv(s.serializer,r._byteString)};if(r instanceof mt){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Sc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Uh(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof kn)return(function(o,c){return{mapValue:{fields:{[_v]:{stringValue:yv},[ec]:{arrayValue:{values:o.toArray().map((u=>{if(typeof u!="number")throw c.Sc("VectorValues must only contain numeric values.");return Mh(c.serializer,u)}))}}}}}})(r,s);throw s.Sc(`Unsupported field value: ${Ph(r)}`)})(t,e)}function TE(t,e){const n={};return hv(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):_s(t,((r,s)=>{const i=IE(s,e.mc(r));i!=null&&(n[r]=i)})),{mapValue:{fields:n}}}function wE(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof ze||t instanceof Pn||t instanceof Zt||t instanceof mt||t instanceof rd||t instanceof kn)}function bE(t,e,n){if(!wE(n)||!lv(n)){const r=Ph(n);throw r==="an object"?e.Sc(t+" a custom object"):e.Sc(t+" "+r)}}function XN(t,e,n){if((e=Vt(e))instanceof nd)return e._internalPath;if(typeof e=="string")return AE(t,e);throw cc("Field path arguments must be of type string or ",t,!1,void 0,n)}const ZN=new RegExp("[~\\*/\\[\\]]");function AE(t,e,n){if(e.search(ZN)>=0)throw cc(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new nd(...e.split("."))._internalPath}catch{throw cc(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function cc(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;n&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||o)&&(l+=" (found",i&&(l+=` in field ${r}`),o&&(l+=` in document ${s}`),l+=")"),new le($.INVALID_ARGUMENT,c+t+l)}function eO(t,e){return t.some((n=>n.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SE{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new mt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new tO(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(CE("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class tO extends SE{data(){return super.data()}}function CE(t,e){return typeof e=="string"?AE(t,e):e instanceof nd?e._internalPath:e._delegate._internalPath}class nO{convertValue(e,n="none"){switch(Lr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return rt(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Mr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw _e(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return _s(e,((s,i)=>{r[s]=this.convertValue(i,n)})),r}convertVectorValue(e){const n=e.fields?.[ec].arrayValue?.values?.map((r=>rt(r.doubleValue)));return new kn(n)}convertGeoPoint(e){return new Pn(rt(e.latitude),rt(e.longitude))}convertArray(e,n){return(e.values||[]).map((r=>this.convertValue(r,n)))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Uc(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(vo(e));default:return null}}convertTimestamp(e){const n=xr(e);return new ze(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Xe.fromString(e);Be(Kv(r),9688,{name:e});const s=new Eo(r.get(1),r.get(3)),i=new fe(r.popFirst(5));return s.isEqual(n)||er(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rO(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}class Ui{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class as extends SE{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new ba(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(CE("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new le($.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=as._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}as._jsonSchemaVersion="firestore/documentSnapshot/1.0",as._jsonSchema={type:ct("string",as._jsonSchemaVersion),bundleSource:ct("string","DocumentSnapshot"),bundleName:ct("string"),bundle:ct("string")};class ba extends as{data(e={}){return super.data(e)}}class no{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new Ui(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((n=>e.push(n))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach((r=>{e.call(n,new ba(this._firestore,this._userDataWriter,r.key,r,new Ui(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new le($.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{const l=new ba(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Ui(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const l=new ba(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Ui(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let u=-1,d=-1;return c.type!==0&&(u=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),d=o.indexOf(c.doc.key)),{type:sO(c.type),doc:l,oldIndex:u,newIndex:d}}))}})(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new le($.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=no._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Rh.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(n.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function sO(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return _e(61501,{type:t})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RE(t){t=_o(t,mt);const e=_o(t.firestore,td);return $N(vE(e),t._key).then((n=>cO(e,t,n)))}no._jsonSchemaVersion="firestore/querySnapshot/1.0",no._jsonSchema={type:ct("string",no._jsonSchemaVersion),bundleSource:ct("string","QuerySnapshot"),bundleName:ct("string"),bundle:ct("string")};class iO extends nO{constructor(e){super(),this.firestore=e}convertBytes(e){return new Zt(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new mt(this.firestore,null,n)}}function oO(t,e,n){t=_o(t,mt);const r=_o(t.firestore,td),s=rO(t.converter,e,n);return aO(r,[YN(JN(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,Kn.none())])}function aO(t,e){return(function(r,s){const i=new Rr;return r.asyncQueue.enqueueAndForget((async()=>PN(await BN(r),s,i))),i.promise})(vE(t),e)}function cO(t,e,n){const r=n.docs.get(e._key),s=new iO(t);return new as(t,s,e._key,r,new Ui(n.hasPendingWrites,n.fromCache),e.converter)}function Gg(){return new id("serverTimestamp")}(function(e,n=!0){(function(s){ci=s})(ii),Dn(new dn("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new td(new q1(r.getProvider("auth-internal")),new z1(o,r.getProvider("app-check-internal")),(function(u,d){if(!Object.prototype.hasOwnProperty.apply(u.options,["projectId"]))throw new le($.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Eo(u.options.projectId,d)})(o,s),o);return i={useFetchStreams:n,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),nn(Xp,Zp,e),nn(Xp,Zp,"esm2020")})();const PE=WN(Zy),lO=async(t,e)=>{const n=yE(PE,t,...e),r=await RE(n);return r.exists()?r.data():null},uO=async(t,e,n)=>{const r=yE(PE,t,...e),s=await RE(r),i={...n,updatedAt:Gg()};return s.exists()||(i.createdAt=Gg()),oO(r,i,{merge:!0})},hO=t=>`plyr_${t}`,zg="Players",dO=0,fO=5e6,Kg=on("player","balance"),pO=bc("player",()=>{const t=pc(ke.getInstance()),e=He(dO),n=Wa(),r=He(n.currentUser?.uid??null),s=He(!1),i=f=>Math.max(0,Math.floor(f)),o=f=>{const g=i(f),_=t.player.balance;if(g===_){e.value=_;return}g>_?t.player.addMoney(g-_):t.player.removeMoney(_-g)},c=f=>{!Number.isFinite(f)||f===0||o(t.player.balance+f)},l=async(f,g)=>{try{await uO(zg,[f],{balance:g})}catch(_){console.error("Failed to persist player balance",_)}},u=async f=>{s.value=!0;try{const _=(await lO(zg,[f]))?.balance??null,R=typeof _=="number"?_:fO;o(R),_===null&&await l(f,R)}catch(g){console.error("Failed to hydrate player balance",g)}finally{s.value=!1}},d=f=>{const g=Number(f.value);e.value=g;const _=r.value;!_||s.value||l(_,g)};return ae.on(Kg,d),So(()=>{ae.off(Kg,d)}),Ey(n,f=>{if(r.value=f?.uid?hO(f.uid):null,r.value){u(r.value);return}o(t.player.balance)}),{balance:e,setBalance:o,adjustBalance:c}}),gO={class:"player-balance",role:"status","aria-live":"polite"},mO={class:"player-balance__value"},_O=At({__name:"PlayerBalanceDisplay",setup(t){const e=pO(),n=oe(()=>`$${(e.balance/100).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`);return(r,s)=>(ge(),be("div",gO,[Ee("span",mO,Bt(n.value),1)]))}}),yO=qt(_O,[["__scopeId","data-v-bd6f3031"]]),kE=["Hit","Stand","Split","Double","Surrender","Insurance"],Qg=()=>({Hit:!0,Stand:!0,Split:!1,Double:!1,Surrender:!1,Insurance:!1}),vO=bc("playerActions",()=>{const t=ps(Qg()),e=l=>t[l];return{enabledMap:t,isEnabled:e,setActionEnabled:(l,u)=>{t[l]=u},setMany:l=>{Object.entries(l).forEach(([u,d])=>{t[u]=d})},reset:()=>{const l=Qg();kE.forEach(u=>{t[u]=l[u]})},triggerAction:l=>e(l)?(ae.emit(os(xi),{event:xi,action:l}),ae.emit(ZP(xi,l),{event:xi,action:l}),!0):!1,play:()=>{ae.emit(os(Au),{event:Au})},reshuffle:()=>{ae.emit(os(Ya),{event:Ya})}}}),DE=bc("dealer",()=>{const t=He([]),e=He(ke.getInstance().rules.deckCount*52),n=He(ke.getInstance().rules.deckCount*52),r=ke.getInstance().table.dealer,s=He(0),i=He(!!r.holeCardHidden),o=He(!1),c=He(null),l=v=>{t.value=[...v]},u=v=>{t.value=[...t.value,v]},d=()=>{l([])},f=(v,me)=>{const Ve=Math.max(1,Math.floor(me)),Se=Math.min(Ve,Math.max(0,Math.floor(v)));e.value=Ve,n.value=Se},g=v=>{const me=n.value+v;n.value=Math.min(e.value,Math.max(0,Math.floor(me)))},_=()=>s.value=Math.trunc(ke.getInstance().table.runningCount),R=()=>i.value=ke.getInstance().table.dealer.holeCardHidden,P=()=>{e.value=ke.getInstance().rules.deckCount*52,n.value=ke.getInstance().rules.deckCount*52,o.value=!1,ke.getInstance().table.dealer.reset(),ke.getInstance().table.dealer.resetDealIndex(),_()},k=()=>{d(),P()};ae.on(os(Ya),()=>{k()});const O=[],V=on("dealer","dealIndex"),F=on("table","runningCount"),M=on("dealer","holeCardHidden");function X(v){if(v.value!==0)return;T();const Ve=v.target.hands[0];if(c.value=zn(Ve)??null,!c.value)throw new Error("dealer hand not found");I=qn("hand",Ws,c.value),ae.on(I,se),ae.on(M,se)}function se(){const v=ke.getInstance().table.dealerChair.activeHand;l(v.cards),R()}function S(v){if(ke.getInstance().table.dealer.pastPenetration()&&(o.value=!0),v.value===0){n.value=ke.getInstance().rules.deckCount*52;return}n.value=Math.max(0,n.value-1)}function E(v){s.value=Math.trunc(v.value)}ae.on(V,S),ae.on(F,E),O.push(()=>ae.off(V,S));const y=zn(ke.getInstance().table.dealerChair);if(!y)throw new Error("dealer chair not found");let I=null;const T=()=>{I&&(ae.off(I,se),ae.off(M,se),I=null,c.value=null)},b=Ka("chair","activeHandIndex",y);return ae.on(b,X),O.push(()=>{ae.off(b,X),T()}),So(()=>{O.forEach(v=>{try{v()}catch(me){console.error("Failed to cleanup dealer store listener",me)}}),O.length=0,T()}),{cards:t,totalShoeSize:e,remainingShoeSize:n,runningCount:s,pastPenetration:o,holeCardHidden:i,setCards:l,addCard:u,resetCards:d,setShoeSizes:f,adjustShoe:g,resetShoe:P,reset:k}});class EO{constructor(){this.deckCount=6,this.dealerHitsSoft17=!0,this.doubleAllowedAfterSplit=!0,this.resplitAcesAllowed=!0,this.surrenderAllowed=!0,this.maxSplits=2,this.blackjackPayout=1.5,this.penetration=52,this.dealerPeekA10=!0}}function Jg(t){return t<0?Math.ceil(t):Math.floor(t)}function IO(t,e){const n=t.rules,r=t.table,s=r.activeChair,i=s?.activeHand,o=r.upCard,c=Math.ceil(2*r.dealer.remainingDecks)/2,l=Math.floor(2*r.dealer.remainingDecks)/2,u=Jg(r.runningCount/c),d=Jg(r.runningCount/l);if(!s||!i||!o)return[];const f=!s.validateAction("Split"),g=!s.validateAction("Double"),_=!s.validateAction("Surrender"),R=i.isSoft,P={dealerUpCard:o.value,softValue:i.softValue,canSplit:f,canDouble:g,canSurrender:_,isSoft:R,DAS:n.doubleAllowedAfterSplit};if(!o||!i)throw new Error("Could not determine correct action");const k=TO(i,o),O=e[k]??[],V=O.find(M=>Yg(P,u,M)),F=O.find(M=>Yg(P,d,M));if(!V?.action||!F?.action)throw`Missing default rule for ${i.softValue} vs ${o.value}`;return[V.action,F.action]}const Yg=(t,e,n)=>!(n.isSoft&&!t.isSoft||n.canDouble&&!t.canDouble||n.canSplit&&!t.canSplit||n.canSurrender&&!t.canSurrender||n.DAS&&!t.DAS),TO=(t,e)=>{const n=e.value;return`${t.softValue}_${n}`},wO={"2_2":[{canSplit:!0,action:"Split"},{action:"Hit"}],"2_3":[{canSplit:!0,action:"Split"},{action:"Hit"}],"2_4":[{canSplit:!0,action:"Split"},{action:"Hit"}],"2_5":[{canSplit:!0,action:"Split"},{action:"Hit"}],"2_6":[{canSplit:!0,action:"Split"},{action:"Hit"}],"2_7":[{canSplit:!0,action:"Split"},{action:"Hit"}],"2_8":[{canSplit:!0,action:"Split"},{action:"Hit"}],"2_9":[{canSplit:!0,action:"Split"},{action:"Hit"}],"2_10":[{canSplit:!0,action:"Split"},{action:"Hit"}],"2_1":[{canSplit:!0,action:"Split"},{action:"Hit"}],"3_2":[{action:"Hit"}],"3_3":[{action:"Hit"}],"3_4":[{action:"Hit"}],"3_5":[{isSoft:!0,canDouble:!0,action:"Double"},{action:"Hit"}],"3_6":[{isSoft:!0,canDouble:!0,action:"Double"},{action:"Hit"}],"3_7":[{action:"Hit"}],"3_8":[{action:"Hit"}],"3_9":[{action:"Hit"}],"3_10":[{action:"Hit"}],"3_1":[{action:"Hit"}],"4_2":[{canSplit:!0,DAS:!0,action:"Split"},{action:"Hit"}],"4_3":[{canSplit:!0,DAS:!0,action:"Split"},{action:"Hit"}],"4_4":[{canSplit:!0,action:"Split"},{action:"Hit"}],"4_5":[{isSoft:!0,canDouble:!0,action:"Double"},{canSplit:!0,action:"Split"},{action:"Hit"}],"4_6":[{isSoft:!0,canDouble:!0,action:"Double"},{canSplit:!0,action:"Split"},{action:"Hit"}],"4_7":[{canSplit:!0,action:"Split"},{action:"Hit"}],"4_8":[{action:"Hit"}],"4_9":[{action:"Hit"}],"4_10":[{action:"Hit"}],"4_1":[{action:"Hit"}],"5_2":[{action:"Hit"}],"5_3":[{action:"Hit"}],"5_4":[{isSoft:!0,canDouble:!0,action:"Double"},{action:"Hit"}],"5_5":[{isSoft:!0,canDouble:!0,action:"Double"},{action:"Hit"}],"5_6":[{isSoft:!0,canDouble:!0,action:"Double"},{action:"Hit"}],"5_7":[{action:"Hit"}],"5_8":[{action:"Hit"}],"5_9":[{action:"Hit"}],"5_10":[{action:"Hit"}],"5_1":[{action:"Hit"}],"6_2":[{canSplit:!0,DAS:!0,action:"Split"},{action:"Hit"}],"6_3":[{canSplit:!0,DAS:!0,action:"Split"},{action:"Hit"}],"6_4":[{isSoft:!0,canDouble:!0,action:"Double"},{canSplit:!0,action:"Split"},{action:"Hit"}],"6_5":[{isSoft:!0,canDouble:!0,action:"Double"},{canSplit:!0,action:"Split"},{action:"Hit"}],"6_6":[{isSoft:!0,canDouble:!0,action:"Double"},{canSplit:!0,action:"Split"},{action:"Hit"}],"6_7":[{canSplit:!0,action:"Split"},{action:"Hit"}],"6_8":[{action:"Hit"}],"6_9":[{action:"Hit"}],"6_10":[{action:"Hit"}],"6_1":[{action:"Hit"}],"7_2":[{action:"Hit"}],"7_3":[{isSoft:!0,canDouble:!0,action:"Double"},{action:"Hit"}],"7_4":[{isSoft:!0,canDouble:!0,action:"Double"},{action:"Hit"}],"7_5":[{isSoft:!0,canDouble:!0,action:"Double"},{action:"Hit"}],"7_6":[{isSoft:!0,canDouble:!0,action:"Double"},{action:"Hit"}],"7_7":[{action:"Hit"}],"7_8":[{action:"Hit"}],"7_9":[{action:"Hit"}],"7_10":[{action:"Hit"}],"7_1":[{action:"Hit"}],"8_2":[{isSoft:!0,canDouble:!0,action:"Double"},{isSoft:!0,action:"Stand"},{action:"Hit"}],"8_3":[{isSoft:!0,canDouble:!0,action:"Double"},{isSoft:!0,action:"Stand"},{action:"Hit"}],"8_4":[{isSoft:!0,canDouble:!0,action:"Double"},{isSoft:!0,action:"Stand"},{action:"Hit"}],"8_5":[{isSoft:!0,canDouble:!0,action:"Double"},{isSoft:!0,action:"Stand"},{canSplit:!0,DAS:!0,action:"Split"},{action:"Hit"}],"8_6":[{isSoft:!0,canDouble:!0,action:"Double"},{isSoft:!0,action:"Stand"},{canSplit:!0,DAS:!0,action:"Split"},{action:"Hit"}],"8_7":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"8_8":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"8_9":[{action:"Hit"}],"8_10":[{action:"Hit"}],"8_1":[{action:"Hit"}],"9_2":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"9_3":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"9_4":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"9_5":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"9_6":[{isSoft:!0,canDouble:!0,action:"Double"},{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"9_7":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"9_8":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"9_9":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"9_10":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"9_1":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"10_2":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"10_3":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"10_4":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"10_5":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"10_6":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"10_7":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"10_8":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"10_9":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"10_10":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"10_1":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"11_2":[{canDouble:!0,action:"Double"},{action:"Hit"}],"11_3":[{canDouble:!0,action:"Double"},{action:"Hit"}],"11_4":[{canDouble:!0,action:"Double"},{action:"Hit"}],"11_5":[{canDouble:!0,action:"Double"},{action:"Hit"}],"11_6":[{canDouble:!0,action:"Double"},{action:"Hit"}],"11_7":[{canDouble:!0,action:"Double"},{action:"Hit"}],"11_8":[{canDouble:!0,action:"Double"},{action:"Hit"}],"11_9":[{canDouble:!0,action:"Double"},{action:"Hit"}],"11_10":[{canDouble:!0,action:"Double"},{action:"Hit"}],"11_1":[{canDouble:!0,action:"Double"},{action:"Hit"}],"12_2":[{canSplit:!0,DAS:!0,action:"Split"},{action:"Hit"}],"12_3":[{canSplit:!0,action:"Split"},{action:"Hit"}],"12_4":[{canSplit:!0,action:"Split"},{action:"Stand"}],"12_5":[{canSplit:!0,action:"Split"},{action:"Stand"}],"12_6":[{canSplit:!0,action:"Split"},{action:"Stand"}],"12_7":[{action:"Hit"}],"12_8":[{action:"Hit"}],"12_9":[{action:"Hit"}],"12_10":[{action:"Hit"}],"12_1":[{action:"Hit"}],"13_2":[{action:"Stand"}],"13_3":[{action:"Stand"}],"13_4":[{action:"Stand"}],"13_5":[{action:"Stand"}],"13_6":[{action:"Stand"}],"13_7":[{action:"Hit"}],"13_8":[{action:"Hit"}],"13_9":[{action:"Hit"}],"13_10":[{action:"Hit"}],"13_1":[{action:"Hit"}],"14_2":[{canSplit:!0,action:"Split"},{action:"Stand"}],"14_3":[{canSplit:!0,action:"Split"},{action:"Stand"}],"14_4":[{canSplit:!0,action:"Split"},{action:"Stand"}],"14_5":[{canSplit:!0,action:"Split"},{action:"Stand"}],"14_6":[{canSplit:!0,action:"Split"},{action:"Stand"}],"14_7":[{canSplit:!0,action:"Split"},{action:"Hit"}],"14_8":[{action:"Hit"}],"14_9":[{action:"Hit"}],"14_10":[{action:"Hit"}],"14_1":[{action:"Hit"}],"15_2":[{action:"Stand"}],"15_3":[{action:"Stand"}],"15_4":[{action:"Stand"}],"15_5":[{action:"Stand"}],"15_6":[{action:"Stand"}],"15_7":[{action:"Hit"}],"15_8":[{action:"Hit"}],"15_9":[{action:"Hit"}],"15_10":[{canSurrender:!0,action:"Surrender"},{action:"Hit"}],"15_1":[{canSurrender:!0,action:"Surrender"},{action:"Hit"}],"16_2":[{canSplit:!0,action:"Split"},{action:"Stand"}],"16_3":[{canSplit:!0,action:"Split"},{action:"Stand"}],"16_4":[{canSplit:!0,action:"Split"},{action:"Stand"}],"16_5":[{canSplit:!0,action:"Split"},{action:"Stand"}],"16_6":[{canSplit:!0,action:"Split"},{action:"Stand"}],"16_7":[{canSplit:!0,action:"Split"},{action:"Hit"}],"16_8":[{canSplit:!0,action:"Split"},{action:"Hit"}],"16_9":[{canSplit:!0,action:"Split"},{canSurrender:!0,action:"Surrender"},{action:"Hit"}],"16_10":[{canSplit:!0,action:"Split"},{canSurrender:!0,action:"Surrender"},{action:"Hit"}],"16_1":[{canSurrender:!0,action:"Surrender"},{canSplit:!0,action:"Split"},{action:"Hit"}],"17_2":[{action:"Stand"}],"17_3":[{action:"Stand"}],"17_4":[{action:"Stand"}],"17_5":[{action:"Stand"}],"17_6":[{action:"Stand"}],"17_7":[{action:"Stand"}],"17_8":[{action:"Stand"}],"17_9":[{action:"Stand"}],"17_10":[{action:"Stand"}],"17_1":[{canSurrender:!0,action:"Surrender"},{action:"Stand"}],"18_2":[{canSplit:!0,action:"Split"},{action:"Stand"}],"18_3":[{canSplit:!0,action:"Split"},{action:"Stand"}],"18_4":[{canSplit:!0,action:"Split"},{action:"Stand"}],"18_5":[{canSplit:!0,action:"Split"},{action:"Stand"}],"18_6":[{canSplit:!0,action:"Split"},{action:"Stand"}],"18_7":[{action:"Stand"}],"18_8":[{canSplit:!0,action:"Split"},{action:"Stand"}],"18_9":[{canSplit:!0,action:"Split"},{action:"Stand"}],"18_10":[{action:"Stand"}],"18_1":[{action:"Stand"}],"19_2":[{action:"Stand"}],"19_3":[{action:"Stand"}],"19_4":[{action:"Stand"}],"19_5":[{action:"Stand"}],"19_6":[{action:"Stand"}],"19_7":[{action:"Stand"}],"19_8":[{action:"Stand"}],"19_9":[{action:"Stand"}],"19_10":[{action:"Stand"}],"19_1":[{action:"Stand"}],"20_2":[{action:"Stand"}],"20_3":[{action:"Stand"}],"20_4":[{action:"Stand"}],"20_5":[{action:"Stand"}],"20_6":[{action:"Stand"}],"20_7":[{action:"Stand"}],"20_8":[{action:"Stand"}],"20_9":[{action:"Stand"}],"20_10":[{action:"Stand"}],"20_1":[{action:"Stand"}]},bO={class:"action-section","aria-label":"Player actions"},AO=["disabled"],SO={key:1,class:"action-section__content action-section__actions"},CO=["disabled","onClick"],RO=At({__name:"ActionSection",setup(t){const e=He(!1),n=He(!1),r=He(!1),s=vO(),i=DE(),o=kE,c=d=>{try{const f=IO(ke.getInstance(),wO);f.includes(d)||console.log(`Incorrect action chosen: ${d}. Recommended actions: ${Array.from(new Set(f)).join(", ")}`)}catch(f){console.error("Error determining correct action:",f)}s.triggerAction(d)},l=()=>{if(r.value){s.reshuffle();return}s.play()};function u(){const d=ke.getInstance().table;if(r.value=i.pastPenetration,n.value=!d.validateRoundCanStart(),!d.aPlayerHasCards){e.value=!1;return}const f=d.activeChair;if(!f||!f.activeHand)return;e.value=!0;const _=f.listViableActions();_&&s.setMany(_)}return ae.on(on("chair","activeHandIndex"),d=>{u()}),ae.on(Gn("hand",Ws),d=>{u()}),ae.on(on("chair","bet"),d=>{u()}),ae.on(on("table","chairTurnIndex"),d=>{u()}),ae.on(on("table","runningCount"),d=>{u()}),ae.on(Gn("table",Ms),d=>{u()}),ae.on(on("dealer","dealIndex"),d=>{u()}),(d,f)=>(ge(),be("section",bO,[e.value?(ge(),be("div",SO,[(ge(!0),be(Tt,null,ao(nt(o),g=>(ge(),be("button",{key:g,class:"action-section__button",type:"button",disabled:!nt(s).isEnabled(g),onClick:_=>c(g)},Bt(g),9,CO))),128))])):(ge(),be("button",{key:0,class:"action-section__play action-section__content",type:"button",disabled:!n.value&&!r.value,onClick:f[0]||(f[0]=g=>l())},Bt(r.value?"Reshuffle":"Play"),9,AO))]))}}),PO=qt(RO,[["__scopeId","data-v-a2f41c24"]]),kO={class:"dealer-section","aria-label":"Dealer hand"},DO={class:"dealer-section__count","aria-live":"polite"},NO={class:"dealer-section__count-value"},OO={class:"dealer-section__content"},VO={class:"dealer-shoe","aria-label":"Remaining shoe"},xO={class:"dealer-shoe__track"},MO=At({__name:"DealerSection",setup(t){const e=DE(),n=oe(()=>360),r=oe(()=>e.holeCardHidden),s=oe(()=>{if(!r.value)return e.cards;const[c,...l]=e.cards;return c?[c,{},...l.slice(1)]:[]}),i=oe(()=>{const c=e.totalShoeSize||1,l=c>0?e.remainingShoeSize/c:0;return Math.max(0,Math.min(100,Math.round(l*100)))}),o=oe(()=>{const c=e.runningCount;return`${c>0?"+":""}${c}`});return(c,l)=>(ge(),be("section",kO,[Ee("div",DO,[l[0]||(l[0]=Ic(" Running Count: ",-1)),Ee("span",NO,Bt(o.value),1)]),Ee("div",OO,[Ee("div",VO,[Ee("div",xO,[Ee("div",{class:"dealer-shoe__fill",style:Qn({height:`${i.value}%`})},null,4)])]),st(ga,{cards:s.value,maxWidth:n.value,large:""},null,8,["cards","maxWidth"])])]))}}),LO=qt(MO,[["__scopeId","data-v-d78c6833"]]),FO={class:"table-upper"},UO={class:"table-lower"},HO=At({__name:"Table",setup(t){const e=Sh(),n=[0,1,2];return(r,s)=>(ge(),be(Tt,null,[Ee("div",FO,[st(LO),st(PO)]),Ee("div",UO,[(ge(),be(Tt,null,ao(n,i=>(ge(),be(Tt,{key:i},[nt(e).getChairView(i)?(ge(),Wn(x1,{key:0,"chair-id":i},null,8,["chair-id"])):(ge(),Wn(B1,{key:1,"chair-id":i},null,8,["chair-id"]))],64))),64))]),st(yO)],64))}}),BO=qt(HO,[["__scopeId","data-v-19cbb27a"]]),jO={class:"home-shell"},$O=At({__name:"HomeView",setup(t){return(e,n)=>(ge(),be("div",jO,[st(PP),st(BO)]))}}),qO=qt($O,[["__scopeId","data-v-5c61b5e6"]]),WO={class:"finish-shell"},GO={id:"status-message",class:"finish-shell__status"},zO=At({__name:"FinishSignUp",setup(t){const e=He("Checking link…"),n=He(""),r=async()=>{const s=Wa(),i=(window.localStorage.getItem(Yi)||"").trim();if(!i){e.value="Failed to finish signing in. Please request a new link and try again.";return}try{e.value="Verifying sign-in link…";const o=await SC(s,i,n.value||window.location.href);window.localStorage.removeItem(Yi);const c=NC(o);console.log("Firebase sign-in complete",{user:o.user,providerId:c?.providerId,isNewUser:c?.isNewUser,profile:c?.profile}),e.value=`Welcome back${c?.profile?", profile info logged in console.":"!"} Signed in as ${o.user.email??i}.`}catch(o){console.error("Failed to finish email link sign-in",o),e.value="Failed to finish signing in. Please request a new link and try again."}};return yc(()=>{const s=Wa(),i=window.location.href;if(n.value=i,!AC(s,i)){e.value="Invalid or expired sign-in link. Request a new one from the app.";return}if(window.localStorage.getItem(Yi)){r();return}}),(s,i)=>(ge(),be("main",WO,[i[0]||(i[0]=Ee("h1",null,"Completing Sign In…",-1)),Ee("p",GO,Bt(e.value),1)]))}}),KO=qt(zO,[["__scopeId","data-v-ce4d425a"]]),QO=Ub({history:yb("/bjk/"),routes:[{path:"/",name:"home",component:qO},{path:"/finishSignUp",name:"finish-sign-up",component:KO}]}),JO=t=>{YO(t),XO(t)};function YO(t){ae.on(os(xi),e=>{if(!e.action||!t1(e.action)){console.error("failing to act on invalid action",e);return}t.act(e.action)})}function XO(t){ae.on(os(Au),e=>{t.startRound()})}class NE{constructor(e){this.balance=e}addMoney(e){this.balance+=e}removeMoney(e){this.balance-=e}}Mc(NE,{model:"player",props:["balance"],trackInstance:!1});function ZO(){const t=new EO,e=JP(t.deckCount),n=new Ah,r=new Oo(e);r.shuffle(),r.resetDealIndex();const s=new ev(r,n,[],{logAfterAction:!1});return JO(s),ke.initialize({player:new NE(1e5),rules:t,table:s}),ke.getInstance()}ZO();const od=Sw(Hb);od.use(Pw());od.use(QO);od.mount("#app");
