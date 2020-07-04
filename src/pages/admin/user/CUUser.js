import React, { Component } from 'react';
import axios from 'axios';

import { TitlePanel, WhitePanel } from '../../../theme/Style';
import MessageDialog from '../../../../src/components/dialog/MessageDialog';
import BackButton from '../../../components/BackButton';

const initState = {
    newUser: true,
    message: '',
    user: {
        full_name: '',
        email: '',
        phone_number: '',
        address: '',
        level: 1,
    }
};

class CUUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initState,
        }
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetMessage = this.resetMessage.bind(this);
    }

    componentDidMount() {
    }

    handleChangeInput(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(prevState => {
            const user = prevState.user;
            user[name] = value;
            return { user };
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { user } = this.state;
        if (!user.full_name || !user.email || !user.phone_number || !user.address) {
            this.setState({
                message: 'Có trường dữ liệu trống'
            });
            return;
        }
        user.level = parseInt(user.level);
        axios.post(`/api/admin/user/add`, { user })
            .then(response => {
                const { success, error } = response.data;
                if (success) {
                    this.setState({
                        message: 'Thêm tài khoản thành công',
                    });
                } else {
                    this.setState({
                        message: error
                    });
                }
            })
            .catch(error => {
                this.setState({
                    message: error
                });
            });
    }

    resetMessage() {
        this.setState({ message: "" });
    }

    render() {
        const { newUser, message, user: { full_name, email, phone_number, address, level } } = this.state;
        console.log(this.state);
        return (
            <div>
                <BackButton onClick={this.props.history.goBack} />
                <TitlePanel>
                    <h3>{newUser ? "Thêm người dùng" : "Cập nhật thông tin người dùng"}</h3>
                </TitlePanel>

                <WhitePanel>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-sm-6 col-md-4">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Full Name" name="full_name"
                                        value={full_name} onChange={this.handleChangeInput} />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Email" name="email"
                                        value={email} onChange={this.handleChangeInput} />
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-4">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Phone Number" name="phone_number"
                                        value={phone_number} onChange={this.handleChangeInput} />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Address" name="address"
                                        value={address} onChange={this.handleChangeInput} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-6 col-md-4">
                                <label htmlFor="accout_type">Loại tài khoản</label>
                                <select name="level" id="accout_type" className="form-control" value={level}
                                    onChange={this.handleChangeInput}>
                                    <option value="1">Khách hàng</option>
                                    <option value="2">Nhân viên</option>
                                    <option value="3">Thủ kho</option>
                                    <option value="4">Nhân viên giao hàng</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-success" style={{ marginTop: 15 }}>{newUser ? "Thêm mới" : "Cập nhật"}</button>
                    </form>
                    {message && <MessageDialog title={"Message"} message={message} resetMessage={this.resetMessage} />}
                </WhitePanel>
            </div>
        );
    }
}

export default CUUser;