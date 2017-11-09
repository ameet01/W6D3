const APIUtil = require('./api_util');

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