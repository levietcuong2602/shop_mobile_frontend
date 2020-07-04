import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import grid from './grid-icon.png';
import list from './list-icon.png';

import ProductItem from './ProductItem';
import pagination from './pagination/pageUtil';
import ProductItemHorizonto from './ProductItemHorizonto';
import HomeSlider from '../HomeSlider';

const Category = styled.div`
    position: relative;
    margin: 15px 0;
    padding: 15px;
    border: 1px solid #e1e1e1;
    overflow: hidden;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    clear: both;
    font: inherit;
    vertical-align: baseline;

    .title {
        font-size: 16px;
        text-transform: uppercase;
        margin-bottom: 0;
        float: left;
        position: relative;
        width: 100%;
        margin-bottom: 15px;
        color: #22f2f;
        font-weight: 300;
        padding-bottom: 5px;
    }

    ul{
        list-style: none outside none;
        margin: 0;
        padding: 0;
        font: inherit;
        vertical-align: baseline;

        li {
            display: list-item;
            margin-bottom: 10px;
    
            a {
                font-size: 13px;
                color: #666666;
                display: block;
                text-decoration: none;
                transition: all 300ms cubic-bezier(0.250, 0.250, 0.750, 0.750);
    
                &:hover{
                    color: #f7544a;
                    outline: 0;
                }
                &:focus{
                    outline: medium none;
                    outline-offset: 0;  
                }
            }
        }
    }

    .price{
        margin-top: 8px;
        input{
            float: left;
            display: block;
            width: 70px;
            height: 30px;
            padding: 0 7px;
            text-align: left;
            color: #404040;
            border: 1px solid #a8a8a8;
            border-radius: 3px;
            outline: 0;
            background-color: #fff;
            -webkit-box-shadow: 0 1px 1px 0 #ececec;
            box-shadow: 0 1px 1px 0 #ececec;
            -webkit-transition: all .3s linear;
            -o-transition: all .3s linear;
            transition: all .3s linear;
            min-width: auto;
            -moz-appearance: textfield;
            line-height: 1.15;
            font-size: 100%;
            margin: 0;
            overflow: visible;
        }

        div{
            float: left;
            width: 10px;
            text-align: center;
            line-height: 30px;
            color: gray;
        }

        button{
            padding-left: 8px;
            padding-right: 8px;
            float: left;
            height: 30px;
            padding: 0 7px;
            padding-right: 7px;
            padding-left: 7px;
            border-radius: 3px;
            outline: 0;
            margin-left: 4px;
            color: #fff;
            background-color: #f57224;
            border-color: #f57224;
            display: inline-block;
            margin-bottom: 0;
            font-weight: 500;
            text-align: center;
            touch-action: manipulation;
            cursor: pointer;
            background-image: none;
            border: 1px solid transparent;
            white-space: nowrap;
            line-height: 1.15;
            font-size: 13px;
            -moz-user-select: none;
            transition: all .3s cubic-bezier(.645,.045,.355,1);
            position: relative;
            text-transform: none;
        }
    }
`;

const Sorter = styled.div`
    float: right;
    font-size: 13px;
    line-height: 40px;
    height: 40px;
    display: flex;

    .list {
        background-image: url(${list});
    }
    
    .grid {
        background-image: url(${grid});
    }

    a {
        float: left;
        width: 25px;
        height: 25px;
        border: 1px solid #cfcfcf;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        background-position: center top;
        background-repeat: no-repeat;
        background-color: #fff;
        font-size: 0;
        margin-right: 10px;
        position: relative;

        &:hover{
            background-position: center bottom;
            background-color: #f7544a;
            border-color: #f7544a;
        }
        
    }
    .active{
        background-position: center bottom;
        background-color: #f7544a;
        border-color: #f7544a;

        &:after, &:before{
            top: 100%;
            left: 50%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
        
        }

        &:after{
            border-color: rgba(247, 84, 74, 0);
            border-top-color: #f7544a;
            border-width: 8px;
            margin-left: -8px;
        }
        &:before{
            border-color: rgba(247, 84, 74, 0);
            border-top-color: #f7544a;
            border-width: 8px;
            margin-left: -8px;
        }
    }

    .view{
        padding-left: 10px;
        padding-right: 10px;
    }

`;

