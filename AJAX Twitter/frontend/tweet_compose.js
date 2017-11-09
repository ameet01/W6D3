const APIUtil = require('./api_util');

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