import React, { Component } from 'react';
import styled from 'styled-components';
import * as pathParse from 'path-parse';

const Container = styled.div`
    padding: 10px 15px;
    border: 1px solid #e5e5e5;
    display: flex;
    flex-direction: column;
`;

class ItemImageAdd extends Component {
    render() {
        const { pos, image, handleRemoveImage } = this.props;
        // console.log("parse: ", parse);
        // file['newName'] = file.name.replace(/\.[^/.]+$/, "");
        image['newName'] = pathParse(image.name).name;
        return (
            <Container className="col-xs-6 col-sm-3 col-md-4 col-lg-3">
                <img src={window.URL.createObjectURL(image)} className="img-responsive" alt="item-photo" style={{ height: 120 }} />

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" defaultValue={image.newName}
                        onChange={(e) => { image['newName'] = e.target.value }} />
                </div>

                <button type="button" className="btn btn-danger" onClick={() => handleRemoveImage(pos)}>Remove</button>
            </Container>
        );
    }
}

export default ItemImageAdd;