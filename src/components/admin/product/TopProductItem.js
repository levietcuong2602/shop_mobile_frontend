import React, { Component } from 'react';
import styled from 'styled-components';
import { formatNumber } from '../../../helpers/formatNumber';

const Container = styled.div`
    padding: 5px 15px;
    border: 1px solid #e1e1e1;
    border-radius: 10px;
    background: #fff;
    margin: 5px 10px 15px;
    display: flex;
    flex-direction: column;

    img {
        margin-bottom: 15px;
        align-self: center;
        width: 100px;
    }

    .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .price {

    }

    p {
        margin: 0;
    }
`;

class TopProductItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { product } = this.props;
        const image = product.product_images.split(',')[0];
        return (
            <Container className="col-md-2">
                <img src={image.indexOf('upload') === 0 ? `/api/photos/${image}` : image} alt="Product Name" />
                <p className="name">{product.product_name}</p>
                <h4 className="price">{formatNumber(product.base_price)} VNĐ</h4>
                <div>
                    <p>Số lượng còn lại: {product.quantity}</p>
                    <p>Số lượng bán ra: {product.count}</p>
                </div>
            </Container>
        )
    }
}

export default TopProductItem;