import { GET_USERS, REST_AD_USER_ERROR } from './types';
import axios from 'axios';
import { adUserError, } from './admin_actions';

export function getUsersByPage(limit, pageNum, searchValue) {
    return function (dispatch) {
        let api = `/api/admin/user/pages`;
        const params = searchValue ? { limit, pageNum, searchValue } : { limit, pageNum };
        axios.get(api, {
            params
        }).then(response => {
            const { success, error } = response.data;
            if (success) {
                const { pager, users } = response.data;
                dispatch({
                    type: GET_USERS,
                    payload: { pager, users, searchValue, error: '' }
                })
            } else {
                dispatch(adUserError(error));
            }
        }).catch(error => {
            console.log(error);
            dispatch(adUserError(error));
        });
    }
}

export function resetError() {
    return function (dispatch) {
        dispatch({
            type: REST_AD_USER_ERROR,
            payload: { error: '' }
        })
    }
}