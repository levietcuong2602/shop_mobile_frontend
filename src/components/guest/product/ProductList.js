import React, { Component } from 'react';
import styed from 'styled-components';
import ProductItem from './ProductItem';
import pagination from './pagination/pageUtil';
import axios from 'axios';

const Container = styed.div`
    float: left;
    width: 100%;
    position: relative;
    padding: 15px 10px 0 10px;
    margin: 0;
    .pagination{
        position: absolute;
        right: 10px;
        top: 10px;
    }
`;

class ProductList extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            currentPage: 1,
            limit: 4,
            totalCount: '',
            hasPrev: '',
            hasNext: '',
            prevPageNum: '',
            nextPageNum: '',
            lastPageNum: '',
        }
        this.handlerClick = this.handlerClick.bind(this);
    }
    handlerClick(pageNum) {
        const limit = this.state.limit;
        const product_type_id = this.props.product_type_id;

        this.getProductGuest(limit, pageNum, {}, { product_type: product_type_id });
    }
    pageItem(pageNum, key) {
        const { currentPage } = this.state;

        if (typeof pageNum === 'number') {
            return pageNum !== currentPage
                ? (<li key={key} id={pageNum} onClick={() => this.handlerClick(pageNum)}><a href="#">{pageNum}</a></li>)
                : (<li key={key} id={pageNum} onClick={() => this.handlerClick(pageNum)} className="active"><a href="#">{pageNum}</a></li>);
        }
        return <li key={key} id={pageNum} onClick={() => this.handlerClick(pageNum)} className="disabled"><a href="#">{pageNum}</a></li>;
    }

    getProductGuest(limit, pageNum, searchValue, filter) {
        axios.get(`/api/guest/productlist/pages`, {
            params: {
                pageNum,
                limit,
                searchValue,
                filter,
            }
        }).then(response => {
            const { success, error } = response.data;

            if (success) {
                const {
                    pager: {
                        totalCount,
                        hasPrev,
                        hasNext,
                        prevPageNum,
                        nextPageNum,
                        lastPageNum
                    },
                    products
                } = response.data;

                this.setState({
                    products,
                    currentPage: pageNum,
                    totalCount,
                    hasPrev,
                    hasNext,
                    prevPageNum,
                    nextPageNum,
                    lastPageNum,
                });
            } else {
                console.log("error: Dữ liệu provider trống");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    componentWillMount() {
        const limit = this.state.limit;
        const pageNum = this.state.currentPage;
        const product_type_id = this.props.product_type_id;

        this.getProductGuest(limit, pageNum, {}, { product_type: product_type_id });
    }

    nextPage() {
        const { hasNext, limit, nextPageNum } = this.state;
        const product_type_id = this.props.product_type_id;
        if (hasNext) {
            this.getProductGuest(limit, nextPageNum, {}, { product_type: product_type_id });
        }
    }

    prevPage() {
        const { hasPrev, limit, prevPageNum } = this.state;
        const product_type_id = this.props.product_type_id;

        if (hasPrev) {
            this.getProductGuest(limit, prevPageNum, {}, { product_type: product_type_id });
        }
    }
    render() {
        const { products, lastPageNum, currentPage } = this.state;
        const renderProducts = products.map((product, index) => {
            return (
                <div key={index} className="col-md-3">
                    <ProductItem key={index} product={product} />
                </div>
            );
        });
        const pageList = pagination(lastPageNum, currentPage);
        return (
            <Container className="products-list">
                <h3 className="title"><strong> {this.props.productListName}</strong></h3>
                <div className="row">
                    <ul className="pagination">
                        <li className="left" onClick={() => this.prevPage()}><span className="glyphicon glyphicon-chevron-left"></span></li>
                        {
                            pageList.map((pageNum, key) => this.pageItem(pageNum, key))
                        }
                        <li className="right" onClick={() => this.nextPage()}><span className="glyphicon glyphicon-chevron-right"></span></li>
                    </ul>
                </div>
                <div className="row">
                    {renderProducts}
                </div>
            </Container>
        );
    }
}

export default ProductList;