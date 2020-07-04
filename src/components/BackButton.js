import React, { Component } from 'react';
import styled from 'styled-components';

const Button = styled.button`
    i {
        margin-right: 5px;
    }
`;

class BackButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button type="button" className="btn btn-success" onClick={() => this.props.onClick()}>
                <i className="fa fa-long-arrow-left"></i>
                Quay lại
            </Button>
        )
    }
}

export default BackButton;