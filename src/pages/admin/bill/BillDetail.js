import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { formatDate } from '../../../helpers/formatDate';
import { formatNumber } from '../../../helpers/formatNumber';

import { TitlePanel, WhitePanel } from '../../../theme/Style';
import BillDetailRow from '../../../components/admin/bill/BillDetailRow';
import ViewProductImages from '../../../components/admin/bill/ViewProductImages';
import BackButton from '../../../components/BackButton';

const Container = styled.div`
    h4 {
        font-size: 20px;
    }
    p {
        font-size: 15px;
    }
    .title {
        font-weight: bold;
    }
    p.bill-info {
        max-width: 235px;
        display: flex;
        justify-content: space-between;

        .content {
            color: #f57224;
        }
    }
`;

const ContainerInfo = styled.div`
   .detail {
    padding: 10px 20px;
   }
    > h4 {
        width: max-content;
        margin: auto;
    }
`;

class BillDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bill: {
                customerInfo: {},
                shiperInfo: {},
                billInfo: {
                    details: [],
                },
            },
            visible: false
        }
        this.handleVisibleProductImages = this.handleVisibleProductImages.bind(this);
        this.handleHideViewImages = this.handleHideViewImages.bind(this);
    }

    componentDidMount() {
        let id = parseInt(this.props.match.params.id);
        console.log(id);
        axios.get(`/api/admin/bill/${id}/detail`).then(response => {
            const { success, error } = response.data;
            if (success) {
                const { bill } = response.data;
                console.log(bill);
                this.setState({ bill });
            }
        }).catch(error => {
            console.log(error);
        });
    }

    handleVisibleProductImages() {
        this.setState({ visible: true });
    }

    handleHideViewImages() {
        this.setState({ visible: false });
    }

    render() {
        const { bill: { customerInfo, shiperInfo, billInfo }, visible } = this.state;

        return (
            <Container>
                <BackButton onClick={this.props.history.goBack} />
                <TitlePanel>
                    <h3>Chi tiết đơn hàng</h3>
                </TitlePanel>

                <WhitePanel>
                    <div className="row">
                        <div className="row">
                            {/* customer info */}
                            <ContainerInfo className="col-xs-12 col-sm-6">
                                <h4>Thông tin khách hàng</h4>
                                <div className="row detail">
                                    <div className="col-xs-12 col-sm-6">
                                        <p><span className="title">Mã KH:</span> <span className="content">{customerInfo.id}</span></p>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <p><span className="title">Họ tên:</span> <span className="content">{customerInfo.name}</span></p>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <p><span className="title">Số điện thoại:</span> <span className="content">{customerInfo.phoneNumber}</span></p>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <p><span className="title">Địa chỉ nhận:</span> <span className="content">{customerInfo.destinationAddress}</span></p>
                                    </div>
                                </div>
                            </ContainerInfo>

                            {/* employee info */}
                            <ContainerInfo className="col-xs-12 col-sm-6">
                                <h4>Thông tin nhân viên</h4>
                                <div className="row detail">
                                    <div className="col-xs-12 col-sm-6">
                                        <p><span className="title">Mã NV:</span> <span className="content">{shiperInfo.id}</span></p>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <p><span className="title">Họ tên:</span> <span className="content">{shiperInfo.name}</span></p>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <p><span className="title">Số điện thoại:</span> <span className="content">{shiperInfo.phoneNumber}</span></p>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <p><span className="title">Địa chỉ:</span> <span className="content">{shiperInfo.address}</span></p>
                                    </div>
                                </div>
                            </ContainerInfo>
                        </div>
                    </div>

                    {/* Tổng quan sản phẩm */}
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <h4>Thông tin đơn hàng</h4>
                            <div className=" col-md-4">
                                <p className="bill-info"><span className="title">Giá trị đơn hàng:</span> <span className="content">{formatNumber(billInfo.value)} VNĐ</span></p>
                                <p className="bill-info"><span className="title">Phí giao hàng:</span> <span className="content">{formatNumber(billInfo.shipFee)} VNĐ</span></p>
                                <p className="bill-info"><span className="title">Tổng cộng:</span> <span className="content">{formatNumber(billInfo.value + billInfo.shipFee)} VNĐ</span></p>
                            </div>

                            <div className="col-md-4 col-md-push-1">
                                <p><span className="title">Ngày đặt:</span> <span className="content">{formatDate(billInfo.bookDate)}</span></p>
                                <p><span className="title">Ngày giao:</span> <span className="content">{formatDate(billInfo.deliveryDate)}</span></p>
                            </div>
                        </div>
                    </div>


                    {/* table bills */}
                    <div className="table-responsive" style={{ marginTop: 35 }}>
                        <table className="table table-bordered table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã SP</th>
                                    <th>Tên SP</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>Đã nhận</th>
                                    <th>Hoạt động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {billInfo.details.map((detail, index) => <BillDetailRow key={index} pos={index + 1} detail={detail}
                                    handleVisibleProductImages={this.handleVisibleProductImages} />)}
                            </tbody>
                        </table>
                    </div>
                </WhitePanel>
                {visible && <ViewProductImages handleHideViewImages={this.handleHideViewImages} visible={visible} />}
            </Container>
        )
    }
}

export default BillDetail;