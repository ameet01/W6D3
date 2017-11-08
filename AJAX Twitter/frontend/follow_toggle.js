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