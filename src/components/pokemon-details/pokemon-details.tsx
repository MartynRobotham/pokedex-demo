import React from 'react';
import {UseFetchPokemon} from "../../hooks/use-fetch-pokemon";

export const PokemonDetails = () => {

    const [data, loading] = UseFetchPokemon({identifier: "1"})

    if (loading) {
        return (<span>Loading</span>)
    }

    return (
        <React.Fragment>
            <h1>
                {data?.name}
            </h1>
            <h2>
                Height: {`${data?.height} cm`}
            </h2>
            <h2>
                Weight: {`${data?.weight} kg`}
            </h2>
            <div>
                Abilities: {data?.abilities.map((x: {ability: {name: string}}) => <ul>{x.ability.name}</ul>)}
            </div>
            <div>
                Moves: {data?.moves.map((x: {move: {name: string}}) => <ul>{x.move.name}</ul>)}
            </div>
            <div>
                Types: {data?.types.map((x: {type: {name: string}}) => <ul>{x.type.name}</ul>)}
            </div>
        </React.Fragment>
    );
};
