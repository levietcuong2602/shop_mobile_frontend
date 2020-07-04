import React, { Component } from 'react';

class ProductATRow extends Component {
    // action = 1: liên kết
    // action = 2: xóa
    render() {
        const { pos, action, object: { id, name }, onClick } = this.props;
        return (
            <tr>
                <td>{pos}</td>
                <td>{name}</td>
                <td>
                    {action == 1 && <button className="btn btn-success" onClick={onClick}>Liên kết</button>}
                    {action == 2 && <button className="btn btn-danger" onClick={onClick}>Xóa</button>}
                </td>
            </tr>
        );
    }
}

export default ProductATRow;