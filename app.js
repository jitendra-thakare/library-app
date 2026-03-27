const chalk = require('chalk')
const yargs = require('yargs')

const jsonHandler = require('./utils/jsonHandler.js')

const adminHandler = require('./modules/admin.js')
const studentHandler = require('./modules/student.js')
const bookHandler = require('./modules/book.js')


yargs.version('1.0.0')

jsonHandler()
adminHandler()
studentHandler()
bookHandler()