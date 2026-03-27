const chalk = require('chalk')
const jsonHandler = require("../utils/jsonHandler")

const test = function(){
    console.log('Admin Connected')
}

const addStudent = function(studentUserName, studentPassword){
        const studentData = jsonHandler.loadData('student')
        const duplicateNote = studentData.find((student) => student.username === studentUserName)
    
        if (!duplicateNote) {
            studentData.push({
                username: studentUserName,
                password: studentPassword,
                issuedBooks : [],
                penalty : []
            })
            jsonHandler.saveData('student',studentData)
            console.log(chalk.green.inverse('New Student added!'))
            console.log(chalk.white.inverse('Welcome to Library '+studentUserName))
        } else {
            console.log(chalk.red.inverse('Username Already taken!'))
        }
}

module.exports = {
    test, addStudent
}