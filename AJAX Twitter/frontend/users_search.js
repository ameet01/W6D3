const APIUtil = require('./api_util');
const FollowToggle = require('./follow_toggle');

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