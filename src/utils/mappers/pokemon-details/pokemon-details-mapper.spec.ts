import {PokemonApiDetails} from "../../../interfaces/common.interfaces";
import {mapPokemonDetails, mapPokemonEffects} from "./pokemon-details-mapper";

describe('pokemon details mapper', () => {
    it('should map results', () => {
        const model: PokemonApiDetails = {
            abilities: [{ability: {name: "aaa", url: "test.com"}}, {ability: {name: "fff", url: "test.com"}}],
            height: '60',
            id: 123456789,
            moves: [{move: {name: "aaa"}}, {move: {name: "fff"}}],
            name: "Test",
            order: 0,
            types: [{type: {name: "Grass"}}, {type: {name: "Water"}}, {type: {name: "Fire"}}],
            weight: '100'
        }
        const mappedModel = mapPokemonDetails(model, [])
        expect(mappedModel).toEqual({
            abilities: [],
            height: 600,
            id: 123456789,
            moves: [{move: {name: "aaa"}}, {move: {name: "fff"}}],
            name: "Test",
            order: 0,
            types: [{type: {name: "Grass"}}, {type: {name: "Water"}}, {type: {name: "Fire"}}],
            weight: 10
        })
    })
})

describe('mapPokemonEffects', () => {
    const details = {
        name: 'pikachu',
        effect_entries: [
            {
                short_effect: 'Electric-type moves get STAB from this Pokemon.',
                language: {
                    name: 'en',
                },
            },
            {
                short_effect: 'このポケモンのでんきタイプのわざダメージは、より強くなる。',
                language: {
                    name: 'ja-Hrkt',
                },
            },
        ],
    };

    it('should return an object with the expected properties', () => {
        const expected = {
            name: 'pikachu',
            effects: {
                text: 'Electric-type moves get STAB from this Pokemon.',
            },
        };
        const result = mapPokemonEffects(details);
        expect(result).toEqual(expected);
    });

    it('should handle details with no English effect entry', () => {
        const detailsNoEnglish = {
            name: 'charmander',
            effect_entries: [
                {
                    short_effect: 'Fire-type moves get STAB from this Pokemon.',
                    language: {
                        name: 'de',
                    },
                },
            ],
        };
        const expected = {
            name: 'charmander',
            effects: {
                text: '',
            },
        };
        const result = mapPokemonEffects(detailsNoEnglish);
        expect(result).toEqual(expected);
    });

    it('should return an empty effects object if details are undefined', () => {
        const expected = {
            name: '',
            effects: {
                text: '',
            },
        };
        const result = mapPokemonEffects(undefined);
        expect(result).toEqual(expected);
    });
});

export {}
