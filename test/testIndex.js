require("babel-core/register")
require('babel-polyfill')
require('mocha')
// require('./testRunner.js')
let browserRunner = require('./testBrowserRunner.js')

browserRunner.runBrowserTests()
