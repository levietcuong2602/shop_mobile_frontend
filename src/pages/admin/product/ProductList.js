import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSnackbar } from "notistack";

import * as actions from "../../../actions/admin_product_actions";

import { TitlePanel, WhitePanel, Label } from "../../../theme/Style";
import ProductRow from "../../../components/admin/product/ProductRow";
import Pagination from "../../../components/pagination/Pagination";
import {
  getProducts,
  getProductTypes,
  deleteProduct,
} from "../../../apis/products";
import { providerByProductType } from "../../../apis/providers";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ProductList(props) {
  const [searchValue, setSearchValue] = useState("");
  const [providers, setProviders] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [productSelect, setProductSelect] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [productTypeId, setProductTypeId] = useState(0);
  const [providerId, setProviderId] = useState(0);
  const [timer, setTimer] = useState(null);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  //   new
  const fetchDataProduct = async () => {
    getProducts({
      pageNum: currentPage + 1,
      limit,
      inputSearch: searchValue,
      productType: productTypeId !== 0 ? productTypeId : undefined,
      providerId: providerId !== 0 ? providerId : undefined,
    })
      .then((res) => {
        const { status, results } = res;
        if (status === 1) {
          const {
            data: arr,
            pager: {
              current_page_num: currentPageNum,
              has_next: hasNext,
              has_prev: hasPrev,
              last_page_num: lastPageNum,
              next_page_num: nextPageNum,
              prev_page_num: prevPageNum,
              total_count,
            },
          } = results;

          setProducts(arr);
          setTotalCount(total_count);
        }
      })
      .catch((err) => {
        console.log({ error: err.message });
      });
  };

  useEffect(() => {
    fetchDataProduct();
  }, [limit, currentPage, productTypeId, providerId, searchValue]);

  const fetchDataProductType = async () => {
    getProductTypes()
      .then((res) => {
        const { status, results } = res;
        if (status === 1) {
          setProductTypes(results);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    fetchDataProductType();
  }, []);

  const fetchDataProviders = async () => {
    providerByProductType(productTypeId)
      .then((res) => {
        const { status, results, message } = res;
        if (status === 1) {
          setProviders(results);
        }
      })
      .catch();
  };

  useEffect(() => {
    fetchDataProviders();
  }, [productTypeId]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleChangeType = (e) => {
    setProductTypeId(parseInt(e.target.value, 0));
    setCurrentPage(0);
  };

  const handleChangeProvider = (e) => {
    setProviderId(parseInt(e.target.value, 0));
    setCurrentPage(0);
  };

  const handleChangeSearchInput = (e) => {
    e.persist();
    setCurrentPage(0);
    const event = e;
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(() => {
        setSearchValue(event.target.value);
      }, 500)
    );
  };

  const handleShowDialogDelete = (product) => (e) => {
    setDialogDelete(true);
    setProductSelect(product);
  };

  const handleCloseDialogDelete = () => {
    setDialogDelete(false);
  };

  const handleDeleteProduct = () => {
    deleteProduct(productSelect.id)
      .then((res) => {
        const { status } = res;
        if (status === 1) {
          enqueueSnackbar("Xóa sản phẩm thành công", {
            variant: "success",
          });
          setDialogDelete(false);
          fetchDataProduct();
          return;
        }
      })
      .catch((err) => {
        console.log({ error: err.message });
        enqueueSnackbar("Đã có lỗi xảy ra, Vui lòng thử lại", {
          variant: "error",
        });
      });
  };

  const handleUpdateProduct = () => {};

  return (
    <div>
      <TitlePanel>
        <h3>Danh sách sản phẩm</h3>
      </TitlePanel>

      <WhitePanel>
        <div className="row">
          <div className="col-md-12">
            <NavLink
              to="/admin/product/add"
              className="btn btn-success pull-right"
            >
              Thêm mới
            </NavLink>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <Label htmlFor="product-type">Loại sản phẩm</Label>
            <select
              name="product_type"
              id="product-type"
              className="form-control"
              defaultValue={productTypeId}
              onChange={handleChangeType}
            >
              <option value={0}>Tất cả</option>
              {productTypes.map((item) => (
                <option key={item.id} value={`${item.id}`}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <Label htmlFor="product-type">Thương hiệu</Label>
            <select
              name="provider"
              id="product-type"
              className="form-control"
              defaultValue={providerId}
              onChange={handleChangeProvider}
            >
              <option value="0">Tất cả</option>
              {providers.map((provider) => (
                <option key={provider.id} value={`${provider.id}`}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <Label htmlFor="product-type">Tìm kiếm</Label>
            <div className="action-search">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên sản phẩm"
                defaultValue={searchValue}
                onChange={handleChangeSearchInput}
              />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={fetchDataProduct}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>

        {/* table products */}
        <TableContainer component={Paper} style={{ marginTop: "10px" }}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">Tên sản phẩm</TableCell>
                <TableCell align="center">Giá</TableCell>
                <TableCell align="center">Đơn vị</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="center">Mô tả</TableCell>
                <TableCell align="center">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell align="center" component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.product_name}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.base_price}
                  </TableCell>
                  <TableCell align="center">{row.unit}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center" style={{ width: "120px" }}>
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={handleShowDialogDelete(row)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalCount}
          rowsPerPage={limit}
          page={currentPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </WhitePanel>
      {/* edit */}

      {/* delete */}
      <Dialog
        open={dialogDelete}
        onClose={handleCloseDialogDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa sản phẩm?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteProduct} color="primary">
            Đồng ý
          </Button>
          <Button onClick={handleCloseDialogDelete} color="primary" autoFocus>
            Hủy bỏ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    productList: state.admin.product.productList,
  };
}

export default connect(mapStateToProps, actions)(ProductList);
