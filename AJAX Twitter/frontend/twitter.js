const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');
const TweetCompose = require('./tweet_compose');

$(function() {
  $('button.follow-toggle').each( (i, btn) => new FollowToggle(btn, {}) );
  $('.users-search').each( (i, item) => new UsersSearch(item) );
  $('form.tweet-compose').each( (i, form) => new TweetCompose(form) );
});