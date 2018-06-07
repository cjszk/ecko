import { SAVE_MESSAGES } from "../actions/messages";


const initialState = {
    messages: []
};

export default function messagesReducer(state = initialState, action) {
    
    if (action.type === SAVE_MESSAGES) {
        return Object.assign({}, state, {
            messages: action.messages
        })
    } 
    
    return state;
}