import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    list-style: none;
    overflow: hidden;
    background: #183544;
    top: auto !important;
   .lzd-menu-labels-item {
        margin-left: 10px;
        padding-right: 10px;
        display: inline-block;
        cursor: pointer;
        height: 40px;
        text-decoration: none;
    }

    .a{
        background-color: transparent;
    }
}
`;
class BottomHeader extends Component {
    render() {
        return (
            <Container className="bottom-header" data-spm="menu">
                <a className="lzd-menu-labels-item" href="/home/productlist/1">
                    <i className="lzd-site-nav-menu-iconfont lzd-menu-labels-item-icon">
                    </i>
                    <span className="lzd-menu-labels-item-text">Điện thoại</span>
                </a>
                <a className="lzd-menu-labels-item" href="/home/productlist/2">
                    <i className="lzd-site-nav-menu-iconfont lzd-menu-labels-item-icon"></i>
                    <span className="lzd-menu-labels-item-text">Máy tính</span>
                </a>
            </Container>
        );
    }
}

export default BottomHeader;