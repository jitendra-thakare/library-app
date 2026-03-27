const yargs = require('yargs')
const adminHandler = require('../modules/admin')
const jsonHandler = require('../utils/jsonHandler.js')

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
        if(adminHandler.isAdminAuthenticated(argv.password)){
            adminHandler.addStudent(argv.studentName, argv.studentPassword)
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
        if(adminHandler.isAdminAuthenticated(argv.password)){
            adminHandler.removeStudent(argv.studentName)
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
        if(adminHandler.isAdminAuthenticated(argv.oldPassword)){
            jsonHandler.changePassword('admin','admin',argv.newPassword)
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
        if(adminHandler.isAdminAuthenticated(argv.password)){
            adminHandler.addBook(argv.bookName,argv.authorName, argv.bookCount)
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
        if(adminHandler.isAdminAuthenticated(argv.password)){
            adminHandler.removeBook(argv.bookName)
        }
    }
})

yargs.command({
    command: 'listBooks',
    describe: 'List all Books',
    builder: {
        password: {
            describe: 'Admin Login Password',
            demandOption: true,
            type: 'string'
        }

    },
    handler(argv) {
        if(adminHandler.isAdminAuthenticated(argv.password)){
            adminHandler.listBooks()
        }
    }
})

module.exports = yargs