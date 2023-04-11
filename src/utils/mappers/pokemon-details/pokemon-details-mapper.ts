import {DisplayedPokemonDetails, PokemonApiDetails, PokemonEffects} from "../../../interfaces/common.interfaces";

// Call is from pokeApi, cannot guarantee consistency
export const mapPokemonDetails = (details: PokemonApiDetails, abilities: PokemonEffects[]) => {
    const pokemon: DisplayedPokemonDetails = {
        id: details['id'],
        abilities: abilities,
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

export const mapPokemonEffects = (details: any) => {
    const effectText = details['effect_entries'].map((x: any) => x['short_effect'])
    const effects: PokemonEffects = {
        name: details['name'],
        effects: {
            text: ['aa', 'bb']
        }
    }
    return effects
}
