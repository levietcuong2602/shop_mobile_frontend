import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { TitlePanel, WhitePanel } from '../../../theme/Style';
import ProductATRow from '../../../components/admin/product/ProductATRow';

const TableContainer = styled.div`
    height: 350px;
    overflow-y: scroll;
`;

class ProductAttribute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productTypeSelected: 0,
            productTypeInput: '',
            categoryInput: '',
            productTypes: [],
            productTypeAttrs: [],
            productAttributes: [],
        }
        this.handleChangePoductTypeSelected = this.handleChangePoductTypeSelected.bind(this);
        this.handleGetCategoryAdded = this.handleGetCategoryAdded.bind(this);
        this.handleGetCategoryNotAdded = this.handleGetCategoryNotAdded.bind(this);
        this.handleAddProductType = this.handleAddProductType.bind(this);
        this.handleAddCategory = this.handleAddCategory.bind(this);
        this.handleAddProductTypeAttribute = this.handleAddProductTypeAttribute.bind(this);
        this.handleRemoveProductTypeAttribute = this.handleRemoveProductTypeAttribute.bind(this);
    }

    componentDidMount() {
        // get product type
        axios.get(`/api/admin/product_type`).then(response => {
            const { success, error } = response.data;
            if (success) {
                const { productTypes } = response.data;
                const productTypeSelected = productTypes[0].id;
                this.setState({
                    productTypes,
                    productTypeSelected,
                });
                this.handleGetCategoryAdded(productTypeSelected);
                this.handleGetCategoryNotAdded(productTypeSelected);
            } else {
                console.log("error: Dữ liệu product type trống");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    handleChangePoductTypeSelected(e) {
        const productTypeSelected = parseInt(e.target.value);
        this.setState({ productTypeSelected });
        this.handleGetCategoryAdded(productTypeSelected);
        this.handleGetCategoryNotAdded(productTypeSelected);
    }

    handleGetCategoryAdded(productTypeId) {
        axios.get(`/api/admin/product_type/${productTypeId}/attributes`).then(response => {
            const { success, error } = response.data;
            if (success) {
                const { productTypeAttrs } = response.data;
                this.setState({
                    productTypeAttrs: productTypeAttrs.map(pta => ({
                        id: pta.category_attribute_id,
                        name: pta.category_name,
                    })),
                });
            } else {
                console.log("error: Dữ liệu productAttributes trống");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    handleGetCategoryNotAdded(productTypeId) {
        axios.get(`/api/admin/product_type/${productTypeId}/attibutes_not_added`).then(response => {
            const { success, error } = response.data;
            if (success) {
                const { productAttributes } = response.data;
                this.setState({
                    productAttributes
                });
            } else {
                console.log("error: Dữ liệu productAttributes trống");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    handleAddProductType() {
        const { productTypeInput: name, productTypeSelected } = this.state;
        if (name) {
            const api = `/api/admin/product_type/add`;
            axios.post(api, { name }).then(response => {
                const { success, error, id } = response.data;
                if (success) {
                    this.setState(prevState => {
                        const { productTypeInput, productTypes } = prevState;
                        productTypes.unshift({ id, name: productTypeInput });
                        const newState = productTypeSelected ? {
                            productTypes,
                            productTypeInput: '',
                            productTypeSelected: id,
                        } : {
                                productTypes,
                                productTypeInput: '',
                            };
                        return newState;
                    });
                } else {
                    console.log('them that bai');
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    handleAddCategory() {
        const { categoryInput: name } = this.state;
        if (name) {
            const api = `/api/admin/category/add`;
            axios.post(api, { name }).then(response => {
                const { success, error, id } = response.data;
                if (success) {
                    this.setState(prevState => {
                        const { categoryInput, productAttributes } = prevState;
                        productAttributes.unshift({ id, name: categoryInput })
                        return {
                            productAttributes,
                            categoryInput: '',
                        }
                    });
                } else {
                    console.log('them that bai');
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    handleAddProductTypeAttribute(attr) {
        const { productTypeSelected, productTypeAttrs, productAttributes } = this.state;
        if (productTypeSelected) {
            const api = `/api/admin/product_type_attribute/add`;
            axios.post(api, {
                product_type_id: productTypeSelected,
                category_attribute_id: attr.id,
            }).then(response => {
                const { success, error, id } = response.data;
                if (success && id) {
                    productTypeAttrs.unshift(attr);
                    this.setState({
                        productTypeAttrs,
                        productAttributes: productAttributes.filter(attr1 => attr1.id !== attr.id),
                    });
                } else {
                    console.log('them that bai');
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    handleRemoveProductTypeAttribute(attr) {
        const { productTypeSelected, productTypeAttrs, productAttributes } = this.state;
        const api = `/api/admin/product_type_attribute/delete`;
        axios.post(api, {
            product_type_id: productTypeSelected,
            category_attribute_id: attr.id,
        }).then(response => {
            const { success, error, result } = response.data;
            if (success) {
                productAttributes.unshift(attr);
                this.setState({
                    productTypeAttrs: productTypeAttrs.filter(attr1 => attr1.id != attr.id),
                    productAttributes,
                });
            } else {
                console.log('Xoa that bai');
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const { productTypeInput, categoryInput, productTypes, productTypeAttrs, productAttributes, productTypeSelected } = this.state;

        return (
            <div>
                <TitlePanel>
                    <h3>Thuộc tính sản phẩm</h3>
                </TitlePanel>

                <WhitePanel className="container-fluid">
                    <div className="row col-md-6">
                        <div className="row" style={{ marginBottom: "15px" }}>
                            <div className="col-xs-12 col-sm-6">
                                <label htmlFor="product-type">Loại sản phẩm</label>
                                <select name="product_type_id" id="product-type" className="form-control"
                                    value={productTypeSelected} onChange={this.handleChangePoductTypeSelected}>
                                    {productTypes.map(productType => <option key={productType.id} value={`${productType.id}`}>{productType.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-5 col-sm-6" style={{ marginBottom: "15px" }}>
                                <input type="text" className="form-control" placeholder="Loại sản phẩm"
                                    value={productTypeInput} onChange={(e) => this.setState({ productTypeInput: e.target.value })} />
                            </div>

                            <div className="col-xs-6 col-sm-6" style={{ marginBottom: "15px" }}>
                                <button type="button" className="btn btn-success" onClick={this.handleAddProductType}>Thêm mới</button>
                            </div>
                        </div>


                        <div className="row" style={{ display: "flex", alignItems: "flex-end", marginBottom: "30px" }}>
                            <div className="col-xs-12 col-sm-6">
                                <label htmlFor="product-type">Thuộc tính</label>
                                <input type="text" className="form-control" placeholder="Thuộc tính sản phẩm"
                                    value={categoryInput} onChange={(e) => this.setState({ categoryInput: e.target.value })} />
                            </div>
                            <div className="col-sm-6">
                                <button type="button" className="btn btn-success" onClick={this.handleAddCategory}>Thêm mới</button>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-xs-12">
                                <label htmlFor="product-type">Danh mục thuộc tính</label>
                                <TableContainer className="table-responsive">
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên thuộc tính</th>
                                                <th>Hoạt động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productAttributes.map((attr, i) => <ProductATRow key={i} pos={i + 1}
                                                action={1} object={attr} onClick={() => this.handleAddProductTypeAttribute(attr)} />)}
                                        </tbody>
                                    </table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>

                    <div className="row col-md-6 col-md-push-1">
                        <label htmlFor="product-type">Thuộc tính sản phẩm</label>
                        <TableContainer className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên thuộc tính</th>
                                        <th>Hoạt động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productTypeAttrs.map((attr, i) => <ProductATRow key={i} pos={i + 1}
                                        action={2} object={attr} onClick={() => this.handleRemoveProductTypeAttribute(attr)} />)}
                                </tbody>
                            </table>
                        </TableContainer>
                    </div>
                </WhitePanel>
            </div>
        );
    }
}

export default ProductAttribute;