import {PokemonApiDetails} from "../../../interfaces/common.interfaces";

// Call is from pokeApi, cannot guarantee consistency
export const mapPokemonDetails = (details: any) => {
    const pokemon: PokemonApiDetails = {
        id: details['id'],
        abilities: details['abilities'],
        height: details['height'],
        moves: details['moves'],
        name: details['name'],
        order: details['order'],
        types: details['types'],
        weight: details['weight']
    }
    return pokemon;
}
