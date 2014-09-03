var Dispatcher = require('./vendor/Dispatcher'),
    copyProperties = require('react-atom-fork/lib/copyProperties');

var AppDispatcher = copyProperties(new Dispatcher(), {

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the browser.
   */
  handleBrowserAction: function(action) {
    var payload = {
      source: 'SERVER_ACTION',
      action: action
    };
    this.dispatch(payload);
  },

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the view.
   */
  handleViewAction: function(action) {
    var payload = {
      source: 'VIEW_ACTION',
      action: action
    };
    this.dispatch(payload);
  }

});

module.exports = AppDispatcher;
