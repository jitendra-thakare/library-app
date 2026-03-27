const loadData = (file) => {
    try {
        const data = fs.readFileSync('./data/'+file+'.json')
        return JSON.parse(data.toString())
    } catch {
        return []
    }
}

const checkPassword= (profile,password) => ( loadData(profile).password === password )


module.exports = {
    checkPassword, loadData
}