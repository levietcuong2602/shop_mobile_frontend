import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';

import * as actions from '../../../actions/admin_post_actions';

class PostRow extends Component {
    deletePost(id) {
        const { currentPageNum, totalCount, limit, offset, prevPageNum } = this.props.post.pager;
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this post.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.post(`/api/admin/post/delete`, { id }).then(response => {
                            const { success, error } = response.data;
                            if (success) {
                                if (currentPageNum > 1 && offset + 1 === totalCount) {
                                    this.props.getPostsByPage(limit, prevPageNum);
                                } else {
                                    this.props.getPostsByPage(limit, currentPageNum);
                                }
                            }
                        }).catch(err => {
                            this.props.returnError(err);
                        })
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    render() {
        const { id, title, content, linkto } = this.props.postInfo;
        const { pos } = this.props;
        return (
            <tr>
                <td>{`${pos}`}</td>
                <td>{title}</td>
                <td>{content}</td>
                <td><a href={linkto}>{linkto}</a></td>
                <td>
                    <NavLink to={`/admin/posts/edit/${id}`} className="btn btn-primary">Chỉnh sửa</NavLink>
                    <button className="btn btn-danger" onClick={() => this.deletePost(id)}>Xóa</button>
                </td>
            </tr >
        );
    }
}

function mapStateToProps(state) {
    return {
        post: state.admin.post
    }
}

export default connect(mapStateToProps, actions)(PostRow);