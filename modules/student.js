const chalk = require('chalk')
const jsonHandler = require("../utils/jsonHandler")

const test = function(){
    console.log('Student Connected')
}

const isStudentAuthenticated = (username, password) => {
    if (jsonHandler.checkPassword('student', username, password)) {
        console.log(chalk.green.bold.inverse(username +' Logged in successful'))
        return true
    } else {
        console.log(chalk.red.bold.inverse('Invalid Password!'))
        return false
    }
}

module.exports = {
    isStudentAuthenticated
}