let game_currentPokemon;
let game_openCurrentPokemon;
let game_allPokemon;
let game_page_language = 'german';
let lifes_left = 6;
let right_answers = [];
let pokemon_not_answered_list = [];
let pokemon_not_answered_list_german = [];
let pokemon_first_type_list = [];
let element = '';

let type_grass = 0;
let type_fire = 0;
let type_water = 0;
let type_plant = 0;
let type_electric = 0;
let type_bug = 0;
let type_normal = 0;
let type_ground = 0;
let type_poison = 0;
let type_fairy = 0;
let type_fighting = 0;
let type_psychic = 0;
let type_ghost = 0;
let type_dragon = 0;
let type_rock = 0;

let text_l = 0;
let text_number = 1;
let text_text = "If you want to become a Pokemon-Master you have to know all Pokemon very well. Test your knowledge in the ultimate Pokemon-Quiz!";
let text_text2 = "You have to input the name of the Pokemon, in the Pokedex. Do you know them all? If you get 5 faults you`re out.";
let text_text3 = "But I will give you a little help. 2 times I will help you with a name, 2 times with one type and one time with all types.";
let text_text4 = "You only can ask me everything once! So have fun and enjoy the game.";

let text_text_german = "Um ein Pokemon-Meister zu werden musst du alle Pokemon kennen. Teste dein Wissen im ultimativen Pokemon-Quiz!";
let text_text2_german = "Du musst die Namen der Pokemon in den Pokedex eintragen. Kennst du sie alle? Bei 5 Fehlern hast du verloren.";
let text_text3_german = "Aber ein kleine Hilfe gebe ich dir. 2x kannst du mich nach einen Namen frage, 2x nach einem Typ und 1x nach allen Typen.";
let text_text4_german = "Du kannst mir jede Frage nur einmal stellen. Viel Spahß auf deinem Weg ein wahrer Pokemon-Meister zu werden.";




async function load_pokemaster() {
    game_mode = 'on';
    await loadAllPokemonSrc();
    render_overlay_images();
    create_pokemon_not_answered_list();
    console.log(allPokemonSrc);
    console.log(pokemon_not_answered_list);
    console.log(pokemon_not_answered_list_german);

}

function create_pokemon_not_answered_list() {
    if (game_page_language == 'german')
        for (let x = 0; x < 151; x++) {
            pokemon_not_answered_list_german.push(germanPokemon[x]);
            pokemon_first_type_list.push(allPokemonSrc[x][2]);
        }
    else {
        for (let x = 0; x < 151; x++) {
            pokemon_not_answered_list.push(allPokemonSrc[x][0]);
            pokemon_first_type_list.push(allPokemonSrc[x][2]);
        }
    }
}

async function game_loadAllPokemon(start, end) {
    let game_allUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0';
    let game_allResponse = await fetch(game_allUrl);
    game_allPokemon = await game_allResponse.json();
    for (let i = start; i < end; i++) {
        let game_oneUrl = game_allPokemon['results'][i]['url'];
        await game_loadPokemon(game_oneUrl, i);
    }
}

async function rest_render_overlay_images() {
    for (let oi = 0; oi < 80; oi++) {
        document.getElementById('game-all-pokemon-container').innerHTML += `
        <div class="overlay-container" id="overlay-container${oi}">
            <div class="overlay-image-container" id="overlayimage-container${oi}">
            <img class="overlay-image" src="./img/question-mark-gd91fa0596_640.png">
            </div>
        </div>`
    }
}

async function game_loadPokemon(game_oneUrl, x) {
    let game_url = game_oneUrl;
    let game_response = await fetch(game_url);
    game_currentPokemon = await game_response.json();
    let game_typeLength = game_currentPokemon['types'].length;
    game_renderOnePokemonHTML(x);
    game_renderPokemonInfo(x);
    game_renderBackgroundcolor(x, 0);
    if (game_typeLength > 1) {
        game_renderBackgroundcolor(x, 1)
    };
    game_renderBackgroundcolorAndImage(x);
    translateToGerman(x);
}

