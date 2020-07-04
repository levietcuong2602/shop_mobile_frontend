import React, { Component } from 'react';
import styled from 'styled-components';

const Figure = styled.figure`
    background-repeat: no-repeat;
    display: block;
    max-height: 330px;
    max-width: 330px;
    border: 1px solid #ececec;
    &:hover {
        cursor: crosshair;
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
        pointer-events: none;
        transition: ease-out .2s;
    }
    
    &:hover img {
        opacity: 0;
    }
`;

class ImageZoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundPosition: '0% 0%'
        }
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    handleMouseMove = e => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100
        const y = (e.pageY - top) / height * 100
        this.setState({ backgroundPosition: `${x}% ${y}%` })
    }

    render() {
        const { src } = this.props;
        const { backgroundPosition } = this.state;
        return (
            <Figure onMouseMove={this.handleMouseMove} style={{ backgroundImage: `url(${src})`, backgroundPosition }}>
                <img src={src} />
            </Figure>
        );
    }
}

export default ImageZoom;