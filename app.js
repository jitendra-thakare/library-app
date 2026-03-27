const chalk = require('chalk')
const yargs = require('yargs')

const jsonHandler = require('./utils/jsonHandler.js')

const adminHandler = require('./modules/admin.js')
const studentHandler = require('./modules/student.js')
const bookHandler = require('./modules/book.js')


yargs.version('1.0.0')

yargs.command({
    command: 'addStudent',
    describe: 'Add a Student',
    builder: {
        password: {
            describe: 'Admin Login Password',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        if(jsonHandler.checkPassword('admin',argv.password)){
            console.log(chalk.green.bold.inverse('Logged in successful'))
        }
        else{
            console.log(chalk.red.bold.inverse('Invalid Password!'))
        }
    }
})

yargs.parse()