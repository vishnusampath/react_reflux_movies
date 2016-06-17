var React = require('react');
var Link = require('react-router').Link;
var Router = require('react-router');
var NavigationBar=require('./NavigationBar');
var Reflux = require('reflux');

var MovieStore = require('../stores/MovieStore');
var ButtonActions = require('../actions/ButtonActions');

var UpdateMovieBox = React.createClass({
  getInitialState: function () {
    return {
      updateMovieObj: {},
      Title: '',
      Year: '',
      Actors: '',
      Director: '',
      Genre: '',
      Released: '',
      Plot: '',
      imdbRating: '',
    };
  },

  mixins: [
    Reflux.listenTo(MovieStore, 'loadUpdateFields')
  ],

  loadUpdateFields: function (result) {
    this.setState({updateMovieObj: result.updateMovieObj});
    this.setState({Title: result.Title});
    this.setState({Year: result.Year});
    this.setState({Actors: result.Actors});
    this.setState({Director: result.Director});
    this.setState({Genre: result.Genre});
    this.setState({Released: result.Released});
    this.setState({Plot: result.Plot});
    this.setState({imdbRating: result.imdbRating});
  },

  componentDidMount: function () {

    var movie_id = this.props.params.movie_id;
    ButtonActions.getUpdateList(movie_id);
  },

  handleYearChange: function (e) {
    this.setState({Year: e.target.value })
  },

  handleActorsChange: function (e) {
    this.setState({Actors: e.target.value })
  },

  handleDirectorChange: function (e) {
    this.setState({Director: e.target.value })
  },

  handleGenreChange: function (e) {
    this.setState({Genre: e.target.value })
  },

  handleReleasedChange: function (e) {
    this.setState({Released: e.target.value })
  },

  handlePlotChange: function (e) {
    this.setState({Plot: e.target.value })
  },

  handleimdbRatingChange: function (e) {
    this.setState({imdbRating: e.target.value })
  },

  handleUpdateMovieButtonClick: function () {

    var movie_id = this.props.params.movie_id;
    var updateFormQuery = $('#updateForm').serialize();
    ButtonActions.updateMovie(movie_id, updateFormQuery);

  },

  render: function () {
    return(
      <div className="container">
        <NavigationBar />
        {this.state.Title != undefined ?
        <div className="row" id="updateMovieBox">
          <div className="col-md-3 pull-left"></div>
      		<div className="col-md-6 jumbotron">
      			<form role="form" id="updateForm">
              <div className="form-group">

                <label for="updateTitle">
                  Title
                </label><br/>
                <input type="text" className="form-control" id="updateTitle" name="updateTitle"  value={this.state.Title} readOnly />

              </div>
              <div className="form-group">

                <label for="updateYear">
                  Year
                </label>
                <input type="text" className="form-control" id="updateYear" name="updateYear" value={this.state.Year} onChange={this.handleYearChange} />

              </div>
      				<div className="form-group">

      					<label for="updateActors">
      						Actors
      					</label>
      					<input type="text" className="form-control" id="updateActors" name="updateActors" value={this.state.Actors} onChange={this.handleActorsChange} />

      				</div>
      				<div className="form-group">

                <label for="updateDirector">
                  Director
                </label>
                <input type="text" className="form-control" id="updateDirector" name="updateDirector" value={this.state.Director} onChange={this.handleDirectorChange} />

      				</div>
              <div className="form-group">

                <label for="updateGenre">
                  Genre
                </label>
                <input type="text" className="form-control" id="updateGenre" name="updateGenre" value={this.state.Genre} onChange={this.handleGenreChange} />

      				</div>
              <div className="form-group">

      					<label for="updatePlot">
      						Plot
      					</label>
      					<input type="text" className="form-control" id="updatePlot" name="updatePlot" value={this.state.Plot} onChange={this.handlePlotChange} />

      				</div>
              <div className="form-group">

      					<label for="updateReleased">
      						Released
      					</label>
      					<input type="text" className="form-control" id="updateReleased" name="updateReleased" value={this.state.Released} onChange={this.handleReleasedChange} />

      				</div>
      				<div className="form-group">

                <label for="updateimdbRating">
                  Rating
                </label>
                <input type="text" className="form-control" id="updateimdbRating" name="updateimdbRating" value={this.state.imdbRating} onChange={this.handleimdbRatingChange} />

      				</div>
      			</form>
            <center>
            <button className="btn btn-primary" id="updateMovieButton" onClick={this.handleUpdateMovieButtonClick}>
              Update Movie
            </button>
            </center>
      		</div>
          <div className="col-md-3"></div>
      	</div>
        : <div>Movie Successfully Added</div>}
      </div>
    );
  }

});

module.exports = UpdateMovieBox;
