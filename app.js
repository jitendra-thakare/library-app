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
        },
        studentName: {
            describe: 'The name of New Student',
            demandOption: true,
            type: 'string'
        },
        studentPassword: {
            describe: 'The defult Password of New Student',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        if(jsonHandler.checkPassword('admin',argv.password)){
            console.log(chalk.green.bold.inverse('Logged in successful'))
            adminHandler.addStudent(argv.studentName, argv.studentPassword)
        }
        else{
            console.log(chalk.red.bold.inverse('Invalid Password!'))
        }
    }
})

yargs.command({
    command: 'removeStudent',
    describe: 'Delete a Student',
    builder: {
        password: {
            describe: 'Admin Login Password',
            demandOption: true,
            type: 'string'
        },
        studentName: {
            describe: 'The username of Student to be deleted',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        if(jsonHandler.checkPassword('admin',argv.password)){
            console.log(chalk.green.bold.inverse('Logged in successful'))
            adminHandler.removeStudent(argv.studentName)
        }
        else{
            console.log(chalk.red.bold.inverse('Invalid Password!'))
        }
    }
})

yargs.command({
    command: 'changePasswordAdmin',
    describe: 'Change Password for Admin',
    builder: {
        oldPassword: {
            describe: 'Admin Login Password',
            demandOption: true,
            type: 'string'
        },
        newPassword: {
            describe: 'Admin New Password',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        if(jsonHandler.checkPassword('admin',argv.oldPassword)){
            jsonHandler.changePassword('admin',argv.newPassword)
        }
        else{
            console.log(chalk.red.bold.inverse('Invalid Password!'))
        }
    }
})

yargs.command({
    command: 'addBook',
    describe: 'Add a Book',
    builder: {
        password: {
            describe: 'Admin Login Password',
            demandOption: true,
            type: 'string'
        },
        bookName: {
            describe: 'The name of Book',
            demandOption: true,
            type: 'string'
        },
        authorName: {
            describe: 'The Name of Author',
            type: 'string'
        },
        bookCount: {
            describe: 'The count of that Book',
            demandOption: true,
            type: 'string'
        }

    },
    handler(argv) {
        if(jsonHandler.checkPassword('admin',argv.password)){
            console.log(chalk.green.bold.inverse('Logged in successful'))
            adminHandler.addBook(argv.bookName,argv.authorName, argv.bookCount)
        }
        else{
            console.log(chalk.red.bold.inverse('Invalid Password!'))
        }
    }
})

yargs.command({
    command: 'removeBook',
    describe: 'Remove a Book',
    builder: {
        password: {
            describe: 'Admin Login Password',
            demandOption: true,
            type: 'string'
        },
        bookName: {
            describe: 'The name of Book',
            demandOption: true,
            type: 'string'
        }

    },
    handler(argv) {
        if(jsonHandler.checkPassword('admin',argv.password)){
            console.log(chalk.green.bold.inverse('Logged in successful'))
            adminHandler.removeBook(argv.bookName)
        }
        else{
            console.log(chalk.red.bold.inverse('Invalid Password!'))
        }
    }
})
yargs.parse()