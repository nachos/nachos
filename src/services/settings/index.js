'use strict';

var nachosOpen = require('nachos-open');

module.exports = {
  open: function (name) {
    nachosOpen('settings', [name]);
  }
};