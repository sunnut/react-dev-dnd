import {ADD_MENU} from './actionTypes';

export default (state = [], action) => {
    switch (action.type) {
        case ADD_MENU: 
            return [action.value, ...state];
        default:
            return state;
    }
};