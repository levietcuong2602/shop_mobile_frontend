import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductItemCart from "../../components/guest/product/ProductItemCart";
import axios from "axios";
import { connect } from "react-redux";

import { formatNumber } from "../../helpers/formatNumber";
import { getCartByUser } from "../../apis/carts";

const Container = styled.div`
  margin-bottom: 50px;

  #shopping_cart .info_cart {
    position: relative;
    margin-bottom: 30px;
    padding: 10px 10px 25px 10px;
    box-shadow: 0px 0px 2px 2px #e6e6e6;
  }
  #shopping_cart .info_cart h4 {
    font-weight: bold;
  }
  .info_right {
    display: inline-block;
    position: absolute;
    right: 10px;
    font-size: 16px;
  }
  .info_left {
    display: inline-block;
  }
  .before_info_cost {
    margin-bottom: 15px;
    line-height: 35px;
    font-size: 15px;
  }
  .after_info_cost {
    margin-top: 20px;
    margin-bottom: 45px;
    line-height: 28px;
    font-size: 15px;
  }
  .vat {
    display: inline-block;
    position: absolute;
    right: 10px;
    font-size: 14px;
  }
  .div_button button {
    width: 99%;
    color: white;
  }
  .total_cost {
    color: red;
  }

  .list_products h4 {
    font-weight: bold;
  }

  .list_products .checkbox-wrap {
    width: 60%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .list_products .title_price_count {
    width: 40%;
    display: flex;
    align-items: center;
  }
  .list_products .title_price_count .title_price {
    width: 60%;
    text-align: center;
  }
  .list_products .title_price_count .title_count {
    width: 40%;
    text-align: center;
  }
  .list_products .title_list {
    display: flex;
    height: 65px;
    color: gray;
    box-shadow: 0px 0px 2px 2px #e6e6e6;
    margin-right: 0px;
  }
  .list_products .title_list .input_check {
    display: flex;
    align-items: center;
    padding-left: 15px;
  }
  .list_products .title_list .input_check input {
    width: 18px;
    height: 18px;
  }

  .no_products_cart {
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .no_products_cart .btn-buying {
    background-color: white;
    color: black;
    border: 2px solid #1a76b3;
    font-size: 20px;
  }
  .no_products_cart p {
    font-size: 22px;
  }
`;
function ShoppingCart(props) {
  const { user } = props;
  const [products, setProducts] = useState([]);
  const [selectProducts, setSelectProducts] = useState({});

  const fetchDataCarts = async () => {
    const data = {
      userId: user.id,
    };
    getCartByUser(data)
      .then((res) => {
        const { status, results } = res;
        if (status === 1) {
          setProducts(results.data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchDataCarts();
  }, []);

  const addProductFavorites = (product_id) => {
    // user_id
    // axios
    //   .post(`/api/user/favorite/add`, {
    //     user_id: user.id,
    //     product_id: product_id,
    //   })
    //   .then((response) => {
    //     const { success, error } = response.data;
    //     if (success) {
    //       alert("Đã thêm sản phẩm vào danh sách yêu thích");
    //     } else {
    //       console.log("error: Xảy ra lỗi thêm dữ liệu vào cơ sở dữ liệu");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const deleteProductCart = (index) => {
    // const { products } = cart;
    // console.log("deleteProduct: ", products[index]);
    // if (window.confirm("Bạn có muốn xóa sản phẩm khỏi giỏ hàng không?")) {
    //   axios
    //     .post(`/api/user/cart/delete`, {
    //       user_id: user.id,
    //       product_id: products[index].id,
    //     })
    //     .then((response) => {
    //       const { success, error } = response.data;
    //       if (success) {
    //         // products.splice(index, 1);
    //         // setState({ products });
    //         console.log("success");
    //       } else {
    //         console.log("error: Xoa san pham khoi gio hang that bai");
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  };

  const changeAmountProductCartSub = (index) => {
    // const { products } = cart;
    // const products_sub = products.map((e, i) => {
    //   return i === index
    //     ? {
    //         id: e.id,
    //         name: e.name,
    //         images: e.images,
    //         description: e.description,
    //         price: e.price,
    //         amount: e.amount > 1 ? e.amount - 1 : 1,
    //       }
    //     : e;
    // });
    // setState({ products: products_sub });
    // axios
    //   .post(`/api/user/cart/change`, {
    //     user_id: user.id,
    //     product_id: products[index].id,
    //     amount: products[index].amount,
    //   })
    //   .then((response) => {
    //     const { success, error } = response.data;
    //     if (success) {
    //       console.log("success");
    //     } else {
    //       console.log("error: Thay doi so luong san pham bi loi");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const changeAmountProductCartPlus = (index) => {
    // const { products } = cart;
    // const products_plus = products.map((e, i) => {
    //   return i === index
    //     ? {
    //         id: e.id,
    //         name: e.name,
    //         images: e.images,
    //         description: e.description,
    //         price: e.price,
    //         amount: e.amount + 1,
    //       }
    //     : e;
    // });
    // setState({ products: products_plus });
    // axios
    //   .post(`/api/user/cart/change`, {
    //     user_id: user.id,
    //     product_id: products[index].id,
    //     amount: products[index].amount,
    //   })
    //   .then((response) => {
    //     const { success, error } = response.data;
    //     if (success) {
    //       console.log("success");
    //     } else {
    //       console.log("error: Thay doi so luong san pham bi loi");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleSelectProduct = (cartId) => {
    setSelectProducts({ ...selectProducts, [cartId]: true });
  };

  const total = products.length;
  const totalPrices = () => {
    let results = 0;
    for (const product of products) {
      if (selectProducts[product.id]) {
        results +=
          parseInt(product.product_base_price, 0) * parseInt(product.amount, 0);
      }
    }

    return results;
  };

  return (
    <Container>
      {products.length === 0 && (
        <div className="container no_products_cart">
          <p>Không có sản phẩm nào trong giỏ hàng</p>
          <a href="/" className="btn btn-default btn-buying">
            Tiếp tục mua sắm
          </a>
        </div>
      )}
      {products.length !== 0 && (
        <div id="shopping_cart">
          <div className="container">
            <h2>Giỏ hàng của tôi</h2>
            <div className="row">
              <div className="col-sm-8 list_products">
                <h4>Danh sách sản phẩm</h4>
                <div className="row title_list">
                  <div className="input_check">
                    <input type="checkbox" aria-checked="true" value="on" />
                  </div>
                  <div className="checkbox-wrap">
                    <span>CHỌN TẤT CẢ ({total} SẢN PHẨM)</span>
                    <a href="#">
                      <i className="fa fa-trash"></i>
                      <span>XÓA</span>
                    </a>
                  </div>
                  <div className="title_price_count">
                    <div className="title_price">GIÁ: 0</div>
                    <div className="title_count">sỐ LƯỢNG: 0</div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <ProductItemCart
                    products={products}
                    addProductFavorites={addProductFavorites}
                    deleteProductCart={deleteProductCart}
                    changeAmountProductCartSub={changeAmountProductCartSub}
                    changeAmountProductCartPlus={changeAmountProductCartPlus}
                    handleSelectProduct={handleSelectProduct}
                  />
                </div>
              </div>
              <div className="col-sm-4 info_cart">
                <h4>Thông tin đơn hàng</h4>
                <div className="before_info_cost">
                  <div>
                    <div className="info_left">Tạm tính</div>
                    <div className="info_right">
                      {formatNumber(totalPrices())}
                    </div>
                  </div>
                  <div>
                    <div className="info_left">Phí giao hàng</div>
                    <div className="info_right">miễn phí</div>
                  </div>
                </div>
                <div className="after_info_cost">
                  <div>
                    <div className="info_left">Tổng cộng</div>
                    <div className="info_right total_cost">
                      {formatNumber(totalPrices())}
                    </div>
                  </div>
                  <div className="vat">Đã bao gồm VAT (nếu có)</div>
                </div>
                <div className="div_button">
                  <button
                    type="button"
                    className="btn btn-info"
                    data-toggle="modal"
                    href="#confirm-buy"
                  >
                    XÁC NHẬN GIỎ HÀNG
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="modal fade" id="confirm-buy">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
              <h4 className="modal-title">Xác nhận đơn hàng</h4>
            </div>
            <div className="modal-body">
              <form action="" method="POST" role="form">
                <div className="form-group">
                  <label for="">Họ tên: {user.full_name}</label>
                </div>
                <div className="form-group">
                  <label for="">Địa chỉ nhận</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Địa chỉ nhận"
                    defaultValue={user.address}
                  />
                </div>
                <div className="form-group">
                  <label for="">Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Số điện thoại"
                    defaultValue={user.phone_number}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Đóng
              </button>
              <button type="button" className="btn btn-primary">
                Xác nhận mua
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    cart: state.user.cart,
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(ShoppingCart);
