import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions';

const initialState = {
    email: '',
    passwd: '',
    error: '',
}

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
    }

    clearState() {
        this.setState({ ...initialState });
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { email, passwd } = this.state;
        this.props.signInUser({ email, passwd });
    }

    validateForm() {
        const { email, passwd } = this.state;
        const isInvalid = !email || passwd.length < 8;

        return isInvalid;
    }

    render() {
        let { from } = this.props.location.state || { from: undefined };
        const { email, passwd } = this.state;
        const { error } = this.props.auth;
        if (this.props.auth.authenticated) {
            from = from ? from : this.props.auth.user.level === 2 ? { pathname: "/admin/dashboard" } : { pathname: "/" };
            return <Redirect to={from} />;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-push-3">
                        <div className="main-div auth">
                            <div className="panel">
                                <h2>Login</h2>
                                <p>Please enter your email and password</p>
                            </div>

                            <form className="signin-form" onSubmit={event => this.handleSubmit(event)}>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="Email Address"
                                        name="email" value={email} onChange={event => this.handleChange(event)} />
                                </div>

                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Password"
                                        name="passwd" value={passwd} onChange={event => this.handleChange(event)} />
                                </div>

                                <div className="action">
                                    <NavLink to="/user/forgotpassword">Forgot password?</NavLink>
                                    <p>Don't have an account yet? <NavLink to="/user/signup">Register</NavLink></p>
                                </div>

                                {error && (
                                    <div className="alert alert-danger">
                                        <p>{error}</p>
                                    </div>
                                )}

                                <button type="submit" className="btn btn-primary" disabled={this.validateForm()}>Login</button>
                            </form>
                        </div>
                    </div>
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

export default connect(mapStateToProps, actions)(SignIn);