function game_renderOnePokemonHTML(x) {
    document.getElementById(`overlay-container${x}`).innerHTML =
        `
    <div class="one-pokemon-container" id="one-pokemon-container${x}">
        <div id="one-pokemon-header${x}" class="one-pokemon-header">
            <img id="one-pokemon-header-image${x}" class="one-pokemon-backgroundimage" src="">           
        </div>
        <div class="one-pokemon-content">
            <div class="pokemonName" id="pokemonName${x}">Name</div>
            <img class="pokemonImage" id="pokemonImage${x}" src="">
        </div>
        <div class="pokemonType" id="pokemonType${x}">Type</div>
        <div class="pokemonId" id="pokemonId${x}">ID</div>
    </div>  
    `;
}

function render_overlay_images() {
    for (let oi = 80; oi < 151; oi++) {
        document.getElementById('game-all-pokemon-container').innerHTML += `
        <div class="overlay-container" id="overlay-container${oi}">
            <div class="overlay-image-container" id="overlayimage-container${oi}">
            <img class="overlay-image" src="./img/question-mark-gd91fa0596_640.png">
            </div>
        </div>`
    }
}

function game_renderPokemonInfo(x) {
    game_changeNameInBig(x);
    game_renderID(x);
    game_renderType(x);
    document.getElementById(`pokemonImage${x}`).src = game_currentPokemon['sprites']['other']['official-artwork']['front_default'];
}

function game_changeNameInBig(x) {
    let pokemonName = game_currentPokemon['name'];
    let NameInBig = pokemonName[0].toUpperCase() + pokemonName.slice(1);
    document.getElementById(`pokemonName${x}`).innerHTML = NameInBig;
}

function game_renderID(x) {
    let pokemonId = game_currentPokemon['id'];
    pokemonId = pokemonId.toString();
    if (pokemonId.length == 1) {
        pokemonId = '00' + pokemonId;
    }
    if (pokemonId.length == 2) {
        pokemonId = '0' + pokemonId;
    }
    document.getElementById(`pokemonId${x}`).innerHTML = '#' + pokemonId;
}

function game_renderType(x) {
    let pokemonTypes = game_currentPokemon['types'];
    document.getElementById(`pokemonType${x}`).innerHTML = '';
    for (let i = 0; i < pokemonTypes.length; i++) {
        document.getElementById(`pokemonType${x}`).innerHTML += `
        <div id="pokemonType-${x}-${i}">
        ${game_currentPokemon['types'][i]['type']['name']}
        </div>
        `;
        game_translate_type_ToGerman(x, i)
    };
}

