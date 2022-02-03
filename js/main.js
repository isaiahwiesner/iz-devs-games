const gameList = document.getElementById('gameList');
const searchbar = document.getElementById('searchbar');

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

async function search(searchString) {
    try {
        const res = await fetch("https://play.izzdevs.me/js/api/games.json");
        let izgames = await res.json();
        const filteredGames = izgames.filter((game) => {
            return (
                game.name.toLowerCase().includes(searchString)
            );
        });
        displayGames(filteredGames);
        if (filteredGames.toString() == ""){
            gameList.innerHTML = `<h1 class="center error">No games found!</h1>`;
        }
    } catch(err) {
        console.log(err);
    }
}

searchbar.addEventListener("keyup", (e) => {
    search(e.target.value)
});
    
loadGames();