import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../actions/admin_post_actions';

import 'react-confirm-alert/src/react-confirm-alert.css';

import { TitlePanel, WhitePanel, Label } from '../../../theme/Style';
import PostInfoTable from '../../../components/admin/post/PostInfoTable';
import Pagination from '../../../components/pagination/Pagination';
import MessageDialog from '../../../components/dialog/MessageDialog';

class Post extends Component {
    constructor(props) {
        super(props);
        this.getPrevPage = this.getPrevPage.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
        this.resetError = this.resetError.bind(this);
        this.handleChangePostNum = this.handleChangePostNum.bind(this);
    }

    getNextPage() {
        const { limit, nextPageNum } = this.props.post.pager;
        this.props.getPostsByPage(limit, nextPageNum);
    }

    getPrevPage() {
        const { limit, prevPageNum } = this.props.post.pager;
        this.props.getPostsByPage(limit, prevPageNum);
    }

    resetError() {
        this.props.resetError();
    }

    componentDidMount() {
        const { limit, currentPageNum } = this.props.post.pager;
        this.props.getPostsByPage(limit, currentPageNum);
    }

    handleChangePostNum(e) {
        const limit = parseInt(e.target.value);
        this.props.getPostsByPage(limit, 1);
    }

    render() {
        const { pager: { totalCount, currentPageNum, limit }, error } = this.props.post;
        return (
            <div>
                <TitlePanel>
                    <h3>Quản lý bài viết</h3>
                </TitlePanel>

                <WhitePanel>
                    <div className="row" style={{ marginBottom: "10px", marginTop: "35px" }}>
                        <div className="col-md-12">
                            <NavLink to="/admin/posts/new" className="btn btn-success pull-right">Tạo mới</NavLink>
                        </div>
                    </div>

                    <div className="row" style={{ padding: '5px 0 20px 0' }}>
                        <div className="col-sm-6 col-md-4">
                            <Label htmlFor="product-type">Hiển thị</Label>
                            <select name="product_num" id="product-type" className="form-control"
                                value={limit} onChange={this.handleChangePostNum}>
                                <option value="10">10 hàng</option>
                                <option value="15">15 hàng</option>
                                <option value="20">20 hàng</option>
                                <option value="35">35 hàng</option>
                            </select>
                        </div>
                    </div>

                    <PostInfoTable />
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
        post: state.admin.post
    }
}

export default connect(mapStateToProps, actions)(Post);