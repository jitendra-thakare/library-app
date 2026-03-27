const chalk = require('chalk')
const jsonHandler = require("../utils/jsonHandler")
const bookHandler = require("./book")

const test = function(){
    console.log('Student Connected')
}
const returnStudent = function (studentUsername){
    const studentData = jsonHandler.loadData('student')
    return studentData.find((s) => s.username == studentUsername)
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

const issueReturnBook = function(studentUserName, bookName, flag){
    if (!bookName) {
        console.log('Invalid input for BookName')
        return
    }
    const book = bookHandler.returnBook(bookName)
    if(!book){
        console.log(chalk.red.inverse('Book Not available!'))
        return
    }
    if ((flag === 'issue' && book.bookCount > 0) ||
        (flag === 'return')) {
        bookHandler.updateBookCount(studentUserName,bookName, flag)
        updateStudentBookData(studentUserName, bookName, flag)
    } else {
        console.log(chalk.red.inverse('Book Not available!'))
    }
}


const updateStudentBookData = function(studentUserName, bookName,flag){
    const studentData =  jsonHandler.loadData('student')
    studentData.find((s)=>{
        if(s.username=== studentUserName){
            if(flag === 'issue'){
                s.issuedBooks.push(bookName)
            }
            else if(flag == 'return'){
                s.issuedBooks = s.issuedBooks.filter((b) => b !== bookName)
            }
        }
    })
    jsonHandler.saveData('student', studentData)
}

const checkIssuedBooks = function(username){
    const studentData =  returnStudent(username)
    console.log(chalk.cyan.inverse('Books Issued by '+username))
    studentData.issuedBooks.forEach(book => {
        console.log(chalk.yellow.inverse(book))
    });
}
module.exports = {
    isStudentAuthenticated, issueReturnBook, checkIssuedBooks
}