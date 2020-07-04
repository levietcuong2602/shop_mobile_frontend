import React, { Component } from 'react';
import styled from 'styled-components';
import ImageZoom from '../../components/guest/product/ImageZoom';
import ProductOverview from '../../components/guest/product/ProductOverview';
import Thumbnails from '../../components/guest/product/Thumbnails';
import { WhitePanel } from '../../theme/Style';

import axios from 'axios';

const description = () => {
    return (
        <div>
            <h5>Ưu đãi cà phê, xem phim cuối tuần cho khách hàng sở hữu dòng điện thoại Galaxy J8: Chi tiết tại đây</h5>
            <h5>Thiết kế nguyên khối</h5>
            <p>Điện Thoại Samsung Galaxy J8 64GB/4GB với thiết kế sang trọng và cạnh viền cong mượt mà giúp bạn cầm vừa vặn hoàn hảo trong lòng bàn tay. Galaxy J8 giúp bạn tự tin thể hiện cá tính với đa sắc màu thời thượng cá tính: tím sapphire, đen titan và vàng thạch anh.</p>
            <h5>Thiết kế màn hình vô cực</h5>
            <p>Samsung Galaxy J8 sở hữu thiết kế sang trọng với màn hình 6 inch tràn cạnh, phần viền được làm cực mỏng cho trải nghiệm hình ảnh ấn tượng cũng như giúp người dùng cầm nắm thoải mái. Công nghệ Super AMOLED tiên tiến kết hợp tỉ lệ màn hình 18.5:9 chuẩn điện ảnh mang đến khả năng hiển thị nội dung tối ưu, chất lượng ảnh chi tiết, rực rỡ và sắc nét giúp trải nghiệm của người dùng được nâng cao hơn.</p>
        </div>
    );
}

const TableDetail = styled.div`

`;

const product = {
    id: 1,
    product_name: "Điện Thoại Samsung Galaxy J8 64GB/4GB (Bản Đặc Biệt) - Hàng Chính Hãng",
    base_price: "5.299.000",
    unit: "VND",
    rating: 3.2,
    description,
    images: [
        "https://static.wixstatic.com/media/9c608a_87a3fed2d1f84295b62df8273661ab1b.jpg/v1/fill/w_500,h_500,q_85,usm_0.66_1.00_0.01/9c608a_87a3fed2d1f84295b62df8273661ab1b.jpg",
        "https://static.wixstatic.com/media/9c608a_564a5dd8011640ebab7c78eb2ef1eef2.jpg/v1/fill/w_500,h_500,q_85,usm_0.66_1.00_0.01/9c608a_564a5dd8011640ebab7c78eb2ef1eef2.jpg"
    ]
}
class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImage: 0,
            product: {},
            product_id: ''
        }
        this.handleChangeImage = this.handleChangeImage.bind(this);
    }

    handleChangeImage(i) {
        this.setState({ currentImage: i });
    }

    componentWillMount() {
        const product_id = this.props.match.params.id;

        axios.get(`/api/guest/productlist/detail`, {
            params: {
                product_id
            }
        }).then(response => {
            const { success, error } = response.data;

            if (success) {
                const { product } = response.data;
                this.setState({
                    product,
                    product_id
                });
            } else {
                console.log("error: Dữ liệu provider trống");
            }
        }).catch(err => {
            console.log(err);
        });
    }
    render() {
        const { currentImage, product } = this.state;
        const images = String(product.product_images).split(',');

        return (
            <div className="container" style={{ marginBottom: "50px" }}>
                <WhitePanel className="row white-panel">
                    <div className="col-sm-5 col-lg-4">
                        <ImageZoom src={images[currentImage]} />
                        <Thumbnails handleChangeImage={this.handleChangeImage} thumbnails={images} />
                    </div>

                    <div className="col-sm-7 col-lg-8">
                        <ProductOverview product={product} />
                    </div>
                </WhitePanel>

                <h3 style={{ fontSize: "18px", textTransform: "uppercase" }}>Thông tin chi tiết</h3>

                <WhitePanel className="row">
                    <TableDetail className="table-responsive">
                        <table className="table table-bordered">
                            <colgroup>
                                <col style={{ width: "25%", color: "#4f4f4f", fontWeight: "500", background: "#efefef" }} />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td>Thương hiệu</td>
                                    <td>Samsung</td>
                                </tr>
                                <tr>
                                    <td>Phụ kiện đi kèm</td>
                                    <td>Cáp Sạc, Củ Sạc, Tai Nghe, Sách hướng dẫn</td>
                                </tr>
                            </tbody>
                        </table>
                    </TableDetail>
                </WhitePanel>
            </div>
        );
    }
}

export default ProductDetail;