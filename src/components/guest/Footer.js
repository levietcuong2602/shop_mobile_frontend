import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-4">
                            <p className="title">Stay connected</p>
                            <ul>
                                <li><a href=""><i className="fa fa-facebook-f"></i></a></li>
                                <li><a href=""><i className="fa fa-twitter"></i></a></li>
                                <li><a href=""><i className="fa fa-instagram"></i></a></li>
                            </ul>
                        </div>

                        <div className="col-md-4">
                            <p className="title">Be our friend</p>
                            <div className="subscribe">
                                <input type="text" placeholder="Email Address" />
                                <button>Subcribe Now</button>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <p className="title">Need assistance</p>
                            <div className="contact">
                                <p><i className="fa fa-phone"></i> 01643737426</p>
                                <a href="mailto:tieunt.bk97@gmail.com">tieunt.bk97@gmail.com</a>
                            </div>
                        </div>
                    </div>
                    <p>Copyright &copy; 2018 by BKStore</p>
                </div>
            </footer>
        );
    }
}

export default Footer;