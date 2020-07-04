import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 1188px;
    height: 48px;
    border-bottom: 1px solid #EFF0F5;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    
    .breadcrumb{
        padding-left: 0;
        margin-left: 0px;
        height: 48px;
        vertical-align: middle; 
        display: inline-block;
        white-space: nowrap;

        .breadcrumb_item {
            position: relative;
            display: table-cell;
            vertical-align: middle;
            font-size: 13px;
            font-weight: 300;
            height: 48px;

            .breadcrumb_item_text {
                vertical-align: middle;
                padding: 0;
                margin: 0;
                line-height: 100%;
                display: inline-block;
                font-weight: 300;
                box-sizing: border-box;

                .breadcrumb_item_anchor {
                    display: inline-block;
                    vertical-align: middle;
                    color: #1a9cb7;
                    padding: 0 4px;
                    font-size: 14px;
                    font-family: Roboto-Regular,Helvetica,Arial,sans-serif;
                    max-width: 200px;
                    white-space: nowrap;
                    line-height: 16px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                
                }
                a{
                    background-color: transparent;
                }
            }
        }
    }
`;

class BreadCrumb extends Component {
    render() {
        return (
            <Container>
                <ul className="breadcrumb" id="J_breadcrumb">
                    <li className="breadcrumb_item">
                        <span className="breadcrumb_item_text">
                            <a title="Home" href="/" className="breadcrumb_item_anchor">
                                <span>Home</span>
                            </a>
                            <div className="breadcrumb_right_arrow" />
                        </span>
                    </li>
                    <li className="breadcrumb_item">
                        <span className="breadcrumb_item_text">
                            <span className="breadcrumb_item_anchor breadcrumb_item_anchor_last">Mobiles</span>
                        </span>
                    </li>
                </ul>
            </Container>
        );
    }
}

export default BreadCrumb;