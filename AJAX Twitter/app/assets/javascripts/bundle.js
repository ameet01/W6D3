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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);


$(function() {
  $('button.follow-toggle').each( (i, btn) => new FollowToggle(btn, {}) );
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

class FollowToggle {
  
  constructor(el, options) {
    this.$el = $(el);
    this.userId = this.$el.data('user-id') || options.userId;
    this.followState = this.$el.data('initial-follow-state') || options.followState;
    this.render();
    this.$el.on('click', this.handleClick.bind(this) );
  }
  
  render() {
    if(this.followState === 'followed') {
      this.$el.prop('disabled', false);
      this.$el.html('Unfollow!');
    } else {
      this.$el.prop('disabled', false);
      this.$el.html('Follow!');
    }
  }
  
  handleClick(e) {
    var self = this;
    
    e.preventDefault();
    
    if(self.followState === 'followed') {
      self.render();
      $.ajax({
        method: 'DELETE',
        url: `/users/${self.userId}/follow`,
        success: function(response) {
          self.followState = 'unfollowed';
          self.render();
        }
      });
    }
    if(self.followState === 'unfollowed') {
      self.render();
      $.ajax({
        method: 'POST',
        url: `/users/${self.userId}/follow`,
        success: function(response) {
          self.followState = 'followed';
          self.render();
        }
      });
    }
  }
  
}


module.exports = FollowToggle;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map