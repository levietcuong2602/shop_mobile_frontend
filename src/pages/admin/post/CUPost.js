import React, { Component } from 'react';
import CKEditor from 'react-ckeditor-wrapper';
import axios from 'axios';

import { TitlePanel, WhitePanel } from '../../../theme/Style';
import MessageDialog from '../../../../src/components/dialog/MessageDialog';
import BackButton from '../../../components/BackButton';

class CUPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            title: '',
            content: '',
            message: '',
            newPost: this.props.newPost
        }
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetMessage = this.resetMessage.bind(this);
    }

    componentDidMount() {
        if (!this.props.newPost) {
            let id = parseInt(this.props.match.params.id);
            axios.get(`/api/admin/post/getPost/${id}`).then(response => {
                const { success, error } = response.data;
                if (success) {
                    const { title, content } = response.data.post;
                    this.setState({ id, title, content });
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    handleEditorChange(content) {
        this.setState({
            content
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { id, title, content, newPost } = this.state;
        let post = {
            title,
            content
        }
        if (!title || !content) {
            this.setState({ message: "Có trường dữ liệu trống" });
            return;
        }
        let api;
        if (newPost) {
            api = '/api/admin/post/new';
        } else {
            api = '/api/admin/post/update';
            post.id = id;
        };

        this.changePost(api, post);
    }

    changePost(api, post) {
        axios.post(api, post).then(response => {
            const { success, error } = response.data;
            if (success) {
                this.setState(({ newPost }) => {
                    if (newPost) {
                        return {
                            message: "Thêm thành công",
                            title: "",
                            content: ""
                        }
                    } else {
                        return {
                            message: "Cập nhật thành công"
                        }
                    }
                });
            } else {
                this.setState({ message: error });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    resetMessage() {
        this.setState({ message: "" });
    }

    render() {
        console.log("HISTORY: ", this.props.history);
        const { title, content, newPost, message } = this.state;
        return (
            <div>
                <BackButton onClick={this.props.history.goBack} />
                <TitlePanel>
                    <h3>{newPost ? "Thêm bài viết" : "Chỉnh sửa bài viết"}</h3>
                </TitlePanel>

                <WhitePanel>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input type="text" className="form-control" id="title" placeholder="Title"
                                value={title} onChange={(e) => this.setState({ title: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Content:</label>
                            <CKEditor value={content}
                                onChange={this.handleEditorChange}
                                config={{ extraAllowedContent: 'div(*); p(*); strong(*);' }} />
                        </div>

                        <button type="submit" className="btn btn-success">{newPost ? "Add" : "Update"}</button>
                    </form>
                    {message && <MessageDialog title={"Message"} message={message} resetMessage={this.resetMessage} />}
                </WhitePanel>
            </div>
        );
    }
}

export default CUPost;