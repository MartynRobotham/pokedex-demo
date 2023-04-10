import {PokemonApiDetails} from "../../../interfaces/common.interfaces";

// Call is from pokeApi, cannot guarantee consistency
export const mapPokemonDetails = (details: any) => {
    const pokemon: PokemonApiDetails = {
        id: details['id'],
        abilities: details['abilities'],
        // Height response is in decimeters
        height: (parseFloat(details['height']) * 10),
        moves: details['moves'],
        name: details['name'],
        order: details['order'],
        types: details['types'],
        // Weight response is in hectograms
        weight: (parseFloat(details['weight']) / 10)
    }
    return pokemon;
}
