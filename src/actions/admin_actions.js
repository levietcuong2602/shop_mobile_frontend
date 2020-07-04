import { ALERT_MSG, AD_POST_ERROR, AD_USER_ERROR } from './types';

export function alertMsg(alertMsg) {
    return {
        type: ALERT_MSG,
        alertMsg
    }
}

export function adPostError(error) {
    return {
        type: AD_POST_ERROR,
        payload: { error }
    }
}

export function adUserError(error) {
    return {
        type: AD_USER_ERROR,
        payload: { error }
    }
}