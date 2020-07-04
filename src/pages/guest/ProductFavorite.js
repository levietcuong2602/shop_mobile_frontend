import React, { Component } from 'react';
import ProductItemSmall from '../../components/guest/product/ProductItemSmall';
import ProductItemFavorite from '../../components/guest/product/ProductItemFavorite';
import axios from 'axios';
import { connect } from 'react-redux';

class ProductFavorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productsuggest: [],
        }
    }

    componentWillMount() {
        axios.get(`/api/user/favorite`, {
            params: {
                user_id: this.props.user_id,
            }
        }).then(response => {
            const { success, error } = response.data;
            if (success) {
                const { products } = response.data;
                this.setState({
                    products
                });
            } else {
                console.log("error: Dữ liệu favorite trống");
            }
        }).catch(err => {
            console.log(err);
        });
        //get productsuggest
        axios.get(`/api/user/favorite/suggest`).then(response => {
            const { success, error } = response.data;
            if (success) {
                const { productsuggest } = response.data;
                this.setState({
                    productsuggest
                })
            } else {
                console.log("error: Dữ liệu products đề cử trống");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    deleteProductFavorites = (index) => {
        const { products } = this.state;

        axios.post(`/api/user/favorite/delete`, {
            user_id: this.props.user_id,
            product_id: products[index].id,
        }).then(response => {
            const { success, error } = response.data;
            if (success) {
                products.splice(index, 1);
                this.setState({ products });
                console.log('success');
            } else {
                console.log("error: Xoa san pham yeu thich that bai");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    addProductFavorites = (index) => {
        const { productsuggest } = this.state;
        axios.post(`/api/user/favorite/add`, {
            user_id: 2,
            product_id: productsuggest[index].id,
        }).then(response => {
            const { success, error } = response.data;
            if (success) {
                alert('Đã thêm sản phẩm vào danh sách yêu thích');
                productsuggest.splice(index, 1);
                this.setState({ productsuggest });
            } else {
                console.log("error: Xảy ra lỗi thêm dữ liệu vào cơ sở dữ liệu");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const { products, productsuggest } = this.state;
        const count = products.length;
        return (
            <div id="favorites">
                <div className="container list_favorites">
                    <h2>Danh sách yêu thích</h2>
                    <hr />
                    <h4>Sản phẩm yêu thích</h4>
                    {
                        count === 0 && <div className="row text-center">
                            <span className="glyphicon glyphicon-heart-empty"></span>
                            <p>Chưa có danh mục yêu thích</p>
                            <p>Thêm sản phẩm vào danh sách yêu thích để hiển thị ở đây.</p>
                        </div>
                    }
                    {
                        count !== 0 && <ProductItemFavorite products={products} deleteProductFavorites={this.deleteProductFavorites} />
                    }
                    <div className="add_all">
                        <a href="#">Thêm tất cả vào giỏ hàng</a>
                    </div>
                    <div className="row text-center">
                        <a href="/" className="btn btn-default btn-buying">Tiếp tục mua sắm</a>
                    </div>
                </div>
                <div className="container offer_products">
                    <h4>Sản phẩm đề cử</h4>
                    <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {
                            productsuggest.map((e, index) => {
                                return (
                                    <div className="col-xs-6 col-sm-4 col-md-2">
                                        <ProductItemSmall key={index} productsuggest={e} addProductFavorites={this.addProductFavorites} index={index} />
                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user_id: state.auth.user.id
    }
}

export default connect(mapStateToProps)(ProductFavorite);