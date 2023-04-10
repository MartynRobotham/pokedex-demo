import {PokemonApiDetails} from "../../../interfaces/common.interfaces";
import {mapPokemonDetails} from "./pokemon-details-mapper";

describe('pokemon details mapper', () => {
    it('should map results', () => {
        const model: PokemonApiDetails = {
            abilities: [{ability: {name: "aaa"}}, {ability: {name: "fff"}}],
            height: 60,
            id: 123456789,
            moves: [{move: {name: "aaa"}}, {move: {name: "fff"}}],
            name: "Test",
            order: 0,
            types: [{type: {name: "Grass"}}, {type: {name: "Water"}}, {type: {name: "Fire"}}],
            weight: 100
        }
        const mappedModel = mapPokemonDetails(model)
        expect(mappedModel).toEqual({
            abilities: [{ability: {name: "aaa"}}, {ability: {name: "fff"}}],
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

export {}