class ProductsView extends Component {
    constructor() {
        super();
        this.state = {
            mode: 'list',
            providers: [],
            attributes: [],
            products: [],
            currentPage: 1,
            limit: 9,
            totalCount: '',
            hasPrev: '',
            hasNext: '',
            prevPageNum: '',
            nextPageNum: '',
            lastPageNum: '',
        }
        this.clickHandle = this.clickHandle.bind(this);
        this.handleClickItemPager = this.handleClickItemPager.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
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
                    totalCount,
                    currentPage: pageNum,
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

    getProviderGuest(product_type_id) {
        axios.get(`/api/guest/provider`, {
            params: {
                product_type_id
            }
        }).then(response => {
            const { success, error } = response.data;

            if (success) {
                const { providers } = response.data;

                this.setState({ providers });
            } else {
                console.log("error: Dữ liệu provider trống");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    getAttributeGuest(product_type_id, category_name) {
        axios.get(`/api/guest/attribute`, {
            params: {
                product_type_id,
                category_name
            }
        }).then(response => {
            const { success, error } = response.data;

            if (success) {
                const { attributes } = response.data;
                this.setState({ attributes });
            } else {
                console.log("error: Dữ liệu provider trống");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        const limit = this.state.limit;
        const pageNum = this.state.currentPage;
        const product_type_id = this.props.product_type_id;
        this.getProductGuest(limit, pageNum, {}, { product_type: this.props.product_type_id });
        this.getProviderGuest(product_type_id);
    }

    componentWillMount() {
        const product_type_id = this.props.product_type_id;
        const category = 'storage';
        this.getAttributeGuest(product_type_id, category);
    }

    nextPage() {
        const { hasNext, limit, nextPageNum } = this.state;
        if (hasNext) {
            this.getProductGuest(limit, nextPageNum, {}, { product_type: this.props.product_type_id });
        }
    }

    prevPage() {
        const { hasPrev, limit, prevPageNum } = this.state;
        if (hasPrev) {
            this.getProductGuest(limit, prevPageNum, {}, { product_type: this.props.product_type_id });
        }
    }

    clickHandle(mode) {
        this.setState({
            mode: mode.trim()
        });
    }

    handleClickItemPager(pageNum) {
        const { limit } = this.state;
        this.getProductGuest(limit, pageNum, {}, { product_type: this.props.product_type_id });
    }

    renderPager(pageNum, key) {
        const current = this.state.currentPage;
        if (typeof pageNum === 'number') {
            return pageNum !== current ? <li key={key} onClick={() => this.handleClickItemPager(pageNum)}><a href="#/">{pageNum}</a></li> : <li onClick={() => this.handleClickItemPager(pageNum)} className="active" key={key}><a href="#">{pageNum}</a></li>
        }
        return <li onClick={() => this.handleClickItemPager(pageNum)} className="disabled" key={key}><a href="#">{pageNum}</a></li>;
    }

    handleSortProducts(sort) {
        const { limit, currentPage } = this.state;
        this.getProductGuest(limit, currentPage, { base_price: sort.target.value }, { product_type: this.props.product_type_id });
    }

    handlerSortProvider(provider) {
        const { limit, currentPage, product_type_id } = this.state;
        this.getProductGuest(limit, currentPage, {}, { provider, product_type: product_type_id });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit() {
        const { limit, currentPage, price_start, price_end, product_type_id } = this.state;
        this.getProductGuest(limit, currentPage, { price_between: [price_start, price_end] }, { product_type: product_type_id })
    }

    handleSortStorage(storage) {
        const { limit, currentPage, product_type_id } = this.state;
        this.getProductGuest(limit, currentPage, {}, { product_type: product_type_id, category_value: storage });
    }
    render() {
        const product_type_id = Number(this.props.product_type_id);

        const { mode } = this.state;
        const { products, totalCount, lastPageNum, currentPage, providers, attributes } = this.state;
        const pageList = pagination(lastPageNum, currentPage);

        console.log('price: ', this.state.price_start, this.state.price_end);

        return (
            <div className="container-fluid">
                <div class="row">
                    <HomeSlider />
                </div>
                <div class="row">
                    <div class="col-sm-3">
                        <div class="category">
                            <div>Relative Catagory</div>
                        </div>

                        <Category className="category leftbar">
                            <h3 className="title">Categories</h3>
                            <ul>
                                {
                                    providers.map((provider, key) => (
                                        <li onClick={() => this.handlerSortProvider(provider.id)} key={key}><a href="#"> {provider.name} </a></li>
                                    ))
                                }
                            </ul>
                        </Category>

                        <Category className="category leftbar">
                            <h3 class="title">Price</h3>
                            <div className="price">
                                <form>
                                    <input onChange={e => this.handleChange(e)} name="price_start" type="number" min={0} placeholder="Min" defaultValue pattern="[0-9]*"
                                        style={{ width: '40%' }} />
                                    <div>-</div>
                                    <input onChange={e => this.handleChange(e)} name="price_end" type="number" min={0} placeholder="Max" defaultValue pattern="[0-9]*"
                                        style={{ width: '40%' }} />
                                    <button onClick={() => this.handleSubmit()} type="button" className="btn btn-primary btn-icon-only">Go</button>
                                </form>
                            </div>
                        </Category>

                        <Category className="category leftbar">
                            <h3 className="title">Storage</h3>
                            <ul>
                                {
                                    attributes.map((attribute, key) => (
                                        <li onClick={() => this.handleSortStorage(attribute.value)} key={key}><a href="#"> {attribute.value} </a></li>
                                    ))
                                }
                            </ul>
                        </Category>
                    </div>

                    <div class="col-sm-9">
                        <div class="row">
                            <Sorter class="sorter">
                                <p>Sort by:</p>
                                <div class="selection">
                                    <select class="selectpicker" onChange={(e) => this.handleSortProducts(e)}>
                                        <option value="asc">Price low to hight</option>
                                        <option value="desc">Price hight to low</option>
                                    </select>
                                </div>

                                <div className="view">View</div>
                                <div>
                                    <a href="#" class={"list " + (mode === "list" ? 'active' : "")} onClick={() => this.clickHandle("list")}>
                                        List
                                    </a>
                                    <a href="#" class={"grid " + (mode === "grid" ? 'active' : "")} onClick={() => this.clickHandle("grid")}>
                                        Grid
                                    </a>
                                </div>
                            </Sorter>
                            <h3 className="title">{product_type_id === 1 ? "Điện thoại di động" : product_type_id === 2 ? "Máy tính" : "Không tìm thấy danh mục sản phẩm"}</h3>
                        </div>
                        <div class="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {
                                totalCount > 0 ? products.map((product, key) => {
                                    if (mode === "list") {
                                        return (
                                            <div class="col-md-4 col-md-6 col-xs-12" key={key}>
                                                <ProductItem key={key} product={product} />
                                            </div>
                                        )
                                    }
                                    if (mode === 'grid') {
                                        return (
                                            <div class="col-xs-12">
                                                <ProductItemHorizonto key={key} product={product} />
                                            </div>
                                        )
                                    }

                                }) : <p>Không tìm thấy sản phẩm nào</p>
                            }
                        </div>

                        <div class="row text-right">
                            <ul class="pagination">
                                <li onClick={() => this.prevPage()}><span class="glyphicon glyphicon-chevron-left"></span></li>
                                {
                                    pageList.map((pageNum, key) => this.renderPager(pageNum, key))
                                }
                                <li onClick={() => this.nextPage()}><span class="glyphicon glyphicon-chevron-right"></span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductsView;