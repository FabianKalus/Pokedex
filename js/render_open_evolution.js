let allEvols = [];
let secondEvols = [];
let allPokemonSrc = [];
let noEvols = ['hitmonchan', 'hitmonlee', 'jynx', 'munchlax', 'relaxo'];
let hasEvol = true;
let nextGeneration = ['farfetched', 'electabuzz', 'magmar', 'onix', 'lickitung', 'tangela', 'scyther', 'porygon', 'chansey', 'magneton', 'farfetchd', 'rhydon', 'seadra', 'mr-mine'];
let moon_stone = ['clefairy', 'clefable', 'jigglypuff', 'wigglytuff', 'nidorino', 'nidoking', 'nidorina', 'nidoqueen'];
let electro_stone = ['pikachu', 'raichu'];
let aqua_stone = ['shellder', 'cloyster', 'staryu', 'starmie'];
let plant_stone = ['exeggcute', 'exeggutor', 'gloom', 'vileplume'];
let fire_stone = ['vulpix', 'ninetales', 'growlithe', 'arcanine'];
let exchange_evol = ['machoke', 'machamp', 'graveler', 'golem', 'haunter', 'gengar', 'kadabra', 'alakazam', 'poliwrath', 'poliwhirl', 'weepinbell', 'victreebel']
let open_nameCurrentPokemon;
let open_nameCurrentPokemonEvol;
let open_nameCurrentPokemonEvolLevel;
let pre_pre_evol_name;
let pre_pre_evol_level;

async function loadevol() {
    let evolUrl = 'https://pokeapi.co/api/v2/evolution-chain?limit=1000offset=0';
    let allResponse = await fetch(evolUrl);
    let allEvol = await allResponse.json();
    for (let i = 0; i < 150; i++) {
        let oneUrl = allEvol['results'][i]['url'];
        evolOne(oneUrl);
    }
}

async function evolOne(oneUrl) {
    let url = oneUrl;
    let response = await fetch(url);
    currentPokemon = await response.json();
    if (currentPokemon['chain']['evolves_to']['0']) {
        let nameCurrentPokemonEvol = currentPokemon['chain']['evolves_to']['0']['species']['name'];
        let nameCurrentPokemon = currentPokemon['chain']['species']['name'];
        let nameCurrentPokemonEvolLevel = currentPokemon['chain']['evolves_to']['0']['evolution_details']['0']['min_level'];
        allEvols.push([nameCurrentPokemon, nameCurrentPokemonEvol, nameCurrentPokemonEvolLevel]);
        if (currentPokemon['chain']['evolves_to']['0']['evolves_to']['0']) {
            let nextEvol = currentPokemon['chain']['evolves_to']['0']['evolves_to']['0']['species']['name'];
            let nextEvolLvl = currentPokemon['chain']['evolves_to']['0']['evolves_to']['0']['evolution_details']['0']['min_level']
            secondEvols.push([nameCurrentPokemonEvol, nextEvol, nextEvolLvl])
        }
    } else if (!currentPokemon['chain']['evolves_to']['0']) {
        noEvols.push(currentPokemon['chain']['species']['name'])
    }
}

async function loadAllPokemonSrc() {
    let allUrlSrc = 'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0';
    let allResponseSrc = await fetch(allUrlSrc);
    let newallPokemonSrc = await allResponseSrc.json();
    allPokemonSrc = [];
    for (let i = 0; i < 151; i++) {
        let oneUrlSrc = newallPokemonSrc['results'][i]['url'];
        await loadPokemonSrc(oneUrlSrc);
    }
}

async function loadPokemonSrc(oneUrlSrc) {
    let urlSrc = oneUrlSrc;
    let responseSrc = await fetch(urlSrc);
    let AllCurrentPokemonSrc = await responseSrc.json();
    let srcname = AllCurrentPokemonSrc['name'];
    let srcSrc = AllCurrentPokemonSrc['sprites']['other']['official-artwork']['front_default'];
    let srcTyp = AllCurrentPokemonSrc['types'][0]['type']['name'];
    allPokemonSrc.push([srcname, srcSrc, srcTyp]);
}

function open_render_pokemon_evolution() {
    let evolution_container = document.getElementById('open-content-bottom-content');
    evolution_container.innerHTML = '';
    checkEvol(openCurrentPokemon['name']);
    check_second_evol(openCurrentPokemon['name']);
    check_no_more_evol(openCurrentPokemon['name']);
    check_only_one_evol(openCurrentPokemon['name']);
    big_border_for_active('evolution-header');
    if (hasEvol == true) {
        open_render_pokemon_evolutionHTMLCode(evolution_container);
        add_pre_pre_evol(openCurrentPokemon['name']);
        render_evolution_image();
    }
    if (hasEvol == false) {
        open_render_pokemon_no_evolutionHTMLCode(evolution_container);
    }
    hasEvol = true;
    check_specials(openCurrentPokemon['name']);
    translate_open_render_pokemon_evol(openCurrentPokemon['name']);
    change_evol_name_in_big(openCurrentPokemon['name']);
}

