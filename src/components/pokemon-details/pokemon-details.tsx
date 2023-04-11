import React, {useEffect, useState} from 'react';
import {useRateLimitChecker} from '../../hooks/use-rate-limit-checker';
import {DisplayedPokemonDetails, PokemonEffects} from '../../interfaces/common.interfaces';

export const PokemonDetails = (props: { data: DisplayedPokemonDetails, abilities: PokemonEffects[] }) => {
    const {data, abilities} = props;

    const [yodaEffects, setYodaEffects] = useState(false);
    const [effectsText, setEffectsText] = useState<string[]>(abilities.map((y) => y.effects.text));

    const [hitRateLimit] = useRateLimitChecker('')

    useEffect(() => {
        if (yodaEffects && !hitRateLimit) {
            const promises = abilities.map(url =>
                fetch(`https://api.funtranslations.com/translate/yoda.json?text=${url.effects.text}`)
                    .then(response => response.json()));

            Promise.all(promises).then(data => {
                return setEffectsText(data.map((x) => x.contents.translated))
            })
        }
        return setEffectsText(abilities.map((y) => y.effects.text))
    }, [yodaEffects]);

    return (
        <React.Fragment>
            <form>
                <input
                    onClick={() => setYodaEffects(!yodaEffects)}
                    type="checkbox"
                    id="yoda_effects"
                    name="yoda"
                    value={'Yoda'}/>
                <label htmlFor="vehicle1">Show effects in Yoda</label>
            </form>
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
                <h3>Abilities:</h3>
                {abilities.map((x, idx) => {
                    return (
                        <div key={idx}>
                            <p>{x.name}</p>
                            <p>{effectsText[idx]}</p>
                        </div>
                    )
                })}
            </div>
            <div>
                <h3>Types:</h3>
                {data?.types.map((x: { type: { name: string } }) => <p key={x.type.name}>{x.type.name}</p>)}
            </div>
        </React.Fragment>
    );
};
