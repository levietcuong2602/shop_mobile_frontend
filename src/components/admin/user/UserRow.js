import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import { connect } from 'react-redux';

import * as actions from '../../../actions/admin_user_action';

const accountTypes = {
    '1': 'Khách hàng',
    '2': 'Admin',
    '3': 'Thủ kho',
    '4': 'Nhân viên giao hàng',
};

class UserRow extends Component {
    deleteUser(id) {
        const { pager: { currentPageNum, totalCount, limit, offset, prevPageNum }, searchValue } = this.props.user;
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this user.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.post(`/api/admin/user/delete`, { id }).then(
                            response => {
                                const { success, error } = response.data;
                                if (success) {
                                    if (currentPageNum > 1 && offset + 1 === totalCount) {
                                        this.props.getUsersByPage(limit, prevPageNum, searchValue);
                                    } else {
                                        this.props.getUsersByPage(limit, currentPageNum, searchValue);
                                    }
                                }
                            }
                        )
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    render() {
        const { id, full_name, email, address, level } = this.props.userInfo;
        const pos = this.props.pos;
        return (
            <tr>
                <td>{pos}</td>
                <td>{full_name}</td>
                <td>{email}</td>
                <td>{address}</td>
                <td>{accountTypes[level.toString()]}</td>
                <td><button type="button" className="btn btn-danger" onClick={() => this.deleteUser(id)}>Xóa</button></td>
            </tr>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.admin.user
    }
}

export default connect(mapStateToProps, actions)(UserRow);