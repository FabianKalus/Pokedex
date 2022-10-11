// Liste german Pokemon names
let germanPokemon = [
    'Bisasam',
    'Bisaknosp',
    'Bisaflor',
    'Glumanda',
    'Glutexo',
    'Glurak',
    'Schiggy',
    'Schillok',
    'Turtok',
    'Raupy',
    'Safcon',
    'Smettbo',
    'Hornliu',
    'Kokuna',
    'Bibor',
    'Taubsi',
    'Tauboga',
    'Tauboss',
    'Rattfratz',
    'Rattikarl',
    'Habitak',
    'Ibitak',
    'Rettan',
    'Arbok',
    'Pikachu',
    'Raichu',
    'Sandan',
    'Sandamer',
    'Nidoran♀️',
    'Nidorina',
    'Nidoqueen',
    'Nidoran♂️',
    'Nidorino',
    'Nidoking',
    'Piepi',
    'Pixi',
    'Vulpix',
    'Vulnona',
    'Pummelluff',
    'Knuddeluff',
    'Zubat',
    'Golbat',
    'Myrapla',
    'Duflor',
    'Giflor',
    'Paras',
    'Parasek',
    'Bluzuk',
    'Omot',
    'Digda',
    'Digdri',
    'Mauzi',
    'Snobilikat',
    'Enton',
    'Entoron',
    'Menki',
    'Rasaff',
    'Fukano',
    'Arkani',
    'Quapsel',
    'Quaputzi',
    'Quappo',
    'Abra',
    'Kadabra',
    'Simsala',
    'Machollo',
    'Maschock',
    'Machomei',
    'Knofensa',
    'Ultrigaria',
    'Sarzenia',
    'Tentacha',
    'Tentoxa',
    'Kleinstein',
    'Georok',
    'Geowaz',
    'Ponita',
    'Gallopa',
    'Flegmon',
    'Lahmus',
    'Magnetilo',
    'Magneton',
    'Porenta',
    'Dodu',
    'Dodri',
    'Jurob',
    'Jugong',
    'Sleima',
    'Sleimok',
    'Muschas',
    'Austos',
    'Nebulak',
    'Alpollo',
    'Gengar',
    'Onix',
    'Traumato',
    'Hypno',
    'Krabby',
    'Kingler',
    'Voltobal',
    'Lektrobal',
    'Owei',
    'Kokowei',
    'Tragosso',
    'Knogga',
    'Kicklee',
    'Nockchan',
    'Schlurp',
    'Smogon',
    'Smogmog',
    'Rihorn',
    'Rizeros',
    'Chaneira',
    'Tangela',
    'Kangama',
    'Seeper',
    'Seemon',
    'Goldini',
    'Golking',
    'Sterndu',
    'Starmie',
    'Pantimos',
    'Sichlor',
    'Rossana',
    'Elektek',
    'Magmar',
    'Pinsir',
    'Tauros',
    'Karpador',
    'Garados',
    'Lapras',
    'Ditto',
    'Evoli',
    'Aquana',
    'Blitza',
    'Flamara',
    'Porygon',
    'Amonitas',
    'Amoroso',
    'Kabuto',
    'Kabutops',
    'Aerodactyl',
    'Relaxo',
    'Arktos',
    'Zapdos',
    'Lavados',
    'Dratini',
    'Dragonir',
    'Dragoran',
    'Mewtu',
    'Mew'
];

let page_language = 'german';

async function change_to_english() {
    page_language = 'english';
    await loadPage();
}

function change_to_german() {
    page_language = 'german';
    loadPage();
}

// translate Pokemon Names to german
function translateToGerman(x) {
    if (page_language == 'german') {
        document.getElementById(`pokemonName${x}`).innerHTML = germanPokemon[x];
    }
}

// translate open-pokemon-names to german
function translate_open_Pokemon_ToGerman(x) {
    if (page_language == 'german') {
        document.getElementById(`open-pokemon-name`).innerHTML = germanPokemon[x];
    }
}

