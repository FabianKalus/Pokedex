async function search_pokemon() {
    let search_field = document.getElementById('searchfield-input');
    let search_field_value = search_field.value.toLowerCase();
    let find_pokemon = false;

    // checks the game language
    if (page_language == 'german') {
        // checks if the searchfield is empty
        if (search_field.value.length > 0) {
            // checks if the name from the searchfield is in the list of all pokemon / there is an extra list for the german pokemon because the API was english
            for (j = 0; j < germanPokemon.length; j++) {
                if (search_field_value == germanPokemon[j].toLowerCase()) {
                    // hide / delete the other pokemon
                    document.getElementById('all-pokemon-container').innerHTML = '';
                    // show the searched pokemon
                    loadAllPokemon(j, j + 1);
                    search_field.value = '';
                    find_pokemon = true;
                }
            }
        } else if (search_field.value.length == 0) {
            alert('Bitte Namen eingeben!')
        }
        if (find_pokemon == false && search_field.value.length > 0) {
            alert('Der eingegebene Name ist nicht korrekt')
        }
        find_pokemon = false;
    }
    // same in english 
    if (page_language == 'english') {
        if (search_field.value.length > 0) {
            for (let e = 0; e < allPokemonSrc.length; e++) {
                if (search_field_value == allPokemonSrc[e][0]) {
                    document.getElementById('all-pokemon-container').innerHTML = '';
                    loadAllPokemon(e, e + 1);
                    search_field.value = '';
                    return;
                }
            }
        } else if (search_field.value.length == 0) {
            alert('You need to fill in a name!')
        }
        if (find_pokemon == false && search_field.value.length > 0) {
            alert('The name you entered is not correct')
        }
        find_pokemon = false;
    }
}