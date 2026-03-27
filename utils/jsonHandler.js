const fs = require('fs')
const chalk = require('chalk')
const passwordValidator  = require('password-validator')
const { profile } = require('console')

const loadData = (file) => {
    try {
        const data = fs.readFileSync('./data/'+file+'.json')
        return JSON.parse(data.toString())
    } catch {
        return []
    }
}

const saveData = (file, data) => {
    fs.writeFileSync('./data/'+file+'.json', JSON.stringify(data))
}

const checkPassword = (profile, username, password) => {
    const profileData = loadData(profile)

    if (!profileData) return false

    let storedPassword

    if (profile === 'admin') {
        storedPassword = profileData.password
    } else {
        const user = profileData.find(p => p.username === username)
        if (user) {
            storedPassword = user.password
        }
    }

    return storedPassword === password
}

const changePassword = function(profile,username,newPassword){

    const schema = new passwordValidator()
    schema.is().min(8,'Minimum Password Length Should be 8.').
           is().max(16,'Maximum Password Length Should be 16.').
           has().uppercase(1,'Password Should contain atleast 1 Uppercase.')
           .has().lowercase(1,'Password Should contain atleast 1 Lowercase.')
           .has().digits(1,'Password Should contain atleast 1 Digit.')
    profileData = loadData(profile)

    const passwordValidations = schema.validate(newPassword,{ details: true })
    if(passwordValidations.length === 0){
        if(username=='admin'){
            profileData.password = newPassword
        }
        else{
            profileData.find(profile => {
            if(profile.username === username)
                {
                    profile.password = newPassword
                }
            })
        }
        saveData(profile,profileData)
        console.log(chalk.green.bold.inverse('Password changed successfully'))
    }
    else{
        passwordValidations.filter((passwordValidation) => console.log(chalk.red.inverse(passwordValidation.message)))
    }
}

const listBooks = function(){
    const bookData = loadData('book')
    if (bookData.length === 0) {
        console.log(chalk.yellow.inverse('No books available'))
        return
    }
    console.log(chalk.cyan.inverse('Book Name and Available Books'))
    let oddRow = true
    bookData.forEach((book) => {
        if(oddRow){
            console.log(book.bookName + ' Available Books '+ book.bookCount)
            
        }else{
            console.log(chalk.inverse(book.bookName + ' Available Books '+ book.bookCount))
        }
        oddRow = !oddRow
    })
}
module.exports = { loadData, saveData, checkPassword, changePassword, listBooks}