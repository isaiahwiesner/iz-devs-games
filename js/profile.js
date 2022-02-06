import { checkSettings } from "./localStorage.js"
checkSettings(false)
import { checkHighscores } from "./highScores.js"
checkHighscores(false)

const settings = JSON.parse(localStorage.getItem('settings'))

const profileButton = document.getElementById('profileButton');
profileButton.innerHTML = settings[0].username

const usernamedisplay = document.getElementById('usernamedisplay');
usernamedisplay.innerHTML = settings[0].username

const usernamebtn = document.getElementById('usernamebtn');

const close = document.getElementById('close');

profileButton.addEventListener('click', () => {
    const profilesettings = document.getElementById('profilesettings');
    profilesettings.classList.add('show')
    profilesettings.classList.remove('hide')
})

close.addEventListener('click', () => {
    profilesettings.classList.add('hide')
    profilesettings.classList.remove('show')
})

usernamebtn.addEventListener('click', (e) => {
    e.preventDefault()
    const username = document.getElementById('username');
    if (username.value == '') return;
    const usernospace = username.value.replace(' ', '')
    if (usernospace == '') return;
    settings[0].username = username.value
    localStorage.setItem('settings', JSON.stringify(settings))
    profileButton.innerHTML = username.value
    usernamedisplay.innerHTML = username.value
    document.forms[0].reset()
    usernamebtn.classList.add('green')
    setTimeout(function(){
        usernamebtn.classList.remove('green')
    }, 1000)
})

function numComma(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}

const highScores = JSON.parse(localStorage.getItem('highScores'))
const hsfb = document.getElementById('hsfb');
const hssn = document.getElementById('hssn');
const hsvj = document.getElementById('hsvj');
hsfb.innerHTML = numComma(highScores[0].flappybat)
hssn.innerHTML = numComma(highScores[0].snake)
hsvj.innerHTML = numComma(highScores[0].virusjump)