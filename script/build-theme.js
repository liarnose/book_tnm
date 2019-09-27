var metalsmith = require('metalsmith');
var postcss = require('metalsmith-postcss');

metalsmith(__dirname)
  .source('../theme-src')
  .destination('../dest')
  .clean(false)
  .use(postcss({
    plugins: {
      'postcss-nested': {},
      'postcss-custom-properties': {
         preserve: false,
      },
    }
  }))
  .build(function(err) {
    if (err) throw err;
  });