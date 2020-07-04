import React, { Component } from 'react';
import Header from '../components/guest/Header';
import Footer from '../components/guest/Footer';
import Action from '../components/guest/Action';

class GuestLayout extends Component {
    render() {
        return (
            <div>
                <Action />
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default GuestLayout;