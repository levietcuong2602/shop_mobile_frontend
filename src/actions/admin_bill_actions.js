import { GET_BILLS_ADMIN } from './types';
import axios from 'axios';

export function getBillsByPage(limit, pageNum, searchValue, filter) {
    return function (dispatch) {
        axios.get(`/api/admin/bill/pages`, {
            params: {
                limit,
                pageNum,
                searchValue,
                filter
            }
        }).then(response => {
            const { success, error } = response.data;
            if (success) {
                const { pager, bills } = response.data;
                dispatch({
                    type: GET_BILLS_ADMIN,
                    payload: { pager, bills, searchValue, filter, error }
                })
            } else {
                console.log("error admin_bill_action: ", error);
            }
        }).catch(error => {
            console.log("error admin_bill_action: ", error);
        });
    }
}