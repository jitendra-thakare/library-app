const chalk = require('chalk')
const jsonHandler = require("../utils/jsonHandler")

const test = function(){
    console.log('Admin Connected')
}

const isAdminAuthenticated = (password) => {
    if (jsonHandler.checkPassword('admin', password)) {
        console.log(chalk.green.bold.inverse('Logged in successful'))
        return true
    } else {
        console.log(chalk.red.bold.inverse('Invalid Password!'))
        return false
    }
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

const addBook = function(bookName, authorName, bookCount){
    const bookData = jsonHandler.loadData('book')
    const bookExists = bookData.find((book) => book.bookName === bookName)

    if(!authorName){
        authorName="Not Entered"
    }
    if (!bookExists) {
        bookData.push({
            bookName: bookName,
            authorName: authorName,
            bookCount : parseInt(bookCount),
            issuedTo : []
        })
        jsonHandler.saveData('book',bookData)
        console.log(chalk.green.inverse('New Book added!'))
        console.log(chalk.white.inverse(bookName))
    } else if(parseInt(bookCount) !== 0){
        const newBookCount = bookExists.bookCount+parseInt(bookCount)
        bookData.find((book) => {
            if(book.bookName === bookName){
                book.bookCount = newBookCount
                if(book.authorName === 'Not Entered' && authorName !== 'Not Entered' ){
                    book.authorName = authorName
                    console.log(chalk.yellow.inverse('Book Author Name Added :'+ authorName))
                }
            }
        })
        jsonHandler.saveData('book',bookData)
        console.log(chalk.yellow.inverse(bookCount+' '+bookName+' Books Added'))
    } else{
        console.log(chalk.red.inverse('Book Count should be greater than 0'))
    }
}


const removeBook = function(bookName){
    const bookData = jsonHandler.loadData('book')
    const bookExists = bookData.filter((book) => book.bookName !== bookName)

    if (bookExists.length !== bookData.length) {
        jsonHandler.saveData('book',bookExists)
        console.log(chalk.red.inverse(bookName + ' Book Deleted!'))
    } else{
        console.log(chalk.yellow.inverse('Book Doesnt exists'))
    }
}


const listBooks = function(){
    const bookData = jsonHandler.loadData('book')
    console.log(chalk.cyan.inverse('Book Name and Available Books'))
    oddRow = true
    bookData.forEach((book) => {
        if(oddRow){
            console.log(book.bookName + ' Available Books '+ book.bookCount)
            
        }else{
            console.log(chalk.inverse(book.bookName + ' Available Books '+ book.bookCount))
        }
        oddRow = !oddRow
    })
}
module.exports = {
    test, addStudent,removeStudent, addBook, removeBook, listBooks ,isAdminAuthenticated
}