import {mapPokemonDetails, mapPokemonEffects} from "../utils/mappers/pokemon-details/pokemon-details-mapper";
import {useEffect, useState} from "react";
import {DisplayedPokemonDetails, PokemonApiDetails, PokemonEffects} from "../interfaces/common.interfaces";

interface UseFetchPokemonParams {
    identifier: string;
}

const BASE_URL = 'https://pokeapi.co/api/v2';

// Can be done with the new useQuery hook -> decided to go with approach that shows a fetch request etc.
// to purely show a different JS knowledge approach outside the framework
export const useFetchPokemon = (params: UseFetchPokemonParams) => {

    const [data, setData] = useState<DisplayedPokemonDetails | null>(null);
    const [abilities, setAbilities] = useState<PokemonEffects[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const xx: PokemonEffects[] = []

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                let timerId: string | number | NodeJS.Timeout | undefined;
                let count = 0;

                const makeRequest = () => {
                    try {
                        fetch(`${BASE_URL}/pokemon/${encodeURIComponent(params.identifier)}`).then((data) => {
                            data.json().then((res: PokemonApiDetails) => {
                                res.abilities.map((a) => {
                                    // Need to fetch all ability details per Pokémon
                                    fetch(a.ability.url).then((data) => {
                                        data.json().then((resp) => {
                                            xx.push(mapPokemonEffects(resp))
                                            // @ts-ignore
                                            const result = [...new Map(xx.map(item => [item.name, item])).values()]
                                            setAbilities(result)
                                        })
                                    })
                                });
                                const pokemon = mapPokemonDetails(res, abilities)
                                setData(pokemon)
                            })
                        })
                    } catch (err) {
                        // @ts-ignore
                        setError(err);
                    }
                };

                const handleTimer = async () => {
                    if (count < 10) {
                        await makeRequest();
                        count += 1;
                    }
                };

                handleTimer();

                return () => {
                    clearTimeout(timerId);
                };
            } catch (error) {
                // @ts-ignore
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [params.identifier]);

    return [data, abilities, isLoading, error] as const
};
