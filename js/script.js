let currentPokemon;
let openCurrentPokemon;
let allPokemon;
let game_mode = 'off';

let allowNextPokemons = false;

function loadPage() {
    document.getElementById('all-pokemon-container').innerHTML = '';
    loadAllPokemon(0, 20);
    loadevol();
    loadAllPokemonSrc();
    translate_header();
    game_mode = 'off';
}

async function loadAllPokemon(firstnumber, lastnumber) {
    let allUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0';
    let allResponse = await fetch(allUrl);
    allPokemon = await allResponse.json();
    console.log(allPokemon);
    for (let i = firstnumber; i < lastnumber; i++) {
        let oneUrl = allPokemon['results'][i]['url'];
        await loadPokemon(oneUrl, i);
    }
    allowNextPokemons = true;
}

function render_by_scroll() {
    if ((window.innerHeight + window.scrollY + 400) >= document.body.offsetHeight && allowNextPokemons) {
        allowNextPokemons = false;
        if (game_mode == 'off') {
            if (document.querySelectorAll('.one-pokemon-container').length == 20) {
                loadAllPokemon(20, 40);
            }
            if (document.querySelectorAll('.one-pokemon-container').length == 40) {
                loadAllPokemon(40, 60);
            }
            if (document.querySelectorAll('.one-pokemon-container').length == 60) {
                loadAllPokemon(60, 80);
            }
            if (document.querySelectorAll('.one-pokemon-container').length == 80) {
                loadAllPokemon(80, 100);
            }
            if (document.querySelectorAll('.one-pokemon-container').length == 100) {
                loadAllPokemon(100, 120);
            }
            if (document.querySelectorAll('.one-pokemon-container').length == 120) {
                loadAllPokemon(120, 140);
            }
            if (document.querySelectorAll('.one-pokemon-container').length == 140) {
                loadAllPokemon(140, 151);
            }
        }
    }
    if (window.scrollY == 0) {
        document.getElementById('go-up-container').classList.add('d-none');
    } else if ((window.innerHeight + window.scrollY) > (window.innerHeight + 500)) {
        document.getElementById('go-up-container').classList.remove('d-none');
    }
}

window.addEventListener('scroll', () => {
    render_by_scroll()
})

function scroll_to_top() {
    window.scrollTo(0, 0);
}

async function loadPokemon(oneUrl, x) {
    let url = oneUrl;
    let response = await fetch(url);
    currentPokemon = await response.json();
    let typeLength = currentPokemon['types'].length;
    renderOnePokemonHTML(x);
    renderPokemonInfo(x);
    renderBackgroundcolor(x, 0);
    if (typeLength > 1) {
        renderBackgroundcolor(x, 1)
    };
    renderBackgroundcolorAndImage(x);
    translateToGerman(x);
}

function renderOnePokemonHTML(x) {
    document.getElementById('all-pokemon-container').innerHTML +=
        `
    <div onclick="open_loadPokemon(${x})" class="one-pokemon-container" id="one-pokemon-container${x}">
        <div id="one-pokemon-header${x}" class="one-pokemon-header">
            <img id="one-pokemon-header-image${x}" class="one-pokemon-backgroundimage" src="">
        </div>
        <div class="one-pokemon-content">
            <div class="pokemonName" id="pokemonName${x}">Name</div>
            <img class="pokemonImage" id="pokemonImage${x}" src="">
        </div>
        <div class="pokemonType" id="pokemonType${x}">Type</div>
        <div class="pokemonId" id="pokemonId${x}">ID</div>
    </div>`
}

function renderPokemonInfo(x) {
    changeNameInBig(x);
    renderID(x);
    renderType(x);
    document.getElementById(`pokemonImage${x}`).src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}

function changeNameInBig(x) {
    let pokemonName = currentPokemon['name'];
    let NameInBig = pokemonName[0].toUpperCase() + pokemonName.slice(1);
    document.getElementById(`pokemonName${x}`).innerHTML = NameInBig;
}

