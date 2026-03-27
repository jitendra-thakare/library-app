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

const checkPassword= (profile,password) => ( loadData(profile).password === password )

module.exports = { loadData, saveData, checkPassword}