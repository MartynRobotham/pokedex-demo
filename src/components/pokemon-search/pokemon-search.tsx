import React, {useState} from "react"
import { useFetchPokemon } from "../../hooks/use-fetch-pokemon";
import {PokemonDetails} from "../pokemon-details/pokemon-details"
import {SearchBar} from "../search-bar/search-bar"
import {Loading} from "../loading/loading";

export const PokemonSearch = () => {

    const [searchText, setSearchText] = useState('1');
    const {data, isLoading} = useFetchPokemon({identifier: searchText})

    if (!data || isLoading) {
        return (<Loading />)
    }
    
    return (
        <React.Fragment>
            <SearchBar searchQuery={(res) => setSearchText(res)}/>
            <PokemonDetails data={data} />
        </React.Fragment>
    )
}
