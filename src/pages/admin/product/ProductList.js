import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../../../actions/admin_product_actions';

import { TitlePanel, WhitePanel, Label } from '../../../theme/Style';
import ProductRow from '../../../components/admin/product/ProductRow';
import Pagination from '../../../components/pagination/Pagination';

const SearchForm = styled.form`
    max-width: 300px;
    display: flex;

    input {
        padding: 0 8px 0 8px;
        border-radius: 1px;
    }

    button {
        border-radius: 1px;
    }
`;

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            providers: [{ id: 1, name: "Sam sung" }, { id: 2, name: "Oppo" }],
            productTypes: [{ id: 1, name: "Điện thoại" }, { id: 2, name: "Máy tính" }],
            productEditId: 0,
        }
        this.handleChangeProductNum = this.handleChangeProductNum.bind(this);
        this.handleChangeFilter = this.handleChangeFilter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getPrevPage = this.getPrevPage.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
        this.handleEditProduct = this.handleEditProduct.bind(this);
        this.handleUpdateProduct = this.handleUpdateProduct.bind(this);
    }

    componentDidMount() {
        // get provider
        axios.get(`/api/admin/provider`).then(response => {
            const { success, error } = response.data;
            if (success) {
                const { providers } = response.data;
                this.setState({
                    providers
                });
            } else {
                console.log("error: Dữ liệu provider trống");
            }
        }).catch(err => {
            console.log(err);
        });

        // get product type
        axios.get(`/api/admin/product_type`).then(response => {
            const { success, error } = response.data;
            if (success) {
                const { productTypes } = response.data;
                this.setState({
                    productTypes
                })
            } else {
                console.log("error: Dữ liệu product type trống");
            }
        }).catch(err => {
            console.log(err);
        });

        const { pager: { limit, currentPageNum }, searchValue, filter } = this.props.productList;
        this.props.getProductsAdminByPage(limit, currentPageNum, searchValue, filter);
    }

    handleChangeFilter(e) {
        const { searchValue, filter, pager: { limit } } = this.props.productList;
        filter[e.target.name] = parseInt(e.target.value);
        this.props.getProductsAdminByPage(limit, 1, searchValue, filter);
    }

    handleChangeProductNum(e) {
        const limit = parseInt(e.target.value);
        const { searchValue, filter } = this.props.productList;
        this.props.getProductsAdminByPage(limit, 1, searchValue, filter);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { filter, pager: { limit } } = this.props.productList;
        this.props.getProductsAdminByPage(limit, 1, this.state.searchValue, filter);
    }

    getPrevPage() {
        const { pager: { limit, prevPageNum }, searchValue, filter } = this.props.productList;
        this.props.getProductsAdminByPage(limit, prevPageNum, searchValue, filter);
    }

    getNextPage() {
        const { pager: { limit, nextPageNum }, searchValue, filter } = this.props.productList;
        this.props.getProductsAdminByPage(limit, nextPageNum, searchValue, filter);
    }

    handleEditProduct(product) {
        this.setState({ productEditId: product.id });
        this.peQuantity.value = product.quantity;
        this.peBasePrice.value = product.base_price;
    }

    handleUpdateProduct() {
        const { productEditId } = this.state;
        const base_price = parseInt(this.peBasePrice.value);
        const quantity = parseInt(this.peQuantity.value);

        if (productEditId && base_price && quantity) {
            axios.post(`/api/admin/product/update`, {
                id: productEditId,
                base_price,
                quantity,
            }).then(response => {
                console.log(response.data);
                if (response.data.success) {
                    const { pager: { limit, currentPageNum }, searchValue, filter } = this.props.productList;
                    this.props.getProductsAdminByPage(limit, currentPageNum, searchValue, filter);
                    document.getElementById('close-model').click();
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }

    render() {
        const { searchValue, providers, productTypes, productEditId } = this.state;
        const { products, pager, filter, error } = this.props.productList;

        return (
            <div>
                <TitlePanel>
                    <h3>Danh sách sản phẩm</h3>
                </TitlePanel>

                <WhitePanel>
                    <div className="row">
                        <div className="col-md-12">
                            <NavLink to="/admin/product/add" className="btn btn-success pull-right">Thêm mới</NavLink>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="row">
                                <div className="col-xs-12 col-sm-8">
                                    <Label htmlFor="product-type">Loại sản phẩm</Label>
                                    <select name="product_type" id="product-type" className="form-control"
                                        value={filter.product_type} onChange={this.handleChangeFilter}>
                                        <option value="0">Tất cả</option>
                                        {productTypes.map(productType => <option key={productType.id} value={`${productType.id}`}>{productType.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xs-12 col-sm-8">
                                    <Label htmlFor="product-type">Thương hiệu</Label>
                                    <select name="provider" id="product-type" className="form-control"
                                        value={filter.provider} onChange={this.handleChangeFilter}>
                                        <option value="0">Tất cả</option>
                                        {providers.map(provider => <option key={provider.id} value={`${provider.id}`}>{provider.name}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="row">
                                <div className="col-xs-12 col-sm-8">
                                    <Label htmlFor="product-type">Hiển thị</Label>
                                    <select name="product_num" id="product-type" className="form-control"
                                        value={pager.limit} onChange={this.handleChangeProductNum}>
                                        <option value="10">10 hàng</option>
                                        <option value="15">15 hàng</option>
                                        <option value="20">20 hàng</option>
                                        <option value="35">35 hàng</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row" style={{ height: '100%', marginTop: 15 }}>
                                <div className="col-xs-12 col-sm-8">
                                    <SearchForm onSubmit={event => this.handleSubmit(event)}>
                                        <input type="text" className="form-control" placeholder="Tìm kiếm sản phẩm"
                                            value={searchValue} onChange={(e) => this.setState({ searchValue: e.target.value })} />
                                        <button type="submit" className="btn btn-primary"><i className="fa fa-search"></i></button>
                                    </SearchForm>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* table products */}
                    <div className="table-responsive" style={{ marginTop: 35 }}>
                        <table className="table table-bordered table-hover table-striped">
                            <colgroup>
                                <col style={{ width: '3%' }} />
                                <col style={{ width: '6%' }} />
                                <col style={{ width: '35%' }} />
                                <col style={{ width: '8%' }} />
                                <col style={{ width: '6%' }} />
                                <col style={{ width: '8%' }} />
                                <col style={{ width: '10%' }} />
                                <col style={{ width: '8%' }} />
                                <col style={{ width: '15%' }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã SP</th>
                                    <th>Tên SP</th>
                                    <th>Đơn giá</th>
                                    <th>Đơn vị</th>
                                    <th>Loại SP</th>
                                    <th>Thương hiệu</th>
                                    <th>Số lượng</th>
                                    <th>Hoạt động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => <ProductRow key={product.id} pos={pager.offset + index + 1}
                                    productInfo={product} handleEditProduct={this.handleEditProduct} />)}
                            </tbody>
                        </table>
                    </div>

                    <Pagination currentPage={pager.currentPageNum} total={pager.totalCount} noPerPage={pager.limit}
                        getPrevPage={this.getPrevPage} getNextPage={this.getNextPage} />
                </WhitePanel>

                <div className="modal fade" id="edit-product">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 className="modal-title">Cập nhật</h4>
                            </div>
                            <div className="modal-body">

                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="quantity">Số lượng</label>
                                        <input type="number" className="form-control" id="quantity" name="quantity"
                                            defaultValue="0" min="0" ref={e => this.peQuantity = e} />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="price">Price</label>
                                        <input type="text" className="form-control" id="price" name="base_price"
                                            defaultValue="0" ref={e => this.peBasePrice = e} />
                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" id="close-model" data-dismiss="modal">Đóng</button>
                                <button type="button" className="btn btn-primary" onClick={this.handleUpdateProduct}>Cập nhật</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        productList: state.admin.product.productList
    }
}

export default connect(mapStateToProps, actions)(ProductList);