const chalk = require('chalk')
const yargs = require('yargs')

const jsonHandler = require('./utils/jsonHandler.js')

require('./commands/adminCommands')
require('./commands/studentCommands')
const bookHandler = require('./modules/book.js')


yargs.version('1.0.0')



yargs.parse()