//translate the types of the pokemons to german
function translate_type_ToGerman(x, i) {
    if (page_language == 'german') {
        if (currentPokemon['types'][i]['type']['name'] == 'grass') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Pflanze';
        }
        if (currentPokemon['types'][i]['type']['name'] == 'poison') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Gift';
        }
        if (currentPokemon['types'][i]['type']['name'] == 'fire') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Feuer';
        }
        if (currentPokemon['types'][i]['type']['name'] == 'water') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Wasser';
        }
        if (currentPokemon['types'][i]['type']['name'] == 'flying') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Flug';
        }
        if (currentPokemon['types'][i]['type']['name'] == 'bug') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Käfer';
        }
        if (currentPokemon['types'][i]['type']['name'] == 'normal') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Normal';
        }
        if (currentPokemon['types'][i]['type']['name'] == 'ground') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Boden';
        }
        if (currentPokemon['types'][i]['type']['name'] == 'electric') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Elektro';
        }
        if (currentPokemon['types'][i]['type']['name'] == 'fairy') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Fee';
        }
        if (currentPokemon['types'][i]['type']['name'] == 'fighting') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Kampf';
        }
        if (currentPokemon['types'][i]['type']['name'] == 'psychic') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Psycho';
        }
        if (currentPokemon['types'][i]['type']['name'] == 'ghost') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Geist';
        }
        if (currentPokemon['types'][i]['type']['name'] == 'dragon') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Drache';
        }
        if (currentPokemon['types'][i]['type']['name'] == 'steel') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Stahl';
        }
        if (currentPokemon['types'][i]['type']['name'] == 'ice') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Ice';
        }
        if (currentPokemon['types'][i]['type']['name'] == 'rock') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Gestein';
        }
        if (currentPokemon['types'][i]['type']['name'] == 'ice') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Eis';
        }
    }
}

// translate the open-pokemon types to german
function translate_open_type_ToGerman(i) {
    if (page_language == 'german') {
        if (openCurrentPokemon['types'][i]['type']['name'] == 'grass') {
            document.getElementById(`open-pokemonType-${i}`).innerHTML = 'Pflanze';
        }
        if (openCurrentPokemon['types'][i]['type']['name'] == 'poison') {
            document.getElementById(`open-pokemonType-${i}`).innerHTML = 'Gift';
        }
        if (openCurrentPokemon['types'][i]['type']['name'] == 'fire') {
            document.getElementById(`open-pokemonType-${i}`).innerHTML = 'Feuer';
        }
        if (openCurrentPokemon['types'][i]['type']['name'] == 'water') {
            document.getElementById(`open-pokemonType-${i}`).innerHTML = 'Wasser';
        }
        if (openCurrentPokemon['types'][i]['type']['name'] == 'flying') {
            document.getElementById(`open-pokemonType-${i}`).innerHTML = 'Flug';
        }
        if (openCurrentPokemon['types'][i]['type']['name'] == 'bug') {
            document.getElementById(`open-pokemonType-${i}`).innerHTML = 'Käfer';
        }
        if (openCurrentPokemon['types'][i]['type']['name'] == 'normal') {
            document.getElementById(`open-pokemonType-${i}`).innerHTML = 'Normal';
        }
        if (openCurrentPokemon['types'][i]['type']['name'] == 'ground') {
            document.getElementById(`open-pokemonType-${i}`).innerHTML = 'Boden';
        }
        if (openCurrentPokemon['types'][i]['type']['name'] == 'electric') {
            document.getElementById(`open-pokemonType-${i}`).innerHTML = 'Elektro';
        }
        if (openCurrentPokemon['types'][i]['type']['name'] == 'fairy') {
            document.getElementById(`open-pokemonType-${i}`).innerHTML = 'Fee';
        }
        if (openCurrentPokemon['types'][i]['type']['name'] == 'fighting') {
            document.getElementById(`open-pokemonType-${i}`).innerHTML = 'Kampf';
        }
        if (openCurrentPokemon['types'][i]['type']['name'] == 'psychic') {
            document.getElementById(`open-pokemonType-${i}`).innerHTML = 'Psycho';
        }
        if (openCurrentPokemon['types'][i]['type']['name'] == 'ghost') {
            document.getElementById(`open-pokemonType-${i}`).innerHTML = 'Geist';
        }
        if (openCurrentPokemon['types'][i]['type']['name'] == 'dragon') {
            document.getElementById(`open-pokemonType-${i}`).innerHTML = 'Drache';
        }
        if (openCurrentPokemon['types'][i]['type']['name'] == 'steel') {
            document.getElementById(`open-pokemonType-${i}`).innerHTML = 'Stahl';
        }
        if (openCurrentPokemon['types'][i]['type']['name'] == 'ice') {
            document.getElementById(`open-pokemonType-${i}`).innerHTML = 'Ice';
        }
        if (openCurrentPokemon['types'][i]['type']['name'] == 'rock') {
            document.getElementById(`open-pokemonType-${i}`).innerHTML = 'Gestein';
        }
    }
}