function game_renderBackgroundcolor(x, t) {
    let mainType = game_currentPokemon['types'][t]['type']['name'];
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

function game_renderBackgroundcolorAndImage(x) {
    let mainType = game_currentPokemon['types'][0]['type']['name'];
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

//search game-master

async function game_search_pokemon() {
    let search_field = document.getElementById('game-searchfield');
    let search_field_value = search_field.value.toLowerCase();
    let find_pokemon = false;

    for (let wh = 1; wh < 6; wh++) {
        if (document.getElementById(`white-board${wh}`).classList.contains('d-none') == false) {
            document.getElementById(`white-board${wh}`).classList.add('d-none');
            document.getElementById(`help-white-board${wh}`).classList.add('d-none');
        }
    }

    if (game_page_language == 'german') {
        if (search_field.value.length > 0) {
            if (check_right_answers(search_field_value)) {
                alert('Dieses Pokemon hast du bereits genannt');
                return;
            } else {
                for (let e = 0; e < germanPokemon.length; e++) {
                    if (search_field_value == germanPokemon[e].toLowerCase()) {
                        document.getElementById(`overlayimage-container${e}`).style.display = 'none';
                        right_answers.push(search_field_value);
                        search_field.value = '';
                        document.getElementById('solution-questionmark').src = allPokemonSrc[e][1];
                        setTimeout(wait, 500);
                        setTimeout(change_image_in_questionmark, 2500);
                        types_not_answered(e);
                        names_not_answered(e);
                        game_loadAllPokemon(e, e + 1);
                        check_winning();
                        return;
                    }
                }
            }
        } else if (search_field.value.length == 0) {
            alert('Du musst einen Namen eintragen!');
        }
        if (find_pokemon == false && search_field.value.length > 0) {
            alert('Der eingegebene Name ist nicht korrekt.');
            lose_life();
        }
        find_pokemon = false;
    }
    if (game_page_language == 'english') {
        if (search_field.value.length > 0) {
            if (check_right_answers(search_field_value)) {
                alert('You already got this one');
                return;
            } else {
                for (let e = 0; e < allPokemonSrc.length; e++) {
                    if (search_field_value == allPokemonSrc[e][0]) {
                        document.getElementById(`overlayimage-container${e}`).style.display = 'none';
                        right_answers.push(search_field_value);
                        search_field.value = '';
                        document.getElementById('solution-questionmark').src = allPokemonSrc[e][1];
                        setTimeout(wait, 500);
                        setTimeout(change_image_in_questionmark, 2500);
                        pokemon_not_answered(search_field_value);
                        types_not_answered(e);
                        check_winning();
                        return;
                    }
                }
            }
        } else if (search_field.value.length == 0) {
            alert('You need to fill in a name!');
        }
        if (find_pokemon == false && search_field.value.length > 0) {
            alert('The name you entered is not correct');
            lose_life();
        }
        find_pokemon = false;
    }
}

function check_winning() {
    if (pokemon_not_answered_list_german.length == 0) {
        document.getElementById('win-container').classList.remove('d-none');
        document.getElementById('body2').style.overflow = 'hidden';
    }
}

function wait() {
    document.getElementById('solution-questionmark').style.animation = 'movedown 2s linear';
}

function names_not_answered(e) {
    let answered_name = germanPokemon[e];
    for (let na = 0; na < pokemon_not_answered_list_german.length; na++)
        if (answered_name == pokemon_not_answered_list_german[na]) {
            pokemon_not_answered_list_german.splice(na, 1);
            return;
        }
}

function types_not_answered(e) {
    let answered_type = allPokemonSrc[e][2];
    for (let ty = 0; ty < pokemon_first_type_list.length; ty++)
        if (answered_type == pokemon_first_type_list[ty]) {
            pokemon_first_type_list.splice(ty, 1);
            return;
        }
}

function joker_one_type(x) {
    let type_element = 0;
    let number_for_element = Math.floor(Math.random() * 15);
    if (number_for_element == 0) {
        element = 'grass';
    }
    if (number_for_element == 1) {
        element = 'fire';
    }
    if (number_for_element == 2) {
        element = 'water';
    }
    if (number_for_element == 3) {
        element = 'plant';
    }
    if (number_for_element == 4) {
        element = 'electric';
    }
    if (number_for_element == 5) {
        element = 'bug';
    }
    if (number_for_element == 6) {
        element = 'normal';
    }
    if (number_for_element == 7) {
        element = 'ground';
    }
    if (number_for_element == 8) {
        element = 'poison';
    }
    if (number_for_element == 9) {
        element = 'fairy';
    }
    if (number_for_element == 10) {
        element = 'fighting';
    }
    if (number_for_element == 11) {
        element = 'psychic';
    }
    if (number_for_element == 12) {
        element = 'ghost';
    }
    if (number_for_element == 13) {
        element = 'dragon';
    }
    if (number_for_element == 14) {
        element = 'rock';
    }
    for (let jt = 0; jt < pokemon_first_type_list.length; jt++) {
        if (pokemon_first_type_list[jt] == element) {
            type_element++;
        }
    }
    just_one_joker();
    document.getElementById(`white-board${x}`).classList.remove('d-none');
    document.getElementById(`help-white-board${x}`).classList.remove('d-none');
    translate_element_to_german();
    document.getElementById(`white-board${x}`).innerHTML = `
    ${element}: ${type_element}`
    used_joker(x);
}

function just_one_joker() {
    document.getElementById('white-board1').classList.add('d-none');
    document.getElementById('white-board2').classList.add('d-none');
    document.getElementById('white-board3').classList.add('d-none');
    document.getElementById('white-board4').classList.add('d-none');
    document.getElementById('white-board5').classList.add('d-none');

    document.getElementById('help-white-board1').classList.add('d-none');
    document.getElementById('help-white-board2').classList.add('d-none');
    document.getElementById('help-white-board3').classList.add('d-none');
    document.getElementById('help-white-board4').classList.add('d-none');
    document.getElementById('help-white-board5').classList.add('d-none');
}

function joker_all_types(x) {
    for (let jt = 0; jt < pokemon_first_type_list.length; jt++) {
        if (pokemon_first_type_list[jt] == 'grass') {
            type_grass++;
        }
        if (pokemon_first_type_list[jt] == 'fire') {
            type_fire++;
        }
        if (pokemon_first_type_list[jt] == 'water') {
            type_water++;
        }
        if (pokemon_first_type_list[jt] == 'electric') {
            type_electric++;
        }
        if (pokemon_first_type_list[jt] == 'bug') {
            type_bug++;
        }
        if (pokemon_first_type_list[jt] == 'normal') {
            type_normal++;
        }
        if (pokemon_first_type_list[jt] == 'poison') {
            type_poison++;
        }
        if (pokemon_first_type_list[jt] == 'fairy') {
            type_fairy++;
        }
        if (pokemon_first_type_list[jt] == 'fighting') {
            type_fighting++;
        }
        if (pokemon_first_type_list[jt] == 'psychic') {
            type_psychic++;
        }
        if (pokemon_first_type_list[jt] == 'ghost') {
            type_ghost++;
        }
        if (pokemon_first_type_list[jt] == 'dragon') {
            type_dragon++;
        }
        if (pokemon_first_type_list[jt] == 'rock') {
            type_rock++;
        }
        if (pokemon_first_type_list[jt] == 'ground') {
            type_ground++;
        }
    }
    document.getElementById('white-board3').classList.remove('d-none');
    just_one_joker();
    document.getElementById('white-board3').classList.remove('d-none');
    document.getElementById('help-white-board3').classList.remove('d-none');
    document.getElementById('white-board3').innerHTML = `
    <b>There are still missing following Pokemon first types:</b><br>
    grass: ${type_grass}<br>
    fire: ${type_fire}<br>
    water: ${type_water}<br>
    electric: ${type_electric}<br>
    bug: ${type_bug}<br>
    normal: ${type_normal}<br>
    ground: ${type_ground}<br>
    poison: ${type_poison}<br>
    fairy: ${type_fairy}<br>
    fighting: ${type_fighting}<br>
    psychic: ${type_psychic}<br>
    ghost: ${type_ghost}<br>
    dragon: ${type_dragon}<br>
    rock: ${type_rock}<br>   
   `;
    translate_joker_all_types();
    used_joker(x);
}

function pokemon_not_answered(search_field_value) {
    for (let p = 0; p < pokemon_not_answered_list.length; p++) {
        if (search_field_value == pokemon_not_answered_list[p]) {
            pokemon_not_answered_list.splice(p, 1);
        }
    }
}

function joker_left_pokemon_name(x) {
    let random_name;
    if (game_page_language == 'german') {
        let random_number_left_pokemon = Math.floor((Math.random() * pokemon_not_answered_list_german.length));
        random_name = pokemon_not_answered_list_german[random_number_left_pokemon];
    } else {
        let random_number_left_pokemon = Math.floor((Math.random() * pokemon_not_answered_list.length));
        random_name = pokemon_not_answered_list[random_number_left_pokemon];
    }
    let first_two = random_name[0].toUpperCase() + random_name[1];
    let letters_left = '';
    for (let n = 2; n < random_name.length; n++) {
        letters_left = letters_left + ' _';
    }
    let name_help = first_two + letters_left;
    just_one_joker();
    document.getElementById(`white-board${x}`).classList.remove('d-none');
    document.getElementById(`help-white-board${x}`).classList.remove('d-none');
    document.getElementById(`white-board${x}`).innerHTML = `
    ${name_help}`;
    used_joker(x);
}

function used_joker(x) {
    document.getElementById(`joker-image-container${x}`).classList.remove('d-none');
}


function check_right_answers(search_field_value) {
    for (let a = 0; a < right_answers.length; a++) {
        if (right_answers[a] == search_field_value) {
            return true;
        }
    }
}

function change_image_in_questionmark() {
    document.getElementById('solution-questionmark').src = './img/question-mark-gd91fa0596_640.png';
    document.getElementById('solution-questionmark').style.animation = '';
}

function lose_life() {
    lifes_left = lifes_left - 1;
    if (lifes_left < 2) {
        document.getElementById('lose-container').classList.remove('d-none');
    } else {
        setTimeout(lose_life_animation, 100);
        setTimeout(lose_life_animation, 200);
        setTimeout(lose_life_animation, 300);
        setTimeout(lose_life_animation, 400);
        setTimeout(lose_life_animation, 500);
        setTimeout(lose_life_animation, 700);
        setTimeout(lose_life_animation, 900);
        setTimeout(lose_life_animation, 1100);
        setTimeout(lose_life_animation, 1400);
        setTimeout(lose_life_animation, 1900);
        setTimeout(lose_life_animation, 2400);
        document.getElementById('solution-questionmark').src = './img/abort-g901382f4b_640.png';
    }

}

function lose_life_animation() {
    document.getElementById(`life-image-filled${lifes_left}`).classList.toggle('d-none');
    document.getElementById(`life-image-unfilled${lifes_left}`).classList.toggle('d-none');
}

function game_change_to_english() {
    game_page_language = 'english';
    document.getElementById('choose-language-container').classList.add('d-none');
    load_pokemaster();
    show_typing();

}

function game_change_to_german() {
    game_page_language = 'german';
    document.getElementById('choose-language-container').classList.add('d-none');
    load_pokemaster();
    show_typing();
}

function show_typing() {
    let intro_white = document.getElementById('intro-white-p');
    if (game_page_language == 'german') {
        if (text_l < text_text_german.length) {
            intro_white.innerHTML += text_text_german[text_l];
            text_l++;
            setTimeout(show_typing, 70);
        }
        if (text_l == text_text_german.length) {
            document.getElementById('skip-btn').classList.add('d-none');
            document.getElementById('next-btn').classList.remove('d-none');
        }
    } else {
        if (text_l < text_text.length) {
            intro_white.innerHTML += text_text[text_l];
            text_l++;
            setTimeout(show_typing, 70);
        }
        if (text_l == text_text.length) {
            document.getElementById('skip-btn').classList.add('d-none');
            document.getElementById('next-btn').classList.remove('d-none');
        }
    }
}

function next_text() {
    let intro_white = document.getElementById('intro-white-p');
    let intro_container = document.getElementById('intro-container');
    document.getElementById('skip-btn').classList.remove('d-none');
    document.getElementById('next-btn').classList.add('d-none');
    intro_white.innerHTML = '';
    text_number++;
    text_l = 0;
    if (game_page_language == 'german') {
        if (text_number == 2) {
            text_text_german = text_text2_german;
        }
        if (text_number == 3) {
            text_text_german = text_text3_german;
            rest_render_overlay_images();

        }
        if (text_number == 4) {
            text_text_german = text_text4_german;
        }
        if (text_number == 5) {
            intro_container.classList.add('d-none');
            document.getElementById('body2').style.overflowY = 'scroll';
            document.getElementById('link-index').style.position = 'absolute';
        }
        setTimeout(show_typing, 70);
    } else {
        if (text_number == 2) {
            text_text = text_text2;
        }
        if (text_number == 3) {
            text_text = text_text3;
            rest_render_overlay_images();

        }
        if (text_number == 4) {
            text_text = text_text4;
        }
        if (text_number == 5) {
            intro_container.classList.add('d-none');
            document.getElementById('body2').style.overflowY = 'scroll';
        }
        setTimeout(show_typing, 70);
    }
}

function skip_text() {
    let intro_white = document.getElementById('intro-white-p');
    if (game_page_language == 'german') {
        intro_white.innerHTML = text_text_german;
        text_l = text_text_german.length;
    } else {
        intro_white.innerHTML = text_text;
        text_l = text_text.length;
    }
}

function los2() {
    let asf = document.querySelectorAll('.one-pokemon-container');
    console.log(asf.length)
}