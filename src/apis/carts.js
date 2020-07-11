import request from "../utils/request";

export async function addCarts({ customerId, productId, amount }) {
  return await request({
    url: "/api/v1/carts",
    method: "POST",
    data: {
      customerId,
      productId,
      amount,
    },
  });
}

export async function getCartByUser(data) {
  const { userId, ...params } = data;
  return await request({
    url: `/api/v1/carts/users/${userId}`,
    method: "GET",
    params,
  });
}
