'use strict';

var PluginError = require('gulp-util').PluginError;
var map = require('map-stream');

var timeout;

function check(func, wait, file, cb) {
  if (timeout) {
    clearTimeout(timeout);
  }

  if (func() === true) {
    cb(null, file);
  }

  timeout = setTimeout(function() {
    check(func, cb);
  }, wait);

  return;
}

function result(func, wait) {
  return map(function(file, cb) {
    if (!func) {
      return cb(new PluginError('gulp-until', {
        message: 'No evaluation function passed.'
      }));
    }

    check(func, wait, file, cb);
  });
}

module.exports = function(param) {
  var wait = 100;
  var func;

  if (!param) {
    return result();
  }

  if (typeof param === 'function') {
    return result(param);
  }

  if (typeof param.check === 'function') {
    func = param.check;
  }

  if (typeof param.wait === 'number') {
    wait = param.wait;
  }

  return result(func, wait);
};
