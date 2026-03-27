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
const removeStudent = function(studentUserName){
    const studentData = jsonHandler.loadData('student')
    const studentDataModified = studentData.filter((student) => student.username !== studentUserName)

    if (studentData.length >studentDataModified.length){
            console.log(chalk.yellow.inverse(studentUserName+' Account Deleted!'))
            jsonHandler.saveData('student',studentDataModified)
        } 
        else {
            console.log(chalk.red.inverse('Student Does not exists!'))
        }

    }
module.exports = {
    test, addStudent,removeStudent
}