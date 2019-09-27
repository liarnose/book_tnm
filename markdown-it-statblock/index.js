'use strict';

var path = require('path');
var fs = require('fs');
var hbs = require('jstransformer')(require('jstransformer-handlebars'));

var REGEX = /<<\s*statblock\s+(.+?)\s*,\s*(.+?)\s*>>/i;

module.exports = function include_plugin(md, options) {
  var dataRoot = '.';
  var templateRoot = '.';
  var pattern = REGEX;

  if (options) {
    if (typeof options === 'string') {
      dataRoot = options;
      templateRoot = options;
    } else {
      dataRoot = options.dataRoot || dataRoot;
      templateRoot = options.templateRoot || templateRoot;
    }
  }

  function _replace(src) {
    var cap;

    while ((cap = pattern.exec(src))) {
      var templateFilePath = path.resolve(templateRoot, cap[1].trim());
      var dataFilePath = path.resolve(dataRoot, cap[2].trim());
      
      var template = fs.readFileSync(templateFilePath, 'utf8');
      var data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
      var srcText = hbs.render(template, {}, data).body;
      
      src = src.slice(0, cap.index) + srcText + src.slice(cap.index + cap[0].length, src.length);
    }
    return src;
  }

  function _doStatblock(state) {
    state.src = _replace(state.src);
  }

  md.core.ruler.before('normalize', 'statblock', _doStatblock);
};
