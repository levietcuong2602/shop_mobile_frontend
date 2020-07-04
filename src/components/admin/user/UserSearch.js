import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actions from '../../../actions/admin_user_action';
import { Label } from '../../../theme/Style';

const FormUser = styled.form`
    margin-top: 5px;
    max-width: 300px;
    display: flex;

    input {
        padding: 0 8px 0 8px;
        border-radius: 1px;
    }

    button {
        border-radius: 1px;
    }
`;

class UserSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        }
        this.handleChangeUserNum = this.handleChangeUserNum.bind(this);
    }

    handleChangeUserNum(e) {
        const limit = parseInt(e.target.value);
        this.props.getUsersByPage(limit, 1, this.props.user.searchValue);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { pager: { limit } } = this.props.user;
        this.props.getUsersByPage(limit, 1, this.state.searchValue);
    }

    render() {
        const { searchValue } = this.state;
        const { pager: { limit, totalCount } } = this.props.user;

        return (
            <div>
                <h3>Số lượng: {totalCount}</h3>

                <div className="row" style={{ padding: '5px 0 35px 0', display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                    <div className="col-sm-6 col-md-4">
                        <Label htmlFor="product-type">Hiển thị</Label>
                        <select name="product_num" id="product-type" className="form-control"
                            value={limit} onChange={this.handleChangeUserNum}>
                            <option value="10">10 hàng</option>
                            <option value="15">15 hàng</option>
                            <option value="20">20 hàng</option>
                            <option value="35">35 hàng</option>
                        </select>
                    </div>
                    <div className="col-sm-6">
                        <FormUser onSubmit={event => this.handleSubmit(event)}>
                            <input type="text" className="form-control input-sm" placeholder="Tìm kiếm bằng email"
                                value={searchValue} onChange={(e) => this.setState({ searchValue: e.target.value })} />
                            <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-search"></i></button>
                        </FormUser>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.admin.user
    }
}

export default connect(mapStateToProps, actions)(UserSearch);