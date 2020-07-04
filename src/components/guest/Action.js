import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../actions';

const Container = styled.div`
    background: #0D2934;
    ul.actions {
        margin-bottom: 0px;
        padding: 5px 0px;
        display: flex;
        justify-content: flex-end;

        > li {
            list-style: none;
            text-transform: uppercase;
            font-size: 12px;
            padding-left: 15px;
        }

        > li a {
            color: #a8b2b7;
            text-decoration: none;
            cursor: pointer;
        }

        > li a: hover {
            color: #ffffff;
        }

        ul li {
            display: flex;
            padding-top: 8px;
            i {
                color: #a8b2b7;
                padding-left: 5px;
            }
            a {
                width: 100%;
                &:hover {
                    color: #f36f36;
                }
            }
        }
    }
`;

class Action extends Component {
    handleSignOut(e) {
        e.preventDefault();
        const { history, signOutUser } = this.props;
        signOutUser(history);
    }

    render() {
        const { authenticated } = this.props.auth;
        return (
            <Container>
                <ul className="container actions">
                    <li><NavLink to="/customer-care">Chăm sóc khách hàng</NavLink></li>
                    {!authenticated && <li><NavLink to="/user/signin">Đăng nhập</NavLink></li>}
                    {!authenticated && <li><NavLink to="/user/signup">Đăng ký</NavLink></li>}
                    {authenticated && <li><div className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown">Tài khoản {this.props.auth.user.full_name}</a>
                        <ul className="dropdown-menu">
                            <li><i className="fa fa-smile-o fa-2x"></i><NavLink to="/user/account">Quản lý tài khoản</NavLink></li>
                            <li><i className="fa fa-archive fa-2x"></i><NavLink to="/user/orders">Đơn hàng của tôi</NavLink></li>
                            <li><i className="fa fa-heart-o fa-2x"></i><NavLink to="/user/favorites">Danh sách yêu thích</NavLink></li>
                            <li><i className="fa fa-sign-out fa-2x"></i><a onClick={e => this.handleSignOut(e)}>Đăng xuất</a></li>
                        </ul>
                    </div></li>}
                    <li><NavLink to="/change-language">Change language</NavLink></li>
                </ul>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps, actions)(Action));