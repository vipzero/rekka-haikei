_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[13],{"8A8B":function(t,n,e){"use strict";function r(t){var n=new Date(t),e=n.getFullYear(),r=String(n.getMonth()+1).padStart(2,"0"),c=String(n.getDate()).padStart(2,"0"),o=String(n.getHours()).padStart(2,"0"),i=String(n.getMinutes()).padStart(2,"0"),a=String(n.getSeconds()).padStart(2,"0");return"".concat(e,"-").concat(r,"-").concat(c," ").concat(o,":").concat(i,":").concat(a)}function c(t){return new Promise((function(n,e){var r=new Image;r.onload=function(){n(!0)},r.onerror=function(){e()},r.src=t}))}e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return c})),e.d(n,"e",(function(){return o})),e.d(n,"a",(function(){return i})),e.d(n,"d",(function(){return a}));var o=function(t){return new Promise((function(n){return setTimeout(n,t)}))},i=function(t,n,e){return Math.max(n,Math.min(e,t))},a=function(t){return 0===Object.keys(t).length}},"J/v5":function(t,n,e){"use strict";e.d(n,"a",(function(){return r}));var r=function(t){return"animeTitle"in t}},LY0y:function(t,n){(function(n){t.exports=function(){var t={880:function(t){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}}},e={};function r(n){if(e[n])return e[n].exports;var c=e[n]={exports:{}},o=!0;try{t[n](c,c.exports,r),o=!1}finally{o&&delete e[n]}return c.exports}return r.ab=n+"/",r(880)}()}).call(this,"/")},LYS7:function(t,n,e){"use strict";e.d(n,"a",(function(){return h}));var r=e("vJKn"),c=e.n(r),o=e("6FTQ");var i=e("8rE2");function a(t){return function(t){if(Array.isArray(t))return Object(o.a)(t)}(t)||function(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(i.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var u=e("rg98"),s=e("xvhg"),f=e("LvDl"),d=e.n(f),l=e("q1tI"),p=e("MhBB"),b=e("J/v5"),v=e("psZa"),m=e("8A8B");function h(){var t=Object(l.useState)(!1),n=t[0],e=t[1],r=Object(l.useState)([]),o=r[0],i=r[1],f=Object(l.useState)({icy:"",time:1,wordCounts:{},wordCountsAna:[]}),h=f[0],g=f[1];Object(l.useEffect)((function(){var t=Object(p.c)();t.collection("song").doc("current").onSnapshot((function(t){var n,r=t.data();Object(b.a)(r)&&(null===(n=r.imageLinks)||void 0===n||n.reverse());var c=Object.entries(r.wordCounts).filter((function(t){return Object(s.a)(t,1)[0]!==r.icy})).map((function(t){var n=Object(s.a)(t,2),e=n[0],r=n[1];return{name:e,count:r,label:"[".concat(e," (").concat(1===r?"\u521d":"".concat(r," \u56de\u76ee"),")]")}}));r.wordCountsAna=d.a.sortBy(c,["count"]),g(r),e(!0)})),t.collection("hist").doc(v.a.eventId).collection("songs").orderBy("time","desc").limit(10).onSnapshot((function(t){var n=t.docs.map((function(t){var n=t.data(),e=n.time,r=n.title,c=Object(m.b)(e);return{title:r,time:e,timeStr:c,timeCate:c.substring(12,13)}}));i(n)}))}),[]);var j=function(){var t=Object(u.a)(c.a.mark((function t(n){var e,r,o;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=Object(p.c)(),t.next=3,e.collection("song").doc("current").get();case 3:if(r=t.sent.data(),(o=r.imageLinks||[])[0]!==n&&o.includes(n)){t.next=7;break}return t.abrupt("return");case 7:e.collection("song").doc("current").update({imageLinks:[n].concat(a(o.filter((function(t){return t!==n}))))});case 8:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}();return[n,h,o,j]}},foW8:function(t,n,e){"use strict";e.r(n);var r=e("nKUr"),c=e("soUV"),o=e("xvhg"),i=(e("q1tI"),e("vOnD")),a=e("LYS7");function u(){var t,n=Object(a.a)(),e=Object(o.a)(n,4),c=e[0],i=e[1],u=e[3];return c?Object(r.jsx)(s,{children:null===(t=i.imageLinks)||void 0===t?void 0:t.map((function(t,n){return Object(r.jsx)("div",{onClick:function(){0!==n&&confirm("\u80cc\u666f\u3092\u5909\u66f4\u3057\u307e\u3059\u304b\uff1f")&&u(t)},children:Object(r.jsx)("img",{src:t})},"".concat(i.time,"_").concat(t))}))}):Object(r.jsx)("p",{children:"\u3061\u3087\u3063\u3068\u307e\u3063\u3066\u306d"})}var s=i.b.div.withConfig({displayName:"BgChoice__Wrap",componentId:"sc-1vgx2qd-0"})(["width:100vw;padding:16px;display:flex;flex-wrap:wrap;div{border:solid black 1px;cursor:pointer;&:first-child{border-color:red;cursor:auto;}margin:4px;padding:2px;width:200px;}img{width:100%;}"]);var f=function(){return Object(r.jsx)(u,{})};n.default=function(){return Object(r.jsx)(c.a,{title:"\u80cc\u666f\u88dc\u6b63 - vipstream",children:Object(r.jsx)(f,{})})}},rXEh:function(t,n,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/choice",function(){return e("foW8")}])},rg98:function(t,n,e){"use strict";function r(t,n,e,r,c,o,i){try{var a=t[o](i),u=a.value}catch(s){return void e(s)}a.done?n(u):Promise.resolve(u).then(r,c)}function c(t){return function(){var n=this,e=arguments;return new Promise((function(c,o){var i=t.apply(n,e);function a(t){r(i,c,o,a,u,"next",t)}function u(t){r(i,c,o,a,u,"throw",t)}a(void 0)}))}}e.d(n,"a",(function(){return c}))}},[["rXEh",1,0,4,5,7,3,2,6]]]);