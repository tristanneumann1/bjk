(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Oo(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Ie={},qn=[],St=()=>{},Tl=()=>!1,Gs=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),No=t=>t.startsWith("onUpdate:"),Me=Object.assign,xo=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Df=Object.prototype.hasOwnProperty,_e=(t,e)=>Df.call(t,e),te=Array.isArray,Jn=t=>Ks(t)==="[object Map]",Rl=t=>Ks(t)==="[object Set]",oe=t=>typeof t=="function",De=t=>typeof t=="string",vn=t=>typeof t=="symbol",Ce=t=>t!==null&&typeof t=="object",Pl=t=>(Ce(t)||oe(t))&&oe(t.then)&&oe(t.catch),kl=Object.prototype.toString,Ks=t=>kl.call(t),Of=t=>Ks(t).slice(8,-1),Dl=t=>Ks(t)==="[object Object]",Mo=t=>De(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Sr=Oo(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),zs=t=>{const e=Object.create(null);return(n=>e[n]||(e[n]=t(n)))},Nf=/-\w/g,gn=zs(t=>t.replace(Nf,e=>e.slice(1).toUpperCase())),xf=/\B([A-Z])/g,Hn=zs(t=>t.replace(xf,"-$1").toLowerCase()),Ol=zs(t=>t.charAt(0).toUpperCase()+t.slice(1)),vi=zs(t=>t?`on${Ol(t)}`:""),ln=(t,e)=>!Object.is(t,e),cs=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},Nl=(t,e,n,r=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:r,value:n})},Zi=t=>{const e=parseFloat(t);return isNaN(e)?t:e},Mf=t=>{const e=De(t)?Number(t):NaN;return isNaN(e)?t:e};let Ia;const qs=()=>Ia||(Ia=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function jt(t){if(te(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=De(r)?Bf(r):jt(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(De(t)||Ce(t))return t}const Lf=/;(?![^(]*\))/g,Hf=/:([^]+)/,Uf=/\/\*[^]*?\*\//g;function Bf(t){const e={};return t.replace(Uf,"").split(Lf).forEach(n=>{if(n){const r=n.split(Hf);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Lt(t){let e="";if(De(t))e=t;else if(te(t))for(let n=0;n<t.length;n++){const r=Lt(t[n]);r&&(e+=r+" ")}else if(Ce(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Ff="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",$f=Oo(Ff);function xl(t){return!!t||t===""}const Ml=t=>!!(t&&t.__v_isRef===!0),ze=t=>De(t)?t:t==null?"":te(t)||Ce(t)&&(t.toString===kl||!oe(t.toString))?Ml(t)?ze(t.value):JSON.stringify(t,Ll,2):String(t),Ll=(t,e)=>Ml(e)?Ll(t,e.value):Jn(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s],i)=>(n[bi(r,i)+" =>"]=s,n),{})}:Rl(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>bi(n))}:vn(e)?bi(e):Ce(e)&&!te(e)&&!Dl(e)?String(e):e,bi=(t,e="")=>{var n;return vn(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Fe;class Hl{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Fe,!e&&Fe&&(this.index=(Fe.scopes||(Fe.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=Fe;try{return Fe=this,e()}finally{Fe=n}}}on(){++this._on===1&&(this.prevScope=Fe,Fe=this)}off(){this._on>0&&--this._on===0&&(Fe=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Ul(t){return new Hl(t)}function Bl(){return Fe}function Kr(t,e=!1){Fe&&Fe.cleanups.push(t)}let Ee;const yi=new WeakSet;class Fl{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Fe&&Fe.active&&Fe.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,yi.has(this)&&(yi.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Vl(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,wa(this),jl(this);const e=Ee,n=lt;Ee=this,lt=!0;try{return this.fn()}finally{Wl(this),Ee=e,lt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Uo(e);this.deps=this.depsTail=void 0,wa(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?yi.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){eo(this)&&this.run()}get dirty(){return eo(this)}}let $l=0,Ir,wr;function Vl(t,e=!1){if(t.flags|=8,e){t.next=wr,wr=t;return}t.next=Ir,Ir=t}function Lo(){$l++}function Ho(){if(--$l>0)return;if(wr){let e=wr;for(wr=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Ir;){let e=Ir;for(Ir=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){t||(t=r)}e=n}}if(t)throw t}function jl(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Wl(t){let e,n=t.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),Uo(r),Vf(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}t.deps=e,t.depsTail=n}function eo(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Gl(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function Gl(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===Nr)||(t.globalVersion=Nr,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!eo(t))))return;t.flags|=2;const e=t.dep,n=Ee,r=lt;Ee=t,lt=!0;try{jl(t);const s=t.fn(t._value);(e.version===0||ln(s,t._value))&&(t.flags|=128,t._value=s,e.version++)}catch(s){throw e.version++,s}finally{Ee=n,lt=r,Wl(t),t.flags&=-3}}function Uo(t,e=!1){const{dep:n,prevSub:r,nextSub:s}=t;if(r&&(r.nextSub=s,t.prevSub=void 0),s&&(s.prevSub=r,t.nextSub=void 0),n.subs===t&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)Uo(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function Vf(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let lt=!0;const Kl=[];function Wt(){Kl.push(lt),lt=!1}function Gt(){const t=Kl.pop();lt=t===void 0?!0:t}function wa(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=Ee;Ee=void 0;try{e()}finally{Ee=n}}}let Nr=0;class jf{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Bo{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Ee||!lt||Ee===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Ee)n=this.activeLink=new jf(Ee,this),Ee.deps?(n.prevDep=Ee.depsTail,Ee.depsTail.nextDep=n,Ee.depsTail=n):Ee.deps=Ee.depsTail=n,zl(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=Ee.depsTail,n.nextDep=void 0,Ee.depsTail.nextDep=n,Ee.depsTail=n,Ee.deps===n&&(Ee.deps=r)}return n}trigger(e){this.version++,Nr++,this.notify(e)}notify(e){Lo();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Ho()}}}function zl(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)zl(r)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const ys=new WeakMap,Pn=Symbol(""),to=Symbol(""),xr=Symbol("");function $e(t,e,n){if(lt&&Ee){let r=ys.get(t);r||ys.set(t,r=new Map);let s=r.get(n);s||(r.set(n,s=new Bo),s.map=r,s.key=n),s.track()}}function xt(t,e,n,r,s,i){const o=ys.get(t);if(!o){Nr++;return}const a=c=>{c&&c.trigger()};if(Lo(),e==="clear")o.forEach(a);else{const c=te(t),l=c&&Mo(n);if(c&&n==="length"){const u=Number(r);o.forEach((d,f)=>{(f==="length"||f===xr||!vn(f)&&f>=u)&&a(d)})}else switch((n!==void 0||o.has(void 0))&&a(o.get(n)),l&&a(o.get(xr)),e){case"add":c?l&&a(o.get("length")):(a(o.get(Pn)),Jn(t)&&a(o.get(to)));break;case"delete":c||(a(o.get(Pn)),Jn(t)&&a(o.get(to)));break;case"set":Jn(t)&&a(o.get(Pn));break}}Ho()}function Wf(t,e){const n=ys.get(t);return n&&n.get(e)}function Fn(t){const e=ge(t);return e===t?e:($e(e,"iterate",xr),it(t)?e:e.map(He))}function Js(t){return $e(t=ge(t),"iterate",xr),t}const Gf={__proto__:null,[Symbol.iterator](){return Si(this,Symbol.iterator,He)},concat(...t){return Fn(this).concat(...t.map(e=>te(e)?Fn(e):e))},entries(){return Si(this,"entries",t=>(t[1]=He(t[1]),t))},every(t,e){return Pt(this,"every",t,e,void 0,arguments)},filter(t,e){return Pt(this,"filter",t,e,n=>n.map(He),arguments)},find(t,e){return Pt(this,"find",t,e,He,arguments)},findIndex(t,e){return Pt(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return Pt(this,"findLast",t,e,He,arguments)},findLastIndex(t,e){return Pt(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return Pt(this,"forEach",t,e,void 0,arguments)},includes(...t){return Ii(this,"includes",t)},indexOf(...t){return Ii(this,"indexOf",t)},join(t){return Fn(this).join(t)},lastIndexOf(...t){return Ii(this,"lastIndexOf",t)},map(t,e){return Pt(this,"map",t,e,void 0,arguments)},pop(){return fr(this,"pop")},push(...t){return fr(this,"push",t)},reduce(t,...e){return Ea(this,"reduce",t,e)},reduceRight(t,...e){return Ea(this,"reduceRight",t,e)},shift(){return fr(this,"shift")},some(t,e){return Pt(this,"some",t,e,void 0,arguments)},splice(...t){return fr(this,"splice",t)},toReversed(){return Fn(this).toReversed()},toSorted(t){return Fn(this).toSorted(t)},toSpliced(...t){return Fn(this).toSpliced(...t)},unshift(...t){return fr(this,"unshift",t)},values(){return Si(this,"values",He)}};function Si(t,e,n){const r=Js(t),s=r[e]();return r!==t&&!it(t)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.value&&(i.value=n(i.value)),i}),s}const Kf=Array.prototype;function Pt(t,e,n,r,s,i){const o=Js(t),a=o!==t&&!it(t),c=o[e];if(c!==Kf[e]){const d=c.apply(t,i);return a?He(d):d}let l=n;o!==t&&(a?l=function(d,f){return n.call(this,He(d),f,t)}:n.length>2&&(l=function(d,f){return n.call(this,d,f,t)}));const u=c.call(o,l,r);return a&&s?s(u):u}function Ea(t,e,n,r){const s=Js(t);let i=n;return s!==t&&(it(t)?n.length>3&&(i=function(o,a,c){return n.call(this,o,a,c,t)}):i=function(o,a,c){return n.call(this,o,He(a),c,t)}),s[e](i,...r)}function Ii(t,e,n){const r=ge(t);$e(r,"iterate",xr);const s=r[e](...n);return(s===-1||s===!1)&&Vo(n[0])?(n[0]=ge(n[0]),r[e](...n)):s}function fr(t,e,n=[]){Wt(),Lo();const r=ge(t)[e].apply(t,n);return Ho(),Gt(),r}const zf=Oo("__proto__,__v_isRef,__isVue"),ql=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(vn));function qf(t){vn(t)||(t=String(t));const e=ge(this);return $e(e,"has",t),e.hasOwnProperty(t)}class Jl{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,r){if(n==="__v_skip")return e.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?sh:Zl:i?Ql:Xl).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=te(e);if(!s){let c;if(o&&(c=Gf[n]))return c;if(n==="hasOwnProperty")return qf}const a=Reflect.get(e,n,ke(e)?e:r);return(vn(n)?ql.has(n):zf(n))||(s||$e(e,"get",n),i)?a:ke(a)?o&&Mo(n)?a:a.value:Ce(a)?s?tu(a):Un(a):a}}class Yl extends Jl{constructor(e=!1){super(!1,e)}set(e,n,r,s){let i=e[n];if(!this._isShallow){const c=mn(i);if(!it(r)&&!mn(r)&&(i=ge(i),r=ge(r)),!te(e)&&ke(i)&&!ke(r))return c||(i.value=r),!0}const o=te(e)&&Mo(n)?Number(n)<e.length:_e(e,n),a=Reflect.set(e,n,r,ke(e)?e:s);return e===ge(s)&&(o?ln(r,i)&&xt(e,"set",n,r):xt(e,"add",n,r)),a}deleteProperty(e,n){const r=_e(e,n);e[n];const s=Reflect.deleteProperty(e,n);return s&&r&&xt(e,"delete",n,void 0),s}has(e,n){const r=Reflect.has(e,n);return(!vn(n)||!ql.has(n))&&$e(e,"has",n),r}ownKeys(e){return $e(e,"iterate",te(e)?"length":Pn),Reflect.ownKeys(e)}}class Jf extends Jl{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const Yf=new Yl,Xf=new Jf,Qf=new Yl(!0);const no=t=>t,ns=t=>Reflect.getPrototypeOf(t);function Zf(t,e,n){return function(...r){const s=this.__v_raw,i=ge(s),o=Jn(i),a=t==="entries"||t===Symbol.iterator&&o,c=t==="keys"&&o,l=s[t](...r),u=n?no:e?Ss:He;return!e&&$e(i,"iterate",c?to:Pn),{next(){const{value:d,done:f}=l.next();return f?{value:d,done:f}:{value:a?[u(d[0]),u(d[1])]:u(d),done:f}},[Symbol.iterator](){return this}}}}function rs(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function eh(t,e){const n={get(s){const i=this.__v_raw,o=ge(i),a=ge(s);t||(ln(s,a)&&$e(o,"get",s),$e(o,"get",a));const{has:c}=ns(o),l=e?no:t?Ss:He;if(c.call(o,s))return l(i.get(s));if(c.call(o,a))return l(i.get(a));i!==o&&i.get(s)},get size(){const s=this.__v_raw;return!t&&$e(ge(s),"iterate",Pn),s.size},has(s){const i=this.__v_raw,o=ge(i),a=ge(s);return t||(ln(s,a)&&$e(o,"has",s),$e(o,"has",a)),s===a?i.has(s):i.has(s)||i.has(a)},forEach(s,i){const o=this,a=o.__v_raw,c=ge(a),l=e?no:t?Ss:He;return!t&&$e(c,"iterate",Pn),a.forEach((u,d)=>s.call(i,l(u),l(d),o))}};return Me(n,t?{add:rs("add"),set:rs("set"),delete:rs("delete"),clear:rs("clear")}:{add(s){!e&&!it(s)&&!mn(s)&&(s=ge(s));const i=ge(this);return ns(i).has.call(i,s)||(i.add(s),xt(i,"add",s,s)),this},set(s,i){!e&&!it(i)&&!mn(i)&&(i=ge(i));const o=ge(this),{has:a,get:c}=ns(o);let l=a.call(o,s);l||(s=ge(s),l=a.call(o,s));const u=c.call(o,s);return o.set(s,i),l?ln(i,u)&&xt(o,"set",s,i):xt(o,"add",s,i),this},delete(s){const i=ge(this),{has:o,get:a}=ns(i);let c=o.call(i,s);c||(s=ge(s),c=o.call(i,s)),a&&a.call(i,s);const l=i.delete(s);return c&&xt(i,"delete",s,void 0),l},clear(){const s=ge(this),i=s.size!==0,o=s.clear();return i&&xt(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=Zf(s,t,e)}),n}function Fo(t,e){const n=eh(t,e);return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(_e(n,s)&&s in r?n:r,s,i)}const th={get:Fo(!1,!1)},nh={get:Fo(!1,!0)},rh={get:Fo(!0,!1)};const Xl=new WeakMap,Ql=new WeakMap,Zl=new WeakMap,sh=new WeakMap;function ih(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function oh(t){return t.__v_skip||!Object.isExtensible(t)?0:ih(Of(t))}function Un(t){return mn(t)?t:$o(t,!1,Yf,th,Xl)}function eu(t){return $o(t,!1,Qf,nh,Ql)}function tu(t){return $o(t,!0,Xf,rh,Zl)}function $o(t,e,n,r,s){if(!Ce(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=oh(t);if(i===0)return t;const o=s.get(t);if(o)return o;const a=new Proxy(t,i===2?r:n);return s.set(t,a),a}function un(t){return mn(t)?un(t.__v_raw):!!(t&&t.__v_isReactive)}function mn(t){return!!(t&&t.__v_isReadonly)}function it(t){return!!(t&&t.__v_isShallow)}function Vo(t){return t?!!t.__v_raw:!1}function ge(t){const e=t&&t.__v_raw;return e?ge(e):t}function Ys(t){return!_e(t,"__v_skip")&&Object.isExtensible(t)&&Nl(t,"__v_skip",!0),t}const He=t=>Ce(t)?Un(t):t,Ss=t=>Ce(t)?tu(t):t;function ke(t){return t?t.__v_isRef===!0:!1}function be(t){return nu(t,!1)}function ah(t){return nu(t,!0)}function nu(t,e){return ke(t)?t:new ch(t,e)}class ch{constructor(e,n){this.dep=new Bo,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:ge(e),this._value=n?e:He(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,r=this.__v_isShallow||it(e)||mn(e);e=r?e:ge(e),ln(e,n)&&(this._rawValue=e,this._value=r?e:He(e),this.dep.trigger())}}function Re(t){return ke(t)?t.value:t}const lh={get:(t,e,n)=>e==="__v_raw"?t:Re(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return ke(s)&&!ke(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function ru(t){return un(t)?t:new Proxy(t,lh)}function uh(t){const e=te(t)?new Array(t.length):{};for(const n in t)e[n]=fh(t,n);return e}class dh{constructor(e,n,r){this._object=e,this._key=n,this._defaultValue=r,this.__v_isRef=!0,this._value=void 0}get value(){const e=this._object[this._key];return this._value=e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return Wf(ge(this._object),this._key)}}function fh(t,e,n){const r=t[e];return ke(r)?r:new dh(t,e,n)}class hh{constructor(e,n,r){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Bo(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Nr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&Ee!==this)return Vl(this,!0),!0}get value(){const e=this.dep.track();return Gl(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function ph(t,e,n=!1){let r,s;return oe(t)?r=t:(r=t.get,s=t.set),new hh(r,s,n)}const ss={},Is=new WeakMap;let En;function gh(t,e=!1,n=En){if(n){let r=Is.get(n);r||Is.set(n,r=[]),r.push(t)}}function mh(t,e,n=Ie){const{immediate:r,deep:s,once:i,scheduler:o,augmentJob:a,call:c}=n,l=I=>s?I:it(I)||s===!1||s===0?Mt(I,1):Mt(I);let u,d,f,g,_=!1,b=!1;if(ke(t)?(d=()=>t.value,_=it(t)):un(t)?(d=()=>l(t),_=!0):te(t)?(b=!0,_=t.some(I=>un(I)||it(I)),d=()=>t.map(I=>{if(ke(I))return I.value;if(un(I))return l(I);if(oe(I))return c?c(I,2):I()})):oe(t)?e?d=c?()=>c(t,2):t:d=()=>{if(f){Wt();try{f()}finally{Gt()}}const I=En;En=u;try{return c?c(t,3,[g]):t(g)}finally{En=I}}:d=St,e&&s){const I=d,q=s===!0?1/0:s;d=()=>Mt(I(),q)}const R=Bl(),E=()=>{u.stop(),R&&R.active&&xo(R.effects,u)};if(i&&e){const I=e;e=(...q)=>{I(...q),E()}}let C=b?new Array(t.length).fill(ss):ss;const k=I=>{if(!(!(u.flags&1)||!u.dirty&&!I))if(e){const q=u.run();if(s||_||(b?q.some((ne,re)=>ln(ne,C[re])):ln(q,C))){f&&f();const ne=En;En=u;try{const re=[q,C===ss?void 0:b&&C[0]===ss?[]:C,g];C=q,c?c(e,3,re):e(...re)}finally{En=ne}}}else u.run()};return a&&a(k),u=new Fl(d),u.scheduler=o?()=>o(k,!1):k,g=I=>gh(I,!1,u),f=u.onStop=()=>{const I=Is.get(u);if(I){if(c)c(I,4);else for(const q of I)q();Is.delete(u)}},e?r?k(!0):C=u.run():o?o(k.bind(null,!0),!0):u.run(),E.pause=u.pause.bind(u),E.resume=u.resume.bind(u),E.stop=E,E}function Mt(t,e=1/0,n){if(e<=0||!Ce(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,ke(t))Mt(t.value,e,n);else if(te(t))for(let r=0;r<t.length;r++)Mt(t[r],e,n);else if(Rl(t)||Jn(t))t.forEach(r=>{Mt(r,e,n)});else if(Dl(t)){for(const r in t)Mt(t[r],e,n);for(const r of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,r)&&Mt(t[r],e,n)}return t}/**
* @vue/runtime-core v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function zr(t,e,n,r){try{return r?t(...r):t()}catch(s){Xs(s,e,n)}}function ut(t,e,n,r){if(oe(t)){const s=zr(t,e,n,r);return s&&Pl(s)&&s.catch(i=>{Xs(i,e,n)}),s}if(te(t)){const s=[];for(let i=0;i<t.length;i++)s.push(ut(t[i],e,n,r));return s}}function Xs(t,e,n,r=!0){const s=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Ie;if(e){let a=e.parent;const c=e.proxy,l=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const u=a.ec;if(u){for(let d=0;d<u.length;d++)if(u[d](t,c,l)===!1)return}a=a.parent}if(i){Wt(),zr(i,null,10,[t,c,l]),Gt();return}}_h(t,n,s,r,o)}function _h(t,e,n,r=!0,s=!1){if(s)throw t;console.error(t)}const We=[];let _t=-1;const Yn=[];let tn=null,jn=0;const su=Promise.resolve();let ws=null;function jo(t){const e=ws||su;return t?e.then(this?t.bind(this):t):e}function vh(t){let e=_t+1,n=We.length;for(;e<n;){const r=e+n>>>1,s=We[r],i=Mr(s);i<t||i===t&&s.flags&2?e=r+1:n=r}return e}function Wo(t){if(!(t.flags&1)){const e=Mr(t),n=We[We.length-1];!n||!(t.flags&2)&&e>=Mr(n)?We.push(t):We.splice(vh(e),0,t),t.flags|=1,iu()}}function iu(){ws||(ws=su.then(au))}function bh(t){te(t)?Yn.push(...t):tn&&t.id===-1?tn.splice(jn+1,0,t):t.flags&1||(Yn.push(t),t.flags|=1),iu()}function Ca(t,e,n=_t+1){for(;n<We.length;n++){const r=We[n];if(r&&r.flags&2){if(t&&r.id!==t.uid)continue;We.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function ou(t){if(Yn.length){const e=[...new Set(Yn)].sort((n,r)=>Mr(n)-Mr(r));if(Yn.length=0,tn){tn.push(...e);return}for(tn=e,jn=0;jn<tn.length;jn++){const n=tn[jn];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}tn=null,jn=0}}const Mr=t=>t.id==null?t.flags&2?-1:1/0:t.id;function au(t){try{for(_t=0;_t<We.length;_t++){const e=We[_t];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),zr(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;_t<We.length;_t++){const e=We[_t];e&&(e.flags&=-2)}_t=-1,We.length=0,ou(),ws=null,(We.length||Yn.length)&&au()}}let st=null,cu=null;function Es(t){const e=st;return st=t,cu=t&&t.type.__scopeId||null,e}function lu(t,e=st,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&Ts(-1);const i=Es(e);let o;try{o=t(...s)}finally{Es(i),r._d&&Ts(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function uu(t,e){if(st===null)return t;const n=si(st),r=t.dirs||(t.dirs=[]);for(let s=0;s<e.length;s++){let[i,o,a,c=Ie]=e[s];i&&(oe(i)&&(i={mounted:i,updated:i}),i.deep&&Mt(o),r.push({dir:i,instance:n,value:o,oldValue:void 0,arg:a,modifiers:c}))}return t}function yn(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const a=s[o];i&&(a.oldValue=i[o].value);let c=a.dir[r];c&&(Wt(),ut(c,n,8,[t.el,a,t,e]),Gt())}}const yh=Symbol("_vte"),du=t=>t.__isTeleport,Nt=Symbol("_leaveCb"),is=Symbol("_enterCb");function Sh(){const t={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return ei(()=>{t.isMounted=!0}),Go(()=>{t.isUnmounting=!0}),t}const rt=[Function,Array],fu={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:rt,onEnter:rt,onAfterEnter:rt,onEnterCancelled:rt,onBeforeLeave:rt,onLeave:rt,onAfterLeave:rt,onLeaveCancelled:rt,onBeforeAppear:rt,onAppear:rt,onAfterAppear:rt,onAppearCancelled:rt},hu=t=>{const e=t.subTree;return e.component?hu(e.component):e},Ih={name:"BaseTransition",props:fu,setup(t,{slots:e}){const n=Jo(),r=Sh();return()=>{const s=e.default&&mu(e.default(),!0);if(!s||!s.length)return;const i=pu(s),o=ge(t),{mode:a}=o;if(r.isLeaving)return wi(i);const c=Aa(i);if(!c)return wi(i);let l=ro(c,o,r,n,d=>l=d);c.type!==Ge&&Lr(c,l);let u=n.subTree&&Aa(n.subTree);if(u&&u.type!==Ge&&!An(u,c)&&hu(n).type!==Ge){let d=ro(u,o,r,n);if(Lr(u,d),a==="out-in"&&c.type!==Ge)return r.isLeaving=!0,d.afterLeave=()=>{r.isLeaving=!1,n.job.flags&8||n.update(),delete d.afterLeave,u=void 0},wi(i);a==="in-out"&&c.type!==Ge?d.delayLeave=(f,g,_)=>{const b=gu(r,u);b[String(u.key)]=u,f[Nt]=()=>{g(),f[Nt]=void 0,delete l.delayedLeave,u=void 0},l.delayedLeave=()=>{_(),delete l.delayedLeave,u=void 0}}:u=void 0}else u&&(u=void 0);return i}}};function pu(t){let e=t[0];if(t.length>1){for(const n of t)if(n.type!==Ge){e=n;break}}return e}const wh=Ih;function gu(t,e){const{leavingVNodes:n}=t;let r=n.get(e.type);return r||(r=Object.create(null),n.set(e.type,r)),r}function ro(t,e,n,r,s){const{appear:i,mode:o,persisted:a=!1,onBeforeEnter:c,onEnter:l,onAfterEnter:u,onEnterCancelled:d,onBeforeLeave:f,onLeave:g,onAfterLeave:_,onLeaveCancelled:b,onBeforeAppear:R,onAppear:E,onAfterAppear:C,onAppearCancelled:k}=e,I=String(t.key),q=gu(n,t),ne=(O,D)=>{O&&ut(O,r,9,D)},re=(O,D)=>{const j=D[1];ne(O,D),te(O)?O.every(T=>T.length<=1)&&j():O.length<=1&&j()},X={mode:o,persisted:a,beforeEnter(O){let D=c;if(!n.isMounted)if(i)D=R||c;else return;O[Nt]&&O[Nt](!0);const j=q[I];j&&An(t,j)&&j.el[Nt]&&j.el[Nt](),ne(D,[O])},enter(O){let D=l,j=u,T=d;if(!n.isMounted)if(i)D=E||l,j=C||u,T=k||d;else return;let V=!1;const he=O[is]=ye=>{V||(V=!0,ye?ne(T,[O]):ne(j,[O]),X.delayedLeave&&X.delayedLeave(),O[is]=void 0)};D?re(D,[O,he]):he()},leave(O,D){const j=String(t.key);if(O[is]&&O[is](!0),n.isUnmounting)return D();ne(f,[O]);let T=!1;const V=O[Nt]=he=>{T||(T=!0,D(),he?ne(b,[O]):ne(_,[O]),O[Nt]=void 0,q[j]===t&&delete q[j])};q[j]=t,g?re(g,[O,V]):V()},clone(O){const D=ro(O,e,n,r,s);return s&&s(D),D}};return X}function wi(t){if(Qs(t))return t=_n(t),t.children=null,t}function Aa(t){if(!Qs(t))return du(t.type)&&t.children?pu(t.children):t;if(t.component)return t.component.subTree;const{shapeFlag:e,children:n}=t;if(n){if(e&16)return n[0];if(e&32&&oe(n.default))return n.default()}}function Lr(t,e){t.shapeFlag&6&&t.component?(t.transition=e,Lr(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function mu(t,e=!1,n){let r=[],s=0;for(let i=0;i<t.length;i++){let o=t[i];const a=n==null?o.key:String(n)+String(o.key!=null?o.key:i);o.type===Ue?(o.patchFlag&128&&s++,r=r.concat(mu(o.children,e,a))):(e||o.type!==Ge)&&r.push(a!=null?_n(o,{key:a}):o)}if(s>1)for(let i=0;i<r.length;i++)r[i].patchFlag=-2;return r}function Be(t,e){return oe(t)?Me({name:t.name},e,{setup:t}):t}function _u(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}const Cs=new WeakMap;function Er(t,e,n,r,s=!1){if(te(t)){t.forEach((_,b)=>Er(_,e&&(te(e)?e[b]:e),n,r,s));return}if(Cr(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&Er(t,e,n,r.component.subTree);return}const i=r.shapeFlag&4?si(r.component):r.el,o=s?null:i,{i:a,r:c}=t,l=e&&e.r,u=a.refs===Ie?a.refs={}:a.refs,d=a.setupState,f=ge(d),g=d===Ie?Tl:_=>_e(f,_);if(l!=null&&l!==c){if(Ta(e),De(l))u[l]=null,g(l)&&(d[l]=null);else if(ke(l)){l.value=null;const _=e;_.k&&(u[_.k]=null)}}if(oe(c))zr(c,a,12,[o,u]);else{const _=De(c),b=ke(c);if(_||b){const R=()=>{if(t.f){const E=_?g(c)?d[c]:u[c]:c.value;if(s)te(E)&&xo(E,i);else if(te(E))E.includes(i)||E.push(i);else if(_)u[c]=[i],g(c)&&(d[c]=u[c]);else{const C=[i];c.value=C,t.k&&(u[t.k]=C)}}else _?(u[c]=o,g(c)&&(d[c]=o)):b&&(c.value=o,t.k&&(u[t.k]=o))};if(o){const E=()=>{R(),Cs.delete(t)};E.id=-1,Cs.set(t,E),et(E,n)}else Ta(t),R()}}}function Ta(t){const e=Cs.get(t);e&&(e.flags|=8,Cs.delete(t))}qs().requestIdleCallback;qs().cancelIdleCallback;const Cr=t=>!!t.type.__asyncLoader,Qs=t=>t.type.__isKeepAlive;function Eh(t,e){vu(t,"a",e)}function Ch(t,e){vu(t,"da",e)}function vu(t,e,n=Ke){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(Zs(e,r,n),n){let s=n.parent;for(;s&&s.parent;)Qs(s.parent.vnode)&&Ah(r,e,n,s),s=s.parent}}function Ah(t,e,n,r){const s=Zs(e,t,r,!0);bu(()=>{xo(r[e],s)},n)}function Zs(t,e,n=Ke,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{Wt();const a=qr(n),c=ut(e,n,t,o);return a(),Gt(),c});return r?s.unshift(i):s.push(i),i}}const Jt=t=>(e,n=Ke)=>{(!Br||t==="sp")&&Zs(t,(...r)=>e(...r),n)},Th=Jt("bm"),ei=Jt("m"),Rh=Jt("bu"),Ph=Jt("u"),Go=Jt("bum"),bu=Jt("um"),kh=Jt("sp"),Dh=Jt("rtg"),Oh=Jt("rtc");function Nh(t,e=Ke){Zs("ec",t,e)}const xh=Symbol.for("v-ndc");function Hr(t,e,n,r){let s;const i=n,o=te(t);if(o||De(t)){const a=o&&un(t);let c=!1,l=!1;a&&(c=!it(t),l=mn(t),t=Js(t)),s=new Array(t.length);for(let u=0,d=t.length;u<d;u++)s[u]=e(c?l?Ss(He(t[u])):He(t[u]):t[u],u,void 0,i)}else if(typeof t=="number"){s=new Array(t);for(let a=0;a<t;a++)s[a]=e(a+1,a,void 0,i)}else if(Ce(t))if(t[Symbol.iterator])s=Array.from(t,(a,c)=>e(a,c,void 0,i));else{const a=Object.keys(t);s=new Array(a.length);for(let c=0,l=a.length;c<l;c++){const u=a[c];s[c]=e(t[u],u,c,i)}}else s=[];return s}const so=t=>t?Bu(t)?si(t):so(t.parent):null,Ar=Me(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>so(t.parent),$root:t=>so(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Su(t),$forceUpdate:t=>t.f||(t.f=()=>{Wo(t.update)}),$nextTick:t=>t.n||(t.n=jo.bind(t.proxy)),$watch:t=>np.bind(t)}),Ei=(t,e)=>t!==Ie&&!t.__isScriptSetup&&_e(t,e),Mh={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:a,appContext:c}=t;let l;if(e[0]!=="$"){const g=o[e];if(g!==void 0)switch(g){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(Ei(r,e))return o[e]=1,r[e];if(s!==Ie&&_e(s,e))return o[e]=2,s[e];if((l=t.propsOptions[0])&&_e(l,e))return o[e]=3,i[e];if(n!==Ie&&_e(n,e))return o[e]=4,n[e];io&&(o[e]=0)}}const u=Ar[e];let d,f;if(u)return e==="$attrs"&&$e(t.attrs,"get",""),u(t);if((d=a.__cssModules)&&(d=d[e]))return d;if(n!==Ie&&_e(n,e))return o[e]=4,n[e];if(f=c.config.globalProperties,_e(f,e))return f[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return Ei(s,e)?(s[e]=n,!0):r!==Ie&&_e(r,e)?(r[e]=n,!0):_e(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,propsOptions:i,type:o}},a){let c,l;return!!(n[a]||t!==Ie&&a[0]!=="$"&&_e(t,a)||Ei(e,a)||(c=i[0])&&_e(c,a)||_e(r,a)||_e(Ar,a)||_e(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:_e(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Ra(t){return te(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let io=!0;function Lh(t){const e=Su(t),n=t.proxy,r=t.ctx;io=!1,e.beforeCreate&&Pa(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:a,provide:c,inject:l,created:u,beforeMount:d,mounted:f,beforeUpdate:g,updated:_,activated:b,deactivated:R,beforeDestroy:E,beforeUnmount:C,destroyed:k,unmounted:I,render:q,renderTracked:ne,renderTriggered:re,errorCaptured:X,serverPrefetch:O,expose:D,inheritAttrs:j,components:T,directives:V,filters:he}=e;if(l&&Hh(l,r,null),o)for(const L in o){const G=o[L];oe(G)&&(r[L]=G.bind(n))}if(s){const L=s.call(n,n);Ce(L)&&(t.data=Un(L))}if(io=!0,i)for(const L in i){const G=i[L],z=oe(G)?G.bind(n,n):oe(G.get)?G.get.bind(n,n):St,A=!oe(G)&&oe(G.set)?G.set.bind(n):St,M=W({get:z,set:A});Object.defineProperty(r,L,{enumerable:!0,configurable:!0,get:()=>M.value,set:B=>M.value=B})}if(a)for(const L in a)yu(a[L],r,n,L);if(c){const L=oe(c)?c.call(n):c;Reflect.ownKeys(L).forEach(G=>{ls(G,L[G])})}u&&Pa(u,t,"c");function le(L,G){te(G)?G.forEach(z=>L(z.bind(n))):G&&L(G.bind(n))}if(le(Th,d),le(ei,f),le(Rh,g),le(Ph,_),le(Eh,b),le(Ch,R),le(Nh,X),le(Oh,ne),le(Dh,re),le(Go,C),le(bu,I),le(kh,O),te(D))if(D.length){const L=t.exposed||(t.exposed={});D.forEach(G=>{Object.defineProperty(L,G,{get:()=>n[G],set:z=>n[G]=z,enumerable:!0})})}else t.exposed||(t.exposed={});q&&t.render===St&&(t.render=q),j!=null&&(t.inheritAttrs=j),T&&(t.components=T),V&&(t.directives=V),O&&_u(t)}function Hh(t,e,n=St){te(t)&&(t=oo(t));for(const r in t){const s=t[r];let i;Ce(s)?"default"in s?i=It(s.from||r,s.default,!0):i=It(s.from||r):i=It(s),ke(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function Pa(t,e,n){ut(te(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function yu(t,e,n,r){let s=r.includes(".")?xu(n,r):()=>n[r];if(De(t)){const i=e[t];oe(i)&&wt(s,i)}else if(oe(t))wt(s,t.bind(n));else if(Ce(t))if(te(t))t.forEach(i=>yu(i,e,n,r));else{const i=oe(t.handler)?t.handler.bind(n):e[t.handler];oe(i)&&wt(s,i,t)}}function Su(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,a=i.get(e);let c;return a?c=a:!s.length&&!n&&!r?c=e:(c={},s.length&&s.forEach(l=>As(c,l,o,!0)),As(c,e,o)),Ce(e)&&i.set(e,c),c}function As(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&As(t,i,n,!0),s&&s.forEach(o=>As(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const a=Uh[o]||n&&n[o];t[o]=a?a(t[o],e[o]):e[o]}return t}const Uh={data:ka,props:Da,emits:Da,methods:_r,computed:_r,beforeCreate:Ve,created:Ve,beforeMount:Ve,mounted:Ve,beforeUpdate:Ve,updated:Ve,beforeDestroy:Ve,beforeUnmount:Ve,destroyed:Ve,unmounted:Ve,activated:Ve,deactivated:Ve,errorCaptured:Ve,serverPrefetch:Ve,components:_r,directives:_r,watch:Fh,provide:ka,inject:Bh};function ka(t,e){return e?t?function(){return Me(oe(t)?t.call(this,this):t,oe(e)?e.call(this,this):e)}:e:t}function Bh(t,e){return _r(oo(t),oo(e))}function oo(t){if(te(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Ve(t,e){return t?[...new Set([].concat(t,e))]:e}function _r(t,e){return t?Me(Object.create(null),t,e):e}function Da(t,e){return t?te(t)&&te(e)?[...new Set([...t,...e])]:Me(Object.create(null),Ra(t),Ra(e??{})):e}function Fh(t,e){if(!t)return e;if(!e)return t;const n=Me(Object.create(null),t);for(const r in e)n[r]=Ve(t[r],e[r]);return n}function Iu(){return{app:null,config:{isNativeTag:Tl,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let $h=0;function Vh(t,e){return function(r,s=null){oe(r)||(r=Me({},r)),s!=null&&!Ce(s)&&(s=null);const i=Iu(),o=new WeakSet,a=[];let c=!1;const l=i.app={_uid:$h++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:wp,get config(){return i.config},set config(u){},use(u,...d){return o.has(u)||(u&&oe(u.install)?(o.add(u),u.install(l,...d)):oe(u)&&(o.add(u),u(l,...d))),l},mixin(u){return i.mixins.includes(u)||i.mixins.push(u),l},component(u,d){return d?(i.components[u]=d,l):i.components[u]},directive(u,d){return d?(i.directives[u]=d,l):i.directives[u]},mount(u,d,f){if(!c){const g=l._ceVNode||Pe(r,s);return g.appContext=i,f===!0?f="svg":f===!1&&(f=void 0),t(g,u,f),c=!0,l._container=u,u.__vue_app__=l,si(g.component)}},onUnmount(u){a.push(u)},unmount(){c&&(ut(a,l._instance,16),t(null,l._container),delete l._container.__vue_app__)},provide(u,d){return i.provides[u]=d,l},runWithContext(u){const d=kn;kn=l;try{return u()}finally{kn=d}}};return l}}let kn=null;function ls(t,e){if(Ke){let n=Ke.provides;const r=Ke.parent&&Ke.parent.provides;r===n&&(n=Ke.provides=Object.create(r)),n[t]=e}}function It(t,e,n=!1){const r=Jo();if(r||kn){let s=kn?kn._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&t in s)return s[t];if(arguments.length>1)return n&&oe(e)?e.call(r&&r.proxy):e}}function jh(){return!!(Jo()||kn)}const wu={},Eu=()=>Object.create(wu),Cu=t=>Object.getPrototypeOf(t)===wu;function Wh(t,e,n,r=!1){const s={},i=Eu();t.propsDefaults=Object.create(null),Au(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:eu(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function Gh(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,a=ge(s),[c]=t.propsOptions;let l=!1;if((r||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let d=0;d<u.length;d++){let f=u[d];if(ti(t.emitsOptions,f))continue;const g=e[f];if(c)if(_e(i,f))g!==i[f]&&(i[f]=g,l=!0);else{const _=gn(f);s[_]=ao(c,a,_,g,t,!1)}else g!==i[f]&&(i[f]=g,l=!0)}}}else{Au(t,e,s,i)&&(l=!0);let u;for(const d in a)(!e||!_e(e,d)&&((u=Hn(d))===d||!_e(e,u)))&&(c?n&&(n[d]!==void 0||n[u]!==void 0)&&(s[d]=ao(c,a,d,void 0,t,!0)):delete s[d]);if(i!==a)for(const d in i)(!e||!_e(e,d))&&(delete i[d],l=!0)}l&&xt(t.attrs,"set","")}function Au(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,a;if(e)for(let c in e){if(Sr(c))continue;const l=e[c];let u;s&&_e(s,u=gn(c))?!i||!i.includes(u)?n[u]=l:(a||(a={}))[u]=l:ti(t.emitsOptions,c)||(!(c in r)||l!==r[c])&&(r[c]=l,o=!0)}if(i){const c=ge(n),l=a||Ie;for(let u=0;u<i.length;u++){const d=i[u];n[d]=ao(s,c,d,l[d],t,!_e(l,d))}}return o}function ao(t,e,n,r,s,i){const o=t[n];if(o!=null){const a=_e(o,"default");if(a&&r===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&oe(c)){const{propsDefaults:l}=s;if(n in l)r=l[n];else{const u=qr(s);r=l[n]=c.call(null,e),u()}}else r=c;s.ce&&s.ce._setProp(n,r)}o[0]&&(i&&!a?r=!1:o[1]&&(r===""||r===Hn(n))&&(r=!0))}return r}const Kh=new WeakMap;function Tu(t,e,n=!1){const r=n?Kh:e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},a=[];let c=!1;if(!oe(t)){const u=d=>{c=!0;const[f,g]=Tu(d,e,!0);Me(o,f),g&&a.push(...g)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!i&&!c)return Ce(t)&&r.set(t,qn),qn;if(te(i))for(let u=0;u<i.length;u++){const d=gn(i[u]);Oa(d)&&(o[d]=Ie)}else if(i)for(const u in i){const d=gn(u);if(Oa(d)){const f=i[u],g=o[d]=te(f)||oe(f)?{type:f}:Me({},f),_=g.type;let b=!1,R=!0;if(te(_))for(let E=0;E<_.length;++E){const C=_[E],k=oe(C)&&C.name;if(k==="Boolean"){b=!0;break}else k==="String"&&(R=!1)}else b=oe(_)&&_.name==="Boolean";g[0]=b,g[1]=R,(b||_e(g,"default"))&&a.push(d)}}const l=[o,a];return Ce(t)&&r.set(t,l),l}function Oa(t){return t[0]!=="$"&&!Sr(t)}const Ko=t=>t==="_"||t==="_ctx"||t==="$stable",zo=t=>te(t)?t.map(bt):[bt(t)],zh=(t,e,n)=>{if(e._n)return e;const r=lu((...s)=>zo(e(...s)),n);return r._c=!1,r},Ru=(t,e,n)=>{const r=t._ctx;for(const s in t){if(Ko(s))continue;const i=t[s];if(oe(i))e[s]=zh(s,i,r);else if(i!=null){const o=zo(i);e[s]=()=>o}}},Pu=(t,e)=>{const n=zo(e);t.slots.default=()=>n},ku=(t,e,n)=>{for(const r in e)(n||!Ko(r))&&(t[r]=e[r])},qh=(t,e,n)=>{const r=t.slots=Eu();if(t.vnode.shapeFlag&32){const s=e._;s?(ku(r,e,n),n&&Nl(r,"_",s,!0)):Ru(e,r)}else e&&Pu(t,e)},Jh=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=Ie;if(r.shapeFlag&32){const a=e._;a?n&&a===1?i=!1:ku(s,e,n):(i=!e.$stable,Ru(e,s)),o=e}else e&&(Pu(t,e),o={default:1});if(i)for(const a in s)!Ko(a)&&o[a]==null&&delete s[a]},et=up;function Yh(t){return Xh(t)}function Xh(t,e){const n=qs();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:a,createComment:c,setText:l,setElementText:u,parentNode:d,nextSibling:f,setScopeId:g=St,insertStaticContent:_}=t,b=(h,p,m,S=null,w=null,y=null,U=void 0,x=null,N=!!p.dynamicChildren)=>{if(h===p)return;h&&!An(h,p)&&(S=v(h),B(h,w,y,!0),h=null),p.patchFlag===-2&&(N=!1,p.dynamicChildren=null);const{type:P,ref:ee,shapeFlag:$}=p;switch(P){case ni:R(h,p,m,S);break;case Ge:E(h,p,m,S);break;case Ai:h==null&&C(p,m,S,U);break;case Ue:T(h,p,m,S,w,y,U,x,N);break;default:$&1?q(h,p,m,S,w,y,U,x,N):$&6?V(h,p,m,S,w,y,U,x,N):($&64||$&128)&&P.process(h,p,m,S,w,y,U,x,N,J)}ee!=null&&w?Er(ee,h&&h.ref,y,p||h,!p):ee==null&&h&&h.ref!=null&&Er(h.ref,null,y,h,!0)},R=(h,p,m,S)=>{if(h==null)r(p.el=a(p.children),m,S);else{const w=p.el=h.el;p.children!==h.children&&l(w,p.children)}},E=(h,p,m,S)=>{h==null?r(p.el=c(p.children||""),m,S):p.el=h.el},C=(h,p,m,S)=>{[h.el,h.anchor]=_(h.children,p,m,S,h.el,h.anchor)},k=({el:h,anchor:p},m,S)=>{let w;for(;h&&h!==p;)w=f(h),r(h,m,S),h=w;r(p,m,S)},I=({el:h,anchor:p})=>{let m;for(;h&&h!==p;)m=f(h),s(h),h=m;s(p)},q=(h,p,m,S,w,y,U,x,N)=>{p.type==="svg"?U="svg":p.type==="math"&&(U="mathml"),h==null?ne(p,m,S,w,y,U,x,N):O(h,p,w,y,U,x,N)},ne=(h,p,m,S,w,y,U,x)=>{let N,P;const{props:ee,shapeFlag:$,transition:Q,dirs:se}=h;if(N=h.el=o(h.type,y,ee&&ee.is,ee),$&8?u(N,h.children):$&16&&X(h.children,N,null,S,w,Ci(h,y),U,x),se&&yn(h,null,S,"created"),re(N,h,h.scopeId,U,S),ee){for(const we in ee)we!=="value"&&!Sr(we)&&i(N,we,null,ee[we],y,S);"value"in ee&&i(N,"value",null,ee.value,y),(P=ee.onVnodeBeforeMount)&&mt(P,S,h)}se&&yn(h,null,S,"beforeMount");const pe=Qh(w,Q);pe&&Q.beforeEnter(N),r(N,p,m),((P=ee&&ee.onVnodeMounted)||pe||se)&&et(()=>{P&&mt(P,S,h),pe&&Q.enter(N),se&&yn(h,null,S,"mounted")},w)},re=(h,p,m,S,w)=>{if(m&&g(h,m),S)for(let y=0;y<S.length;y++)g(h,S[y]);if(w){let y=w.subTree;if(p===y||Lu(y.type)&&(y.ssContent===p||y.ssFallback===p)){const U=w.vnode;re(h,U,U.scopeId,U.slotScopeIds,w.parent)}}},X=(h,p,m,S,w,y,U,x,N=0)=>{for(let P=N;P<h.length;P++){const ee=h[P]=x?nn(h[P]):bt(h[P]);b(null,ee,p,m,S,w,y,U,x)}},O=(h,p,m,S,w,y,U)=>{const x=p.el=h.el;let{patchFlag:N,dynamicChildren:P,dirs:ee}=p;N|=h.patchFlag&16;const $=h.props||Ie,Q=p.props||Ie;let se;if(m&&Sn(m,!1),(se=Q.onVnodeBeforeUpdate)&&mt(se,m,p,h),ee&&yn(p,h,m,"beforeUpdate"),m&&Sn(m,!0),($.innerHTML&&Q.innerHTML==null||$.textContent&&Q.textContent==null)&&u(x,""),P?D(h.dynamicChildren,P,x,m,S,Ci(p,w),y):U||G(h,p,x,null,m,S,Ci(p,w),y,!1),N>0){if(N&16)j(x,$,Q,m,w);else if(N&2&&$.class!==Q.class&&i(x,"class",null,Q.class,w),N&4&&i(x,"style",$.style,Q.style,w),N&8){const pe=p.dynamicProps;for(let we=0;we<pe.length;we++){const ve=pe[we],Ye=$[ve],Xe=Q[ve];(Xe!==Ye||ve==="value")&&i(x,ve,Ye,Xe,w,m)}}N&1&&h.children!==p.children&&u(x,p.children)}else!U&&P==null&&j(x,$,Q,m,w);((se=Q.onVnodeUpdated)||ee)&&et(()=>{se&&mt(se,m,p,h),ee&&yn(p,h,m,"updated")},S)},D=(h,p,m,S,w,y,U)=>{for(let x=0;x<p.length;x++){const N=h[x],P=p[x],ee=N.el&&(N.type===Ue||!An(N,P)||N.shapeFlag&198)?d(N.el):m;b(N,P,ee,null,S,w,y,U,!0)}},j=(h,p,m,S,w)=>{if(p!==m){if(p!==Ie)for(const y in p)!Sr(y)&&!(y in m)&&i(h,y,p[y],null,w,S);for(const y in m){if(Sr(y))continue;const U=m[y],x=p[y];U!==x&&y!=="value"&&i(h,y,x,U,w,S)}"value"in m&&i(h,"value",p.value,m.value,w)}},T=(h,p,m,S,w,y,U,x,N)=>{const P=p.el=h?h.el:a(""),ee=p.anchor=h?h.anchor:a("");let{patchFlag:$,dynamicChildren:Q,slotScopeIds:se}=p;se&&(x=x?x.concat(se):se),h==null?(r(P,m,S),r(ee,m,S),X(p.children||[],m,ee,w,y,U,x,N)):$>0&&$&64&&Q&&h.dynamicChildren?(D(h.dynamicChildren,Q,m,w,y,U,x),(p.key!=null||w&&p===w.subTree)&&Du(h,p,!0)):G(h,p,m,ee,w,y,U,x,N)},V=(h,p,m,S,w,y,U,x,N)=>{p.slotScopeIds=x,h==null?p.shapeFlag&512?w.ctx.activate(p,m,S,U,N):he(p,m,S,w,y,U,N):ye(h,p,N)},he=(h,p,m,S,w,y,U)=>{const x=h.component=_p(h,S,w);if(Qs(h)&&(x.ctx.renderer=J),vp(x,!1,U),x.asyncDep){if(w&&w.registerDep(x,le,U),!h.el){const N=x.subTree=Pe(Ge);E(null,N,p,m),h.placeholder=N.el}}else le(x,h,p,m,w,y,U)},ye=(h,p,m)=>{const S=p.component=h.component;if(cp(h,p,m))if(S.asyncDep&&!S.asyncResolved){L(S,p,m);return}else S.next=p,S.update();else p.el=h.el,S.vnode=p},le=(h,p,m,S,w,y,U)=>{const x=()=>{if(h.isMounted){let{next:$,bu:Q,u:se,parent:pe,vnode:we}=h;{const pt=Ou(h);if(pt){$&&($.el=we.el,L(h,$,U)),pt.asyncDep.then(()=>{h.isUnmounted||x()});return}}let ve=$,Ye;Sn(h,!1),$?($.el=we.el,L(h,$,U)):$=we,Q&&cs(Q),(Ye=$.props&&$.props.onVnodeBeforeUpdate)&&mt(Ye,pe,$,we),Sn(h,!0);const Xe=xa(h),ht=h.subTree;h.subTree=Xe,b(ht,Xe,d(ht.el),v(ht),h,w,y),$.el=Xe.el,ve===null&&lp(h,Xe.el),se&&et(se,w),(Ye=$.props&&$.props.onVnodeUpdated)&&et(()=>mt(Ye,pe,$,we),w)}else{let $;const{el:Q,props:se}=p,{bm:pe,m:we,parent:ve,root:Ye,type:Xe}=h,ht=Cr(p);Sn(h,!1),pe&&cs(pe),!ht&&($=se&&se.onVnodeBeforeMount)&&mt($,ve,p),Sn(h,!0);{Ye.ce&&Ye.ce._def.shadowRoot!==!1&&Ye.ce._injectChildStyle(Xe);const pt=h.subTree=xa(h);b(null,pt,m,S,h,w,y),p.el=pt.el}if(we&&et(we,w),!ht&&($=se&&se.onVnodeMounted)){const pt=p;et(()=>mt($,ve,pt),w)}(p.shapeFlag&256||ve&&Cr(ve.vnode)&&ve.vnode.shapeFlag&256)&&h.a&&et(h.a,w),h.isMounted=!0,p=m=S=null}};h.scope.on();const N=h.effect=new Fl(x);h.scope.off();const P=h.update=N.run.bind(N),ee=h.job=N.runIfDirty.bind(N);ee.i=h,ee.id=h.uid,N.scheduler=()=>Wo(ee),Sn(h,!0),P()},L=(h,p,m)=>{p.component=h;const S=h.vnode.props;h.vnode=p,h.next=null,Gh(h,p.props,S,m),Jh(h,p.children,m),Wt(),Ca(h),Gt()},G=(h,p,m,S,w,y,U,x,N=!1)=>{const P=h&&h.children,ee=h?h.shapeFlag:0,$=p.children,{patchFlag:Q,shapeFlag:se}=p;if(Q>0){if(Q&128){A(P,$,m,S,w,y,U,x,N);return}else if(Q&256){z(P,$,m,S,w,y,U,x,N);return}}se&8?(ee&16&&Ne(P,w,y),$!==P&&u(m,$)):ee&16?se&16?A(P,$,m,S,w,y,U,x,N):Ne(P,w,y,!0):(ee&8&&u(m,""),se&16&&X($,m,S,w,y,U,x,N))},z=(h,p,m,S,w,y,U,x,N)=>{h=h||qn,p=p||qn;const P=h.length,ee=p.length,$=Math.min(P,ee);let Q;for(Q=0;Q<$;Q++){const se=p[Q]=N?nn(p[Q]):bt(p[Q]);b(h[Q],se,m,null,w,y,U,x,N)}P>ee?Ne(h,w,y,!0,!1,$):X(p,m,S,w,y,U,x,N,$)},A=(h,p,m,S,w,y,U,x,N)=>{let P=0;const ee=p.length;let $=h.length-1,Q=ee-1;for(;P<=$&&P<=Q;){const se=h[P],pe=p[P]=N?nn(p[P]):bt(p[P]);if(An(se,pe))b(se,pe,m,null,w,y,U,x,N);else break;P++}for(;P<=$&&P<=Q;){const se=h[$],pe=p[Q]=N?nn(p[Q]):bt(p[Q]);if(An(se,pe))b(se,pe,m,null,w,y,U,x,N);else break;$--,Q--}if(P>$){if(P<=Q){const se=Q+1,pe=se<ee?p[se].el:S;for(;P<=Q;)b(null,p[P]=N?nn(p[P]):bt(p[P]),m,pe,w,y,U,x,N),P++}}else if(P>Q)for(;P<=$;)B(h[P],w,y,!0),P++;else{const se=P,pe=P,we=new Map;for(P=pe;P<=Q;P++){const Ze=p[P]=N?nn(p[P]):bt(p[P]);Ze.key!=null&&we.set(Ze.key,P)}let ve,Ye=0;const Xe=Q-pe+1;let ht=!1,pt=0;const dr=new Array(Xe);for(P=0;P<Xe;P++)dr[P]=0;for(P=se;P<=$;P++){const Ze=h[P];if(Ye>=Xe){B(Ze,w,y,!0);continue}let gt;if(Ze.key!=null)gt=we.get(Ze.key);else for(ve=pe;ve<=Q;ve++)if(dr[ve-pe]===0&&An(Ze,p[ve])){gt=ve;break}gt===void 0?B(Ze,w,y,!0):(dr[gt-pe]=P+1,gt>=pt?pt=gt:ht=!0,b(Ze,p[gt],m,null,w,y,U,x,N),Ye++)}const ba=ht?Zh(dr):qn;for(ve=ba.length-1,P=Xe-1;P>=0;P--){const Ze=pe+P,gt=p[Ze],ya=p[Ze+1],Sa=Ze+1<ee?ya.el||ya.placeholder:S;dr[P]===0?b(null,gt,m,Sa,w,y,U,x,N):ht&&(ve<0||P!==ba[ve]?M(gt,m,Sa,2):ve--)}}},M=(h,p,m,S,w=null)=>{const{el:y,type:U,transition:x,children:N,shapeFlag:P}=h;if(P&6){M(h.component.subTree,p,m,S);return}if(P&128){h.suspense.move(p,m,S);return}if(P&64){U.move(h,p,m,J);return}if(U===Ue){r(y,p,m);for(let $=0;$<N.length;$++)M(N[$],p,m,S);r(h.anchor,p,m);return}if(U===Ai){k(h,p,m);return}if(S!==2&&P&1&&x)if(S===0)x.beforeEnter(y),r(y,p,m),et(()=>x.enter(y),w);else{const{leave:$,delayLeave:Q,afterLeave:se}=x,pe=()=>{h.ctx.isUnmounted?s(y):r(y,p,m)},we=()=>{y._isLeaving&&y[Nt](!0),$(y,()=>{pe(),se&&se()})};Q?Q(y,pe,we):we()}else r(y,p,m)},B=(h,p,m,S=!1,w=!1)=>{const{type:y,props:U,ref:x,children:N,dynamicChildren:P,shapeFlag:ee,patchFlag:$,dirs:Q,cacheIndex:se}=h;if($===-2&&(w=!1),x!=null&&(Wt(),Er(x,null,m,h,!0),Gt()),se!=null&&(p.renderCache[se]=void 0),ee&256){p.ctx.deactivate(h);return}const pe=ee&1&&Q,we=!Cr(h);let ve;if(we&&(ve=U&&U.onVnodeBeforeUnmount)&&mt(ve,p,h),ee&6)Oe(h.component,m,S);else{if(ee&128){h.suspense.unmount(m,S);return}pe&&yn(h,null,p,"beforeUnmount"),ee&64?h.type.remove(h,p,m,J,S):P&&!P.hasOnce&&(y!==Ue||$>0&&$&64)?Ne(P,p,m,!1,!0):(y===Ue&&$&384||!w&&ee&16)&&Ne(N,p,m),S&&ae(h)}(we&&(ve=U&&U.onVnodeUnmounted)||pe)&&et(()=>{ve&&mt(ve,p,h),pe&&yn(h,null,p,"unmounted")},m)},ae=h=>{const{type:p,el:m,anchor:S,transition:w}=h;if(p===Ue){de(m,S);return}if(p===Ai){I(h);return}const y=()=>{s(m),w&&!w.persisted&&w.afterLeave&&w.afterLeave()};if(h.shapeFlag&1&&w&&!w.persisted){const{leave:U,delayLeave:x}=w,N=()=>U(m,y);x?x(h.el,y,N):N()}else y()},de=(h,p)=>{let m;for(;h!==p;)m=f(h),s(h),h=m;s(p)},Oe=(h,p,m)=>{const{bum:S,scope:w,job:y,subTree:U,um:x,m:N,a:P}=h;Na(N),Na(P),S&&cs(S),w.stop(),y&&(y.flags|=8,B(U,h,p,m)),x&&et(x,p),et(()=>{h.isUnmounted=!0},p)},Ne=(h,p,m,S=!1,w=!1,y=0)=>{for(let U=y;U<h.length;U++)B(h[U],p,m,S,w)},v=h=>{if(h.shapeFlag&6)return v(h.component.subTree);if(h.shapeFlag&128)return h.suspense.next();const p=f(h.anchor||h.el),m=p&&p[yh];return m?f(m):p};let F=!1;const H=(h,p,m)=>{h==null?p._vnode&&B(p._vnode,null,null,!0):b(p._vnode||null,h,p,null,null,null,m),p._vnode=h,F||(F=!0,Ca(),ou(),F=!1)},J={p:b,um:B,m:M,r:ae,mt:he,mc:X,pc:G,pbc:D,n:v,o:t};return{render:H,hydrate:void 0,createApp:Vh(H)}}function Ci({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Sn({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function Qh(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Du(t,e,n=!1){const r=t.children,s=e.children;if(te(r)&&te(s))for(let i=0;i<r.length;i++){const o=r[i];let a=s[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[i]=nn(s[i]),a.el=o.el),!n&&a.patchFlag!==-2&&Du(o,a)),a.type===ni&&a.patchFlag!==-1&&(a.el=o.el),a.type===Ge&&!a.el&&(a.el=o.el)}}function Zh(t){const e=t.slice(),n=[0];let r,s,i,o,a;const c=t.length;for(r=0;r<c;r++){const l=t[r];if(l!==0){if(s=n[n.length-1],t[s]<l){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)a=i+o>>1,t[n[a]]<l?i=a+1:o=a;l<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function Ou(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Ou(e)}function Na(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const ep=Symbol.for("v-scx"),tp=()=>It(ep);function wt(t,e,n){return Nu(t,e,n)}function Nu(t,e,n=Ie){const{immediate:r,deep:s,flush:i,once:o}=n,a=Me({},n),c=e&&r||!e&&i!=="post";let l;if(Br){if(i==="sync"){const g=tp();l=g.__watcherHandles||(g.__watcherHandles=[])}else if(!c){const g=()=>{};return g.stop=St,g.resume=St,g.pause=St,g}}const u=Ke;a.call=(g,_,b)=>ut(g,u,_,b);let d=!1;i==="post"?a.scheduler=g=>{et(g,u&&u.suspense)}:i!=="sync"&&(d=!0,a.scheduler=(g,_)=>{_?g():Wo(g)}),a.augmentJob=g=>{e&&(g.flags|=4),d&&(g.flags|=2,u&&(g.id=u.uid,g.i=u))};const f=mh(t,e,a);return Br&&(l?l.push(f):c&&f()),f}function np(t,e,n){const r=this.proxy,s=De(t)?t.includes(".")?xu(r,t):()=>r[t]:t.bind(r,r);let i;oe(e)?i=e:(i=e.handler,n=e);const o=qr(this),a=Nu(s,i.bind(r),n);return o(),a}function xu(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const rp=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${gn(e)}Modifiers`]||t[`${Hn(e)}Modifiers`];function sp(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||Ie;let s=n;const i=e.startsWith("update:"),o=i&&rp(r,e.slice(7));o&&(o.trim&&(s=n.map(u=>De(u)?u.trim():u)),o.number&&(s=n.map(Zi)));let a,c=r[a=vi(e)]||r[a=vi(gn(e))];!c&&i&&(c=r[a=vi(Hn(e))]),c&&ut(c,t,6,s);const l=r[a+"Once"];if(l){if(!t.emitted)t.emitted={};else if(t.emitted[a])return;t.emitted[a]=!0,ut(l,t,6,s)}}const ip=new WeakMap;function Mu(t,e,n=!1){const r=n?ip:e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},a=!1;if(!oe(t)){const c=l=>{const u=Mu(l,e,!0);u&&(a=!0,Me(o,u))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!i&&!a?(Ce(t)&&r.set(t,null),null):(te(i)?i.forEach(c=>o[c]=null):Me(o,i),Ce(t)&&r.set(t,o),o)}function ti(t,e){return!t||!Gs(e)?!1:(e=e.slice(2).replace(/Once$/,""),_e(t,e[0].toLowerCase()+e.slice(1))||_e(t,Hn(e))||_e(t,e))}function xa(t){const{type:e,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:o,attrs:a,emit:c,render:l,renderCache:u,props:d,data:f,setupState:g,ctx:_,inheritAttrs:b}=t,R=Es(t);let E,C;try{if(n.shapeFlag&4){const I=s||r,q=I;E=bt(l.call(q,I,u,d,g,f,_)),C=a}else{const I=e;E=bt(I.length>1?I(d,{attrs:a,slots:o,emit:c}):I(d,null)),C=e.props?a:op(a)}}catch(I){Tr.length=0,Xs(I,t,1),E=Pe(Ge)}let k=E;if(C&&b!==!1){const I=Object.keys(C),{shapeFlag:q}=k;I.length&&q&7&&(i&&I.some(No)&&(C=ap(C,i)),k=_n(k,C,!1,!0))}return n.dirs&&(k=_n(k,null,!1,!0),k.dirs=k.dirs?k.dirs.concat(n.dirs):n.dirs),n.transition&&Lr(k,n.transition),E=k,Es(R),E}const op=t=>{let e;for(const n in t)(n==="class"||n==="style"||Gs(n))&&((e||(e={}))[n]=t[n]);return e},ap=(t,e)=>{const n={};for(const r in t)(!No(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function cp(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:a,patchFlag:c}=e,l=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?Ma(r,o,l):!!o;if(c&8){const u=e.dynamicProps;for(let d=0;d<u.length;d++){const f=u[d];if(o[f]!==r[f]&&!ti(l,f))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:r===o?!1:r?o?Ma(r,o,l):!0:!!o;return!1}function Ma(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!ti(n,i))return!0}return!1}function lp({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const Lu=t=>t.__isSuspense;function up(t,e){e&&e.pendingBranch?te(t)?e.effects.push(...t):e.effects.push(t):bh(t)}const Ue=Symbol.for("v-fgt"),ni=Symbol.for("v-txt"),Ge=Symbol.for("v-cmt"),Ai=Symbol.for("v-stc"),Tr=[];let tt=null;function Z(t=!1){Tr.push(tt=t?null:[])}function dp(){Tr.pop(),tt=Tr[Tr.length-1]||null}let Ur=1;function Ts(t,e=!1){Ur+=t,t<0&&tt&&e&&(tt.hasOnce=!0)}function Hu(t){return t.dynamicChildren=Ur>0?tt||qn:null,dp(),Ur>0&&tt&&tt.push(t),t}function ce(t,e,n,r,s,i){return Hu(ie(t,e,n,r,s,i,!0))}function Ft(t,e,n,r,s){return Hu(Pe(t,e,n,r,s,!0))}function Rs(t){return t?t.__v_isVNode===!0:!1}function An(t,e){return t.type===e.type&&t.key===e.key}const Uu=({key:t})=>t??null,us=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?De(t)||ke(t)||oe(t)?{i:st,r:t,k:e,f:!!n}:t:null);function ie(t,e=null,n=null,r=0,s=null,i=t===Ue?0:1,o=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&Uu(e),ref:e&&us(e),scopeId:cu,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:st};return a?(qo(c,n),i&128&&t.normalize(c)):n&&(c.shapeFlag|=De(n)?8:16),Ur>0&&!o&&tt&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&tt.push(c),c}const Pe=fp;function fp(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===xh)&&(t=Ge),Rs(t)){const a=_n(t,e,!0);return n&&qo(a,n),Ur>0&&!i&&tt&&(a.shapeFlag&6?tt[tt.indexOf(t)]=a:tt.push(a)),a.patchFlag=-2,a}if(Ip(t)&&(t=t.__vccOpts),e){e=hp(e);let{class:a,style:c}=e;a&&!De(a)&&(e.class=Lt(a)),Ce(c)&&(Vo(c)&&!te(c)&&(c=Me({},c)),e.style=jt(c))}const o=De(t)?1:Lu(t)?128:du(t)?64:Ce(t)?4:oe(t)?2:0;return ie(t,e,n,r,s,o,i,!0)}function hp(t){return t?Vo(t)||Cu(t)?Me({},t):t:null}function _n(t,e,n=!1,r=!1){const{props:s,ref:i,patchFlag:o,children:a,transition:c}=t,l=e?pp(s||{},e):s,u={__v_isVNode:!0,__v_skip:!0,type:t.type,props:l,key:l&&Uu(l),ref:e&&e.ref?n&&i?te(i)?i.concat(us(e)):[i,us(e)]:us(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:a,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Ue?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:c,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&_n(t.ssContent),ssFallback:t.ssFallback&&_n(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return c&&r&&Lr(u,c.clone(u)),u}function ri(t=" ",e=0){return Pe(ni,null,t,e)}function Le(t="",e=!1){return e?(Z(),Ft(Ge,null,t)):Pe(Ge,null,t)}function bt(t){return t==null||typeof t=="boolean"?Pe(Ge):te(t)?Pe(Ue,null,t.slice()):Rs(t)?nn(t):Pe(ni,null,String(t))}function nn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:_n(t)}function qo(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(te(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),qo(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!Cu(e)?e._ctx=st:s===3&&st&&(st.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else oe(e)?(e={default:e,_ctx:st},n=32):(e=String(e),r&64?(n=16,e=[ri(e)]):n=8);t.children=e,t.shapeFlag|=n}function pp(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=Lt([e.class,r.class]));else if(s==="style")e.style=jt([e.style,r.style]);else if(Gs(s)){const i=e[s],o=r[s];o&&i!==o&&!(te(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function mt(t,e,n,r=null){ut(t,e,7,[n,r])}const gp=Iu();let mp=0;function _p(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||gp,i={uid:mp++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Hl(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Tu(r,s),emitsOptions:Mu(r,s),emit:null,emitted:null,propsDefaults:Ie,inheritAttrs:r.inheritAttrs,ctx:Ie,data:Ie,props:Ie,attrs:Ie,slots:Ie,refs:Ie,setupState:Ie,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=sp.bind(null,i),t.ce&&t.ce(i),i}let Ke=null;const Jo=()=>Ke||st;let Ps,co;{const t=qs(),e=(n,r)=>{let s;return(s=t[n])||(s=t[n]=[]),s.push(r),i=>{s.length>1?s.forEach(o=>o(i)):s[0](i)}};Ps=e("__VUE_INSTANCE_SETTERS__",n=>Ke=n),co=e("__VUE_SSR_SETTERS__",n=>Br=n)}const qr=t=>{const e=Ke;return Ps(t),t.scope.on(),()=>{t.scope.off(),Ps(e)}},La=()=>{Ke&&Ke.scope.off(),Ps(null)};function Bu(t){return t.vnode.shapeFlag&4}let Br=!1;function vp(t,e=!1,n=!1){e&&co(e);const{props:r,children:s}=t.vnode,i=Bu(t);Wh(t,r,i,e),qh(t,s,n||e);const o=i?bp(t,e):void 0;return e&&co(!1),o}function bp(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Mh);const{setup:r}=n;if(r){Wt();const s=t.setupContext=r.length>1?Sp(t):null,i=qr(t),o=zr(r,t,0,[t.props,s]),a=Pl(o);if(Gt(),i(),(a||t.sp)&&!Cr(t)&&_u(t),a){if(o.then(La,La),e)return o.then(c=>{Ha(t,c)}).catch(c=>{Xs(c,t,0)});t.asyncDep=o}else Ha(t,o)}else Fu(t)}function Ha(t,e,n){oe(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Ce(e)&&(t.setupState=ru(e)),Fu(t)}function Fu(t,e,n){const r=t.type;t.render||(t.render=r.render||St);{const s=qr(t);Wt();try{Lh(t)}finally{Gt(),s()}}}const yp={get(t,e){return $e(t,"get",""),t[e]}};function Sp(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,yp),slots:t.slots,emit:t.emit,expose:e}}function si(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(ru(Ys(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Ar)return Ar[n](t)},has(e,n){return n in e||n in Ar}})):t.proxy}function Ip(t){return oe(t)&&"__vccOpts"in t}const W=(t,e)=>ph(t,e,Br);function Yo(t,e,n){const r=(i,o,a)=>{Ts(-1);try{return Pe(i,o,a)}finally{Ts(1)}},s=arguments.length;return s===2?Ce(e)&&!te(e)?Rs(e)?r(t,null,[e]):r(t,e):r(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&Rs(n)&&(n=[n]),r(t,e,n))}const wp="3.5.21";/**
* @vue/runtime-dom v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let lo;const Ua=typeof window<"u"&&window.trustedTypes;if(Ua)try{lo=Ua.createPolicy("vue",{createHTML:t=>t})}catch{}const $u=lo?t=>lo.createHTML(t):t=>t,Ep="http://www.w3.org/2000/svg",Cp="http://www.w3.org/1998/Math/MathML",Ot=typeof document<"u"?document:null,Ba=Ot&&Ot.createElement("template"),Ap={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e==="svg"?Ot.createElementNS(Ep,t):e==="mathml"?Ot.createElementNS(Cp,t):n?Ot.createElement(t,{is:n}):Ot.createElement(t);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>Ot.createTextNode(t),createComment:t=>Ot.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Ot.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{Ba.innerHTML=$u(r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t);const a=Ba.content;if(r==="svg"||r==="mathml"){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}e.insertBefore(a,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},Xt="transition",hr="animation",Fr=Symbol("_vtc"),Vu={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Tp=Me({},fu,Vu),Rp=t=>(t.displayName="Transition",t.props=Tp,t),Pp=Rp((t,{slots:e})=>Yo(wh,kp(t),e)),In=(t,e=[])=>{te(t)?t.forEach(n=>n(...e)):t&&t(...e)},Fa=t=>t?te(t)?t.some(e=>e.length>1):t.length>1:!1;function kp(t){const e={};for(const T in t)T in Vu||(e[T]=t[T]);if(t.css===!1)return e;const{name:n="v",type:r,duration:s,enterFromClass:i=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:a=`${n}-enter-to`,appearFromClass:c=i,appearActiveClass:l=o,appearToClass:u=a,leaveFromClass:d=`${n}-leave-from`,leaveActiveClass:f=`${n}-leave-active`,leaveToClass:g=`${n}-leave-to`}=t,_=Dp(s),b=_&&_[0],R=_&&_[1],{onBeforeEnter:E,onEnter:C,onEnterCancelled:k,onLeave:I,onLeaveCancelled:q,onBeforeAppear:ne=E,onAppear:re=C,onAppearCancelled:X=k}=e,O=(T,V,he,ye)=>{T._enterCancelled=ye,wn(T,V?u:a),wn(T,V?l:o),he&&he()},D=(T,V)=>{T._isLeaving=!1,wn(T,d),wn(T,g),wn(T,f),V&&V()},j=T=>(V,he)=>{const ye=T?re:C,le=()=>O(V,T,he);In(ye,[V,le]),$a(()=>{wn(V,T?c:i),kt(V,T?u:a),Fa(ye)||Va(V,r,b,le)})};return Me(e,{onBeforeEnter(T){In(E,[T]),kt(T,i),kt(T,o)},onBeforeAppear(T){In(ne,[T]),kt(T,c),kt(T,l)},onEnter:j(!1),onAppear:j(!0),onLeave(T,V){T._isLeaving=!0;const he=()=>D(T,V);kt(T,d),T._enterCancelled?(kt(T,f),Ga()):(Ga(),kt(T,f)),$a(()=>{T._isLeaving&&(wn(T,d),kt(T,g),Fa(I)||Va(T,r,R,he))}),In(I,[T,he])},onEnterCancelled(T){O(T,!1,void 0,!0),In(k,[T])},onAppearCancelled(T){O(T,!0,void 0,!0),In(X,[T])},onLeaveCancelled(T){D(T),In(q,[T])}})}function Dp(t){if(t==null)return null;if(Ce(t))return[Ti(t.enter),Ti(t.leave)];{const e=Ti(t);return[e,e]}}function Ti(t){return Mf(t)}function kt(t,e){e.split(/\s+/).forEach(n=>n&&t.classList.add(n)),(t[Fr]||(t[Fr]=new Set)).add(e)}function wn(t,e){e.split(/\s+/).forEach(r=>r&&t.classList.remove(r));const n=t[Fr];n&&(n.delete(e),n.size||(t[Fr]=void 0))}function $a(t){requestAnimationFrame(()=>{requestAnimationFrame(t)})}let Op=0;function Va(t,e,n,r){const s=t._endId=++Op,i=()=>{s===t._endId&&r()};if(n!=null)return setTimeout(i,n);const{type:o,timeout:a,propCount:c}=Np(t,e);if(!o)return r();const l=o+"end";let u=0;const d=()=>{t.removeEventListener(l,f),i()},f=g=>{g.target===t&&++u>=c&&d()};setTimeout(()=>{u<c&&d()},a+1),t.addEventListener(l,f)}function Np(t,e){const n=window.getComputedStyle(t),r=_=>(n[_]||"").split(", "),s=r(`${Xt}Delay`),i=r(`${Xt}Duration`),o=ja(s,i),a=r(`${hr}Delay`),c=r(`${hr}Duration`),l=ja(a,c);let u=null,d=0,f=0;e===Xt?o>0&&(u=Xt,d=o,f=i.length):e===hr?l>0&&(u=hr,d=l,f=c.length):(d=Math.max(o,l),u=d>0?o>l?Xt:hr:null,f=u?u===Xt?i.length:c.length:0);const g=u===Xt&&/\b(?:transform|all)(?:,|$)/.test(r(`${Xt}Property`).toString());return{type:u,timeout:d,propCount:f,hasTransform:g}}function ja(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max(...e.map((n,r)=>Wa(n)+Wa(t[r])))}function Wa(t){return t==="auto"?0:Number(t.slice(0,-1).replace(",","."))*1e3}function Ga(){return document.body.offsetHeight}function xp(t,e,n){const r=t[Fr];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const ks=Symbol("_vod"),ju=Symbol("_vsh"),Mp={name:"show",beforeMount(t,{value:e},{transition:n}){t[ks]=t.style.display==="none"?"":t.style.display,n&&e?n.beforeEnter(t):pr(t,e)},mounted(t,{value:e},{transition:n}){n&&e&&n.enter(t)},updated(t,{value:e,oldValue:n},{transition:r}){!e!=!n&&(r?e?(r.beforeEnter(t),pr(t,!0),r.enter(t)):r.leave(t,()=>{pr(t,!1)}):pr(t,e))},beforeUnmount(t,{value:e}){pr(t,e)}};function pr(t,e){t.style.display=e?t[ks]:"none",t[ju]=!e}const Lp=Symbol(""),Hp=/(?:^|;)\s*display\s*:/;function Up(t,e,n){const r=t.style,s=De(n);let i=!1;if(n&&!s){if(e)if(De(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();n[a]==null&&ds(r,a,"")}else for(const o in e)n[o]==null&&ds(r,o,"");for(const o in n)o==="display"&&(i=!0),ds(r,o,n[o])}else if(s){if(e!==n){const o=r[Lp];o&&(n+=";"+o),r.cssText=n,i=Hp.test(n)}}else e&&t.removeAttribute("style");ks in t&&(t[ks]=i?r.display:"",t[ju]&&(r.display="none"))}const Ka=/\s*!important$/;function ds(t,e,n){if(te(n))n.forEach(r=>ds(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=Bp(t,e);Ka.test(n)?t.setProperty(Hn(r),n.replace(Ka,""),"important"):t[r]=n}}const za=["Webkit","Moz","ms"],Ri={};function Bp(t,e){const n=Ri[e];if(n)return n;let r=gn(e);if(r!=="filter"&&r in t)return Ri[e]=r;r=Ol(r);for(let s=0;s<za.length;s++){const i=za[s]+r;if(i in t)return Ri[e]=i}return e}const qa="http://www.w3.org/1999/xlink";function Ja(t,e,n,r,s,i=$f(e)){r&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(qa,e.slice(6,e.length)):t.setAttributeNS(qa,e,n):n==null||i&&!xl(n)?t.removeAttribute(e):t.setAttribute(e,i?"":vn(n)?String(n):n)}function Ya(t,e,n,r,s){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?$u(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const a=i==="OPTION"?t.getAttribute("value")||"":t.value,c=n==null?t.type==="checkbox"?"on":"":String(n);(a!==c||!("_value"in t))&&(t.value=c),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const a=typeof t[e];a==="boolean"?n=xl(n):n==null&&a==="string"?(n="",o=!0):a==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(s||e)}function Wn(t,e,n,r){t.addEventListener(e,n,r)}function Fp(t,e,n,r){t.removeEventListener(e,n,r)}const Xa=Symbol("_vei");function $p(t,e,n,r,s=null){const i=t[Xa]||(t[Xa]={}),o=i[e];if(r&&o)o.value=r;else{const[a,c]=Vp(e);if(r){const l=i[e]=Gp(r,s);Wn(t,a,l,c)}else o&&(Fp(t,a,o,c),i[e]=void 0)}}const Qa=/(?:Once|Passive|Capture)$/;function Vp(t){let e;if(Qa.test(t)){e={};let r;for(;r=t.match(Qa);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):Hn(t.slice(2)),e]}let Pi=0;const jp=Promise.resolve(),Wp=()=>Pi||(jp.then(()=>Pi=0),Pi=Date.now());function Gp(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;ut(Kp(r,n.value),e,5,[r])};return n.value=t,n.attached=Wp(),n}function Kp(t,e){if(te(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const Za=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,zp=(t,e,n,r,s,i)=>{const o=s==="svg";e==="class"?xp(t,r,o):e==="style"?Up(t,n,r):Gs(e)?No(e)||$p(t,e,n,r,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):qp(t,e,r,o))?(Ya(t,e,r),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Ja(t,e,r,o,i,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!De(r))?Ya(t,gn(e),r,i,e):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),Ja(t,e,r,o))};function qp(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&Za(e)&&oe(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=t.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Za(e)&&De(n)?!1:e in t}const ec=t=>{const e=t.props["onUpdate:modelValue"]||!1;return te(e)?n=>cs(e,n):e};function Jp(t){t.target.composing=!0}function tc(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const ki=Symbol("_assign"),Yp={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t[ki]=ec(s);const i=r||s.props&&s.props.type==="number";Wn(t,e?"change":"input",o=>{if(o.target.composing)return;let a=t.value;n&&(a=a.trim()),i&&(a=Zi(a)),t[ki](a)}),n&&Wn(t,"change",()=>{t.value=t.value.trim()}),e||(Wn(t,"compositionstart",Jp),Wn(t,"compositionend",tc),Wn(t,"change",tc))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:r,trim:s,number:i}},o){if(t[ki]=ec(o),t.composing)return;const a=(i||t.type==="number")&&!/^0\d/.test(t.value)?Zi(t.value):t.value,c=e??"";a!==c&&(document.activeElement===t&&t.type!=="range"&&(r&&e===n||s&&t.value.trim()===c)||(t.value=c))}},Xp=["ctrl","shift","alt","meta"],Qp={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>Xp.some(n=>t[`${n}Key`]&&!e.includes(n))},Zp=(t,e)=>{const n=t._withMods||(t._withMods={}),r=e.join(".");return n[r]||(n[r]=((s,...i)=>{for(let o=0;o<e.length;o++){const a=Qp[e[o]];if(a&&a(s,e))return}return t(s,...i)}))},eg=Me({patchProp:zp},Ap);let nc;function tg(){return nc||(nc=Yh(eg))}const ng=((...t)=>{const e=tg().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=sg(r);if(!s)return;const i=e._component;!oe(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=n(s,!1,rg(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e});function rg(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function sg(t){return De(t)?document.querySelector(t):t}/*!
 * pinia v3.0.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Wu;const ii=t=>Wu=t,Gu=Symbol();function uo(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var Rr;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(Rr||(Rr={}));function ig(){const t=Ul(!0),e=t.run(()=>be({}));let n=[],r=[];const s=Ys({install(i){ii(s),s._a=i,i.provide(Gu,s),i.config.globalProperties.$pinia=s,r.forEach(o=>n.push(o)),r=[]},use(i){return this._a?n.push(i):r.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return s}const Ku=()=>{};function rc(t,e,n,r=Ku){t.push(e);const s=()=>{const i=t.indexOf(e);i>-1&&(t.splice(i,1),r())};return!n&&Bl()&&Kr(s),s}function $n(t,...e){t.slice().forEach(n=>{n(...e)})}const og=t=>t(),sc=Symbol(),Di=Symbol();function fo(t,e){t instanceof Map&&e instanceof Map?e.forEach((n,r)=>t.set(r,n)):t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const r=e[n],s=t[n];uo(s)&&uo(r)&&t.hasOwnProperty(n)&&!ke(r)&&!un(r)?t[n]=fo(s,r):t[n]=r}return t}const ag=Symbol();function cg(t){return!uo(t)||!Object.prototype.hasOwnProperty.call(t,ag)}const{assign:en}=Object;function lg(t){return!!(ke(t)&&t.effect)}function ug(t,e,n,r){const{state:s,actions:i,getters:o}=e,a=n.state.value[t];let c;function l(){a||(n.state.value[t]=s?s():{});const u=uh(n.state.value[t]);return en(u,i,Object.keys(o||{}).reduce((d,f)=>(d[f]=Ys(W(()=>{ii(n);const g=n._s.get(t);return o[f].call(g,g)})),d),{}))}return c=zu(t,l,e,n,r,!0),c}function zu(t,e,n={},r,s,i){let o;const a=en({actions:{}},n),c={deep:!0};let l,u,d=[],f=[],g;const _=r.state.value[t];!i&&!_&&(r.state.value[t]={}),be({});let b;function R(X){let O;l=u=!1,typeof X=="function"?(X(r.state.value[t]),O={type:Rr.patchFunction,storeId:t,events:g}):(fo(r.state.value[t],X),O={type:Rr.patchObject,payload:X,storeId:t,events:g});const D=b=Symbol();jo().then(()=>{b===D&&(l=!0)}),u=!0,$n(d,O,r.state.value[t])}const E=i?function(){const{state:O}=n,D=O?O():{};this.$patch(j=>{en(j,D)})}:Ku;function C(){o.stop(),d=[],f=[],r._s.delete(t)}const k=(X,O="")=>{if(sc in X)return X[Di]=O,X;const D=function(){ii(r);const j=Array.from(arguments),T=[],V=[];function he(L){T.push(L)}function ye(L){V.push(L)}$n(f,{args:j,name:D[Di],store:q,after:he,onError:ye});let le;try{le=X.apply(this&&this.$id===t?this:q,j)}catch(L){throw $n(V,L),L}return le instanceof Promise?le.then(L=>($n(T,L),L)).catch(L=>($n(V,L),Promise.reject(L))):($n(T,le),le)};return D[sc]=!0,D[Di]=O,D},I={_p:r,$id:t,$onAction:rc.bind(null,f),$patch:R,$reset:E,$subscribe(X,O={}){const D=rc(d,X,O.detached,()=>j()),j=o.run(()=>wt(()=>r.state.value[t],T=>{(O.flush==="sync"?u:l)&&X({storeId:t,type:Rr.direct,events:g},T)},en({},c,O)));return D},$dispose:C},q=Un(I);r._s.set(t,q);const re=(r._a&&r._a.runWithContext||og)(()=>r._e.run(()=>(o=Ul()).run(()=>e({action:k}))));for(const X in re){const O=re[X];if(ke(O)&&!lg(O)||un(O))i||(_&&cg(O)&&(ke(O)?O.value=_[X]:fo(O,_[X])),r.state.value[t][X]=O);else if(typeof O=="function"){const D=k(O,X);re[X]=D,a.actions[X]=O}}return en(q,re),en(ge(q),re),Object.defineProperty(q,"$state",{get:()=>r.state.value[t],set:X=>{R(O=>{en(O,X)})}}),r._p.forEach(X=>{en(q,o.run(()=>X({store:q,app:r._a,pinia:r,options:a})))}),_&&i&&n.hydrate&&n.hydrate(q.$state,_),l=!0,u=!0,q}/*! #__NO_SIDE_EFFECTS__ */function oi(t,e,n){let r;const s=typeof e=="function";r=s?n:e;function i(o,a){const c=jh();return o=o||(c?It(Gu,null):null),o&&ii(o),o=Wu,o._s.has(t)||(s?zu(t,e,r,o):ug(t,r,o)),o._s.get(t)}return i.$id=t,i}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Gn=typeof document<"u";function qu(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function dg(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&qu(t.default)}const me=Object.assign;function Oi(t,e){const n={};for(const r in e){const s=e[r];n[r]=dt(s)?s.map(t):t(s)}return n}const Pr=()=>{},dt=Array.isArray;function ic(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}const Ju=/#/g,fg=/&/g,hg=/\//g,pg=/=/g,gg=/\?/g,Yu=/\+/g,mg=/%5B/g,_g=/%5D/g,Xu=/%5E/g,vg=/%60/g,Qu=/%7B/g,bg=/%7C/g,Zu=/%7D/g,yg=/%20/g;function Xo(t){return t==null?"":encodeURI(""+t).replace(bg,"|").replace(mg,"[").replace(_g,"]")}function Sg(t){return Xo(t).replace(Qu,"{").replace(Zu,"}").replace(Xu,"^")}function ho(t){return Xo(t).replace(Yu,"%2B").replace(yg,"+").replace(Ju,"%23").replace(fg,"%26").replace(vg,"`").replace(Qu,"{").replace(Zu,"}").replace(Xu,"^")}function Ig(t){return ho(t).replace(pg,"%3D")}function wg(t){return Xo(t).replace(Ju,"%23").replace(gg,"%3F")}function Eg(t){return wg(t).replace(hg,"%2F")}function $r(t){if(t==null)return null;try{return decodeURIComponent(""+t)}catch{}return""+t}const Cg=/\/$/,Ag=t=>t.replace(Cg,"");function Ni(t,e,n="/"){let r,s={},i="",o="";const a=e.indexOf("#");let c=e.indexOf("?");return c=a>=0&&c>a?-1:c,c>=0&&(r=e.slice(0,c),i=e.slice(c,a>0?a:e.length),s=t(i.slice(1))),a>=0&&(r=r||e.slice(0,a),o=e.slice(a,e.length)),r=kg(r??e,n),{fullPath:r+i+o,path:r,query:s,hash:$r(o)}}function Tg(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function oc(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function Rg(t,e,n){const r=e.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&rr(e.matched[r],n.matched[s])&&ed(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function rr(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function ed(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(var n in t)if(!Pg(t[n],e[n]))return!1;return!0}function Pg(t,e){return dt(t)?ac(t,e):dt(e)?ac(e,t):t?.valueOf()===e?.valueOf()}function ac(t,e){return dt(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function kg(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,o,a;for(o=0;o<r.length;o++)if(a=r[o],a!==".")if(a==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o).join("/")}const Qt={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let po=(function(t){return t.pop="pop",t.push="push",t})({}),xi=(function(t){return t.back="back",t.forward="forward",t.unknown="",t})({});function Dg(t){if(!t)if(Gn){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),Ag(t)}const Og=/^[^#]+#/;function Ng(t,e){return t.replace(Og,"#")+e}function xg(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const ai=()=>({left:window.scrollX,top:window.scrollY});function Mg(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;e=xg(s,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function cc(t,e){return(history.state?history.state.position-e:-1)+t}const go=new Map;function Lg(t,e){go.set(t,e)}function Hg(t){const e=go.get(t);return go.delete(t),e}function Ug(t){return typeof t=="string"||t&&typeof t=="object"}function td(t){return typeof t=="string"||typeof t=="symbol"}let Te=(function(t){return t[t.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",t[t.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",t[t.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",t[t.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",t[t.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",t})({});const nd=Symbol("");Te.MATCHER_NOT_FOUND+"",Te.NAVIGATION_GUARD_REDIRECT+"",Te.NAVIGATION_ABORTED+"",Te.NAVIGATION_CANCELLED+"",Te.NAVIGATION_DUPLICATED+"";function sr(t,e){return me(new Error,{type:t,[nd]:!0},e)}function Dt(t,e){return t instanceof Error&&nd in t&&(e==null||!!(t.type&e))}const Bg=["params","query","hash"];function Fg(t){if(typeof t=="string")return t;if(t.path!=null)return t.path;const e={};for(const n of Bg)n in t&&(e[n]=t[n]);return JSON.stringify(e,null,2)}function $g(t){const e={};if(t===""||t==="?")return e;const n=(t[0]==="?"?t.slice(1):t).split("&");for(let r=0;r<n.length;++r){const s=n[r].replace(Yu," "),i=s.indexOf("="),o=$r(i<0?s:s.slice(0,i)),a=i<0?null:$r(s.slice(i+1));if(o in e){let c=e[o];dt(c)||(c=e[o]=[c]),c.push(a)}else e[o]=a}return e}function lc(t){let e="";for(let n in t){const r=t[n];if(n=Ig(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(dt(r)?r.map(s=>s&&ho(s)):[r&&ho(r)]).forEach(s=>{s!==void 0&&(e+=(e.length?"&":"")+n,s!=null&&(e+="="+s))})}return e}function Vg(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=dt(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return e}const jg=Symbol(""),uc=Symbol(""),Qo=Symbol(""),rd=Symbol(""),mo=Symbol("");function gr(){let t=[];function e(r){return t.push(r),()=>{const s=t.indexOf(r);s>-1&&t.splice(s,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function rn(t,e,n,r,s,i=o=>o()){const o=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((a,c)=>{const l=f=>{f===!1?c(sr(Te.NAVIGATION_ABORTED,{from:n,to:e})):f instanceof Error?c(f):Ug(f)?c(sr(Te.NAVIGATION_GUARD_REDIRECT,{from:e,to:f})):(o&&r.enterCallbacks[s]===o&&typeof f=="function"&&o.push(f),a())},u=i(()=>t.call(r&&r.instances[s],e,n,l));let d=Promise.resolve(u);t.length<3&&(d=d.then(l)),d.catch(f=>c(f))})}function Mi(t,e,n,r,s=i=>i()){const i=[];for(const o of t)for(const a in o.components){let c=o.components[a];if(!(e!=="beforeRouteEnter"&&!o.instances[a]))if(qu(c)){const l=(c.__vccOpts||c)[e];l&&i.push(rn(l,n,r,o,a,s))}else{let l=c();i.push(()=>l.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const d=dg(u)?u.default:u;o.mods[a]=u,o.components[a]=d;const f=(d.__vccOpts||d)[e];return f&&rn(f,n,r,o,a,s)()}))}}return i}function Wg(t,e){const n=[],r=[],s=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const a=e.matched[o];a&&(t.matched.find(l=>rr(l,a))?r.push(a):n.push(a));const c=t.matched[o];c&&(e.matched.find(l=>rr(l,c))||s.push(c))}return[n,r,s]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Gg=()=>location.protocol+"//"+location.host;function sd(t,e){const{pathname:n,search:r,hash:s}=e,i=t.indexOf("#");if(i>-1){let o=s.includes(t.slice(i))?t.slice(i).length:1,a=s.slice(o);return a[0]!=="/"&&(a="/"+a),oc(a,"")}return oc(n,t)+r+s}function Kg(t,e,n,r){let s=[],i=[],o=null;const a=({state:f})=>{const g=sd(t,location),_=n.value,b=e.value;let R=0;if(f){if(n.value=g,e.value=f,o&&o===_){o=null;return}R=b?f.position-b.position:0}else r(g);s.forEach(E=>{E(n.value,_,{delta:R,type:po.pop,direction:R?R>0?xi.forward:xi.back:xi.unknown})})};function c(){o=n.value}function l(f){s.push(f);const g=()=>{const _=s.indexOf(f);_>-1&&s.splice(_,1)};return i.push(g),g}function u(){if(document.visibilityState==="hidden"){const{history:f}=window;if(!f.state)return;f.replaceState(me({},f.state,{scroll:ai()}),"")}}function d(){for(const f of i)f();i=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",u),document.removeEventListener("visibilitychange",u)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",u),document.addEventListener("visibilitychange",u),{pauseListeners:c,listen:l,destroy:d}}function dc(t,e,n,r=!1,s=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:s?ai():null}}function zg(t){const{history:e,location:n}=window,r={value:sd(t,n)},s={value:e.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(c,l,u){const d=t.indexOf("#"),f=d>-1?(n.host&&document.querySelector("base")?t:t.slice(d))+c:Gg()+t+c;try{e[u?"replaceState":"pushState"](l,"",f),s.value=l}catch(g){console.error(g),n[u?"replace":"assign"](f)}}function o(c,l){i(c,me({},e.state,dc(s.value.back,c,s.value.forward,!0),l,{position:s.value.position}),!0),r.value=c}function a(c,l){const u=me({},s.value,e.state,{forward:c,scroll:ai()});i(u.current,u,!0),i(c,me({},dc(r.value,c,null),{position:u.position+1},l),!1),r.value=c}return{location:r,state:s,push:a,replace:o}}function qg(t){t=Dg(t);const e=zg(t),n=Kg(t,e.state,e.location,e.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=me({location:"",base:t,go:r,createHref:Ng.bind(null,t)},e,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}let Tn=(function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.Group=2]="Group",t})({});var xe=(function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.ParamRegExp=2]="ParamRegExp",t[t.ParamRegExpEnd=3]="ParamRegExpEnd",t[t.EscapeNext=4]="EscapeNext",t})(xe||{});const Jg={type:Tn.Static,value:""},Yg=/[a-zA-Z0-9_]/;function Xg(t){if(!t)return[[]];if(t==="/")return[[Jg]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(g){throw new Error(`ERR (${n})/"${l}": ${g}`)}let n=xe.Static,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let a=0,c,l="",u="";function d(){l&&(n===xe.Static?i.push({type:Tn.Static,value:l}):n===xe.Param||n===xe.ParamRegExp||n===xe.ParamRegExpEnd?(i.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),i.push({type:Tn.Param,value:l,regexp:u,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),l="")}function f(){l+=c}for(;a<t.length;){if(c=t[a++],c==="\\"&&n!==xe.ParamRegExp){r=n,n=xe.EscapeNext;continue}switch(n){case xe.Static:c==="/"?(l&&d(),o()):c===":"?(d(),n=xe.Param):f();break;case xe.EscapeNext:f(),n=r;break;case xe.Param:c==="("?n=xe.ParamRegExp:Yg.test(c)?f():(d(),n=xe.Static,c!=="*"&&c!=="?"&&c!=="+"&&a--);break;case xe.ParamRegExp:c===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+c:n=xe.ParamRegExpEnd:u+=c;break;case xe.ParamRegExpEnd:d(),n=xe.Static,c!=="*"&&c!=="?"&&c!=="+"&&a--,u="";break;default:e("Unknown state");break}}return n===xe.ParamRegExp&&e(`Unfinished custom RegExp for param "${l}"`),d(),o(),s}const fc="[^/]+?",Qg={sensitive:!1,strict:!1,start:!0,end:!0};var je=(function(t){return t[t._multiplier=10]="_multiplier",t[t.Root=90]="Root",t[t.Segment=40]="Segment",t[t.SubSegment=30]="SubSegment",t[t.Static=40]="Static",t[t.Dynamic=20]="Dynamic",t[t.BonusCustomRegExp=10]="BonusCustomRegExp",t[t.BonusWildcard=-50]="BonusWildcard",t[t.BonusRepeatable=-20]="BonusRepeatable",t[t.BonusOptional=-8]="BonusOptional",t[t.BonusStrict=.7000000000000001]="BonusStrict",t[t.BonusCaseSensitive=.25]="BonusCaseSensitive",t})(je||{});const Zg=/[.+*?^${}()[\]/\\]/g;function em(t,e){const n=me({},Qg,e),r=[];let s=n.start?"^":"";const i=[];for(const l of t){const u=l.length?[]:[je.Root];n.strict&&!l.length&&(s+="/");for(let d=0;d<l.length;d++){const f=l[d];let g=je.Segment+(n.sensitive?je.BonusCaseSensitive:0);if(f.type===Tn.Static)d||(s+="/"),s+=f.value.replace(Zg,"\\$&"),g+=je.Static;else if(f.type===Tn.Param){const{value:_,repeatable:b,optional:R,regexp:E}=f;i.push({name:_,repeatable:b,optional:R});const C=E||fc;if(C!==fc){g+=je.BonusCustomRegExp;try{`${C}`}catch(I){throw new Error(`Invalid custom RegExp for param "${_}" (${C}): `+I.message)}}let k=b?`((?:${C})(?:/(?:${C}))*)`:`(${C})`;d||(k=R&&l.length<2?`(?:/${k})`:"/"+k),R&&(k+="?"),s+=k,g+=je.Dynamic,R&&(g+=je.BonusOptional),b&&(g+=je.BonusRepeatable),C===".*"&&(g+=je.BonusWildcard)}u.push(g)}r.push(u)}if(n.strict&&n.end){const l=r.length-1;r[l][r[l].length-1]+=je.BonusStrict}n.strict||(s+="/?"),n.end?s+="$":n.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function a(l){const u=l.match(o),d={};if(!u)return null;for(let f=1;f<u.length;f++){const g=u[f]||"",_=i[f-1];d[_.name]=g&&_.repeatable?g.split("/"):g}return d}function c(l){let u="",d=!1;for(const f of t){(!d||!u.endsWith("/"))&&(u+="/"),d=!1;for(const g of f)if(g.type===Tn.Static)u+=g.value;else if(g.type===Tn.Param){const{value:_,repeatable:b,optional:R}=g,E=_ in l?l[_]:"";if(dt(E)&&!b)throw new Error(`Provided param "${_}" is an array but it is not repeatable (* or + modifiers)`);const C=dt(E)?E.join("/"):E;if(!C)if(R)f.length<2&&(u.endsWith("/")?u=u.slice(0,-1):d=!0);else throw new Error(`Missing required param "${_}"`);u+=C}}return u||"/"}return{re:o,score:r,keys:i,parse:a,stringify:c}}function tm(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===je.Static+je.Segment?-1:1:t.length>e.length?e.length===1&&e[0]===je.Static+je.Segment?1:-1:0}function id(t,e){let n=0;const r=t.score,s=e.score;for(;n<r.length&&n<s.length;){const i=tm(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(hc(r))return 1;if(hc(s))return-1}return s.length-r.length}function hc(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const nm={strict:!1,end:!0,sensitive:!1};function rm(t,e,n){const r=em(Xg(t.path),n),s=me(r,{record:t,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function sm(t,e){const n=[],r=new Map;e=ic(nm,e);function s(d){return r.get(d)}function i(d,f,g){const _=!g,b=gc(d);b.aliasOf=g&&g.record;const R=ic(e,d),E=[b];if("alias"in d){const I=typeof d.alias=="string"?[d.alias]:d.alias;for(const q of I)E.push(gc(me({},b,{components:g?g.record.components:b.components,path:q,aliasOf:g?g.record:b})))}let C,k;for(const I of E){const{path:q}=I;if(f&&q[0]!=="/"){const ne=f.record.path,re=ne[ne.length-1]==="/"?"":"/";I.path=f.record.path+(q&&re+q)}if(C=rm(I,f,R),g?g.alias.push(C):(k=k||C,k!==C&&k.alias.push(C),_&&d.name&&!mc(C)&&o(d.name)),od(C)&&c(C),b.children){const ne=b.children;for(let re=0;re<ne.length;re++)i(ne[re],C,g&&g.children[re])}g=g||C}return k?()=>{o(k)}:Pr}function o(d){if(td(d)){const f=r.get(d);f&&(r.delete(d),n.splice(n.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=n.indexOf(d);f>-1&&(n.splice(f,1),d.record.name&&r.delete(d.record.name),d.children.forEach(o),d.alias.forEach(o))}}function a(){return n}function c(d){const f=am(d,n);n.splice(f,0,d),d.record.name&&!mc(d)&&r.set(d.record.name,d)}function l(d,f){let g,_={},b,R;if("name"in d&&d.name){if(g=r.get(d.name),!g)throw sr(Te.MATCHER_NOT_FOUND,{location:d});R=g.record.name,_=me(pc(f.params,g.keys.filter(k=>!k.optional).concat(g.parent?g.parent.keys.filter(k=>k.optional):[]).map(k=>k.name)),d.params&&pc(d.params,g.keys.map(k=>k.name))),b=g.stringify(_)}else if(d.path!=null)b=d.path,g=n.find(k=>k.re.test(b)),g&&(_=g.parse(b),R=g.record.name);else{if(g=f.name?r.get(f.name):n.find(k=>k.re.test(f.path)),!g)throw sr(Te.MATCHER_NOT_FOUND,{location:d,currentLocation:f});R=g.record.name,_=me({},f.params,d.params),b=g.stringify(_)}const E=[];let C=g;for(;C;)E.unshift(C.record),C=C.parent;return{name:R,path:b,params:_,matched:E,meta:om(E)}}t.forEach(d=>i(d));function u(){n.length=0,r.clear()}return{addRoute:i,resolve:l,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:s}}function pc(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function gc(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:im(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function im(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="object"?n[r]:n;return e}function mc(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function om(t){return t.reduce((e,n)=>me(e,n.meta),{})}function am(t,e){let n=0,r=e.length;for(;n!==r;){const i=n+r>>1;id(t,e[i])<0?r=i:n=i+1}const s=cm(t);return s&&(r=e.lastIndexOf(s,r-1)),r}function cm(t){let e=t;for(;e=e.parent;)if(od(e)&&id(t,e)===0)return e}function od({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function _c(t){const e=It(Qo),n=It(rd),r=W(()=>{const c=Re(t.to);return e.resolve(c)}),s=W(()=>{const{matched:c}=r.value,{length:l}=c,u=c[l-1],d=n.matched;if(!u||!d.length)return-1;const f=d.findIndex(rr.bind(null,u));if(f>-1)return f;const g=vc(c[l-2]);return l>1&&vc(u)===g&&d[d.length-1].path!==g?d.findIndex(rr.bind(null,c[l-2])):f}),i=W(()=>s.value>-1&&hm(n.params,r.value.params)),o=W(()=>s.value>-1&&s.value===n.matched.length-1&&ed(n.params,r.value.params));function a(c={}){if(fm(c)){const l=e[Re(t.replace)?"replace":"push"](Re(t.to)).catch(Pr);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>l),l}return Promise.resolve()}return{route:r,href:W(()=>r.value.href),isActive:i,isExactActive:o,navigate:a}}function lm(t){return t.length===1?t[0]:t}const um=Be({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:_c,setup(t,{slots:e}){const n=Un(_c(t)),{options:r}=It(Qo),s=W(()=>({[bc(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[bc(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&lm(e.default(n));return t.custom?i:Yo("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),dm=um;function fm(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function hm(t,e){for(const n in e){const r=e[n],s=t[n];if(typeof r=="string"){if(r!==s)return!1}else if(!dt(s)||s.length!==r.length||r.some((i,o)=>i.valueOf()!==s[o].valueOf()))return!1}return!0}function vc(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const bc=(t,e,n)=>t??e??n,pm=Be({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=It(mo),s=W(()=>t.route||r.value),i=It(uc,0),o=W(()=>{let l=Re(i);const{matched:u}=s.value;let d;for(;(d=u[l])&&!d.components;)l++;return l}),a=W(()=>s.value.matched[o.value]);ls(uc,W(()=>o.value+1)),ls(jg,a),ls(mo,s);const c=be();return wt(()=>[c.value,a.value,t.name],([l,u,d],[f,g,_])=>{u&&(u.instances[d]=l,g&&g!==u&&l&&l===f&&(u.leaveGuards.size||(u.leaveGuards=g.leaveGuards),u.updateGuards.size||(u.updateGuards=g.updateGuards))),l&&u&&(!g||!rr(u,g)||!f)&&(u.enterCallbacks[d]||[]).forEach(b=>b(l))},{flush:"post"}),()=>{const l=s.value,u=t.name,d=a.value,f=d&&d.components[u];if(!f)return yc(n.default,{Component:f,route:l});const g=d.props[u],_=g?g===!0?l.params:typeof g=="function"?g(l):g:null,R=Yo(f,me({},_,e,{onVnodeUnmounted:E=>{E.component.isUnmounted&&(d.instances[u]=null)},ref:c}));return yc(n.default,{Component:R,route:l})||R}}});function yc(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const ad=pm;function gm(t){const e=sm(t.routes,t),n=t.parseQuery||$g,r=t.stringifyQuery||lc,s=t.history,i=gr(),o=gr(),a=gr(),c=ah(Qt);let l=Qt;Gn&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Oi.bind(null,v=>""+v),d=Oi.bind(null,Eg),f=Oi.bind(null,$r);function g(v,F){let H,J;return td(v)?(H=e.getRecordMatcher(v),J=F):J=v,e.addRoute(J,H)}function _(v){const F=e.getRecordMatcher(v);F&&e.removeRoute(F)}function b(){return e.getRoutes().map(v=>v.record)}function R(v){return!!e.getRecordMatcher(v)}function E(v,F){if(F=me({},F||c.value),typeof v=="string"){const m=Ni(n,v,F.path),S=e.resolve({path:m.path},F),w=s.createHref(m.fullPath);return me(m,S,{params:f(S.params),hash:$r(m.hash),redirectedFrom:void 0,href:w})}let H;if(v.path!=null)H=me({},v,{path:Ni(n,v.path,F.path).path});else{const m=me({},v.params);for(const S in m)m[S]==null&&delete m[S];H=me({},v,{params:d(m)}),F.params=d(F.params)}const J=e.resolve(H,F),ue=v.hash||"";J.params=u(f(J.params));const h=Tg(r,me({},v,{hash:Sg(ue),path:J.path})),p=s.createHref(h);return me({fullPath:h,hash:ue,query:r===lc?Vg(v.query):v.query||{}},J,{redirectedFrom:void 0,href:p})}function C(v){return typeof v=="string"?Ni(n,v,c.value.path):me({},v)}function k(v,F){if(l!==v)return sr(Te.NAVIGATION_CANCELLED,{from:F,to:v})}function I(v){return re(v)}function q(v){return I(me(C(v),{replace:!0}))}function ne(v,F){const H=v.matched[v.matched.length-1];if(H&&H.redirect){const{redirect:J}=H;let ue=typeof J=="function"?J(v,F):J;return typeof ue=="string"&&(ue=ue.includes("?")||ue.includes("#")?ue=C(ue):{path:ue},ue.params={}),me({query:v.query,hash:v.hash,params:ue.path!=null?{}:v.params},ue)}}function re(v,F){const H=l=E(v),J=c.value,ue=v.state,h=v.force,p=v.replace===!0,m=ne(H,J);if(m)return re(me(C(m),{state:typeof m=="object"?me({},ue,m.state):ue,force:h,replace:p}),F||H);const S=H;S.redirectedFrom=F;let w;return!h&&Rg(r,J,H)&&(w=sr(Te.NAVIGATION_DUPLICATED,{to:S,from:J}),M(J,J,!0,!1)),(w?Promise.resolve(w):D(S,J)).catch(y=>Dt(y)?Dt(y,Te.NAVIGATION_GUARD_REDIRECT)?y:A(y):G(y,S,J)).then(y=>{if(y){if(Dt(y,Te.NAVIGATION_GUARD_REDIRECT))return re(me({replace:p},C(y.to),{state:typeof y.to=="object"?me({},ue,y.to.state):ue,force:h}),F||S)}else y=T(S,J,!0,p,ue);return j(S,J,y),y})}function X(v,F){const H=k(v,F);return H?Promise.reject(H):Promise.resolve()}function O(v){const F=de.values().next().value;return F&&typeof F.runWithContext=="function"?F.runWithContext(v):v()}function D(v,F){let H;const[J,ue,h]=Wg(v,F);H=Mi(J.reverse(),"beforeRouteLeave",v,F);for(const m of J)m.leaveGuards.forEach(S=>{H.push(rn(S,v,F))});const p=X.bind(null,v,F);return H.push(p),Ne(H).then(()=>{H=[];for(const m of i.list())H.push(rn(m,v,F));return H.push(p),Ne(H)}).then(()=>{H=Mi(ue,"beforeRouteUpdate",v,F);for(const m of ue)m.updateGuards.forEach(S=>{H.push(rn(S,v,F))});return H.push(p),Ne(H)}).then(()=>{H=[];for(const m of h)if(m.beforeEnter)if(dt(m.beforeEnter))for(const S of m.beforeEnter)H.push(rn(S,v,F));else H.push(rn(m.beforeEnter,v,F));return H.push(p),Ne(H)}).then(()=>(v.matched.forEach(m=>m.enterCallbacks={}),H=Mi(h,"beforeRouteEnter",v,F,O),H.push(p),Ne(H))).then(()=>{H=[];for(const m of o.list())H.push(rn(m,v,F));return H.push(p),Ne(H)}).catch(m=>Dt(m,Te.NAVIGATION_CANCELLED)?m:Promise.reject(m))}function j(v,F,H){a.list().forEach(J=>O(()=>J(v,F,H)))}function T(v,F,H,J,ue){const h=k(v,F);if(h)return h;const p=F===Qt,m=Gn?history.state:{};H&&(J||p?s.replace(v.fullPath,me({scroll:p&&m&&m.scroll},ue)):s.push(v.fullPath,ue)),c.value=v,M(v,F,H,p),A()}let V;function he(){V||(V=s.listen((v,F,H)=>{if(!Oe.listening)return;const J=E(v),ue=ne(J,Oe.currentRoute.value);if(ue){re(me(ue,{replace:!0,force:!0}),J).catch(Pr);return}l=J;const h=c.value;Gn&&Lg(cc(h.fullPath,H.delta),ai()),D(J,h).catch(p=>Dt(p,Te.NAVIGATION_ABORTED|Te.NAVIGATION_CANCELLED)?p:Dt(p,Te.NAVIGATION_GUARD_REDIRECT)?(re(me(C(p.to),{force:!0}),J).then(m=>{Dt(m,Te.NAVIGATION_ABORTED|Te.NAVIGATION_DUPLICATED)&&!H.delta&&H.type===po.pop&&s.go(-1,!1)}).catch(Pr),Promise.reject()):(H.delta&&s.go(-H.delta,!1),G(p,J,h))).then(p=>{p=p||T(J,h,!1),p&&(H.delta&&!Dt(p,Te.NAVIGATION_CANCELLED)?s.go(-H.delta,!1):H.type===po.pop&&Dt(p,Te.NAVIGATION_ABORTED|Te.NAVIGATION_DUPLICATED)&&s.go(-1,!1)),j(J,h,p)}).catch(Pr)}))}let ye=gr(),le=gr(),L;function G(v,F,H){A(v);const J=le.list();return J.length?J.forEach(ue=>ue(v,F,H)):console.error(v),Promise.reject(v)}function z(){return L&&c.value!==Qt?Promise.resolve():new Promise((v,F)=>{ye.add([v,F])})}function A(v){return L||(L=!v,he(),ye.list().forEach(([F,H])=>v?H(v):F()),ye.reset()),v}function M(v,F,H,J){const{scrollBehavior:ue}=t;if(!Gn||!ue)return Promise.resolve();const h=!H&&Hg(cc(v.fullPath,0))||(J||!H)&&history.state&&history.state.scroll||null;return jo().then(()=>ue(v,F,h)).then(p=>p&&Mg(p)).catch(p=>G(p,v,F))}const B=v=>s.go(v);let ae;const de=new Set,Oe={currentRoute:c,listening:!0,addRoute:g,removeRoute:_,clearRoutes:e.clearRoutes,hasRoute:R,getRoutes:b,resolve:E,options:t,push:I,replace:q,go:B,back:()=>B(-1),forward:()=>B(1),beforeEach:i.add,beforeResolve:o.add,afterEach:a.add,onError:le.add,isReady:z,install(v){v.component("RouterLink",dm),v.component("RouterView",ad),v.config.globalProperties.$router=Oe,Object.defineProperty(v.config.globalProperties,"$route",{enumerable:!0,get:()=>Re(c)}),Gn&&!ae&&c.value===Qt&&(ae=!0,I(s.location).catch(J=>{}));const F={};for(const J in Qt)Object.defineProperty(F,J,{get:()=>c.value[J],enumerable:!0});v.provide(Qo,Oe),v.provide(rd,eu(F)),v.provide(mo,c);const H=v.unmount;de.add(v),v.unmount=function(){de.delete(v),de.size<1&&(l=Qt,V&&V(),V=null,c.value=Qt,ae=!1,L=!1),H()}}};function Ne(v){return v.reduce((F,H)=>F.then(()=>O(H)),Promise.resolve())}return Oe}const mm=Be({__name:"App",setup(t){return(e,n)=>(Z(),Ft(Re(ad)))}}),_m=()=>{};var Sc={};/**
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
 */const cd=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},vm=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],a=t[n++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},ld={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,l=c?t[s+2]:0,u=i>>2,d=(i&3)<<4|a>>4;let f=(a&15)<<2|l>>6,g=l&63;c||(g=64,o||(f=64)),r.push(n[u],n[d],n[f],n[g])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(cd(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):vm(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const l=s<t.length?n[t.charAt(s)]:64;++s;const d=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||a==null||l==null||d==null)throw new bm;const f=i<<2|a>>4;if(r.push(f),l!==64){const g=a<<4&240|l>>2;if(r.push(g),d!==64){const _=l<<6&192|d;r.push(_)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class bm extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ym=function(t){const e=cd(t);return ld.encodeByteArray(e,!0)},ud=function(t){return ym(t).replace(/\./g,"")},dd=function(t){try{return ld.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Sm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Im=()=>Sm().__FIREBASE_DEFAULTS__,wm=()=>{if(typeof process>"u"||typeof Sc>"u")return;const t=Sc.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Em=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&dd(t[1]);return e&&JSON.parse(e)},Zo=()=>{try{return _m()||Im()||wm()||Em()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Cm=t=>Zo()?.emulatorHosts?.[t],fd=()=>Zo()?.config,hd=t=>Zo()?.[`_${t}`];/**
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
 */class Am{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function ci(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Tm(t){return(await fetch(t,{credentials:"include"})).ok}const kr={};function Rm(){const t={prod:[],emulator:[]};for(const e of Object.keys(kr))kr[e]?t.emulator.push(e):t.prod.push(e);return t}function Pm(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Ic=!1;function km(t,e){if(typeof window>"u"||typeof document>"u"||!ci(window.location.host)||kr[t]===e||kr[t]||Ic)return;kr[t]=e;function n(f){return`__firebase__banner__${f}`}const r="__firebase__banner",i=Rm().prod.length>0;function o(){const f=document.getElementById(r);f&&f.remove()}function a(f){f.style.display="flex",f.style.background="#7faaf0",f.style.position="fixed",f.style.bottom="5px",f.style.left="5px",f.style.padding=".5em",f.style.borderRadius="5px",f.style.alignItems="center"}function c(f,g){f.setAttribute("width","24"),f.setAttribute("id",g),f.setAttribute("height","24"),f.setAttribute("viewBox","0 0 24 24"),f.setAttribute("fill","none"),f.style.marginLeft="-6px"}function l(){const f=document.createElement("span");return f.style.cursor="pointer",f.style.marginLeft="16px",f.style.fontSize="24px",f.innerHTML=" &times;",f.onclick=()=>{Ic=!0,o()},f}function u(f,g){f.setAttribute("id",g),f.innerText="Learn more",f.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",f.setAttribute("target","__blank"),f.style.paddingLeft="5px",f.style.textDecoration="underline"}function d(){const f=Pm(r),g=n("text"),_=document.getElementById(g)||document.createElement("span"),b=n("learnmore"),R=document.getElementById(b)||document.createElement("a"),E=n("preprendIcon"),C=document.getElementById(E)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(f.created){const k=f.element;a(k),u(R,b);const I=l();c(C,E),k.append(C,_,R,I),document.body.appendChild(k)}i?(_.innerText="Preview backend disconnected.",C.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(C.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,_.innerText="Preview backend running in this workspace."),_.setAttribute("id",g)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",d):d()}/**
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
 */function Je(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Dm(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Je())}function Om(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function pd(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Nm(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function xm(){const t=Je();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function gd(){try{return typeof indexedDB=="object"}catch{return!1}}function md(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}function Mm(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const Lm="FirebaseError";class Rt extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Lm,Object.setPrototypeOf(this,Rt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Bn.prototype.create)}}class Bn{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Hm(i,r):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Rt(s,a,r)}}function Hm(t,e){return t.replace(Um,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Um=/\{\$([^}]+)}/g;function Bm(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Nn(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(wc(i)&&wc(o)){if(!Nn(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function wc(t){return t!==null&&typeof t=="object"}/**
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
 */function Jr(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function vr(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function br(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function Fm(t,e){const n=new $m(t,e);return n.subscribe.bind(n)}class $m{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");Vm(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=Li),s.error===void 0&&(s.error=Li),s.complete===void 0&&(s.complete=Li);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Vm(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Li(){}/**
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
 */const jm=1e3,Wm=2,Gm=14400*1e3,Km=.5;function Ec(t,e=jm,n=Wm){const r=e*Math.pow(n,t),s=Math.round(Km*r*(Math.random()-.5)*2);return Math.min(Gm,r+s)}/**
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
 */function ot(t){return t&&t._delegate?t._delegate:t}class Tt{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Cn="[DEFAULT]";/**
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
 */class zm{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new Am;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Jm(e))try{this.getOrInitializeService({instanceIdentifier:Cn})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Cn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Cn){return this.instances.has(e)}getOptions(e=Cn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&o.resolve(s)}return s}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:qm(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Cn){return this.component?this.component.multipleInstances?e:Cn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function qm(t){return t===Cn?void 0:t}function Jm(t){return t.instantiationMode==="EAGER"}/**
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
 */class Ym{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new zm(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var Se;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(Se||(Se={}));const Xm={debug:Se.DEBUG,verbose:Se.VERBOSE,info:Se.INFO,warn:Se.WARN,error:Se.ERROR,silent:Se.SILENT},Qm=Se.INFO,Zm={[Se.DEBUG]:"log",[Se.VERBOSE]:"log",[Se.INFO]:"info",[Se.WARN]:"warn",[Se.ERROR]:"error"},e_=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=Zm[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ea{constructor(e){this.name=e,this._logLevel=Qm,this._logHandler=e_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Se))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Xm[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Se.DEBUG,...e),this._logHandler(this,Se.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Se.VERBOSE,...e),this._logHandler(this,Se.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Se.INFO,...e),this._logHandler(this,Se.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Se.WARN,...e),this._logHandler(this,Se.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Se.ERROR,...e),this._logHandler(this,Se.ERROR,...e)}}const t_=(t,e)=>e.some(n=>t instanceof n);let Cc,Ac;function n_(){return Cc||(Cc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function r_(){return Ac||(Ac=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const _d=new WeakMap,_o=new WeakMap,vd=new WeakMap,Hi=new WeakMap,ta=new WeakMap;function s_(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(dn(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&_d.set(n,t)}).catch(()=>{}),ta.set(e,t),e}function i_(t){if(_o.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});_o.set(t,e)}let vo={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return _o.get(t);if(e==="objectStoreNames")return t.objectStoreNames||vd.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return dn(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function o_(t){vo=t(vo)}function a_(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Ui(this),e,...n);return vd.set(r,e.sort?e.sort():[e]),dn(r)}:r_().includes(t)?function(...e){return t.apply(Ui(this),e),dn(_d.get(this))}:function(...e){return dn(t.apply(Ui(this),e))}}function c_(t){return typeof t=="function"?a_(t):(t instanceof IDBTransaction&&i_(t),t_(t,n_())?new Proxy(t,vo):t)}function dn(t){if(t instanceof IDBRequest)return s_(t);if(Hi.has(t))return Hi.get(t);const e=c_(t);return e!==t&&(Hi.set(t,e),ta.set(e,t)),e}const Ui=t=>ta.get(t);function bd(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),a=dn(o);return r&&o.addEventListener("upgradeneeded",c=>{r(dn(o.result),c.oldVersion,c.newVersion,dn(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const l_=["get","getKey","getAll","getAllKeys","count"],u_=["put","add","delete","clear"],Bi=new Map;function Tc(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Bi.get(e))return Bi.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=u_.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||l_.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),s&&c.done]))[0]};return Bi.set(e,i),i}o_(t=>({...t,get:(e,n,r)=>Tc(e,n)||t.get(e,n,r),has:(e,n)=>!!Tc(e,n)||t.has(e,n)}));/**
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
 */class d_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(f_(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function f_(t){return t.getComponent()?.type==="VERSION"}const bo="@firebase/app",Rc="0.14.6";/**
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
 */const Kt=new ea("@firebase/app"),h_="@firebase/app-compat",p_="@firebase/analytics-compat",g_="@firebase/analytics",m_="@firebase/app-check-compat",__="@firebase/app-check",v_="@firebase/auth",b_="@firebase/auth-compat",y_="@firebase/database",S_="@firebase/data-connect",I_="@firebase/database-compat",w_="@firebase/functions",E_="@firebase/functions-compat",C_="@firebase/installations",A_="@firebase/installations-compat",T_="@firebase/messaging",R_="@firebase/messaging-compat",P_="@firebase/performance",k_="@firebase/performance-compat",D_="@firebase/remote-config",O_="@firebase/remote-config-compat",N_="@firebase/storage",x_="@firebase/storage-compat",M_="@firebase/firestore",L_="@firebase/ai",H_="@firebase/firestore-compat",U_="firebase",B_="12.6.0";/**
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
 */const yo="[DEFAULT]",F_={[bo]:"fire-core",[h_]:"fire-core-compat",[g_]:"fire-analytics",[p_]:"fire-analytics-compat",[__]:"fire-app-check",[m_]:"fire-app-check-compat",[v_]:"fire-auth",[b_]:"fire-auth-compat",[y_]:"fire-rtdb",[S_]:"fire-data-connect",[I_]:"fire-rtdb-compat",[w_]:"fire-fn",[E_]:"fire-fn-compat",[C_]:"fire-iid",[A_]:"fire-iid-compat",[T_]:"fire-fcm",[R_]:"fire-fcm-compat",[P_]:"fire-perf",[k_]:"fire-perf-compat",[D_]:"fire-rc",[O_]:"fire-rc-compat",[N_]:"fire-gcs",[x_]:"fire-gcs-compat",[M_]:"fire-fst",[H_]:"fire-fst-compat",[L_]:"fire-vertex","fire-js":"fire-js",[U_]:"fire-js-all"};/**
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
 */const Ds=new Map,$_=new Map,So=new Map;function Pc(t,e){try{t.container.addComponent(e)}catch(n){Kt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function zt(t){const e=t.name;if(So.has(e))return Kt.debug(`There were multiple attempts to register component ${e}.`),!1;So.set(e,t);for(const n of Ds.values())Pc(n,t);for(const n of $_.values())Pc(n,t);return!0}function cr(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function yt(t){return t==null?!1:t.settings!==void 0}/**
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
 */const V_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},fn=new Bn("app","Firebase",V_);/**
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
 */class j_{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Tt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw fn.create("app-deleted",{appName:this._name})}}/**
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
 */const Yr=B_;function yd(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:yo,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw fn.create("bad-app-name",{appName:String(s)});if(n||(n=fd()),!n)throw fn.create("no-options");const i=Ds.get(s);if(i){if(Nn(n,i.options)&&Nn(r,i.config))return i;throw fn.create("duplicate-app",{appName:s})}const o=new Ym(s);for(const c of So.values())o.addComponent(c);const a=new j_(n,r,o);return Ds.set(s,a),a}function Sd(t=yo){const e=Ds.get(t);if(!e&&t===yo&&fd())return yd();if(!e)throw fn.create("no-app",{appName:t});return e}function Et(t,e,n){let r=F_[t]??t;n&&(r+=`-${n}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Kt.warn(o.join(" "));return}zt(new Tt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const W_="firebase-heartbeat-database",G_=1,Vr="firebase-heartbeat-store";let Fi=null;function Id(){return Fi||(Fi=bd(W_,G_,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Vr)}catch(n){console.warn(n)}}}}).catch(t=>{throw fn.create("idb-open",{originalErrorMessage:t.message})})),Fi}async function K_(t){try{const n=(await Id()).transaction(Vr),r=await n.objectStore(Vr).get(wd(t));return await n.done,r}catch(e){if(e instanceof Rt)Kt.warn(e.message);else{const n=fn.create("idb-get",{originalErrorMessage:e?.message});Kt.warn(n.message)}}}async function kc(t,e){try{const r=(await Id()).transaction(Vr,"readwrite");await r.objectStore(Vr).put(e,wd(t)),await r.done}catch(n){if(n instanceof Rt)Kt.warn(n.message);else{const r=fn.create("idb-set",{originalErrorMessage:n?.message});Kt.warn(r.message)}}}function wd(t){return`${t.name}!${t.options.appId}`}/**
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
 */const z_=1024,q_=30;class J_{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new X_(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Dc();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>q_){const s=Q_(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Kt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Dc(),{heartbeatsToSend:n,unsentEntries:r}=Y_(this._heartbeatsCache.heartbeats),s=ud(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Kt.warn(e),""}}}function Dc(){return new Date().toISOString().substring(0,10)}function Y_(t,e=z_){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Oc(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Oc(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class X_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return gd()?md().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await K_(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return kc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return kc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Oc(t){return ud(JSON.stringify({version:2,heartbeats:t})).length}function Q_(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
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
 */function Z_(t){zt(new Tt("platform-logger",e=>new d_(e),"PRIVATE")),zt(new Tt("heartbeat",e=>new J_(e),"PRIVATE")),Et(bo,Rc,t),Et(bo,Rc,"esm2020"),Et("fire-js","")}Z_("");function Ed(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const ev=Ed,Cd=new Bn("auth","Firebase",Ed());/**
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
 */const Os=new ea("@firebase/auth");function tv(t,...e){Os.logLevel<=Se.WARN&&Os.warn(`Auth (${Yr}): ${t}`,...e)}function fs(t,...e){Os.logLevel<=Se.ERROR&&Os.error(`Auth (${Yr}): ${t}`,...e)}/**
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
 */function ft(t,...e){throw na(t,...e)}function Ct(t,...e){return na(t,...e)}function Ad(t,e,n){const r={...ev(),[e]:n};return new Bn("auth","Firebase",r).create(e,{appName:t.name})}function hn(t){return Ad(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function na(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Cd.create(t,...e)}function Y(t,e,...n){if(!t)throw na(e,...n)}function Ht(t){const e="INTERNAL ASSERTION FAILED: "+t;throw fs(e),new Error(e)}function qt(t,e){t||Ht(e)}/**
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
 */function Ns(){return typeof self<"u"&&self.location?.href||""}function nv(){return Nc()==="http:"||Nc()==="https:"}function Nc(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function rv(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(nv()||pd()||"connection"in navigator)?navigator.onLine:!0}function sv(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Xr{constructor(e,n){this.shortDelay=e,this.longDelay=n,qt(n>e,"Short delay should be less than long delay!"),this.isMobile=Dm()||Nm()}get(){return rv()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function ra(t,e){qt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class Td{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ht("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ht("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ht("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const iv={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const ov=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],av=new Xr(3e4,6e4);function bn(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Yt(t,e,n,r,s={}){return Rd(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const a=Jr({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...i};return Om()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&ci(t.emulatorConfig.host)&&(l.credentials="include"),Td.fetch()(await Pd(t,t.config.apiHost,n,a),l)})}async function Rd(t,e,n){t._canInitEmulator=!1;const r={...iv,...e};try{const s=new lv(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw os(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw os(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw os(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw os(t,"user-disabled",o);const u=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Ad(t,u,l);ft(t,u)}}catch(s){if(s instanceof Rt)throw s;ft(t,"network-request-failed",{message:String(s)})}}async function li(t,e,n,r,s={}){const i=await Yt(t,e,n,r,s);return"mfaPendingCredential"in i&&ft(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function Pd(t,e,n,r){const s=`${e}${n}?${r}`,i=t,o=i.config.emulator?ra(t.config,s):`${t.config.apiScheme}://${s}`;return ov.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function cv(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class lv{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Ct(this.auth,"network-request-failed")),av.get())})}}function os(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=Ct(t,e,r);return s.customData._tokenResponse=n,s}function xc(t){return t!==void 0&&t.enterprise!==void 0}class uv{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return cv(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function dv(t,e){return Yt(t,"GET","/v2/recaptchaConfig",bn(t,e))}/**
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
 */async function fv(t,e){return Yt(t,"POST","/v1/accounts:delete",e)}async function xs(t,e){return Yt(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function Dr(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function hv(t,e=!1){const n=ot(t),r=await n.getIdToken(e),s=ui(r);Y(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:Dr($i(s.auth_time)),issuedAtTime:Dr($i(s.iat)),expirationTime:Dr($i(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function $i(t){return Number(t)*1e3}function ui(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return fs("JWT malformed, contained fewer than 3 sections"),null;try{const s=dd(n);return s?JSON.parse(s):(fs("Failed to decode base64 JWT payload"),null)}catch(s){return fs("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Mc(t){const e=ui(t);return Y(e,"internal-error"),Y(typeof e.exp<"u","internal-error"),Y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function jr(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Rt&&pv(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function pv({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class gv{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Io{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Dr(this.lastLoginAt),this.creationTime=Dr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Ms(t){const e=t.auth,n=await t.getIdToken(),r=await jr(t,xs(e,{idToken:n}));Y(r?.users.length,e,"internal-error");const s=r.users[0];t._notifyReloadListener(s);const i=s.providerUserInfo?.length?kd(s.providerUserInfo):[],o=_v(t.providerData,i),a=t.isAnonymous,c=!(t.email&&s.passwordHash)&&!o?.length,l=a?c:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Io(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function mv(t){const e=ot(t);await Ms(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function _v(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function kd(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
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
 */async function vv(t,e){const n=await Rd(t,{},async()=>{const r=Jr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=await Pd(t,s,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:r};return t.emulatorConfig&&ci(t.emulatorConfig.host)&&(c.credentials="include"),Td.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function bv(t,e){return Yt(t,"POST","/v2/accounts:revokeToken",bn(t,e))}/**
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
 */class Xn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Y(e.idToken,"internal-error"),Y(typeof e.idToken<"u","internal-error"),Y(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Mc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){Y(e.length!==0,"internal-error");const n=Mc(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(Y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await vv(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new Xn;return r&&(Y(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(Y(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(Y(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Xn,this.toJSON())}_performRefresh(){return Ht("not implemented")}}/**
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
 */function Zt(t,e){Y(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class ct{constructor({uid:e,auth:n,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new gv(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Io(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await jr(this,this.stsTokenManager.getToken(this.auth,e));return Y(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return hv(this,e)}reload(){return mv(this)}_assign(e){this!==e&&(Y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new ct({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){Y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Ms(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(yt(this.auth.app))return Promise.reject(hn(this.auth));const e=await this.getIdToken();return await jr(this,fv(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,s=n.email??void 0,i=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:f,isAnonymous:g,providerData:_,stsTokenManager:b}=n;Y(d&&b,e,"internal-error");const R=Xn.fromJSON(this.name,b);Y(typeof d=="string",e,"internal-error"),Zt(r,e.name),Zt(s,e.name),Y(typeof f=="boolean",e,"internal-error"),Y(typeof g=="boolean",e,"internal-error"),Zt(i,e.name),Zt(o,e.name),Zt(a,e.name),Zt(c,e.name),Zt(l,e.name),Zt(u,e.name);const E=new ct({uid:d,auth:e,email:s,emailVerified:f,displayName:r,isAnonymous:g,photoURL:o,phoneNumber:i,tenantId:a,stsTokenManager:R,createdAt:l,lastLoginAt:u});return _&&Array.isArray(_)&&(E.providerData=_.map(C=>({...C}))),c&&(E._redirectEventId=c),E}static async _fromIdTokenResponse(e,n,r=!1){const s=new Xn;s.updateFromServerResponse(n);const i=new ct({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ms(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];Y(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?kd(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,a=new Xn;a.updateFromIdToken(r);const c=new ct({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Io(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(c,l),c}}/**
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
 */const Lc=new Map;function Ut(t){qt(t instanceof Function,"Expected a class definition");let e=Lc.get(t);return e?(qt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Lc.set(t,e),e)}/**
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
 */class Dd{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Dd.type="NONE";const Hc=Dd;/**
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
 */function hs(t,e,n){return`firebase:${t}:${e}:${n}`}class Qn{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=hs(this.userKey,s.apiKey,i),this.fullPersistenceKey=hs("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await xs(this.auth,{idToken:e}).catch(()=>{});return n?ct._fromGetAccountInfoResponse(this.auth,n,e):null}return ct._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Qn(Ut(Hc),e,r);const s=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=s[0]||Ut(Hc);const o=hs(r,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const f=await xs(e,{idToken:u}).catch(()=>{});if(!f)break;d=await ct._fromGetAccountInfoResponse(e,f,u)}else d=ct._fromJSON(e,u);l!==i&&(a=d),i=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new Qn(i,e,r):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new Qn(i,e,r))}}/**
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
 */function Uc(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Md(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Od(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Hd(e))return"Blackberry";if(Ud(e))return"Webos";if(Nd(e))return"Safari";if((e.includes("chrome/")||xd(e))&&!e.includes("edge/"))return"Chrome";if(Ld(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if(r?.length===2)return r[1]}return"Other"}function Od(t=Je()){return/firefox\//i.test(t)}function Nd(t=Je()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function xd(t=Je()){return/crios\//i.test(t)}function Md(t=Je()){return/iemobile/i.test(t)}function Ld(t=Je()){return/android/i.test(t)}function Hd(t=Je()){return/blackberry/i.test(t)}function Ud(t=Je()){return/webos/i.test(t)}function sa(t=Je()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function yv(t=Je()){return sa(t)&&!!window.navigator?.standalone}function Sv(){return xm()&&document.documentMode===10}function Bd(t=Je()){return sa(t)||Ld(t)||Ud(t)||Hd(t)||/windows phone/i.test(t)||Md(t)}/**
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
 */function Fd(t,e=[]){let n;switch(t){case"Browser":n=Uc(Je());break;case"Worker":n=`${Uc(Je())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Yr}/${r}`}/**
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
 */class Iv{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,a)=>{try{const c=e(i);o(c)}catch(c){a(c)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function wv(t,e={}){return Yt(t,"GET","/v2/passwordPolicy",bn(t,e))}/**
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
 */const Ev=6;class Cv{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??Ev,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class Av{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Bc(this),this.idTokenSubscription=new Bc(this),this.beforeStateQueue=new Iv(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Cd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Ut(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Qn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await xs(this,{idToken:e}),r=await ct._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(yt(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=r?._redirectEventId,a=await this.tryRedirectSignIn(e);(!i||i===o)&&a?.user&&(r=a.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return Y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Ms(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=sv()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(yt(this.app))return Promise.reject(hn(this));const n=e?ot(e):null;return n&&Y(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&Y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return yt(this.app)?Promise.reject(hn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return yt(this.app)?Promise.reject(hn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ut(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await wv(this),n=new Cv(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Bn("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await bv(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Ut(e)||this._popupRedirectResolver;Y(n,this,"argument-error"),this.redirectPersistenceManager=await Qn.create(this,[Ut(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(Y(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,r,s);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Fd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(yt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&tv(`Error while retrieving App Check token: ${e.error}`),e?.token}}function lr(t){return ot(t)}class Bc{constructor(e){this.auth=e,this.observer=null,this.addObserver=Fm(n=>this.observer=n)}get next(){return Y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let di={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Tv(t){di=t}function $d(t){return di.loadJS(t)}function Rv(){return di.recaptchaEnterpriseScript}function Pv(){return di.gapiScript}function kv(t){return`__${t}${Math.floor(Math.random()*1e6)}`}class Dv{constructor(){this.enterprise=new Ov}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class Ov{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const Nv="recaptcha-enterprise",Vd="NO_RECAPTCHA";class xv{constructor(e){this.type=Nv,this.auth=lr(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,a)=>{dv(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const l=new uv(c);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function s(i,o,a){const c=window.grecaptcha;xc(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:e}).then(l=>{o(l)}).catch(()=>{o(Vd)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Dv().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(a=>{if(!n&&xc(window.grecaptcha))s(a,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=Rv();c.length!==0&&(c+=a),$d(c).then(()=>{s(a,i,o)}).catch(l=>{o(l)})}}).catch(a=>{o(a)})})}}async function Fc(t,e,n,r=!1,s=!1){const i=new xv(t);let o;if(s)o=Vd;else try{o=await i.verify(n)}catch{o=await i.verify(n,!0)}const a={...e};if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in a){const c=a.phoneEnrollmentInfo.phoneNumber,l=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const c=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function wo(t,e,n,r,s){if(t._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Fc(t,e,n,n==="getOobCode");return r(t,i)}else return r(t,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Fc(t,e,n,n==="getOobCode");return r(t,o)}else return Promise.reject(i)})}/**
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
 */function Mv(t,e){const n=cr(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Nn(i,e??{}))return s;ft(s,"already-initialized")}return n.initialize({options:e})}function Lv(t,e){const n=e?.persistence||[],r=(Array.isArray(n)?n:[n]).map(Ut);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e?.popupRedirectResolver)}function Hv(t,e,n){const r=lr(t);Y(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=jd(e),{host:o,port:a}=Uv(e),c=a===null?"":`:${a}`,l={url:`${i}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){Y(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),Y(Nn(l,r.config.emulator)&&Nn(u,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=u,r.settings.appVerificationDisabledForTesting=!0,ci(o)?(Tm(`${i}//${o}${c}`),km("Auth",!0)):Bv()}function jd(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Uv(t){const e=jd(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:$c(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:$c(o)}}}function $c(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Bv(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class ia{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Ht("not implemented")}_getIdTokenResponse(e){return Ht("not implemented")}_linkToIdToken(e,n){return Ht("not implemented")}_getReauthenticationResolver(e){return Ht("not implemented")}}async function Fv(t,e){return Yt(t,"POST","/v1/accounts:signUp",e)}/**
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
 */async function $v(t,e){return li(t,"POST","/v1/accounts:signInWithPassword",bn(t,e))}async function Vv(t,e){return Yt(t,"POST","/v1/accounts:sendOobCode",bn(t,e))}async function jv(t,e){return Vv(t,e)}/**
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
 */async function Wv(t,e){return li(t,"POST","/v1/accounts:signInWithEmailLink",bn(t,e))}async function Gv(t,e){return li(t,"POST","/v1/accounts:signInWithEmailLink",bn(t,e))}/**
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
 */class Wr extends ia{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new Wr(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Wr(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n?.email&&n?.password){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return wo(e,n,"signInWithPassword",$v);case"emailLink":return Wv(e,{email:this._email,oobCode:this._password});default:ft(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return wo(e,r,"signUpPassword",Fv);case"emailLink":return Gv(e,{idToken:n,email:this._email,oobCode:this._password});default:ft(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Zn(t,e){return li(t,"POST","/v1/accounts:signInWithIdp",bn(t,e))}/**
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
 */const Kv="http://localhost";class xn extends ia{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new xn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):ft("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=n;if(!r||!s)return null;const o=new xn(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Zn(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Zn(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Zn(e,n)}buildRequest(){const e={requestUri:Kv,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Jr(n)}return e}}/**
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
 */function zv(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function qv(t){const e=vr(br(t)).link,n=e?vr(br(e)).deep_link_id:null,r=vr(br(t)).deep_link_id;return(r?vr(br(r)).link:null)||r||n||e||t}class fi{constructor(e){const n=vr(br(e)),r=n.apiKey??null,s=n.oobCode??null,i=zv(n.mode??null);Y(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=n.continueUrl??null,this.languageCode=n.lang??null,this.tenantId=n.tenantId??null}static parseLink(e){const n=qv(e);try{return new fi(n)}catch{return null}}}/**
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
 */class ur{constructor(){this.providerId=ur.PROVIDER_ID}static credential(e,n){return Wr._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=fi.parseLink(n);return Y(r,"argument-error"),Wr._fromEmailAndCode(e,r.code,r.tenantId)}}ur.PROVIDER_ID="password";ur.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ur.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Wd{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Qr extends Wd{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class sn extends Qr{constructor(){super("facebook.com")}static credential(e){return xn._fromParams({providerId:sn.PROVIDER_ID,signInMethod:sn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return sn.credentialFromTaggedObject(e)}static credentialFromError(e){return sn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return sn.credential(e.oauthAccessToken)}catch{return null}}}sn.FACEBOOK_SIGN_IN_METHOD="facebook.com";sn.PROVIDER_ID="facebook.com";/**
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
 */class on extends Qr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return xn._fromParams({providerId:on.PROVIDER_ID,signInMethod:on.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return on.credentialFromTaggedObject(e)}static credentialFromError(e){return on.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return on.credential(n,r)}catch{return null}}}on.GOOGLE_SIGN_IN_METHOD="google.com";on.PROVIDER_ID="google.com";/**
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
 */class an extends Qr{constructor(){super("github.com")}static credential(e){return xn._fromParams({providerId:an.PROVIDER_ID,signInMethod:an.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return an.credentialFromTaggedObject(e)}static credentialFromError(e){return an.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return an.credential(e.oauthAccessToken)}catch{return null}}}an.GITHUB_SIGN_IN_METHOD="github.com";an.PROVIDER_ID="github.com";/**
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
 */class cn extends Qr{constructor(){super("twitter.com")}static credential(e,n){return xn._fromParams({providerId:cn.PROVIDER_ID,signInMethod:cn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return cn.credentialFromTaggedObject(e)}static credentialFromError(e){return cn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return cn.credential(n,r)}catch{return null}}}cn.TWITTER_SIGN_IN_METHOD="twitter.com";cn.PROVIDER_ID="twitter.com";/**
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
 */class ir{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await ct._fromIdTokenResponse(e,r,s),o=Vc(r);return new ir({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Vc(r);return new ir({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Vc(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class Ls extends Rt{constructor(e,n,r,s){super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Ls.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Ls(e,n,r,s)}}function Gd(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ls._fromErrorAndOperation(t,i,e,r):i})}async function Jv(t,e,n=!1){const r=await jr(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return ir._forOperation(t,"link",r)}/**
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
 */async function Yv(t,e,n=!1){const{auth:r}=t;if(yt(r.app))return Promise.reject(hn(r));const s="reauthenticate";try{const i=await jr(t,Gd(r,s,e,t),n);Y(i.idToken,r,"internal-error");const o=ui(i.idToken);Y(o,r,"internal-error");const{sub:a}=o;return Y(t.uid===a,r,"user-mismatch"),ir._forOperation(t,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&ft(r,"user-mismatch"),i}}/**
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
 */async function Kd(t,e,n=!1){if(yt(t.app))return Promise.reject(hn(t));const r="signIn",s=await Gd(t,r,e),i=await ir._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function Xv(t,e){return Kd(lr(t),e)}/**
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
 */function Qv(t,e,n){Y(n.url?.length>0,t,"invalid-continue-uri"),Y(typeof n.dynamicLinkDomain>"u"||n.dynamicLinkDomain.length>0,t,"invalid-dynamic-link-domain"),Y(typeof n.linkDomain>"u"||n.linkDomain.length>0,t,"invalid-hosting-link-domain"),e.continueUrl=n.url,e.dynamicLinkDomain=n.dynamicLinkDomain,e.linkDomain=n.linkDomain,e.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(Y(n.iOS.bundleId.length>0,t,"missing-ios-bundle-id"),e.iOSBundleId=n.iOS.bundleId),n.android&&(Y(n.android.packageName.length>0,t,"missing-android-pkg-name"),e.androidInstallApp=n.android.installApp,e.androidMinimumVersionCode=n.android.minimumVersion,e.androidPackageName=n.android.packageName)}/**
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
 */async function Zv(t,e,n){const r=lr(t),s={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function i(o,a){Y(a.handleCodeInApp,r,"argument-error"),a&&Qv(r,o,a)}i(s,n),await wo(r,s,"getOobCode",jv)}function eb(t,e){return fi.parseLink(e)?.operation==="EMAIL_SIGNIN"}async function tb(t,e,n){if(yt(t.app))return Promise.reject(hn(t));const r=ot(t),s=ur.credentialWithLink(e,n||Ns());return Y(s._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),Xv(r,s)}/**
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
 */function nb(t){if(!t)return null;const{providerId:e}=t,n=t.rawUserInfo?JSON.parse(t.rawUserInfo):{},r=t.isNewUser||t.kind==="identitytoolkit#SignupNewUserResponse";if(!e&&t?.idToken){const s=ui(t.idToken)?.firebase?.sign_in_provider;if(s){const i=s!=="anonymous"&&s!=="custom"?s:null;return new er(r,i)}}if(!e)return null;switch(e){case"facebook.com":return new rb(r,n);case"github.com":return new sb(r,n);case"google.com":return new ib(r,n);case"twitter.com":return new ob(r,n,t.screenName||null);case"custom":case"anonymous":return new er(r,null);default:return new er(r,e,n)}}class er{constructor(e,n,r={}){this.isNewUser=e,this.providerId=n,this.profile=r}}class zd extends er{constructor(e,n,r,s){super(e,n,r),this.username=s}}class rb extends er{constructor(e,n){super(e,"facebook.com",n)}}class sb extends zd{constructor(e,n){super(e,"github.com",n,typeof n?.login=="string"?n?.login:null)}}class ib extends er{constructor(e,n){super(e,"google.com",n)}}class ob extends zd{constructor(e,n,r){super(e,"twitter.com",n,r)}}function ab(t){const{user:e,_tokenResponse:n}=t;return e.isAnonymous&&!n?{providerId:null,isNewUser:!1,profile:null}:nb(n)}function cb(t,e,n,r){return ot(t).onIdTokenChanged(e,n,r)}function lb(t,e,n){return ot(t).beforeAuthStateChanged(e,n)}function ub(t,e,n,r){return ot(t).onAuthStateChanged(e,n,r)}function db(t){return ot(t).signOut()}const Hs="__sak";/**
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
 */class qd{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Hs,"1"),this.storage.removeItem(Hs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const fb=1e3,hb=10;class Jd extends qd{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Bd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);Sv()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,hb):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},fb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Jd.type="LOCAL";const pb=Jd;/**
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
 */class Yd extends qd{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Yd.type="SESSION";const Xd=Yd;/**
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
 */function gb(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class hi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new hi(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const a=Array.from(o).map(async l=>l(n.origin,i)),c=await gb(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}hi.receivers=[];/**
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
 */function oa(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class mb{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const l=oa("",20);s.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(d){const f=d;if(f.data.eventId===l)switch(f.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(f.data.response);break;default:clearTimeout(u),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function At(){return window}function _b(t){At().location.href=t}/**
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
 */function Qd(){return typeof At().WorkerGlobalScope<"u"&&typeof At().importScripts=="function"}async function vb(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function bb(){return navigator?.serviceWorker?.controller||null}function yb(){return Qd()?self:null}/**
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
 */const Zd="firebaseLocalStorageDb",Sb=1,Us="firebaseLocalStorage",ef="fbase_key";class Zr{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function pi(t,e){return t.transaction([Us],e?"readwrite":"readonly").objectStore(Us)}function Ib(){const t=indexedDB.deleteDatabase(Zd);return new Zr(t).toPromise()}function Eo(){const t=indexedDB.open(Zd,Sb);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Us,{keyPath:ef})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Us)?e(r):(r.close(),await Ib(),e(await Eo()))})})}async function jc(t,e,n){const r=pi(t,!0).put({[ef]:e,value:n});return new Zr(r).toPromise()}async function wb(t,e){const n=pi(t,!1).get(e),r=await new Zr(n).toPromise();return r===void 0?null:r.value}function Wc(t,e){const n=pi(t,!0).delete(e);return new Zr(n).toPromise()}const Eb=800,Cb=3;class tf{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Eo(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Cb)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Qd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=hi._getInstance(yb()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await vb(),!this.activeServiceWorker)return;this.sender=new mb(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||bb()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Eo();return await jc(e,Hs,"1"),await Wc(e,Hs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>jc(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>wb(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Wc(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=pi(s,!1).getAll();return new Zr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Eb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}tf.type="LOCAL";const Ab=tf;new Xr(3e4,6e4);/**
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
 */function Tb(t,e){return e?Ut(e):(Y(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class aa extends ia{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Zn(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Zn(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Zn(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Rb(t){return Kd(t.auth,new aa(t),t.bypassAuthState)}function Pb(t){const{auth:e,user:n}=t;return Y(n,e,"internal-error"),Yv(n,new aa(t),t.bypassAuthState)}async function kb(t){const{auth:e,user:n}=t;return Y(n,e,"internal-error"),Jv(n,new aa(t),t.bypassAuthState)}/**
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
 */class nf{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Rb;case"linkViaPopup":case"linkViaRedirect":return kb;case"reauthViaPopup":case"reauthViaRedirect":return Pb;default:ft(this.auth,"internal-error")}}resolve(e){qt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){qt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Db=new Xr(2e3,1e4);class Kn extends nf{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Kn.currentPopupAction&&Kn.currentPopupAction.cancel(),Kn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Y(e,this.auth,"internal-error"),e}async onExecution(){qt(this.filter.length===1,"Popup operations only handle one event");const e=oa();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Ct(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Ct(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Kn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ct(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Db.get())};e()}}Kn.currentPopupAction=null;/**
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
 */const Ob="pendingRedirect",ps=new Map;class Nb extends nf{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=ps.get(this.auth._key());if(!e){try{const r=await xb(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}ps.set(this.auth._key(),e)}return this.bypassAuthState||ps.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function xb(t,e){const n=Hb(e),r=Lb(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function Mb(t,e){ps.set(t._key(),e)}function Lb(t){return Ut(t._redirectPersistence)}function Hb(t){return hs(Ob,t.config.apiKey,t.name)}async function Ub(t,e,n=!1){if(yt(t.app))return Promise.reject(hn(t));const r=lr(t),s=Tb(r,e),o=await new Nb(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const Bb=600*1e3;class Fb{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!$b(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!rf(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";n.onError(Ct(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Bb&&this.cachedEventUids.clear(),this.cachedEventUids.has(Gc(e))}saveEventToCache(e){this.cachedEventUids.add(Gc(e)),this.lastProcessedEventTime=Date.now()}}function Gc(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function rf({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function $b(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return rf(t);default:return!1}}/**
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
 */async function Vb(t,e={}){return Yt(t,"GET","/v1/projects",e)}/**
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
 */const jb=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Wb=/^https?/;async function Gb(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Vb(t);for(const n of e)try{if(Kb(n))return}catch{}ft(t,"unauthorized-domain")}function Kb(t){const e=Ns(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!Wb.test(n))return!1;if(jb.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const zb=new Xr(3e4,6e4);function Kc(){const t=At().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function qb(t){return new Promise((e,n)=>{function r(){Kc(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Kc(),n(Ct(t,"network-request-failed"))},timeout:zb.get()})}if(At().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(At().gapi?.load)r();else{const s=kv("iframefcb");return At()[s]=()=>{gapi.load?r():n(Ct(t,"network-request-failed"))},$d(`${Pv()}?onload=${s}`).catch(i=>n(i))}}).catch(e=>{throw gs=null,e})}let gs=null;function Jb(t){return gs=gs||qb(t),gs}/**
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
 */const Yb=new Xr(5e3,15e3),Xb="__/auth/iframe",Qb="emulator/auth/iframe",Zb={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ey=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function ty(t){const e=t.config;Y(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?ra(e,Qb):`https://${t.config.authDomain}/${Xb}`,r={apiKey:e.apiKey,appName:t.name,v:Yr},s=ey.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${Jr(r).slice(1)}`}async function ny(t){const e=await Jb(t),n=At().gapi;return Y(n,t,"internal-error"),e.open({where:document.body,url:ty(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Zb,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Ct(t,"network-request-failed"),a=At().setTimeout(()=>{i(o)},Yb.get());function c(){At().clearTimeout(a),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
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
 */const ry={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},sy=500,iy=600,oy="_blank",ay="http://localhost";class zc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function cy(t,e,n,r=sy,s=iy){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c={...ry,width:r.toString(),height:s.toString(),top:i,left:o},l=Je().toLowerCase();n&&(a=xd(l)?oy:n),Od(l)&&(e=e||ay,c.scrollbars="yes");const u=Object.entries(c).reduce((f,[g,_])=>`${f}${g}=${_},`,"");if(yv(l)&&a!=="_self")return ly(e||"",a),new zc(null);const d=window.open(e||"",a,u);Y(d,t,"popup-blocked");try{d.focus()}catch{}return new zc(d)}function ly(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const uy="__/auth/handler",dy="emulator/auth/handler",fy=encodeURIComponent("fac");async function qc(t,e,n,r,s,i){Y(t.config.authDomain,t,"auth-domain-config-required"),Y(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Yr,eventId:s};if(e instanceof Wd){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Bm(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof Qr){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${fy}=${encodeURIComponent(c)}`:"";return`${hy(t)}?${Jr(a).slice(1)}${l}`}function hy({config:t}){return t.emulator?ra(t,dy):`https://${t.authDomain}/${uy}`}/**
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
 */const Vi="webStorageSupport";class py{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Xd,this._completeRedirectFn=Ub,this._overrideRedirectResult=Mb}async _openPopup(e,n,r,s){qt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await qc(e,n,r,Ns(),s);return cy(e,i,oa())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await qc(e,n,r,Ns(),s);return _b(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(qt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await ny(e),r=new Fb(e);return n.register("authEvent",s=>(Y(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Vi,{type:Vi},s=>{const i=s?.[0]?.[Vi];i!==void 0&&n(!!i),ft(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Gb(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Bd()||Nd()||sa()}}const gy=py;var Jc="@firebase/auth",Yc="1.12.0";/**
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
 */class my{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){Y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function _y(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function vy(t){zt(new Tt("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;Y(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Fd(t)},l=new Av(r,s,i,c);return Lv(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),zt(new Tt("auth-internal",e=>{const n=lr(e.getProvider("auth").getImmediate());return(r=>new my(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Et(Jc,Yc,_y(t)),Et(Jc,Yc,"esm2020")}/**
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
 */const by=300,yy=hd("authIdTokenMaxAge")||by;let Xc=null;const Sy=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>yy)return;const s=n?.token;Xc!==s&&(Xc=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Co(t=Sd()){const e=cr(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Mv(t,{popupRedirectResolver:gy,persistence:[Ab,pb,Xd]}),r=hd("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=Sy(i.toString());lb(n,o,()=>o(n.currentUser)),cb(n,a=>o(a))}}const s=Cm("auth");return s&&Hv(n,`http://${s}`),n}function Iy(){return document.getElementsByTagName("head")?.[0]??document}Tv({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=Ct("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",Iy().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});vy("Browser");var wy="firebase",Ey="12.7.0";/**
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
 */Et(wy,Ey,"app");const sf="@firebase/installations",ca="0.6.19";/**
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
 */const of=1e4,af=`w:${ca}`,cf="FIS_v2",Cy="https://firebaseinstallations.googleapis.com/v1",Ay=3600*1e3,Ty="installations",Ry="Installations";/**
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
 */const Py={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Mn=new Bn(Ty,Ry,Py);function lf(t){return t instanceof Rt&&t.code.includes("request-failed")}/**
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
 */function uf({projectId:t}){return`${Cy}/projects/${t}/installations`}function df(t){return{token:t.token,requestStatus:2,expiresIn:Dy(t.expiresIn),creationTime:Date.now()}}async function ff(t,e){const r=(await e.json()).error;return Mn.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function hf({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function ky(t,{refreshToken:e}){const n=hf(t);return n.append("Authorization",Oy(e)),n}async function pf(t){const e=await t();return e.status>=500&&e.status<600?t():e}function Dy(t){return Number(t.replace("s","000"))}function Oy(t){return`${cf} ${t}`}/**
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
 */async function Ny({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=uf(t),s=hf(t),i=e.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={fid:n,authVersion:cf,appId:t.appId,sdkVersion:af},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await pf(()=>fetch(r,a));if(c.ok){const l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:df(l.authToken)}}else throw await ff("Create Installation",c)}/**
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
 */function gf(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function xy(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const My=/^[cdef][\w-]{21}$/,Ao="";function Ly(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=Hy(t);return My.test(n)?n:Ao}catch{return Ao}}function Hy(t){return xy(t).substr(0,22)}/**
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
 */function gi(t){return`${t.appName}!${t.appId}`}/**
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
 */const mf=new Map;function _f(t,e){const n=gi(t);vf(n,e),Uy(n,e)}function vf(t,e){const n=mf.get(t);if(n)for(const r of n)r(e)}function Uy(t,e){const n=By();n&&n.postMessage({key:t,fid:e}),Fy()}let Rn=null;function By(){return!Rn&&"BroadcastChannel"in self&&(Rn=new BroadcastChannel("[Firebase] FID Change"),Rn.onmessage=t=>{vf(t.data.key,t.data.fid)}),Rn}function Fy(){mf.size===0&&Rn&&(Rn.close(),Rn=null)}/**
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
 */const $y="firebase-installations-database",Vy=1,Ln="firebase-installations-store";let ji=null;function la(){return ji||(ji=bd($y,Vy,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Ln)}}})),ji}async function Bs(t,e){const n=gi(t),s=(await la()).transaction(Ln,"readwrite"),i=s.objectStore(Ln),o=await i.get(n);return await i.put(e,n),await s.done,(!o||o.fid!==e.fid)&&_f(t,e.fid),e}async function bf(t){const e=gi(t),r=(await la()).transaction(Ln,"readwrite");await r.objectStore(Ln).delete(e),await r.done}async function mi(t,e){const n=gi(t),s=(await la()).transaction(Ln,"readwrite"),i=s.objectStore(Ln),o=await i.get(n),a=e(o);return a===void 0?await i.delete(n):await i.put(a,n),await s.done,a&&(!o||o.fid!==a.fid)&&_f(t,a.fid),a}/**
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
 */async function ua(t){let e;const n=await mi(t.appConfig,r=>{const s=jy(r),i=Wy(t,s);return e=i.registrationPromise,i.installationEntry});return n.fid===Ao?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function jy(t){const e=t||{fid:Ly(),registrationStatus:0};return yf(e)}function Wy(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Mn.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=Gy(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Ky(t)}:{installationEntry:e}}async function Gy(t,e){try{const n=await Ny(t,e);return Bs(t.appConfig,n)}catch(n){throw lf(n)&&n.customData.serverCode===409?await bf(t.appConfig):await Bs(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function Ky(t){let e=await Qc(t.appConfig);for(;e.registrationStatus===1;)await gf(100),e=await Qc(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await ua(t);return r||n}return e}function Qc(t){return mi(t,e=>{if(!e)throw Mn.create("installation-not-found");return yf(e)})}function yf(t){return zy(t)?{fid:t.fid,registrationStatus:0}:t}function zy(t){return t.registrationStatus===1&&t.registrationTime+of<Date.now()}/**
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
 */async function qy({appConfig:t,heartbeatServiceProvider:e},n){const r=Jy(t,n),s=ky(t,n),i=e.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={installation:{sdkVersion:af,appId:t.appId}},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await pf(()=>fetch(r,a));if(c.ok){const l=await c.json();return df(l)}else throw await ff("Generate Auth Token",c)}function Jy(t,{fid:e}){return`${uf(t)}/${e}/authTokens:generate`}/**
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
 */async function da(t,e=!1){let n;const r=await mi(t.appConfig,i=>{if(!Sf(i))throw Mn.create("not-registered");const o=i.authToken;if(!e&&Qy(o))return i;if(o.requestStatus===1)return n=Yy(t,e),i;{if(!navigator.onLine)throw Mn.create("app-offline");const a=eS(i);return n=Xy(t,a),a}});return n?await n:r.authToken}async function Yy(t,e){let n=await Zc(t.appConfig);for(;n.authToken.requestStatus===1;)await gf(100),n=await Zc(t.appConfig);const r=n.authToken;return r.requestStatus===0?da(t,e):r}function Zc(t){return mi(t,e=>{if(!Sf(e))throw Mn.create("not-registered");const n=e.authToken;return tS(n)?{...e,authToken:{requestStatus:0}}:e})}async function Xy(t,e){try{const n=await qy(t,e),r={...e,authToken:n};return await Bs(t.appConfig,r),n}catch(n){if(lf(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await bf(t.appConfig);else{const r={...e,authToken:{requestStatus:0}};await Bs(t.appConfig,r)}throw n}}function Sf(t){return t!==void 0&&t.registrationStatus===2}function Qy(t){return t.requestStatus===2&&!Zy(t)}function Zy(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+Ay}function eS(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function tS(t){return t.requestStatus===1&&t.requestTime+of<Date.now()}/**
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
 */async function nS(t){const e=t,{installationEntry:n,registrationPromise:r}=await ua(e);return r?r.catch(console.error):da(e).catch(console.error),n.fid}/**
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
 */async function rS(t,e=!1){const n=t;return await sS(n),(await da(n,e)).token}async function sS(t){const{registrationPromise:e}=await ua(t);e&&await e}/**
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
 */function iS(t){if(!t||!t.options)throw Wi("App Configuration");if(!t.name)throw Wi("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Wi(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Wi(t){return Mn.create("missing-app-config-values",{valueName:t})}/**
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
 */const If="installations",oS="installations-internal",aS=t=>{const e=t.getProvider("app").getImmediate(),n=iS(e),r=cr(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},cS=t=>{const e=t.getProvider("app").getImmediate(),n=cr(e,If).getImmediate();return{getId:()=>nS(n),getToken:s=>rS(n,s)}};function lS(){zt(new Tt(If,aS,"PUBLIC")),zt(new Tt(oS,cS,"PRIVATE"))}lS();Et(sf,ca);Et(sf,ca,"esm2020");/**
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
 */const Fs="analytics",uS="firebase_id",dS="origin",fS=60*1e3,hS="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",fa="https://www.googletagmanager.com/gtag/js";/**
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
 */const qe=new ea("@firebase/analytics");/**
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
 */const pS={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},nt=new Bn("analytics","Analytics",pS);/**
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
 */function gS(t){if(!t.startsWith(fa)){const e=nt.create("invalid-gtag-resource",{gtagURL:t});return qe.warn(e.message),""}return t}function wf(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function mS(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function _S(t,e){const n=mS("firebase-js-sdk-policy",{createScriptURL:gS}),r=document.createElement("script"),s=`${fa}?l=${t}&id=${e}`;r.src=n?n?.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function vS(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function bS(t,e,n,r,s,i){const o=r[s];try{if(o)await e[o];else{const c=(await wf(n)).find(l=>l.measurementId===s);c&&await e[c.appId]}}catch(a){qe.error(a)}t("config",s,i)}async function yS(t,e,n,r,s){try{let i=[];if(s&&s.send_to){let o=s.send_to;Array.isArray(o)||(o=[o]);const a=await wf(n);for(const c of o){const l=a.find(d=>d.measurementId===c),u=l&&e[l.appId];if(u)i.push(u);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),t("event",r,s||{})}catch(i){qe.error(i)}}function SS(t,e,n,r){async function s(i,...o){try{if(i==="event"){const[a,c]=o;await yS(t,e,n,a,c)}else if(i==="config"){const[a,c]=o;await bS(t,e,n,r,a,c)}else if(i==="consent"){const[a,c]=o;t("consent",a,c)}else if(i==="get"){const[a,c,l]=o;t("get",a,c,l)}else if(i==="set"){const[a]=o;t("set",a)}else t(i,...o)}catch(a){qe.error(a)}}return s}function IS(t,e,n,r,s){let i=function(...o){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(i=window[s]),window[s]=SS(i,t,e,n),{gtagCore:i,wrappedGtag:window[s]}}function wS(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(fa)&&n.src.includes(t))return n;return null}/**
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
 */const ES=30,CS=1e3;class AS{constructor(e={},n=CS){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Ef=new AS;function TS(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function RS(t){const{appId:e,apiKey:n}=t,r={method:"GET",headers:TS(n)},s=hS.replace("{app-id}",e),i=await fetch(s,r);if(i.status!==200&&i.status!==304){let o="";try{const a=await i.json();a.error?.message&&(o=a.error.message)}catch{}throw nt.create("config-fetch-failed",{httpStatus:i.status,responseMessage:o})}return i.json()}async function PS(t,e=Ef,n){const{appId:r,apiKey:s,measurementId:i}=t.options;if(!r)throw nt.create("no-app-id");if(!s){if(i)return{measurementId:i,appId:r};throw nt.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new OS;return setTimeout(async()=>{a.abort()},fS),Cf({appId:r,apiKey:s,measurementId:i},o,a,e)}async function Cf(t,{throttleEndTimeMillis:e,backoffCount:n},r,s=Ef){const{appId:i,measurementId:o}=t;try{await kS(r,e)}catch(a){if(o)return qe.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${a?.message}]`),{appId:i,measurementId:o};throw a}try{const a=await RS(t);return s.deleteThrottleMetadata(i),a}catch(a){const c=a;if(!DS(c)){if(s.deleteThrottleMetadata(i),o)return qe.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${c?.message}]`),{appId:i,measurementId:o};throw a}const l=Number(c?.customData?.httpStatus)===503?Ec(n,s.intervalMillis,ES):Ec(n,s.intervalMillis),u={throttleEndTimeMillis:Date.now()+l,backoffCount:n+1};return s.setThrottleMetadata(i,u),qe.debug(`Calling attemptFetch again in ${l} millis`),Cf(t,u,r,s)}}function kS(t,e){return new Promise((n,r)=>{const s=Math.max(e-Date.now(),0),i=setTimeout(n,s);t.addEventListener(()=>{clearTimeout(i),r(nt.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function DS(t){if(!(t instanceof Rt)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class OS{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function NS(t,e,n,r,s){if(s&&s.global){t("event",n,r);return}else{const i=await e,o={...r,send_to:i};t("event",n,o)}}async function xS(t,e,n,r){if(r&&r.global){const s={};for(const i of Object.keys(n))s[`user_properties.${i}`]=n[i];return t("set",s),Promise.resolve()}else{const s=await e;t("config",s,{update:!0,user_properties:n})}}/**
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
 */async function MS(){if(gd())try{await md()}catch(t){return qe.warn(nt.create("indexeddb-unavailable",{errorInfo:t?.toString()}).message),!1}else return qe.warn(nt.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function LS(t,e,n,r,s,i,o){const a=PS(t);a.then(f=>{n[f.measurementId]=f.appId,t.options.measurementId&&f.measurementId!==t.options.measurementId&&qe.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${f.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(f=>qe.error(f)),e.push(a);const c=MS().then(f=>{if(f)return r.getId()}),[l,u]=await Promise.all([a,c]);wS(i)||_S(i,l.measurementId),s("js",new Date);const d=o?.config??{};return d[dS]="firebase",d.update=!0,u!=null&&(d[uS]=u),s("config",l.measurementId,d),l.measurementId}/**
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
 */class HS{constructor(e){this.app=e}_delete(){return delete tr[this.app.options.appId],Promise.resolve()}}let tr={},el=[];const tl={};let Gi="dataLayer",US="gtag",nl,ha,rl=!1;function BS(){const t=[];if(pd()&&t.push("This is a browser extension environment."),Mm()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,s)=>`(${s+1}) ${r}`).join(" "),n=nt.create("invalid-analytics-context",{errorInfo:e});qe.warn(n.message)}}function FS(t,e,n){BS();const r=t.options.appId;if(!r)throw nt.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)qe.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw nt.create("no-api-key");if(tr[r]!=null)throw nt.create("already-exists",{id:r});if(!rl){vS(Gi);const{wrappedGtag:i,gtagCore:o}=IS(tr,el,tl,Gi,US);ha=i,nl=o,rl=!0}return tr[r]=LS(t,el,tl,e,nl,Gi,n),new HS(t)}function $S(t=Sd()){t=ot(t);const e=cr(t,Fs);return e.isInitialized()?e.getImmediate():VS(t)}function VS(t,e={}){const n=cr(t,Fs);if(n.isInitialized()){const s=n.getImmediate();if(Nn(e,n.getOptions()))return s;throw nt.create("already-initialized")}return n.initialize({options:e})}function jS(t,e,n){t=ot(t),xS(ha,tr[t.app.options.appId],e,n).catch(r=>qe.error(r))}function WS(t,e,n,r){t=ot(t),NS(ha,tr[t.app.options.appId],e,n,r).catch(s=>qe.error(s))}const sl="@firebase/analytics",il="0.10.19";function GS(){zt(new Tt(Fs,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return FS(r,s,n)},"PUBLIC")),zt(new Tt("analytics-internal",t,"PRIVATE")),Et(sl,il),Et(sl,il,"esm2020");function t(e){try{const n=e.getProvider(Fs).getImmediate();return{logEvent:(r,s,i)=>WS(n,r,s,i),setUserProperties:(r,s)=>jS(n,r,s)}}catch(n){throw nt.create("interop-component-reg-failed",{reason:n})}}}GS();const pa=.6,Af=1.1,KS={apiKey:"AIzaSyA07rmFYxIPgf5ZicE6tLnT0g7otsntVAI",authDomain:"blackjack-19729.firebaseapp.com",projectId:"blackjack-19729",storageBucket:"blackjack-19729.firebasestorage.app",messagingSenderId:"695301861998",appId:"1:695301861998:web:158fd8368aaac069c52c7f",measurementId:"G-BNTT6670HE"},Or="User_Email",zS=yd(KS);$S(zS);const qS={url:"https://www.github.io/bjk/finishSignUp",handleCodeInApp:!0},JS={class:"auth-shell"},YS=["disabled"],XS={key:1,class:"auth-current"},QS={class:"auth-current__text"},ZS={key:2,class:"auth-form__status"},eI={key:3,class:"auth-form__error"},tI=Be({__name:"Auth",setup(t){const e=be(window.localStorage.getItem(Or)??""),n=be(!1),r=be(""),s=be(""),i=be(null),o=Co();ei(()=>{ub(o,l=>{i.value=l})});const a=async()=>{s.value="",r.value="";const l=e.value.trim();if(!l){s.value="Enter an email to continue.";return}n.value=!0;try{await Zv(o,l,qS),window.localStorage.setItem(Or,l),r.value=`Sign-in link sent to ${l}`}catch(u){console.error("Error sending sign-in link:",u),s.value="Unable to send link. Please try again."}finally{n.value=!1}},c=async()=>{try{await db(o),r.value="Signed out."}catch(l){console.error("Failed to sign out",l),s.value="Unable to sign out. Please retry."}};return(l,u)=>(Z(),ce("section",JS,[i.value?(Z(),ce("div",XS,[ie("p",QS,[u[2]||(u[2]=ri("Signed in as: ",-1)),ie("strong",null,ze(i.value?.email),1)]),ie("button",{class:"auth-form__submit",type:"button",onClick:c},"Log Out")])):(Z(),ce("form",{key:0,class:"auth-form",onSubmit:Zp(a,["prevent"])},[u[1]||(u[1]=ie("label",{for:"email-input",class:"auth-form__label"},"Email",-1)),uu(ie("input",{"onUpdate:modelValue":u[0]||(u[0]=d=>e.value=d),type:"email",id:"email-input",class:"auth-form__input",placeholder:"you@example.com",autocomplete:"email",required:""},null,512),[[Yp,e.value]]),ie("button",{class:"auth-form__submit",type:"submit",disabled:n.value},ze(n.value?"Sending...":"Send Sign-In Link"),9,YS)],32)),r.value?(Z(),ce("p",ZS,ze(r.value),1)):Le("",!0),s.value?(Z(),ce("p",eI,ze(s.value),1)):Le("",!0)]))}}),Qe=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},nI=Qe(tI,[["__scopeId","data-v-07eb179b"]]),rI=["aria-expanded"],sI={key:0,class:"profile-menu__panel",role:"dialog","aria-label":"Profile menu"},iI=Be({__name:"ProfileMenu",setup(t){const e=be(!1),n=r=>{e.value=r};return(r,s)=>(Z(),ce("div",{class:"profile-menu",onMouseenter:s[0]||(s[0]=i=>n(!0)),onMouseleave:s[1]||(s[1]=i=>n(!1))},[ie("button",{class:"profile-menu__button",type:"button","aria-haspopup":"true","aria-expanded":e.value?"true":"false"},[...s[2]||(s[2]=[ie("svg",{class:"profile-menu__icon",viewBox:"0 0 24 24",role:"img","aria-label":"Profile"},[ie("circle",{cx:"12",cy:"8",r:"4"}),ie("path",{d:"M4 20c0-3.3137 3.134-6 8-6s8 2.6863 8 6"})],-1)])],8,rI),e.value?(Z(),ce("div",sI,[Pe(nI)])):Le("",!0)],32))}}),oI=Qe(iI,[["__scopeId","data-v-c1f0909d"]]),Ki="/bjk/flag-wave.gif",zi="/bjk/bjWin.gif",aI=["aria-label"],qi=64,Ji=64,as=1,ol=14,al=4,cI=Be({__name:"PlayingCard",props:{suit:{},rank:{},large:{type:Boolean}},setup(t){const e=ol*qi+(ol-1)*as,n=al*Ji+(al-1)*as,r={row:1,column:13},s=["A","2","3","4","5","6","7","8","9","10","J","Q","K"],i=["hearts","diamonds","clubs","spades"],o={A:"A",ACE:"A",1:"A","01":"A","02":"2",2:"2",TWO:"2","03":"3",3:"3",THREE:"3","04":"4",4:"4",FOUR:"4","05":"5",5:"5",FIVE:"5","06":"6",6:"6",SIX:"6","07":"7",7:"7",SEVEN:"7","08":"8",8:"8",EIGHT:"8","09":"9",9:"9",NINE:"9",10:"10",T:"10",TEN:"10",J:"J",JACK:"J",Q:"Q",QUEEN:"Q",K:"K",KING:"K"},a={HEARTS:"hearts",HEART:"hearts",H:"hearts",DIAMONDS:"diamonds",DIAMOND:"diamonds",D:"diamonds",CLUBS:"clubs",CLUB:"clubs",C:"clubs",SPADES:"spades",SPADE:"spades",S:"spades"},c=t,l=W(()=>c.large?Af:pa),u=W(()=>{if(c.rank===void 0||c.rank===null)return null;const R=`${c.rank}`.trim().toUpperCase();return o[R]??null}),d=W(()=>{if(!c.suit)return null;const R=c.suit.trim().toUpperCase();return a[R]??null}),f=W(()=>{const R=u.value,E=d.value;if(!R||!E)return r;const C=s.indexOf(R),k=i.indexOf(E);return C===-1||k===-1?r:{row:k,column:C}}),g=new URL("/bjk/kenney_playing-cards-pack/Tilesheet/cardsLarge_tilemap.png",import.meta.url).href,_=W(()=>{const{row:R,column:E}=f.value,C=-E*(qi+as),k=-R*(Ji+as),I=l.value;return{width:`${qi*I}px`,height:`${Ji*I}px`,backgroundImage:`url(${g})`,backgroundPosition:`${C*I}px ${k*I}px`,backgroundSize:`${e*I}px ${n*I}px`}}),b=W(()=>{const R=u.value,E=d.value;return!R||!E?"Card back":`${R} of ${E}`});return(R,E)=>(Z(),ce("div",{class:"playing-card",style:jt(_.value),role:"img","aria-label":b.value},null,12,aI))}}),lI=Qe(cI,[["__scopeId","data-v-72c1efd8"]]),uI=46,dI=64,cl=13,fI=220,ll=320,hI=Be({__name:"CardHand",props:{cards:{},maxWidth:{},large:{type:Boolean}},setup(t){const e=t,n=W(()=>e.large?Af:pa),r=W(()=>uI*n.value),s=W(()=>dI*n.value),i=W(()=>r.value+(cl-1)*(r.value/4)),o=W(()=>e.maxWidth??i.value),a=W(()=>e.large??!1),c=W(()=>e.cards.slice(0,cl)),l=be([]),u=W(()=>l.value),d=W(()=>{const D=l.value.length;if(D<=1)return 0;const T=Math.max(o.value-r.value,0)/(D-1),V=Math.min(T,r.value);return Math.max(V,r.value/4)}),f=W(()=>{const D=l.value.length;return D===0?0:r.value+d.value*(D-1)}),g=W(()=>({maxWidth:`${o.value}px`,width:`${Math.min(f.value,o.value)}px`,height:`${s.value}px`})),_=W(()=>l.value.map((D,j)=>({left:`${j*d.value-8}px`,zIndex:j+1}))),b=[],R=[];let E=0,C=!1;const k=(D,j)=>({id:++E,value:D.value,suit:D.suit,rank:D.rank,isEntering:j}),I=()=>{for(;R.length;){const D=R.pop();D!==void 0&&clearTimeout(D)}},q=D=>{l.value=l.value.map(j=>j.id===D?{...j,isEntering:!1}:j)},ne=(D,j)=>{const T=setTimeout(()=>{const V=R.indexOf(T);V!==-1&&R.splice(V,1),D()},j);R.push(T)},re=()=>{if(C)return;C=!0;const D=()=>{const j=b.shift();if(!j){C=!1;return}const T=k(j,!0);l.value=[...l.value,T],ne(()=>q(T.id),ll),ne(D,fI)};D()},X=D=>{D.length!==0&&(b.push(...D),re())},O=D=>{I(),b.length=0,C=!1,l.value=D.map(j=>k(j,!1))};return wt(c,D=>{const j=l.value,T=D.length;if(j.length===0&&T===0)return;if(j.length>0&&T===0){O([]);return}const V=Math.min(j.length,T),he=j.slice(0,V).map((le,L)=>{const G=D[L];if(le.value===G.value&&le.suit===G.suit)return le;const z=k(G,!0);return ne(()=>q(z.id),ll),z});if(l.value=he,T<j.length){I(),b.length=0,C=!1;return}const ye=D.slice(he.length);X(ye)},{immediate:!0}),Kr(()=>{I()}),(D,j)=>(Z(),ce("div",{class:"card-hand",style:jt(g.value),role:"group","aria-label":"Card hand"},[(Z(!0),ce(Ue,null,Hr(u.value,(T,V)=>(Z(),Ft(lI,{key:T.id,class:Lt(["card-hand__card",{"card-hand__card--entering":T.isEntering}]),style:jt(_.value[V]),rank:T.rank,suit:T.suit,large:a.value},null,8,["class","style","rank","suit","large"]))),128))],4))}}),ms=Qe(hI,[["__scopeId","data-v-a44007ea"]]),pI={class:"result-counter__prefix"},gI={class:"result-counter__value"},mI=Be({__name:"ResultCounter",props:{amount:{},active:{type:Boolean},result:{},durationMs:{},direction:{}},setup(t){const e=t,n=be(0),r=be(!1);let s=null;const i=g=>{switch(g){case"Surrendered":case"Lose":case"Double_Lose":return"down";case"Win":case"BlackJack_Win":case"Double_Win":return"up";case"Push":case"Double_Push":return"push";default:return"push"}},o=W(()=>e.direction??i(e.result)),a=W(()=>e.durationMs??900),c=W(()=>o.value==="up"?"+":o.value==="down"?"-":"±"),l=W(()=>`result-counter--${o.value}`),u=()=>{s!==null&&(cancelAnimationFrame(s),s=null)},d=()=>{u();const g=Math.max(e.amount,0),_=o.value;if(!e.active||g<=0){r.value=!1,n.value=_==="down"?g:0;return}r.value=!0;const b=_==="down"?g:0,E=(_==="down"?0:g)-b,C=performance.now(),k=I=>{const q=I-C,ne=Math.min(q/a.value,1),re=b+E*ne;n.value=Math.round(re),ne<1?s=requestAnimationFrame(k):(s=null,r.value=!1)};n.value=b,s=requestAnimationFrame(k)};wt(()=>({amount:e.amount,active:e.active,direction:o.value}),(g,_)=>{const{amount:b,active:R}=g,E=_?.amount,C=_?.active;if(b<=0){r.value=!1,u(),n.value=0;return}if(!R){u(),r.value=!1,n.value=o.value==="down"?Math.max(b,0):0;return}R&&(!C||b!==E)&&d()},{immediate:!0}),Go(()=>{u()});const f=W(()=>n.value.toLocaleString());return(g,_)=>(Z(),Ft(Pp,{name:"result-counter"},{default:lu(()=>[r.value?(Z(),ce("div",{key:0,class:Lt(["result-counter",l.value]),role:"status","aria-live":"polite"},[ie("span",pI,ze(c.value),1),ie("span",gI,ze(f.value),1)],2)):Le("",!0)]),_:1}))}}),Yi=Qe(mI,[["__scopeId","data-v-b592d668"]]),_I={class:"betting-slider",role:"group","aria-label":"Bet amount selector"},vI={class:"betting-slider__body"},bI={class:"betting-slider__value","aria-live":"polite"},yI=["disabled"],SI=["disabled"],II=["value","disabled"],Vn=0,Xi=3e4,mr=500,wI=Be({__name:"BettingSlider",props:{initialValue:{},showSlider:{type:Boolean},disabled:{type:Boolean}},emits:["change","update:value"],setup(t,{emit:e}){const n=t,r=e,s=b=>{const R=Math.min(Xi,Math.max(Vn,b)),E=Math.round((R-Vn)/mr);return Vn+E*mr},i=be(s(n.initialValue??Vn)),o=W(()=>n.disabled??!1),a=W(()=>i.value<=Vn),c=W(()=>i.value>=Xi),l=()=>{const b=i.value;r("update:value",b),r("change",b)},u=W(()=>`$${(i.value/100).toLocaleString("en-US")}`),d=b=>{i.value=s(b)},f=()=>{o.value||c.value||d(i.value+mr)},g=()=>{o.value||a.value||d(i.value-mr)},_=b=>{if(o.value)return;const R=b.target;if(!R)return;const E=Number.parseInt(R.value,10);Number.isNaN(E)||d(E)};return wt(()=>n.initialValue,b=>{if(b!==void 0&&!Number.isNaN(b)){const R=s(b);R!==i.value&&(i.value=R)}}),wt(i,l),(b,R)=>(Z(),ce("div",_I,[ie("div",vI,[ie("div",bI,[ie("button",{type:"button",class:"betting-slider__control","aria-label":"Decrease bet",onClick:g,disabled:o.value||a.value}," − ",8,yI),ri(" "+ze(u.value)+" ",1),ie("button",{type:"button",class:"betting-slider__control","aria-label":"Increase bet",onClick:f,disabled:o.value||c.value}," + ",8,SI)]),uu(ie("input",{ref:"sliderRef",class:"betting-slider__range",type:"range",min:Vn,max:Xi,step:mr,value:i.value,"aria-label":"Bet amount slider",disabled:o.value,onInput:_},null,40,II),[[Mp,n.showSlider]])])]))}}),EI=Qe(wI,[["__scopeId","data-v-3849889f"]]);class CI{constructor(e,n){this.suit=e,this.rank=n}isAce(){return this.rank==="A"}get value(){switch(this.rank){case"10":case"J":case"Q":case"K":return 10;case"A":return 1;default:return Number(this.rank)}}get suitSymbol(){switch(this.suit){case"Hearts":return"♥";case"Diamonds":return"♦";case"Clubs":return"♣";case"Spades":return"♠"}}}function AI(){const t=["Hearts","Diamonds","Clubs","Spades"],e=["2","3","4","5","6","7","8","9","10","J","Q","K","A"],n=[];for(const r of t)for(const s of e)n.push(new CI(r,s));return n}function TI(t){let e=[];for(let n=0;n<t;n++)e=e.concat(AI());return e}function RI(t){return{all:t=t||new Map,on:function(e,n){var r=t.get(e);r?r.push(n):t.set(e,[n])},off:function(e,n){var r=t.get(e);r&&(n?r.splice(r.indexOf(n)>>>0,1):t.set(e,[]))},emit:function(e,n){var r=t.get(e);r&&r.slice().map(function(s){s(n)}),(r=t.get("*"))&&r.slice().map(function(s){s(e,n)})}}}const Dn="model:change",at=(t,e)=>`mod_${t}:prop_${e}`,$t=(t,e)=>`mod_${t}:evt_${e}`,PI=(t,e)=>`mod_${t}#id_${e}`,$s=(t,e,n)=>`mod_${t}:prop_${e}#id_${n}`,Bt=(t,e,n)=>`mod_${t}:evt_${e}#id_${n}`,On=t=>`usr_evt_${t}`,kI=(t,e)=>`usr_evt_${t}_act_${e}`,K=RI(),ul=new WeakMap,dl=new WeakMap,To=new WeakMap,Vt=t=>To.get(t);function ga(t,e,n){let r=To.get(n);if(r)return r;const s=(dl.get(t)??0)+1;return dl.set(t,s),r=`${e}_${s}`,To.set(n,r),r}const DI=(t,e)=>{let n=ul.get(t);n||(n=new Map,ul.set(t,n));let r=n.get(e);return r||(r=Symbol(`${String(e)}`),n.set(e,r)),r};function _i(t,e){const{model:n,props:r,trackInstance:s=!1}=e,i=t.prototype;r.forEach(o=>{const a=Object.getOwnPropertyDescriptor(i,o);if(a&&!a.configurable)return;const c=DI(i,o);Object.defineProperty(i,o,{configurable:!0,enumerable:!0,get(){return this[c]},set(l){const u=this[c],d=s?ga(t,n,this):void 0;this[c]=l;const f={model:n,instanceId:d,property:o,value:l,previous:u,target:this};K.emit(Dn,f),K.emit(at(n,o),f),d&&(K.emit(PI(n,d),f),K.emit($s(n,o,d),f))}})})}function OI(t){return["Hit","Stand","Double","Split","Surrender"].includes(t)}const nr="new_card",_s="split_cards",vs="hand_outcome";class Vs{constructor(e=[]){this.cards=e,this.isSplit=!1,this.isDoubled=!1,this.hasStood=!1,this.isSurrendered=!1,this.lastOutcome=null,ga(Vs,"hand",this)}get softValue(){let e=0;for(const n of this.cards)e+=n.value;return e}get isSoft(){return this.cards.some(e=>e.isAce())&&this.softValue+10<=21}get isDone(){return this.isBusted||this.hasStood||this.isSurrendered||this.bestValue===21}get isBusted(){return this.softValue>21}get isBlackJack(){return!this.isSplit&&this.bestValue===21&&this.cards.length===2}get bestValue(){return this.isSoft&&this.softValue+10<=21?this.softValue+10:this.softValue}addCard(e){this.cards.push(e);const n=Vt(this),r={model:"hand",instanceId:n,event:nr,value:e,previous:void 0,target:this};K.emit(Dn,r),K.emit($t("hand",nr),r),n&&K.emit(Bt("hand",nr,n),r)}splitCards(){const e=this.cards.pop(),n=Vt(this),r={model:"hand",instanceId:n,event:_s,value:e,previous:void 0,target:this};return K.emit(Dn,r),K.emit($t("hand",_s),r),n&&K.emit(Bt("hand",_s,n),r),e}split(){this.isSplit=!0}emitOutcomeChange(e,n){const r=Vt(this),s={model:"hand",instanceId:r,event:vs,value:e,previous:n,target:this};K.emit(Dn,s),K.emit($t("hand",vs),s),r&&K.emit(Bt("hand",vs,r),s)}setOutcome(e){if(this.lastOutcome===e)return;const n=this.lastOutcome;this.lastOutcome=e,this.emitOutcomeChange(e,n)}beatsHand(e){let n;return this.isSurrendered?n="Surrendered":this.isBlackJack&&!e.isBlackJack?n="BlackJack_Win":!this.isBlackJack&&e.isBlackJack?n="Lose":this.isBusted?n=this.isDoubled?"Double_Lose":"Lose":e.isBusted?n=this.isDoubled?"Double_Win":"Win":this.bestValue>e.bestValue?n=this.isDoubled?"Double_Win":"Win":this.bestValue<e.bestValue?n=this.isDoubled?"Double_Lose":"Lose":n=this.isDoubled?"Double_Push":"Push",this.setOutcome(n),n}}class es{constructor(e=[]){this.shoe=e,this.dealIndex=0,this.trueRunningCount=0,this.holeCardHidden=!0}static getCountDelta(e){switch(e.value){case 1:case 10:return-1;case 2:case 3:case 4:case 5:case 6:return 1;default:return 0}}get remainingDecks(){return(this.shoe.length-this.dealIndex-1)/52}pastPenetration(){return this.shoe.length-1-this.dealIndex<fe.getInstance().rules.penetration+1}reset(){this.shuffle()}resetDealIndex(){this.dealIndex=0}dealCard(){if(this.dealIndex>this.shoe.length-1)throw new Error("No cards left in the shoe");const e=this.shoe[this.dealIndex];return this.dealIndex++,this.applyRunningCountDelta(e),e}shuffle(){for(let e=this.shoe.length-1;e>0;e--){const n=Math.floor(Math.random()*(e+1));[this.shoe[e],this.shoe[n]]=[this.shoe[n],this.shoe[e]]}this.dealIndex=0,this.trueRunningCount=0,this.holeCardHidden=!0}completeDealerHand(e){for(;e.bestValue<17;)e.addCard(this.dealCard());e.bestValue===17&&e.isSoft&&fe.getInstance().rules.dealerHitsSoft17&&e.addCard(this.dealCard()),this.holeCardHidden&&(this.holeCardHidden=!1)}applyRunningCountDelta(e){if(!e)return;const n=es.getCountDelta(e);n!==0&&(this.trueRunningCount=this.trueRunningCount+n)}}_i(es,{model:"dealer",props:["dealIndex","holeCardHidden"],trackInstance:!1});const Qi=10,fl=(t=0)=>e=>`\x1B[${e+t}m`,hl=(t=0)=>e=>`\x1B[${38+t};5;${e}m`,pl=(t=0)=>(e,n,r)=>`\x1B[${38+t};2;${e};${n};${r}m`,Ae={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],gray:[90,39],grey:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgGray:[100,49],bgGrey:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};Object.keys(Ae.modifier);const NI=Object.keys(Ae.color),xI=Object.keys(Ae.bgColor);[...NI,...xI];function MI(){const t=new Map;for(const[e,n]of Object.entries(Ae)){for(const[r,s]of Object.entries(n))Ae[r]={open:`\x1B[${s[0]}m`,close:`\x1B[${s[1]}m`},n[r]=Ae[r],t.set(s[0],s[1]);Object.defineProperty(Ae,e,{value:n,enumerable:!1})}return Object.defineProperty(Ae,"codes",{value:t,enumerable:!1}),Ae.color.close="\x1B[39m",Ae.bgColor.close="\x1B[49m",Ae.color.ansi=fl(),Ae.color.ansi256=hl(),Ae.color.ansi16m=pl(),Ae.bgColor.ansi=fl(Qi),Ae.bgColor.ansi256=hl(Qi),Ae.bgColor.ansi16m=pl(Qi),Object.defineProperties(Ae,{rgbToAnsi256:{value(e,n,r){return e===n&&n===r?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(n/255*5)+Math.round(r/255*5)},enumerable:!1},hexToRgb:{value(e){const n=/[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));if(!n)return[0,0,0];let[r]=n;r.length===3&&(r=[...r].map(i=>i+i).join(""));const s=Number.parseInt(r,16);return[s>>16&255,s>>8&255,s&255]},enumerable:!1},hexToAnsi256:{value:e=>Ae.rgbToAnsi256(...Ae.hexToRgb(e)),enumerable:!1},ansi256ToAnsi:{value(e){if(e<8)return 30+e;if(e<16)return 90+(e-8);let n,r,s;if(e>=232)n=((e-232)*10+8)/255,r=n,s=n;else{e-=16;const a=e%36;n=Math.floor(e/36)/5,r=Math.floor(a/6)/5,s=a%6/5}const i=Math.max(n,r,s)*2;if(i===0)return 30;let o=30+(Math.round(s)<<2|Math.round(r)<<1|Math.round(n));return i===2&&(o+=60),o},enumerable:!1},rgbToAnsi:{value:(e,n,r)=>Ae.ansi256ToAnsi(Ae.rgbToAnsi256(e,n,r)),enumerable:!1},hexToAnsi:{value:e=>Ae.ansi256ToAnsi(Ae.hexToAnsi256(e)),enumerable:!1}}),Ae}const vt=MI(),gl=(()=>{if(!("navigator"in globalThis))return 0;if(globalThis.navigator.userAgentData){const t=navigator.userAgentData.brands.find(({brand:e})=>e==="Chromium");if(t&&t.version>93)return 3}return/\b(Chrome|Chromium)\//.test(globalThis.navigator.userAgent)?1:0})(),ml=gl!==0&&{level:gl},LI={stdout:ml,stderr:ml};function HI(t,e,n){let r=t.indexOf(e);if(r===-1)return t;const s=e.length;let i=0,o="";do o+=t.slice(i,r)+e+n,i=r+s,r=t.indexOf(e,i);while(r!==-1);return o+=t.slice(i),o}function UI(t,e,n,r){let s=0,i="";do{const o=t[r-1]==="\r";i+=t.slice(s,o?r-1:r)+e+(o?`\r
`:`
`)+n,s=r+1,r=t.indexOf(`
`,s)}while(r!==-1);return i+=t.slice(s),i}const{stdout:_l,stderr:vl}=LI,Ro=Symbol("GENERATOR"),or=Symbol("STYLER"),Gr=Symbol("IS_EMPTY"),bl=["ansi","ansi","ansi256","ansi16m"],ar=Object.create(null),BI=(t,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");const n=_l?_l.level:0;t.level=e.level===void 0?n:e.level},FI=t=>{const e=(...n)=>n.join(" ");return BI(e,t),Object.setPrototypeOf(e,ts.prototype),e};function ts(t){return FI(t)}Object.setPrototypeOf(ts.prototype,Function.prototype);for(const[t,e]of Object.entries(vt))ar[t]={get(){const n=js(this,ko(e.open,e.close,this[or]),this[Gr]);return Object.defineProperty(this,t,{value:n}),n}};ar.visible={get(){const t=js(this,this[or],!0);return Object.defineProperty(this,"visible",{value:t}),t}};const Po=(t,e,n,...r)=>t==="rgb"?e==="ansi16m"?vt[n].ansi16m(...r):e==="ansi256"?vt[n].ansi256(vt.rgbToAnsi256(...r)):vt[n].ansi(vt.rgbToAnsi(...r)):t==="hex"?Po("rgb",e,n,...vt.hexToRgb(...r)):vt[n][t](...r),$I=["rgb","hex","ansi256"];for(const t of $I){ar[t]={get(){const{level:n}=this;return function(...r){const s=ko(Po(t,bl[n],"color",...r),vt.color.close,this[or]);return js(this,s,this[Gr])}}};const e="bg"+t[0].toUpperCase()+t.slice(1);ar[e]={get(){const{level:n}=this;return function(...r){const s=ko(Po(t,bl[n],"bgColor",...r),vt.bgColor.close,this[or]);return js(this,s,this[Gr])}}}}const VI=Object.defineProperties(()=>{},{...ar,level:{enumerable:!0,get(){return this[Ro].level},set(t){this[Ro].level=t}}}),ko=(t,e,n)=>{let r,s;return n===void 0?(r=t,s=e):(r=n.openAll+t,s=e+n.closeAll),{open:t,close:e,openAll:r,closeAll:s,parent:n}},js=(t,e,n)=>{const r=(...s)=>jI(r,s.length===1?""+s[0]:s.join(" "));return Object.setPrototypeOf(r,VI),r[Ro]=t,r[or]=e,r[Gr]=n,r},jI=(t,e)=>{if(t.level<=0||!e)return t[Gr]?"":e;let n=t[or];if(n===void 0)return e;const{openAll:r,closeAll:s}=n;if(e.includes("\x1B"))for(;n!==void 0;)e=HI(e,n.close,n.open),n=n.parent;const i=e.indexOf(`
`);return i!==-1&&(e=UI(e,s,r,i)),r+e+s};Object.defineProperties(ts.prototype,ar);const yl=ts();ts({level:vl?vl.level:0});const WI={Win:"blue",Lose:"red",Double_Lose:"red",Surrendered:"red",Push:"white",BlackJack_Win:"bgYellow",Double_Win:"blue",Double_Push:"white"},bs="new_hand";var pn;let ma=(pn=class{constructor(e=[]){this.hands=e,this.bet=0,this.activeHandIndex=0,this.splitCount=0,ga(pn,"chair",this)}get activeHand(){return this.hands[this.activeHandIndex]}get chairDone(){return!this.activeHand||this.allHandsOff}get allHandsOff(){for(let e of this.hands)if(!e.isBusted&&!e.isSurrendered&&!e.isBlackJack)return!1;return!0}start(){this.hands=[new Vs],this.activeHandIndex=0,this.splitCount=0}deal(e){if(!this.activeHand)throw new Error("no active hand");this.activeHand.addCard(e)}payout(e){let n=0;for(let r of this.hands)n+=this.handPayout(r,e);return n}handPayout(e,n){switch(e.beatsHand(n)){case"Win":case"Double_Push":return this.bet*2;case"Push":return this.bet;case"BlackJack_Win":return Math.floor(this.bet*(1+fe.getInstance().rules.blackjackPayout));case"Lose":case"Double_Lose":return 0;case"Double_Win":return this.bet*4;case"Surrendered":return this.bet/2}}moveToNextHand(e){this.activeHandIndex++,this.activeHand&&this.activeHand.cards.length<2&&this.activeHand.addCard(e.dealCard()),this.activeHand&&this.activeHand.isDone&&this.moveToNextHand(e)}listViableActions(){return pn.ACTIONS.reduce((e,n)=>(e[n]=!this.validateAction(n),e),{})}validateAction(e){const n=this.activeHand;if(!n)return"No active hand";if(n.isDone)return"Hand not active";const r=fe.getInstance().rules;switch(e){case"Stand":return null;case"Hit":return n.softValue<21?null:"Cannot hit on 21 or more";case"Double":return fe.getInstance().player.balance<this.bet?"Not enough balance to double":n.cards.length!==2?"Can only double on first two cards":n.isSplit&&!r.doubleAllowedAfterSplit?"Can not double after split":null;case"Split":return n.cards.length!==2?"Can only split with two cards":n.cards[0].value!==n.cards[1].value?"Can only split matching values":this.splitCount>=r.maxSplits?"maximum split count reached":n.cards[0].isAce()&&n.isSplit&&!r.resplitAcesAllowed?"Can not re-split aces":null;case"Surrender":return n.cards.length!==2?"Can only surrender on first two cards":r.surrenderAllowed?null:"Surrender not allowed"}}act(e,n){if(!this.activeHand)throw new Error("No active hand");const r=this.validateAction(e);if(r)throw new Error(r);switch(e){case"Stand":this.activeHand.hasStood=!0,this.moveToNextHand(n);break;case"Double":fe.getInstance().player.removeMoney(this.bet),this.activeHand.isDoubled=!0,this.activeHand.addCard(n.dealCard()),this.moveToNextHand(n);break;case"Split":const s=this.activeHand.splitCards();if(!s)throw new Error("No card to split");const i=new Vs([s]);i.split(),this.activeHand.split(),this.splitCount++,this.addHand(i),this.activeHand.addCard(n.dealCard()),this.activeHand.isDone&&this.moveToNextHand(n);break;case"Hit":this.activeHand.addCard(n.dealCard()),this.activeHand.isDone&&this.moveToNextHand(n);break;case"Surrender":this.activeHand.isSurrendered=!0,this.moveToNextHand(n);break}}addHand(e){this.hands.push(e);const n=Vt(this),r={model:"chair",instanceId:n,event:bs,value:e,previous:void 0,target:this};K.emit(Dn,r),K.emit($t("hand",bs),r),n&&K.emit(Bt("chair",bs,n),r)}view(e,n){console.log("Player Chair:",this.hands.map((r,s)=>{const i=n?r.beatsHand(n):null,o=this.chalkModify(r,i);return e&&s===this.activeHandIndex?`>${o}<`:o}).join(" | "),"  Bet:",this.bet)}chalkModify(e,n){let r=e.cards.map(s=>`${s.rank}${s.suitSymbol}`).join(", ");if(n){const s=WI[n];r=yl[s](r)}return(e.isDoubled||n=="BlackJack_Win")&&(r=yl.underline(r)),r}},pn.ACTIONS=["Hit","Stand","Split","Double","Surrender"],pn);_i(ma,{model:"chair",props:["bet","activeHandIndex"],trackInstance:!0});const GI={logAfterAction:!1},zn="chair";let Tf=class{constructor(e,n,r={},s=GI){this.dealer=e,this.dealerChair=n,this.playerChairs=r,this.configuration=s,this.chairIndex=0,this.runningCount=0,this.chairTurnIndex=0}get dealerPeekedBlackjack(){return fe.getInstance().rules.dealerPeekA10&&this.dealerChair.hands[0]?.isBlackJack}get upCard(){return this.dealerChair.hands[0].cards[0]}get roundInitialCost(){let e=0;for(const n of this.playerChairArray)e+=n.bet;return e}get playerChairArray(){return Object.values(this.playerChairs).filter(e=>e!==null)}get activeChair(){return this.playerChairArray[this.chairTurnIndex]}get aPlayerHasCards(){return this.playerChairArray.some(e=>e.hands.some(n=>n.cards.length>0))}get playerRoundsComplete(){return this.dealerPeekedBlackjack||!this.playerChairArray.find(e=>!e.chairDone)}view(){if(this.dealerChair.hands[0]?.cards.length<1||this.playerChairArray[0]?.hands[0]?.cards.length<1)throw new Error("could not find active hands");for(let e of this.playerChairArray)e.view(e===this.activeChair,this.playerRoundsComplete?this.dealerChair.hands[0]:null);if(this.playerRoundsComplete)console.log("Dealer Chair:",this.dealerChair.hands.map(e=>e.cards.map(n=>`${n.rank}${n.suitSymbol}`).join(", ")).join(" | "));else{const e=this.dealerChair.hands[0].cards[0];console.log(`Dealer Chair: ${e.rank}${e.suitSymbol}, [Hidden]`)}}addPlayerChair(e){const n=new ma;this.playerChairs[e??this.chairIndex]=n,this.chairIndex++;const r={model:"table",event:zn,value:n,previous:void 0,target:this};K.emit(Dn,r),K.emit($t("table",zn),r)}getPlayerChair(e){return this.playerChairs[e]??null}removePlayerChair(e){const n=this.playerChairs[e];if(!n)throw new Error("No chair at this index");this.playerChairs[e]=null;const r={model:"table",event:zn,value:null,previous:n,target:this};K.emit(Dn,r),K.emit($t("table",zn),r)}deal(e,n=1){for(let r=0;r<n;r++)e.deal(this.dealer.dealCard())}startRound(){const e=this.validateRoundCanStart();if(e)throw new Error(e);fe.getInstance().player.removeMoney(this.roundInitialCost),this.dealerChair.start(),this.deal(this.dealerChair,2);for(let n of this.playerChairArray)n.start(),this.deal(n,2);this.chairTurnIndex=-1,this.dealerPeekedBlackjack&&(this.chairTurnIndex=this.playerChairArray.length),this.nextChair(),this.configuration.logAfterAction&&this.view(),this.dealer.holeCardHidden=!this.playerRoundsComplete,this.updateRunningCount(),this.activeChair||this.payout()}updateRunningCount(){if(this.dealer.holeCardHidden){const e=fe.getInstance().table.dealerChair.hands[0]?.cards[1],n=e?es.getCountDelta(e):0;this.runningCount=this.dealer.trueRunningCount-n}else this.runningCount=this.dealer.trueRunningCount}act(e){if(!this.dealerChair.activeHand)throw new Error("Round not started");if(!this.activeChair)throw new Error("No active chair");this.activeChair.act(e,this.dealer),this.activeChair.activeHand===void 0&&this.nextChair(),this.playerRoundsComplete&&this.dealer.completeDealerHand(this.dealerChair.activeHand),this.updateRunningCount(),this.configuration.logAfterAction&&this.view(),this.activeChair||this.payout()}nextChair(){if(this.chairTurnIndex++,this.activeChair&&this.activeChair.chairDone){this.nextChair();return}}payout(){if(this.chairTurnIndex<this.playerChairArray.length)throw new Error("Round still in progress");for(let e of this.playerChairArray){const n=e.payout(this.dealerChair.hands[0]);n>0&&fe.getInstance().player.addMoney(n)}this.resetAllChairs(),this.chairTurnIndex=0}resetAllChairs(){this.dealerChair.start();for(let e of this.playerChairArray)e.start()}validateRoundCanStart(){if(this.dealerChair.hands[0]?.cards.length>0)return"Round already in progress";if(this.playerChairArray.length===0)return"No players at the table";if(this.roundInitialCost>fe.getInstance().player.balance)return"Player does not have enough balance for the round";if(this.roundInitialCost<=0)return"No bets placed";for(const e of this.playerChairArray)if(e.bet<0)return"No negative bets allowed";for(const e of this.playerChairArray)if(e.bet<=0)return"All chairs must have a bet placed";return this.dealer.pastPenetration()?"Dealer is out of cards, needs to reshuffle":null}};_i(Tf,{model:"table",props:["chairTurnIndex","runningCount"],trackInstance:!1});class fe{static initialize(e){this.instance=e}static getInstance(){if(!fe.instance)throw new Error("Session not initialized");return fe.instance}constructor({player:e,rules:n,table:r}){this.player=e,this.rules=n,this.table=r}}const Do="play",Ws="reshuffle",yr="playerAction",_a=oi("chairs",()=>{const t=be(null),e=Un({}),n=W(()=>{const A=t.value;return typeof A!="number"?null:e[A]}),r=new Map,s=[],i=fe.getInstance().table,o=W(()=>Object.values(e).some(A=>A.modelHands.some(M=>M.length>0))),a=A=>A.map(M=>[...M]),c=A=>A.hands.map(M=>[...M.cards]),l=new Set(["Win","Double_Win"]),u=new Set(["Lose","Double_Lose"]),d=new Set(["Surrendered"]),f=new Set(["Push","Double_Push"]),g={Lose:1,Double_Lose:2},_={Win:2,Double_Win:4},b=1+fe.getInstance().rules.blackjackPayout,R=(A,M)=>{if(!A)return 0;const B=M/100;return B<=0?0:d.has(A)?B/2:u.has(A)?(g[A]??1)*B:l.has(A)?(_[A]??2)*B:f.has(A)?0:A==="BlackJack_Win"?Math.floor(B*b):0},E=A=>A.hands.map(M=>{const B=M.lastOutcome??null;return{result:B,amount:R(B,A.bet??0)}}),C=A=>A.reduce((M,B)=>M+B.length,0),k=A=>{if(!A)return null;for(const[M,B]of r.entries())if(B.chair===A)return M;for(const[M,B]of Object.entries(i.playerChairs))if(B===A)return Number(M);return null},I=(A,M=!1)=>{const B=e[A],ae=r.get(A);if(!B||!ae)return;const de=c(ae.chair),Oe=E(ae.chair);B.modelHands=a(de);const Ne=C(de),v=C(B.hands),F=ae.chair.activeHandIndex;if(!(Ne===0&&v>0&&!M)){if(de.length===0){B.clampedActiveHandIndex=null,B.hands=[],B.handResults=[];return}B.clampedActiveHandIndex=Math.min(Math.max(F,0),de.length-1),B.hands=a(de),B.handResults=[...Oe]}},q=()=>{for(const A of Object.keys(e).map(Number))I(A,!0)};K.on(On(Ws),()=>{q()});const ne=(A,M)=>{const B=A.handListeners.get(M);if(B)try{B()}finally{A.handListeners.delete(M)}},re=(A,M)=>{const B=r.get(A);if(!B)return;const ae=Vt(M);if(!ae)throw new Error("Hand instance ID not found");if(B.handListeners.has(ae))return;const de=()=>{I(A)},Oe=Bt("hand",nr,ae),Ne=Bt("hand",_s,ae),v=Bt("hand",vs,ae);K.on(Oe,de),K.on(Ne,de),K.on(v,de),B.handListeners.set(ae,()=>{K.off(Oe,de),K.off(Ne,de),K.off(v,de)})},X=A=>{const M=r.get(A);if(!M)return;const B=M.chair,ae=new Set;for(const de of B.hands){const Oe=Vt(de);if(!Oe)throw new Error("Hand instance ID not found");ae.add(Oe),re(A,de)}for(const de of[...M.handListeners.keys()])ae.has(de)||ne(M,de);I(A)},O=A=>{const M=r.get(A);if(M){for(const B of M.cleanupFns)try{B()}catch(ae){console.error("Failed to cleanup chair listener",ae)}M.cleanupFns.length=0;for(const B of[...M.handListeners.keys()])ne(M,B);r.delete(A),delete e[A]}},D=(A,M)=>{O(A);const B=Vt(M);if(!B)throw new Error("Chair instance ID not found");const ae=c(M),de=E(M);e[A]={hands:ae,modelHands:a(ae),handResults:[...de],activeHandIndex:M.activeHandIndex,bet:M.bet??0,clampedActiveHandIndex:ae.length>0?Math.min(Math.max(M.activeHandIndex,0),ae.length-1):null};const Oe={chair:M,chairInstanceId:B,handListeners:new Map,cleanupFns:[]},Ne=$s("chair","activeHandIndex",B),v=h=>{const p=e[A];if(!p)return;const m=typeof h.value=="number"?h.value:Number(h.value??p.activeHandIndex);p.activeHandIndex=Number.isNaN(m)?p.activeHandIndex:m,X(A)};K.on(Ne,v),Oe.cleanupFns.push(()=>K.off(Ne,v));const F=$s("chair","bet",B),H=h=>{const p=e[A];if(!p)return;const m=typeof h.value=="number"?h.value:Number(h.value??p.bet);p.bet=Number.isNaN(m)?p.bet:m};K.on(F,H),Oe.cleanupFns.push(()=>K.off(F,H));const J=Bt("chair",bs,B),ue=h=>{const p=h.value;p&&re(A,p),I(A)};K.on(J,ue),Oe.cleanupFns.push(()=>K.off(J,ue)),r.set(A,Oe),X(A)},j=()=>{for(const[A,M]of Object.entries(i.playerChairs))M&&D(Number(A),M)},T=A=>{const M=A.value,B=A.previous;if(B){const ae=k(B);ae!==null&&O(ae)}if(M){const ae=k(M);if(ae===null)throw new Error("Could not determine chair index for new chair");D(ae,M)}},V=$t("table",zn);K.on(V,T),s.push(()=>K.off(V,T));const he=at("table","chairTurnIndex"),ye=A=>{const M=typeof A.value=="number"?A.value:Number(A.value??-1);t.value=M>=0?M:null};return K.on(he,ye),s.push(()=>K.off(he,ye)),t.value=i.chairTurnIndex>=0?i.chairTurnIndex:null,j(),Kr(()=>{for(const A of s)try{A()}catch(M){console.error("Failed to cleanup chair store listener",M)}s.length=0;for(const A of[...r.keys()])O(A)}),{activeChairId:t,activeChair:n,getChairView:A=>e[A]??null,roundInProgress:o,sit:A=>{o.value||fe.getInstance().table.addPlayerChair(A)},adjustBet:(A,M)=>{if(o.value)return;const B=r.get(A)?.chair;B&&(B.bet=Math.max(M,0))},leave:A=>{o.value||fe.getInstance().table.removePlayerChair(A)}}}),KI=["aria-current"],zI={class:"hand__top","aria-label":"Inactive hands"},qI={class:"hand__top-stack hand__top-stack--left","aria-label":"Hands before active"},JI={key:0,class:"hand__ellipsis","aria-hidden":"true"},YI=["aria-pressed"],XI={class:"hand__entry-body"},QI={key:1,class:"hand__surrender-flag","aria-hidden":"true"},ZI={key:2,class:"hand__bj-win","aria-hidden":"true"},ew={class:"hand__top-stack hand__top-stack--right","aria-label":"Hands after active"},tw={key:0,class:"hand__ellipsis","aria-hidden":"true"},nw=["aria-pressed"],rw={class:"hand__entry-body"},sw={key:1,class:"hand__surrender-flag","aria-hidden":"true"},iw={key:2,class:"hand__bj-win","aria-hidden":"true"},ow={class:"hand",role:"group","aria-label":"Card hands"},aw={key:0,class:"hand__frame"},cw={class:"hand__entry-body"},lw={key:1,class:"hand__surrender-flag","aria-hidden":"true"},uw={key:2,class:"hand__bj-win","aria-hidden":"true"},Sl=8,Il=2,dw=Be({__name:"Chair",props:{chairId:{},maxWidth:{},initialActiveHand:{}},setup(t){const n=64*pa/2,r=new Set(["Win","Double_Win"]),s=new Set(["Surrendered"]),i=new Set(["BlackJack_Win"]),o=new Set(["Lose","Double_Lose"]),a=new Set(["Push","Double_Push"]),c=t,l=be(null),u=_a(),d=W(()=>u.activeChairId===c.chairId),f=W(()=>u.getChairView(c.chairId)),g=W(()=>!u.roundInProgress),_=W(()=>f.value?.hands.slice(0,Sl)??[]),b=W(()=>f.value?.handResults.slice(0,Sl)??[]),R=W(()=>c.maxWidth),E=W(()=>f.value?.bet??0),C=W(()=>_.value.map((L,G)=>{const z=b.value[G]??null,A=z?.result??null,M=z?.amount??0,B=L.length>0;return{hand:L,index:G,result:A,resultAmount:M,showResultHighlight:!!(A&&B)}})),k=W(()=>{const L=f.value;if(!L)return l.value=null,0;const{hands:G,activeHandIndex:z,clampedActiveHandIndex:A}=L,M=G.length;if(A!==null?A>=0&&A<M:z>=0&&z<M){const de=A!==null?A:z;return l.value=de,de}if(M===0)return l.value=null,0;const ae=l.value!==null&&l.value<M?l.value:M-1;return l.value=ae,ae}),I=W(()=>C.value.find(L=>L.index===k.value)??null),q=k,ne=W(()=>C.value.filter(L=>L.index<k.value)),re=W(()=>C.value.filter(L=>L.index>k.value)),X=W(()=>ne.value.slice(Math.max(ne.value.length-Il,0),ne.value.length)),O=W(()=>re.value.slice(0,Math.min(Il,re.value.length)).reverse()),D=W(()=>Math.max(ne.value.length-X.value.length,0)),j=W(()=>Math.max(re.value.length-O.value.length,0)),T=L=>L.map((G,z,A)=>({...G,style:{marginTop:z===0?"0":`-${n}px`,zIndex:A.length-z}})),V=W(()=>T(X.value)),he=W(()=>T(O.value)),ye=L=>{u.adjustBet(c.chairId,L)},le=L=>{const G=!!L?.hand.length,z=!!(L?.result&&r.has(L.result)&&G),A=!!(L?.result&&o.has(L.result)&&G),M=!!(L?.result&&a.has(L.result)&&G),B=!!(L?.result&&s.has(L.result)&&G),ae=!!(L?.result&&i.has(L.result)&&G),de=!!L?.showResultHighlight;return{"hand__entry--win":z,"hand__entry--lose":A,"hand__entry--push":M,"hand__entry--surrender":B,"hand__entry--bj-win":ae,"hand__entry--bj-win-active":!!(ae&&de),"hand__entry--win-active":!!(z&&de),"hand__entry--loss-active":!!(A&&de),"hand__entry--push-active":!!(M&&de),"hand__entry--surrender-active":!!(B&&de)}};return wt(()=>_.value.length,L=>{L===0&&(l.value=null)}),(L,G)=>(Z(),ce("div",{class:Lt(["chair",{"chair--active":d.value}]),"aria-label":"Player Spot","aria-current":d.value?"true":void 0},[Re(u).roundInProgress?Le("",!0):(Z(),ce("button",{key:0,class:"chair__deactivate",type:"button","aria-label":"Make this chair inactive",onClick:G[0]||(G[0]=z=>Re(u).leave(c.chairId))}," × ")),ie("div",zI,[ie("div",qI,[D.value>0?(Z(),ce("span",JI,ze(".".repeat(D.value)),1)):Le("",!0),(Z(!0),ce(Ue,null,Hr(V.value,z=>(Z(),ce("div",{key:z.index,class:Lt(["hand__entry","hand__entry--stack",le(z)]),type:"button",role:"listitem",style:jt(z.style),"aria-pressed":z.index===Re(q)},[ie("div",XI,[Pe(ms,{cards:z.hand,maxWidth:R.value},null,8,["cards","maxWidth"]),z.result&&z.resultAmount>0?(Z(),Ft(Yi,{key:0,amount:z.resultAmount,active:z.showResultHighlight,result:z.result},null,8,["amount","active","result"])):Le("",!0),z?.result&&Re(s).has(z.result)&&z.showResultHighlight?(Z(),ce("div",QI,[...G[1]||(G[1]=[ie("img",{src:Ki,alt:"Surrender flag"},null,-1)])])):Le("",!0),z?.result&&Re(i).has(z.result)&&z.showResultHighlight?(Z(),ce("div",ZI,[...G[2]||(G[2]=[ie("img",{src:zi,alt:"Blackjack win animation"},null,-1)])])):Le("",!0)])],14,YI))),128))]),ie("div",ew,[j.value>0?(Z(),ce("span",tw,ze(".".repeat(j.value)),1)):Le("",!0),(Z(!0),ce(Ue,null,Hr(he.value,z=>(Z(),ce("div",{key:z.index,class:Lt(["hand__entry","hand__entry--stack",le(z)]),type:"button",role:"listitem",style:jt(z.style),"aria-pressed":z.index===Re(q)},[ie("div",rw,[Pe(ms,{cards:z.hand,maxWidth:R.value},null,8,["cards","maxWidth"]),z.result&&z.resultAmount>0?(Z(),Ft(Yi,{key:0,amount:z.resultAmount,active:z.showResultHighlight,result:z.result},null,8,["amount","active","result"])):Le("",!0),z?.result&&Re(s).has(z.result)&&z.showResultHighlight?(Z(),ce("div",sw,[...G[3]||(G[3]=[ie("img",{src:Ki,alt:"Surrender flag"},null,-1)])])):Le("",!0),z?.result&&Re(i).has(z.result)&&z.showResultHighlight?(Z(),ce("div",iw,[...G[4]||(G[4]=[ie("img",{src:zi,alt:"Blackjack win animation"},null,-1)])])):Le("",!0)])],14,nw))),128))])]),ie("div",ow,[I.value?(Z(),ce("div",aw,[ie("button",{class:Lt(["hand__entry","hand__entry--active",le(I.value)]),type:"button","aria-pressed":!0},[ie("div",cw,[Pe(ms,{cards:I.value.hand,large:!0,maxWidth:R.value},null,8,["cards","maxWidth"]),I.value.result&&I.value.resultAmount>0?(Z(),Ft(Yi,{key:0,amount:I.value.resultAmount,active:I.value.showResultHighlight,result:I.value.result},null,8,["amount","active","result"])):Le("",!0),I.value?.result&&Re(s).has(I.value.result)&&I.value.showResultHighlight?(Z(),ce("div",lw,[...G[5]||(G[5]=[ie("img",{src:Ki,alt:"Surrender flag"},null,-1)])])):Le("",!0),I.value?.result&&Re(i).has(I.value.result)&&I.value.showResultHighlight?(Z(),ce("div",uw,[...G[6]||(G[6]=[ie("img",{src:zi,alt:"Blackjack win animation"},null,-1)])])):Le("",!0)])],2)])):Le("",!0)]),Pe(EI,{"initial-value":E.value,onChange:ye,disabled:!g.value},null,8,["initial-value","disabled"])],10,KI))}}),fw=Qe(dw,[["__scopeId","data-v-e7b6d617"]]),hw={class:"chair","aria-label":"Player Spot",style:{width:"272px"}},pw=["disabled"],gw={key:0,class:"chair__inactive-label"},mw={key:1,"aria-hidden":"true"},_w=Be({__name:"InactiveChair",props:{chairId:{}},setup(t){const e=t,n=_a(),r=()=>{n.roundInProgress||n.sit(e.chairId)};return(s,i)=>(Z(),ce("div",hw,[ie("button",{class:"chair__empty-button",type:"button","aria-label":"Sit at this chair",disabled:Re(n).roundInProgress,onClick:r},[Re(n).roundInProgress?(Z(),ce("span",gw," Round Active ")):(Z(),ce("span",mw,"+"))],8,pw)]))}}),vw=Qe(_w,[["__scopeId","data-v-003a3a6f"]]),bw=0,wl=at("player","balance"),yw=oi("player",()=>{const t=Ys(fe.getInstance()),e=be(t.player.balance??bw),n=o=>{e.value=Number(o.value)};K.on(wl,n),Kr(()=>{K.off(wl,n)});const r=o=>Math.max(0,Math.floor(o)),s=o=>{const a=r(o),c=t.player.balance;if(a===c){e.value=c;return}a>c?t.player.addMoney(a-c):t.player.removeMoney(c-a)};return{balance:e,setBalance:s,adjustBalance:o=>{!Number.isFinite(o)||o===0||s(t.player.balance+o)}}}),Sw={class:"player-balance",role:"status","aria-live":"polite"},Iw={class:"player-balance__value"},ww=Be({__name:"PlayerBalanceDisplay",setup(t){const e=yw(),n=W(()=>`$${(e.balance/100).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`);return(r,s)=>(Z(),ce("div",Sw,[ie("span",Iw,ze(n.value),1)]))}}),Ew=Qe(ww,[["__scopeId","data-v-bd6f3031"]]),Rf=["Hit","Stand","Split","Double","Surrender","Insurance"],El=()=>({Hit:!0,Stand:!0,Split:!1,Double:!1,Surrender:!1,Insurance:!1}),Cw=oi("playerActions",()=>{const t=Un(El()),e=c=>t[c];return{enabledMap:t,isEnabled:e,setActionEnabled:(c,l)=>{t[c]=l},setMany:c=>{Object.entries(c).forEach(([l,u])=>{t[l]=u})},reset:()=>{const c=El();Rf.forEach(l=>{t[l]=c[l]})},triggerAction:c=>e(c)?(K.emit(On(yr),{event:yr,action:c}),K.emit(kI(yr,c),{event:yr,action:c}),!0):!1,play:()=>{K.emit(On(Do),{event:Do})},reshuffle:()=>{K.emit(On(Ws),{event:Ws})}}}),Pf=oi("dealer",()=>{const t=be([]),e=be(fe.getInstance().rules.deckCount*52),n=be(fe.getInstance().rules.deckCount*52),r=fe.getInstance().table.dealer,s=be(0),i=be(!!r.holeCardHidden),o=be(!1),a=be(null),c=V=>{t.value=[...V]},l=V=>{t.value=[...t.value,V]},u=()=>{c([])},d=(V,he)=>{const ye=Math.max(1,Math.floor(he)),le=Math.min(ye,Math.max(0,Math.floor(V)));e.value=ye,n.value=le},f=V=>{const he=n.value+V;n.value=Math.min(e.value,Math.max(0,Math.floor(he)))},g=()=>s.value=Math.trunc(fe.getInstance().table.runningCount),_=()=>i.value=fe.getInstance().table.dealer.holeCardHidden,b=()=>{e.value=fe.getInstance().rules.deckCount*52,n.value=fe.getInstance().rules.deckCount*52,o.value=!1,fe.getInstance().table.dealer.reset(),fe.getInstance().table.dealer.resetDealIndex(),g()},R=()=>{u(),b()};K.on(On(Ws),()=>{R()});const E=[],C=at("dealer","dealIndex"),k=at("table","runningCount"),I=at("dealer","holeCardHidden");function q(V){if(V.value!==0)return;j();const ye=V.target.hands[0];if(a.value=Vt(ye)??null,!a.value)throw new Error("dealer hand not found");D=Bt("hand",nr,a.value),K.on(D,ne),K.on(I,ne)}function ne(){const V=fe.getInstance().table.dealerChair.activeHand;c(V.cards),_()}function re(V){if(fe.getInstance().table.dealer.pastPenetration()&&(o.value=!0),V.value===0){n.value=fe.getInstance().rules.deckCount*52;return}n.value=Math.max(0,n.value-1)}function X(V){s.value=Math.trunc(V.value)}K.on(C,re),K.on(k,X),E.push(()=>K.off(C,re));const O=Vt(fe.getInstance().table.dealerChair);if(!O)throw new Error("dealer chair not found");let D=null;const j=()=>{D&&(K.off(D,ne),K.off(I,ne),D=null,a.value=null)},T=$s("chair","activeHandIndex",O);return K.on(T,q),E.push(()=>{K.off(T,q),j()}),Kr(()=>{E.forEach(V=>{try{V()}catch(he){console.error("Failed to cleanup dealer store listener",he)}}),E.length=0,j()}),{cards:t,totalShoeSize:e,remainingShoeSize:n,runningCount:s,pastPenetration:o,holeCardHidden:i,setCards:c,addCard:l,resetCards:u,setShoeSizes:d,adjustShoe:f,resetShoe:b,reset:R}});class Aw{constructor(){this.deckCount=6,this.dealerHitsSoft17=!0,this.doubleAllowedAfterSplit=!0,this.resplitAcesAllowed=!0,this.surrenderAllowed=!0,this.maxSplits=2,this.blackjackPayout=1.5,this.penetration=52,this.dealerPeekA10=!0}}function Cl(t){return t<0?Math.ceil(t):Math.floor(t)}function Tw(t,e){const n=t.rules,r=t.table,s=r.activeChair,i=s?.activeHand,o=r.upCard,a=Math.ceil(2*r.dealer.remainingDecks)/2,c=Math.floor(2*r.dealer.remainingDecks)/2,l=Cl(r.runningCount/a),u=Cl(r.runningCount/c);if(!s||!i||!o)return[];const d=!s.validateAction("Split"),f=!s.validateAction("Double"),g=!s.validateAction("Surrender"),_=i.isSoft,b={dealerUpCard:o.value,softValue:i.softValue,canSplit:d,canDouble:f,canSurrender:g,isSoft:_,DAS:n.doubleAllowedAfterSplit};if(!o||!i)throw new Error("Could not determine correct action");const R=Rw(i,o),E=e[R]??[],C=E.find(I=>Al(b,l,I)),k=E.find(I=>Al(b,u,I));if(!C?.action||!k?.action)throw`Missing default rule for ${i.softValue} vs ${o.value}`;return[C.action,k.action]}const Al=(t,e,n)=>!(n.isSoft&&!t.isSoft||n.canDouble&&!t.canDouble||n.canSplit&&!t.canSplit||n.canSurrender&&!t.canSurrender||n.DAS&&!t.DAS),Rw=(t,e)=>{const n=e.value;return`${t.softValue}_${n}`},Pw={"2_2":[{canSplit:!0,action:"Split"},{action:"Hit"}],"2_3":[{canSplit:!0,action:"Split"},{action:"Hit"}],"2_4":[{canSplit:!0,action:"Split"},{action:"Hit"}],"2_5":[{canSplit:!0,action:"Split"},{action:"Hit"}],"2_6":[{canSplit:!0,action:"Split"},{action:"Hit"}],"2_7":[{canSplit:!0,action:"Split"},{action:"Hit"}],"2_8":[{canSplit:!0,action:"Split"},{action:"Hit"}],"2_9":[{canSplit:!0,action:"Split"},{action:"Hit"}],"2_10":[{canSplit:!0,action:"Split"},{action:"Hit"}],"2_1":[{canSplit:!0,action:"Split"},{action:"Hit"}],"3_2":[{action:"Hit"}],"3_3":[{action:"Hit"}],"3_4":[{action:"Hit"}],"3_5":[{isSoft:!0,canDouble:!0,action:"Double"},{action:"Hit"}],"3_6":[{isSoft:!0,canDouble:!0,action:"Double"},{action:"Hit"}],"3_7":[{action:"Hit"}],"3_8":[{action:"Hit"}],"3_9":[{action:"Hit"}],"3_10":[{action:"Hit"}],"3_1":[{action:"Hit"}],"4_2":[{canSplit:!0,DAS:!0,action:"Split"},{action:"Hit"}],"4_3":[{canSplit:!0,DAS:!0,action:"Split"},{action:"Hit"}],"4_4":[{canSplit:!0,action:"Split"},{action:"Hit"}],"4_5":[{isSoft:!0,canDouble:!0,action:"Double"},{canSplit:!0,action:"Split"},{action:"Hit"}],"4_6":[{isSoft:!0,canDouble:!0,action:"Double"},{canSplit:!0,action:"Split"},{action:"Hit"}],"4_7":[{canSplit:!0,action:"Split"},{action:"Hit"}],"4_8":[{action:"Hit"}],"4_9":[{action:"Hit"}],"4_10":[{action:"Hit"}],"4_1":[{action:"Hit"}],"5_2":[{action:"Hit"}],"5_3":[{action:"Hit"}],"5_4":[{isSoft:!0,canDouble:!0,action:"Double"},{action:"Hit"}],"5_5":[{isSoft:!0,canDouble:!0,action:"Double"},{action:"Hit"}],"5_6":[{isSoft:!0,canDouble:!0,action:"Double"},{action:"Hit"}],"5_7":[{action:"Hit"}],"5_8":[{action:"Hit"}],"5_9":[{action:"Hit"}],"5_10":[{action:"Hit"}],"5_1":[{action:"Hit"}],"6_2":[{canSplit:!0,DAS:!0,action:"Split"},{action:"Hit"}],"6_3":[{canSplit:!0,DAS:!0,action:"Split"},{action:"Hit"}],"6_4":[{isSoft:!0,canDouble:!0,action:"Double"},{canSplit:!0,action:"Split"},{action:"Hit"}],"6_5":[{isSoft:!0,canDouble:!0,action:"Double"},{canSplit:!0,action:"Split"},{action:"Hit"}],"6_6":[{isSoft:!0,canDouble:!0,action:"Double"},{canSplit:!0,action:"Split"},{action:"Hit"}],"6_7":[{canSplit:!0,action:"Split"},{action:"Hit"}],"6_8":[{action:"Hit"}],"6_9":[{action:"Hit"}],"6_10":[{action:"Hit"}],"6_1":[{action:"Hit"}],"7_2":[{action:"Hit"}],"7_3":[{isSoft:!0,canDouble:!0,action:"Double"},{action:"Hit"}],"7_4":[{isSoft:!0,canDouble:!0,action:"Double"},{action:"Hit"}],"7_5":[{isSoft:!0,canDouble:!0,action:"Double"},{action:"Hit"}],"7_6":[{isSoft:!0,canDouble:!0,action:"Double"},{action:"Hit"}],"7_7":[{action:"Hit"}],"7_8":[{action:"Hit"}],"7_9":[{action:"Hit"}],"7_10":[{action:"Hit"}],"7_1":[{action:"Hit"}],"8_2":[{isSoft:!0,canDouble:!0,action:"Double"},{isSoft:!0,action:"Stand"},{action:"Hit"}],"8_3":[{isSoft:!0,canDouble:!0,action:"Double"},{isSoft:!0,action:"Stand"},{action:"Hit"}],"8_4":[{isSoft:!0,canDouble:!0,action:"Double"},{isSoft:!0,action:"Stand"},{action:"Hit"}],"8_5":[{isSoft:!0,canDouble:!0,action:"Double"},{isSoft:!0,action:"Stand"},{canSplit:!0,DAS:!0,action:"Split"},{action:"Hit"}],"8_6":[{isSoft:!0,canDouble:!0,action:"Double"},{isSoft:!0,action:"Stand"},{canSplit:!0,DAS:!0,action:"Split"},{action:"Hit"}],"8_7":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"8_8":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"8_9":[{action:"Hit"}],"8_10":[{action:"Hit"}],"8_1":[{action:"Hit"}],"9_2":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"9_3":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"9_4":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"9_5":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"9_6":[{isSoft:!0,canDouble:!0,action:"Double"},{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"9_7":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"9_8":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"9_9":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"9_10":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"9_1":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"10_2":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"10_3":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"10_4":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"10_5":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"10_6":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"10_7":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"10_8":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"10_9":[{isSoft:!0,action:"Stand"},{canDouble:!0,action:"Double"},{action:"Hit"}],"10_10":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"10_1":[{isSoft:!0,action:"Stand"},{action:"Hit"}],"11_2":[{canDouble:!0,action:"Double"},{action:"Hit"}],"11_3":[{canDouble:!0,action:"Double"},{action:"Hit"}],"11_4":[{canDouble:!0,action:"Double"},{action:"Hit"}],"11_5":[{canDouble:!0,action:"Double"},{action:"Hit"}],"11_6":[{canDouble:!0,action:"Double"},{action:"Hit"}],"11_7":[{canDouble:!0,action:"Double"},{action:"Hit"}],"11_8":[{canDouble:!0,action:"Double"},{action:"Hit"}],"11_9":[{canDouble:!0,action:"Double"},{action:"Hit"}],"11_10":[{canDouble:!0,action:"Double"},{action:"Hit"}],"11_1":[{canDouble:!0,action:"Double"},{action:"Hit"}],"12_2":[{canSplit:!0,DAS:!0,action:"Split"},{action:"Hit"}],"12_3":[{canSplit:!0,action:"Split"},{action:"Hit"}],"12_4":[{canSplit:!0,action:"Split"},{action:"Stand"}],"12_5":[{canSplit:!0,action:"Split"},{action:"Stand"}],"12_6":[{canSplit:!0,action:"Split"},{action:"Stand"}],"12_7":[{action:"Hit"}],"12_8":[{action:"Hit"}],"12_9":[{action:"Hit"}],"12_10":[{action:"Hit"}],"12_1":[{action:"Hit"}],"13_2":[{action:"Stand"}],"13_3":[{action:"Stand"}],"13_4":[{action:"Stand"}],"13_5":[{action:"Stand"}],"13_6":[{action:"Stand"}],"13_7":[{action:"Hit"}],"13_8":[{action:"Hit"}],"13_9":[{action:"Hit"}],"13_10":[{action:"Hit"}],"13_1":[{action:"Hit"}],"14_2":[{canSplit:!0,action:"Split"},{action:"Stand"}],"14_3":[{canSplit:!0,action:"Split"},{action:"Stand"}],"14_4":[{canSplit:!0,action:"Split"},{action:"Stand"}],"14_5":[{canSplit:!0,action:"Split"},{action:"Stand"}],"14_6":[{canSplit:!0,action:"Split"},{action:"Stand"}],"14_7":[{canSplit:!0,action:"Split"},{action:"Hit"}],"14_8":[{action:"Hit"}],"14_9":[{action:"Hit"}],"14_10":[{action:"Hit"}],"14_1":[{action:"Hit"}],"15_2":[{action:"Stand"}],"15_3":[{action:"Stand"}],"15_4":[{action:"Stand"}],"15_5":[{action:"Stand"}],"15_6":[{action:"Stand"}],"15_7":[{action:"Hit"}],"15_8":[{action:"Hit"}],"15_9":[{action:"Hit"}],"15_10":[{canSurrender:!0,action:"Surrender"},{action:"Hit"}],"15_1":[{canSurrender:!0,action:"Surrender"},{action:"Hit"}],"16_2":[{canSplit:!0,action:"Split"},{action:"Stand"}],"16_3":[{canSplit:!0,action:"Split"},{action:"Stand"}],"16_4":[{canSplit:!0,action:"Split"},{action:"Stand"}],"16_5":[{canSplit:!0,action:"Split"},{action:"Stand"}],"16_6":[{canSplit:!0,action:"Split"},{action:"Stand"}],"16_7":[{canSplit:!0,action:"Split"},{action:"Hit"}],"16_8":[{canSplit:!0,action:"Split"},{action:"Hit"}],"16_9":[{canSplit:!0,action:"Split"},{canSurrender:!0,action:"Surrender"},{action:"Hit"}],"16_10":[{canSplit:!0,action:"Split"},{canSurrender:!0,action:"Surrender"},{action:"Hit"}],"16_1":[{canSurrender:!0,action:"Surrender"},{canSplit:!0,action:"Split"},{action:"Hit"}],"17_2":[{action:"Stand"}],"17_3":[{action:"Stand"}],"17_4":[{action:"Stand"}],"17_5":[{action:"Stand"}],"17_6":[{action:"Stand"}],"17_7":[{action:"Stand"}],"17_8":[{action:"Stand"}],"17_9":[{action:"Stand"}],"17_10":[{action:"Stand"}],"17_1":[{canSurrender:!0,action:"Surrender"},{action:"Stand"}],"18_2":[{canSplit:!0,action:"Split"},{action:"Stand"}],"18_3":[{canSplit:!0,action:"Split"},{action:"Stand"}],"18_4":[{canSplit:!0,action:"Split"},{action:"Stand"}],"18_5":[{canSplit:!0,action:"Split"},{action:"Stand"}],"18_6":[{canSplit:!0,action:"Split"},{action:"Stand"}],"18_7":[{action:"Stand"}],"18_8":[{canSplit:!0,action:"Split"},{action:"Stand"}],"18_9":[{canSplit:!0,action:"Split"},{action:"Stand"}],"18_10":[{action:"Stand"}],"18_1":[{action:"Stand"}],"19_2":[{action:"Stand"}],"19_3":[{action:"Stand"}],"19_4":[{action:"Stand"}],"19_5":[{action:"Stand"}],"19_6":[{action:"Stand"}],"19_7":[{action:"Stand"}],"19_8":[{action:"Stand"}],"19_9":[{action:"Stand"}],"19_10":[{action:"Stand"}],"19_1":[{action:"Stand"}],"20_2":[{action:"Stand"}],"20_3":[{action:"Stand"}],"20_4":[{action:"Stand"}],"20_5":[{action:"Stand"}],"20_6":[{action:"Stand"}],"20_7":[{action:"Stand"}],"20_8":[{action:"Stand"}],"20_9":[{action:"Stand"}],"20_10":[{action:"Stand"}],"20_1":[{action:"Stand"}]},kw={class:"action-section","aria-label":"Player actions"},Dw=["disabled"],Ow={key:1,class:"action-section__content action-section__actions"},Nw=["disabled","onClick"],xw=Be({__name:"ActionSection",setup(t){const e=be(!1),n=be(!1),r=be(!1),s=Cw(),i=Pf(),o=Rf,a=u=>{try{const d=Tw(fe.getInstance(),Pw);d.includes(u)||console.log(`Incorrect action chosen: ${u}. Recommended actions: ${Array.from(new Set(d)).join(", ")}`)}catch(d){console.error("Error determining correct action:",d)}s.triggerAction(u)},c=()=>{if(r.value){s.reshuffle();return}s.play()};function l(){const u=fe.getInstance().table;if(r.value=i.pastPenetration,n.value=!u.validateRoundCanStart(),!u.aPlayerHasCards){e.value=!1;return}const d=u.activeChair;if(!d||!d.activeHand)return;e.value=!0;const g=d.listViableActions();g&&s.setMany(g)}return K.on(at("chair","activeHandIndex"),u=>{l()}),K.on($t("hand",nr),u=>{l()}),K.on(at("chair","bet"),u=>{l()}),K.on(at("table","chairTurnIndex"),u=>{l()}),K.on(at("table","runningCount"),u=>{l()}),K.on($t("table",zn),u=>{l()}),K.on(at("dealer","dealIndex"),u=>{l()}),(u,d)=>(Z(),ce("section",kw,[e.value?(Z(),ce("div",Ow,[(Z(!0),ce(Ue,null,Hr(Re(o),f=>(Z(),ce("button",{key:f,class:"action-section__button",type:"button",disabled:!Re(s).isEnabled(f),onClick:g=>a(f)},ze(f),9,Nw))),128))])):(Z(),ce("button",{key:0,class:"action-section__play action-section__content",type:"button",disabled:!n.value&&!r.value,onClick:d[0]||(d[0]=f=>c())},ze(r.value?"Reshuffle":"Play"),9,Dw))]))}}),Mw=Qe(xw,[["__scopeId","data-v-a2f41c24"]]),Lw={class:"dealer-section","aria-label":"Dealer hand"},Hw={class:"dealer-section__count","aria-live":"polite"},Uw={class:"dealer-section__count-value"},Bw={class:"dealer-section__content"},Fw={class:"dealer-shoe","aria-label":"Remaining shoe"},$w={class:"dealer-shoe__track"},Vw=Be({__name:"DealerSection",setup(t){const e=Pf(),n=W(()=>360),r=W(()=>e.holeCardHidden),s=W(()=>{if(!r.value)return e.cards;const[a,...c]=e.cards;return a?[a,{},...c.slice(1)]:[]}),i=W(()=>{const a=e.totalShoeSize||1,c=a>0?e.remainingShoeSize/a:0;return Math.max(0,Math.min(100,Math.round(c*100)))}),o=W(()=>{const a=e.runningCount;return`${a>0?"+":""}${a}`});return(a,c)=>(Z(),ce("section",Lw,[ie("div",Hw,[c[0]||(c[0]=ri(" Running Count: ",-1)),ie("span",Uw,ze(o.value),1)]),ie("div",Bw,[ie("div",Fw,[ie("div",$w,[ie("div",{class:"dealer-shoe__fill",style:jt({height:`${i.value}%`})},null,4)])]),Pe(ms,{cards:s.value,maxWidth:n.value,large:""},null,8,["cards","maxWidth"])])]))}}),jw=Qe(Vw,[["__scopeId","data-v-d78c6833"]]),Ww={class:"table-upper"},Gw={class:"table-lower"},Kw=Be({__name:"Table",setup(t){const e=_a(),n=[0,1,2];return(r,s)=>(Z(),ce(Ue,null,[ie("div",Ww,[Pe(jw),Pe(Mw)]),ie("div",Gw,[(Z(),ce(Ue,null,Hr(n,i=>(Z(),ce(Ue,{key:i},[Re(e).getChairView(i)?(Z(),Ft(fw,{key:0,"chair-id":i},null,8,["chair-id"])):(Z(),Ft(vw,{key:1,"chair-id":i},null,8,["chair-id"]))],64))),64))]),Pe(Ew)],64))}}),zw=Qe(Kw,[["__scopeId","data-v-19cbb27a"]]),qw={class:"home-shell"},Jw=Be({__name:"HomeView",setup(t){return(e,n)=>(Z(),ce("div",qw,[Pe(oI),Pe(zw)]))}}),Yw=Qe(Jw,[["__scopeId","data-v-5c61b5e6"]]),Xw={class:"finish-shell"},Qw={id:"status-message",class:"finish-shell__status"},Zw=Be({__name:"FinishSignUp",setup(t){const e=be("Checking link…"),n=be(""),r=async()=>{const s=Co(),i=(window.localStorage.getItem(Or)||"").trim();if(!i){e.value="Failed to finish signing in. Please request a new link and try again.";return}try{e.value="Verifying sign-in link…";const o=await tb(s,i,n.value||window.location.href);window.localStorage.removeItem(Or);const a=ab(o);console.log("Firebase sign-in complete",{user:o.user,providerId:a?.providerId,isNewUser:a?.isNewUser,profile:a?.profile}),e.value=`Welcome back${a?.profile?", profile info logged in console.":"!"} Signed in as ${o.user.email??i}.`}catch(o){console.error("Failed to finish email link sign-in",o),e.value="Failed to finish signing in. Please request a new link and try again."}};return ei(()=>{const s=Co(),i=window.location.href;if(n.value=i,!eb(s,i)){e.value="Invalid or expired sign-in link. Request a new one from the app.";return}if(window.localStorage.getItem(Or)){r();return}}),(s,i)=>(Z(),ce("main",Xw,[i[0]||(i[0]=ie("h1",null,"Completing Sign In…",-1)),ie("p",Qw,ze(e.value),1)]))}}),eE=Qe(Zw,[["__scopeId","data-v-ce4d425a"]]),tE=gm({history:qg("/bjk/"),routes:[{path:"/",name:"home",component:Yw},{path:"/finishSignUp",name:"finish-sign-up",component:eE}]}),nE=t=>{rE(t),sE(t)};function rE(t){K.on(On(yr),e=>{if(!e.action||!OI(e.action)){console.error("failing to act on invalid action",e);return}t.act(e.action)})}function sE(t){K.on(On(Do),e=>{t.startRound()})}class kf{constructor(e){this.balance=e}addMoney(e){this.balance+=e}removeMoney(e){this.balance-=e}}_i(kf,{model:"player",props:["balance"],trackInstance:!1});function iE(){const t=new Aw,e=TI(t.deckCount),n=new ma,r=new es(e);r.shuffle(),r.resetDealIndex();const s=new Tf(r,n,[],{logAfterAction:!1});return nE(s),fe.initialize({player:new kf(1e5),rules:t,table:s}),fe.getInstance()}iE();const va=ng(mm);va.use(ig());va.use(tE);va.mount("#app");
