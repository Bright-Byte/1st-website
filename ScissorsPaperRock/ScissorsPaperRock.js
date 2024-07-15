//GAME ADD LIST:
// POKEMON (GEN 2 / 3 / 5????)
// DRIFT HUNTERS
// RUN 3 (x -> cant find)
// SLOPE 
// KIRBY
// PAPAS FREEZERIA ?
// FIREBOY WATERGIRL
// CUT THE ROPE
// MULTIPLAYER GAME ?drift 
// DOOM

//array

const data = {
    name: ["Pokemon Ruby", "Drift Hunters", "Slope", "Kirby", "Fireboy Watergirl", "Cut the Rope", "Doom", "Papas Pizzeria"],
    img: [`https://www.nintendo.com/eu/media/images/10_share_images/games_15/game_boy_advance_7/SI_GBA_PokemonRuby_enGB_image1600w.jpg`, `https://drifthunters2.io/data/image/favicon.png`, `https://wordle2.io/upload/imgs/screenshot-2023-10-15-012641.png`, `https://upload.wikimedia.org/wikipedia/en/6/6a/Kirbys-dream-land-gameboy-boxart.png`, `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlQWEwPf0hgBQaEp2S8mBj66tdWTYHy-bV-w&s`, `https://img.cdn.famobi.com/portal/html5games/images/tmp/CutTheRopeTeaser.jpg`, `https://upload.wikimedia.org/wikipedia/en/2/29/Doom_II_-_Hell_on_Earth_Coverart.png`, `https://img.poki.com/cdn-cgi/image/quality=78,width=314,height=314,fit=cover,f=auto/377fd7d97c2b2f4fe25618ccffcc601b.jfif`],
    
    description: ["Play Pokemon Ruby now, catch and train as many pokemon as possible to become champion", "Due to popular demand, drift your way to the top in drift racers!", "Play slope now, and roll your way to a new highscore", "Play Kirby now and suck your way into the action!", "Have fun puzzeling with your friend with OG fireboy and watergirl", "Play cut the rope now, an OG classic that is one of the most EPIC phone games of all time", "Yes, we have DOOM 2 play now please (Mouse for controls)", "Have fun in papas pizzeia, and make the best food known to man", "subway surfers brainrot epic W"],

    iframe: [`<iframe src="https://www.retrogames.cc/embed/26523-pokemon-ruby-e-independent.html" width="600" height="450" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>`, 
    
    `<iframe class="game-iframe" loading="lazy" src="https://webglmath.github.io/drift-hunters/" id="game-area" width="788" height="650" scrolling="none" frameborder="0" allowfullscreen=""></iframe>`,

    `<iframe id="iframe_game_play" style=" width: 788px ; height: 650px;" src="https://slopegame.io/slope-unblocked.embed" frameborder="0" border="0" scrolling="no" class="iframe-default" allowfullscreen=""></iframe>`,

    `<iframe src="https://static.arcadespot.com/retroemulator.php?system=gboy&amp;game=2016/08/kirbys-dream-land.zip" border="0" frameborder="0" scrolling="no" style="border: 0px; width: 600px; height: 400px;" id="game-box-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen; microphone; gamepad; accelerometer; encrypted-media; gyroscope;"></iframe>`,

    `<iframe id="game" frameborder="0" allow="autoplay" allowfullscreen="" seamless="" scrolling="no" height="650" width="788"src="//html5.gamedistribution.com/rvvASMiM/a55c9cc9c21e4fc683c8c6857f3d0c75/index.html?timestamp=-62135596800&amp;countryCode=en&amp;siteid=79&amp;channelid=2&amp;siteLocale=en&amp;locale=en&amp;gd_sdk_referrer_url=https%3A%2F%2Fwww.agame.com%2Fgame%2Ffireboy-and-watergirl-the-forest-temple&amp;gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL3d3dy5hZ2FtZS5jb20vZ2FtZS9maXJlYm95LWFuZC13YXRlcmdpcmwtdGhlLWZvcmVzdC10ZW1wbGUiLCJwYXJlbnREb21haW4iOiJhZ2FtZS5jb20iLCJ0b3BEb21haW4iOiJhZ2FtZS5jb20iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xNyJ9"></iframe>`,

    `<iframe id="html5game" src="https://play.gamepix.com/cut-the-rope-2/embed?sid=6HLOM" class=" no-select" width="728px" height="600px" scrolling="no" marginwidth="0" vspace="0" frameborder="0" hspace="0" marginheight="0" allow="web-share; clipboard-read; clipboard-write"></iframe>
    `,

    `<iframe src="https://static.arcadespot.com/retroemulator.php?system=gba&amp;game=2017/09/doom-2.zip" border="0" frameborder="0" scrolling="no" style="border: 0px; width: 600px; height: 400px;" id="game-box-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen; microphone; gamepad; accelerometer; encrypted-media; gyroscope;"></iframe>`,

    `<iframe id="iframe-in-game" src="https://www.gameflare.com/embed/papa-s-pizzeria/" marginwidth="0" marginheight="0" frameborder="0" scrolling="no" width="800" height="635" allow="autoplay; fullscreen" allowfullscreen="" onload="iframeInGameLoaded(10)"></iframe>`,

    `<iframe title="My Frame" id="iframehtml5" width="100%" height="100%" src="/subway-surfers-game.embed?d=20240716" frameborder="0" border="0" scrolling="no" class="iframe-default" allowfullscreen=""></iframe>`

    ],
    controls: ["X for the A button, Save fweeeeeeeeeeeeeee yyyyyyyyyyyyyyyyyyyyyyyywrwwddddddddddd fewwwrqrertgert htryhrtyeryeyer ge yur (whoever is looking at this code TOM, JADEN i might add this later if u want u can playtest and send me the controls lol)"],
}

//printing

const topper = document.getElementById('topper')
const cardContainer = document.getElementById('cardContainer')

for(let i = 0; i < data.name.length; i++) {
    cardContainer.innerHTML += `
    <button onclick="newpage(${i})" class="card"> 
    <div class="card-image">
        <figure class="image is-4by3">
            <img src="${data.img[i]}" alt="Placeholder image" />
        </figure>
    </div>
    <div class="card-content">
        <div class="media-content">
            <p class="title is-4">${data.name[i]}</p>
        </div>
        <div class="content">
            ${data.description[i]}
        </div>
    </div>
</button> 
    `

    function newpage(index) {
        console.log('New page loaded')
        cardContainer.innerHTML = ""
        topper.innerHTML = ""
        cardContainer.innerHTML += `
        ${data.iframe[index]}
        <div id="controls">${data.controls[i]}</div>

                `
    }
}

function reset() {
    window.location.reload();
}
