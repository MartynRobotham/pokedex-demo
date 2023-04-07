import React from 'react';
import {UseFetchPokemon} from "../../hooks/useFetchPokemon";

// interface PokemonDetailsProps {
//     details: PokemonApiDetails
// }

export const PokemonDetails = () => {

    const [data, loading] = UseFetchPokemon({identifier: "1"})

    if(loading) {
        return (<span>Loading</span>)
    }

    return (
        <div>
            {data?.name}
        </div>
    );
};
