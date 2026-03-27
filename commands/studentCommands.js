const yargs = require('yargs')
const studentHandler = require('../modules/student')
const jsonHandler = require('../utils/jsonHandler.js')

yargs.command({
    command: 'changePasswordStudent',
    describe: 'Change Password for Student',
    builder: {
        username: {
            describe: 'Student Username',
            demandOption: true,
            type: 'string'
        },
        oldPassword: {
            describe: 'Student Login Password',
            demandOption: true,
            type: 'string'
        },
        newPassword: {
            describe: 'Student New Password',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        if(studentHandler.isStudentAuthenticated(argv.username, argv.oldPassword)){
            jsonHandler.changePassword('student', argv.username, argv.newPassword)
        }
    }
})


yargs.command({
    command: 'listBooksStudent',
    describe: 'List all Books',
    builder: {
        username: {
            describe: 'Student Username',
            demandOption: true,
            type: 'string'
        },
        password: {
            describe: 'User Login Password',
            demandOption: true,
            type: 'string'
        }

    },
    handler(argv) {
        if(studentHandler.isStudentAuthenticated(argv.username, argv.password)){
            jsonHandler.listBooks()
        }
    }
})
module.exports = yargs