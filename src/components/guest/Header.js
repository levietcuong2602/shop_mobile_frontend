import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import ShoppingCartIcon from './ShoppingCartIcon';

const NavBar = styled.nav`
    background: #f4f4f4;
    margin: 0px;
    .container {
        display: flex;
        align-items: center;
    }

    a.navbar-brand {
        color: #ffffff;
        font-size: 2em;
    }

    a.navbar-brand:hover {
        color: #ffffff;
    }

    div.div-search {
        width: 60%;
        form {
            display: flex;
            input {
                border-top-right-radius: 0px;
                border-bottom-right-radius: 0px;
                height: 42px;
            }
            button {
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;
                padding-left: 22px;
                height: 42px;
            }
        }
    }
`;

class Header extends Component {
    render() {
        return (
            <NavBar className="navbar navbar-default header" role="navigation" >
                <div className="container">
                    <div className="navbar-header">
                        <NavLink className="navbar-brand" to="/">BKStore</NavLink>
                    </div>
                    <div className="div-search">
                        <form action="" method="POST" role="form">
                            <input type="text" className="form-control" placeholder="Tìm kiếm trên BKStore" />
                            <button type="submit" className="btn btn-primary">Search</button>
                        </form>
                    </div>
                    <ShoppingCartIcon />
                </div>
            </NavBar>
        );
    }
}

export default Header;