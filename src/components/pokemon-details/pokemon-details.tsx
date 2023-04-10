import React, {useEffect, useState} from 'react';
import {useRateLimitChecker} from '../../hooks/use-rate-limit-checker';
import {PokemonApiDetails} from '../../interfaces/common.interfaces';

export const PokemonDetails = (props: { data: PokemonApiDetails }) => {
    const {data} = props;

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
        const result = translateYodaText();
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
            <span>{effectsText}</span>
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
                Abilities: {data?.abilities.map((x: { ability: { name: string } }) => <ul>{x.ability.name}</ul>)}
            </div>
            <div>
                Moves: {data?.moves.map((x: { move: { name: string } }) => <ul>{x.move.name}</ul>)}
            </div>
            <div>
                Types: {data?.types.map((x: { type: { name: string } }) => <ul>{x.type.name}</ul>)}
            </div>
        </React.Fragment>
    );
};
