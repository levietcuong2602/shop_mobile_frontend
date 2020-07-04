import React, { Component } from 'react';
import styled from 'styled-components';
import BillProductItem from './BillProductItem';

import { formatDate } from '../../../helpers/formatDate';
import { formatNumber } from '../../../helpers/formatNumber';

const Container = styled.div`
    border: 1px solid #f57224;
    margin: 10px 0;
    padding: 5px 20px;
    cursor: pointer;

    .bill-detail {
        border-top: 1px solid #f57224;
        padding-top: 5px;
    }
`;

class UserBill extends Component {
    render() {
        const { bill } = this.props;
        return (
            <Container>
                <div data-toggle="collapse" data-target={`#bill-detail-${bill.id}`}>
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <p>Khách hàng: {bill.customer_name}</p>
                            <p>Nhân viên giao hàng: {bill.shiper_name}</p>
                            <p>Giá trị đơn hàng: <span>{formatNumber(bill.bill_value)} VNĐ</span></p>
                        </div>

                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <p>Ngày đặt: {formatDate(bill.book_date)}</p>
                            <p>Ngày giao: {formatDate(bill.delivery_date)}</p>
                        </div>
                    </div>
                </div>

                <div id={`bill-detail-${bill.id}`} className="collapse bill-detail">
                    <div className="row">
                        {bill.products.map(p => (<BillProductItem key={p.id} product={p} />))}
                    </div>
                </div>
            </Container>
        );
    }
}

export default UserBill;