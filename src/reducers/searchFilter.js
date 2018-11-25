// filter state for search bar
import types from '../actions/types';

export default function (state = '', action) {

    switch (action.type) {
        case types.SET_SEARCH_FILTER:
            return action.payload;

        default:
            return state;
    }
}