function renderID(x) {
    let pokemonId = currentPokemon['id'];
    pokemonId = pokemonId.toString();
    if (pokemonId.length == 1) {
        pokemonId = '00' + pokemonId;
    }
    if (pokemonId.length == 2) {
        pokemonId = '0' + pokemonId;
    }
    document.getElementById(`pokemonId${x}`).innerHTML = '#' + pokemonId;
}

function renderType(x) {
    let pokemonTypes = currentPokemon['types'];
    document.getElementById(`pokemonType${x}`).innerHTML = '';
    for (let i = 0; i < pokemonTypes.length; i++) {
        document.getElementById(`pokemonType${x}`).innerHTML += `
        <div id="pokemonType-${x}-${i}">
        ${currentPokemon['types'][i]['type']['name']}
        </div>
        `
        translate_type_ToGerman(x, i)
    }
}

function renderBackgroundcolor(x, t) {
    let mainType = currentPokemon['types'][t]['type']['name'];
    if (mainType == 'grass') {
        document.getElementById(`pokemonType-${x}-${t}`).classList.add('bg-grass');
    }
    if (mainType == 'electric') {
        document.getElementById(`pokemonType-${x}-${t}`).classList.add('bg-electric');
    }
    if (mainType == 'fire') {
        document.getElementById(`pokemonType-${x}-${t}`).classList.add('bg-fire');
    }
    if (mainType == 'water') {
        document.getElementById(`pokemonType-${x}-${t}`).classList.add('bg-water');
    }
    if (mainType == 'bug') {
        document.getElementById(`pokemonType-${x}-${t}`).classList.add('bg-bug');
    }
    if (mainType == 'poison') {
        document.getElementById(`pokemonType-${x}-${t}`).classList.add('bg-poison');
    }
    if (mainType == 'normal') {
        document.getElementById(`pokemonType-${x}-${t}`).classList.add('bg-normal');
    }
    if (mainType == 'ground' || mainType == 'rock') {
        document.getElementById(`pokemonType-${x}-${t}`).classList.add('bg-ground');
    }
    if (mainType == 'rock') {
        document.getElementById(`pokemonType-${x}-${t}`).classList.add('bg-rock');
    }
    if (mainType == 'fairy') {
        document.getElementById(`pokemonType-${x}-${t}`).classList.add('bg-fairy');
    }
    if (mainType == 'ghost' || mainType == 'psychic') {
        document.getElementById(`pokemonType-${x}-${t}`).classList.add('bg-ghost');
    }
    if (mainType == 'psychic') {
        document.getElementById(`pokemonType-${x}-${t}`).classList.add('bg-psychic');
    }
    if (mainType == 'dragon') {
        document.getElementById(`pokemonType-${x}-${t}`).classList.add('bg-dragon');
    }
    if (mainType == 'fighting') {
        document.getElementById(`pokemonType-${x}-${t}`).classList.add('bg-fighting');
    }
    if (mainType == 'ice') {
        document.getElementById(`pokemonType-${x}-${t}`).classList.add('bg-ice');
    }
}

