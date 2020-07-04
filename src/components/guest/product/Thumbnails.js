import React, { Component } from 'react';
import styled from 'styled-components';

const ThumbnailButton = styled.button`
    height: 45px;
    width: 45px;
    padding: 5px;
    margin: 20px 10px 20px 0px;
    border: 1px solid ${({ active }) => active ? "#189eff" : "#ececec"}
    background: #ffffff;

    img {
        width: 100%;
        height: 100%;
    }
`;

class Thumbnails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentThumbnail: 0
        }
        this.handleChangeImage = this.handleChangeImage.bind(this);
    }

    handleChangeImage(e, i) {
        const { currentThumbnail } = this.state;
        if (currentThumbnail !== i) {
            this.setState({ currentThumbnail: i });
            this.props.handleChangeImage(i);
        }
    }

    render() {
        console.log('thumbnails:', this.props.thumbnails);
        
        const { thumbnails } = this.props;
        const { currentThumbnail } = this.state;
        return (
            <div>
                {thumbnails.map((thumbnail, i) => (
                    <ThumbnailButton keys={i} onClick={e => this.handleChangeImage(e, i)} active={i === currentThumbnail}>
                        <img src={thumbnail} alt="thumbnail-product" />
                    </ThumbnailButton>
                ))}
            </div>
        );
    }
}

export default Thumbnails;