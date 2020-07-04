import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../actions";

const initialState = {
  full_name: "",
  email: "",
  passwd: "",
  passwordConfirm: "",
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  clearState() {
    this.setState({ ...initialState });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { full_name, email, passwd } = this.state;
    this.props.signUpUser({ full_name, email, passwd });
  }

  validateForm() {
    const { full_name, email, passwd, passwordConfirm } = this.state;
    const isInvalid =
      !full_name ||
      !email ||
      !passwd ||
      passwd !== passwordConfirm ||
      passwd.length <= 7;
    return isInvalid;
  }

  render() {
    const { full_name, email, passwd, passwordConfirm } = this.state;
    let { from } = this.props.location.state || { from: undefined };
    const { error } = this.props.auth;
    if (this.props.auth.authenticated) {
      from = from
        ? from
        : this.props.auth.user.level === 2
        ? { pathname: "/admin/dashboard" }
        : { pathname: "/" };
      return <Redirect to={from} />;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-push-3">
            <div className="main-div auth">
              <div className="panel">
                <h2>Register</h2>
                <p>Please enter the information below</p>
              </div>

              <form
                className="signup-form"
                onSubmit={(event) => this.handleSubmit(event)}
              >
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    required
                    name="full_name"
                    value={full_name}
                    onChange={(event) => this.handleChange(event)}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    required
                    name="email"
                    value={email}
                    onChange={(event) => this.handleChange(event)}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password (Minimum of 8 characters)"
                    required
                    name="passwd"
                    value={passwd}
                    onChange={(event) => this.handleChange(event)}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password Confirm"
                    required
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={(event) => this.handleChange(event)}
                  />
                </div>

                <div className="action">
                  <p>
                    Have an account. <NavLink to="/user/signin">Login</NavLink>
                  </p>
                </div>
                {error && (
                  <div className="alert alert-danger">
                    <p>{error}</p>
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={this.validateForm()}
                >
                  Register
                </button>
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
    auth: state.auth,
  };
}

export default connect(mapStateToProps, actions)(SignUp);
