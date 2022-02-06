const currentVersion = 0.1

export function checkHighscores(clear){
    if (clear == true) {
        localStorage.removeItem('highScores')
    }
    let obj = []
    var hs = {
        version: currentVersion,
        snake: 0,
        virusjump: 0,
        flappybat: 0
    }
    obj.push(hs)
    if (localStorage.getItem('highScores') == null) {
        console.log('High scores created')
        localStorage.setItem('highScores', JSON.stringify(obj))
    } else {
        console.log('High scores loaded')
    }
    const highScores = JSON.parse(localStorage.getItem('highScores'))
    if (highScores[0].version < currentVersion) {
        const snake = highScores[0].snake
        const virusjump = highScores[0].virusjump
        localStorage.removeItem('highScores')
        obj[0].snake = snake
        obj[0].tictactoe = tictactoe
        obj[0].virusjump = virusjump
        localStorage.setItem('highScores', JSON.stringify(obj))
        console.log('High scores updated')
    }
}