
import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
.products_small{
    width: 100%
    border: 1px solid #e1e1e1;
    position: relative;
    overflow: hidden;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #fff;
    margin-bottom: 15px;
    padding: 5px 15px;

    &:hover {
        background: #fff;
        border-color: #f7544a;
        -webkit-box-shadow: 0 0 5px 1px #d3d3d3;
        box-shadow: 0 0 5px 1px #d3d3d3;
    }
}
.thumbnail {
    width: 100%;
    border: none;
    margin-bottom: 0px;
}
.thumbnail img{
    height: 130px;

}
.productname{
    font-size: 12px;
    color: #333333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.price {
    color: #ff1e2c;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
}
.button_group {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    .button {
        border-radius: 10px;
        transition: all 300ms cubic-bezier(0.250, 0.250, 0.750, 0.750);
        border: 1px solid #cccccc;
        background: #ffffff;
        &:hover {
            background: #f7544a;
            color: #fff;
            border: 1px solid #fe5252;
            .fa {
                color: #fff;
            }
        }
        .fa {
            color: #f7544a;
        }
    }

    .add-cart {
        padding: 2px 10px;
        font-size: 14px;
        width: 60%
    }

    .wishlist {
        padding: 2px 10px;
        font-size: 14px;
    }
}
}

`;

class ProductItemSmall extends Component {
    render() {
        const { productsuggest, addProductFavorites, index } = this.props;
        const image = productsuggest.images.split(',')[0];

        return (
            <Container>
                <div className="products_small text-center">
                    <div className="thumbnail">
                        <NavLink to="/product/detail/1"><img src={image.indexOf('upload') === 0 ? `/api/photos/${image}` : image} alt="ảnh" /></NavLink>
                        <div className="productname">{productsuggest.name}</div>
                        <h4 className="price">{productsuggest.price}</h4>
                    </div>
                    <div className="button_group">
                        <button className="button add-cart" type="button">Add To Cart</button>
                        <button className="button wishlist" type="button" onClick={() => addProductFavorites(index)}><i className="fa fa-heart-o"></i></button>
                    </div>
                </div>
            </Container>
        );
    }
}
export default ProductItemSmall;