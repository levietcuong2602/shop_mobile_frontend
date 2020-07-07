import request from "../utils/request";

export async function getAttributes(productTypeId, categoryName) {
  return await request({
    url: "/api/v1/attributes",
    method: "GET",
    params: {
      product_type_id: productTypeId,
      category_name: categoryName,
    },
  });
}
