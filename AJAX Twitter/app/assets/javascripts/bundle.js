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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(1);

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
    } else if(this.followState === 'unfollowed') {
      this.$el.prop('disabled', false);
      this.$el.html('Follow!');
    } else if(this.followState === 'following') {
      this.$el.prop('disabled', true);
      this.$el.html('following...');
    } else if(this.followState === 'unfollowing') {
      this.$el.prop('disabled', true);
      this.$el.html('unfollowing...');
    }
  }
  
  handleClick(e) {
    const self = this;
    
    e.preventDefault();
    if(this.followState === 'followed') {
      self.followState = 'unfollowing';
      self.render();
      
      APIUtil.unfollowUser(this.userId).then(() => {
        self.followState = 'unfollowed';
        self.render();
      });
    }
    if(this.followState === 'unfollowed') {
      self.followState = 'following';
      self.render();
      
      APIUtil.followUser(this.userId).then(() => {
        self.followState = 'followed';
        self.render();
      });
    }
    // if(self.followState === 'followed') {
    //   self.render();
    //   $.ajax({
    //     method: 'DELETE',
    //     url: `/users/${self.userId}/follow`,
    //     dataType: 'JSON',
    //     success: function(response) {
    //       self.followState = 'unfollowed';
    //       self.render();
    //     }
    //   });
    // }
    // 
    // if(self.followState === 'unfollowed') {
    //   self.render();
    //   $.ajax({
    //     method: 'POST',
    //     url: `/users/${self.userId}/follow`,
    //     dataType: 'JSON',
    //     success: function(response) {
    //       self.followState = 'followed';
    //       self.render();
    //     }
    //   });
    // }
  }
  
}


module.exports = FollowToggle;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: (id) => (
    $.ajax({
      method: 'POST',
      url: `/users/${id}/follow`,
      dataType: 'json',
    })
  ),

  unfollowUser: (id) => (
     $.ajax({
      method: 'DELETE',
      url: `/users/${id}/follow`,
      dataType: 'json',
    })
  ),
  
  searchUsers: query => (
    $.ajax({
      url: '/users/search',
      dataType: 'json',
      method: 'GET',
      data: { query }
    })
  ),
  
  createTweet: data => (
    $.ajax({
      url: '/tweets',
      dataType: 'json',
      method: 'POST',
      data: { data }
    })
  ),
  
}

module.exports = APIUtil;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(0);
const UsersSearch = __webpack_require__(3);
const TweetCompose = __webpack_require__(4);

$(function() {
  $('button.follow-toggle').each( (i, btn) => new FollowToggle(btn, {}) );
  $('.users-search').each( (i, item) => new UsersSearch(item) );
  $('form.tweet-compose').each( (i, form) => new TweetCompose(form) );
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(1);
const FollowToggle = __webpack_require__(0);

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$ul = $('.users');
    this.$input = this.$el.find('input[name=username]');
    
    this.$input.on('input', this.handleInput.bind(this));
  }
  
  handleInput(event) {
    APIUtil.searchUsers(this.$input.val()).then(users => this.renderResults(users));
  }
  
  renderResults(users) {
    this.$ul.empty();
    
    for(var i = 0; i < users.length; i++) {
      let user = users[i];
      
      let $li = $(`<li></li>`);
      let $a = $(`<a></a>`);
      $a.text(`${user.username}`)
      $a.attr('href', `/users/${user.id}`);
      
      let $button = $('<button></button');
      new FollowToggle($button, {
        userId: user.id,
        followState: user.followed ? 'followed' : 'unfollowed'
      })
      
      
      $li.append($a);
      $li.append($button);
      this.$ul.append($li);
    }
  }
}

module.exports = UsersSearch;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(1);

class TweetCompose {
  constructor(el) {
    this.$form = $(el);
    
    this.$form.on('submit', this.submit.bind(this));
  }
  
  submit(event) {
    event.preventDefault();
    let $data = this.$form.serializeJSON();
    this.$el.find(':input').prop('disabled', true);
    
    
    APIUtil.createTweet($data).then(tweet => this.handleSuccess(tweet));
  }
  
  clearInput() {
    this.$el.find(':input').empty();
  }
  
  handleSuccess() {
    const $tweetsUl = $(this.$el.data('tweets-ul'));
    $tweetsUl.trigger('insert-tweet', data);

    this.clearInput();
  }
}

module.exports = TweetCompose;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map