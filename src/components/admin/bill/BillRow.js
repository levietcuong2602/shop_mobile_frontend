import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { formatDate } from '../../../helpers/formatDate';
import { formatNumber } from '../../../helpers/formatNumber';

const statusOrder = {
    '1': 'Đang giao hàng',
    '2': 'Đã giao hàng',
    '3': 'Đổi trả'
}

class BillRow extends Component {
    render() {
        const { pos, billInfo } = this.props;
        return (
            <tr>
                <td>{pos}</td>
                <td>{billInfo.customer_name}</td>
                <td>{billInfo.shiper_name}</td>
                <td>{billInfo.destination_address}</td>
                <td>{formatDate(billInfo.book_date)}</td>
                <td>{formatDate(billInfo.delivery_date)}</td>
                <td>{formatNumber(billInfo.ship_fee)} VNĐ</td>
                <td>{formatNumber(billInfo.bill_value)} VNĐ</td>
                <td>{statusOrder[`${billInfo.status_order}`]}</td>
                <td>
                    <NavLink to={`/admin/bill/${billInfo.id}/detail`} className="btn btn-success">Chi tiết</NavLink>
                </td>
            </tr>
        );
    }
}

export default BillRow;