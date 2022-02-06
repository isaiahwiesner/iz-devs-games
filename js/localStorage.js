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
        console.log('%cSettings created', 'color: #0c0')
        localStorage.setItem('settings', JSON.stringify(obj))
    } else {
        console.log('%cSettings loaded', 'color: #0c0')
    }
    const settings = JSON.parse(localStorage.getItem('settings'))
    if (settings[0].version < currentVersion) {
        const username = settings[0].username
        const sound = settings[0].sound
        localStorage.removeItem('settings')
        obj[0].username = username
        obj[0].sound = sound
        localStorage.setItem('settings', JSON.stringify(obj))
        console.log('%cSettings updated', 'color: #fc0')
    }
    setTimeout(function() {
        console.log(JSON.parse(localStorage.getItem('settings')))
    }, 10)
}