const gameList = document.getElementById('gameList');

const loadGames = async () => {
    try {
        const res = await fetch("https://play.izzdevs.me/js/api/games.json");
        let izgames = await res.json();
        displayGames(izgames);
        console.log(izgames);
    } catch(err) {
        console.log(err);
    }
}

const displayGames = (games) => {
    const htmlString = games
        .map((game) => {
            return `
                <div class="box">
                    <div class="text">
                        <h1><a href="${game.link}">${game.name}</a></h1>
                        <p>${game.description}</p>
                    </div>
                    <div class="img">
                        <img src="${game.image}">
                    </div>
                </div>
            `;
        })
        .join('');
    gameList.innerHTML = htmlString;
}

loadGames();