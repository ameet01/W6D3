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