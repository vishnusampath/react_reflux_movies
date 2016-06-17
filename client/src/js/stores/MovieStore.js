var Reflux = require('reflux');
var ButtonActions = require('../actions/ButtonActions');

var MovieStore = Reflux.createStore({
  listenables: ButtonActions,
  movieJSONArray: [],
  updateMovieObject: {},

  onFetchList: function () {
    $.ajax({
      type:'GET',
      url:'/api/movies',
      datatype:'json',
      success:function(result)
      {
        this.movieJSONArray=result;
        this.trigger(this.movieJSONArray);
      }.bind(this)

    })
  },

  onDeleteMovie: function (movie_ID) {
    $.ajax({
      type: 'DELETE',
      url: '/api/movies/' + movie_ID,
      success: function (result) {
        return this.onFetchList();
      }.bind(this)
    })
  },

  onSearchSave: function (searchTitle) {
    $.ajax({
      type:'POST',
      url: '/api/movies',
      data: jQuery.param({Title: searchTitle}),
      cache: false,
      success: function (data) {
        this.onFetchList();
      }.bind(this)
    })
  },

  onGetUpdateList: function (movie_id) {
    $.ajax({
      type: 'GET',
      url: '/api/movies/' + movie_id,
      cache: false,
      success: function (result) {
        this.updateMovieObj = result;
        this.trigger(this.updateMovieObj);
      }.bind(this)

    })
  },

  onUpdateMovie: function (movie_id, updateFormQuery) {

    $.ajax({
      type: 'PUT',
      url: '/api/movies/' + movie_id,
      data: updateFormQuery,
      cache: false,
      success: function () {
        alert("Your Movie has been Updated");
        this.updateMovieObj = {};
        this.trigger(this.updateMovieObj);
      }.bind(this)
    })
  }
});

module.exports = MovieStore;
