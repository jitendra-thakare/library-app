const chalk = require('chalk')
const jsonHandler = require("../utils/jsonHandler")

const test = function(){
    console.log('Book Connected')
}

const returnBook = function (bookName){
    const bookData = jsonHandler.loadData('book')
    return bookData.find((b) => b.bookName == bookName)
}

const updateBookCount = function (username,bookName, flag, bookCount){
    const bookData = jsonHandler.loadData('book')

    if(flag === 'issue'){
        bookCount = -1
    }
    else if(flag === 'return'){
        bookCount = 1
    }
    bookData.find((b) => {
        if(b.bookName == bookName){
            if(!(b.issuedTo.find((s) => s === username))){
                b.bookCount += bookCount;
                if(bookCount < 0){
                    b.issuedTo.push(username)
                    console.log(chalk.green.inverse('Book Available'))
                    console.log(chalk.cyan.inverse(bookName+' is issued by '+username))
                }
            }else{
                
                if(username !== 'admin' && flag =='return'){
                    b.bookCount += bookCount;
                    b.issuedTo = b.issuedTo.filter((s) => s !== username)
                    console.log(chalk.cyan.inverse(bookName+' is returned by '+username))
                }else{
                    console.log(chalk.red.inverse('This book is already issued by User'))
                }
            }
        }})
    jsonHandler.saveData('book', bookData)
}

const bookIssuedBy = function(bookName){
    const bookData = returnBook(bookName)
    console.log(chalk.cyan.inverse(bookName+ 'Book is Issued by'))
    bookData.issuedTo.forEach(s => {
        console.log(chalk.yellow.inverse(s))
    });
}
module.exports = {
    returnBook, updateBookCount, bookIssuedBy
}