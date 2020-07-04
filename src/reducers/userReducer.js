import { GET_CART } from '../actions/types';

const defaultState = {
    cart: {
        products: [],
        error: '',
    }

}

export default function (state = { ...defaultState }, action) {
    console.log('actions: ', action);
    switch (action.type) {
        case GET_CART:
            return { cart: { ...action.payload } };
        default:
            return state;
    }
}