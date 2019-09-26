var metalsmith = require('metalsmith');
var postcss = require('metalsmith-postcss');
var watch = require('metalsmith-watch');

metalsmith(__dirname)
  .source('../theme-src')
  .destination('../theme-dest')
  .clean(true)
  .use(postcss({
    plugins: {
      'postcss-nested': {},
      'postcss-custom-properties': {
         preserve: false,
      },
    }
  }))
  .use(watch({
      paths: {
        '${source}/**/*': true,
      },
  }))
  .build(function(err) {
    if (err) throw err;
  });