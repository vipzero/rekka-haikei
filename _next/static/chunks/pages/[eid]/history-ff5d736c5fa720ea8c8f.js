_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[16],{"8A8B":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return u})),n.d(e,"e",(function(){return a})),n.d(e,"a",(function(){return s})),n.d(e,"f",(function(){return j})),n.d(e,"d",(function(){return d}));var r=n("cpVT");function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t){var e=new Date(t),n=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),c=String(e.getDate()).padStart(2,"0"),i=String(e.getHours()).padStart(2,"0"),o=String(e.getMinutes()).padStart(2,"0"),u=String(e.getSeconds()).padStart(2,"0");return"".concat(n,"-").concat(r,"-").concat(c," ").concat(i,":").concat(o,":").concat(u)}function u(t){return new Promise((function(e,n){var r=new Image;r.onload=function(){e(!0)},r.onerror=function(){n()},r.src=t}))}var a=function(t){return new Promise((function(e){return setTimeout(e,t)}))},s=function(t,e,n){return Math.max(e,Math.min(n,t))},j=function(t,e){return i(i({},t),{},Object(r.a)({},e,!t[e]))},d=function(t){try{new URL(t)}catch(e){return!1}return!0}},JQM2:function(t,e,n){"use strict";n.r(e);var r=n("nKUr"),c=n("soUV"),i=n("xvhg"),o=n("q1tI"),u=n("vOnD"),a=n("psZa"),s=n("MhBB"),j=n("BJnI");var d=n("cpVT"),l=n("8A8B");function b(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?b(Object(n),!0).forEach((function(e){Object(d.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function O(t){var e={};t.forEach((function(t){e[t.title]||(e[t.title]=[]),e[t.title].push(t.time)}));var n=Object.entries(e);return n.sort((function(t,e){return e[1].length-t[1].length})),n.map((function(t){var e=Object(i.a)(t,2),n=e[0],r=e[1];return r.sort((function(t,e){return t-e})),{title:n,times:r,timesStr:r.map(l.b)}}))}var h=function(t,e){if(""===t)return!0;try{return new RegExp(t,"i").exec(e)}catch(n){return e.toLowerCase().includes(t.toLowerCase())}};function p(){var t=function(){var t=Object(j.a)(),e=Object(o.useState)([]),n=e[0],r=e[1];return Object(o.useEffect)((function(){Object(s.d)(t).then((function(t){var e=t.docs.map((function(t){return t.data()}));r(e)}))}),[t]),[n]}(),e=Object(i.a)(t,1)[0];return Object(r.jsxs)("div",{children:[Object(r.jsx)("h3",{children:"\u30bf\u30b0\u30ab\u30a6\u30f3\u30c8"}),Object(r.jsx)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr"},children:e.map((function(t,e){return Object(r.jsxs)("div",{children:[Object(r.jsx)("span",{children:t.word}),Object(r.jsxs)("span",{children:["(",t.count,")"]})]},e)}))})]})}function x(t){var e=t.counts,n=t.title;return Object(r.jsxs)("div",{children:[Object(r.jsx)("h3",{children:n}),Object(r.jsxs)("table",{className:"count",children:[Object(r.jsx)("thead",{children:Object(r.jsxs)("tr",{children:[Object(r.jsx)("th",{children:"\u30bf\u30a4\u30c8\u30eb"}),Object(r.jsx)("th",{children:"\u56de\u6570"}),Object(r.jsx)("th",{children:"\u65e5\u6642"})]})}),Object(r.jsx)("tbody",{children:e.slice(0,a.a.visibleRecordLimit).map((function(t,e){return Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{children:t.title}),Object(r.jsx)("td",{children:t.times.length}),Object(r.jsx)("td",{children:Object(r.jsx)("ul",{children:t.timesStr.map((function(t){return Object(r.jsx)("li",{children:t},t)}))})})]},e)}))})]}),e.length>=100&&Object(r.jsx)("p",{children:"100\u4ef6\u307e\u3067\u306e\u307f\u8868\u793a\u3057\u3066\u3044\u307e\u3059"})]})}var v=u.b.div.withConfig({displayName:"HistoryPage__Wrap",componentId:"sc-1ia6jjq-0"})(["width:100vw;display:grid;padding:16px;table{width:100%;}table td{border-top:solid 1px;}table.hist{td:first-child{width:144px;}tr{&[data-cate='0'],&[data-cate='2'],&[data-cate='4'],&[data-cate='6'],&[data-cate='8']{td:first-child{background:#dbf7ff;}}}}table.count{td:nth-child(3){width:144px;}}"]),g=function(){var t=function(){var t=Object(o.useState)([]),e=t[0],n=t[1],r=Object(o.useState)([]),c=r[0],u=r[1],a=Object(o.useState)([]),d=a[0],b=a[1],h=Object(j.a)();return Object(o.useEffect)((function(){Object(s.f)(h).then((function(t){var e=t.docs.map((function(t){var e=t.data(),n=e.time,r=e.title,c=Object(l.b)(n);return{title:r,time:n,timeStr:c,timeCate:c.substring(12,13)}}));n(e);var r=O(e),c=O(e.map((function(t){var e=t.title.split(" - "),n=Object(i.a)(e,2),r=n[0],c=n[1]||r||"none";return f(f({},t),{},{title:c})})));u(r),b(c)}))}),[h]),[e,c,d]}(),e=Object(i.a)(t,3),n=e[0],c=e[1],u=e[2],d=Object(o.useState)(""),b=d[0],g=d[1],m=Object(o.useState)(!1),w=m[0],y=m[1],S=Object(o.useState)(0),P=S[0],_=S[1],D=n.filter((function(t){return h(b,t.title)})).slice(0,w?1e4:a.a.visibleRecordLimit);return Object(r.jsxs)(v,{children:[Object(r.jsxs)("div",{children:["\u691c\u7d22(\u6b63\u898f\u8868\u73fe)",Object(r.jsx)("input",{onChange:function(t){return g(t.target.value)}})]}),Object(r.jsxs)("p",{children:[Object(r.jsx)("button",{onClick:function(){return _(0)},children:"\u5c65\u6b74"}),Object(r.jsx)("button",{onClick:function(){return _(1)},children:"\u518d\u751f\u56de\u6570"}),Object(r.jsx)("button",{onClick:function(){return _(2)},children:"\u518d\u751f\u56de\u6570(\u66f2\u540d)"}),Object(r.jsx)("button",{onClick:function(){return _(3)},children:"\u30bf\u30b0\u30ab\u30a6\u30f3\u30c8"})]}),0===P&&Object(r.jsxs)("div",{children:[Object(r.jsx)("h3",{children:"\u5c65\u6b74"}),Object(r.jsxs)("table",{className:"hist",children:[Object(r.jsx)("thead",{children:Object(r.jsxs)("tr",{children:[Object(r.jsx)("th",{children:"\u65e5\u6642"}),Object(r.jsx)("th",{children:"\u30bf\u30a4\u30c8\u30eb"})]})}),Object(r.jsx)("tbody",{children:D.map((function(t,e){return Object(r.jsxs)("tr",{"data-cate":t.timeCate,children:[Object(r.jsx)("td",{children:t.timeStr}),Object(r.jsx)("td",{children:t.title})]},e)}))})]}),n.length>=100&&Object(r.jsxs)("p",{children:[n.length,"\u4e2d100\u4ef6\u306e\u307f\u8868\u793a\u3057\u3066\u3044\u307e\u3059"]}),Object(r.jsx)("button",{onClick:function(){return y((function(t){return!t}))},children:w?"\u96a0\u3059":"\u5168\u8868\u793a\u3059\u308b"})]}),1===P&&Object(r.jsx)(x,{title:"\u518d\u751f\u56de\u6570",counts:c.filter((function(t){return h(b,t.title)}))}),2===P&&Object(r.jsx)(x,{title:"\u518d\u751f\u56de\u6570(\u66f2\u540d)",counts:u.filter((function(t){return h(b,t.title)}))}),3===P&&Object(r.jsx)(p,{})]})};e.default=function(){return Object(r.jsx)(c.a,{title:"\u5c65\u6b74 - vipstream",children:Object(r.jsx)(g,{})})}},cpVT:function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return r}))},eWD5:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[eid]/history",function(){return n("JQM2")}])},rg98:function(t,e,n){"use strict";function r(t,e,n,r,c,i,o){try{var u=t[i](o),a=u.value}catch(s){return void n(s)}u.done?e(a):Promise.resolve(a).then(r,c)}function c(t){return function(){var e=this,n=arguments;return new Promise((function(c,i){var o=t.apply(e,n);function u(t){r(o,c,i,u,a,"next",t)}function a(t){r(o,c,i,u,a,"throw",t)}u(void 0)}))}}n.d(e,"a",(function(){return c}))}},[["eWD5",1,0,4,6,3,2,5,8]]]);