'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.8.159:7300/mock/5c768cf6df7e1f0ee717ace4/excavate"',
  DEBUG_MODE: false
})
