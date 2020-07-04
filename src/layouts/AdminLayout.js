import React, { Component } from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import SideBar from '../components/admin/SideBar';

const LogoutModel = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    background: white;
    margin: 150px auto;
    width: 300px;
    padding: 25px 0px;
    z-index: 200;
    box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.5);

    .btn {
        margin: 0 10px;
        padding: 6px 20px;
        text-decoration: none;
        color: #fff;
        background-color: #26a69a;
        text-align: center;
        letter-spacing: .5px;
        transition: .2s ease-out;
        cursor: pointer;
    }

    .btn:hover {
        background-color: #2bbbad;
    }
`;

class AdminLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateWeb: true,
            hideNav: false
        }

        this.handleLogOut = this.handleLogOut.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        $('.navbar-minimalize.minimalize-styl-2').click((e) => {
            const { stateWeb, hideNav } = this.state;
            if (stateWeb) {
                $('.navbar-default.navbar-static-side').toggle();
                if (!hideNav) {
                    $('#page-wrapper').css({ "margin-left": "0px" });
                } else {
                    $('#page-wrapper').css({ "margin-left": "220px" });
                }
                this.setState({ hideNav: !hideNav });
            }
        })
    }

    handleLogOut() {
        this.toggleModal();
    }

    toggleModal() {
        this.refs.modal.classList.toggle('hide');
    }

    render() {
        const { signOutUser, history } = this.props;
        return (
            <div id="wrapper" style={{ backgroundColor: "#f4f4f4" }}>
                <LogoutModel className='hide' ref='modal' id='logoutModal'>
                    <p><strong>Are you sure you want to log out?</strong></p>
                    <button className='btn' onClick={() => signOutUser(history)}>Yes</button>
                    <button className='btn' onClick={this.toggleModal}>No</button>
                </LogoutModel>

                <SideBar handleLogOut={this.handleLogOut} />
                <div id="page-wrapper" className="gray-bg container-fluid" style={{ minHeight: "636px", marginLeft: "220px" }}>
                    <div className="row border-bottom">
                        <nav className="navbar navbar-static-top" style={{ marginBottom: "0" }}>
                            <div className="navbar-header">
                                <a className="navbar-minimalize minimalize-styl-2 btn btn-primary "><i className="fa fa-bars"></i> </a>
                            </div>
                        </nav>
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps, actions)(AdminLayout));