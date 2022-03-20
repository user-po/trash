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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Component({
  properties: {
    title: {
      type: String,
      value: '标题'
    },
    desc: {
      type: String,
      value: '小标题'
    },
    src: {
      type: String,
      value: '',
      observer: function observer(newVal) {
        if (newVal) {
          this.handleInitAudio(newVal);
        }
      }
    }
  },

  data: {
    isPlay: false,
    currentTimeStr: '00:00',
    durationStr: '00:00',
    progress: 0
  },

  detached: function detached() {
    this.innerAudioContext && this.innerAudioContext.destroy();
  },


  methods: {
    handleInitAudio: function handleInitAudio(src) {
      var _this = this;

      this.innerAudioContext = wx.createInnerAudioContext();
      this.innerAudioContext.src = src;
      this.innerAudioContext.onPlay(function () {
        console.log('开始播放');
      });

      this.innerAudioContext.onCanplay(function () {
        // 这是一个迷，据说要手动先触发这个属性，后面才能用setTimeout获取真实时长
        _this.innerAudioContext.duration;
        setTimeout(function () {
          var durationStr = _this.parseTime(_this.innerAudioContext.duration);
          _this.setData({ durationStr: durationStr });
        }, 1000);
      });

      this.innerAudioContext.onError(function (res) {
        console.log(res.errMsg);
        console.log(res.errCode);
      });

      this.innerAudioContext.onEnded(function () {
        _this.setData({ isPlay: false });
      });

      this.innerAudioContext.onTimeUpdate(function () {
        var currentTime = _this.innerAudioContext.currentTime;
        var duration = _this.innerAudioContext.duration;
        var currentTimeStr = _this.parseTime(currentTime);
        var progress = currentTime / duration * 100;
        _this.setData({ currentTimeStr: currentTimeStr, progress: progress });
      });
    },
    handleControl: function handleControl() {
      if (!this.data.isPlay) {
        this.setData({ isPlay: true });
        this.innerAudioContext.play();
      } else {
        this.setData({ isPlay: false });
        this.innerAudioContext.pause();
      }
    },
    parseTime: function parseTime(time) {
      var minute = Math.floor(time / 60);
      var second = Math.floor(time % 60);
      return (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second);
    }
  }
});

/***/ })

/******/ });
//# sourceMappingURL=wxAudio.js.map