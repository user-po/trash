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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
Language: C-like foundation grammar for C/C++ grammars
Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
Contributors: Evgeny Stepanischev <imbolk@gmail.com>, Zaven Muradyan <megalivoithos@gmail.com>, Roel Deckers <admin@codingcat.nl>, Sam Wu <samsam2310@gmail.com>, Jordi Petit <jordi.petit@gmail.com>, Pieter Vantorre <pietervantorre@gmail.com>, Google Inc. (David Benjamin) <davidben@google.com>
*/

/* In the future the intention is to split out the C/C++ grammars distinctly
since they are separate languages.  They will likely share a common foundation
though, and this file sets the groundwork for that - so that we get the breaking
change in v10 and don't have to change the requirements again later.
See: https://github.com/highlightjs/highlight.js/issues/2146
*/

var regex = __webpack_require__(11);

/** @type LanguageFn */
module.exports = function (hljs) {
  // added for historic reasons because `hljs.C_LINE_COMMENT_MODE` does
  // not include such support nor can we be sure all the grammars depending
  // on it would desire this behavior
  var C_LINE_COMMENT_MODE = hljs.COMMENT('//', '$', {
    contains: [{
      begin: /\\\n/
    }]
  });
  var DECLTYPE_AUTO_RE = 'decltype\\(auto\\)';
  var NAMESPACE_RE = '[a-zA-Z_]\\w*::';
  var TEMPLATE_ARGUMENT_RE = '<[^<>]+>';
  var FUNCTION_TYPE_RE = '(' + DECLTYPE_AUTO_RE + '|' + regex.optional(NAMESPACE_RE) + '[a-zA-Z_]\\w*' + regex.optional(TEMPLATE_ARGUMENT_RE) + ')';
  var CPP_PRIMITIVE_TYPES = {
    className: 'keyword',
    begin: '\\b[a-z\\d_]*_t\\b'
  };

  // https://en.cppreference.com/w/cpp/language/escape
  // \\ \x \xFF \u2837 \u00323747 \374
  var CHARACTER_ESCAPES = '\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)';
  var STRINGS = {
    className: 'string',
    variants: [{
      begin: '(u8?|U|L)?"',
      end: '"',
      illegal: '\\n',
      contains: [hljs.BACKSLASH_ESCAPE]
    }, {
      begin: '(u8?|U|L)?\'(' + CHARACTER_ESCAPES + "|.)",
      end: '\'',
      illegal: '.'
    }]
  };

  var NUMBERS = {
    className: 'number',
    variants: [{
      begin: '\\b(0b[01\']+)'
    }, {
      begin: '(-?)\\b([\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)(u|U|l|L|ul|UL|f|F|b|B)'
    }, {
      begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)'
    }],
    relevance: 0
  };

  var PREPROCESSOR = {
    className: 'meta',
    begin: /#\s*[a-z]+\b/,
    end: /$/,
    keywords: {
      'meta-keyword': 'if else elif endif define undef warning error line ' + 'pragma _Pragma ifdef ifndef include'
    },
    contains: [{
      begin: /\\\n/,
      relevance: 0
    }, hljs.inherit(STRINGS, {
      className: 'meta-string'
    }), {
      className: 'meta-string',
      begin: /<.*?>/,
      end: /$/,
      illegal: '\\n'
    }, C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE]
  };

  var TITLE_MODE = {
    className: 'title',
    begin: regex.optional(NAMESPACE_RE) + hljs.IDENT_RE,
    relevance: 0
  };

  var FUNCTION_TITLE = regex.optional(NAMESPACE_RE) + hljs.IDENT_RE + '\\s*\\(';

  var CPP_KEYWORDS = {
    keyword: 'int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof ' + 'dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace ' + 'unsigned long volatile static protected bool template mutable if public friend ' + 'do goto auto void enum else break extern using asm case typeid wchar_t ' + 'short reinterpret_cast|10 default double register explicit signed typename try this ' + 'switch continue inline delete alignas alignof constexpr consteval constinit decltype ' + 'concept co_await co_return co_yield requires ' + 'noexcept static_assert thread_local restrict final override ' + 'atomic_bool atomic_char atomic_schar ' + 'atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong ' + 'atomic_ullong new throw return ' + 'and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq',
    built_in: 'std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream ' + 'auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set ' + 'unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos ' + 'asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp ' + 'fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper ' + 'isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow ' + 'printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp ' + 'strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan ' + 'vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary',
    literal: 'true false nullptr NULL'
  };

  var EXPRESSION_CONTAINS = [PREPROCESSOR, CPP_PRIMITIVE_TYPES, C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, NUMBERS, STRINGS];

  var EXPRESSION_CONTEXT = {
    // This mode covers expression context where we can't expect a function
    // definition and shouldn't highlight anything that looks like one:
    // `return some()`, `else if()`, `(x*sum(1, 2))`
    variants: [{
      begin: /=/,
      end: /;/
    }, {
      begin: /\(/,
      end: /\)/
    }, {
      beginKeywords: 'new throw return else',
      end: /;/
    }],
    keywords: CPP_KEYWORDS,
    contains: EXPRESSION_CONTAINS.concat([{
      begin: /\(/,
      end: /\)/,
      keywords: CPP_KEYWORDS,
      contains: EXPRESSION_CONTAINS.concat(['self']),
      relevance: 0
    }]),
    relevance: 0
  };

  var FUNCTION_DECLARATION = {
    className: 'function',
    begin: '(' + FUNCTION_TYPE_RE + '[\\*&\\s]+)+' + FUNCTION_TITLE,
    returnBegin: true,
    end: /[{;=]/,
    excludeEnd: true,
    keywords: CPP_KEYWORDS,
    illegal: /[^\w\s\*&:<>]/,
    contains: [{ // to prevent it from being confused as the function title
      begin: DECLTYPE_AUTO_RE,
      keywords: CPP_KEYWORDS,
      relevance: 0
    }, {
      begin: FUNCTION_TITLE,
      returnBegin: true,
      contains: [TITLE_MODE],
      relevance: 0
    }, {
      className: 'params',
      begin: /\(/,
      end: /\)/,
      keywords: CPP_KEYWORDS,
      relevance: 0,
      contains: [C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, STRINGS, NUMBERS, CPP_PRIMITIVE_TYPES,
      // Count matching parentheses.
      {
        begin: /\(/,
        end: /\)/,
        keywords: CPP_KEYWORDS,
        relevance: 0,
        contains: ['self', C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, STRINGS, NUMBERS, CPP_PRIMITIVE_TYPES]
      }]
    }, CPP_PRIMITIVE_TYPES, C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, PREPROCESSOR]
  };

  return {
    aliases: ['c', 'cc', 'h', 'c++', 'h++', 'hpp', 'hh', 'hxx', 'cxx'],
    keywords: CPP_KEYWORDS,
    // the base c-like language will NEVER be auto-detected, rather the
    // derivitives: c, c++, arduino turn auto-detect back on for themselves
    disableAutodetect: true,
    illegal: '</',
    contains: [].concat(EXPRESSION_CONTEXT, FUNCTION_DECLARATION, EXPRESSION_CONTAINS, [PREPROCESSOR, { // containers: ie, `vector <int> rooms (9);`
      begin: '\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<',
      end: '>',
      keywords: CPP_KEYWORDS,
      contains: ['self', CPP_PRIMITIVE_TYPES]
    }, {
      begin: hljs.IDENT_RE + '::',
      keywords: CPP_KEYWORDS
    }, {
      className: 'class',
      beginKeywords: 'enum class struct union',
      end: /[{;:<>=]/,
      contains: [{
        beginKeywords: "final class struct"
      }, hljs.TITLE_MODE]
    }]),
    exports: {
      preprocessor: PREPROCESSOR,
      strings: STRINGS,
      keywords: CPP_KEYWORDS
    }
  };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hljs = __webpack_require__(2);

// 支持的解析语言列表
var LANGUAGE_LIST = ['javascript', 'css', 'xml', 'sql', 'typescript', 'markdown', 'c++', 'c'];

Component({
  properties: {
    codeText: {
      type: String,
      value: ''
    },

    language: {
      type: String,
      value: 'javascript'
    }
  },

  data: {
    code: ''
  },

  attached: function attached() {
    var _data = this.data,
        codeText = _data.codeText,
        language = _data.language;

    this.parseCode(codeText, language);
  },


  methods: {
    parseCode: function parseCode(input, language) {
      var lang = LANGUAGE_LIST.includes(language) ? language : 'javascript';

      var _hljs$highlight = hljs.highlight(lang, input),
          value = _hljs$highlight.value;

      var highlighted = value.replace('&amp;', '&').trim();

      var codeResult = '<code class="' + lang + '">' + highlighted + '</code>';
      codeResult = codeResult.replace(/\n/g, "<br/>").replace('\<code\>', '');

      this.setData({ code: codeResult });
    }
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hljs = __webpack_require__(3);

hljs.registerLanguage('javascript', __webpack_require__(4));
hljs.registerLanguage('css', __webpack_require__(5));
hljs.registerLanguage('xml', __webpack_require__(6));
hljs.registerLanguage('sql', __webpack_require__(7));
hljs.registerLanguage('typescript', __webpack_require__(8));
hljs.registerLanguage('markdown', __webpack_require__(9));
hljs.registerLanguage('c++', __webpack_require__(10));
hljs.registerLanguage('c', __webpack_require__(12));

module.exports = hljs;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
Syntax highlighting with language autodetection.
https://highlightjs.org/
*/

(function (factory) {

  // Find the global object for export to both the browser and web workers.
  var globalObject = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window || (typeof self === 'undefined' ? 'undefined' : _typeof(self)) === 'object' && self;

  // Setup highlight.js for different environments. First is Node.js or
  // CommonJS.
  // `nodeType` is checked to ensure that `exports` is not a HTML element.
  if ( true && !exports.nodeType) {
    factory(exports);
  } else if (globalObject) {
    // Export hljs globally even when using AMD for cases when this script
    // is loaded with others that may still expect a global hljs.
    globalObject.hljs = factory({});

    // Finally register the global hljs with AMD.
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return globalObject.hljs;
      }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})(function (hljs) {
  // Convenience variables for build-in objects
  var ArrayProto = [],
      objectKeys = Object.keys;

  // Global internal variables used within the highlight.js library.
  var languages = {},
      aliases = {};

  // safe/production mode - swallows more errors, tries to keep running
  // even if a single syntax or parse hits a fatal error
  var SAFE_MODE = true;

  // Regular expressions used throughout the highlight.js library.
  var noHighlightRe = /^(no-?highlight|plain|text)$/i,
      languagePrefixRe = /\blang(?:uage)?-([\w-]+)\b/i,
      fixMarkupRe = /((^(<[^>]+>|\t|)+|(?:\n)))/gm;

  // The object will be assigned by the build tool. It used to synchronize API
  // of external language files with minified version of the highlight.js library.
  var API_REPLACES;

  var spanEndTag = '</span>';
  var LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";

  // Global options used when within external APIs. This is modified when
  // calling the `hljs.configure` function.
  var options = {
    classPrefix: 'hljs-',
    tabReplace: null,
    useBR: false,
    languages: undefined
  };

  // keywords that should have no default relevance value
  var COMMON_KEYWORDS = 'of and for in not or if then'.split(' ');

  /* Utility functions */

  function escape(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function tag(node) {
    return node.nodeName.toLowerCase();
  }

  function testRe(re, lexeme) {
    var match = re && re.exec(lexeme);
    return match && match.index === 0;
  }

  function isNotHighlighted(language) {
    return noHighlightRe.test(language);
  }

  function blockLanguage(block) {
    var i, match, length, _class;
    var classes = block.className + ' ';

    classes += block.parentNode ? block.parentNode.className : '';

    // language-* takes precedence over non-prefixed class names.
    match = languagePrefixRe.exec(classes);
    if (match) {
      var language = getLanguage(match[1]);
      if (!language) {
        console.warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
        console.warn("Falling back to no-highlight mode for this block.", block);
      }
      return language ? match[1] : 'no-highlight';
    }

    classes = classes.split(/\s+/);

    for (i = 0, length = classes.length; i < length; i++) {
      _class = classes[i];

      if (isNotHighlighted(_class) || getLanguage(_class)) {
        return _class;
      }
    }
  }

  /**
   * performs a shallow merge of multiple objects into one
   *
   * @arguments list of objects with properties to merge
   * @returns a single new object
   */
  function inherit(parent) {
    // inherit(parent, override_obj, override_obj, ...)
    var key;
    var result = {};
    var objects = Array.prototype.slice.call(arguments, 1);

    for (key in parent) {
      result[key] = parent[key];
    }objects.forEach(function (obj) {
      for (key in obj) {
        result[key] = obj[key];
      }
    });
    return result;
  }

  /* Stream merging */

  function nodeStream(node) {
    var result = [];
    (function _nodeStream(node, offset) {
      for (var child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType === 3) offset += child.nodeValue.length;else if (child.nodeType === 1) {
          result.push({
            event: 'start',
            offset: offset,
            node: child
          });
          offset = _nodeStream(child, offset);
          // Prevent void elements from having an end tag that would actually
          // double them in the output. There are more void elements in HTML
          // but we list only those realistically expected in code display.
          if (!tag(child).match(/br|hr|img|input/)) {
            result.push({
              event: 'stop',
              offset: offset,
              node: child
            });
          }
        }
      }
      return offset;
    })(node, 0);
    return result;
  }

  function mergeStreams(original, highlighted, value) {
    var processed = 0;
    var result = '';
    var nodeStack = [];

    function selectStream() {
      if (!original.length || !highlighted.length) {
        return original.length ? original : highlighted;
      }
      if (original[0].offset !== highlighted[0].offset) {
        return original[0].offset < highlighted[0].offset ? original : highlighted;
      }

      /*
      To avoid starting the stream just before it should stop the order is
      ensured that original always starts first and closes last:
       if (event1 == 'start' && event2 == 'start')
        return original;
      if (event1 == 'start' && event2 == 'stop')
        return highlighted;
      if (event1 == 'stop' && event2 == 'start')
        return original;
      if (event1 == 'stop' && event2 == 'stop')
        return highlighted;
       ... which is collapsed to:
      */
      return highlighted[0].event === 'start' ? original : highlighted;
    }

    function open(node) {
      function attr_str(a) {
        return ' ' + a.nodeName + '="' + escape(a.value).replace(/"/g, '&quot;') + '"';
      }
      result += '<' + tag(node) + ArrayProto.map.call(node.attributes, attr_str).join('') + '>';
    }

    function close(node) {
      result += '</' + tag(node) + '>';
    }

    function render(event) {
      (event.event === 'start' ? open : close)(event.node);
    }

    while (original.length || highlighted.length) {
      var stream = selectStream();
      result += escape(value.substring(processed, stream[0].offset));
      processed = stream[0].offset;
      if (stream === original) {
        /*
        On any opening or closing tag of the original markup we first close
        the entire highlighted node stack, then render the original tag along
        with all the following original tags at the same offset and then
        reopen all the tags on the highlighted stack.
        */
        nodeStack.reverse().forEach(close);
        do {
          render(stream.splice(0, 1)[0]);
          stream = selectStream();
        } while (stream === original && stream.length && stream[0].offset === processed);
        nodeStack.reverse().forEach(open);
      } else {
        if (stream[0].event === 'start') {
          nodeStack.push(stream[0].node);
        } else {
          nodeStack.pop();
        }
        render(stream.splice(0, 1)[0]);
      }
    }
    return result + escape(value.substr(processed));
  }

  /* Initialization */

  function dependencyOnParent(mode) {
    if (!mode) return false;

    return mode.endsWithParent || dependencyOnParent(mode.starts);
  }

  function expand_or_clone_mode(mode) {
    if (mode.variants && !mode.cached_variants) {
      mode.cached_variants = mode.variants.map(function (variant) {
        return inherit(mode, { variants: null }, variant);
      });
    }

    // EXPAND
    // if we have variants then essentially "replace" the mode with the variants
    // this happens in compileMode, where this function is called from
    if (mode.cached_variants) return mode.cached_variants;

    // CLONE
    // if we have dependencies on parents then we need a unique
    // instance of ourselves, so we can be reused with many
    // different parents without issue
    if (dependencyOnParent(mode)) return [inherit(mode, { starts: mode.starts ? inherit(mode.starts) : null })];

    if (Object.isFrozen(mode)) return [inherit(mode)];

    // no special dependency issues, just return ourselves
    return [mode];
  }

  function restoreLanguageApi(obj) {
    if (API_REPLACES && !obj.langApiRestored) {
      obj.langApiRestored = true;
      for (var key in API_REPLACES) {
        if (obj[key]) {
          obj[API_REPLACES[key]] = obj[key];
        }
      }
      (obj.contains || []).concat(obj.variants || []).forEach(restoreLanguageApi);
    }
  }

  function compileKeywords(rawKeywords, case_insensitive) {
    var compiled_keywords = {};

    if (typeof rawKeywords === 'string') {
      // string
      splitAndCompile('keyword', rawKeywords);
    } else {
      objectKeys(rawKeywords).forEach(function (className) {
        splitAndCompile(className, rawKeywords[className]);
      });
    }
    return compiled_keywords;

    // ---

    function splitAndCompile(className, str) {
      if (case_insensitive) {
        str = str.toLowerCase();
      }
      str.split(' ').forEach(function (keyword) {
        var pair = keyword.split('|');
        compiled_keywords[pair[0]] = [className, scoreForKeyword(pair[0], pair[1])];
      });
    }
  }

  function scoreForKeyword(keyword, providedScore) {
    // manual scores always win over common keywords
    // so you can force a score of 1 if you really insist
    if (providedScore) return Number(providedScore);

    return commonKeyword(keyword) ? 0 : 1;
  }

  function commonKeyword(word) {
    return COMMON_KEYWORDS.indexOf(word.toLowerCase()) != -1;
  }

  function compileLanguage(language) {

    function reStr(re) {
      return re && re.source || re;
    }

    function langRe(value, global) {
      return new RegExp(reStr(value), 'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : ''));
    }

    function reCountMatchGroups(re) {
      return new RegExp(re.toString() + '|').exec('').length - 1;
    }

    // joinRe logically computes regexps.join(separator), but fixes the
    // backreferences so they continue to match.
    // it also places each individual regular expression into it's own
    // match group, keeping track of the sequencing of those match groups
    // is currently an exercise for the caller. :-)
    function joinRe(regexps, separator) {
      // backreferenceRe matches an open parenthesis or backreference. To avoid
      // an incorrect parse, it additionally matches the following:
      // - [...] elements, where the meaning of parentheses and escapes change
      // - other escape sequences, so we do not misparse escape sequences as
      //   interesting elements
      // - non-matching or lookahead parentheses, which do not capture. These
      //   follow the '(' with a '?'.
      var backreferenceRe = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
      var numCaptures = 0;
      var ret = '';
      for (var i = 0; i < regexps.length; i++) {
        numCaptures += 1;
        var offset = numCaptures;
        var re = reStr(regexps[i]);
        if (i > 0) {
          ret += separator;
        }
        ret += "(";
        while (re.length > 0) {
          var match = backreferenceRe.exec(re);
          if (match == null) {
            ret += re;
            break;
          }
          ret += re.substring(0, match.index);
          re = re.substring(match.index + match[0].length);
          if (match[0][0] == '\\' && match[1]) {
            // Adjust the backreference.
            ret += '\\' + String(Number(match[1]) + offset);
          } else {
            ret += match[0];
            if (match[0] == '(') {
              numCaptures++;
            }
          }
        }
        ret += ")";
      }
      return ret;
    }

    function buildModeRegex(mode) {

      var matchIndexes = {};
      var matcherRe;
      var regexes = [];
      var matcher = {};
      var matchAt = 1;

      function addRule(rule, regex) {
        matchIndexes[matchAt] = rule;
        regexes.push([rule, regex]);
        matchAt += reCountMatchGroups(regex) + 1;
      }

      var term;
      for (var i = 0; i < mode.contains.length; i++) {
        var re;
        term = mode.contains[i];
        if (term.beginKeywords) {
          re = '\\.?(?:' + term.begin + ')\\.?';
        } else {
          re = term.begin;
        }
        addRule(term, re);
      }
      if (mode.terminator_end) addRule("end", mode.terminator_end);
      if (mode.illegal) addRule("illegal", mode.illegal);

      var terminators = regexes.map(function (el) {
        return el[1];
      });
      matcherRe = langRe(joinRe(terminators, '|'), true);

      matcher.lastIndex = 0;
      matcher.exec = function (s) {
        var rule;

        if (regexes.length === 0) return null;

        matcherRe.lastIndex = matcher.lastIndex;
        var match = matcherRe.exec(s);
        if (!match) {
          return null;
        }

        for (var i = 0; i < match.length; i++) {
          if (match[i] != undefined && matchIndexes["" + i] != undefined) {
            rule = matchIndexes["" + i];
            break;
          }
        }

        // illegal or end match
        if (typeof rule === "string") {
          match.type = rule;
          match.extra = [mode.illegal, mode.terminator_end];
        } else {
          match.type = "begin";
          match.rule = rule;
        }
        return match;
      };

      return matcher;
    }

    function compileMode(mode, parent) {
      if (mode.compiled) return;
      mode.compiled = true;

      mode.keywords = mode.keywords || mode.beginKeywords;
      if (mode.keywords) mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);

      mode.lexemesRe = langRe(mode.lexemes || /\w+/, true);

      if (parent) {
        if (mode.beginKeywords) {
          mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')\\b';
        }
        if (!mode.begin) mode.begin = /\B|\b/;
        mode.beginRe = langRe(mode.begin);
        if (mode.endSameAsBegin) mode.end = mode.begin;
        if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
        if (mode.end) mode.endRe = langRe(mode.end);
        mode.terminator_end = reStr(mode.end) || '';
        if (mode.endsWithParent && parent.terminator_end) mode.terminator_end += (mode.end ? '|' : '') + parent.terminator_end;
      }
      if (mode.illegal) mode.illegalRe = langRe(mode.illegal);
      if (mode.relevance == null) mode.relevance = 1;
      if (!mode.contains) {
        mode.contains = [];
      }
      mode.contains = Array.prototype.concat.apply([], mode.contains.map(function (c) {
        return expand_or_clone_mode(c === 'self' ? mode : c);
      }));
      mode.contains.forEach(function (c) {
        compileMode(c, mode);
      });

      if (mode.starts) {
        compileMode(mode.starts, parent);
      }

      mode.terminators = buildModeRegex(mode);
    }

    // self is not valid at the top-level
    if (language.contains && language.contains.indexOf('self') != -1) {
      if (!SAFE_MODE) {
        throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
      } else {
        // silently remove the broken rule (effectively ignoring it), this has historically
        // been the behavior in the past, so this removal preserves compatibility with broken
        // grammars when running in Safe Mode
        language.contains = language.contains.filter(function (mode) {
          return mode != 'self';
        });
      }
    }
    compileMode(language);
  }

  /**
   * Core highlighting function.
   *
   * @param {string} languageName - the language to use for highlighting
   * @param {string} code - the code to highlight
   * @param {boolean} ignore_illegals - whether to ignore illegal matches, default is to bail
   * @param {array<mode>} continuation - array of continuation modes
   *
   * @returns an object that represents the result
   * @property {string} language - the language name
   * @property {number} relevance - the relevance score
   * @property {string} value - the highlighted HTML code
   * @property {mode} top - top of the current mode stack
   * @property {boolean} illegal - indicates whether any illegal matches were found
  */
  function highlight(languageName, code, ignore_illegals, continuation) {
    var codeToHighlight = code;

    function escapeRe(value) {
      return new RegExp(value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'm');
    }

    function endOfMode(mode, lexeme) {
      if (testRe(mode.endRe, lexeme)) {
        while (mode.endsParent && mode.parent) {
          mode = mode.parent;
        }
        return mode;
      }
      if (mode.endsWithParent) {
        return endOfMode(mode.parent, lexeme);
      }
    }

    function keywordMatch(mode, match) {
      var match_str = language.case_insensitive ? match[0].toLowerCase() : match[0];
      return mode.keywords.hasOwnProperty(match_str) && mode.keywords[match_str];
    }

    function buildSpan(className, insideSpan, leaveOpen, noPrefix) {
      if (!leaveOpen && insideSpan === '') return '';
      if (!className) return insideSpan;

      var classPrefix = noPrefix ? '' : options.classPrefix,
          openSpan = '<span class="' + classPrefix,
          closeSpan = leaveOpen ? '' : spanEndTag;

      openSpan += className + '">';

      return openSpan + insideSpan + closeSpan;
    }

    function processKeywords() {
      var keyword_match, last_index, match, result;

      if (!top.keywords) return escape(mode_buffer);

      result = '';
      last_index = 0;
      top.lexemesRe.lastIndex = 0;
      match = top.lexemesRe.exec(mode_buffer);

      while (match) {
        result += escape(mode_buffer.substring(last_index, match.index));
        keyword_match = keywordMatch(top, match);
        if (keyword_match) {
          relevance += keyword_match[1];
          result += buildSpan(keyword_match[0], escape(match[0]));
        } else {
          result += escape(match[0]);
        }
        last_index = top.lexemesRe.lastIndex;
        match = top.lexemesRe.exec(mode_buffer);
      }
      return result + escape(mode_buffer.substr(last_index));
    }

    function processSubLanguage() {
      var explicit = typeof top.subLanguage === 'string';
      if (explicit && !languages[top.subLanguage]) {
        return escape(mode_buffer);
      }

      var result = explicit ? highlight(top.subLanguage, mode_buffer, true, continuations[top.subLanguage]) : highlightAuto(mode_buffer, top.subLanguage.length ? top.subLanguage : undefined);

      // Counting embedded language score towards the host language may be disabled
      // with zeroing the containing mode relevance. Use case in point is Markdown that
      // allows XML everywhere and makes every XML snippet to have a much larger Markdown
      // score.
      if (top.relevance > 0) {
        relevance += result.relevance;
      }
      if (explicit) {
        continuations[top.subLanguage] = result.top;
      }
      return buildSpan(result.language, result.value, false, true);
    }

    function processBuffer() {
      result += top.subLanguage != null ? processSubLanguage() : processKeywords();
      mode_buffer = '';
    }

    function startNewMode(mode) {
      result += mode.className ? buildSpan(mode.className, '', true) : '';
      top = Object.create(mode, { parent: { value: top } });
    }

    function doBeginMatch(match) {
      var lexeme = match[0];
      var new_mode = match.rule;

      if (new_mode && new_mode.endSameAsBegin) {
        new_mode.endRe = escapeRe(lexeme);
      }

      if (new_mode.skip) {
        mode_buffer += lexeme;
      } else {
        if (new_mode.excludeBegin) {
          mode_buffer += lexeme;
        }
        processBuffer();
        if (!new_mode.returnBegin && !new_mode.excludeBegin) {
          mode_buffer = lexeme;
        }
      }
      startNewMode(new_mode);
      return new_mode.returnBegin ? 0 : lexeme.length;
    }

    function doEndMatch(match) {
      var lexeme = match[0];
      var matchPlusRemainder = codeToHighlight.substr(match.index);
      var end_mode = endOfMode(top, matchPlusRemainder);
      if (!end_mode) {
        return;
      }

      var origin = top;
      if (origin.skip) {
        mode_buffer += lexeme;
      } else {
        if (!(origin.returnEnd || origin.excludeEnd)) {
          mode_buffer += lexeme;
        }
        processBuffer();
        if (origin.excludeEnd) {
          mode_buffer = lexeme;
        }
      }
      do {
        if (top.className) {
          result += spanEndTag;
        }
        if (!top.skip && !top.subLanguage) {
          relevance += top.relevance;
        }
        top = top.parent;
      } while (top !== end_mode.parent);
      if (end_mode.starts) {
        if (end_mode.endSameAsBegin) {
          end_mode.starts.endRe = end_mode.endRe;
        }
        startNewMode(end_mode.starts);
      }
      return origin.returnEnd ? 0 : lexeme.length;
    }

    var lastMatch = {};
    function processLexeme(text_before_match, match) {

      var lexeme = match && match[0];

      // add non-matched text to the current mode buffer
      mode_buffer += text_before_match;

      if (lexeme == null) {
        processBuffer();
        return 0;
      }

      // we've found a 0 width match and we're stuck, so we need to advance
      // this happens when we have badly behaved rules that have optional matchers to the degree that
      // sometimes they can end up matching nothing at all
      // Ref: https://github.com/highlightjs/highlight.js/issues/2140
      if (lastMatch.type == "begin" && match.type == "end" && lastMatch.index == match.index && lexeme === "") {
        // spit the "skipped" character that our regex choked on back into the output sequence
        mode_buffer += codeToHighlight.slice(match.index, match.index + 1);
        return 1;
      }
      lastMatch = match;

      if (match.type === "begin") {
        return doBeginMatch(match);
      } else if (match.type === "illegal" && !ignore_illegals) {
        // illegal match, we do not continue processing
        throw new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || '<unnamed>') + '"');
      } else if (match.type === "end") {
        var processed = doEndMatch(match);
        if (processed != undefined) return processed;
      }

      /*
      Why might be find ourselves here?  Only one occasion now.  An end match that was
      triggered but could not be completed.  When might this happen?  When an `endSameasBegin`
      rule sets the end rule to a specific match.  Since the overall mode termination rule that's
      being used to scan the text isn't recompiled that means that any match that LOOKS like
      the end (but is not, because it is not an exact match to the beginning) will
      end up here.  A definite end match, but when `doEndMatch` tries to "reapply"
      the end rule and fails to match, we wind up here, and just silently ignore the end.
       This causes no real harm other than stopping a few times too many.
      */

      mode_buffer += lexeme;
      return lexeme.length;
    }

    var language = getLanguage(languageName);
    if (!language) {
      console.error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
      throw new Error('Unknown language: "' + languageName + '"');
    }

    compileLanguage(language);
    var top = continuation || language;
    var continuations = {}; // keep continuations for sub-languages
    var result = '',
        current;
    for (current = top; current !== language; current = current.parent) {
      if (current.className) {
        result = buildSpan(current.className, '', true) + result;
      }
    }
    var mode_buffer = '';
    var relevance = 0;
    try {
      var match,
          count,
          index = 0;
      while (true) {
        top.terminators.lastIndex = index;
        match = top.terminators.exec(codeToHighlight);
        if (!match) break;
        count = processLexeme(codeToHighlight.substring(index, match.index), match);
        index = match.index + count;
      }
      processLexeme(codeToHighlight.substr(index));
      for (current = top; current.parent; current = current.parent) {
        // close dangling modes
        if (current.className) {
          result += spanEndTag;
        }
      }
      return {
        relevance: relevance,
        value: result,
        illegal: false,
        language: languageName,
        top: top
      };
    } catch (err) {
      if (err.message && err.message.indexOf('Illegal') !== -1) {
        return {
          illegal: true,
          relevance: 0,
          value: escape(codeToHighlight)
        };
      } else if (SAFE_MODE) {
        return {
          relevance: 0,
          value: escape(codeToHighlight),
          language: languageName,
          top: top,
          errorRaised: err
        };
      } else {
        throw err;
      }
    }
  }

  /*
  Highlighting with language detection. Accepts a string with the code to
  highlight. Returns an object with the following properties:
   - language (detected language)
  - relevance (int)
  - value (an HTML string with highlighting markup)
  - second_best (object with the same structure for second-best heuristically
    detected language, may be absent)
   */
  function highlightAuto(code, languageSubset) {
    languageSubset = languageSubset || options.languages || objectKeys(languages);
    var result = {
      relevance: 0,
      value: escape(code)
    };
    var second_best = result;
    languageSubset.filter(getLanguage).filter(autoDetection).forEach(function (name) {
      var current = highlight(name, code, false);
      current.language = name;
      if (current.relevance > second_best.relevance) {
        second_best = current;
      }
      if (current.relevance > result.relevance) {
        second_best = result;
        result = current;
      }
    });
    if (second_best.language) {
      result.second_best = second_best;
    }
    return result;
  }

  /*
  Post-processing of the highlighted markup:
   - replace TABs with something more useful
  - replace real line-breaks with '<br>' for non-pre containers
   */
  function fixMarkup(value) {
    if (!(options.tabReplace || options.useBR)) {
      return value;
    }

    return value.replace(fixMarkupRe, function (match, p1) {
      if (options.useBR && match === '\n') {
        return '<br>';
      } else if (options.tabReplace) {
        return p1.replace(/\t/g, options.tabReplace);
      }
      return '';
    });
  }

  function buildClassName(prevClassName, currentLang, resultLang) {
    var language = currentLang ? aliases[currentLang] : resultLang,
        result = [prevClassName.trim()];

    if (!prevClassName.match(/\bhljs\b/)) {
      result.push('hljs');
    }

    if (prevClassName.indexOf(language) === -1) {
      result.push(language);
    }

    return result.join(' ').trim();
  }

  /*
  Applies highlighting to a DOM node containing code. Accepts a DOM node and
  two optional parameters for fixMarkup.
  */
  function highlightBlock(block) {
    var node, originalStream, result, resultNode, text;
    var language = blockLanguage(block);

    if (isNotHighlighted(language)) return;

    if (options.useBR) {
      node = document.createElement('div');
      node.innerHTML = block.innerHTML.replace(/\n/g, '').replace(/<br[ \/]*>/g, '\n');
    } else {
      node = block;
    }
    text = node.textContent;
    result = language ? highlight(language, text, true) : highlightAuto(text);

    originalStream = nodeStream(node);
    if (originalStream.length) {
      resultNode = document.createElement('div');
      resultNode.innerHTML = result.value;
      result.value = mergeStreams(originalStream, nodeStream(resultNode), text);
    }
    result.value = fixMarkup(result.value);

    block.innerHTML = result.value;
    block.className = buildClassName(block.className, language, result.language);
    block.result = {
      language: result.language,
      re: result.relevance
    };
    if (result.second_best) {
      block.second_best = {
        language: result.second_best.language,
        re: result.second_best.relevance
      };
    }
  }

  /*
  Updates highlight.js global options with values passed in the form of an object.
  */
  function configure(user_options) {
    options = inherit(options, user_options);
  }

  /*
  Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
  */
  function initHighlighting() {
    if (initHighlighting.called) return;
    initHighlighting.called = true;

    var blocks = document.querySelectorAll('pre code');
    ArrayProto.forEach.call(blocks, highlightBlock);
  }

  /*
  Attaches highlighting to the page load event.
  */
  function initHighlightingOnLoad() {
    window.addEventListener('DOMContentLoaded', initHighlighting, false);
    window.addEventListener('load', initHighlighting, false);
  }

  var PLAINTEXT_LANGUAGE = { disableAutodetect: true };

  function registerLanguage(name, language) {
    var lang;
    try {
      lang = language(hljs);
    } catch (error) {
      console.error("Language definition for '{}' could not be registered.".replace("{}", name));
      // hard or soft error
      if (!SAFE_MODE) {
        throw error;
      } else {
        console.error(error);
      }
      // languages that have serious errors are replaced with essentially a
      // "plaintext" stand-in so that the code blocks will still get normal
      // css classes applied to them - and one bad language won't break the
      // entire highlighter
      lang = PLAINTEXT_LANGUAGE;
    }
    languages[name] = lang;
    restoreLanguageApi(lang);
    lang.rawDefinition = language.bind(null, hljs);

    if (lang.aliases) {
      lang.aliases.forEach(function (alias) {
        aliases[alias] = name;
      });
    }
  }

  function listLanguages() {
    return objectKeys(languages);
  }

  /*
    intended usage: When one language truly requires another
     Unlike `getLanguage`, this will throw when the requested language
    is not available.
  */
  function requireLanguage(name) {
    var lang = getLanguage(name);
    if (lang) {
      return lang;
    }

    var err = new Error('The \'{}\' language is required, but not loaded.'.replace('{}', name));
    throw err;
  }

  function getLanguage(name) {
    name = (name || '').toLowerCase();
    return languages[name] || languages[aliases[name]];
  }

  function autoDetection(name) {
    var lang = getLanguage(name);
    return lang && !lang.disableAutodetect;
  }

  /* Interface definition */

  hljs.highlight = highlight;
  hljs.highlightAuto = highlightAuto;
  hljs.fixMarkup = fixMarkup;
  hljs.highlightBlock = highlightBlock;
  hljs.configure = configure;
  hljs.initHighlighting = initHighlighting;
  hljs.initHighlightingOnLoad = initHighlightingOnLoad;
  hljs.registerLanguage = registerLanguage;
  hljs.listLanguages = listLanguages;
  hljs.getLanguage = getLanguage;
  hljs.requireLanguage = requireLanguage;
  hljs.autoDetection = autoDetection;
  hljs.inherit = inherit;
  hljs.debugMode = function () {
    SAFE_MODE = false;
  };

  // Common regexps
  hljs.IDENT_RE = '[a-zA-Z]\\w*';
  hljs.UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
  hljs.NUMBER_RE = '\\b\\d+(\\.\\d+)?';
  hljs.C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float
  hljs.BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...
  hljs.RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';

  // Common modes
  hljs.BACKSLASH_ESCAPE = {
    begin: '\\\\[\\s\\S]', relevance: 0
  };
  hljs.APOS_STRING_MODE = {
    className: 'string',
    begin: '\'', end: '\'',
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  hljs.QUOTE_STRING_MODE = {
    className: 'string',
    begin: '"', end: '"',
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  hljs.PHRASAL_WORDS_MODE = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  };
  hljs.COMMENT = function (begin, end, inherits) {
    var mode = hljs.inherit({
      className: 'comment',
      begin: begin, end: end,
      contains: []
    }, inherits || {});
    mode.contains.push(hljs.PHRASAL_WORDS_MODE);
    mode.contains.push({
      className: 'doctag',
      begin: '(?:TODO|FIXME|NOTE|BUG|XXX):',
      relevance: 0
    });
    return mode;
  };
  hljs.C_LINE_COMMENT_MODE = hljs.COMMENT('//', '$');
  hljs.C_BLOCK_COMMENT_MODE = hljs.COMMENT('/\\*', '\\*/');
  hljs.HASH_COMMENT_MODE = hljs.COMMENT('#', '$');
  hljs.NUMBER_MODE = {
    className: 'number',
    begin: hljs.NUMBER_RE,
    relevance: 0
  };
  hljs.C_NUMBER_MODE = {
    className: 'number',
    begin: hljs.C_NUMBER_RE,
    relevance: 0
  };
  hljs.BINARY_NUMBER_MODE = {
    className: 'number',
    begin: hljs.BINARY_NUMBER_RE,
    relevance: 0
  };
  hljs.CSS_NUMBER_MODE = {
    className: 'number',
    begin: hljs.NUMBER_RE + '(' + '%|em|ex|ch|rem' + '|vw|vh|vmin|vmax' + '|cm|mm|in|pt|pc|px' + '|deg|grad|rad|turn' + '|s|ms' + '|Hz|kHz' + '|dpi|dpcm|dppx' + ')?',
    relevance: 0
  };
  hljs.REGEXP_MODE = {
    className: 'regexp',
    begin: /\//, end: /\/[gimuy]*/,
    illegal: /\n/,
    contains: [hljs.BACKSLASH_ESCAPE, {
      begin: /\[/, end: /\]/,
      relevance: 0,
      contains: [hljs.BACKSLASH_ESCAPE]
    }]
  };
  hljs.TITLE_MODE = {
    className: 'title',
    begin: hljs.IDENT_RE,
    relevance: 0
  };
  hljs.UNDERSCORE_TITLE_MODE = {
    className: 'title',
    begin: hljs.UNDERSCORE_IDENT_RE,
    relevance: 0
  };
  hljs.METHOD_GUARD = {
    // excludes method names from keyword processing
    begin: '\\.\\s*' + hljs.UNDERSCORE_IDENT_RE,
    relevance: 0
  };

  var constants = [hljs.BACKSLASH_ESCAPE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.PHRASAL_WORDS_MODE, hljs.COMMENT, hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.HASH_COMMENT_MODE, hljs.NUMBER_MODE, hljs.C_NUMBER_MODE, hljs.BINARY_NUMBER_MODE, hljs.CSS_NUMBER_MODE, hljs.REGEXP_MODE, hljs.TITLE_MODE, hljs.UNDERSCORE_TITLE_MODE, hljs.METHOD_GUARD];
  constants.forEach(function (obj) {
    deepFreeze(obj);
  });

  // https://github.com/substack/deep-freeze/blob/master/index.js
  function deepFreeze(o) {
    Object.freeze(o);

    var objIsFunction = typeof o === 'function';

    Object.getOwnPropertyNames(o).forEach(function (prop) {
      if (o.hasOwnProperty(prop) && o[prop] !== null && (_typeof(o[prop]) === "object" || typeof o[prop] === "function")
      // IE11 fix: https://github.com/highlightjs/highlight.js/issues/2318
      // TODO: remove in the future
      && (objIsFunction ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments' : true) && !Object.isFrozen(o[prop])) {
        deepFreeze(o[prop]);
      }
    });

    return o;
  };

  return hljs;
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (hljs) {
  var FRAGMENT = {
    begin: '<>',
    end: '</>'
  };
  var XML_TAG = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/
  };
  var IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
  var KEYWORDS = {
    keyword: 'in of if for while finally var new function do return void else break catch ' + 'instanceof with throw case default try this switch continue typeof delete ' + 'let yield const export super debugger as async await static ' +
    // ECMAScript 6 modules import
    'import from as',

    literal: 'true false null undefined NaN Infinity',
    built_in: 'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent ' + 'encodeURI encodeURIComponent escape unescape Object Function Boolean Error ' + 'EvalError InternalError RangeError ReferenceError StopIteration SyntaxError ' + 'TypeError URIError Number Math Date String RegExp Array Float32Array ' + 'Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array ' + 'Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require ' + 'module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect ' + 'Promise'
  };
  var NUMBER = {
    className: 'number',
    variants: [{ begin: '\\b(0[bB][01]+)n?' }, { begin: '\\b(0[oO][0-7]+)n?' }, { begin: hljs.C_NUMBER_RE + 'n?' }],
    relevance: 0
  };
  var SUBST = {
    className: 'subst',
    begin: '\\$\\{', end: '\\}',
    keywords: KEYWORDS,
    contains: [] // defined later
  };
  var HTML_TEMPLATE = {
    begin: 'html`', end: '',
    starts: {
      end: '`', returnEnd: false,
      contains: [hljs.BACKSLASH_ESCAPE, SUBST],
      subLanguage: 'xml'
    }
  };
  var CSS_TEMPLATE = {
    begin: 'css`', end: '',
    starts: {
      end: '`', returnEnd: false,
      contains: [hljs.BACKSLASH_ESCAPE, SUBST],
      subLanguage: 'css'
    }
  };
  var TEMPLATE_STRING = {
    className: 'string',
    begin: '`', end: '`',
    contains: [hljs.BACKSLASH_ESCAPE, SUBST]
  };
  SUBST.contains = [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, HTML_TEMPLATE, CSS_TEMPLATE, TEMPLATE_STRING, NUMBER, hljs.REGEXP_MODE];
  var PARAMS_CONTAINS = SUBST.contains.concat([hljs.C_BLOCK_COMMENT_MODE, hljs.C_LINE_COMMENT_MODE]);

  return {
    aliases: ['js', 'jsx', 'mjs', 'cjs'],
    keywords: KEYWORDS,
    contains: [{
      className: 'meta',
      relevance: 10,
      begin: /^\s*['"]use (strict|asm)['"]/
    }, {
      className: 'meta',
      begin: /^#!/, end: /$/
    }, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, HTML_TEMPLATE, CSS_TEMPLATE, TEMPLATE_STRING, hljs.C_LINE_COMMENT_MODE, hljs.COMMENT('/\\*\\*', '\\*/', {
      relevance: 0,
      contains: [{
        className: 'doctag',
        begin: '@[A-Za-z]+',
        contains: [{
          className: 'type',
          begin: '\\{',
          end: '\\}',
          relevance: 0
        }, {
          className: 'variable',
          begin: IDENT_RE + '(?=\\s*(-)|$)',
          endsParent: true,
          relevance: 0
        },
        // eat spaces (not newlines) so we can find
        // types or variables
        {
          begin: /(?=[^\n])\s/,
          relevance: 0
        }]
      }]
    }), hljs.C_BLOCK_COMMENT_MODE, NUMBER, { // object attr container
      begin: /[{,\n]\s*/, relevance: 0,
      contains: [{
        begin: IDENT_RE + '\\s*:', returnBegin: true,
        relevance: 0,
        contains: [{ className: 'attr', begin: IDENT_RE, relevance: 0 }]
      }]
    }, { // "value" container
      begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
      keywords: 'return throw case',
      contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.REGEXP_MODE, {
        className: 'function',
        begin: '(\\(.*?\\)|' + IDENT_RE + ')\\s*=>', returnBegin: true,
        end: '\\s*=>',
        contains: [{
          className: 'params',
          variants: [{
            begin: IDENT_RE
          }, {
            begin: /\(\s*\)/
          }, {
            begin: /\(/, end: /\)/,
            excludeBegin: true, excludeEnd: true,
            keywords: KEYWORDS,
            contains: PARAMS_CONTAINS
          }]
        }]
      }, {
        className: '',
        begin: /\s/,
        end: /\s*/,
        skip: true
      }, { // JSX
        variants: [{ begin: FRAGMENT.begin, end: FRAGMENT.end }, { begin: XML_TAG.begin, end: XML_TAG.end }],
        subLanguage: 'xml',
        contains: [{
          begin: XML_TAG.begin, end: XML_TAG.end, skip: true,
          contains: ['self']
        }]
      }],
      relevance: 0
    }, {
      className: 'function',
      beginKeywords: 'function', end: /\{/, excludeEnd: true,
      contains: [hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE }), {
        className: 'params',
        begin: /\(/, end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        contains: PARAMS_CONTAINS
      }],
      illegal: /\[|%/
    }, {
      begin: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
    }, hljs.METHOD_GUARD, { // ES6 class
      className: 'class',
      beginKeywords: 'class', end: /[{;=]/, excludeEnd: true,
      illegal: /[:"\[\]]/,
      contains: [{ beginKeywords: 'extends' }, hljs.UNDERSCORE_TITLE_MODE]
    }, {
      beginKeywords: 'constructor get set', end: /\{/, excludeEnd: true
    }],
    illegal: /#(?!!)/
  };
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (hljs) {
  var FUNCTION_LIKE = {
    begin: /[\w-]+\(/, returnBegin: true,
    contains: [{
      className: 'built_in',
      begin: /[\w-]+/
    }, {
      begin: /\(/, end: /\)/,
      contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.CSS_NUMBER_MODE]
    }]
  };
  var ATTRIBUTE = {
    className: 'attribute',
    begin: /\S/, end: ':', excludeEnd: true,
    starts: {
      endsWithParent: true, excludeEnd: true,
      contains: [FUNCTION_LIKE, hljs.CSS_NUMBER_MODE, hljs.QUOTE_STRING_MODE, hljs.APOS_STRING_MODE, hljs.C_BLOCK_COMMENT_MODE, {
        className: 'number', begin: '#[0-9A-Fa-f]+'
      }, {
        className: 'meta', begin: '!important'
      }]
    }
  };
  var AT_IDENTIFIER = '@[a-z-]+'; // @font-face
  var AT_MODIFIERS = "and or not only";
  var MEDIA_TYPES = "all print screen speech";
  var AT_PROPERTY_RE = /@\-?\w[\w]*(\-\w+)*/; // @-webkit-keyframes
  var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  var RULE = {
    begin: /(?:[A-Z\_\.\-]+|--[a-zA-Z0-9_-]+)\s*:/, returnBegin: true, end: ';', endsWithParent: true,
    contains: [ATTRIBUTE]
  };

  return {
    case_insensitive: true,
    illegal: /[=\/|'\$]/,
    contains: [hljs.C_BLOCK_COMMENT_MODE, {
      className: 'selector-id', begin: /#[A-Za-z0-9_-]+/
    }, {
      className: 'selector-class', begin: /\.[A-Za-z0-9_-]+/
    }, {
      className: 'selector-attr',
      begin: /\[/, end: /\]/,
      illegal: '$',
      contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
    }, {
      className: 'selector-pseudo',
      begin: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/
    },
    // matching these here allows us to treat them more like regular CSS
    // rules so everything between the {} gets regular rule highlighting,
    // which is what we want for page and font-face
    {
      begin: '@(page|font-face)',
      lexemes: AT_IDENTIFIER,
      keywords: '@page @font-face'
    }, {
      begin: '@', end: '[{;]', // at_rule eating first "{" is a good thing
      // because it doesn’t let it to be parsed as
      // a rule set but instead drops parser into
      // the default mode which is how it should be.
      illegal: /:/, // break on Less variables @var: ...
      returnBegin: true,
      contains: [{
        className: 'keyword',
        begin: AT_PROPERTY_RE
      }, {
        begin: /\s/, endsWithParent: true, excludeEnd: true,
        relevance: 0,
        keywords: AT_MODIFIERS,
        contains: [{
          begin: /[a-z-]+:/,
          className: "attribute"
        }, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.CSS_NUMBER_MODE]
      }]
    }, {
      className: 'selector-tag', begin: IDENT_RE,
      relevance: 0
    }, {
      begin: '{', end: '}',
      illegal: /\S/,
      contains: [hljs.C_BLOCK_COMMENT_MODE, RULE]
    }]
  };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (hljs) {
  var XML_IDENT_RE = '[A-Za-z0-9\\._:-]+';
  var XML_ENTITIES = {
    className: 'symbol',
    begin: '&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;'
  };
  var XML_META_KEYWORDS = {
    begin: '\\s',
    contains: [{
      className: 'meta-keyword',
      begin: '#?[a-z_][a-z1-9_-]+',
      illegal: '\\n'
    }]
  };
  var XML_META_PAR_KEYWORDS = hljs.inherit(XML_META_KEYWORDS, { begin: '\\(', end: '\\)' });
  var APOS_META_STRING_MODE = hljs.inherit(hljs.APOS_STRING_MODE, { className: 'meta-string' });
  var QUOTE_META_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, { className: 'meta-string' });
  var TAG_INTERNALS = {
    endsWithParent: true,
    illegal: /</,
    relevance: 0,
    contains: [{
      className: 'attr',
      begin: XML_IDENT_RE,
      relevance: 0
    }, {
      begin: /=\s*/,
      relevance: 0,
      contains: [{
        className: 'string',
        endsParent: true,
        variants: [{ begin: /"/, end: /"/, contains: [XML_ENTITIES] }, { begin: /'/, end: /'/, contains: [XML_ENTITIES] }, { begin: /[^\s"'=<>`]+/ }]
      }]
    }]
  };
  return {
    aliases: ['html', 'xhtml', 'rss', 'atom', 'xjb', 'xsd', 'xsl', 'plist', 'wsf', 'svg'],
    case_insensitive: true,
    contains: [{
      className: 'meta',
      begin: '<![a-z]', end: '>',
      relevance: 10,
      contains: [XML_META_KEYWORDS, QUOTE_META_STRING_MODE, APOS_META_STRING_MODE, XML_META_PAR_KEYWORDS, {
        begin: '\\[', end: '\\]',
        contains: [{
          className: 'meta',
          begin: '<![a-z]', end: '>',
          contains: [XML_META_KEYWORDS, XML_META_PAR_KEYWORDS, QUOTE_META_STRING_MODE, APOS_META_STRING_MODE]
        }]
      }]
    }, hljs.COMMENT('<!--', '-->', {
      relevance: 10
    }), {
      begin: '<\\!\\[CDATA\\[', end: '\\]\\]>',
      relevance: 10
    }, XML_ENTITIES, {
      className: 'meta',
      begin: /<\?xml/, end: /\?>/, relevance: 10
    }, {
      begin: /<\?(php)?/, end: /\?>/,
      subLanguage: 'php',
      contains: [
      // We don't want the php closing tag ?> to close the PHP block when
      // inside any of the following blocks:
      { begin: '/\\*', end: '\\*/', skip: true }, { begin: 'b"', end: '"', skip: true }, { begin: 'b\'', end: '\'', skip: true }, hljs.inherit(hljs.APOS_STRING_MODE, { illegal: null, className: null, contains: null, skip: true }), hljs.inherit(hljs.QUOTE_STRING_MODE, { illegal: null, className: null, contains: null, skip: true })]
    }, {
      className: 'tag',
      /*
      The lookahead pattern (?=...) ensures that 'begin' only matches
      '<style' as a single word, followed by a whitespace or an
      ending braket. The '$' is needed for the lexeme to be recognized
      by hljs.subMode() that tests lexemes outside the stream.
      */
      begin: '<style(?=\\s|>)', end: '>',
      keywords: { name: 'style' },
      contains: [TAG_INTERNALS],
      starts: {
        end: '</style>', returnEnd: true,
        subLanguage: ['css', 'xml']
      }
    }, {
      className: 'tag',
      // See the comment in the <style tag about the lookahead pattern
      begin: '<script(?=\\s|>)', end: '>',
      keywords: { name: 'script' },
      contains: [TAG_INTERNALS],
      starts: {
        end: '\<\/script\>', returnEnd: true,
        subLanguage: ['actionscript', 'javascript', 'handlebars', 'xml']
      }
    }, {
      className: 'tag',
      begin: '</?', end: '/?>',
      contains: [{
        className: 'name', begin: /[^\/><\s]+/, relevance: 0
      }, TAG_INTERNALS]
    }]
  };
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (hljs) {
  var COMMENT_MODE = hljs.COMMENT('--', '$');
  return {
    case_insensitive: true,
    illegal: /[<>{}*]/,
    contains: [{
      beginKeywords: 'begin end start commit rollback savepoint lock alter create drop rename call ' + 'delete do handler insert load replace select truncate update set show pragma grant ' + 'merge describe use explain help declare prepare execute deallocate release ' + 'unlock purge reset change stop analyze cache flush optimize repair kill ' + 'install uninstall checksum restore check backup revoke comment values with',
      end: /;/, endsWithParent: true,
      lexemes: /[\w\.]+/,
      keywords: {
        keyword: 'as abort abs absolute acc acce accep accept access accessed accessible account acos action activate add ' + 'addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias ' + 'all allocate allow alter always analyze ancillary and anti any anydata anydataset anyschema anytype apply ' + 'archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan ' + 'atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid ' + 'authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile ' + 'before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float ' + 'binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound ' + 'bucket buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel ' + 'capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base ' + 'char_length character_length characters characterset charindex charset charsetform charsetid check ' + 'checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close ' + 'cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation ' + 'collect colu colum column column_value columns columns_updated comment commit compact compatibility ' + 'compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn ' + 'connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection ' + 'consider consistent constant constraint constraints constructor container content contents context ' + 'contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost ' + 'count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation ' + 'critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user ' + 'cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add ' + 'date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts ' + 'day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate ' + 'declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults ' + 'deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank ' + 'depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor ' + 'deterministic diagnostics difference dimension direct_load directory disable disable_all ' + 'disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div ' + 'do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable ' + 'editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt ' + 'end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors ' + 'escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding ' + 'execu execut execute exempt exists exit exp expire explain explode export export_set extended extent external ' + 'external_1 external_2 externally extract failed failed_login_attempts failover failure far fast ' + 'feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final ' + 'finish first first_value fixed flash_cache flashback floor flush following follows for forall force foreign ' + 'form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ' + 'ftp full function general generated get get_format get_lock getdate getutcdate global global_name ' + 'globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups ' + 'gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex ' + 'hierarchy high high_priority hosts hour hours http id ident_current ident_incr ident_seed identified ' + 'identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment ' + 'index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile ' + 'initial initialized initially initrans inmemory inner innodb input insert install instance instantiable ' + 'instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat ' + 'is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists ' + 'keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lateral lax lcase ' + 'lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit ' + 'lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate ' + 'locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call ' + 'logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime ' + 'managed management manual map mapping mask master master_pos_wait match matched materialized max ' + 'maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans ' + 'md5 measures median medium member memcompress memory merge microsecond mid migration min minextents ' + 'minimum mining minus minute minutes minvalue missing mod mode model modification modify module monitoring month ' + 'months mount move movement multiset mutex name name_const names nan national native natural nav nchar ' + 'nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile ' + 'nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile ' + 'nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder ' + 'nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck ' + 'noswitch not nothing notice notnull notrim novalidate now nowait nth_value nullif nulls num numb numbe ' + 'nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ' + 'ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old ' + 'on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date ' + 'oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary ' + 'out outer outfile outline output over overflow overriding package pad parallel parallel_enable ' + 'parameters parent parse partial partition partitions pascal passing password password_grace_time ' + 'password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex ' + 'pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc ' + 'performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin ' + 'policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction ' + 'prediction_cost prediction_details prediction_probability prediction_set prepare present preserve ' + 'prior priority private private_sga privileges procedural procedure procedure_analyze processlist ' + 'profiles project prompt protection public publishingservername purge quarter query quick quiesce quota ' + 'quotename radians raise rand range rank raw read reads readsize rebuild record records ' + 'recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh ' + 'regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy ' + 'reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename ' + 'repair repeat replace replicate replication required reset resetlogs resize resource respect restore ' + 'restricted result result_cache resumable resume retention return returning returns reuse reverse revoke ' + 'right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows ' + 'rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll ' + 'sdo_georaster sdo_topo_geometry search sec_to_time second seconds section securefile security seed segment select ' + 'self semi sequence sequential serializable server servererror session session_user sessions_per_user set ' + 'sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor ' + 'si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin ' + 'size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex ' + 'source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows ' + 'sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone ' + 'standby start starting startup statement static statistics stats_binomial_test stats_crosstab ' + 'stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep ' + 'stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev ' + 'stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate ' + 'subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum ' + 'suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate ' + 'sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tablesample tan tdo ' + 'template temporary terminated tertiary_weights test than then thread through tier ties time time_format ' + 'time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr ' + 'timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking ' + 'transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate ' + 'try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress ' + 'under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unnest unpivot ' + 'unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert ' + 'url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date ' + 'utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var ' + 'var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray ' + 'verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear ' + 'wellformed when whene whenev wheneve whenever where while whitespace window with within without work wrapped ' + 'xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces ' + 'xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek',
        literal: 'true false null unknown',
        built_in: 'array bigint binary bit blob bool boolean char character date dec decimal float int int8 integer interval number ' + 'numeric real record serial serial8 smallint text time timestamp tinyint varchar varchar2 varying void'
      },
      contains: [{
        className: 'string',
        begin: '\'', end: '\'',
        contains: [{ begin: '\'\'' }]
      }, {
        className: 'string',
        begin: '"', end: '"',
        contains: [{ begin: '""' }]
      }, {
        className: 'string',
        begin: '`', end: '`'
      }, hljs.C_NUMBER_MODE, hljs.C_BLOCK_COMMENT_MODE, COMMENT_MODE, hljs.HASH_COMMENT_MODE]
    }, hljs.C_BLOCK_COMMENT_MODE, COMMENT_MODE, hljs.HASH_COMMENT_MODE]
  };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (hljs) {
  var JS_IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
  var KEYWORDS = {
    keyword: 'in if for while finally var new function do return void else break catch ' + 'instanceof with throw case default try this switch continue typeof delete ' + 'let yield const class public private protected get set super ' + 'static implements enum export import declare type namespace abstract ' + 'as from extends async await',
    literal: 'true false null undefined NaN Infinity',
    built_in: 'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent ' + 'encodeURI encodeURIComponent escape unescape Object Function Boolean Error ' + 'EvalError InternalError RangeError ReferenceError StopIteration SyntaxError ' + 'TypeError URIError Number Math Date String RegExp Array Float32Array ' + 'Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array ' + 'Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require ' + 'module console window document any number boolean string void Promise'
  };

  var DECORATOR = {
    className: 'meta',
    begin: '@' + JS_IDENT_RE
  };

  var ARGS = {
    begin: '\\(',
    end: /\)/,
    keywords: KEYWORDS,
    contains: ['self', hljs.QUOTE_STRING_MODE, hljs.APOS_STRING_MODE, hljs.NUMBER_MODE]
  };

  var PARAMS = {
    className: 'params',
    begin: /\(/, end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS,
    contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, DECORATOR, ARGS]
  };
  var NUMBER = {
    className: 'number',
    variants: [{ begin: '\\b(0[bB][01]+)n?' }, { begin: '\\b(0[oO][0-7]+)n?' }, { begin: hljs.C_NUMBER_RE + 'n?' }],
    relevance: 0
  };
  var SUBST = {
    className: 'subst',
    begin: '\\$\\{', end: '\\}',
    keywords: KEYWORDS,
    contains: [] // defined later
  };
  var HTML_TEMPLATE = {
    begin: 'html`', end: '',
    starts: {
      end: '`', returnEnd: false,
      contains: [hljs.BACKSLASH_ESCAPE, SUBST],
      subLanguage: 'xml'
    }
  };
  var CSS_TEMPLATE = {
    begin: 'css`', end: '',
    starts: {
      end: '`', returnEnd: false,
      contains: [hljs.BACKSLASH_ESCAPE, SUBST],
      subLanguage: 'css'
    }
  };
  var TEMPLATE_STRING = {
    className: 'string',
    begin: '`', end: '`',
    contains: [hljs.BACKSLASH_ESCAPE, SUBST]
  };
  SUBST.contains = [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, HTML_TEMPLATE, CSS_TEMPLATE, TEMPLATE_STRING, NUMBER, hljs.REGEXP_MODE];

  return {
    aliases: ['ts'],
    keywords: KEYWORDS,
    contains: [{
      className: 'meta',
      begin: /^\s*['"]use strict['"]/
    }, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, HTML_TEMPLATE, CSS_TEMPLATE, TEMPLATE_STRING, hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, NUMBER, { // "value" container
      begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
      keywords: 'return throw case',
      contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.REGEXP_MODE, {
        className: 'function',
        begin: '(\\(.*?\\)|' + hljs.IDENT_RE + ')\\s*=>', returnBegin: true,
        end: '\\s*=>',
        contains: [{
          className: 'params',
          variants: [{
            begin: hljs.IDENT_RE
          }, {
            begin: /\(\s*\)/
          }, {
            begin: /\(/, end: /\)/,
            excludeBegin: true, excludeEnd: true,
            keywords: KEYWORDS,
            contains: ['self', hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE]
          }]
        }]
      }],
      relevance: 0
    }, {
      className: 'function',
      beginKeywords: 'function', end: /[\{;]/, excludeEnd: true,
      keywords: KEYWORDS,
      contains: ['self', hljs.inherit(hljs.TITLE_MODE, { begin: JS_IDENT_RE }), PARAMS],
      illegal: /%/,
      relevance: 0 // () => {} is more typical in TypeScript
    }, {
      beginKeywords: 'constructor', end: /[\{;]/, excludeEnd: true,
      contains: ['self', PARAMS]
    }, { // prevent references like module.id from being higlighted as module definitions
      begin: /module\./,
      keywords: { built_in: 'module' },
      relevance: 0
    }, {
      beginKeywords: 'module', end: /\{/, excludeEnd: true
    }, {
      beginKeywords: 'interface', end: /\{/, excludeEnd: true,
      keywords: 'interface extends'
    }, {
      begin: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
    }, {
      begin: '\\.' + hljs.IDENT_RE, relevance: 0 // hack: prevents detection of keywords after dots
    }, DECORATOR, ARGS]
  };
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (hljs) {
  return {
    aliases: ['md', 'mkdown', 'mkd'],
    contains: [
    // highlight headers
    {
      className: 'section',
      variants: [{ begin: '^#{1,6}', end: '$' }, { begin: '^.+?\\n[=-]{2,}$' }]
    },
    // inline html
    {
      begin: '<', end: '>',
      subLanguage: 'xml',
      relevance: 0
    },
    // lists (indicators only)
    {
      className: 'bullet',
      begin: '^\\s*([*+-]|(\\d+\\.))\\s+'
    },
    // strong segments
    {
      className: 'strong',
      begin: '[*_]{2}.+?[*_]{2}'
    },
    // emphasis segments
    {
      className: 'emphasis',
      variants: [{ begin: '\\*.+?\\*' }, { begin: '_.+?_',
        relevance: 0
      }]
    },
    // blockquotes
    {
      className: 'quote',
      begin: '^>\\s+', end: '$'
    },
    // code snippets
    {
      className: 'code',
      variants: [{
        begin: '^```\\w*\\s*$', end: '^```[ ]*$'
      }, {
        begin: '`.+?`'
      }, {
        begin: '^( {4}|\\t)', end: '$',
        relevance: 0
      }]
    },
    // horizontal rules
    {
      begin: '^[-\\*]{3,}', end: '$'
    },
    // using links - title and link
    {
      begin: '\\[.+?\\][\\(\\[].*?[\\)\\]]',
      returnBegin: true,
      contains: [{
        className: 'string',
        begin: '\\[', end: '\\]',
        excludeBegin: true,
        returnEnd: true,
        relevance: 0
      }, {
        className: 'link',
        begin: '\\]\\(', end: '\\)',
        excludeBegin: true, excludeEnd: true
      }, {
        className: 'symbol',
        begin: '\\]\\[', end: '\\]',
        excludeBegin: true, excludeEnd: true
      }],
      relevance: 10
    }, {
      begin: /^\[[^\n]+\]:/,
      returnBegin: true,
      contains: [{
        className: 'symbol',
        begin: /\[/, end: /\]/,
        excludeBegin: true, excludeEnd: true
      }, {
        className: 'link',
        begin: /:\s*/, end: /$/,
        excludeBegin: true
      }]
    }]
  };
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _cLike = __webpack_require__(0);

var _cLike2 = _interopRequireDefault(_cLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @type LanguageFn */
module.exports = function (hljs) {
  var lang = (0, _cLike2.default)(hljs);
  // return auto-detection back on
  lang.disableAutodetect = false;
  lang.name = 'C++';
  lang.aliases = ['cc', 'c++', 'h++', 'hpp', 'hh', 'hxx', 'cxx'];
  return lang;
}; /*
   Language: C++
   Category: common, system
   Website: https://isocpp.org
   */

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.escape = escape;
exports.source = source;
exports.lookahead = lookahead;
exports.anyNumberOfTimes = anyNumberOfTimes;
exports.optional = optional;
exports.concat = concat;
exports.either = either;
exports.countMatchGroups = countMatchGroups;
exports.startsWith = startsWith;
exports.join = join;
/**
 * @param {string} value
 * @returns {RegExp}
 * */
function escape(value) {
  return new RegExp(value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'm');
}

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function source(re) {
  if (!re) return null;
  if (typeof re === "string") return re;

  return re.source;
}

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function lookahead(re) {
  return concat('(?=', re, ')');
}

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function anyNumberOfTimes(re) {
  return concat('(', re, ')*');
}

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function optional(re) {
  return concat('(', re, ')?');
}

/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */
function concat() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var joined = args.map(function (x) {
    return source(x);
  }).join("");
  return joined;
}

/**
 * Any of the passed expresssions may match
 *
 * Creates a huge this | this | that | that match
 * @param {(RegExp | string)[] } args
 * @returns {string}
 */
function either() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var joined = '(' + args.map(function (x) {
    return source(x);
  }).join("|") + ")";
  return joined;
}

/**
 * @param {RegExp} re
 * @returns {number}
 */
function countMatchGroups(re) {
  return new RegExp(re.toString() + '|').exec('').length - 1;
}

/**
 * Does lexeme start with a regular expression match at the beginning
 * @param {RegExp} re
 * @param {string} lexeme
 */
function startsWith(re, lexeme) {
  var match = re && re.exec(lexeme);
  return match && match.index === 0;
}

// join logically computes regexps.join(separator), but fixes the
// backreferences so they continue to match.
// it also places each individual regular expression into it's own
// match group, keeping track of the sequencing of those match groups
// is currently an exercise for the caller. :-)
/**
 * @param {(string | RegExp)[]} regexps
 * @param {string} separator
 * @returns {string}
 */
function join(regexps) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "|";

  // backreferenceRe matches an open parenthesis or backreference. To avoid
  // an incorrect parse, it additionally matches the following:
  // - [...] elements, where the meaning of parentheses and escapes change
  // - other escape sequences, so we do not misparse escape sequences as
  //   interesting elements
  // - non-matching or lookahead parentheses, which do not capture. These
  //   follow the '(' with a '?'.
  var backreferenceRe = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
  var numCaptures = 0;
  var ret = '';
  for (var i = 0; i < regexps.length; i++) {
    numCaptures += 1;
    var offset = numCaptures;
    var re = source(regexps[i]);
    if (i > 0) {
      ret += separator;
    }
    ret += "(";
    while (re.length > 0) {
      var match = backreferenceRe.exec(re);
      if (match == null) {
        ret += re;
        break;
      }
      ret += re.substring(0, match.index);
      re = re.substring(match.index + match[0].length);
      if (match[0][0] === '\\' && match[1]) {
        // Adjust the backreference.
        ret += '\\' + String(Number(match[1]) + offset);
      } else {
        ret += match[0];
        if (match[0] === '(') {
          numCaptures++;
        }
      }
    }
    ret += ")";
  }
  return ret;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _cLike = __webpack_require__(0);

var _cLike2 = _interopRequireDefault(_cLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @type LanguageFn */
module.exports = function (hljs) {
  var lang = (0, _cLike2.default)(hljs);
  // Until C is actually different than C++ there is no reason to auto-detect C
  // as it's own language since it would just fail auto-detect testing or
  // simply match with C++.
  //
  // See further comments in c-like.js.

  // lang.disableAutodetect = false;
  lang.name = 'C';
  lang.aliases = ['c', 'h'];
  return lang;
}; /*
   Language: C
   Category: common, system
   Website: https://en.wikipedia.org/wiki/C_(programming_language)
   */

/***/ })
/******/ ]);
//# sourceMappingURL=highLight.js.map