import React, { Component } from 'react';

class BrandItem extends Component {
    render() {
        return (
            <li>
                <a href="#">
                    <div className="brand-logo">
                        <img src={this.props.imageURL} alt="hinh thuong hieu" />
                    </div>
                </a>
            </li>
        );
    }
}

export default BrandItem;