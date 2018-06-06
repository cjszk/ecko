import { GET_LOCATION } from "../actions/main";


const initialState = {
    location: null
};

export default function guessReducer(state = initialState, action) {
    if (action.type === GET_LOCATION) {
        return Object.assign({}, state, {
            location: action.location
        })
    } 
    return state;
}