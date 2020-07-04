import React, { Component } from 'react';
import { formatNumber } from '../../../helpers/formatNumber';

class BillDetailRow extends Component {
    render() {
        const { pos, detail } = this.props;
        return (
            <tr>
                <td>{pos}</td>
                <td>{detail.productId}</td>
                <td>{detail.productName}</td>
                <td>{formatNumber(detail.unitPrice)} VNĐ</td>
                <td>{detail.amount}</td>
                <td>1</td>
                <td>
                    <button type="button" className="btn btn-success" onClick={() => this.props.handleVisibleProductImages()}>Xem hình SP</button>
                </td>
            </tr>
        );
    }
}

export default BillDetailRow;