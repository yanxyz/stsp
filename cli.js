#!/usr/bin/env node

/**
 * create .sublime-project
 * Ivan Yan
 */

'use strict'

var fs = require('fs')
var path = require('path')
var minimist = require('minimist')

var argv = minimist(process.argv.slice(2), {
  alias: {n: 'name', h: 'help'},
  string: ['name']
})

if (argv.help) {
  fs.createReadStream(__dirname + '/usage.txt').pipe(process.stdout)
} else {
  create(argv.name)
}

function create (filename) {
  filename = (filename ? filename : path.basename(process.cwd())) + '.sublime-project'

  fs.access(filename, function (err) {
    if (err) {
      fs.createReadStream(path.join(__dirname, 'sublime-project.json'))
        .pipe(fs.createWriteStream(filename))
    } else {
      console.log('%s already exists.', filename)
    }
  })
}
