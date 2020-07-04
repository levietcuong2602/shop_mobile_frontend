import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { formatNumber } from '../../helpers/formatNumber';
import { TitlePanel, WhitePanel } from '../../theme/Style';
import TopProductItem from '../../components/admin/product/TopProductItem';

const Card = styled.div`
    color: rgba(0, 0, 0, 0.87);
    width: 100%;
    border: 0;
    display: flex;
    position: relative;
    min-width: 0;
    word-wrap: break-word;
    font-size: .875rem;
    margin-top: 30px;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
    margin-bottom: 10px;
    border-radius: 6px;
    flex-direction: column;
`;

const CardHeader = styled.div`
    text-align: right;
    background: transparent;
    box-shadow: none;
    border-radius: calc(.25rem - 1px) calc(.25rem - 1px) 0 0;
    margin: 0 15px;
    padding: 0;
    position: relative;

    p {
        color: #999999;
        margin: 0;
        font-size: 14px;
        margin-top: 0;
        padding-top: 10px;
        margin-bottom: 0;
    }

    h3 {
        color: #3C4858;
        margin-top: 0px;
        min-height: auto;
        font-weight: 300;
        font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
        margin-bottom: 3px;
        text-decoration: none;
        font-size: 35px;
    }
`;

const CardIcon = styled.div`
    float: left;
    padding: 15px;
    margin-top: -20px;
    margin-right: 15px;
    border-radius: 3px;
    background: ${props => props.inputColor || "palevioletred"};
    box-shadow: 0 12px 20px -10px rgba(255, 152, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2);

    i {
        color: #ffffff;
    }
`;

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalUser: 0,
            totalPost: 0,
            revenue: 0,
            topSellingProducts: []
        }
    }

    componentDidMount() {
        // get common info
        axios.get(`/api/admin/dashboard`).then(response => {
            const { success, error } = response.data;
            if (success) {
                const { infoDashboard } = response.data;
                this.setState({
                    ...infoDashboard
                });
            } else {
                console.log("error: ", error);
            }
        }).catch(err => {
            console.log(err);
        });

        // get top selling products
        axios.get(`/api/admin/dashboard/top_product`, {
            params: {
                limit: 10
            }
        }).then(response => {
            const { success, error } = response.data;
            if (success) {
                const { topSellingProducts } = response.data;
                this.setState({
                    topSellingProducts
                });
            } else {
                console.log("error: ", error);
            }
        })
    }

    render() {
        const { totalUser, totalPost, revenue, topSellingProducts } = this.state;
        return (
            <div>
                <TitlePanel>
                    <h3>Dashboard</h3>
                </TitlePanel>

                <div className="row">
                    <div className="col-sm-4">
                        <Card>
                            <CardHeader>
                                <CardIcon inputColor="#26c6da">
                                    <i className="fa fa-newspaper-o fa-4x"></i>
                                </CardIcon>
                                <p>Post</p>
                                <h3>{`${totalPost}`}</h3>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="col-sm-4">
                        <Card>
                            <CardHeader>
                                <CardIcon inputColor="#ffa726">
                                    <i className="fa fa-user fa-4x"></i>
                                </CardIcon>
                                <p>User</p>
                                <h3>{`${totalUser}`}</h3>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="col-sm-4">
                        <Card>
                            <CardHeader>
                                <CardIcon inputColor="#66bb6a">
                                    <i className="fa fa-btc fa-4x"></i>
                                </CardIcon>
                                <p>Revenue</p>
                                <h3>{revenue ? formatNumber(revenue) : 0} <small>VNĐ</small></h3>
                            </CardHeader>
                        </Card>
                    </div>
                </div>

                <WhitePanel>
                    <h4>Top sản phẩm bán chạy</h4>
                    {topSellingProducts.length > 0 && <div className="row">
                        {topSellingProducts.map(p => (
                            <TopProductItem key={p.id} product={p} />
                        ))}
                    </div>}
                </WhitePanel>
            </div>
        );
    }
}

export default DashBoard;