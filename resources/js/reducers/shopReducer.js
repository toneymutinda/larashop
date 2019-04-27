import { GET_SHOPS, CREATE_SHOP, CREATE_FEED } from '../actions/types';

const initialState = {
    shops: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_SHOPS:
            return {
                ...state,
                shops: action.payload
            }
        default:
            return state;
    }
}