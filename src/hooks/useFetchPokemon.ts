import {mapPokemonDetails} from "../utils/mappers/pokemon-details/pokemon-details-mapper";
import {useState} from "react";
import {PokemonApiDetails} from "../interfaces/common.interfaces";

interface UseFetchPokemonParams {
    identifier: string;
}

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const UseFetchPokemon = (params: UseFetchPokemonParams) => {
    const [data, setData] = useState<PokemonApiDetails>();

    let loading = true;
    fetch(`${BASE_URL}${encodeURIComponent(params.identifier)}`).then((res) => {
        setData(mapPokemonDetails(res.json()));
        loading = false;
    })
    return [data, loading] as const;
}
