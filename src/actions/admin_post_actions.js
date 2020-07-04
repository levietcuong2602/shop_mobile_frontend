import { GET_POSTS, RESET_AD_POST_ERROR } from './types';
import axios from 'axios';
import { adPostError } from './admin_actions';

export function getPostsByPage(limit, pageNum) {
    return function (dispatch) {
        axios.get(`/api/admin/post/pages`, {
            params: { limit, pageNum }
        }).then(response => {
            const { success, error } = response.data;
            if (success) {
                const { pager, posts } = response.data;
                dispatch({
                    type: GET_POSTS,
                    payload: { pager, posts, erorr: '' }
                })
            } else {
                dispatch(adPostError(error));
            }
        }).catch(err => {
            console.log(err);
            dispatch(adPostError(err));
        });
    }
}

export function resetError() {
    return function (dispatch) {
        dispatch({
            type: RESET_AD_POST_ERROR,
            payload: { error: '' }
        })
    }
}