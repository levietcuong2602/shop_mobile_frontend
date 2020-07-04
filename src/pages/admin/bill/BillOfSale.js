import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';

import * as actions from '../../../actions/admin_bill_actions';

import "react-datepicker/dist/react-datepicker.css";

import { TitlePanel, WhitePanel, Label } from '../../../theme/Style';
import BillRow from '../../../components/admin/bill/BillRow';
import Pagination from '../../../components/pagination/Pagination';

const SearchForm = styled.form`
    max-width: 300px;
    display: flex;
    margin-top: 15px;

    input {
        padding: 0 8px 0 8px;
        border-radius: 1px;
    }

    button {
        border-radius: 1px;
    }
`;

class BillOfSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billTypeSelected: '0',
            startDate: moment('03/12/2018', 'dd/MM/yyyy').toDate(),
            endDate: new Date(),
            searchValue: '',
            filterByDate: 0,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeFilterByDate = this.handleChangeFilterByDate.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleChangeBillType = this.handleChangeBillType.bind(this);
        this.handleChangeProductNum = this.handleChangeProductNum.bind(this);
        this.handleFilterBill = this.handleFilterBill.bind(this);
        this.getPrevPage = this.getPrevPage.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
    }

    componentDidMount() {
        const { pager: { limit, currentPageNum }, searchValue, filter } = this.props.bill;
        this.props.getBillsByPage(limit, currentPageNum, searchValue, filter);
    }

    handleChangeFilterByDate(e) {
        this.setState({
            filterByDate: parseInt(e.target.value)
        });
    }

    handleChangeStartDate(date) {
        this.setState(prevState => {
            if (date <= prevState.endDate) {
                return {
                    startDate: date
                }
            }
        });
    }

    handleChangeEndDate(date) {
        this.setState(prevState => {
            if (date >= prevState.startDate && (date <= new Date())) {
                return {
                    endDate: date
                }
            }
        });
    }

    handleChangeBillType(e) {
        this.setState({
            billTypeSelected: e.target.value
        });
    }

    handleChangeProductNum(e) {
        const limit = parseInt(e.target.value);
        const { searchValue, filter } = this.props.bill;
        this.props.getBillsByPage(limit, 1, searchValue, filter);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { filter, pager: { limit } } = this.props.bill;
        this.props.getBillsByPage(limit, 1, this.state.searchValue, filter);
    }

    handleFilterBill(e) {
        const { startDate, endDate, billTypeSelected, filterByDate } = this.state;
        const date = filterByDate ? { startDate, endDate } : 0;
        const filter = {
            date,
            billType: parseInt(billTypeSelected),
        }
        const { pager: { limit }, searchValue } = this.props.bill;
        this.props.getBillsByPage(limit, 1, searchValue, filter);
    }

    getPrevPage() {
        const { pager: { limit, prevPageNum }, searchValue, filter } = this.props.bill;
        this.props.getBillsByPage(limit, prevPageNum, searchValue, filter);
    }

    getNextPage() {
        const { pager: { limit, nextPageNum }, searchValue, filter } = this.props.bill;
        this.props.getBillsByPage(limit, nextPageNum, searchValue, filter);
    }

    render() {
        const { billTypeSelected, startDate, endDate, searchValue, filterByDate } = this.state;
        const { bills, pager } = this.props.bill;
        const renderFilterByDate = () => {
            if (filterByDate) return (<div>
                <div className="col-xs-12 col-sm-6">
                    <Label htmlFor="">Từ</Label>
                    <div className="form-group">
                        <DatePicker className="form-control" selected={startDate} onChange={this.handleChangeStartDate} />
                    </div>
                </div>

                <div className="col-xs-12 col-sm-6">
                    <Label htmlFor="">Đến</Label>
                    <div className="form-group">
                        <DatePicker className="form-control" selected={endDate} onChange={this.handleChangeEndDate} />
                    </div>
                </div>
            </div>);
        }
        return (
            <div>
                <TitlePanel>
                    <h3>Quản lý đơn hàng</h3>
                </TitlePanel>

                <WhitePanel>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="row">
                                <div className="col-xs-12 col-sm-8">
                                    <Label htmlFor="">Ngày đặt</Label>
                                    <select name="product_type_id" id="product-type" className="form-control"
                                        value={filterByDate} onChange={this.handleChangeFilterByDate}>
                                        <option value="0">Tất cả</option>
                                        <option value="1">Chọn ngày</option>
                                    </select>
                                </div>
                                {renderFilterByDate()}
                            </div>

                            <div className="row" style={{ display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: '15px' }}>
                                <div className="col-xs-8 col-sm-7">
                                    <Label htmlFor="product-type">Đơn hàng</Label>
                                    <select name="product_type_id" id="product-type" className="form-control"
                                        value={billTypeSelected} onChange={this.handleChangeBillType}>
                                        <option value="0">Tất cả</option>
                                        <option value="1">Đang giao hàng</option>
                                        <option value="2">Đã giao hàng</option>
                                        <option value="3">Đổi trả</option>
                                    </select>
                                </div>

                                <div className="col-xs-4 col-sm-5" style={{ marginTop: 10 }}>
                                    <button type="button" className="btn btn-success" onClick={this.handleFilterBill}>Lọc</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6" style={{ height: '100%', marginTop: 15, display: 'flex', flexDirection: 'column', alignItems: 'space-between' }}>
                            <div className="row">
                                <div className="col-xs-8 col-sm-7">
                                    <Label htmlFor="product-type">Hiển thị</Label>
                                    <select name="product_num" id="product-type" className="form-control"
                                        value={pager.limit} onChange={this.handleChangeProductNum}>
                                        <option value="10">10 hàng</option>
                                        <option value="15">15 hàng</option>
                                        <option value="20">20 hàng</option>
                                        <option value="35">35 hàng</option>
                                    </select>
                                </div>
                            </div>

                            <SearchForm onSubmit={event => this.handleSubmit(event)}>
                                <input type="text" className="form-control" placeholder="Tìm kiếm đơn hàng"
                                    value={searchValue} onChange={(e) => this.setState({ searchValue: e.target.value })} />
                                <button type="submit" className="btn btn-primary"><i className="fa fa-search"></i></button>
                            </SearchForm>
                        </div>
                    </div>

                    {/* table bills */}
                    <div className="table-responsive" style={{ marginTop: 35 }}>
                        <table className="table table-bordered table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên KH</th>
                                    <th>Shiper</th>
                                    <th>Địa chỉ</th>
                                    <th>Ngày đặt</th>
                                    <th>Ngày nhận</th>
                                    <th>Phí ship</th>
                                    <th>Giá trị đơn hàng</th>
                                    <th>Trạng thái</th>
                                    <th>Hoạt động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bills.map((bill, index) => <BillRow key={index} pos={pager.offset + index + 1} billInfo={bill} />)}
                            </tbody>
                        </table>
                    </div>

                    <Pagination currentPage={pager.currentPageNum} total={pager.totalCount} noPerPage={pager.limit}
                        getPrevPage={this.getPrevPage} getNextPage={this.getNextPage} />
                </WhitePanel>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        bill: state.admin.bill
    }
}

export default connect(mapStateToProps, actions)(BillOfSale);