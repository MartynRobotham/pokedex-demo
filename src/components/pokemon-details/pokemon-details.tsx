import React, {useEffect, useState} from 'react';
import {useRateLimitChecker} from '../../hooks/use-rate-limit-checker';
import {DisplayedPokemonDetails, PokemonEffects} from '../../interfaces/common.interfaces';

export const PokemonDetails = (props: { data: DisplayedPokemonDetails, abilities: PokemonEffects[] }) => {
    const {data, abilities} = props;

    const textString = 'effect text from the APi will go here';

    const [yodaEffects, setYodaEffects] = useState(false);
    const [effectsText, setEffectsText] = useState('');

    const [hitRateLimit] = useRateLimitChecker(effectsText)

    const translateYodaText = () => {
        // TODO: Change this with effects text
        let temp = 'aaa'
        if (yodaEffects && !hitRateLimit) {
            return fetch(`https://api.funtranslations.com/translate/yoda.json?text=${textString}`)
                .then((r) => {
                    r.json().then((res) => {
                        if(res.success) {
                            return setEffectsText(res.contents.translated);
                        }
                    })
            })
        }
        setEffectsText(temp);
    }

    useEffect(() => {
        translateYodaText();
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
            {/*<span>{effectsText}</span>*/}
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
                {abilities.map((x) => <p>{x.name}</p>)}
            </div>
            <div>
                <h3>Types:</h3>
                {data?.types.map((x: { type: { name: string } }) => <p key={x.type.name}>{x.type.name}</p>)}
            </div>
        </React.Fragment>
    );
};
