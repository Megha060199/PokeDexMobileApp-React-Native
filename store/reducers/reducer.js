import {SAVE_POKEMON ,ADD_TO_FAV  } from '../actions/action-types'


const initialState = {
   savedPokemons : [],
   favouritePokemons : []
};

const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_POKEMON:
            return { ...state,  savedPokemons: [...action.payload]};
        case ADD_TO_FAV:
            return { ...state, favouritePokemons: [...action.payload] };
        default:
            return state;
    }
};

export default pokemonReducer;