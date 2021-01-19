import {SAVE_POKEMON ,ADD_TO_FAV  } from './action-types'

export const setPokemonToSave = payload => {
    return {
        type: SAVE_POKEMON,
        payload,
    };
};
export const setPokemonToFav = payload => {
    return {
        type: ADD_TO_FAV,
        payload,
    };
};