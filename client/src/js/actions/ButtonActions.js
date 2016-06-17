var Reflux = require('reflux');

var ButtonActions = Reflux.createActions([
  'fetchList', 'deleteMovie', 'searchSave', 'getUpdateList', 'updateMovie'
]);

module.exports = ButtonActions;