// translate open-pokemon bottom-headers to german
function translate_open_bottom_content() {
    if (page_language == 'german') {
        document.getElementById(`about-header`).innerHTML = 'Allgemeines';
        document.getElementById(`basestats-header`).innerHTML = 'Status-Werte';
        document.getElementById(`moves-header`).innerHTML = 'Attacken';
        document.getElementById(`evolution-header`).innerHTML = 'Entwicklung';
    }
}

// translate open-pokemon about text to german
function translate_open_render_pokemon_about() {
    if (page_language == 'german') {
        document.getElementById('open_height').innerHTML = 'Größe:';
        document.getElementById('open_weight').innerHTML = 'Gewicht:';
        document.getElementById('open_baseExp').innerHTML = 'Erfahrungspunkte:';

        document.getElementById('open_height_worth').innerHTML = `${((openCurrentPokemon['height'] / 10) * 3).toFixed(2)} m`;
        document.getElementById('open_weight_worth').innerHTML = `${(openCurrentPokemon['weight'] / 2)} kg`;
    }
}

// translate open-pokemon evolution names to german
function translate_open_render_pokemon_evol(basename) {
    if (page_language == 'german') {
        if (document.getElementById('no-evolution')) {
            document.getElementById('no-evolution').innerHTML = 'Keine Entwicklung';
        } else {
            if (basename == 'eevee' || basename == 'vaporeon' || basename == 'jolteon' || basename == 'flareon') {
                translate_open_render_pokemon_evol_eeveeHTMLCode();
            } else {
                change_open_evol_pokemon_names();
                change_open_evol_pokemon_between_names();
            }
        }
    }
}

// translate open-pokemon evolution of the special Pokemon Evoli to german
function translate_open_render_pokemon_evol_eeveeHTMLCode() {
    document.getElementById('after-evolution-container').innerHTML = `
    <div class="eevee-container">
         <div class="eevee-evol">
             <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/134.png">
             <p>Aquana</p>
         </div>
         <div class="eevee-evol">
             <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png">
             <p>Blitza</p>
         </div>
         <div class="eevee-evol">
             <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/136.png">
             <p>Flamara</p>
         </div>
     </div>     `
    document.getElementById('between-evolution-name').innerHTML = 'Wasserstein<br>Elektrostein<br>Feuerstein';
}


// test if there is a pre or / and a after evolution of this pokemon and render the results in the open-pokemon bottom
function change_open_evol_pokemon_names() {
    pre_evol_name = document.getElementById('pre-evolution-name');
    after_evol_name = document.getElementById('after-evolution-name');
    let pre_pre_evol_name = document.getElementById('pre-pre-evolution-name');
    let pre_evol_name_new = pre_evol_name.innerHTML.toLowerCase();
    let after_evol_name_new = after_evol_name.innerHTML.toLowerCase();
    let pre_pre_evol_name_new = pre_pre_evol_name.innerHTML.toLowerCase();
    if (document.getElementById('after-evolution-name')) {
        for (i = 0; i < allPokemonSrc.length; i++) {
            if (pre_evol_name_new == allPokemonSrc[i][0]) {
                pre_evol_name.innerHTML = germanPokemon[i];
            }
            if (after_evol_name_new == allPokemonSrc[i][0]) {
                after_evol_name.innerHTML = germanPokemon[i];
            }
            if (pre_pre_evol_name_new == allPokemonSrc[i][0]) {
                pre_pre_evol_name.innerHTML = germanPokemon[i];
            }
        }
    }
}

// check if there is a special way for evolution and add the corresponding text
function change_open_evol_pokemon_between_names() {
    between_evol_name = document.getElementById('between-evolution-name');
    if (between_evol_name.innerHTML == 'moon-stone') {
        between_evol_name.innerHTML = 'Mondstein';
    }
    if (between_evol_name.innerHTML == 'aqua-stone') {
        between_evol_name.innerHTML = 'Wasserstein';
    }
    if (between_evol_name.innerHTML == 'fire-stone') {
        between_evol_name.innerHTML = 'Feuerstein';
    }
    if (between_evol_name.innerHTML == 'plant-stone') {
        between_evol_name.innerHTML = 'Pflanzenstein';
    }
    if (between_evol_name.innerHTML == 'electro-stone') {
        between_evol_name.innerHTML = 'Elektrostein';
    }
}

