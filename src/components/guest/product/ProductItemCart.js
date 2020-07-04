import React, { Component } from 'react';
import styled from 'styled-components';

import { formatNumber } from '../../../helpers/formatNumber';

const Container = styled.div`
#product_item_cart{
    box-shadow: 0px 0px 2px 2px #E6E6E6;
    margin-right: 15px;
    display: flex;
    justify-content: space-between;
}
#product_item_cart .product_cart img{
    width: 90px;
    height: 105px;
    margin: 0px 5px;
}
#product_item_cart .product_cart{
    height: 100%;
    display: flex;
    align-items: center;
}
#product_item_cart .product_cart .checkbox_image{
    display: flex;
    align-items: center;
}
#product_item_cart .product_cart .checkbox_image input{
    margin-left: 15px;
    width: 18px;
    height: 18px;
}
#product_item_cart .product_cart .info_product_cart{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 80%;
    padding: 5px 15px;

    .price{
        color: #f57224;
        font-size: 18px;
    }
}
#product_item_cart .product_cart .info_product_cart .product_name{
    font-size: 15px;
    font-weight: bold;
}
#product_item_cart .price_count_cart{
    align-self: center;
    padding: 5px;
}

#product_item_cart .price_count_cart .button_itemcart{
    width: 40%;
    display: flex;
    align-items: center;
    text-align: center;
}
#product_item_cart .price_count_cart .button_itemcart button{
    font-size: 18px;
}
#product_item_cart .price_count_cart .button_itemcart span{
    font-size: 18px;
    margin: 0px 5px;
}
#product_item_cart .product_cart .info_product_cart .icon_heart i{
    color: gray;
    font-size: 25px;
    opacity: 0.7;
    margin-right: 10px;
}
#product_item_cart .product_cart .info_product_cart .icon_trash i{
    color: gray;
    font-size: 25px;
    opacity: 0.7;
}
`;

class ProductItemCart extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { products, addProductFavorites, deleteProductCart, changeAmountProductCartSub, changeAmountProductCartPlus, totalPrice } = this.props;
        return (
            <Container>
                {
                    products.map((e, index) => {
                        return (
                            <div id="product_item_cart" key={index}>
                                <div className="product_cart">
                                    <div className="checkbox_image">
                                        <input type="checkbox" aria-checked="true" value="on" onChange={() => totalPrice(index)} />
                                        <img src={e.images} alt="ảnh" />
                                    </div>
                                    <div className="info_product_cart">
                                        <span className="product_name">{e.name}</span>
                                        <span className="producer">{e.description}</span>
                                        <span className="price">{formatNumber(e.price)} VNĐ</span>
                                        <div>
                                            <span className="icon_heart" onClick={() => addProductFavorites(e.id)}>
                                                <a href="#">
                                                    <i className="fa fa-heart-o"></i>
                                                </a>
                                            </span>
                                            <span className="icon_trash" onClick={() => deleteProductCart(index)}>
                                                <a href="#">
                                                    <i className="fa fa-trash"></i>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="price_count_cart">
                                    <div className="button_itemcart">
                                        <button type="button" className="btn btn-large btn-block btn-default" onClick={() => changeAmountProductCartSub(index)}>-</button>
                                        <span>{e.amount}</span>
                                        <button type="button" className="btn btn-large btn-block btn-default" onClick={() => changeAmountProductCartPlus(index)}>+</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </Container>
        )
    }
}

export default ProductItemCart;
