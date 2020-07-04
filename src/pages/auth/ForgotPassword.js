import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const initialState = {
    email: '',
    error: ''
}

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
    }

    clearState() {
        this.setState({ ...initialState })
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
        //
        //
    }

    validateForm() {
        const { email } = this.state;
        const isInvalid = !email;
        return isInvalid;
    }

    render() {
        const { email, error } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-push-3">
                        <div className="main-div auth">
                            <div className="panel">
                                <p>Please enter the email address associated with your account and we will email you a temporary password.</p>
                            </div>

                            <form className="forgotpassword-form" onSubmit={event => this.handleSubmit(event)}>
                                <div className="form-group">
                                    <input type="email" name="email" className="form-control" placeholder="Email" value={email} onChange={this.handleChange.bind(this)} />
                                </div>
                                <p>Remembered your password? <NavLink to="/user/signin">Login</NavLink></p>
                                {error && (
                                    <div className="alert alert-danger">
                                        <p>{error}</p>
                                    </div>
                                )}
                                <button type="submit" className="btn btn-primary" disabled={this.validateForm()}>
                                    Reset</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ForgotPassword;