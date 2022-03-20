module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ({

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var md = '# 我是一级标题\n' + '## 我是二级标题\n' + '### 我是三级标题\n' + '[**Showdown**](http://www.showdownjs.com) is *great*\n' + '\nbecause:\n' + ' - it\'s easy to use\n' + ' - it\'s extensible\n' + ' - works in the server and in the browser';

var html = '\n<head>\n  <meta chatset="utf-8" />\n  <title>test...</title>\n  <style>\n    .test {color: "red";}\n    div {font-size: "12px";}\n  </style>\n  <script>console.log(\'test\');</script>\n</head>\n<div style="margin: 10px 0 10px;">\n  <b>* blockquote\u6807\u7B7E</b>\n</div>\n<blockquote>\r\n<p>std::string&nbsp; abc [] = {"test","test2","test3","test4"};</p>\r\n</blockquote>\n<div style="margin: 10px 0 10px;">\n  <b>* code\u6807\u7B7E</b>\n</div>\n<pre>\n<code lang="bash">\n#!/bin/bash\n\necho "Hello World!"\n</code>\n</pre>\n<pre>\n<code lang="xml">\n<div>\ncsonchen\n</div>  \n</code>\n</pre>\n<pre class="language-c">\n<code lang="c">\n// C++11 \n\n#include &lt;vector&gt;\n#include &lt;string&gt;\n\nstd::vector vs {"a", "be", "see"}; \nstd::size_t length = vs.size();\n</code>\n</pre>\n<pre>\n<code lang="c++" style="margin-bottom: 10px;">//C++11\r\n\r\ntemplate &lt; typename T, std::size_t N &gt;\r\nconstexpr std::size_t size( T(&amp;)[N] ) { return N ; }\r\n\r\n\r\nstd::cout &lt;&lt; "array \'abc\' size: " &lt;&lt; size(abc) &lt;&lt; \' \' ;</code>\n<code lang="javascript">\nconst name = \'csonchen\'\nconst test = () => {\nreturn name\n}\ntest()\n</code>\n</pre>\n<div style="margin: 10px 0 10px;">\n  <b>* \u5B57\u4F53\u6807\u7B7E</b>\n</div>\n<h1>h1</h1>\n<h2>h2</h2>\n<h3>h3</h3>\n<h4>h4</h4>\n\n<div style="margin: 10px 0 10px;">\n  <b>* video\u6807\u7B7E</b>\n</div>\n<video src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"></video>\n\n<div style="margin: 10px 0 10px;">\n  <b>* audio\u6807\u7B7E</b>\n</div>\n<audio title="\u6211\u662F\u6807\u9898" desc="\u6211\u662F\u5C0F\u6807\u9898" src="https://media.lycheer.net/lecture/25840237/5026279_1509614610000.mp3?0.1"></audio>\n\n<p style="margin: 10px 0 10px;">\n  <b>* p\u6807\u7B7E</b>\n</p>\n<p>\u4F60\u53EF\u4EE5\u60F3\u8C61\u8FD9\u91CC\u6709\u4E00\u4E2ADOM\u6620\u5C04\u5668\uFF0C\u89C1\u540D\u77E5\u4E49\uFF0C\u8FD9\u4E2A\u2019DOM \u6620\u5C04\u5668\u2018\u7684\u5DE5\u4F5C\u5C31\u662F\u5C06 Virtual-DOM \u5BF9\u8C61\u6811\u6620\u5C04\u6D4F\u89C8\u5668\u9875\u9762\u7684 DOM\uFF0C\u53EA\u4E0D\u8FC7\u4E3A\u4E86\u63D0\u9AD8 DOM \u7684\'\u64CD\u4F5C\u6027\u80FD\'. \u5B83\u4E0D\u662F\u6BCF\u4E00\u6B21\u90FD\u5168\u91CF\u6E32\u67D3\u6574\u4E2A Virtual-DOM \u6811\uFF0C\u800C\u662F\u652F\u6301\u63A5\u6536\u4E24\u9897 Virtual-DOM \u5BF9\u8C61\u6811(\u4E00\u4E2A\u66F4\u65B0\u524D\uFF0C\u4E00\u4E2A\u66F4\u65B0\u540E), \u901A\u8FC7 diff \u7B97\u6CD5\u8BA1\u7B97\u51FA\u4E24\u9897 Virtual-DOM \u6811\u5DEE\u5F02\u7684\u5730\u65B9\uFF0C\u7136\u540E\u53EA\u5E94\u7528\u8FD9\u4E9B\u5DEE\u5F02\u7684\u5730\u65B9\u5230\u5B9E\u9645\u7684 DOM \u6811, \u4ECE\u800C\u51CF\u5C11 DOM \u53D8\u66F4\u7684\u6210\u672C.</p>\n\n<div style="margin: 10px 0 10px;">\n<b>* \u8F6C\u4E49\u5B57\u7B26</b>\n</div>&lt;div style=&quot;color:red&quot;&gt;\u6211\u662F\u8F6C\u4E49\u5B57\u7B26&lt;/div&gt; \n\n<div style="margin: 10px 0 10px;">\n<b>* a\u6807\u7B7E\u8DF3\u8F6C</b>\n</div> \n<div>\n  <a href="https://www.baidu.com" title="\u6211\u662F\u5916\u94FE\u8DF3\u8F6C" target="_blank">a\u6807\u7B7E\u8DF3\u8F6C\uFF08\u5916\u94FE\u8DF3\u8F6C\uFF09</a>&nbsp; \n</div>\n<div>\n  <a href="/pages/highLightPage/highLightPage" title="\u6211\u662F\u5185\u94FE\u8DF3\u8F6C" target="_blank">a\u6807\u7B7E\u8DF3\u8F6C\uFF08\u5185\u94FE\u8DF3\u8F6C\uFF09</a>&nbsp; \n</div>\n\n<div style="margin: 10px 0 10px;">\n<b>* \u5185\u8054\u6807\u7B7E</b>\n</div> \n<span style="background-color: rgb(139, 170, 74);">\u6211\u662F\u5185\u8054\u6807\u7B7E</span>\n<br />\n<p></p>\n<p></p>\n\n<div style="margin: 10px 0 10px;">\n<b>* ul\u65E0\u5E8F\u5217\u8868</b>\n</div>\n<ul>\n<li style="text-align: center;"><span style="background-color: rgb(139, 170, 74);">1</span></li>\n</ul>\n\n<div style="margin: 10px 0 10px;">\n<b>* ol\u6709\u5E8F\u5217\u8868</b>\n</div>\n<ol>\n<li><font style="vertical-align: inherit;">\u5F20\u4E09</font></li>\n<li><font style="vertical-align: inherit;">\u674E\u56DB</font></li>\n</ol>\n<ol>\n<li style="text-align: center;"><span style="background-color: rgb(139, 170, 74);">test</span></li>\n<li><span style="background-color: rgb(139, 170, 74);">test2</span></li>\n</ol>\n\n<div style="margin: 10px 0 10px;">\n<b>* hr\u6807\u7B7E</b>\n<hr />\n</div>\n\n<div style="margin: 10px 0 10px;">\n<b>* \u8868\u683C\u6E32\u67D3</b>\n</div>\n<table>\n  <tr>\n    <th>\u6807\u98981</th>\n    <th>\u6807\u98982</th>\n    <th>\u6807\u98983</th>\n    <th>\u6807\u98984</th>\n    <th>\u6807\u98985</th>\n  </tr>\n  <tr>\n    <td>cell1</td>\n    <td>cell2</td>\n    <td>cell3</td>\n    <td>cell4</td>\n    <td>cell5</td>\n  </tr>\n  <tr>\n    <td>cell1</td>\n    <td>cell2</td>\n    <td>cell3</td>\n    <td>cell4</td>\n    <td>cell5</td>\n  </tr>\n</table>\n\n<div style="margin: 10px 0 10px;">\n<b>* \u56FE\u7247\u6E32\u67D3</b>\n</div>\n<p><img src="https://dev-sit-1251698455.cos.ap-guangzhou.myqcloud.com/ds/22/363/20200401/3c9e7798e3204756b9e0f3263882b81f.jpeg" /><img src="https://mmbiz.qpic.cn/mmbiz_png/1gmcynicwloGkVMTr6wTHdDXlFUSaSxOSRELianAFGJYVzvXJKoM2xbbFMqKe6ONy5zoHHejNbibTJn5gdEOc1aIA/0?wx_fmt=png" width="200" height="100" style="text-align: center;margin: 0 auto;"/></p>\n';

var jsCode = 'init = jQuery.fn.init = function( selector, context, root ) {\n  var match, elem;\n\n  // v1.4\u4E4B\u540E\uFF0C\u53EF\u4EE5\u521B\u5EFA\u4E0D\u5305\u542B\u4EFB\u4F55DOM\u8282\u70B9\u7684\u7A7AjQuery\u5BF9\u8C61\n  if ( !selector ) {\n    return this\n  }\n\n  // \u5904\u7406\u5B57\u7B26\u4E32\n  if ( typeof selector === \'string\' ) {\n    // \u5904\u7406 HTML \u5B57\u7B26\u4E32\n    if ( selector[ 0 ] === \'<\' && selector[ selector.length - 1 ] === \'>\' && selector.length >= 3) {\n        // ....\n\n    // \u5176\u5B83\u5B57\u7B26\u4E32\uFF0C\u5F53\u505A\u9009\u62E9\u5668\u5904\u7406    \n    } else {\n      match = rquickExpr.exec( selector )\n    }\n\n  // \u5904\u7406 DOM \u8282\u70B9 => $(DOMElement)  \n  } else if ( selector.nodeType ) {\n    // .....\n\n  // \u5904\u7406\u51FD\u6570 => $(function)\n  } else if ( typeof selector === \'function\' ) {\n    // ....\n  }\n\n  // \u5904\u7406\u5176\u5B83\u60C5\u51B5\n  return jQuery.makeArray( selector, this )\n}';

Component({
  data: {
    codeText: jsCode,
    htmlText: html,
    mdText: md
  },

  methods: {
    handleTagATap: function handleTagATap() {}
  }
});

/***/ })

/******/ });
//# sourceMappingURL=index.js.map