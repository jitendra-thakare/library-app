const fs = require('fs')
const chalk = require('chalk')
const passwordValidator  = require('password-validator')

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

const checkPassword = (profile, password) => {
    const data = loadData(profile)

    if (!data || !data.password) {
        return false
    }

    return data.password === password
}
const changePassword = function(profile,newPassword){
    const schema = new passwordValidator()
    schema.is().min(8,'Minimum Password Length Should be 8.').
           is().max(16,'Maximum Password Length Should be 16.').
           has().uppercase(1,'Password Should contain atleast 1 Uppercase.')
           .has().lowercase(1,'Password Should contain atleast 1 Lowercase.')
           .has().digits(1,'Password Should contain atleast 1 Digit.')
    const profileData = loadData(profile)
    const passwordValidations = schema.validate(newPassword,{ details: true })
    if(passwordValidations.length === 0){
        profileData.password = newPassword
        saveData(profile,profileData)
        console.log(chalk.green.bold.inverse('Password changed successfully'))
    }
    else{
        passwordValidations.filter((passwordValidation) => console.log(chalk.red.inverse(passwordValidation.message)))
    }
}
module.exports = { loadData, saveData, checkPassword, changePassword}