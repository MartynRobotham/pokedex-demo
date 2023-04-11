import React, {useEffect, useState} from 'react';
import {useRateLimitChecker} from '../../hooks/use-rate-limit-checker';
import {DisplayedPokemonDetails, PokemonEffects} from '../../interfaces/common.interfaces';
import './pokemon-details.css';

export const PokemonDetails = (props: { data: DisplayedPokemonDetails, abilities: PokemonEffects[] }) => {
    const {data, abilities} = props;

    const [yodaEffects, setYodaEffects] = useState(false);
    const [effectsText, setEffectsText] = useState<string[]>(abilities.map((y) => y.effects.text));

    const [hitRateLimit] = useRateLimitChecker(effectsText)

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
    }, [yodaEffects, abilities]);

    return (
        <React.Fragment>
            <h1>
                {data?.name}
            </h1>
            <div className={'flex-box'}>
                <h2>Height:</h2>
                <p>{`${data?.height} cm`}</p>
            </div>
            <div className={'flex-box'}>
                <h2>Weight:</h2>
                <p>{`${data?.weight} kg`}</p>
            </div>
            <div>
                <div className={'full-flex'}>
                <h3>Abilities:</h3>
                <form>
                    <input
                        onClick={() => setYodaEffects(!yodaEffects)}
                        type="checkbox"
                        id="yoda_effects"
                        name="yoda"
                        value={'Yoda'}/>
                    <label htmlFor="vehicle1">Show effects in Yoda</label>
                </form>
                </div>
                {abilities.map((x, idx) => {
                    return (
                        <div key={idx}>
                            <h4>{x.name}</h4>
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
