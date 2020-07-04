import React, { Component } from 'react';
import CKEditor from 'react-ckeditor-wrapper';
import styled from 'styled-components';
import axios from 'axios';

import { TitlePanel, WhitePanel } from '../../../theme/Style';
import BackButton from '../../../components/BackButton';
import SelectImage from '../../../components/admin/product/SelectImage';

const GenaralInfo = styled.div`
    .row {
        margin-bottom: 10px;
    }
`;

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productTypes: [],
            productAttributes: [],
            providers: [],
            productInfo: {
                product_name: '',
                product_type_id: 0,
                quantity: 0,
                productTypeAttributes: [],
                price: 0,
                provider: 0,
                description: '',
                images: [],
            },
            error: '',
        }
        this.handleChangeProductTypeSelected = this.handleChangeProductTypeSelected.bind(this);
        this.handleGetCategoryAdded = this.handleGetCategoryAdded.bind(this);
        this.handleChangeInputText = this.handleChangeInputText.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleAddAttributeValue = this.handleAddAttributeValue.bind(this);
        this.handleRemoveAttributeValue = this.handleRemoveAttributeValue.bind(this);
        this.handleAddProvider = this.handleAddProvider.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleSelectImage = this.handleSelectImage.bind(this);
        this.handleRemoveImage = this.handleRemoveImage.bind(this);
        this.handleAddProduct = this.handleAddProduct.bind(this);
    }

    componentDidMount() {
        // get product type
        axios.get(`/api/admin/product_type`).then(response => {
            const { success, error } = response.data;
            if (success) {
                const { productTypes } = response.data;
                const product_type_id = productTypes[0].id;
                this.setState(prevState => {
                    return {
                        productTypes,
                        productInfo: {
                            ...prevState.productInfo,
                            product_type_id,
                            productTypeAttributes: [],
                        }
                    }
                });
                this.handleGetCategoryAdded(product_type_id);
            } else {
                console.log("error: Dữ liệu product type trống");
            }
        }).catch(err => {
            console.log(err);
        });

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
    }

    handleChangeProductTypeSelected(e) {
        const product_type_id = parseInt(e.target.value);
        this.setState(prevState => {
            return {
                productInfo: {
                    ...prevState.productInfo,
                    product_type_id,
                    productTypeAttributes: [],
                }
            }
        });
        this.handleGetCategoryAdded(product_type_id);
    }

    handleChangeNumber(e) {
        const { name, value } = e.target;
        try {
            const numberValue = parseInt(value);
            if (numberValue) {
                this.setState(prevState => {
                    return {
                        productInfo: {
                            ...prevState.productInfo,
                            [name]: numberValue,
                        }
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleGetCategoryAdded(productTypeId) {
        axios.get(`/api/admin/product_type/${productTypeId}/attributes`).then(response => {
            const { success, error } = response.data;
            if (success) {
                const { productTypeAttrs } = response.data;
                this.setState({
                    productAttributes: productTypeAttrs.map(pta => ({
                        id: pta.id,
                        product_type_id: pta.product_type_id,
                        category_attribute_id: pta.category_attribute_id,
                        category_name: pta.category_name,
                    })),
                });
            } else {
                console.log("error: Dữ liệu productAttributes trống");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    handleChangeInputText(e) {
        const { name, value } = e.target;
        this.setState(prevState => {
            return {
                productInfo: {
                    ...prevState.productInfo,
                    [name]: value,
                }
            }
        });
    }

    handleAddAttributeValue() {
        const productAttribute = parseInt(this.productAttribute.value);
        const attributeValue = this.attributeValueInput.value;
        if (productAttribute && attributeValue) {
            this.setState(prevState => {
                const productTypeAttributes = prevState.productInfo.productTypeAttributes;
                productTypeAttributes.unshift({
                    product_attribute_id: productAttribute,
                    name: prevState.productAttributes.find(e => e.id === productAttribute).category_name,
                    value: attributeValue,
                })
                return {
                    productInfo: {
                        ...prevState.productInfo,
                        productTypeAttributes,
                    }
                }
            });
            this.attributeValueInput.value = '';
        }
    }

    handleRemoveAttributeValue(e, id) {
        e.preventDefault();
        this.setState(prevState => {
            return {
                productInfo: {
                    ...prevState.productInfo,
                    productTypeAttributes: prevState.productInfo.productTypeAttributes.filter(e => e.product_attribute_id != id),
                }
            }
        })
    }

    handleAddProvider() {
        const name = this.addProviderInput.value.toUpperCase();
        if (name) {
            axios.post(`/api/admin/provider/add`, { name }).then(response => {
                const { success, error } = response.data;
                if (success) {
                    const { id } = response.data;
                    this.setState(prevState => {
                        const { providers } = prevState;
                        providers.unshift({
                            id,
                            name,
                            logo: '',
                        });
                        return {
                            providers
                        }
                    });
                    this.addProviderInput.value = '';
                    document.getElementById('close-modal').click();
                } else {
                    console.log("error: Them provider that bai");
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    handleChangeDescription(description) {
        this.setState(prevState => {
            return {
                productInfo: {
                    ...prevState.productInfo,
                    description,
                }
            }
        });
    }

    handleRemoveImage(index) {
        this.setState(prevState => {
            const { images } = prevState.productInfo;
            images.splice(index, 1);
            return {
                productInfo: {
                    ...prevState.productInfo,
                    images,
                }
            }
        });
    }

    handleSelectImage(fileSelected) {
        this.setState(prevState => {
            const { images } = prevState.productInfo;
            Object.keys(fileSelected).forEach(key => {
                images.push(fileSelected[key]);
            });
            return {
                productInfo: {
                    ...prevState.productInfo,
                    images,
                }
            }
        });
    }

    handleAddProduct(e) {
        e.preventDefault();
        const { productInfo } = this.state;
        if (!productInfo.product_name || !productInfo.product_type_id || productInfo.quantity < 1 ||
            productInfo.productTypeAttributes.length < 1 || productInfo.price < 1 ||
            !productInfo.provider || !productInfo.description || productInfo.images.length < 1) {
            console.log('null');
            return;
        }
        const formData = new FormData();
        formData.append('product_name', productInfo.product_name);
        formData.append('product_type_id', productInfo.product_type_id);
        formData.append('quantity', productInfo.quantity);
        formData.append('productAttribute', JSON.stringify(productInfo.productTypeAttributes));
        formData.append('price', productInfo.price);
        formData.append('provider', productInfo.provider);
        formData.append('description', productInfo.description);
        productInfo.images.forEach(image => {
            console.log(image);
            formData.append(image.newName, image);
        });
        axios.post(`/api/upload`, formData).then(response => {
            const { success, error } = response.data;
            if (success) {
                this.setState({
                    productInfo: {
                        product_name: '',
                        product_type_id: 0,
                        quantity: 0,
                        productTypeAttributes: [],
                        price: 0,
                        provider: 0,
                        description: '',
                        images: [],
                    }
                })
            } else {
                console.log("error: Them product that bai");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const {
            productTypes,
            productAttributes,
            providers,
            productInfo: {
                product_name,
                quantity,
                price,
                product_type_id,
                description,
                productTypeAttributes,
                images,
                provider,
            },
        } = this.state;

        return (
            <div>
                <BackButton onClick={this.props.history.goBack} />
                <TitlePanel>
                    <h3>Thêm sản phẩm</h3>
                </TitlePanel>
                <WhitePanel className="container-fluid">
                    <div className="row">
                        <GenaralInfo className="col-md-6">
                            <form action="" method="POST" role="form">
                                <legend>General Information</legend>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control" id="name" name="product_name"
                                            value={product_name} onChange={this.handleChangeInputText} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-6">
                                        <label htmlFor="product-type">Product Type</label>
                                        <select name="product_type_id" id="product-type" className="form-control"
                                            value={product_type_id} onChange={this.handleChangeProductTypeSelected}>
                                            {productTypes.map(productType => <option key={productType.id} value={`${productType.id}`}>{productType.name}</option>)}
                                        </select>
                                    </div>

                                    <div className="col-xs-8 col-sm-4">
                                        <label htmlFor="quantity">Quantity</label>
                                        <input type="number" className="form-control" id="quantity" name="quantity" min="0"
                                            value={quantity} onChange={this.handleChangeNumber} />
                                    </div>
                                </div>

                                <div className="row" style={{ position: "relative" }}>
                                    <div className="col-xs-12 col-sm-6">
                                        <label htmlFor="product-type">Product Attributes</label>
                                        <select name="product_attributes" id="product-type" className="form-control"
                                            ref={e => this.productAttribute = e}>
                                            {productAttributes.filter(e => !productTypeAttributes.find(e1 => e1.product_attribute_id === e.id)).map(productAttr => <option key={productAttr.id} value={`${productAttr.id}`}>{productAttr.category_name}</option>)}
                                        </select>
                                    </div>

                                    <div className="col-xs-8 col-sm-4">
                                        <label htmlFor="attribute_value">Value</label>
                                        <input type="text" className="form-control" id="attribute_value" name="attribute_value"
                                            ref={e => this.attributeValueInput = e} />
                                    </div>

                                    <div className="col-xs-4 col-sm-2" style={{ position: "absolute", bottom: "0px", right: "0px" }}>
                                        <button type="button" className="btn btn-success" onClick={this.handleAddAttributeValue}>Add</button>
                                    </div>
                                </div>

                                {productTypeAttributes.length > 0 && <div className="row">
                                    <div className="table-responsive col-xs-12">
                                        <table className="table table-bordered table-hover table-striped">
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Thuộc tính</th>
                                                    <th>Giá trị</th>
                                                    <th>Hoạt động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {productTypeAttributes.map((attr, i) => (
                                                    <tr key={attr.product_attribute_id}>
                                                        <td>{i + 1}</td>
                                                        <td>{attr.name}</td>
                                                        <td>{attr.value}</td>
                                                        <td><button className="btn btn-danger"
                                                            onClick={(e) => this.handleRemoveAttributeValue(e, attr.id)}>Xóa</button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>}

                                <div className="row">
                                    <div className="col-xs-8 col-sm-6">
                                        <label htmlFor="price">Price</label>
                                        <input type="text" className="form-control" id="price" name="price"
                                            value={`${price}`} onChange={this.handleChangeNumber} />
                                    </div>

                                    <div className="col-xs-8 col-sm-4">
                                        <label htmlFor="unit">Unit</label>
                                        <select name="unit" id="unit" className="form-control">
                                            <option value="VND">VND</option>
                                            <option value="$">$</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row" style={{ display: "flex", alignItems: "flex-end" }}>
                                    <div className="col-xs-8 col-sm-4">
                                        <label htmlFor="provider">Provider</label>
                                        <select name="provider" id="provider" className="form-control" value={provider}
                                            onChange={this.handleChangeNumber}>
                                            {providers.map(provider => <option key={provider.id} value={`${provider.id}`}>{provider.name}</option>)}
                                        </select>
                                    </div>

                                    <div className="col-xs-8 col-sm-4">
                                        <button type="button" className="btn btn-success" data-toggle="modal" href='#add-provider'>Add Provider</button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <label>Description</label>
                                        <CKEditor value={description}
                                            onChange={this.handleChangeDescription}
                                            config={{ extraAllowedContent: 'div(*); p(*); strong(*);' }} />
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary" onClick={this.handleAddProduct}>Add</button>
                            </form>
                        </GenaralInfo>

                        <SelectImage images={images} handleSelectImage={this.handleSelectImage}
                            handleRemoveImage={this.handleRemoveImage} />
                    </div>
                </WhitePanel>

                <div className="modal fade" id="add-provider">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 className="modal-title">Thêm mới thương hiệu</h4>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="provider_name">Name</label>
                                <input type="text" className="form-control" ref={e => this.addProviderInput = e} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" id="close-modal" className="btn btn-default" data-dismiss="modal">Đóng</button>
                                <button type="button" className="btn btn-primary" onClick={this.handleAddProvider}>Thêm mới</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddProduct;