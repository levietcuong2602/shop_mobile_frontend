import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';

import * as actions from '../../../actions/admin_product_actions';

class ProductRow extends Component {
    deleteProduct(id) {
        console.log('id: ', id);
        const { pager: { currentPageNum, totalCount, limit, offset, prevPageNum }, searchValue, filter } = this.props.productList;
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.post(`/api/admin/product/delete`, { id }).then(response => {
                            const { success, error } = response.data;
                            console.log('response.data', response.data);
                            if (success) {
                                if (currentPageNum > 1 && offset + 1 === totalCount) {
                                    this.props.getProductsAdminByPage(limit, prevPageNum, searchValue, filter);
                                } else {
                                    this.props.getProductsAdminByPage(limit, currentPageNum, searchValue, filter);
                                }
                            }
                        }).catch(err => {
                            this.props.returnError(err);
                        })
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    render() {
        const { pos, productInfo, handleEditProduct } = this.props;
        return (
            <tr>
                <td>{pos + ""}</td>
                <td>{productInfo.id + ""}</td>
                <td>{productInfo.product_name}</td>
                <td>{productInfo.base_price + ""}</td>
                <td>{productInfo.unit + ""}</td>
                <td>{productInfo.product_type_name}</td>
                <td>{productInfo.provider_name}</td>
                <td>{productInfo.quantity + ""}</td>
                <td>
                    <a className="btn btn-success" data-toggle="modal" href='#edit-product'
                        onClick={() => handleEditProduct(productInfo)}>Chi tiết</a>
                    <button className="btn btn-danger" onClick={() => this.deleteProduct(productInfo.id)}>Xóa</button>
                </td>
            </tr>
        );
    }
}


function mapStateToProps(state) {
    return {
        productList: state.admin.product.productList
    }
}

export default connect(mapStateToProps, actions)(ProductRow);