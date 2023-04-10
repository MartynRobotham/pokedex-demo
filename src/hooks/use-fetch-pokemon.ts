import {mapPokemonDetails} from "../utils/mappers/pokemon-details/pokemon-details-mapper";
import {useEffect, useState} from "react";
import {PokemonApiDetails} from "../interfaces/common.interfaces";

interface UseFetchPokemonParams {
    identifier: string;
}

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

// Can be done with the new useQuery hook -> decided to go with approach that shows a fetch request etc.
// to purely show a different JS knowledge approach outside the framework
export const useFetchPokemon = (params: UseFetchPokemonParams) => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                let timerId: string | number | NodeJS.Timeout | undefined;
                let count = 0;

                const makeRequest = () => {
                    try {
                        fetch(`${BASE_URL}/${encodeURIComponent(params.identifier)}`).then((data) => {
                            data.json().then((res) => {
                                setData(res)
                            })
                        });
                    } catch (err) {
                        // @ts-ignore
                        setError(err);
                    }
                };

                const handleTimer = async () => {
                    if (count < 10) {
                        await makeRequest();
                        count += 1;
                        timerId = setTimeout(handleTimer, 10000);
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

    return {data, isLoading, error};
};
