import api from '../apis';

import { GET_SHOPS, CREATE_SHOP, CREATE_FEED, GET_ERRORS, LOADING, NOT_LOADING } from '../actions/types';

// export const fetchShops = () => dispatch => {
//     dispatch(setLoading());
//     api.get("/shop")
//          .then((res) => {
//              console.log(res.data.shops);
//              dispatch(setShopsNotLoading());
//              dispatch({
//                 type: GET_SHOPS,
//                 payload: res.data.shops
//             })
//          })
//          .catch((err) => {
//              // set loading to false
//              dispatch(setNotLoading());
//              dispatch({
//                  type: GET_ERRORS,
//                  payload: err.response
//              })
//          });
// }

export const fetchShops = () => {
    // fetch shops
    return async dispatch => {
        const response = await api.get('/shop');

        dispatch({
            type: GET_SHOPS,
            payload: response.data
        })
    }
};

export const setLoading = () => {
    return {
        type: LOADING
    }
}

export const setNotLoading = () => {
    return {
        type: NOT_LOADING
    }
}