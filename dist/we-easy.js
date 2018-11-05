!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(window,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var r=function(t,e){return Object.assign({},t,e)},i=function(t,e){let n=[t,e].filter(Boolean);return n.length?(n.forEach(t=>{if(t&&"function"!=typeof t)throw new Error('The "compute" property value must be a function.')}),function(){let t=Array.from(arguments);return n.reduce((e,n)=>{let r=n.apply(this,t);if(r){if("object"!=typeof r)throw new Error('The "compute" function must return an object value.');e=Object.assign(e,r)}return e},{})}):()=>{}},o=function(t,e){return function(){let n=arguments,r=t=>{let e=typeof t;if("function"===e)return t.apply(this,n);if("string"===e)return r(this[e]);if(Array.isArray(t)){let e;return t.forEach(t=>e=r(t)),e}},i=[];return e&&i.push(e),t&&i.push(t),r(i)}};function a(t,e){return Object.keys(e).forEach(n=>{let a=e[n];"compute"===n?t[n]=i(a,t[n]):"function"==typeof a?t[n]=o(a,t[n]):"object"==typeof a&&(t[n]=r(a,t[n]))}),t}var u=function(t,e,n){let r=n?t=>(function(t,e){return Object.keys(e).forEach(n=>{let r=t[n];if(void 0!==r){let i=e[n];t[i]=r,delete t[n]}}),t})(t,n):t=>t,i={};return e&&e.forEach(t=>a(i,r(t))),a(i,r(t)),i};const s=new Set(["string","number","boolean","undefined","symbol"]),f=new Set([null]);function l(t){return s.has(typeof t)||f.has(t)}function c(t,e,n=!0){if(l(t)||l(e))return function(t,e){return t===e?void 0:t}(t,e);if(Array.isArray(t)||Array.isArray(e))return function(t,e,n){if(!t||!e)return t;if(t.length!==e.length)return t;let r=Object.keys(t),i=new Set(Object.keys(e));return r.length!=i.size?t:r.every(r=>!!i.has(r)&&void 0===c(t[r],e[r],n))?void 0:t}(t,e,n);let r={},i=!1;return Object.keys(t).forEach(o=>{let a=t[o],u=e[o];a!==u&&(n&&void 0===c(a,u,!0)||(i=!0,r[o]=a))}),i?r:void 0}var h=c;let d=0;var p=function(){let t=++d;Object.defineProperty(this,"$uid",{get:()=>t});let{$getOption:e,setData:n}=this;if(!e||!n)return;let{beforeMount:r,beforeUpdate:i,updated:o}=this.$getOption(),a=null,u=t=>{o&&(t=t||this.$getMergedData(),a||(a={},wx.nextTick(t=>{let e=a;a=null,o.call(this,e)})),Object.assign(a,t))};Object.defineProperty(this,"$notifyUpdated",{get:()=>u});let s=(t,e)=>{i&&i.call(this,t),n.call(this,t,e),this.$updateDataProxify&&this.$updateDataProxify(t),u(t)},f=null,l=[],c=(t,e)=>{f||(f={},wx.nextTick(t=>{let e=f,n=l;f=null,l=[];let r=h(e,this.data);void 0!==r&&s(r,function(){let t=arguments;n.forEach(e=>e.apply(this,t))}.bind(this))})),Object.assign(f,t),e&&l.push(e)};Object.defineProperty(this,"setData",{get(){return function(t,e,n=!1){t&&(n?s:c)(t,e)}.bind(this)}}),r&&r.call(this)},y=function(){if(!this.$getOption)return;let{mounted:t}=this.$getOption();t&&t.call(this)};const b={},g=[];function m(t){(t=t||{}).mixins=[{onLoad:p,onReady:y},...g,...t.mixins||[]];let e=u(t,t.mixins,b),{methods:n}=e;n&&delete(e={...e,...n}).methods,e.$getOption=(()=>e),e.$getMergedData=function(){return Object.assign({},this.data)};let{beforeCreate:r}=e;return"function"==typeof r&&r(e),Page(e)}Object.defineProperty(m,"mixin",{get:()=>t=>g.push(t)}),Object.defineProperty(Page,"define",{get:()=>m});Page;const j={props:"properties"},O=[];function v(t){(t=t||{}).mixins=[{attached:p,ready:y},{beforeCreate(t){let{properties:e,watch:n,compute:r}=t;e&&(n||r)&&Object.keys(e).forEach(t=>{let n=e[t];if(n){"object"!=typeof n&&(n={type:n});let{observer:e}=n;n.observer=((t,e)=>(function(n){"string"==typeof e&&(e=this[e]),e.apply(this,arguments);let r={};r[t]=n,this.$notifyUpdated&&this.$notifyUpdated(r)}))(t,e)}})}},...O,...t.mixins||[]];let e=u(t,t.mixins,j);e.methods=e.methods||{},e.methods.$getOption=(()=>e),e.methods.$getMergedData=function(){return Object.assign({},this.properties,this.data)};let{beforeCreate:n}=e;return"function"==typeof n&&n(e),Component(e)}Object.defineProperty(v,"mixin",{get:()=>t=>O.push(t)}),Object.defineProperty(Component,"define",{get:()=>v});Component;function w(t,e,n){t.forEach(t=>{this.hasOwnProperty(t)||Object.defineProperty(this,t,(t=>({get(){if(e)return e.call(this,t);throw new Error(`Property "${t}" is not readable.`)},set(e){if(n)return n.call(this,t,e);throw new Error(`Property "${t}" is not writable.`)}}))(t))})}function E(t=!1){return{mounted(){this.$updateDataProxify=function(t){t=t||this.data,function(t){w.call(this,Object.keys(t),function(t){return this.data[t]},function(t,e){let n={};return n[t]=e,this.setData(n)})}.call(this,t)},this.$updateDataProxify(),t&&function(){w.call(this,Object.keys(this.properties),function(t){return this.properties[t]})}.call(this)},updated(t){this.$updateDataProxify(t)}}}var x={install:function t({WeEasyPage:e,WeEasyComponent:n}){t.installed||(t.installed=!0,e.mixin(E()),n.mixin(E(!0)))}};function P(t,e){let n=t.call(this,e);if(!n||"object"!=typeof n)throw new Error('The "compute" method should return a non-null object.');return n}function $(){let t=null,e={};return{beforeCreate(e){let{compute:n}=e;if(void 0!==n){if("function"!=typeof n)throw new Error('The "compute" option should be a method.');t=n}},mounted(){if(!t)return;let n=e=P.call(this,t,this.$getMergedData());this.setData(n,null,!0)},updated(n){if(!t)return;if(void 0===h(n,e))return;let r=P.call(this,t,this.$getMergedData());void 0!==h(r,e)&&(e=r,this.setData(r))}}}var D={install:function t({WeEasyPage:e,WeEasyComponent:n}){t.installed||(t.installed=!0,e.mixin($()),n.mixin($()))}};function k(){let t=null,e={};function n(n,r=!1){let i=this[n],o=e[n];(r||void 0!==h(i,o))&&(e[n]=i,t[n].handler.call(this,i,o))}return{beforeCreate(e){let{watch:n}=e;if(void 0!==n){if("object"!=typeof n)throw new Error('The "watch" option should be an object.');t=n}},mounted(){t&&(!function(t){Object.keys(t).forEach(e=>{let n=t[e];if(!n)throw new Error(`Invalid config for watcher "${e}".`);let r=typeof n;if("function"===r?n={handler:n}:"string"===r?n={handler:this[n]}:"string"==typeof n.handler&&(n.handler=this[n.handler]),"function"!=typeof n.handler)throw new Error(`Invalid handler function specified to watcher "${e}".`);t[e]=n})}(t),Object.keys(t).forEach(r=>{let i=t[r];e[r]=this[r],i.immediate&&n.call(this,r,!0)}))},updated(e){t&&Object.keys(e).forEach(e=>{t.hasOwnProperty(e)&&n.call(this,e)})}}}var C={install:function t({WeEasyPage:e,WeEasyComponent:n}){t.installed||(t.installed=!0,e.mixin(k()))}};n.d(e,"WeEasyPage",function(){return m}),n.d(e,"WeEasyComponent",function(){return v});const M={WeEasyPage:m,WeEasyComponent:v};Object.defineProperty(M,"use",{get(){return t=>{if(t&&"object"==typeof t&&(t=t.install),"function"!=typeof t)throw new Error("Invalid plugin value.");t(this)}}}),M.use(x),M.use(D),M.use(C);e.default=M}])});
//# sourceMappingURL=we-easy.js.map