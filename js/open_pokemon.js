// load the pokemon you want to open
async function open_loadPokemon(x) {
    let openContainer = document.getElementById('open-container');
    openContainer.classList.remove('d-none');
    let openOneUrl = allPokemon['results'][x]['url'];
    let openUrl = openOneUrl;
    let response = await fetch(openUrl);
    openCurrentPokemon = await response.json();
    renderOpenPokemonHTML(openCurrentPokemon);
    open_renderPokemonInfo(x);
    translate_open_Pokemon_ToGerman(x);
}

// render the open pokemon
function renderOpenPokemonHTML(openCurrentPokemon) {
    let openContainer = document.getElementById('open-container');
    renderOpenPokemonHTMLCode(openContainer);
    translate_open_bottom_content();
}

//HTML Code for the open pokemon
function renderOpenPokemonHTMLCode(openContainer) {
    openContainer.innerHTML = `
    <div class="open-content" id="open-content">
        <div id="open-content-top" class="open-content-top">
            <div class="open-content-top-header">
                <img onclick="close_open_pokemon()" src="./img/arrow-121-24.png">
                <div id="open-pokemon-id" class="open-pokemon-id">${openCurrentPokemon['id']}</div>
            </div>
            <div class="open-content-top-name">
                <div id="open-pokemon-name" class="open-pokemon-name">${openCurrentPokemon['name']}</div>
            </div>
            <div class="open-pokemon-top-type" id="open-pokemon-top-type"></div>
            <img src="" id="open-pokemon-image" class="open-pokemon-top-image">
            <img src="./img/pokemon-g7340aeef9_640.png" class="open-pokemon-background-image">
        </div>
        <div class="open-content-bottom">
            <div class="open-content-bottom-header">
                <p id="about-header" onclick="open_render_pokemon_about()">About</p>
                <p id="basestats-header"  onclick="open_render_pokemon_basestats()">Base Stats</p>
                <p id="evolution-header" onclick="open_render_pokemon_evolution()">Evolution</p>
                <p id="moves-header" onclick="open_render_pokemon_moves()">Moves</p>
            </div>
            <div class="open-content-bottom-content" id="open-content-bottom-content">
            </div>
        </div>
    </div>`
}

// render open-pokemon info
function open_renderPokemonInfo() {
    open_changeNameInBig();
    open_renderID();
    open_renderType();
    open_renderBackgroundcolor()
    document.getElementById(`open-pokemon-image`).src = openCurrentPokemon['sprites']['other']['home']['front_default'];
    open_render_pokemon_basestats();
}

// change the first letter into upperCase
function open_changeNameInBig() {
    let pokemonName = openCurrentPokemon['name'];
    let NameInBig = pokemonName[0].toUpperCase() + pokemonName.slice(1);
    document.getElementById(`open-pokemon-name`).innerHTML = NameInBig;
}

// give the open-pokemon an id
function open_renderID() {
    let open_pokemonId = openCurrentPokemon['id'];
    pokemonId = open_pokemonId.toString();
    if (pokemonId.length == 1) {
        pokemonId = '00' + pokemonId;
    }
    if (pokemonId.length == 2) {
        pokemonId = '0' + pokemonId;
    }
    document.getElementById(`open-pokemon-id`).innerHTML = '#' + pokemonId;
}

// render the type of the open pokemon
function open_renderType() {
    let pokemonTypes = openCurrentPokemon['types'];
    document.getElementById(`open-pokemon-top-type`).innerHTML = '';
    for (let i = 0; i < pokemonTypes.length; i++) {
        document.getElementById(`open-pokemon-top-type`).innerHTML += `
        <div id="open-pokemonType-${i}">
        ${openCurrentPokemon['types'][i]['type']['name']}
        </div>
        `
        translate_open_type_ToGerman(i);
    }
}


