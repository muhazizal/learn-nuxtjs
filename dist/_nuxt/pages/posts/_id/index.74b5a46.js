(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{229:function(t,e,o){var content=o(244);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(10).default)("3ae8a32c",content,!0,{sourceMap:!1})},243:function(t,e,o){"use strict";var n=o(229);o.n(n).a},244:function(t,e,o){(e=o(9)(!1)).push([t.i,".single-post-page[data-v-ffa9e0c0]{padding:30px;text-align:center;box-sizing:border-box}.post[data-v-ffa9e0c0]{width:100%}@media (min-width:768px){.post[data-v-ffa9e0c0]{width:600px;margin:auto}}.post-title[data-v-ffa9e0c0]{margin:0}.post-details[data-v-ffa9e0c0]{padding:10px;box-sizing:border-box;border-bottom:3px solid #ccc;display:flex;justify-content:center;align-items:center;flex-direction:column}@media (min-width:768px){.post-details[data-v-ffa9e0c0]{flex-direction:row}}.post-detail[data-v-ffa9e0c0]{color:#585858;margin:0 10px}.post-feedback a[data-v-ffa9e0c0]{color:red;text-decoration:none}.post-feedback a[data-v-ffa9e0c0]:active,.post-feedback a[data-v-ffa9e0c0]:hover{color:salmon}",""]),t.exports=e},254:function(t,e,o){"use strict";o.r(e);o(38),o(20),o(21),o(11),o(30);var n=o(17);o(48);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function r(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d={asyncData:function(t){return t.payload?{loadedPost:t.payload.postData}:t.app.$axios.$get("/posts/".concat(t.params.id,".json")).then((function(data){return{loadedPost:r({},data)}})).catch((function(t){return console.log(t)}))}},l=(o(243),o(2)),component=Object(l.a)(d,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"single-post-page"},[o("section",{staticClass:"post"},[o("h1",{staticClass:"post-title"},[t._v(t._s(t.loadedPost.title))]),t._v(" "),o("div",{staticClass:"post-details"},[o("div",{staticClass:"post-detail"},[t._v("\n        Last updated on "+t._s(t._f("date")(t.loadedPost.updatedDate))+"\n      ")]),t._v(" "),o("div",{staticClass:"post-detail"},[t._v("Written by "+t._s(t.loadedPost.author))])]),t._v(" "),o("p",{staticClass:"post-content"},[t._v(t._s(t.loadedPost.content))])]),t._v(" "),t._m(0)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"post-feedback"},[e("p",[this._v("\n      Let me know what you think about the post, send a mail to\n      "),e("a",{attrs:{href:"mailto:muhazizal@gmail.com",target:"_blank"}},[this._v("muhazizal@gmail.com")])])])}],!1,null,"ffa9e0c0",null);e.default=component.exports}}]);