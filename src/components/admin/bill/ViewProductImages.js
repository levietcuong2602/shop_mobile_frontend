import React, { Component } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;

    > div {
        width: 400px;
        margin: auto;
        position: relative;
        > button {
            position: absolute;
            top: 0;
            right: 0;
            color: #ffffff;
            background-color: rgba(0, 0, 0, 0.4);
            border: none;
            font-size: 24px;
            z-index: 1001;
        }
    }

    .slick-prev:before, .slick-next:before {
        font-size: 24px;
    }
`;

class ViewProductImages extends Component {
    constructor(props) {
        super(props);
        this.handleHideViewImages = this.handleHideViewImages.bind(this);
    }

    handleHideViewImages() {
        this.props.handleHideViewImages();
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <Container>
                <div>
                    <button onClick={this.handleHideViewImages}><i class="fa fa-times" aria-hidden="true"></i></button>
                    <Slider {...settings}>
                        <div>
                            <img src="https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg" />
                        </div>
                        <div>
                            <img src="https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg" />
                        </div>
                        <div>
                            <img src="https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg" />
                        </div>
                        <div>
                            <img src="https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract04.jpg" />
                        </div>
                    </Slider>
                </div>
            </Container>
        )
    }
}

export default ViewProductImages;