function renderBackgroundcolorAndImage(x) {
    let mainType = currentPokemon['types'][0]['type']['name'];
    if (mainType == 'grass') {
        document.getElementById(`one-pokemon-header${x}`).classList.add('bg-grass');
        document.getElementById(`one-pokemon-header-image${x}`).src = './img/grass-gb6dd41dbd_640.png';
        document.getElementById(`one-pokemon-header-image${x}`).style.objectFit = 'cover';
    }
    if (mainType == 'electric') {
        document.getElementById(`one-pokemon-header${x}`).classList.add('bg-electric');
        document.getElementById(`one-pokemon-header-image${x}`).src = './img/flash-g906cabd53_640.png';
    }
    if (mainType == 'fire') {
        document.getElementById(`one-pokemon-header${x}`).classList.add('bg-fire');
        document.getElementById(`one-pokemon-header-image${x}`).src = './img/koster-g46bb5f18d_640.png';
        document.getElementById(`one-pokemon-header-image${x}`).style.objectFit = 'none';
        document.getElementById(`one-pokemon-header-image${x}`).style.marginTop = '0';
        document.getElementById(`one-pokemon-header-image${x}`).style.height = '140px';
    }
    if (mainType == 'water') {
        document.getElementById(`one-pokemon-header${x}`).classList.add('bg-water');
        document.getElementById(`one-pokemon-header-image${x}`).src = './img/wave-g673de8150_640.png';
    }
    if (mainType == 'bug') {
        document.getElementById(`one-pokemon-header${x}`).classList.add('bg-bug');
        document.getElementById(`one-pokemon-header-image${x}`).src = './img/tree-gdfb0984eb_640.png';
        document.getElementById(`one-pokemon-header-image${x}`).style.objectFit = 'cover';
        document.getElementById(`one-pokemon-header-image${x}`).style.marginTop = '0';
        document.getElementById(`one-pokemon-header-image${x}`).style.height = '140px';
    }
    if (mainType == 'poison') {
        document.getElementById(`one-pokemon-header${x}`).classList.add('bg-poison');
        document.getElementById(`one-pokemon-header-image${x}`).src = './img/pokemon-g6b341ad71_640.png';
    }
    if (mainType == 'normal') {
        document.getElementById(`one-pokemon-header${x}`).classList.add('bg-normal');
        document.getElementById(`one-pokemon-header-image${x}`).src = './img/pokemon-g7a224d6da_640.png';
    }
    if (mainType == 'rock') {
        document.getElementById(`one-pokemon-header${x}`).classList.add('bg-rock');
        document.getElementById(`one-pokemon-header-image${x}`).src = './img/rocks-g83c3d730c_640.png';
    }
    if (mainType == 'ground') {
        document.getElementById(`one-pokemon-header${x}`).classList.add('bg-ground');
        document.getElementById(`one-pokemon-header-image${x}`).src = './img/soil-g5915f267b_640.png';
        document.getElementById(`one-pokemon-header-image${x}`).style.objectFit = 'cover';
        document.getElementById(`one-pokemon-header-image${x}`).style.marginTop = '40px';
        document.getElementById(`one-pokemon-header-image${x}`).style.height = '100px';
    }
    if (mainType == 'fairy') {
        document.getElementById(`one-pokemon-header${x}`).classList.add('bg-fairy');
        document.getElementById(`one-pokemon-header-image${x}`).src = './img/fairies-g772612486_640.png';
    }
    if (mainType == 'ghost') {
        document.getElementById(`one-pokemon-header${x}`).classList.add('bg-ghost');
        document.getElementById(`one-pokemon-header-image${x}`).src = './img/halloween-g1d62ffd39_640.png';
    }
    if (mainType == 'psychic') {
        document.getElementById(`one-pokemon-header${x}`).classList.add('bg-psychic');
        document.getElementById(`one-pokemon-header-image${x}`).src = './img/yoga-g431ec81e2_640.png';
    }
    if (mainType == 'dragon') {
        document.getElementById(`one-pokemon-header${x}`).classList.add('bg-dragon');
        document.getElementById(`one-pokemon-header-image${x}`).src = './img/landscape-g01a4ae4f4_640.png';
    }
    if (mainType == 'fighting') {
        document.getElementById(`one-pokemon-header${x}`).classList.add('bg-fighting');
        document.getElementById(`one-pokemon-header-image${x}`).src = './img/kickboxing-gf4f027b34_640.png';
    }
    if (mainType == 'ice') {
        document.getElementById(`one-pokemon-header${x}`).classList.add('bg-ice');
        document.getElementById(`one-pokemon-header-image${x}`).src = './img/ice-gf74205797_640.png';
    }
}

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (game_mode == 'off') {
            search_pokemon();
        }
        if (game_mode == 'on') {
            game_search_pokemon();
        }
    }
})
