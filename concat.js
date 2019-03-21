var concat = require('concat-files');
concat([
  './dist/weather/runtime.js',
  './dist/weather/es2015-polyfills.js',
  './dist/weather/polyfills.js',
  './dist/weather/main.js'
], './dist/weather/build.js', function (err) {
  if (err) throw err
  console.log('done');
});