function checkEvol(basename) {
    for (i = 0; i < allEvols.length; i++) {
        if (basename == allEvols[i][0]) {
            open_nameCurrentPokemon = allEvols[i][0];
            open_nameCurrentPokemonEvol = allEvols[i][1];
            open_nameCurrentPokemonEvolLevel = allEvols[i][2];
        }
        if (basename == noEvols[i]) {
            hasEvol = false;
        }
    }
}

function check_second_evol(basename) {
    for (i = 0; i < secondEvols.length; i++) {
        if (basename == secondEvols[i][0]) {
            open_nameCurrentPokemon = secondEvols[i][0];
            open_nameCurrentPokemonEvol = secondEvols[i][1];
            open_nameCurrentPokemonEvolLevel = secondEvols[i][2];
            for (j = 0; j < allEvols.length; j++) {
                if (basename == allEvols[j][1]) {
                    pre_pre_evol_name = allEvols[j][0];
                    pre_pre_evol_level = allEvols[j][2];
                }
            }
        }
    }
}

function check_no_more_evol(basename) {
    for (j = 0; j < secondEvols.length; j++) {
        if (basename == secondEvols[j][1]) {
            open_nameCurrentPokemon = secondEvols[j][0];
            open_nameCurrentPokemonEvol = secondEvols[j][1];
            open_nameCurrentPokemonEvolLevel = secondEvols[j][2];
        }
    }
}

function check_only_one_evol(basename) {
    for (i = 0; i < allEvols.length; i++) {
        if (basename == allEvols[i][1]) {
            for (j = 0; j < secondEvols.length; j++)
                if (basename == secondEvols[j][0]) {
                    return
                }
        }
    }
    for (i = 0; i < allEvols.length; i++) {
        if (basename == allEvols[i][1]) {
            open_nameCurrentPokemon = allEvols[i][0];
            open_nameCurrentPokemonEvol = allEvols[i][1];
            open_nameCurrentPokemonEvolLevel = allEvols[i][2];
        }
    }
}

function open_render_pokemon_evolutionHTMLCode() {
    document.getElementById('open-content-bottom-content').innerHTML += `
    <div class="complete-evolution-container" id="complete-evolution-container">
         <div class="pre-pre-evolution-container d-none" id="pre-pre-evolution-container">
                <img src="" id="pre-pre-evolution-image">
                <div id="pre-pre-evolution-name">${pre_pre_evol_name}</div>
        </div>
        <div class="between-evolution-container d-none" id="pre-between-evolution-container">
               <div id="pre-between-evolution-name">Lvl ${pre_pre_evol_level}</div>
               <img id="pre-between-evolution-image" src="./img/arrow-ga4eae629f_640.png">
        </div>
        <div class="pre-evolution-container" id="pre-evolution-container">
            <img src="" id="pre-evolution-image">
            <div id="pre-evolution-name">${open_nameCurrentPokemon}</div>
        </div>
        <diV class="between-evolution-container">
            <div id="between-evolution-name">Lvl ${open_nameCurrentPokemonEvolLevel}</div>
            <img id="between-evolution-image" src="./img/arrow-ga4eae629f_640.png">
        </div>
        <div class="after-evolution-container" id="after-evolution-container">
            <img src="" id="after-evolution-image">
            <div id="after-evolution-name">${open_nameCurrentPokemonEvol}</div>
        </div>    
    </div>`;
}

function add_pre_pre_evol(basename) {
    for (i = 0; i < secondEvols.length; i++) {
        if (basename == secondEvols[i][0] && basename !== 'chansey') {
            document.getElementById('pre-pre-evolution-container').classList.remove('d-none');
            document.getElementById('pre-between-evolution-container').classList.remove('d-none');
        }
    }
}

function render_evolution_image() {
    for (let i = 0; i < allPokemonSrc.length; i++) {
        if (open_nameCurrentPokemon == allPokemonSrc[i][0]) {
            document.getElementById('pre-evolution-image').src = allPokemonSrc[i][1];
        }
        if (open_nameCurrentPokemonEvol == allPokemonSrc[i][0]) {
            document.getElementById('after-evolution-image').src = allPokemonSrc[i][1];
        }
        if (pre_pre_evol_name == allPokemonSrc[i][0]) {
            document.getElementById('pre-pre-evolution-image').src = allPokemonSrc[i][1];
        }
    }
}

