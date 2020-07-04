import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Rating from 'react-rating';
import {formatNumber} from '../../../helpers/formatNumber';

const DivOverview = styled.div`
    h1 {
        font-size: 24px;
        margin-top: 0px;
    }

    h6, p {
        font-size: 13px;
    }

    .fa.fa-star, .fa.fa-star-o {
        color: #FFD500;
        margin-right: 2px;
    }

    .link-rating {
        margin-left: 10px;
    }

    .price {
        color: #ff3425;
        font-size: 19px;
    }

    #count-product {
        width: max-content;
    }

    #count-product::-webkit-inner-spin-button {
        cursor: pointer;
    }

    .action {
        margin: 15px 0px;
        display: flex;
        flex-direction: row;
        color: #ffffff;
        
        #add-to-cart {
            padding: 8px 16px;
            background: #f57224;
            border: 1px solid #f57224;
        }

        #buy-now {
            padding: 8px 16px;
            margin-left: 10px;
            background: #1ab394;
            border: 1px solid #1ab394;
        }

        .hover-opacity:hover{
            opacity: 0.9;
        }
    }
`

class ProductOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countProduct: 1
        }
        this.handleChangeCountProduct = this.handleChangeCountProduct.bind(this);
    }

    handleChangeCountProduct(e) {
        this.setState({ countProduct: e.target.value });
    }

    render() {
        const { product } = this.props;
        const { countProduct } = this.state;

        console.log('product: ', product);
        
        return (
            <DivOverview>
                <h1>{product.product_name}</h1>
                <Rating emptySymbol="fa fa-star-o fa-lg" fullSymbol="fa fa-star fa-lg"
                    fractions={5} initialRating={product.rating} readonly />
                <NavLink to='/product/id/all-rating' className="link-rating">(xem 131 đánh giá)</NavLink>
                <h6>Thương hiệu: <NavLink to='/provider/samsung'>Samsung</NavLink></h6>
                <hr />
                <p className="price">{formatNumber(product.base_price)} {product.unit}</p>
                <hr />
                <div>{product.description}</div>
                <hr />
                <p>Số lượng:</p>
                <input type="number" id="count-product" className="form-control" min="1" max="5" value={countProduct}
                    onChange={this.handleChangeCountProduct} onKeyDown={e => e.preventDefault()} />
                <div className="action">
                    <button id="add-to-cart" className="hover-opacity">Add to Cart</button>
                    <button id="buy-now" className="hover-opacity">Buy Now</button>
                </div>
            </DivOverview>
        );
    }
}

export default ProductOverview;