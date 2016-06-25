#!/usr/bin/env node

/**
 * Arguments
 *
 *  - --input
 *
 */

var argv = require('minimist')(process.argv.slice(2))
var fs = require('fs')
var ngAnnotate = require('ng-annotate')
var globule = require('globule')
var mkdirp = require('mkdirp')
var log4js = require('log4js')
var meow = require('meow')
var path = require('path')
log4js.configure({
  replaceConsole: true,
  appenders: [
    { type: 'console' }
  ]
})

var logger = log4js.getLogger('npm-ng-annotate')
logger.setLevel(argv.verbose ? 'ALL' : 'FATAL')

if (argv.help) {
  meow(`
    Usage:
      npm-ng-annotate -i FILES -o DEST
      
      FILES 
        is a glob expression. for example app/**/*.js
      
      DEST 
        is the output folder to construct
  `)
} else {
  var input = (argv.i || '*/**/*.js,!node_modules/**').split(',')
  logger.trace('running on ', input)
  var dest = argv.o || '.tmp/annotated'
  var files = globule.find(input)
  files.forEach(function (f) {
    fs.readFile(f, function (err, data) {
      if (err) {
        logger.fatal('unable to read [' + f + ']', err)
        process.exit(1)
      }
      logger.trace('parsing', f)
      var output = ngAnnotate(data.toString(), { add: true, remove: true }).src
      var destFile = path.join(dest, path.relative(process.cwd(), f))
      mkdirp(path.join(destFile, '..'), function () {
        fs.writeFile(destFile, output)
      })
    })
  })
}
