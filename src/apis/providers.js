import request from "../utils/request";

export async function providerByProductType(product_type_id) {
  return await request({
    url: "/api/v1/providers/products-type",
    method: "GET",
    params: {
      product_type_id,
    },
  });
}