function open_render_pokemon_no_evolutionHTMLCode(evolution_container) {
    evolution_container.innerHTML = `
    <div id="no-evolution-container" class="no-evolution-container">
        <p id="no-evolution">No Evolution</p>
    </div>`
}

function check_specials(basename) {
    check_nextGeneration(basename);
    check_moon_stone(basename);
    check_electro_stone(basename);
    check_aqua_stone(basename);
    check_plant_stone(basename);
    check_fire_stone(basename);
    check_exchange_evol(basename);
    check_eevee(basename);
    check_jigglypuff(basename);
}

function check_jigglypuff(basename) {
    if (basename == 'jigglypuff' || basename == 'clefairy') {
        document.getElementById('pre-pre-evolution-container').classList.add('d-none');
        document.getElementById('pre-between-evolution-container').classList.add('d-none');
    }
}

function check_nextGeneration(basename) {
    for (i = 0; i < nextGeneration.length; i++) {
        if (basename == nextGeneration[i]) {
            document.getElementById('after-evolution-name').innerHTML = 'next Generation';
            document.getElementById('between-evolution-name').innerHTML = '';
            document.getElementById('after-evolution-image').src = './img/question-mark-gd91fa0596_640.png';
        }
    }
}

function check_moon_stone(basename) {
    for (j = 0; j < moon_stone.length; j++) {
        if (basename == moon_stone[j]) {
            document.getElementById('between-evolution-name').innerHTML = 'moon-stone';
        }
    }
}

function check_electro_stone(basename) {
    for (l = 0; l < electro_stone.length; l++) {
        if (basename == electro_stone[l]) {
            document.getElementById('between-evolution-name').innerHTML = 'electro-stone';
        }
    }
}

function check_aqua_stone(basename) {
    for (m = 0; m < aqua_stone.length; m++) {
        if (basename == aqua_stone[m]) {
            document.getElementById('between-evolution-name').innerHTML = 'aqua-stone';
        }
    }
}

function check_plant_stone(basename) {
    for (n = 0; n < plant_stone.length; n++) {
        if (basename == plant_stone[n]) {
            document.getElementById('between-evolution-name').innerHTML = 'plant-stone';
        }
    }
}

function check_fire_stone(basename) {
    for (o = 0; o < fire_stone.length; o++) {
        if (basename == fire_stone[o]) {
            document.getElementById('between-evolution-name').innerHTML = 'fire-stone';
        }
    }
}

function check_exchange_evol(basename) {
    for (k = 0; k < exchange_evol.length; k++) {
        if (basename == exchange_evol[k]) {
            document.getElementById('between-evolution-name').innerHTML = 'in exchange';
        }
    }
}

function check_eevee(basename) {
    if (basename == 'eevee' || basename == 'vaporeon' || basename == 'jolteon' || basename == 'flareon') {
        document.getElementById('after-evolution-container').innerHTML = `
       <div class="eevee-container">
            <div class="eevee-evol">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/134.png">
                <p>Vaporeon</p>
            </div>
            <div class="eevee-evol">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png">
                <p>Jolteon</p>
            </div>
            <div class="eevee-evol">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/136.png">
                <p>Flareon</p>
            </div>
        </div>       
       `
        document.getElementById('between-evolution-name').innerHTML = 'auqa-stone<br>electro-stone<br>fire-stone';
        document.getElementById('pre-evolution-image').src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png';
    }
}

function change_evol_name_in_big(basename) {
    if (document.getElementById('pre-evolution-name')) {
        if (basename !== 'eevee' && basename !== 'vaporeon' && basename !== 'jolteon' && basename !== 'flareon') {
            let pokemon_pre_pre_Name = document.getElementById('pre-evolution-name').innerHTML;
            let pokemon_pre_Name = document.getElementById('pre-evolution-name').innerHTML;
            let pokemon_after_Name = document.getElementById('after-evolution-name').innerHTML;
            let pre_pre_NameInBig = pokemon_pre_pre_Name[0].toUpperCase() + pokemon_pre_pre_Name.slice(1);
            let pre_NameInBig = pokemon_pre_Name[0].toUpperCase() + pokemon_pre_Name.slice(1);
            let after_NameInBig = pokemon_after_Name[0].toUpperCase() + pokemon_after_Name.slice(1);
            document.getElementById('pre-pre-evolution-name').innerHTML = pre_pre_NameInBig;
            document.getElementById('pre-evolution-name').innerHTML = pre_NameInBig;
            document.getElementById('after-evolution-name').innerHTML = after_NameInBig;
        }
    }
}