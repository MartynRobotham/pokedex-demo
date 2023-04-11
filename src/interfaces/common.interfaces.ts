export interface PokemonApiDetails {
    id: number;
    name: string;
    height: string;
    weight: string;
    order: number;
    abilities: {
        ability: {
            name: string;
            url: string;
        }
    }[];
    moves: {
        move: {
            name: string;
        }
    }[];
    types: {
        type: {
            name: string;
        }
    }[];
}


export interface PokemonEffects {
    name: string;
    effects: {
        text: string;
    }
}

export interface DisplayedPokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    order: number;
    abilities: PokemonEffects[];
    moves: {
        move: {
            name: string;
        }
    }[];
    types: {
        type: {
            name: string;
        }
    }[];
}
