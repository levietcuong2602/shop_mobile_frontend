import React, { Component } from 'react';
import styled from 'styled-components';

const Dialog = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    background-color: rgba(0, 0, 0, 0.4);
`;

class MessageDialog extends Component {
    constructor(props) {
        super(props);
        this.toggleContainer = React.createRef();
        this.hideMessageDialog = this.hideMessageDialog.bind(this);
        this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
    }

    componentDidMount() {
        window.addEventListener('click', this.onClickOutsideHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onClickOutsideHandler);
    }

    hideMessageDialog() {
        this.props.resetMessage();
    }

    onClickOutsideHandler(event) {
        if (!this.toggleContainer.current.contains(event.target)) {
            this.hideMessageDialog();
        }
    }

    render() {
        const { title, message } = this.props;
        return (
            <Dialog className="dialog" message={message}>
                <div className="modal-dialog" ref={this.toggleContainer}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{title}</h4>
                        </div>
                        <div className="modal-body">
                            <p>{message}</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-default" onClick={() => this.hideMessageDialog()}>Close</button>
                        </div>
                    </div>
                </div>
            </Dialog>
        )
    }
}

export default MessageDialog;