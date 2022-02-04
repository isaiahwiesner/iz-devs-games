const currentVersion = 0.1

export function checkSettings(clear){
    if (clear == true) {
        localStorage.removeItem('settings')
    }
    let obj = []
    var ls = {
        username: 'User',
        sound: false,
        version: currentVersion
    }
    obj.push(ls)
    if (localStorage.getItem('settings') == null) {
        console.log('Settings created')
        localStorage.setItem('settings', JSON.stringify(obj))
    } else {
        console.log('Settings loaded')
    }
    const settings = JSON.parse(localStorage.getItem('settings'))
    if (settings[0].version < currentVersion) {
        const username = settings[0].username
        const sound = settings[0].sound
        localStorage.removeItem('settings')
        obj[0].username = username
        obj[0].sound = sound
        localStorage.setItem('settings', JSON.stringify(obj))
        console.log('Settings updated')
    }
    setTimeout(function() {
        console.log(JSON.parse(localStorage.getItem('settings')))
    }, 10)
}