// translate serachfield text
function translate_header() {
    if (page_language == 'german') {
        document.getElementById('searchfield-input').placeholder = 'Pokemon-Name eingeben'
    }
}

// POKE_MASTER


//translate in Pokemaster Pokemon types to german 
function game_translate_type_ToGerman(x, i) {
    if (game_page_language == 'german') {
        if (game_currentPokemon['types'][i]['type']['name'] == 'grass') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Pflanze';
        }
        if (game_currentPokemon['types'][i]['type']['name'] == 'poison') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Gift';
        }
        if (game_currentPokemon['types'][i]['type']['name'] == 'fire') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Feuer';
        }
        if (game_currentPokemon['types'][i]['type']['name'] == 'water') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Wasser';
        }
        if (game_currentPokemon['types'][i]['type']['name'] == 'flying') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Flug';
        }
        if (game_currentPokemon['types'][i]['type']['name'] == 'bug') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Käfer';
        }
        if (game_currentPokemon['types'][i]['type']['name'] == 'normal') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Normal';
        }
        if (game_currentPokemon['types'][i]['type']['name'] == 'ground') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Boden';
        }
        if (game_currentPokemon['types'][i]['type']['name'] == 'electric') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Elektro';
        }
        if (game_currentPokemon['types'][i]['type']['name'] == 'fairy') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Fee';
        }
        if (game_currentPokemon['types'][i]['type']['name'] == 'fighting') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Kampf';
        }
        if (game_currentPokemon['types'][i]['type']['name'] == 'psychic') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Psycho';
        }
        if (game_currentPokemon['types'][i]['type']['name'] == 'ghost') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Geist';
        }
        if (game_currentPokemon['types'][i]['type']['name'] == 'dragon') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Drache';
        }
        if (game_currentPokemon['types'][i]['type']['name'] == 'steel') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Stahl';
        }
        if (game_currentPokemon['types'][i]['type']['name'] == 'ice') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Ice';
        }
        if (game_currentPokemon['types'][i]['type']['name'] == 'rock') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Gestein';
        }
        if (game_currentPokemon['types'][i]['type']['name'] == 'ice') {
            document.getElementById(`pokemonType-${x}-${i}`).innerHTML = 'Eis';
        }
    }
}

// translate in Pokemaster elements to german
function translate_element_to_german() {
    if (game_page_language == 'german') {
        if (element == 'grass') {
            element = 'Gras';
        }
        if (element == 'fire') {
            element = 'Feuer';
        }
        if (element == 'water') {
            element = 'water';
        }
        if (element == 'plant') {
            element = 'Pflanze';
        }
        if (element == 'electric') {
            element = 'Elektro';
        }
        if (element == 'bug') {
            element = 'Käfer';
        }
        if (element == 'normal') {
            element = 'Normal';
        }
        if (element == 'ground') {
            element = 'Boden';
        }
        if (element == 'poison') {
            element = 'Gift';
        }
        if (element == 'fairy') {
            element = 'Fee';
        }
        if (element == 'fighting') {
            element = 'Kampf';
        }
        if (element == 'psychic') {
            element = 'Psycho';
        }
        if (element == 'ghost') {
            element = 'Geist';
        }
        if (element == 'dragon') {
            element = 'Drache';
        }
        if (element == 'rock') {
            element = 'Stein';
        }
    }
}


// translate at Pokemaster the types of the jokers to german
function translate_joker_all_types() {
    if (game_page_language == 'german') {
        document.getElementById('white-board3').innerHTML = `
    <b>Die fehlenden Pokemon haben folgende ersten Typ:</b><br>
    Gras: ${type_grass}<br>
    Feuer: ${type_fire}<br>
    Wasser: ${type_water}<br>
    Elektro: ${type_electric}<br>
    Käfer: ${type_bug}<br>
    Normal: ${type_normal}<br>
    Boden: ${type_ground}<br>
    Gift: ${type_poison}<br>
    Fee: ${type_fairy}<br>
    Kampf: ${type_fighting}<br>
    Psycho: ${type_psychic}<br>
    Geist: ${type_ghost}<br>
    Drache: ${type_dragon}<br>
    Stein: ${type_rock}<br>   
   `;
    }
}