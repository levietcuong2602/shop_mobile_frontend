import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = styled.nav`
    position: fixed;
    width: 220px;
    z-index: 100;
    height: 100%;
    background-color: #2f4050;

    .nav>li>a.active {
        color: #fff;
    }

    .nav>li>a.active {
        border-left: 4px solid #19aa8d;
        background: #293846
    }

    .nav>li>a {
        color: #a7b1c2;
        font-weight: 600;
        padding: 14px 20px 14px 25px;
    }

    .nav>li>a:hover, .nav>li>a:focus {
        background-color: #293846;
        color: #fff
    }

    .nav-header {
        padding: 33px 25px;
    }

    .nav-header .profile-element {
        text-align: center
    }

    .nav-header a {
        color: #dfe4ed;
        cursor: pointer;
    }

    .nav-header a {
        text-decoration: none;
    }

    .nav-header a:hover {
        text-decoration: none;
    }

    .block.m-t-xs {
        display: block;
        margin-top: 5px;
    }

    .nav-second-level li a {
        padding: 7px 10px;
        padding-left: 52px
    }
`;

class SideBar extends Component {
    render() {
        const { handleLogOut } = this.props;
        return (
            <Navbar className="navbar-default navbar-static-side">
                <div className="slimScrollDiv" style={{ position: "relative", overflow: "hidden", width: "auto", height: "100%" }}><div className="sidebar-collapse" style={{ overflow: "hidden", width: "auto", height: "100%" }}>
                    <ul className="nav metismenu" id="side-menu" style={{ display: "block" }}>
                        <li className="nav-header">
                            <div className="dropdown profile-element"> <span>
                                <img alt="img-info" className="img-circle" src="https://graph.facebook.com/2281503488740589/picture?type=large&amp;redirect=true&amp;width=50&amp;height=50" />
                            </span>
                                <a data-toggle="dropdown" className="dropdown-toggle">
                                    <span className="clear"> <span className="block m-t-xs"> Chào <strong className="font-bold">Nguyễn Tài Tiêu</strong>
                                    </span> </span></a>
                            </div>
                        </li>
                        <li>
                            <NavLink to="/admin/dashboard"><i className="fa fa-tachometer"></i> <span className="nav-label">Dashboard</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/posts"><i className="fa fa-newspaper-o"></i> <span className="nav-label">Bài viết</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/users"><i className="fa fa-user"></i> <span className="nav-label">Quản lý người dùng</span></NavLink>
                        </li>
                        <li>
                            <a href="#product" data-toggle="collapse" style={{ position: "relative" }}>
                                <i className="fa fa-archive"></i>
                                <span className="nav-label">Quản lý sản phẩm </span>
                                <i className="fa fa-chevron-down" style={{ position: "absolute", right: 10 }}></i></a>
                            <ul id="product" className="nav nav-second-level collapse">
                                <li><NavLink to="/admin/products">Sản phẩm hiện có</NavLink></li>
                                <li><NavLink to="/admin/product/attributes">Thuộc tính sản phẩm</NavLink></li>
                            </ul>
                        </li>
                        <li>
                            <NavLink to="/admin/bills"><i className="fa fa-shopping-bag"></i> <span className="nav-label">Quản lý đơn hàng</span></NavLink>
                        </li>
                        <li>
                            <a href="#statistical" data-toggle="collapse"><i className="fa fa-bar-chart-o"></i> <span className="nav-label">Thống kê</span><span className="fa arrow"></span></a>
                            <ul id="statistical" className="nav nav-second-level collapse">
                                <li><NavLink to="/admin/statistical/revenue">Thống kê doanh thu</NavLink></li>
                                <li><NavLink to="/admin/statistical/product">Thống kê sản phẩm</NavLink></li>
                            </ul>
                        </li>
                        <li>
                            <a style={{ cursor: "pointer" }} onClick={e => {
                                e.preventDefault();
                                handleLogOut();
                            }}><i className="fa fa-sign-out"></i> <span className="nav-label">Đăng xuất</span></a>
                        </li>
                    </ul>
                </div><div className="slimScrollBar" style={{ background: "rgb(0, 0, 0)", width: "7px", position: "absolute", top: "0px", opacity: "0.4", display: "none", borderRadius: "7px", zIndex: "99", right: "1px", height: "121.304px" }}></div><div className="slimScrollRail" style={{ width: "7px", height: "100%", position: "absolute", top: "0px", display: "none", borderRadius: "7px", background: "rgb(51, 51, 51)", opacity: "0.9", zIndex: "90", right: "1px" }}></div></div>
            </Navbar>
        );
    }
}

export default SideBar;