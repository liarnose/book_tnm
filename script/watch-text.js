var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdownit');
var itAttrs = require('markdown-it-attrs');
var itDeflist = require('markdown-it-deflist');
var itStatblock = require('../markdown-it-statblock');
var layouts = require('metalsmith-layouts');
var watch = require('metalsmith-watch');

var md = markdown('default',{
  html: true,
});
md.parser
  .use(itAttrs)
  .use(itDeflist)
  .use(itStatblock, {
    dataRoot: 'dest/',
    templateRoot: 'dest/',
  });

metalsmith(__dirname)
  .source('../text-src')
  .destination('../dest')
  .clean(false)
  .use(md)
  .use(layouts({
    directory: "../dest/plain-tnm",
    default: "theme.hbs",
    pattern: "**/*.html",
  }))
  .use(watch({
      paths: {
        '${source}/**/*': '**/*',
      },
  }))
  .build(function(err) {
    if (err) throw err;
  });