import { GET_CART } from './types';
import axios from 'axios';

export function getUserCart(user_id) {
    return function (dispatch) {
        axios.get(`/api/user/cart`, {
            params: {
                user_id
            }
        }).then(response => {
            const { success, error } = response.data;
            if (success) {
                console.log('cart', response.data);
                const { products } = response.data;
                dispatch({
                    type: GET_CART,
                    payload: { products, error: '' }
                })
            }
        }).catch(error => {
            console.log(error);
        });
    }
}
