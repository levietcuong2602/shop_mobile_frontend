import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as actions from '../../../actions/admin_user_action';

import 'react-confirm-alert/src/react-confirm-alert.css';

import { TitlePanel, WhitePanel } from '../../../theme/Style';
import UserSearch from '../../../components/admin/user/UserSearch';
import UserInfoTable from '../../../components/admin/user/UserInfoTable';
import Pagination from '../../../components/pagination/Pagination';
import MessageDialog from '../../../components/dialog/MessageDialog';

class User extends Component {
    constructor(props) {
        super(props);
        this.getPrevPage = this.getPrevPage.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
        this.resetError = this.resetError.bind(this);
    }

    getNextPage() {
        const { pager: { limit, nextPageNum }, searchValue } = this.props.user;
        this.props.getUsersByPage(limit, nextPageNum, searchValue);
    }

    getPrevPage() {
        const { pager: { limit, prevPageNum }, searchValue } = this.props.user;
        this.props.getUsersByPage(limit, prevPageNum, searchValue);
    }

    resetError() {
        this.props.resetError();
    }

    componentDidMount() {
        const { pager: { limit, currentPageNum }, searchValue } = this.props.user;
        this.props.getUsersByPage(limit, currentPageNum, searchValue);
    }

    render() {
        const { pager: { totalCount, currentPageNum, limit }, error } = this.props.user;
        return (
            <div>
                <TitlePanel>
                    <h3>Quản lý người dùng</h3>
                </TitlePanel>

                <WhitePanel>
                    <div className="row" style={{ marginBottom: "10px", marginTop: "35px" }}>
                        <div className="col-md-12">
                            <NavLink to="/admin/users/new" className="btn btn-success pull-right">Tạo mới</NavLink>
                        </div>
                    </div>
                    <UserSearch />
                    <UserInfoTable />
                    <Pagination currentPage={currentPageNum} total={totalCount} noPerPage={limit}
                        getPrevPage={this.getPrevPage} getNextPage={this.getNextPage} />
                    {error && <MessageDialog title={"Message"} message={error} resetMessage={this.resetError} />}
                </WhitePanel>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.admin.user
    }
}

export default connect(mapStateToProps, actions)(User);