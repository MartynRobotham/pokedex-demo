import React, {useState, useEffect} from "react"
import { useFetchPokemon } from "../../hooks/use-fetch-pokemon";
import {PokemonDetails} from "../pokemon-details/pokemon-details"
import {SearchBar} from "../search-bar/search-bar"

export const PokemonSearch = () => {

    const [searchText, setSearchText] = useState('1');
    const {data, isLoading, error} = useFetchPokemon({identifier: searchText})

    if (!data || isLoading) {
        return (<span>Loading</span>)
    }
    
    return (
        <React.Fragment>
            <SearchBar searchQuery={(res) => setSearchText(res)}/>
            <PokemonDetails data={data} />
        </React.Fragment>
    )
}
