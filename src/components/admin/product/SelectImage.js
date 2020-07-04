import React, { Component } from 'react';
import styled from 'styled-components';
import ItemImageAdd from './ItemImageAdd';

const Container = styled.div`
    input[type=file] {
        display: none;
    }

    h3 {
        font-size: 21px;
        width: max-content;
        padding-bottom: 5px;
        border-bottom: 1px solid #e5e5e5;
    }
`;

class SelectImage extends Component {
    constructor(props) {
        super(props);
        this.handleSelectImage = this.handleSelectImage.bind(this);
    }

    handleSelectImage(e) {
        let fileSelected = e.target.files;
        this.props.handleSelectImage(fileSelected);
    }

    render() {
        const { images, handleRemoveImage } = this.props;

        return (
            <Container className="col-md-6">
                <legend>Images</legend>
                <label htmlFor="upload-photo"><span className="fa fa-plus btn btn-primary"> Select files</span></label>
                <input type="file" multiple accept="image/*" id="upload-photo" onChange={this.handleSelectImage} />
                <h3>Overview image</h3>
                <div className="row">
                    {images.map((img, index) => <ItemImageAdd key={index} image={img} pos={index} handleRemoveImage={handleRemoveImage} />)}
                </div>
            </Container>
        );
    }
}

export default SelectImage;