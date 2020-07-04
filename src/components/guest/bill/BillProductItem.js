import React, { Component } from 'react';
import styled from 'styled-components';

import { formatNumber } from '../../../helpers/formatNumber';

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;

    img {
        height: 90px;
        width: 90px;
        margin-right: 15px;
    }

    div > h4 {
        margin: 0;
    }

    div > p.price {
        color: #f57224;
        margin-top: 5px;
        font-size: 18px;
    }
`;

class BillProductItem extends Component {
    render() {
        const { product } = this.props;
        const image = product.product_images.split(',')[0];
        return (
            <Container className="col-md-6">
                <img src={image.indexOf('upload') === 0 ? `/api/photos/${image}` : image} alt="hinh san pham" />
                <div>
                    <h4>{product.product_name}</h4>
                    <p className="price">{formatNumber(product.base_price)} VNĐ</p>
                    <p>Số lượng: {product.amount}</p>
                </div>
            </Container>
        );
    }
}

export default BillProductItem;