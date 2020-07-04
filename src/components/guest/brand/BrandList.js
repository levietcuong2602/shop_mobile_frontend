import React, { Component } from 'react';
import styled from 'styled-components';
import BrandItem from './BrandItem';

const Container = styled.div`
    float: left;
    width: 100%;
    position: relative;
    padding: 15px 0 0 0;
    padding-top: 30px;
    
    #brandLogo {
        margin: 0;
        padding: 0;
        display: block;
        float: left;
        width: 100%;

        li {
            float: left;
            width: 100%;
            padding: 0;
            margin: 0;
            display: inline;
            text-align: center;
            margin-bottom: 10px;

            .brand_item {
                li {
                    margin-right: 3%;
                    margin-bottom: 3%;
                    width: 47%;
                    float: none;
                    display: inline-block;
                    text-align: center;
                    display: inline-block;
                    *display: inline;
                    margin-right: 2%;
                    width: 18.4%;
                    display: flex;
                }
    
                .brand-logo{
                    float: left;
                    border: 1px solid #dcdcdc;
                    -webkit-border-radius: 10px;
                    border-radius: 10px;
                    width: 100%;
                    padding: 10px;
                    text-align: center;
                    margin: 0;
                    padding: 0;
                    display: block;
                    float: left;
                    width: 100%;
    
                    img{
                        max-width: 100%;
                        height: auto;
                    }
                }
            }
        }

    }
    
    .brand_item {
        width: 100%;
        margin-bottom: 10px;
        display: flex;
    }
    
    .brand-logo {
        float: left;
        border: 1px solid #dcdcdc;
        -webkit-border-radius: 10px;
        border-radius: 10px;
        width: 100%;
        padding: 10px;
        text-align: center;
    }
    
    ul {
        list-style: none;
    }
`;
class BrandList extends Component {
    render() {
        const images = [
            "https://vn-live-03.slatic.net/original/65fa75cabea090540e56620e95f73146.jpg",
            "https://vn-live-03.slatic.net/original/9593a960fd8c7805479ff31fa0fcc137.jpg",
            "https://vn-live-03.slatic.net/original/e4b0daccf569b22374baa62c1b3abe20.jpg",
            "https://vn-live-03.slatic.net/original/60c41a048a95b384c0161a4f0a3d23cf.jpg",
            "https://vn-live-02.slatic.net/original/349fda9f47121ca7555d7fb7d18f16c4.jpg",
            "https://vn-live-03.slatic.net/original/ae57fd39b2931db0ba35fbc84689e708.jpg",
        ];
        return (
            <Container className="our-brand">
                <h3 className="title"><strong>Brand</strong></h3>
                <ul id="brandLogo">
                    <li>
                        <ul className="brand_item">
                            {images.map((image, key)=> <BrandItem key={key} imageURL={image}/>)}
                        </ul>
                    </li>

                </ul>
            </Container>
        );
    }
}

export default BrandList;