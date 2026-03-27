const chalk = require('chalk')
const jsonHandler = require("../utils/jsonHandler")
const studentHandler = require("./student")
const test = function(){
    console.log('Admin Connected')
}

const isAdminAuthenticated = (password) => {
    if (jsonHandler.checkPassword('admin','admin', password)) {
        console.log(chalk.green.bold.inverse('Logged in successful'))
        return true
    } else {
        console.log(chalk.red.bold.inverse('Invalid Password!'))
        return false
    }
}

const addStudent = function(studentUserName, studentPassword){
    const studentData = jsonHandler.loadData('student')
    if (!studentUserName || !studentPassword) {
        console.log('Invalid input')
        return
    }
    const existingStudent = studentData.find(
        (student) => student.username === studentUserName
    )
    if (!existingStudent) {
        studentData.push({
            username: studentUserName,
            password: studentPassword,
            issuedBooks : []
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
    const student = studentData.find(s => s.username === studentUserName)

    if (!student) {
        console.log(chalk.red.inverse('Student Does not exist!'))
        return
    }

    if (student.issuedBooks.length > 0) {
        console.log(chalk.red.inverse('Cannot delete! Student has issued books'))
        studentHandler.checkIssuedBooks(studentUserName)
        return
    }
    const updatedData = studentData.filter(s => s.username !== studentUserName)
    jsonHandler.saveData('student', updatedData)

    console.log(chalk.yellow.inverse(studentUserName + ' Account Deleted!'))
}

const addBook = function(bookName, authorName, bookCount){
    const bookData = jsonHandler.loadData('book')
    if (!bookName) {
        console.log('Invalid input for Book Name')
        return
    }
    const bookExists = bookData.find((book) => book.bookName === bookName)

    const bookCountInt = parseInt(bookCount)
    if(isNaN(bookCountInt) || bookCountInt <=0 ) {
        console.log(chalk.red.inverse('Invalid book count!'))
        return
    }
    if(!authorName){
        authorName="Not Entered"
    }
    if (!bookExists ) {
        bookData.push({
            bookName: bookName,
            authorName: authorName,
            bookCount : bookCountInt,
            issuedTo : []
        })
        jsonHandler.saveData('book',bookData)
        console.log(chalk.green.inverse(`New Book added! ${bookName}`))
    } else {
        bookExists.bookCount += bookCountInt

        if(bookExists.authorName === 'Not Entered' && authorName !== 'Not Entered'){
            bookExists.authorName = authorName
            console.log(chalk.yellow.inverse('Book Author Name Added :' + authorName))
        }
        jsonHandler.saveData('book',bookData)
        console.log(chalk.yellow.inverse(bookCount+' '+bookName+' Books Added'))
    }
}


const removeBook = function(bookName){
    const bookData = jsonHandler.loadData('book')
    const bookExists = bookData.find(b => b.bookName === bookName)

    if (!bookExists) {
        console.log(chalk.yellow.inverse('Book Doesnt exist'))
        return
    }

    if (bookExists.issuedTo.length > 0) {
        console.log(chalk.red.inverse('Cannot delete! Book is issued to below students:\n' + bookExists.issuedTo.join(', ')))
        return
    }

    const updatedBooks = bookData.filter(book => book.bookName !== bookName)
    jsonHandler.saveData('book', updatedBooks)
    console.log(chalk.green.inverse(bookName + ' Book Deleted!'))
}



module.exports = {
    test, addStudent,removeStudent, addBook, removeBook ,isAdminAuthenticated
}