function open_renderBackgroundcolor() {
    let mainType = openCurrentPokemon['types'][0]['type']['name'];
    if (mainType == 'grass') {
        document.getElementById(`open-content-top`).classList.add('bg-grass');
    }
    if (mainType == 'electric') {
        document.getElementById(`open-content-top`).classList.add('bg-electric');
    }
    if (mainType == 'fire') {
        document.getElementById(`open-content-top`).classList.add('bg-fire');
    }
    if (mainType == 'water') {
        document.getElementById(`open-content-top`).classList.add('bg-water');
    }
    if (mainType == 'bug') {
        document.getElementById(`open-content-top`).classList.add('bg-bug');
    }
    if (mainType == 'poison') {
        document.getElementById(`open-content-top`).classList.add('bg-poison');
    }
    if (mainType == 'normal') {
        document.getElementById(`open-content-top`).classList.add('bg-normal');
    }
    if (mainType == 'rock') {
        document.getElementById(`open-content-top`).classList.add('bg-rock');
    }
    if (mainType == 'ground') {
        document.getElementById(`open-content-top`).classList.add('bg-ground');
    }
    if (mainType == 'fairy') {
        document.getElementById(`open-content-top`).classList.add('bg-fairy');
    }
    if (mainType == 'ghost') {
        document.getElementById(`open-content-top`).classList.add('bg-ghost');
    }
    if (mainType == 'psychic') {
        document.getElementById(`open-content-top`).classList.add('bg-psychic');
    }
    if (mainType == 'dragon') {
        document.getElementById(`open-content-top`).classList.add('bg-dragon');
    }
    if (mainType == 'fighting') {
        document.getElementById(`open-content-top`).classList.add('bg-fighting');
    }
    if (mainType == 'ice') {
        document.getElementById(`open-content-top`).classList.add('bg-ice');
    }
}

function open_render_pokemon_about() {
    let aboutInfos = document.getElementById('open-content-bottom-content');
    big_border_for_active('about-header');
    open_render_pokemon_aboutHTMLCode(aboutInfos);
    translate_open_render_pokemon_about();
}

function open_render_pokemon_aboutHTMLCode(aboutInfos) {
    aboutInfos.innerHTML = `
    <div class="about-divs">
        <b><p id="open_height">Height:</p></b>
        <p id="open_height_worth" >${openCurrentPokemon['height']} ft</p>
    </div>
    <div class="about-divs">
        <b><p id="open_weight">Weight:</p></b>
        <p p id="open_weight_worth">${openCurrentPokemon['weight']} lbs</p>
    </div>
    <div class="about-divs">
        <b><p id="open_baseExp">Base EXP:</p></b>
        <p>${openCurrentPokemon['base_experience']}</p>
    </div>`
}

function open_render_pokemon_basestats() {
    let baseStats = document.getElementById('open-content-bottom-content');
    big_border_for_active('basestats-header');
    open_render_pokemon_basestatsHTMLCode(baseStats);
    renderStats();
    setTimeout(rendercoloredBar, 250);
}

function open_render_pokemon_basestatsHTMLCode(baseStats) {
    baseStats.innerHTML = '';
    for (let j = 0; j < 6; j++) {
        let stat = openCurrentPokemon['stats'][j]['stat']['name']
        baseStats.innerHTML += `
        <div class="stats-container">
            <span class="des-span">${stat.replace(/^\w/, (c) => c.toUpperCase()) + ':'}</span> 
            <div class="stats-bar">
                <div class="colored-bar colored-bar-width" id="colored-bar-${j}" >
                <span class="render-span" id="base-stat-${j}">
                </div>
                </span>
            </div>
        </div> `
    }
}

function renderStats() {
    for (let j = 0; j < 6; j++) {
        let stat = openCurrentPokemon['stats'][j]['base_stat'];
        document.getElementById(`base-stat-${j}`).innerHTML = stat;
    }
}

function rendercoloredBar() {
    let colorPosition;
    for (let k = 0; k < 6; k++) {
        let stat = openCurrentPokemon['stats'][k]['base_stat'];
        colorPosition = openCurrentPokemon['stats'][k]['base_stat'];
        colorPosition += 30;
        document.getElementById(`colored-bar-${k}`).style.width = colorPosition + 'px';
    }
}

function open_render_pokemon_moves() {
    let moves_container = document.getElementById('open-content-bottom-content');
    let moves = openCurrentPokemon['moves'];
    big_border_for_active('moves-header');
    moves_container.innerHTML = `<div id="moves_undercontainer"></div>`;
    document.getElementById('moves_undercontainer').innerHTML = '';
    for (i = 0; i < moves.length; i++) {
        document.getElementById('moves_undercontainer').innerHTML += `
    <div>
    ${openCurrentPokemon['moves'][i]['move']['name']}
    </div>`
    }
}

function big_border_for_active(a) {
    document.getElementById('about-header').classList.remove('big-border');
    document.getElementById('basestats-header').classList.remove('big-border');
    document.getElementById('moves-header').classList.remove('big-border');
    document.getElementById('evolution-header').classList.remove('big-border');
    document.getElementById(a).classList.add('big-border');
}

function close_open_pokemon() {
    document.getElementById('open-container').classList.add('d-none');
}