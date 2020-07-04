import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { connect } from 'react-redux';

import UserBill from '../../components/guest/bill/UserBill';

const Container = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
`;

const ContinueDiv = styled.div`
    height: 239px;
    width: 100%;
    padding-top: 80px;
    text-align: center;

    a {
        color: #f57224;
        border: 1px solid #f57224;
        border-radius: 2px;
        text-align: center;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: .5px;
        padding: 0 8px;
        height: 32px;
        line-height: 32px;
        display: inline-block;
        text-transform: uppercase;
    }

    > p {
        font-size: 14px;
        color: #757575;
        margin-bottom: 27px;
    }
`;

class UserOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bills: [],
        }
    }

    componentDidMount() {
        axios.get(`/api/user/bill`, {
            params: {
                user_id: this.props.user_id
            }
        }).then(response => {
            const { success, error, bills } = response.data;
            if (success) {
                this.setState({
                    bills
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const { bills } = this.state;

        const renderBillOrder = () => {
            const billOrder = bills.filter(b => b.status_order === 1);
            return (
                <div role="tabpanel" className="tab-pane active" id="order">
                    {billOrder.map(b1 => (<UserBill key={b1.id} bill={b1} />))}
                    <ContinueDiv>
                        {billOrder.length === 0 && <p>Danh sách đơn hàng trống</p>}
                        <a href="/" className="btn">Tiếp tục mua sắm</a>
                    </ContinueDiv>
                </div>
            );
        }

        const renderBillRecived = () => {
            const billRecived = bills.filter(b => b.status_order === 2);
            return (
                <div role="tabpanel" className="tab-pane" id="order-recived">
                    {billRecived.map(b1 => (<UserBill key={b1.id} bill={b1} />))}
                    <ContinueDiv>
                        {billRecived.length === 0 && <p>Danh sách đơn hàng trống</p>}
                        <a href="/" className="btn">Tiếp tục mua sắm</a>
                    </ContinueDiv>
                </div>
            );
        }

        const renderBillCacel = () => {
            const billCancel = bills.filter(b => b.status_order === 3);
            return (
                <div role="tabpanel" className="tab-pane" id="order-cancel">
                    {billCancel.map(b1 => (<UserBill key={b1.id} bill={b1} />))}
                    <ContinueDiv>
                        {billCancel.length === 0 && <p>Danh sách đơn hàng trống</p>}
                        <a href="/" className="btn">Tiếp tục mua sắm</a>
                    </ContinueDiv>
                </div>
            );
        }

        return (
            <Container className="container" role="tabpanel">
                <h2>Đơn hàng của tôi</h2>
                <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active">
                        <a href="#order" aria-controls="home" role="tab" data-toggle="tab">Đơn hàng của tôi</a>
                    </li>
                    <li role="presentation">
                        <a href="#order-recived" aria-controls="tab" role="tab" data-toggle="tab">Đơn hàng đã nhận</a>
                    </li>
                    <li role="presentation">
                        <a href="#order-cancel" aria-controls="tab" role="tab" data-toggle="tab">Đơn hàng đã hủy</a>
                    </li>
                </ul>

                <div className="tab-content">
                    {renderBillOrder()}
                    {renderBillRecived()}
                    {renderBillCacel()}
                </div>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        user_id: state.auth.user.id
    }
}

export default connect(mapStateToProps)(UserOrder);