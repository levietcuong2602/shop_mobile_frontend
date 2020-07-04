import React, { Component } from 'react';
import ProductItem from '../../components/guest/product/ProductItem';
import BottomHeader from '../../components/guest/BottomHeader';
import ProductList from '../../components/guest/product/ProductList';
import HomeSlider from '../../components/guest/HomeSlider';
import BrandList from '../../components/guest/brand/BrandList';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <BottomHeader />
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <HomeSlider />
                    </div>
                    <div className="col-md-4">
                        <a href="/">
                            <img src="https://cdn.tgdd.vn/qcao/21_11_2018_14_21_19_Galaxy-A7-390-80.png" alt="/" />
                        </a>
                        <a href="/">
                            <img src="https://cdn.tgdd.vn/qcao/28_11_2018_15_34_35_Tra-Gop-Homecredit-390-80.png" alt="/" />
                        </a>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <ProductList key={1} product_type_id={1} productListName="Điện thoại di động" />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ProductList key={2} product_type_id={2} productListName="Máy tính Laptop" />
                    </div>
                </div>
                <BrandList />
            </div>
        )
    }
}

export default HomePage;