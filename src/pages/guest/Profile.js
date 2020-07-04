import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                email: '',
                fullName: '',
                phoneNumber: '',
                address: '',
            },
            password: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            }
        }

        this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
        this.handleChangeInputPassword = this.handleChangeInputPassword.bind(this);
        this.handleChangeInputProfile = this.handleChangeInputProfile.bind(this);
        this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    }

    componentDidMount() {
        this.setState({
            userInfo: {
                email: this.props.user.email,
                fullName: this.props.user.full_name,
                phoneNumber: this.props.user.phone_number,
                address: this.props.user.address,
            }
        });
    }

    handleChangeInputPassword(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevState => {
            return {
                password: {
                    ...prevState.password,
                    [name]: value,
                }
            }
        });
    }

    handleChangeInputProfile(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevState => {
            return {
                userInfo: {
                    ...prevState.userInfo,
                    [name]: value,
                }
            }
        });
    }


    handleUpdateProfile() {
        const { email, fullName, address, phoneNumber } = this.state.userInfo;
        if (email && fullName && address) {
            axios.post(`/api/user/update-profile`, {
                user_id: this.props.user.id,
                email,
                full_name: fullName,
                phone_number: phoneNumber
            }).then(response => {
                if (response.data.success) {
                    console.log('cap nhat thanh cong');
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }

    handleUpdatePassword() {
        const { oldPassword, newPassword } = this.state.password;
        if (oldPassword && newPassword) {
            axios.post(`/api/user/update-password`, {
                user_id: this.props.user.id,
                old_password: oldPassword,
                new_password: newPassword,
            }).then(response => {
                if (response.data.success) {
                    this.setState({
                        password: {
                            oldPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                        }
                    })
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }

    render() {
        const { userInfo, password } = this.state;

        return (
            <div id="profile">
                <div className="container">
                    <h2>Quản lý tài khoản</h2>
                    <hr />
                    <div class="account_manage">
                        <div class="col-sm-6">
                            <div class="info_account">
                                <h4>Thông tin cá nhân</h4>
                                <div className="form-group">
                                    <label for="email">Email:</label>
                                    <input type="email" name="email" class="form-control" placeholder="Email"
                                        value={userInfo.email} onChange={this.handleChangeInputProfile} />
                                </div>

                                <div className="form-group">
                                    <label for="name">Họ và tên:</label>
                                    <input type="text" name="fullName" class="form-control" placeholder="Họ và tên"
                                        value={userInfo.fullName} onChange={this.handleChangeInputProfile} />
                                </div>

                                <div class="form-group">
                                    <label for="birthday">Số điện thoại:</label>
                                    <input type="text" class="form-control" name="phoneNumber" placeholder="Input field"
                                        value={userInfo.phoneNumber} onChange={this.handleChangeInputProfile} />
                                </div>

                                <div class="form-group">
                                    <label for="birthday">Địa chỉ:</label>
                                    <input type="text" class="form-control" name="address" placeholder="Input field"
                                        value={userInfo.address} onChange={this.handleChangeInputProfile} />
                                </div>

                                <button type="button" class="btn btn-primary" style={{ marginTop: 15 }}
                                    onClick={this.handleUpdateProfile}>Cập nhật thông tin</button>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="info_account">
                                <h4>Mật khẩu</h4>
                                <label for="password">Mật khẩu:</label>
                                <input type="password" name="oldPassword" class="form-control"
                                    value={password.oldPassword} onChange={this.handleChangeInputPassword} />
                                <label for="new_password">Mật khẩu mới:</label>
                                <input type="password" name="newPassword" class="form-control"
                                    value={password.newPassword} onChange={this.handleChangeInputPassword} />
                                <label for="re_new_password">Nhập lại:</label>
                                <input type="password" name="confirmPassword" class="form-control"
                                    value={password.confirmPassword} onChange={this.handleChangeInputPassword} />
                                <button type="button" class="btn btn-primary" style={{ marginTop: 15 }}
                                    onClick={this.handleUpdatePassword} disabled={password.newPassword !== password.confirmPassword}
                                >Cập nhật mật khẩu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Profile);