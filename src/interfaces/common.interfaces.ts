export interface PokemonApiDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    order: number;
    abilities: {
        ability: {
            name: string;
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
