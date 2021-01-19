import { createStore, combineReducers, applyMiddleware } from 'redux';
import pokemonReducer from './reducers/reducer'

const rootReducer = combineReducers({
    pokemonReducer
});
const store = createStore(rootReducer);
export default store;