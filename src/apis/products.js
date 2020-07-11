import request from "./../utils/request";

export async function getProducts(params) {
  return await request({
    url: "/api/v1/products",
    method: "GET",
    params,
  });
}

export async function getProductDetail(productId) {
  return await request({
    url: `/api/v1/products/${productId}`,
    method: "GET",
  });
}

export async function getProductTypes() {
  return await request({
    url: `/api/v1/products/types/all`,
    method: "GET",
  });
}

export async function deleteProduct(productId) {
  return await request({
    url: `/api/v1/products/${productId}`,
    method: "DELETE",
  });
}
