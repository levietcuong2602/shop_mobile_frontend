import {
    GET_POSTS, AD_POST_ERROR, RESET_AD_POST_ERROR,
    GET_USERS, AD_USER_ERROR, REST_AD_USER_ERROR,
    GET_PRODUCTS_ADMIN,
    GET_BILLS_ADMIN,
} from '../actions/types';

const defaultState = {
    post: {
        pager: {
            offset: 0,
            limit: 10,
            currentPageNum: 1,
            totalCount: 0,
            hasPrev: false,
            hasNext: false,
            prevPageNum: undefined,
            nextPageNum: undefined,
            lastPageNum: 1,
        },
        posts: [],
        error: ''
    },
    user: {
        pager: {
            offset: 0,
            limit: 10,
            currentPageNum: 1,
            totalCount: 0,
            hasPrev: false,
            hasNext: false,
            prevPageNum: undefined,
            nextPageNum: undefined,
            lastPageNum: 1,
        },
        users: [],
        searchValue: '',
        error: ''
    },
    product: {
        productList: {
            pager: {
                offset: 0,
                limit: 10,
                currentPageNum: 1,
                totalCount: 0,
                hasPrev: false,
                hasNext: false,
                prevPageNum: undefined,
                nextPageNum: undefined,
                lastPageNum: 1,
            },
            products: [],
            searchValue: '',
            filter: {
                provider: 0,
                product_type: 0,
            },
            error: '',
        },
        productAttribute: {
            productTypes: [],
            productTypeAttibutes: [],
            prodcutAttributes: [],
            error: '',
        },
    },
    bill: {
        pager: {
            offset: 0,
            limit: 10,
            currentPageNum: 1,
            totalCount: 0,
            hasPrev: false,
            hasNext: false,
            prevPageNum: undefined,
            nextPageNum: undefined,
            lastPageNum: 1,
        },
        bills: [],
        searchValue: '',
        filter: {
            date: 0,
            billType: 0,
        },
        error: ''
    },
}

export default function (state = { ...defaultState }, action) {
    switch (action.type) {
        case GET_POSTS:
        case AD_POST_ERROR:
        case RESET_AD_POST_ERROR:
            return { ...state, post: { ...state.post, ...action.payload } };
        case GET_USERS:
        case AD_USER_ERROR:
        case REST_AD_USER_ERROR:
            return { ...state, user: { ...state.user, ...action.payload } };
        case GET_PRODUCTS_ADMIN:
            return { ...state, product: { ...state.product, productList: { ...action.payload } } };
        case GET_BILLS_ADMIN:
            return { ...state, bill: { ...action.payload } }
        default:
            return state;
    }
}