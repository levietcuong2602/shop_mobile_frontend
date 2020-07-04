import React, { Component } from 'react';
import BrandList from '../../components/guest/brand/BrandList';
import BreadCrumb from '../../components/guest/BreadCrumb';
import ProductsView from '../../components/guest/product/ProductsView';
import BottomHeader from '../../components/guest/BottomHeader';

import axios from 'axios';

class ProductDetailList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_type_id: '',
            products: [],
        }
    }
    componentWillMount() {
        const product_type_id = this.props.match.params.product_type_id;
        this.setState({
            product_type_id,
        });
    }

    render() {
        const { products, product_type_id } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <BottomHeader />
                </div>

                <BreadCrumb />
                <ProductsView product_type_id={product_type_id} />
                <BrandList />
            </div>
        );
    }
}

export default ProductDetailList;