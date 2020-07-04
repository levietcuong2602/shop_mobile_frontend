
import React, { Component } from 'react';
import styled from 'styled-components';

import { formatNumber } from '../../../helpers/formatNumber';

const Container = styled.div`
.products_item_favorite{
    display:flex;
    justify-content: space-around;
    box-shadow: 0px 0px 1px 1px #F1F1F1;
    margin-bottom: 15px;
    padding-top: 10px;
    height: auto;
}
.products_item_favorite .info_item_favorite{
    display:flex;
    max-width: 70%;
}
.products_item_favorite .info_item_favorite_image{
    width: 105px;
    height: 100px;
}
.products_item_favorite .info_item_favorite_image img{
    width: 105px;
    height: 100px;
}

.products_item_favorite .info_item_favorite_describe{
    margin-left: 20px;
    max-width: 800px;
}

.products_item_favorite .info_item_favorite_describe .fa-trash{
    font-size: 24px;
}

.products_item_favorite .info_item_favorite_describe .name{
    font-size: 16px;
    margin-bottom: 5px;
}
.products_item_favorite .info_item_favorite_describe .describe{
    font-size: 14px;
    color: gray;
    margin-bottom: 5px;
}
.products_item_favorite .price_item_favorite{
    font-size: 20px;
    color: orange;
}

.products_item_favorite .button_add{
    display: flex;
    align-items: center;
}

.products_item_favorite .add{
    height: 50%;
}
.info_item_favorite_describe .fa-trash.pf-delete{
    color: gray;
    opacity: 0.7;
    cursor: pointer;
}
`;

class ProductItemFavorite extends Component {
    render() {
        return (
            <Container>
                {this.props.products.map((e, index) => {
                    return (
                        <div key={index} id={index} className="products_item_favorite">
                            <div className="info_item_favorite">
                                <div class="info_item_favorite_image">
                                    <a href="/product/detail/1"><img src={e.images} alt="ảnh" /></a>
                                </div>
                                <div class="info_item_favorite_describe">
                                    <a href="/product/detail/1"><p class="name">{e.name}</p></a>
                                    <p class="describe">{e.description}</p>
                                    <i class="fa fa-trash pf-delete" onClick={() => this.props.deleteProductFavorites(index)}></i>
                                </div>
                            </div>
                            <p className="price_item_favorite">{formatNumber(e.price)} VNĐ</p>
                            <div className="button_add">
                                <img src="//laz-img-cdn.alicdn.com/tfs/TB1iUYumfDH8KJjy1XcXXcpdXXa-144-64.png" width="72" height="32" />
                            </div>
                        </div>
                    )
                })}
            </Container>
        );
    }
}
export default ProductItemFavorite;