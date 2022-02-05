import { checkAI, switchAI } from './script.js'

function settingsSound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.currentTime = 0;
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}
const soundSettings = new settingsSound('../snd/settings.wav')

const settings = JSON.parse(localStorage.getItem('settings'))

displaySettings()

function displaySettings(){
    if (settings[0].sound == true){
        document.getElementById('settingsSound').classList.add('on')
        document.getElementById('settingsSound').classList.remove('off')
        document.getElementById('settingsSound').innerHTML = `Sound: Enabed<i class="fa fa-volume-up"></i>`
    } else {
        document.getElementById('settingsSound').classList.add('off')
        document.getElementById('settingsSound').classList.remove('on')
        document.getElementById('settingsSound').innerHTML = `Sound: Disabled<i class="fa fa-volume-off"></i>`
    }
    if (checkAI() == true){
        document.getElementById('settingsAI').classList.add('on')
        document.getElementById('settingsAI').classList.remove('off')
        document.getElementById('settingsAI').innerHTML = `AI: Enabed`
    } else {
        document.getElementById('settingsAI').classList.add('off')
        document.getElementById('settingsAI').classList.remove('on')
        document.getElementById('settingsAI').innerHTML = `AI: Disabled`
    }
}

document.getElementById('settingsbtn').addEventListener('click', () => {
    document.getElementById('settingsPopup').classList.add('show')
})

document.getElementById('settingsClose').addEventListener('click', () => {
    document.getElementById('settingsPopup').classList.remove('show')
})

document.getElementById('settingsSound').addEventListener('click', () => {
    settings[0].sound = !settings[0].sound
    if (!settings[0].sound == false){
        soundSettings.play()
    }
    localStorage.setItem('settings', JSON.stringify(settings))
    displaySettings()
})
document.getElementById('settingsAI').addEventListener('click', () => {
    switchAI()
    if (!settings[0].sound == false){
        soundSettings.play()
    }
    displaySettings()
})