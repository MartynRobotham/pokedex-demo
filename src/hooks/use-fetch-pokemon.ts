import {mapPokemonDetails} from "../utils/mappers/pokemon-details/pokemon-details-mapper";
import {useState} from "react";
import {PokemonApiDetails} from "../interfaces/common.interfaces";
import {useRateLimitedApiCall} from "./use-rate-limited-api-call";

interface UseFetchPokemonParams {
    identifier: string;
}

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const UseFetchPokemon = (params: UseFetchPokemonParams) => {

    const {response, error} = useRateLimitedApiCall(`${BASE_URL}/${encodeURIComponent(params.identifier)}`, 10, 10000)
    if (response) {
        return [response as PokemonApiDetails, false] as const;
    }
    return [null, true] as const;
}
